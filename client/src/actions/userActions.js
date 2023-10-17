import {
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    
  } from "../constants/userConstants";
  import { useNavigate } from "react-router-dom";
  import axios from "axios";
  // import { useNavigate } from "react-router-dom";

  export const login = (email, password) => async (dispatch) => {
    // const navigate = useNavigate();
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "http://localhost:8000/auth/login",
        { email, password },
        config
      );
  
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  
      localStorage.setItem("token", data.token); // You should specify a key for localStorage
      // navigate("/");
    } catch (error) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response
          ? error.response.data.message
          : error.message,
      });
    }
  };

  export const signup = (name, email, password) => async (dispatch) => {
    try {
      dispatch({ type: USER_SIGNUP_REQUEST });
  
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
  
      const { data } = await axios.post(
        "http://localhost:8000/auth/signup",
        { name, email, password },
        config
      );
  
      dispatch({ type: USER_SIGNUP_SUCCESS, payload: data });
  
      localStorage.setItem("token", data.token);
    } catch (error) {
      dispatch({
        type: USER_SIGNUP_FAIL,
        payload: error.response
          ? error.response.data.message
          : error.message,
      });
    }
  };