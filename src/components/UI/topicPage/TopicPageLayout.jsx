import React from 'react';
import { PageTitle } from "../DefaultLayout";
import { Helmet } from "react-helmet";
import SideNavBar from "../SideNavBar";
import { Box } from "@mui/material";
import { Outlet } from 'react-router-dom';

export default function TopicPageLayout({topic}) {
    const pageTitle = topic;
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
    const hasNavbar = screenWidth >= 900
    const toolButtonWidth = 160
    const gap = screenWidth >= 900 ? toolButtonWidth : 40
    return (
        <>
            <Helmet>
                <title>{pageTitle}</title>
            </Helmet>
            <Box
                sx={{
                    display: 'flex'
                }}
            >
                {hasNavbar &&
                    <Box
                        sx={{
                            width: toolButtonWidth,
                            zIndex: 3,
                        }}
                    >
                        <SideNavBar inHeader={false}/>
                    </Box>
                }
                <Box 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative', 
                        left: screenWidth >= 900 ? 0 : gap, 
                        width: `calc(100vw - 2 * ${gap}px)`,
                        mt: 3,
                    }}
                >
                    <PageTitle title={pageTitle} fs={32}/>
                    <Outlet/>
                </Box>
                
            </Box>
        </>
    )
}