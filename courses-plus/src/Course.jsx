import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { json, useParams } from "react-router-dom";

function Course() {
    let { courseId } = useParams();
    console.log('id: ',courseId);
    const [courses, setCourses] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/admin/courses', {
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        }).then(response => {
            response.json().then(body => {
                setCourses(body.courses);
            })
        })
    }, [])
    return (
        <>
            <Test courses={courses} courseId={courseId}></Test>
        </>
    )
}

function Test(props) {
    const courses = props.courses;
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
                    <div>
                        {course.title}
                    </div>
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

export default Course;