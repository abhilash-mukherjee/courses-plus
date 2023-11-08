import { Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function Appbar() {
    const navigate = useNavigate();
    return (
        <>
            <div style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px"
            }}>
                <div>
                    <Typography>Course Plus</Typography>
                </div>
                <div style={{ display: "flex" }}>
                    <div style={{ marginRight: "8px" }}>
                        <Button
                            variant="contained"
                            onClick= {
                                ()=>{
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
            </div>
        </>
    )

}

export default Appbar;