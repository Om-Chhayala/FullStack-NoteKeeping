import { Button, Card, Hidden, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/notes.css";
import DOMPurify from 'dompurify';
// import  Note  from "./Note";
// import { useParams } from "react-router-dom";

function Notes() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);



  const init = async () => {
    try {
      const response = await axios.get('http://localhost:8000/user/allnote', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        setNotes(response.data.allnotes); // Assuming 'allnotes' is the field name
      } else {
        console.error('API request was not successful. Status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const deleteNote = (noteId) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== noteId));
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" , marginTop : "13px",paddingBottom: "20px"}}>
      {notes.map((note) => (
        <Note key={note._id} note={note} onDelete={deleteNote} /> 
      ))}
    </div>
  );
}



export function Note({ note , onDelete}) {
  const sanitizedContent = DOMPurify.sanitize(note.description);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const noteId = note._id;
      console.log('Deleting note with ID:', noteId);

      // Include the authorization token in the request headers
      const token = localStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      await axios.delete(`http://localhost:8000/user/deletenote/${noteId}`, {
        headers: headers,
      });
      onDelete(note._id);
      

    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };


  return (<>
    <Card style={{
      
      display:"flex",
      flexDirection:"column",
      justifyContent:"space-between",
      margin: 10,
      width: 300,
      height:200,
      padding: 20,
      border: '1px solid #d0d0d0', // Add a border
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add a shadow
      borderRadius: 10, // Add rounded corners
    }}>
      <Typography textAlign={"center"} variant="h5" style={{ fontSize: 18, fontWeight: 'bold' }}>{note.title}</Typography>
      <Typography textAlign={"center"}
        style={{ marginTop: 35, overflow: "hidden" }}
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
  
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
        <Button 
        variant="contained" size="small" style={{ backgroundColor: 'yellow', color: 'black' }
      }
      onClick={() => {
        navigate("/notes/" + note._id);
      }}
      >
          update
        </Button>
        <Button 
        variant="contained" size="small" style={{ backgroundColor: 'yellow', color: 'black' }
      }

      onClick={() => {
        handleDelete()
      }}
      >
          delete
        </Button>
      </div>
    </Card>
    
    </>
    
  );
  
  
  
}

export default Notes;
