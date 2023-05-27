import React from 'react';
import { Box, IconButton, Link, List, ListItemText, Collapse, Typography, useMediaQuery, Button } from '@mui/material';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import Header from './Header/Header';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

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
            <Outlet context={{dimX: dimX}}/>
        </>
    )
}

export default DefaultLayout

function Contents({noBorder, children}) {
    return(
        <Box
            sx={{
                ml: noBorder ? 0 : 1.5,
                mb: 3,
                pl: noBorder ? 0 : 2,
                py: noBorder ? 0 : 1.5,
                borderLeft: noBorder ? 0 : 2,
                borderColor: '#AEAEAE',
                display: 'flex',
                flexDirection: 'column',
                rowGap: 2,
                width: 'fit-content',
                maxWidth: 1
            }}
        >
            {children}
        </Box>
    )
}

export function SectionBox({title, noBorder, children}) {
    return (
        <Box>
            {title && <PageSectionTitle title={title}/>}
            <Contents noBorder={noBorder} children={children}/>
        </Box>
    )
}

export function CollapseSectionBox({title, children, startClosed}) {
    if(!title) {throw new Error("CollapseSectionBox: Cannot be collapsible without title!")}
    const [open, setOpen] = React.useState(startClosed ? false : true)
    function handleClick() {
        setOpen(!open)
    }
    const CollapseContents = () => {
        return (
            <Collapse
                in={open}
            >
                <Contents children={children}/>
            </Collapse>
        )
    }
    const CollapseTitle = () => {
        return (
            <Button
                disableRipple
                onClick={handleClick}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'black',
                    p: 0,
                    textTransform: 'none',
                    '&:hover': {
                        backgroundColor: 'transparent'
                    }
                }}
            >
                <PageSectionTitle title={title}/>
                {open ? <KeyboardArrowUpIcon sx={{fontSize: 30, ml: 1}}/> : <KeyboardArrowDownIcon sx={{fontSize: 30, ml: 1}}/>}
            </Button>
        )
    }
    return (
        <Box>
            <CollapseTitle/>
            <CollapseContents/>
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

/*
By default, paragraphs are inline, since it is common to insert link or want to modify part of the paragraph.
*/
export function PageParagraph({text, bold, block, color}) {
    if(!text) {return <></>}
    return (
        <Typography display={block ? 'block' : 'inline'}
            sx={{
                fontFamily: 'Verdana',
                fontWeight: bold ? 'bold' : 'normal',
                color: color ? color : 'inherit'
            }}
        >
            {text}
        </Typography>
    )
}

export function PageTextList({list, listName, noPaddingsY}) {
    if(!list) {throw new Error("Need input list in PageTextList!")}
    const ListElement = ({element}) => {
        if(typeof element === 'string') {
            return <ListItemText primaryTypographyProps={{fontFamily: 'Verdana'}} sx={{display: 'list-item'}}>{element}</ListItemText>
        } else {
            return <Box sx={{display: 'list-item'}}>{element}</Box>
        }
    }
    return (
        <Box>
            <PageParagraph text={listName}/>
            <List sx={{pl: 4, listStyleType: 'square', py: noPaddingsY ? 0 : 'inherit',}}>
                {list.map((e) => (
                    <ListElement element={e}/>
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
        <Link href={href} target={target ? target : '_blank'}
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
            onClick={() => window.scrollTo(0, 0)}
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