import { Box, List } from "@mui/material"
import { HashLink } from 'react-router-hash-link';
import { Link } from '@mui/material';
import { scrollWithOffset } from "./DefaultLayout";

function ToolPageNav({sections}) {
    if(!sections || sections.length === 0) {throw new Error("ToolPageNav: Not provided sections array!")}
    const ListLink = ({text}) => {
        let link = text === "The Tool" ? "top" : text
        return (
            <Link
                component={HashLink}
                smooth to={`#${link}`}
                scroll={e => scrollWithOffset(e)}
                underline="hover"
                sx={{
                    display: 'list-item',
                    width: 'fit-content',
                    color: 'black',
                    fontSize: 18,
                    fontFamily: 'Ubuntu',
                    pt: 0.6,
                    px: 0,
                }}
            >
                {text}
            </Link>
        )
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                width: 1,
                pb: 'auto',
            }}
        >
            <List
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    listStyleType: 'square',
                    pl: 4,
                }}
            >
                {sections.map((e) => (<ListLink text={e}/>))}
            </List>
        </Box>
    )
}

export default ToolPageNav