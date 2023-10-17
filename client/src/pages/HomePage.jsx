import React, { useState, useEffect } from 'react';
import { CreateNote } from '../components/CreateNote';
import { TopBar } from '../components/TopBar';
import axios from 'axios';
import '../styles/homepage.css';
import Notes from './Notes';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getNotes } from '../actions/noteActions';

export function HomePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(''); 

  const notesState = useSelector((state) => state.notes);
  const { loading, notes, error } = notesState;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes());
  }, [dispatch]);

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
