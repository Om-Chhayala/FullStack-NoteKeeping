import React from 'react';
import { TopBar } from '../components/TopBar';
import '../styles/homepage.css';
import { useNavigate } from 'react-router-dom';


export function HomePage() {
  const navigate = useNavigate();
  const isUserLoggedIn = localStorage.getItem('token');


  return (
        <>
       <TopBar />
      {/* <Notes searchQuery={searchQuery} /> */}
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
