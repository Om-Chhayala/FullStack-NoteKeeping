import React, { useState } from 'react';
import axios from 'axios';
import '../styles/topbar.css';

export const TopBar = ({ onSearchChange }) => {
  const [searchValue, setSearchValue] = useState('');
  const [selectedSortOption, setSelectedSortOption] = useState('oldest');
  const handleSortChange = (e) => {
    const selectedOption = e.target.value;
    setSelectedSortOption(selectedOption);

    // Send the selectedSortOption to the backend as a query parameter
    axios.get('http://localhost:8000/user/allnote', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params: { sortOrder: selectedOption },
    })
    .then(response => {
      // Handle the response from the backend
    })
    .catch(error => {
      console.error('Error sending sorting option:', error);
    });
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchValue(query);
    onSearchChange(query);
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
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      <div className="filter">
        <select value={selectedSortOption} onChange={handleSortChange}>
          <option value="recent">Most Recent</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
};
