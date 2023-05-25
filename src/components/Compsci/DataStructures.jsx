import { Box, Typography } from "@mui/material"

/*
Use this for an input array of already created DOMs
*/
export function ElementArray({array, maxLength}) {
    if(maxLength < 0) {throw new Error("ElementArray: Negative maxLength not allowed!")}
    const Elements = () => {
        let generatedArray = []
        const l = maxLength ? Math.min(array.length, maxLength) : array.length
        for(let i = 0; i < l; i++) {
            generatedArray.push(
                <Box
                    sx={{
                        border: 1,
                        minHeight: 25,
                        minWidth: 25,
                        textAlign: 'center'
                    }}
                >
                    {array[i]}
                </Box>
            )
        }
        if(maxLength < array.length) {
            generatedArray.push(
            <Box
                sx={{
                    border: 1,
                    minHeight: 25,
                    minWidth: 25,
                    textAlign: 'center'
                }}
            >
                ...
            </Box>)
        }
        return (
            generatedArray
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
            <Elements array={array}/>
        </Box>
    )
}
export function TextArray({array}) {
    if(!array || array.length === 0) {throw new Error("TextArray: Input array is undefined or is empty!")}
    return (
        <ElementArray array={array.map((e) => <Typography>{e}</Typography>)}/>
    )
}