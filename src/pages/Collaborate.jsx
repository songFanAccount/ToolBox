import { Box } from "@mui/material";
import { InfoPageTitle, PageParagraph, PageTitle } from "../components/UI/DefaultLayout";

export default function Collaborate() {
    return (
        <Box>
            <Box
                    sx={{
                        position: 'absolute',
                        top: -80,
                        left: -160,
                        display: 'inline',
                        zIndex: 3
                    }}
                >
                    <iframe title="thinking" src="https://giphy.com/embed/KD8cyaiEbZD0eKsA1J" width="384" height="480" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
                </Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: -30,
                    left: -160,
                    width: '100vw',
                    height: 430,
                    backgroundColor: '#05071f',
                    display: 'flex',
                    alignItems: 'center',
                    zIndex: 2
                }}
            >
                <Box
                    sx={{
                        mx: 'auto',
                        mt: 5
                    }}
                >
                    <Box
                        sx={{
                            width: 'fit-content',
                        }}
                    >
                        <PageTitle title="Got an idea?" color="white" fs={24} underline="dashed"/>
                    </Box>
                    <InfoPageTitle title="Collaborate with us" color="white" fs={70}/>  
                </Box>
                    
            </Box>
                  
        </Box>
        
    )
}

//<div style="width:100%;height:0;padding-bottom:125%;position:relative;"><iframe src="https://giphy.com/embed/KD8cyaiEbZD0eKsA1J" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/blue-dream-pattern-KD8cyaiEbZD0eKsA1J">via GIPHY</a></p>