import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Paper, Typography } from '@mui/material';
import DOMPurify from 'dompurify'; // You need to install this library
import "../styles/readnote.css"

export const Readnote = () => {
  let { noteId } = useParams();
  const [data, setData] = useState({});

  const sanitizeHTML = (html) => {
    const cleanHTML = DOMPurify.sanitize(html);
    return { __html: cleanHTML };
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/user/getnotedata/${noteId}`, {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      });
      setData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [noteId]);

  return (
    <div className="container">
      {data.notedata ? (
        <div className="note-card">
          <Typography className="title" dangerouslySetInnerHTML={sanitizeHTML(data.notedata.title)} />
          <Typography className="description" dangerouslySetInnerHTML={sanitizeHTML(data.notedata.description)} />
          <a className="link" href={data.notedata.link} target="_blank" rel="noopener noreferrer">
            {data.notedata.link}
          </a>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}