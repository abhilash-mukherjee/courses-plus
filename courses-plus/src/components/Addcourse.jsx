
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';



function AddCourse() {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [price, setPrice] = React.useState(0);
    const [imageLink, setImageLink] = React.useState("");
    return (
        <>
            <div style={{
                paddingTop: "140px"
            }}>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "20px"
                }}>
                    <Typography variant='h6'>Add New Course</Typography>
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
                            label="Title"
                            variant="outlined"
                            fullWidth="true"
                            required={true}
                            onChange={e => {
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
                            onChange={e => {
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
                            onChange={e => {
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
                            onChange={e => {
                                setImageLink(e.target.value)
                            }}
                        />
                        <br></br>
                        <br></br>
                        <Button
                            variant="contained"
                            size={'large'}
                            onClick={
                                async () => {
                                    if (!title || !description || !price)
                                        return;
                                    const data = {
                                        title,
                                        description,
                                        published: true,
                                        price,
                                        imageLink
                                    }
                                    const response = await fetch('http://localhost:3000/admin/courses', {
                                        method: 'POST',
                                        mode: 'cors',
                                        headers: {
                                            authorization: "Bearer " + localStorage.getItem('token'),
                                            "Content-Type": "application/json"
                                        },
                                        body: JSON.stringify(data)
                                    });
                                    if(response.status === 200)
                                    {response.json().then((body) => console.log(body))
                                    }
                                    else{
                                        console.log(body.message);
                                    }
                                }
                            }
                        >Add Course</Button>
                    </Card>
                </div>
            </div>
        </>
    )
}

export default AddCourse;