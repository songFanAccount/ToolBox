import { Box, IconButton, Link, List, ListItemText, Typography, useMediaQuery } from '@mui/material';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import Header from './Header/Header';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

function DefaultLayout() {
    /*
    use dimX to determine which version to render (mobile, desktop etc)
    0 -> smallest
    1 -> ipad/desktop?
    */
    let dimX = 0
    if(useMediaQuery('(min-width:900px)')) {
        dimX = 1
    }
    // MAYBE TODO: Add new dimX = 2 for min-width:900px
    return (
        <>
            <Box className="Background"
                sx={{
                    position: 'fixed',
                    width: 'calc(100vw + 10px)',
                    overflowX: 'clip',
                    height: '100vh',
                    backgroundColor: '#eeeeee',
                    zIndex: -1
                }}
            />
            <Box className="defaultLayout"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    width: 'calc(100vw+10px)',
                    overflowX: 'clip',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 8,
                }}
            >
                <Header dimX={dimX}/>
            </Box>
            <Outlet/>
        </>
    )
}

export default DefaultLayout

export function SectionBox(props) {
    const showBorder = !props.noBorder
    return (
        <Box
            sx={{
                ml: showBorder ? 1.5 : 0,
                mb: 3,
                pl: showBorder ? 2 : 0,
                py: showBorder ? 1.5 : 0,
                borderLeft: showBorder ? 2 : 0,
                borderColor: '#AEAEAE',
                display: 'flex',
                flexDirection: 'column',
                rowGap: 2,
                width: 'fit-content'
            }}
        >
            {props.children}
        </Box>
    )
}
export function PageTitle({title}) {
    return (
        <Typography
            id="The Tool"
            sx={{
                fontSize: 30,
                fontFamily: 'Montserrat',
                mb: 3
            }}
        >
            {title}
        </Typography>
    )
}

export function PageSectionTitle({title}) {
    return (
        <Typography
            id={title}
            sx={{
                fontSize: 24,
                fontFamily: 'Montserrat',
            }}
        >
            {title}
        </Typography>
    )
}

export function PageParagraph({text, bold, inline}) {
    return (
        <Typography display={inline ? 'inline' : 'block'}
            sx={{
                fontFamily: 'Verdana',
                fontWeight: bold ? 'bold' : 'normal',
                
            }}
        >
            {text}
        </Typography>
    )
}

export function PageTextList({list, listName}) {
    if(!list) {throw new Error("Need input list in PageTextList!")}
    return (
        <Box>
            <PageParagraph text={listName}/>
            <List sx={{pl: 4, listStyleType: 'square'}}>
                {list.map((e) => (
                    <ListItemText primaryTypographyProps={{fontFamily: 'Verdana'}} sx={{display: 'list-item'}}>{e}</ListItemText>
                ))}
            </List>
        </Box>
        
    )
}

export function PageEndSpace() {
    return (
        <Box
            sx={{
                height: 50
            }}
        />
    )
}
export function CopyableParagraph({preText, copyableText, copyable}) {
    return (
        <Box
            sx={{display: 'flex', alignItems: 'center'}}
        >
            <Typography
                sx={{fontFamily: 'Verdana',}}
            >
                {preText + copyableText}
            </Typography>
            {copyable && 
                <IconButton sx={{ml: .5}} onClick={() => navigator.clipboard.writeText(copyableText)}>
                    <ContentCopyIcon
                        sx={{fontSize: 20, color: 'black'}}
                    />
                </IconButton>
            }
        </Box>
    )
}

export function ExternalLink({href, target, children}) {
    return (
        <Link href={href} target={target}
            sx={{
                fontFamily: 'Verdana',
                color:'#011627',
                textDecorationColor: '#011627'
            }}
        >
            {children}
        </Link>
    )
}

/*
Remember to update this every time a new tool is done.
*/
const toolnameToPath = {
    'latex converter': '/tools/maths/latex-converter',
    'maths expression parser': '/tools/compsci/parsing/maths-expression-parser'
}
export function ToolLink({name, linkText}) {
    const toolPath = toolnameToPath[name]
    if(!toolPath) {throw new Error("No matching tool path for given name!")}
    return (
        <Link
            component={RouterLink}
            to={toolPath}
            sx={{
                fontFamily: 'Verdana',
                color:'#011627',
                textDecorationColor: '#011627'
            }}
        >
            {linkText}
        </Link>
    )
}
export function scrollWithOffset(el) {
    const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
    const yOffset = -100; 
    window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' }); 
}