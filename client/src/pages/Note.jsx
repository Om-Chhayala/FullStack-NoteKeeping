import React, { useState , useRef} from 'react';
import {  TextField, Button } from "@mui/material";
import "../styles/createnote.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';


export const Note = () => {
  let { noteId } = useParams();
  console.log(noteId);
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');


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
          // for exp
          placeholder="Write link"
          multiline
          fullWidth
        />
      </div>

      <Button
      onClick={async () => {
        await axios.put(`http://localhost:8000/user/notes/${noteId}`, {
                title: title,
                description: description,
                link : link
        }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });
        alert("Note updated!");
        navigate('/');
    }}
      > Submit </Button>
    </div>
  );
};

// export default CreateNote;
