import React, { useEffect } from 'react';
import { TopBar } from '../components/TopBar';
import { Notes } from './Notes'; // Assuming 'Notes' is a component
import { useNavigate } from 'react-router-dom';

export function HomePage() {
<<<<<<< HEAD
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
=======
  const [filteredNotes, setFilteredNotes] = useState([]); 
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

  
  const isUserLoggedIn = localStorage.getItem('token')

  return (
    <>
      <TopBar notes={notes} setFilteredNotes={setFilteredNotes} />
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
>>>>>>> 9dc6e312ea9c58722b24fdf3daf08a7490fa1bc8
      </div>
    </>
  );
}
