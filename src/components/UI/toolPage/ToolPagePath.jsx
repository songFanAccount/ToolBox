import { Box } from "@mui/material"
import { Link } from '@mui/material'
import { Link as RouterLink } from "react-router-dom"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

function ToolPagePath({urls, displayNames}) {
    const Path = () => {
        if(urls.length !== displayNames.length) {
            throw new Error("Expected urls length === displayNames length")
        }
        let ret = []
        for(let i = 0; i < displayNames.length - 1; i++) {
            ret.push(
                <>
                    <Link component={RouterLink} to={urls[i]}
                        sx={{
                            color: 'black',
                            textDecoration: 'underline',
                            fontFamily: 'Verdana',
                            fontSize: 14,
                        }}
                    >
                        {displayNames[i]}
                    </Link>
                    <ArrowForwardIosIcon sx={{fontSize: 14, mx: 0.8, mt: 0.3}}/>
                </>
            )
        }
        return ret
    }
    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                mb: 3
            }}
        >
            <Path/>
        </Box>
    )
}

export default ToolPagePath