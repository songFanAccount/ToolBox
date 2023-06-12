import { Box, Typography, Link } from '@mui/material';
import NavBar from './NavBar';
import { Link as RouterLink } from 'react-router-dom';
import SideNavBar from '../SideNavBar';

function Header(props) {
    const dimX = props.dimX
    // Below styles are the default (dimX == 1, vw >= 600px) style
    let headerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#011627',
        position: 'fixed',
        top: 0,
        width: 1,
        height: 100,
    }
    let titleStyle = {
        color: '#fdfffc',
        px: 2,
        fontFamily: 'Braah One',
        fontSize: 40,
        fontWeight: 'bold'
    }
    switch(dimX) {
        case 0: // Case for small vw
            break
        case 1:
            break
        default:
            throw new Error("Invalid dimX")
    }
    
    return (
        <Box sx={headerStyle}>
            {dimX === 0 && <SideNavBar inHeader={true}/>}
            <Link
                component={RouterLink}
                to="/"
                sx={{
                    textDecoration: 'none',
                    my: 'auto',
                    ml: dimX === 0 ? 0 : 5,
                }}
            >
                <Typography component="h1" sx={titleStyle}>
                    ToolBox
                </Typography>
            </Link>
            <NavBar dimX={dimX}/>
        </Box>
    )
}
export default Header