import { Card, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";

function Courses() {
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/admin/courses/', {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response => {
            response.json().then(
                body => {
                    setCourses(body.courses)
                }
            )
        })
    }, []);
    return (
        <>
            <div style={{
                marginLeft: '20px',
                marginRight: '20px'
            }}>
                <Typography variant="h4" textAlign={'center'}>Courses</Typography>
                <br></br>
                <Grid container
                rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                justifyContent={{xs:'center', sm:'center', md:'flex-start', lg:'flex-start'}}>
                    {courses.map(course => {
                        return (
                            <>
                                <Grid item xs={11} sm={9} md={6} lg={4} ><Course course={course}></Course></Grid>
                            </>
                        )
                    })}
                </Grid>
            </div>
        </>
    )
}

function Course(props) {
    return (
        <>
            <Card style={{
                marginBottom: "20px",
                height: '300px',
                paddingInline: "8px",
                paddingBlock: "16px",
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Typography variant="h6" textAlign={'center'}>{props.course.title}</Typography>
                <br></br>
                <img src={props.course.imageLink} style={{
                    height:'60%',
                    maxWidth: '80%',
                    alignSelf:'center'
                }}></img>
                <br></br>
                <Typography textAlign={'center'}>{props.course.description}</Typography>
            </Card>
        </>
    )
}

export default Courses;