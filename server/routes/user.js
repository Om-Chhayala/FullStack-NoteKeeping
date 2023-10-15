const mongoose = require("mongoose");
const express = require('express');
const { User, Note } = require("../db");
const jwt = require('jsonwebtoken');
const { SECRET } = require("../middleware")
const { authenticateJwt } = require("../middleware");

const router = express.Router();

router.post('/addnote', authenticateJwt , async (req,res) => {
    const userid = req.user.id;
    console.log(userid);

    const newnote = new Note({
        userid : req.user.id,
        title : req.body.title,
        links : req.body.links,
        description : req.body.description
    });
    await newnote.save();
    res.json({
        message : 'Success',
        newnote
    })
});

router.get('/allnote', authenticateJwt, async (req, res) => {
    const allnotes = await Note.find({ userid : req.user.id });
    res.status(200).json({ 
        message : 'all message retrive successfully',
        allnotes
    });
});

router.delete('/deletenote/:noteId', authenticateJwt, async (req,res) => {
    const noteId = req.params.noteId;
    const userId = req.user.id;

    const note = await Note.findOne({ _id: noteId, userid: userId });

    if(!note) {
        return res.status(404).json({
            message : 'Note noe found'
        });
    }

    await Note.findByIdAndDelete(noteId);
    res.json({
        message: 'Note deleted successfully',
    });

});

module.exports = router;