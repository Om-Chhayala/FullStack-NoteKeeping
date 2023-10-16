import React, { useState, useEffect } from 'react';
import { TextField, Button } from "@mui/material";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify'; // Import DOMPurify
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import the Quill editor's styles


export const Note = () => {
  const { noteId } = useParams(); // Define noteId only once

  const [data, setData] = useState({});

  const sanitizeHTML = (html) => {
    const cleanHTML = DOMPurify.sanitize(html);
    return { __html: cleanHTML };
  };

  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/user/getnotedata/${noteId}`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });
      const noteData = response.data.notedata;
      setTitle(noteData.title);
      setDescription(noteData.description);
      setLink(noteData.links);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [noteId]);

  const modules = {
    // ... your modules configuration
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
          onChange={(value) => {
            setDescription(value);
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
        onClick={async () => {
          await axios.put(`http://localhost:8000/user/notes/${noteId}`, {
            title: title,
            description: description,
            link: link
          }, {
            headers: {
              "Authorization": "Bearer " + localStorage.getItem("token")
            }
          });
          alert("Note updated!");
          navigate('/');
        }}
      >
        Submit
      </Button>
    </div>
  );
};
