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
            if(dimX === 2) gifWidth = 280
            gif = <iframe title="jump"src="https://giphy.com/embed/Mcaiot7RKVU83dVcch" width={gifWidth} height="350" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            title = "What is ToolBox?"
            miniTitle = "Who, where, when, why,"
            miniTitleMin = 12
            miniTitleMax = 24
            titleBoxSx = {
                minWidth: `fit-content`,
                width: `fit-content`,
                overflowX: 'visible',
                mt: 5
            }
            gifSx = {
                display: 'inline-block',
                position: 'relative',
                mb: 10,
                ml: '40px',
                zIndex: 3,
            }
            backgroundColor = '#faf5ec'
            textColor = 'black'
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
                mt: 5
            }
            gifSx = {
                display: 'inline-block',
                position: 'relative',
                mb: 5,
                zIndex: 3,
            }
            backgroundColor = '#ebb63c'
            textColor = 'black'
            break
        case '/collab':
            if(dimX === 2) gifWidth = 320
            gif = <iframe title="thinking" src="https://giphy.com/embed/KD8cyaiEbZD0eKsA1J" width={gifWidth} height="400" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            title = "Collaborate with us!"
            miniTitle = "Got an idea?"
            miniTitleMin = 14
            miniTitleMax = 28
            titleBoxSx = {
                minWidth: `calc(100vw - 2 * ${gifWidth}px)`,
                width: `calc(100vw - 2 * ${gifWidth}px)`,
                overflowX: 'visible',
                mt: 5
            }
            gifSx = {
                display: 'inline-block',
                position: 'relative',
                top: 25,
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
    const bannerHeight = getLinear(120, 450, 400, 1100, screenWidth)
    function BannerContents() {
        if(path === '/collab') {
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
        } else if (path === '/about') {
            return (
                <Box sx={{display: 'flex', mx: 'auto', alignItems: 'center'}}>
                    {dimX === 2 && gif &&
                        <Box sx={gifSx}>
                            {gif}
                        </Box>
                    }
                    <Box sx={titleBoxSx}>
                        <Box sx={{width: 'fit-content', minWidth: 'fit-content', display:'flex', flexDirection: 'column', alignItems: 'start', whiteSpace: 'nowrap'}}>
                            {miniTitle !== "" && <PageTitle title={miniTitle} color={titleColor} fs={miniTitleFS} underline="dashed" mb={2}/>}
                            <InfoPageTitle title={title} color={titleColor} fs={titleFS}/>  
                        </Box>
                    </Box>
                </Box>
            )
        }
    }
    return (
        <Box
            sx={{
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
    const gap = screenWidth >= 900 ? 150 : 20
    const path = useLocation().pathname
    return (
        <Box 
            sx={{
                display: 'flex', flexDirection: 'column',
                position: 'absolute',
                top: 0,
                left: 0,
                width: 1,
                maxWidth: 1,
            }}
        >
            <InfoPageBanner screenWidth={screenWidth} dimX={dimX} path={path}/>
            <Box 
                sx={{
                    display: 'flex',
                }}
            >
                {screenWidth >= 900 &&
                    <Box
                        sx={{
                            width: 150,
                            zIndex: 3,
                        }}
                    >
                        <SideNavBar inHeader={false}/>
                    </Box>
                }
                <Box sx={{position: 'relative', left: screenWidth >= 900 ? 0 : gap, width: `calc(100vw - 2 * ${gap}px)`}}>
                    <Outlet/>
                </Box>
            </Box>
        </Box>
    )
}