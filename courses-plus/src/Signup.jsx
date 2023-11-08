import * as React from 'react';
import { border } from "@mui/system";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';


function Signup() {
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
                        id="outlined-basic"
                        label="Username"
                        variant="outlined"
                        fullWidth="true"
                    />

                    <br></br>
                    <br></br>
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        fullWidth="true"

                    />
                    <br></br>
                    <br></br>
                    <Button
                        variant="contained"
                        size={'large'}
                        onClick= {
                            ()=>{
                                console.log("signup clicked");
                            }
                        }
                        >Signup</Button>
                </Card>
            </div>
            </div>
            )
}

            export default Signup;