import { Box } from "@mui/material";
import { Outlet, useOutletContext } from "react-router-dom";
import SideNavBar from "../SideNavBar";
import React from "react";
import { InfoPageTitle, PageTitle } from "../DefaultLayout";
import { getLinear } from "../../../helpers/generalHelpers";

function InfoPageBanner() {
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
    if(screenWidth > 400) {
        dimX = 1
    }
    if(screenWidth > 1100) {
        dimX = 2
        gifWidth = 384
    }
    const titleColor = dimX === 2 ? 'white' : '#05071f'
    const titleFS = getLinear(32, 70, 400, 1100, screenWidth)
    const miniTitleFS = getLinear(14, 28, 400, 1100, screenWidth)
    const bannerHeight = getLinear(120, 430, 400, 1100, screenWidth)
    return (
        <Box
            sx={{
                position: 'absolute',
                top: -30,
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
            {dimX === 2 && 
                <Box
                    sx={{
                        display: 'inline-block',
                        position: 'relative',
                        top: -25,
                        zIndex: 3,
                    }}
                >
                    <iframe title="thinking" src="https://giphy.com/embed/KD8cyaiEbZD0eKsA1J" width="384" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                </Box>
            }
            <Box
                sx={{
                    mt: 5,
                    minWidth: `calc(100vw - 2 * ${gifWidth}px)`,
                    width: `calc(100vw - 2 * ${gifWidth}px)`,
                    overflowX: 'visible'
                }}
            >
                <Box sx={{width: 'fit-content', minWidth: 'fit-content', display:'flex', flexDirection: 'column', alignItems: 'start', mx: 'auto', whiteSpace: dimX === 0 ? 'normal' : 'nowrap'}}>
                    <PageTitle title="Got an idea?" color={titleColor} fs={miniTitleFS} underline="dashed" mb={3}/>
                    <InfoPageTitle title="Collaborate with us" color={titleColor} fs={titleFS}/>  
                </Box>
            </Box>
        </Box>
    )
}
export default function InfoPageLayout() {
    const context = useOutletContext()
    const dimX = context.dimX
    const gap = dimX > 0 ? 160 : 20
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
            <InfoPageBanner/>
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