import React, { useState, useEffect } from 'react';
import { CreateNote } from '../components/CreateNote';
import { TopBar } from '../components/TopBar';
import axios from 'axios';
import '../styles/homepage.css';
import Notes from './Notes';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Add state for search query

  useEffect(() => {
    async function fetchNotes() {
      try {
        const response = await axios.get('http://localhost:8000/user/allnote', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setNotes(response.data.allnotes);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    }

    fetchNotes();
  }, []);

  const isUserLoggedIn = localStorage.getItem('token');

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  return (
        <>
       <TopBar onSearchChange={handleSearchChange} />
      <Notes searchQuery={searchQuery} />
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
