import React from 'react';
import { Box, IconButton, Link, List, ListItemText, Collapse, Typography, useMediaQuery, Button, Stack, Alert, AlertTitle } from '@mui/material';
import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header/Header';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { HashLink } from 'react-router-hash-link';
import { TBTextField } from './Form';

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

export function SectionBox({title, noBorder, children, usePageTitle, mb=2, rowGap=2}) {
  return (
    <Box>
      {title && usePageTitle ? <PageTitle title={title} notPageTop={usePageTitle} mb={1}/> : <PageSectionTitle title={title}/>}
      <Contents noBorder={noBorder} children={children} mb={mb} rowGap={rowGap}/>
    </Box>
  )
}

export function CollapseSectionBox({title, titleFs, children, startClosed, usePageTitle}) {
  if(!title) {throw new Error("CollapseSectionBox: Cannot be collapsible without title!")}
  let initState = startClosed ? false : true
  const location = useLocation()
  if (location.hash !== "") {
    const sectionStr = location.hash.slice(1)
    if (sectionStr === title) initState = true
  }
  const [open, setOpen] = React.useState(initState)
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
        {usePageTitle ? <PageTitle title={title} notPageTop={usePageTitle} mb={1}/> : <PageSectionTitle title={title} fs={titleFs}/>}
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

export function PageTitle({title, notPageTop, color, fs=30, underline='inherit', align, mb, inline}) {
  return (
    <Typography
      id={notPageTop ? title : "The Tool"}
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

export function PageSectionTitle({title, fs=24}) {
  return (
    <Typography
      id={title}
      sx={{
        fontSize: fs,
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
export function PageParagraph({text, bold, nowrap, underline=false, block, color='inherit', fs='medium', mt, mb, ml, mr, p, backgroundColor}) {
  if(!text) {return <></>}
  return (
    <Typography display={block ? 'block' : 'inline'}
      sx={{
        mb: mb, mt: mt, ml: ml, mr: mr, p: p,
        fontFamily: 'Verdana',
        fontWeight: bold ? 'bold' : 'normal',
        textDecoration: underline ? 'underline' : 'none',
        color: color, backgroundColor: backgroundColor,
        fontSize: fs,
        whiteSpace: nowrap ? 'nowrap' : 'normal'
      }}
    >
      {text}
    </Typography>
  )
}

export function PageTextList({list, listName, noPaddingsY, py='inherit', mt=0, listStyleType='square'}) {
  if(!list) {throw new Error("Need input list in PageTextList!")}
  const ListElement = ({element}) => {
    if(typeof element === 'string') {
      return <ListItemText primaryTypographyProps={{fontFamily: 'Verdana'}} sx={{display: 'list-item', py: py}}>{element}</ListItemText>
    } else {
      return <Box sx={{display: 'list-item', py: py}}>{element}</Box>
    }
  }
  return (
    <Box>
      <PageParagraph text={listName}/>
      <List sx={{mt: mt, pl: 4, listStyleType: listStyleType, fontFamily: 'Verdana', py: noPaddingsY ? 0 : 'inherit',}}>
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

export function TBAlert({title, contents, status}) {
  return (
    <Alert severity={status}>
      <AlertTitle>
        {title}
      </AlertTitle>
      {contents}
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

export function TBButton({buttonText, onClick, p=1, mt=2, ml=2, mr=2, mb=2, flatLeft, flatRight}) {
  return (
    <Button 
      variant="outlined"
      onClick={onClick}
      disableRipple
      sx={{
        width: 'fit-content', height: 40,
        p:p,
        mt:mt, ml:ml, mr:mr, mb:mb,
        backgroundColor: '#011627',
        borderColor: '#011627',
        '&:hover': {
          backgroundColor: '#011627',
          borderColor: '#011627'
        },
        whiteSpace: 'nowrap',
        borderTopLeftRadius: flatLeft ? 0 : null,
        borderBottomLeftRadius: flatLeft ? 0 : null,
        borderTopRightRadius: flatRight ? 0 : null,
        borderBottomRightRadius: flatRight ? 0 : null,
      }}
    >
      <Typography sx={{color: '#fdfffc', fontFamily: 'Verdana', fontSize: 14, fontWeight: 550}}>{buttonText}</Typography>
    </Button>
  )
}
export function TBButtonWithTextfield({buttonText, onClick, p=1, ml=2, mr=2, buttonSide=1,
                     onChange, value, msg, msgColor}) {
  return (
  <Stack direction="row" columnGap={2}>
    <Stack direction="row" alignItems="flex-start" flexWrap="nowrap">
    {buttonSide === -1 && <TBButton buttonText={buttonText} onClick={onClick} p={p} mt={0} ml={ml} mr={0} mb={0} flatRight/>}
    <TBTextField variant="outlined" height={39.5} onChange={onChange} value={value} py={0} pt="0.5px" my={0} consistentBorderWidth="2px" flatLeft={buttonSide === -1} flatRight={buttonSide === 1}/>
    {buttonSide === 1 && <TBButton buttonText={buttonText} onClick={onClick} p={p} mt={0} ml={ml} mr={mr} mb={0} flatLeft/>}
    </Stack>
    <PageParagraph mt={1} text={msg} color={msgColor}/>
  </Stack>
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
const categoryNameToPath = {
  'About': '/about',
  'Resource Allocation': '/tools/compsci/AI/resourceAlloc',
  'Compilers': '/tools/compsci/compilers'
}
export function hasCategoryInfo(cat) {
  return categoryNameToPath.hasOwnProperty(cat)
}
export function getCategoryInfoPath(cat) {
  // Assumes has ^^^
  return categoryNameToPath[cat]
}
export function CategoryLink({name, linkText, textDecoration='underline', fs='inherit', color='#011627', toSection='', onClick = () => window.scrollTo(0,0)}) {
  const categoryPath = categoryNameToPath[name]
  if(!categoryPath) {throw new Error("No matching category for given name!")}
  return (
    <Link
      component={toSection === '' ? RouterLink : HashLink}
      smooth to={`${categoryPath}${toSection}`}
      onClick={toSection === '' ? onClick : null}
      sx={{
        fontFamily: 'Verdana',
        color:color,
        textDecorationColor: color,
        fontSize: fs,
        textDecoration: textDecoration
      }}
    >
      {linkText}
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
  'maths expression parser': '/tools/compsci/parsing/maths-expression-parser',
  'tools': '/tools',
  'chemical equation balancer': '/tools/chemistry/chem-equation-balancer',
  'ef1 allocation algorithm': '/tools/compsci/AI/resourceAlloc/EF1-generator',
  'student proposing deferred acceptance': '/tools/compsci/AI/resourceAlloc/student-proposing-DA',
  'thompsons construction': '/tools/compsci/compilers/regex/thompsons-construction'
}
export function ToolLink({name, linkText, textDecoration='underline', fs='inherit', color='#011627'}) {
  const toolPath = toolnameToPath[name]
  if(!toolPath) {throw new Error("No matching tool path for given name: " + name)}
  return (
    <Link
      component={RouterLink}
      to={toolPath}
      onClick={() => window.scrollTo(0, 0)}
      sx={{
        fontFamily: 'Verdana',
        color:color,
        textDecorationColor: color,
        fontSize: fs,
        textDecoration: textDecoration
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