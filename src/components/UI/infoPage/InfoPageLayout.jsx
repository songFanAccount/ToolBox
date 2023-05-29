import { Box } from "@mui/material";
import { Outlet, useOutletContext } from "react-router-dom";
import SideNavBar from "../SideNavBar";

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
            
            <Box 
                sx={{
                    position: 'relative',
                    left: gap,
                    width: `calc(100vw - 2*${gap}px)`,
                    border: 1
                }}
            >
                <Box
                    sx={{
                        mx: 5,
                        border: 1
                    }}
                >
                    <Outlet/>
                </Box>
            </Box>
        </Box>
    )
}