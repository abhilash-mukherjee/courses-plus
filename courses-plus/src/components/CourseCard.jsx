import { useNavigate } from 'react-router-dom';
import { Button, Card, Typography } from "@mui/material";
function CourseCard(props) {
    const navigate = useNavigate();
    return (
        <>
            <Card style={{
                marginBottom: "20px",
                height: '320px',
                paddingInline: "8px",
                paddingBlock: "16px",
                display: 'flex',
                flexDirection: 'column',
                justifyContent:'space-between'
            }}>
                <Typography variant="h6" textAlign={'center'}>{props.course.title}</Typography>
                <img src={props.course.imageLink} style={{
                    height: '60%',
                    maxWidth: '80%',
                    alignSelf: 'center'
                }}></img>
                <Typography textAlign={'center'}>{props.course.description}</Typography>
                {props.showEdit ?
                    (
                        <Button 
                        variant='contained' 
                        style={{maxWidth:'200px', alignSelf:'center'} }
                        onClick={()=>{
                            navigate(`/courses/${props.course._id}/`)
                        }}
                        >Edit Course</Button>
                    ) :
                    (<></>)}
            </Card>
        </>
    )
}

export default CourseCard;