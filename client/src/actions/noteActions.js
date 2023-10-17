// actions/noteActions.js
import axios from "axios";
import {
  NOTE_ADD_REQUEST,
  NOTE_ADD_SUCCESS,
  NOTE_ADD_FAIL,
  NOTES_REQUEST,
  NOTES_SUCCESS,
  NOTES_FAIL,
  NOTE_UPDATE_REQUEST,
  NOTE_UPDATE_SUCCESS,
  NOTE_UPDATE_FAIL,
  FETCH_NOTE_REQUEST,
  FETCH_NOTE_SUCCESS,
  FETCH_NOTE_FAIL,
  NOTE_DELETE_REQUEST,
  NOTE_DELETE_SUCCESS,
  NOTE_DELETE_FAIL,
} from "../constants/noteConstants";

export const addNote = (title, description, link) => async (dispatch) => {
  try {
    dispatch({ type: NOTE_ADD_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };

    await axios.post(
      "http://localhost:8000/user/addnote",
      {
        title,
        description,
        link,
      },
      config
    );

    dispatch({ type: NOTE_ADD_SUCCESS });
  } catch (error) {
    dispatch({
      type: NOTE_ADD_FAIL,
      payload: error.response ? error.response.data.message : error.message,
    });
  }
};


export const getNotes = () => async (dispatch) => {
  try {
    dispatch({ type: NOTES_REQUEST });

    const response = await axios.get('http://localhost:8000/user/allnote', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    dispatch({ type: NOTES_SUCCESS, payload: response.data.allnotes });
  } catch (error) {
    dispatch({ type: NOTES_FAIL, payload: error.message });
  }
};


export const updateNote = (noteId, title, description, link) => async (dispatch) => {
  try {
    dispatch({ type: NOTE_UPDATE_REQUEST });

    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await axios.put(`http://localhost:8000/user/notes/${noteId}`, {
      title,
      description,
      link,
    }, {
      headers,
    });

    dispatch({ type: NOTE_UPDATE_SUCCESS });
  } catch (error) {
    dispatch({
      type: NOTE_UPDATE_FAIL,
      payload: error.response
        ? error.response.data.message
        : error.message,
    });
  }
};


export const fetchNote = (noteId) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_NOTE_REQUEST });

    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    };

    const { data } = await axios.get(
      `http://localhost:8000/user/getnotedata/${noteId}`,
      config
    );

    dispatch({ type: FETCH_NOTE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: FETCH_NOTE_FAIL,
      payload: error.response
        ? error.response.data.message
        : error.message,
    });
  }
};

export const deleteNote = (noteId) => async (dispatch) => {
  try {
    dispatch({ type: NOTE_DELETE_REQUEST });

    const token = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.delete(
      `http://localhost:8000/user/deletenote/${noteId}`,
      { headers }
    );

    dispatch({ type: NOTE_DELETE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: NOTE_DELETE_FAIL,
      payload: error.response
        ? error.response.data.message
        : error.message,
    });
  }
};





