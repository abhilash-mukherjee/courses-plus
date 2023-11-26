import * as React from 'react';
import { border } from "@mui/system";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/atoms/user';

function Signup() {
    const navigate = useNavigate();
    const setUserEmail = useSetRecoilState(userState);
    const [email, setEmail] = React.useState("");
    const [password, setPasswprd] = React.useState("");
    return (
        <div style={{
            paddingTop: "140px"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px"
            }}>
                <Typography variant='h6'>Signup for Course Plus</Typography>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center",
            }}>
                <Card style={
                    {
                        width: "400px",
                        padding: "20px"
                    }
                }>
                    <TextField
                        id="email"
                        label="Email"
                        variant="outlined"
                        fullWidth="true"
                        onChange={(e) => {
                            setEmail(e.target.value);
                        }}
                    />

                    <br></br>
                    <br></br>
                    <TextField
                        id="password"
                        label="Password"
                        variant="outlined"
                        fullWidth="true"
                        type={'password'}
                        onChange={(e) => {
                            setPasswprd(e.target.value);
                        }}
                    />
                    <br></br>
                    <br></br>
                    <Button
                        variant="contained"
                        size={'large'}
                        onClick={
                            async () => {
                                const response = await axios.post('http://localhost:3000/admin/signup/',
                                {
                                    username:email,
                                    password
                                }
                                )
                                if(response.status ===200){
                                    let data = response.data;
                                    localStorage.setItem('token',data.token);
                                    setUserEmail({
                                        email,
                                        isLoading: false
                                    });
                                    navigate('/');
                                }
                                else{
                                    console.log("ERROR");
                                }
                            }
                        }
                    >Signup</Button>
                </Card>
            </div>
        </div>
    )
}

export default Signup;