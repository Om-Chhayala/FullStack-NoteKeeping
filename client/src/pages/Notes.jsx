import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

  useEffect(() => {
    init();
  }, []);

  return (
    <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {notes.map((note) => (
        <Note key={note._id} note={note} /> // Assuming 'note' has an '_id' field
      ))}
    </div>
  );
}

export function Note({ note }) {
  const navigate = useNavigate();
  return (
    <Card style={{
      margin: 10,
      width: 300,
      minHeight: 200,
      padding: 20,
      border: '1px solid #d0d0d0', // Add a border
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Add a shadow
      borderRadius: 10, // Add rounded corners
    }}>
      <Typography textAlign={"center"} variant="h5" style={{ fontSize: 18, fontWeight: 'bold' }}>{note.title}</Typography>
      <Typography textAlign={"center"} variant="subtitle1" style={{ marginTop: 35}}>{note.description}</Typography>
  
      <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
        {/* <Button variant="contained" size="large" style={{ backgroundColor: '#007AFF', color: 'white' }}>
          Edit
        </Button> */}
      </div>
    </Card>
  );
  
  
  
}

export default Notes;
