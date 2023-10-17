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
  
  // return (
  //   <div>
  //     {data.notedata ? (
  //       <div style={{
  //         display: "flex",
  //         flexDirection: "column",
  //         justifyContent: "space-around",
  //         margin: "20px"
  //       }}>
  //         <Typography textAlign="center" variant="h5" style={{ fontSize: 18, fontWeight: 'bold' }} dangerouslySetInnerHTML={sanitizeHTML(data.notedata.title)} />
  //         <Typography textAlign="center" variant="h5" style={{ fontSize: 18, fontWeight: 'bold' }} dangerouslySetInnerHTML={sanitizeHTML(data.notedata.description)} />
  //         <Typography textAlign="center" variant="h5" style={{ fontSize: 18, fontWeight: 'bold' }}>
  //           <a href={data.notedata.link} target="_blank" rel="noopener noreferrer">
  //             {data.notedata.link}
  //           </a>
  //         </Typography>
  //       </div>
  //     ) : (
  //       <p>Loading...</p>
  //     )}
  //   </div>
  // );
};
// import React, { useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { Paper, Typography } from '@mui/material';
// import { useSelector, useDispatch } from 'react-redux';
// import { fetchNote } from '../actions/noteActions';

// export const Readnote = () => {
//   let { noteId } = useParams();
//   const dispatch = useDispatch();
//   const { loading, note, error } = useSelector((state) => state.notes);

//   useEffect(() => {
//     dispatch(fetchNote(noteId));
//   }, [noteId, dispatch]);

//   return (
//     <div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : error ? (
//         <p>Error: {error}</p>
//       ) : note ? (
//         <div style={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-around",
//           margin: "20px"
//         }}>
//           <Typography textAlign="center" variant="h5" style={{ fontSize: 18, fontWeight: 'bold' }}>{note.title}</Typography>
//           <Typography textAlign="center" variant="h5" style={{ fontSize: 18, fontWeight: 'bold' }}>{note.description}</Typography>
//           <Typography textAlign="center" variant="h5" style={{ fontSize: 18, fontWeight: 'bold' }}>
//             <a href={note.link} target="_blank" rel="noopener noreferrer">
//               {note.link}
//             </a>
//           </Typography>
//         </div>
//       ) : null}
//     </div>
//   );
// };
