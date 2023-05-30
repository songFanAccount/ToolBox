import { Box } from "@mui/material";
import { Outlet, useLocation, useOutletContext } from "react-router-dom";
import SideNavBar from "../SideNavBar";
import React from "react";
import { InfoPageTitle, PageTitle } from "../DefaultLayout";
import { getLinear } from "../../../helpers/generalHelpers";

function InfoPageBanner({path}) {
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
    let gifWidth = 0
    let dimX = 0
    if(screenWidth >= 400) {
        dimX = 1
    }
    if(screenWidth >= 1100) {
        dimX = 2
        gifWidth = 384
    }
    let gif = null
    let title = ""
    let miniTitle = ""
    let titleBoxSx = null
    switch (path) {
        case '/about':
            title = "What is ToolBox?"
            titleBoxSx = {
                minWidth: `100vw`,
                width: `100vw`,
            }
            break
        case '/contact':
            title = "Contact us!"
            miniTitle = "Got questions?"
            titleBoxSx = {
                minWidth: `100vw`,
                width: `100vw`,
            }
            break
        case '/collab':
            gif = <iframe title="thinking" src="https://giphy.com/embed/KD8cyaiEbZD0eKsA1J" width="384" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            title = "Collaborate with us!"
            miniTitle = "Got an idea?"
            titleBoxSx = {
                minWidth: `calc(100vw - 2 * ${gifWidth}px)`,
                width: `calc(100vw - 2 * ${gifWidth}px)`,
                overflowX: 'visible'
            }
            break
        default:
            throw new Error("InfoPageBanner: Unexpected path!")
    }
    const titleColor = dimX === 2 ? 'white' : '#05071f'
    const titleFS = getLinear(32, 70, 400, 1100, screenWidth)
    const miniTitleFS = getLinear(14, 28, 400, 1100, screenWidth)
    const bannerHeight = getLinear(200, 580, 400, 1100, screenWidth)
    return (
        <Box
            sx={{
                position: 'absolute',
                top: -180,
                left: 0,
                width: '100vw',
                height: bannerHeight,
                backgroundColor: dimX === 2 ? '#05071f' : 'inherit',
                display: 'flex',
                alignItems: 'center',
                zIndex: 2,
                boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'
            }}
        >   
            {dimX === 2 && gif &&
                <Box
                    sx={{
                        display: 'inline-block',
                        position: 'relative',
                        top: 50,
                        zIndex: 3,
                    }}
                >
                    {gif}
                </Box>
            }
            <Box
                sx={{
                    ...titleBoxSx,
                    mt: 25,
                }}
            >
                <Box sx={{width: 'fit-content', minWidth: 'fit-content', display:'flex', flexDirection: 'column', alignItems: 'start', mx: 'auto', whiteSpace: dimX === 0 ? 'normal' : 'nowrap'}}>
                    {miniTitle !== "" && <PageTitle title={miniTitle} color={titleColor} fs={miniTitleFS} underline="dashed" mb={3}/>}
                    <InfoPageTitle title={title} color={titleColor} fs={titleFS}/>  
                </Box>
            </Box>
        </Box>
    )
}
export default function InfoPageLayout() {
    const context = useOutletContext()
    const dimX = context.dimX
    const gap = dimX > 0 ? 160 : 20
    const path = useLocation().pathname
    return (
        <Box>
            <Box
                sx={{
                    position: 'fixed',
                    top: 100,
                    width: 'fit-content'
                }}
            >
                {dimX > 0 && <SideNavBar inHeader={false}/>}
            </Box>
            <InfoPageBanner path={path}/>
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