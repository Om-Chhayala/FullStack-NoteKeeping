import React from 'react'
import { CreateNote } from '../components/CreateNote'
import { useParams } from 'react-router-dom';

export const Note = () => {
  let { noteId } = useParams();
  console.log(noteId);
  return (

    <>

    <CreateNote/>

    </>
  )
}