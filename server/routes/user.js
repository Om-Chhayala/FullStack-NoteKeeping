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
            message : 'Note not found'
        });
    }

    await Note.findByIdAndDelete(noteId);
    res.json({
        message: 'Note deleted successfully',
    });

});


router.put('/notes/:noteId', async (req, res) => {
    try {
      const noteId = req.params.noteId;
      const updatedData = req.body; 

      const updatedNote = await Note.findByIdAndUpdate(noteId, updatedData, { new: true });
  
      if (!updatedNote) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.json(updatedNote);
    } catch (error) {
      console.error('Error updating note:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


// router.get('/getnotedata/:noteId', async (req,res) => {
//     try {
//         const noteId = req.params.noteId;
//         const notedata = await Note.findOne( {noteId} );
//         if(!noteId) {
//             res.json({
//                 message : "Id not found for this noteID"
//             })
//         }
//         res.json({
//             message : "success",
//             notedata
//         })
//     } catch {
//         res.json({
//             message : "An error occured"
//         })
//     }
// })
// https://gist.github.com/Om-Chhayala/ff890c51b725b9f120fc0a61b8751db8

module.exports = router;