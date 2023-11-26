import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
function Appbar({ userEmail, setUserEmail }) {
    const navigate = useNavigate();
    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px"
            }}>
                <div>
                    <Button
                        onClick={
                            () => {
                                navigate('/')
                            }
                        }
                    >Course Plus</Button>
                </div>
                <TopRight username={userEmail} navigate={navigate} setUserEmail = {setUserEmail}></TopRight>
            </div>
        </>
    )

}

function TopRight(props) {

    if (!props.username) {
        return (
            <>
                <SignupCTAs navigate={props.navigate}></SignupCTAs>
            </>
        )
    }
    else {
        return (
            <>
                <LoggedInCTAs navigate={props.navigate} username={props.username} setUserEmail = {props.setUserEmail}></LoggedInCTAs>
            </>
        )
    }

}

function SignupCTAs(props) {
    return (
        <>
            <div style={{ display: "flex" }}>
                <div style={{ marginRight: "8px" }}>
                    <Button
                        variant="contained"
                        onClick={
                            () => {
                                console.log("Go to login");
                                props.navigate("/login");
                            }
                        }
                    >Login</Button></div>
                <div><Button
                    variant="outlined"
                    onClick={
                        () => {
                            props.navigate("/signup");
                            console.log("Go to Signup");
                        }
                    }
                >Signup</Button></div>
            </div>
        </>
    )
}

function LoggedInCTAs(props) {
    return (
        <>
            <div style={{ display: "flex" }}>
                <div style={{
                    display: "flex",
                    alignContent: "center",
                    marginRight: "16px"
                }}>
                    <Typography>{props.username}</Typography>
                </div>
                <div style={{ marginRight: "8px" }}>
                    <Button
                        variant="text"
                        onClick={
                            () => {
                                props.navigate('/addCourse');
                            }
                        }
                    >Add Course</Button>

                    <Button
                        variant="text"
                        onClick={
                            () => {
                                props.navigate('/courses')
                            }
                        }
                    >Courses</Button>

                    <Button
                        variant="contained"
                        onClick={
                            () => {
                                localStorage.setItem('token', undefined);
                                props.setUserEmail(null)
                            }
                        }
                    >Logout</Button>
                </div>
            </div>
        </>
    )
}

export default Appbar;