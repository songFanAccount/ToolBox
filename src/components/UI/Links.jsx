import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function LinkConstructor(props) {
    return (
        <Link 
            component={RouterLink}
            to={props.href}
            sx={props.sx}
        >
            {props.text}
        </Link>
    )
}
export function NavBarLink(props) {
    const sx = {
        mx: 2,
        fontSize: 16,
        fontFamily: 'Montserrat',
        color: '#fdfffc',
        textDecoration: 'none',
        '&:hover': {
            color: '#ced4da'
        }
    }
    return (
        <LinkConstructor 
            href={props.href} 
            text={props.text}
            sx={sx}
        />
    )
}