import React, { useState , useRef, useMemo, useEffect} from 'react';
import { Typography, TextField, Button } from "@mui/material";
import "../styles/createnote.css";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import JoditEditor from 'jodit-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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


export const CreateNote =   () => {
  const navigate = useNavigate();
  const[value , setValue] = useState('');
 const editor = useRef(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');


  // const stripHTML = (html) => {
  //   const tempDiv = document.createElement('div');
  //   tempDiv.innerHTML = html;
  //   return tempDiv.textContent || tempDiv.innerText || '';
  // };

  // const handleEditorChange = (content) => {
  //   // Strip HTML tags from the content
  //   const plainText = JSON.stringify(content);
  //   console.log(plainText)
  //   setDescription(plainText);
  // };




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
  // formats={formats}
  />


{/* <JoditEditor
  ref={editor}
onChange={handleEditorChange}
/> */}


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
        await axios.post('http://localhost:8000/user/addnote', {
                title: title,
                description: description,
                link : link
        }, {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        });
        alert("Note added!");
        navigate('/');
    }}
      > Submit </Button>
    </div>
  );
};

// export default CreateNote;
