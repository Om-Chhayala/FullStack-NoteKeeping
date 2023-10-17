import React, { useState , useRef} from 'react';
import {  TextField, Button } from "@mui/material";
import "../styles/createnote.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'; // Import useSelector and useDispatch
import { updateNote } from '../actions/noteActions'; 


export const Note = () => {
  let { noteId } = useParams();
  console.log(noteId);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const dispatch = useDispatch();

  const modules = {
    toolbar: [
      [{ header: '1' }, { header: '2' }, { font: [] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ align: [] }],
      [{ color: ['red' , 'yellow' , 'green' , 'blue'] }, { background: ['red' , 'yellow' , 'green' , 'blue'] }],
      ['link'],
      ['image', 'video'],
      ['clean'],
    ],
  };

  const handleUpdateNote = () => {
    dispatch(updateNote(noteId, title, description, link));
    alert('Note updated!');
    navigate('/');
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
  theme='snow'
  value={description}
  onChange={(e)=>{
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
          placeholder="Write link"
          multiline
          fullWidth
        />
      </div>

      <Button
      onClick={handleUpdateNote}
      > Submit </Button>
    </div>
  );
};

