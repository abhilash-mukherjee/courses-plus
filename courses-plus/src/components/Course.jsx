import * as React from 'react';
import { Grid, Typography, Card, TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";
import CourseCard from './CourseCard';
import { Container } from "@mui/system";
import axios from 'axios';
function Course() {
    let { courseId } = useParams();
    console.log('id: ', courseId);
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        axios('http://localhost:3000/admin/courses', {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response => setCourses(response.data.courses))
    }, [])
    return (
        <>
            <EditCourseContainer courses={courses} courseId={courseId} setCourses={setCourses}></EditCourseContainer>
        </>
    )
}

function EditCourseContainer(props) {
    const courses = props.courses;
    const setCourses = props.setCourses;
    console.log(courses)
    if (courses && courses.length > 0) {
        const course = courses.find(c => c._id === props.courseId);
        if (!course) {
            return (
                <>
                    <Typography variant="h4">404 Not Found</Typography>
                </>
            )
        }
        else {
            return (
                <>
                    <div style={{
                        height: '200px',
                        backgroundColor: '#04364A',
                        marginBottom: '20px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>

                        <Grid
                            container
                            alignContent={'center'}
                            justifyContent={'center'}
                            rowGap={1}
                            alignItems={'center'}
                        >
                            <Grid item xs={10} sm={10} md={8} lg={6}>
                                <Typography
                                    variant='h3'
                                    course={course}
                                    color={'white'}
                                >
                                    {course.title}
                                </Typography>
                            </Grid>
                            <Grid item xs={10} sm={10} md={3} lg={3} >
                                <Typography
                                    variant='h5'
                                    course={course}
                                    color={'white'}
                                    textAlign={'right'} >
                                    {'INR ' + course.price}
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    <Container>
                        <Grid
                            container
                            justifyContent={'center'}
                            spacing={4}
                        >
                            <Grid
                                item
                                xs={11} sm={10} md={6} lg={4}
                            >
                                <CourseCard course={course} showEdit={false}></CourseCard>
                            </Grid>
                            <Grid
                                item
                                xs={11} sm={10} md={6} lg={4}
                            >
                                <UpdateCourse course={course} setCourses={setCourses} courses={courses}></UpdateCourse>
                            </Grid>
                        </Grid>
                    </Container>
                </>
            )
        }
    }
    else return (
        <>
            <div>
                Loading...
            </div>
        </>
    )
}


function UpdateCourse(props) {

    const course = props.course;
    const courses = props.courses;
    const setCourses = props.setCourses;
    const [title, setTitle] = React.useState(course.title);
    const [description, setDescription] = React.useState(course.description);
    const [price, setPrice] = React.useState(course.price);
    const [imageLink, setImageLink] = React.useState(course.imageLink);
    return (
        <>
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
                        label="Title"
                        variant="outlined"
                        fullWidth="true"
                        required={true}
                        defaultValue={course.title}
                        onChange={(e) => {
                            setTitle(e.target.value)
                        }}
                    />

                    <br></br>
                    <br></br>
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth="true"
                        required={true}
                        defaultValue={course.description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                        label="Price (INR)"
                        variant="outlined"
                        fullWidth="true"
                        required={true}
                        type='number'
                        defaultValue={course.price}
                        onChange={(e) => {
                            setPrice(e.target.value)
                        }}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                        label="Image Link"
                        variant="outlined"
                        fullWidth="true"
                        required={true}
                        defaultValue={course.imageLink}
                        onChange={(e) => {
                            setImageLink(e.target.value)
                        }}
                    />
                    <br></br>
                    <br></br>
                    <Button
                        variant="contained"
                        size={'large'}
                        onClick={async () => {
                            setCourses(courses.map(c => {
                                if (c.id === course.id) {
                                    c.title = title;
                                    c.description = description;
                                    c.imageLink = imageLink;
                                    c.price = price;
                                }
                                return c;
                            }));

                            const data = {
                                title,
                                description,
                                published: true,
                                price,
                                imageLink,
                            }
                            const response = await fetch('http://localhost:3000/admin/courses/' + course._id, {
                                method: 'PUT',
                                mode: 'cors',
                                headers: {
                                    authorization: "Bearer " + localStorage.getItem('token'),
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(data)
                            });

                            response.json().then((body) => {
                                console.log(body.message)
                            })

                        }}
                    >Update Course</Button>
                </Card>
            </div>
        </>
    )
}

export default Course;