import React, { useState, useRef, useMemo, useEffect } from "react";
import { Typography, TextField, Button } from "@mui/material";
import "../styles/createnote.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addNote } from "../actions/noteActions";

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ align: [] }],
    [
      { color: ["red", "yellow", "green", "blue"] },
      { background: ["red", "yellow", "green", "blue"] },
    ],
    ["link"],
    ["image", "video"],
    ["clean"],
  ],
};

export const CreateNote = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  const handleNoteSubmit = async () => {
    dispatch(addNote(title, description, link));
    alert("Note Created!!");
    navigate("/");
  };

  return (
    <div className="create-note">
      <div className="note-input">
        <TextField
          value={title}
          onChange={(event) => {
            setTitle(event.target.value);
          }}
          id="outlined-textarea"
          placeholder="Title"
          multiline
          fullWidth
        />
      </div>
      <div className="note-input">
        <ReactQuill
          theme="snow"
          value={description}
          onChange={(e) => {
            setDescription(e).target.value;
          }}
          modules={modules}
        />
      </div>
      <div className="note-input">
        <TextField
          value={link}
          onChange={(event) => {
            setLink(event.target.value);
          }}
          id="outlined-textarea"
          placeholder="Link"
          multiline
          fullWidth
        />
      </div>

      <Button onClick={handleNoteSubmit}> Submit </Button>
    </div>
  );
};
