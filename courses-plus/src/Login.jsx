import * as React from 'react';
import { border } from "@mui/system";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';



function Login() {
    const [email,setEmail] = React.useState("");
    const [password,setPassword] = React.useState("");
    return (
        <div style={{
            paddingTop: "140px"
        }}>

            <div style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "20px"
            }}>
                <Typography variant='h6'>Welcome Back!</Typography>
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
                        label="Username"
                        variant="outlined"
                        fullWidth="true"
                        onChange={(e)=>{
                            setEmail(e.target.value);
                        }}
                    />

                    <br></br>
                    <br></br>
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth="true"
                        type= {'password'}
                        onChange={(e)=>{
                            setPassword(e.target.value);
                        }}
                    />
                    <br></br>
                    <br></br>
                    <Button
                        variant="contained"
                        size={'large'}
                        onClick={
                            async () => {
                                const data = {
                                    username: email,
                                    password
                                };
                                const response = await fetch('http://localhost:3000/admin/login/',
                                    {
                                        method: "POST",
                                        mode: "cors",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        body: JSON.stringify(data)
                                    })
                                if(response.status ===200){
                                    response.json().then(body => {
                                        localStorage.setItem('token',body.token)
                                    });
                                }
                                else{
                                    console.log("ERROR");
                                }
                                    
                            }
                        }
                        >Log In</Button>
                </Card>
            </div>
            </div>
            )
}

            export default Login;