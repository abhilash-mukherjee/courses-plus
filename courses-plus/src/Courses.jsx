import {  Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CourseCard  from "./CourseCard";

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
                                <Grid item xs={11} sm={9} md={6} lg={4} ><CourseCard course={course} showEdit = {true}></CourseCard></Grid>
                            </>
                        )
                    })}
                </Grid>
            </div>
        </>
    )
}


export default Courses;