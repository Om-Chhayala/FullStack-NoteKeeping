import React, { useState, useEffect } from 'react';
import { CreateNote } from '../components/CreateNote';
import { TopBar } from '../components/TopBar';
import axios from 'axios';
import '../styles/homepage.css';
import Notes, { Note } from './Notes';
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const navigate = useNavigate();
  return (
    <>
      <TopBar />
      <Notes/>
      <div className="homepage">

            <button className="plus-icon"
            onClick={() => {
              navigate("/createnote")
          }}
            >   +
            
            </button>
      
      </div>
      
    </>
  );
}
