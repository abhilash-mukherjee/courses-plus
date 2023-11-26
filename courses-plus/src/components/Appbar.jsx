import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import { userEmailState } from "../store/selectors/userEmail";
function Appbar() {
    const [ userEmail, setUserEmail ] = useRecoilState(userState);
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

    if (!props.username.email) {
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

function SignupCTAs() {
    const navigate = useNavigate();
    return (
        <>
            <div style={{ display: "flex" }}>
                <div style={{ marginRight: "8px" }}>
                    <Button
                        variant="contained"
                        onClick={
                            () => {
                                console.log("Go to login");
                                navigate("/login");
                            }
                        }
                    >Login</Button></div>
                <div><Button
                    variant="outlined"
                    onClick={
                        () => {
                            navigate("/signup");
                            console.log("Go to Signup");
                        }
                    }
                >Signup</Button></div>
            </div>
        </>
    )
}

function LoggedInCTAs() {
    const navigate = useNavigate();
    const setUserEmail = useSetRecoilState(userState);
    const email = useRecoilValue(userEmailState);
    return (
        <>
            <div style={{ display: "flex" }}>
                <div style={{
                    display: "flex",
                    alignContent: "center",
                    marginRight: "16px"
                }}>
                    <Typography>{email}</Typography>
                </div>
                <div style={{ marginRight: "8px" }}>
                    <Button
                        variant="text"
                        onClick={
                            () => {
                                navigate('/addCourse');
                            }
                        }
                    >Add Course</Button>

                    <Button
                        variant="text"
                        onClick={
                            () => {
                                navigate('/courses')
                            }
                        }
                        >Courses</Button>

                    <Button
                        variant="contained"
                        onClick={
                            () => {
                                localStorage.setItem('token', undefined);
                                setUserEmail({
                                    email: null,
                                    isLoading: false
                                });
                                navigate('/');
                            }
                        }
                    >Logout</Button>
                </div>
            </div>
        </>
    )
}

export default Appbar;