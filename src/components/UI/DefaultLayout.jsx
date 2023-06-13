import React, { useState } from 'react';
import { Box, IconButton, Link, List, ListItemText, Collapse, Typography, useMediaQuery, Button, Stack, Alert, AlertTitle } from '@mui/material';
import { Outlet, Link as RouterLink } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
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
            <Box className="defaultLayout"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 'calc(100vw + 10px)',
                    overflowX: 'clip',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    zIndex: 4,
                }}
            >
                <Header dimX={dimX}/>
            </Box>
            <Box className="pageContent"
                sx={{
                    position: 'absolute',
                    width: '100%',
                    top: 100,
                    zIndex: 3
                }}
            >
                <Outlet context={{dimX: dimX}}/>
            </Box>
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover
                theme="colored"
                transition={Slide}
            />
        </>
    )
}

export default DefaultLayout

function Contents({noBorder, children, mb=3, rowGap=2}) {
    return(
        <Box
            sx={{
                ml: noBorder ? 0 : 1.5,
                mb: mb,
                pl: noBorder ? 0 : 2,
                py: noBorder ? 0 : 1.5,
                borderLeft: noBorder ? 0 : 2,
                borderColor: '#AEAEAE',
                display: 'flex',
                flexDirection: 'column',
                rowGap: rowGap,
                width: 'fit-content',
                maxWidth: 1
            }}
        >
            {children}
        </Box>
    )
}

export function SectionBox({title, noBorder, children, usePageTitle, mb=3, rowGap=2}) {
    return (
        <Box>
            {title && usePageTitle ? <PageTitle title={title}/> : <PageSectionTitle title={title}/>}
            <Contents noBorder={noBorder} children={children} mb={mb} rowGap={rowGap}/>
        </Box>
    )
}

export function CollapseSectionBox({title, children, startClosed, usePageTitle}) {
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
        const iconSx = {fontSize: 30, ml: 1, mb: usePageTitle ? 2 : 0}
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
                {usePageTitle ? <PageTitle title={title}/> : <PageSectionTitle title={title}/>}
                {open ? <KeyboardArrowUpIcon sx={iconSx}/> : <KeyboardArrowDownIcon sx={iconSx}/>}
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

export function InfoPageTitle({title, color, fs}) {
    return (
        <Typography
            sx={{
                fontSize: fs,
                fontFamily: 'Braah One',
                mb: 3,
                color: color,
                width: 'fit-content'
            }}
        >
            {title}
        </Typography>
    )
}

export function PageTitle({title, color, fs=30, underline='inherit', align, mb, inline}) {
    return (
        <Typography
            id="The Tool"
            sx={{
                fontSize: fs,
                fontFamily: 'Montserrat',
                mb: mb !== undefined ? mb : 3,
                borderBottom: underline ? 2 : 0,
                borderBottomStyle: underline,
                borderBottomColor: color,
                color: color,
                width: 'fit-content',
                textAlign: align ? 'center' : 'start',
                display: inline ? 'inline' : 'block'
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
export function PageParagraph({text, bold, block, color='inherit', fs='medium'}) {
    if(!text) {return <></>}
    return (
        <Typography display={block ? 'block' : 'inline'}
            sx={{
                fontFamily: 'Verdana',
                fontWeight: bold ? 'bold' : 'normal',
                color: color,
                fontSize: fs
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
                height: 100
            }}
        />
    )
}

export function TBTextButton({text, onClick, color='inherit', alignSelf="auto"}) {
    return (
        <Button
            onClick={onClick}
            sx={{
                padding: 0,
                minHeight: 0,
                minWidth: 0,
                textTransform: 'none',
                textDecoration: 'underline',
                textDecorationColor: color,
                color: color,
                alignSelf: alignSelf,
                '&:hover': {
                    backgroundColor: 'transparent',
                    textDecoration: 'underline',
                    textDecorationColor: color,
                }
            }}
        >
            {text}
        </Button>
    )
}
export function TBAlert({title, contents, status}) {
    const [open, setOpen] = useState(false)
    return (
        <Alert severity={status}>
            <Stack
                direction="column"
                alignItems="flex-start"
            >
                <AlertTitle>
                    {title}
                </AlertTitle>
                {!open && <TBTextButton text="Read more" onClick={() => setOpen(true)}/>}
                {open && contents}
                {open && <TBTextButton text="Close" alignSelf="flex-end" onClick={() => setOpen(false)}/>}
            </Stack>
        </Alert>
    )
}
export function CopyButton({copyableText}) {
    return (
        <IconButton sx={{ml: .5, pb:3}} onClick={() => navigator.clipboard.writeText(copyableText)}>
            <ContentCopyIcon
                sx={{fontSize: 20, color: 'black'}}
            />
        </IconButton>
    )
}
export function CopyableParagraph({preText, copyableText, copyable}) {
    return (
        <Stack
            direction='column'
            rowGap={2}
        >
            <Typography
                sx={{fontFamily: 'Verdana', overflowX: 'auto'}}
            >
                {preText}
            </Typography>
            <Box
                sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap',}}
            >
                <Typography
                    sx={{fontFamily: 'Verdana', overflowX: 'auto', pb:2}}
                >
                    {copyableText}
                </Typography>
                {copyable && 
                    <CopyButton copyableText={copyableText}/>
                }
            </Box>
        </Stack>
    )
}

export function LatexBox({latex, fs=20, pb=2}) {
    return (
        <Typography sx={{fontSize: fs, overflowX: 'auto', pb:pb}}>{latex}</Typography>
    )
}

export function TBButton({buttonText, onClick}) {
    return (
        <Button 
            variant="outlined"
            onClick={onClick}
            disableRipple
            sx={{
                width: 'fit-content',
                p:1,
                m:2,
                backgroundColor: '#011627',
                borderColor: '#011627',
                '&:hover': {
                    backgroundColor: '#011627',
                    borderColor: '#011627'
                },
            }}
        >
            <Typography sx={{color: '#fdfffc', fontFamily: 'Verdana', fontSize: 14, fontWeight: 550}}>{buttonText}</Typography>
        </Button>
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
    'home': '/',
    'about': '/about',
    'contact': '/contact',
    'collab': '/collab',
    'latex converter': '/tools/maths/latex-converter',
    'maths expression parser': '/tools/compsci/parsing/maths-expression-parser'
}
export function ToolLink({name, linkText, fs=14, color='#011627'}) {
    const toolPath = toolnameToPath[name]
    if(!toolPath) {throw new Error("No matching tool path for given name!")}
    return (
        <Link
            component={RouterLink}
            to={toolPath}
            onClick={() => window.scrollTo(0, 0)}
            sx={{
                fontFamily: 'Verdana',
                color:color,
                textDecorationColor: color,
                fontSize: fs
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

export function TempContent() {
    return (
        <SectionBox>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
            <PageParagraph text="PLACEHOLDER"/>
        </SectionBox>
    )
}