import { Box, Typography } from "@mui/material"
import CollaboratorInfo from "../CollaboratorInfo"
import SideNavBar from "../SideNavBar"
import ToolPageNav from "../ToolPageNav"

function SideBar({toolName, sections}) {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: 320,
                backgroundColor: '#ADD8E6',
                position: 'fixed',
                top: 100,
                height: 'calc(100vh - 100px)',
                zIndex: 9,
                borderRight: 2,
                borderColor: '#011627',
            }}
        >
            <SideNavBar inHeader={false}/>
            <Box
                sx={{
                    width: 0.8,
                    minHeight: 0.3,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    border: 3,
                    borderRadius: 1.5,
                    backgroundColor: '#c9e8f2',
                }}
            >
                <Box
                    sx={{
                        width: 1,
                        backgroundColor: '#011627',
                    }}
                >
                    <Typography
                        sx={{
                            fontFamily: 'Montserrat',
                            fontSize: 24,
                            color: '#fdfffc',
                            py: 1,
                            ml: 1.2,
                            overflowWrap: 'anywhere',
                        }}
                    >
                        {toolName}
                    </Typography>
                </Box>
                <ToolPageNav sections={sections}/>
            </Box>
            <Box
                sx={{
                    width: 0.9,
                    borderTop: 2,
                    mb: 2,
                    mt: 'auto',
                }}
            />
            <CollaboratorInfo/>
        </Box>
    )
}

export default SideBar