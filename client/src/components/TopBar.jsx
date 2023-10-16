import React from 'react';
import { useState , useEffect} from 'react';
import '../styles/topbar.css';
import axios from 'axios';



export const TopBar = ({  setFilteredNotes }) => {

  const [searchValue, setSearchValue] = useState('');
  const [sortOption, setSortOption] = useState('recent');

  // useEffect(() => {
  //   const fetchAndSortNotes = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8000/user/allnote', {
  //         params: {
  //           sortOption: sortOption === 'recent' ? 'Most-Recent' : 'Oldest',
  //         },
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('token')}`,
  //         },
  //       });

  //       if (response.status === 200 && Array.isArray(response.data.notes)) {
  //         const sortedNotes = response.data.notes;
  //         setFilteredNotes(sortedNotes);
  //       } else {
  //         console.error('API response is not valid:', response);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching notes:', error);
  //     }
  //   };

  //   fetchAndSortNotes();
  // }, [sortOption, setFilteredNotes]);

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div className="top-bar">
      <div className="profile">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="Profile" />
      </div>
      <div className="search-box">
      <input
          type="text"
          placeholder="Search notes"
          // value={}
          // onChange={handleSearchChange}
        />
      </div>
      <div className="filter">
      <label>Sort by :</label>
        <select value={sortOption} onChange={handleSortChange}>
          <option value="recent">Most-Recent</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
};