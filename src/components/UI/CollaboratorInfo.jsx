import { Box, Typography } from "@mui/material"

function CollaboratorInfo() {
    return (
        <Box
            sx={{
                mb: 2,
                display: 'flex',
                flexDirection: 'column',
                width: 0.8,
            }}
        >
            <Typography
                sx={{
                    fontSize: 24,
                    fontFamily: 'Montserrat',
                    mb: 1.5
                }}
            >
                Collaborator Info
            </Typography>
            <Box
                sx={{
                    width: 1
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                    }}
                >
                    <Box
                        sx={{
                            height: 100,
                            mr: 2,
                            aspectRatio: '1 / 1',
                            border: 1
                        }}
                    >
                        PFP
                    </Box>
                    <Box>
                        <Typography>Name</Typography>
                        <Typography>LinkedIn link</Typography>
                        <Typography>Other links</Typography>
                    </Box>
                </Box>
                <Typography>About me</Typography>
            </Box>
        </Box>
    )
}

export default CollaboratorInfo