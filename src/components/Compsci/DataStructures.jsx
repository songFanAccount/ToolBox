import { Box, Typography } from "@mui/material"

/*
Use this for an input array of already created DOMs
*/
export function ElementArray({array}) {
    const Element = (e) => {
        return (
            <Box
                sx={{
                    border: 1,
                    minHeight: 25,
                    minWidth: 25,
                    textAlign: 'center'
                }}
            >
                {e}
            </Box>
        )
    }
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                border: 1,
                width: 'fit-content'
            }}
        >
            {array.map((e) => Element(e))}
        </Box>
    )
}
export function TextArray({array}) {
    if(!array || array.length === 0) {throw new Error("TextArray: Input array is undefined or is empty!")}
    return (
        <ElementArray array={array.map((e) => <Typography>{e}</Typography>)}/>
    )
}