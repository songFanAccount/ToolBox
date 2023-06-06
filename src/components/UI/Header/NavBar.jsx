import { Box, IconButton, Link } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink } from 'react-router-dom';

function NavBarLink({href, text}) {
    return (
        <Link 
            component={RouterLink}
            to={href}
            onClick={() => window.scrollTo(0,0)}
            sx={{
                mx: 2,
                fontSize: 16,
                fontFamily: 'Montserrat',
                color: '#fdfffc',
                textDecoration: 'none',
                '&:hover': {
                    color: '#ced4da'
                }
            }}
        >
            {text}
        </Link>
    )
}
function NavBar(props) {
    const dimX = props.dimX

    const barStyle = {
        my: 'auto',
        mr: 2.5,
        //backgroundColor: 'red'
    }

    function openMenu() {
        console.log("open menu")
    }
    const Contents = () => {
        switch (dimX) {
            case 0:
                return (
                    <IconButton
                        onClick={openMenu}
                    >
                        <MenuIcon
                            sx={{
                                fontSize: 32,
                                color: '#fdfffc',
                                backgroundColor: '#595959',
                                p: 1,
                                border: 1,
                                borderColor: 'transparent',
                                borderRadius: '50%'
                            }}
                        />
                    </IconButton>
                )
            case 1:
                return (
                    <>
                        <NavBarLink href="/" text="Home"/>
                        <NavBarLink href="about" text="About Us"/>
                        <NavBarLink href="collab" text="Collaborate"/>
                        <NavBarLink href="contact" text="Contact Us"/>
                    </>
                )
            default:
                return (
                    <></>
                )
        }
    }
    return (
        <Box sx={barStyle}>
            <Contents/>
        </Box>
    )
}
export default NavBar 