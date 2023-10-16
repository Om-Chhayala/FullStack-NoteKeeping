import React, { useState, useEffect } from 'react';
import { CreateNote } from '../components/CreateNote';
import { TopBar } from '../components/TopBar';
import axios from 'axios';
import '../styles/homepage.css';
import Notes, { Note } from './Notes';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  // const [filteredNotes, setFilteredNotes] = useState([]); 
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]); // Initialize notes state

  useEffect(() => {
    // Fetch notes data and update the notes state
    async function fetchNotes() {
      try {
        const response = await axios.get('http://localhost:8000/user/allnote', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setNotes(response.data.notes);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    }

    fetchNotes(); // Fetch notes when the component mounts
  }, []);

  // Check if the user is logged in
  const isUserLoggedIn = localStorage.getItem('token');

  return (
    <>
      <TopBar notes={notes} />
      <Notes />
      <div className="homepage">
        {isUserLoggedIn ? (  // Conditional rendering of the "+" button
          <button
            className="plus-icon"
            onClick={() => {
              navigate('/createnote');
            }}
          >
            +
          </button>
        ) : (
          <button
            className="plus-icon"
            onClick={() => {
              navigate('/login'); // Redirect to login if not logged in
            }}
          >
            +
          </button>
        )}
      </div>
    </>
  );
}