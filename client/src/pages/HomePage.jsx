import React, { useState } from 'react';
import {CreateNote} from '../components/CreateNote'; // Import your CreateNote component
import { HexColorPicker } from "react-colorful";// Import HexColorPicker from the appropriate library
import Button from '@mui/material/Button';
import '../styles/homepage.css'
import { TopBar } from '../components/TopBar';


export function HomePage() {
  const [notes, setNotes] = useState('');
  const [filteredNotes, setFilteredNotes] = useState(notes);
  const [isCreateNoteOpen, setCreateNoteOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState('#ffffff'); 


  return <>
    <TopBar/>
    <div className="homepage">
      {!isCreateNoteOpen ? (
        <>
          <button onClick={() => setCreateNoteOpen(true)} className="plus-icon">
            <span className='plus-icon'>
              <div> + </div>
            </span>
          </button>
          <center>

{/* <HexColorPicker color={selectedColor} onChange={handleColorChange} /> */}
</center>
        </>
      ) : (
        
        <CreateNote backgroundColor={selectedColor} onClose={() => setCreateNoteOpen(false)} />
      )}

<div>
        {/* {filteredNotes.map((note) => (
          <div key={note.id}>{note.title}</div>
        ))} */}
      </div>
    </div>
    </>
}
