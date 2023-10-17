import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, token } = userLogin;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  // Check if the user is logged in and navigate accordingly
  if (token) {
    navigate('/');
  }

  return (
    <div>
      <div style={{ paddingTop: 150, marginBottom: 10, display: 'flex', justifyContent: 'center' }}>
        <Typography variant="h6">Welcome to Note Taking App</Typography>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card variant="outlined" style={{ width: 400, padding: 20 }}>
          <TextField
            onChange={(event) => {
              let element = event.target;
              setEmail(element.value);
            }}
            fullWidth
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            fullWidth
            label="Password"
            variant="outlined"
            type="password"
          />
          <br />
          <br />
          <Button size="large" variant="contained" onClick={submitHandler}>
            Signin
          </Button>
        </Card>
      </div>
    </div>
  );
};
