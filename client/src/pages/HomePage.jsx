import React, { useEffect } from 'react';
import { TopBar } from '../components/TopBar';
import { Notes } from './Notes'; // Assuming 'Notes' is a component
import { useNavigate } from 'react-router-dom';

export function HomePage() {
  const checkToken = () => {
    const token = localStorage.getItem("token");
    return !!token; // Return true if a token exists
  };

  useEffect(() => {
    const isAuthenticated = checkToken();
    if (!isAuthenticated) {
      // Redirect to login if the user is not authenticated
      navigate("/login");
    }
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <TopBar />
      <Notes />
      <div className="homepage">
        <button
          className="plus-icon"
          onClick={() => {
            const isAuthenticated = checkToken();
            if (isAuthenticated) {
              navigate("/createnote");
            } else {
              navigate("/login");
            }
          }}
        >
          +
        </button>
      </div>
    </>
  );
}
