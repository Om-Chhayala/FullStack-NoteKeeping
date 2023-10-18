import React, { useEffect } from 'react'
import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import {Card, Typography} from "@mui/material";
import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { login } from '../actions/userActions';


export const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, token } = userLogin;
  
    useEffect(() => {
      if(token) {
        console.log("token is there");
        navigate('/');
      }
    }, [token ,navigate]);

      const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    const SubmitHandler = async (e) => {
      e.preventDefault();
      dispatch(login(email, password));
    }
  
  

    return <div>
            <div style={{
                paddingTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant={"h6"}>
                Welcome to Note Taking App
                </Typography>
            </div>
        <div style={{display: "flex", justifyContent: "center"}}>
            <Card varint={"outlined"} style={{width: 400, padding: 20}}>
                <TextField
                    onChange={(evant11) => {
                        let elemt = evant11.target;
                        setEmail(elemt.value);
                    }}
                    fullWidth={true}
                    label="Email"
                    variant="outlined"
                />
                <br/><br/>
                <TextField
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    fullWidth={true}
                    label="Password"
                    variant="outlined"
                    type={"password"}
                />
                <br/><br/>

                <Button
                    size={"large"}
                    variant="contained"
                    onClick={SubmitHandler}
                > Signin</Button>
                          {error && (
            <div style={{ color: 'red', marginTop: '10px' }}>
              Invalid credentials. Please check your email and password.
            </div>
          )}
            </Card>
        </div>
    </div>
}