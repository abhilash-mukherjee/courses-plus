import { Container, Grid, Card, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function LandingPage({userEmail}) {
    return (
        <>
            <div>
                <Grid
                    container
                    justifyContent={'space-around'}
                    direction={'row-reverse'}
                    padding={'5vw'}
                    rowSpacing={{ xs: 1, sm: 2, md: 3 }}
                    columnSpacing={1}
                >
                    <Grid item xs={12} sm={12} md={5} lg={5}>
                        <img src='/class.jpeg' width={'100%'}></img>
                    </Grid>
                    <Grid item xs={12} sm={12} md={7} lg={6}
                    
                    style={{
                        marginRight:'10px'
                    }}>
                        <Typography variant="h4"> CoursePlus Admin </Typography>
                        <Typography variant="h6" fontWeight={'700'}> Earn, Teach, and Grow </Typography>
                        <br></br>
                        { !userEmail.email && <CTAs></CTAs>}
                    </Grid>
                </Grid>
            </div>
        </>
    )
}

function CTAs() {
    const navigate = useNavigate();
    return (
        <>
            <div
                style={{
                    display: 'flex',
                    gap:'10px'
                }}
            >
                <Button variant="contained"
                onClick={()=>{
                    navigate('/login')
                }}
                >Log In</Button>
                <Button variant="contained"
                onClick={()=>{
                    navigate('/signup')
                }}
                >Sign Up</Button>
            </div>
        </>
    )
}

export default LandingPage;