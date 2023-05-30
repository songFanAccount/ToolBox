import { Box, Typography } from '@mui/material';
import { Helmet } from 'react-helmet';
import SideNavBar from '../components/UI/SideNavBar';

function Home() {
    return (
        <>
            <Helmet>
                <title>ToolBox</title>
            </Helmet>
            <Box> 
                <Typography>Home Page</Typography>
            </Box>
            <SideNavBar inHeader={false}/>
        </>  
    )
}

export default Home