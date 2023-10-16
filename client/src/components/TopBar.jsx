import React from 'react';
import { useState , useEffect} from 'react';
import '../styles/topbar.css';
import axios from 'axios';
import { HomePage } from '../pages/HomePage';



export const TopBar = () => {

  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
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
      <label>Sort by :</label>
        <select >
          <option value="recent">Most-Recent</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
    </div>
  );
};