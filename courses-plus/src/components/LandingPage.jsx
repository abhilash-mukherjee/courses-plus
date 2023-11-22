import { Container, Grid,Card } from "@mui/material";

function LandingPage(){
return(
    <>
    <div
    style={
        {
            padding:'10px'
        }
    }
    >
        <Grid container
        justifyContent={'space-around'}
        >
            <Grid 
            item
            xs={12} sm={12} md={7} lg={7}         
            >
                <Card>
                    {'hi'}
                </Card>
            </Grid>
            <Grid 
            item
            xs={12}sm={12} md={5} lg={5}         
            >
                <Card>
                    {'Hi'}
                </Card>
            </Grid>
        </Grid>
    </div>
    </>
)
}

export default LandingPage;