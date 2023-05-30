import { Box } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";
import SideNavBar from "../SideNavBar";
import React from "react";
import { InfoPageTitle, PageTitle } from "../DefaultLayout";
import { getLinear } from "../../../helpers/generalHelpers";

function InfoPageBanner({screenWidth, dimX, path}) {
    let gifWidth = 0
    let gif = null
    let title = ""
    let miniTitle = ""
    let miniTitleMax = 0
    let miniTitleMin = 0
    let titleBoxSx = null
    let gifSx = null
    let backgroundColor = null
    let textColor = ""
    switch (path) {
        case '/about':
            if(dimX === 2) gifWidth = 340
            gif = <iframe title="coding" src="https://giphy.com/embed/kbu8xsXRJZVtNqveKw" width={gifWidth} height="425" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            if(dimX === 2) gifWidth += 40 // Accounting for this gif's margin left
            title = "What is ToolBox?"
            miniTitle = "Who, where, when, why,"
            miniTitleMin = 12
            miniTitleMax = 24
            titleBoxSx = {
                minWidth: `calc(100vw - 2 * ${gifWidth}px)`,
                width: `calc(100vw - 2 * ${gifWidth}px)`,
                overflowX: 'visible',
                mt: 25
            }
            gifSx = {
                display: 'inline-block',
                position: 'relative',
                top: 75,
                ml: '40px',
                zIndex: 3,
            }
            backgroundColor = '#0621f3'
            textColor = 'white'
            break
        case '/contact':
            if(dimX === 2) gifWidth = 260
            gif = <iframe title="call" src="https://giphy.com/embed/jQbfr9B8wkM2y1cVBc" width={gifWidth} height="325" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            title = "Contact us!"
            miniTitle = "Got questions?"
            miniTitleMin = 14
            miniTitleMax = 22
            titleBoxSx = {
                minWidth: `fit-content`,
                width: `fit-content`,
                overflowX: 'visible',
                mt: 25
            }
            gifSx = {
                display: 'inline-block',
                position: 'relative',
                top: 55,
                zIndex: 3,
            }
            backgroundColor = '#ebb63c'
            textColor = 'black'
            break
        case '/collab':
            if(dimX === 2) gifWidth = 384
            gif = <iframe title="thinking" src="https://giphy.com/embed/KD8cyaiEbZD0eKsA1J" width={gifWidth} height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            title = "Collaborate with us!"
            miniTitle = "Got an idea?"
            miniTitleMin = 14
            miniTitleMax = 28
            titleBoxSx = {
                minWidth: `calc(100vw - 2 * ${gifWidth}px)`,
                width: `calc(100vw - 2 * ${gifWidth}px)`,
                overflowX: 'visible',
                mt: 25
            }
            gifSx = {
                display: 'inline-block',
                position: 'relative',
                top: 50,
                zIndex: 3,
            }
            backgroundColor = '#05071f'
            textColor = 'white'
            break
        default:
            throw new Error("InfoPageBanner: Unexpected path!")
    }
    const titleColor = dimX === 2 ? textColor : '#05071f'
    const titleFS = getLinear(32, 70, 400, 1100, screenWidth)
    const miniTitleFS = getLinear(miniTitleMin, miniTitleMax, 400, 1100, screenWidth)
    const bannerHeight = getLinear(300, 580, 400, 1100, screenWidth)
    function BannerContents() {
        if(path === '/collab' || path === '/about') {
            return (
                <>
                    {dimX === 2 && gif &&
                        <Box
                            sx={gifSx}
                        >
                            {gif}
                        </Box>
                    }
                    <Box
                        sx={titleBoxSx}
                    >
                        <Box sx={{width: 'fit-content', minWidth: 'fit-content', display:'flex', flexDirection: 'column', alignItems: 'start', mx: 'auto', whiteSpace: dimX === 0 ? 'normal' : 'nowrap'}}>
                            {miniTitle !== "" && <PageTitle title={miniTitle} color={titleColor} fs={miniTitleFS} underline="dashed" mb={2}/>}
                            <InfoPageTitle title={title} color={titleColor} fs={titleFS}/>  
                        </Box>
                    </Box>
                </>
            )
        } else if(path === '/contact') {
            return (
                <Box sx={{display: 'flex', mx: 'auto', alignItems: 'center'}}>
                    <Box sx={titleBoxSx}>
                        <Box sx={{width: 'fit-content', minWidth: 'fit-content', display:'flex', flexDirection: 'column', alignItems: 'start', whiteSpace: dimX === 0 ? 'normal' : 'nowrap'}}>
                            {miniTitle !== "" && <PageTitle title={miniTitle} color={titleColor} fs={miniTitleFS} underline="dashed" mb={2}/>}
                            <InfoPageTitle title={title} color={titleColor} fs={titleFS}/>  
                        </Box>
                    </Box>
                    {dimX === 2 && gif &&
                        <Box sx={gifSx}>
                            {gif}
                        </Box>
                    }
                    
                </Box>
            )
        }
    }
    return (
        <Box
            sx={{
                position: 'absolute',
                top: -180,
                left: 0,
                width: '100vw',
                height: bannerHeight,
                backgroundColor: dimX === 2 ? backgroundColor : 'inherit',
                display: 'flex',
                alignItems: 'center',
                zIndex: 2,
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
            }}
        >   
            <BannerContents/>
        </Box>
    )
}
export default function InfoPageLayout() {
    const [screenWidth, setScreenWidth] = React.useState(window.innerWidth)
    React.useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
        return _ => {
            window.removeEventListener("resize", handleResize)
        }
    // eslint-disable-next-line
    }, [])
    let dimX = 0
    if(screenWidth >= 400) {
        dimX = 1
    }
    if(screenWidth >= 1100) {
        dimX = 2
    }
    const gap = dimX > 0 ? 160 : 20
    const path = useLocation().pathname
    return (
        <Box>
            <Box
                sx={{
                    position: 'fixed',
                    top: dimX === 2 ? 530 : 100,
                    width: 'fit-content'
                }}
            >
                {dimX > 0 && <SideNavBar inHeader={false}/>}
            </Box>
            <InfoPageBanner screenWidth={screenWidth} dimX={dimX} path={path}/>
            <Box 
                sx={{
                    position: 'relative',
                    left: gap,
                    width: `calc(100vw - 2*${gap}px)`,
                }}
            >
                <Box
                    sx={{
                        mx: 5,
                    }}
                >
                    <Outlet/>
                </Box>
            </Box>
        </Box>
    )
}