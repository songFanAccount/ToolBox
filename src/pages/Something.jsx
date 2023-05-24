import React from 'react';
import { Box, TextField, Typography } from "@mui/material";

function Calculator() {
    const [width, setWidth] = React.useState(-1)
    const [height, setHeight] = React.useState(-1)
    const [validWidth, setValidWidth] = React.useState(true)
    const [validHeight, setValidHeight] = React.useState(true)
    function handleChangeWidth(event) {
        const input = event.target.value
        const converted = parseFloat(input)
        if(isNaN(converted)) {
            setValidWidth(false)
        } else {
            setValidWidth(true)
            setWidth(converted)
        } 
    }
    function handleChangeHeight(event) {
        const input = event.target.value
        const converted = parseFloat(input)
        if(isNaN(converted)) {
            setValidHeight(false)
        } else {
            setValidHeight(true)
            setHeight(converted)
        } 
    }
    const Results = () => {
        if(validWidth && validHeight) {
            if(width < 0 || height < 0) {
                return (
                    <Typography>Please enter positive values of width and height!</Typography>
                )
            }
            const xBottles = Math.max(0, Math.floor((width - 40)/95.5))
            const yBottles = Math.max(0, Math.floor((height - 40)/95.5))
            if(xBottles === 0 || yBottles === 0) {
                let msg = "The supplied "
                if(xBottles === 0) {
                    msg += "width "
                    if(yBottles === 0) {msg += "and height "}
                } else {
                    msg += "height "
                }
                msg += "cannot fit any dimensions of our wine racks. Width and height must be at least 135.5!"
                return (
                    <Typography>{msg}</Typography>
                )
            }
            const xSpace = xBottles * 95.5 + 40
            const ySpace = yBottles * 95.5 + 40
            return (
                <Box>
                    <Typography>Your supplied space can fit a winerack of at most {xBottles} bottles wide and {yBottles} bottles tall.</Typography>
                    <Typography>This will take up a dimension of width {xSpace}mm by height {ySpace}mm.</Typography>
                </Box>
            )
        } else {
            return (
                <Typography>Invalid input types. Please enter numerical values for width and height!</Typography>
            )
        }
    }
    return (
        <div>
            <Typography>Please enter the dimensions of your space in mm. </Typography>
            <Box>
                <TextField placeholder="Available width" onChange={(e) => handleChangeWidth(e)}/>
                <TextField placeholder="Available height" onChange={(e) => handleChangeHeight(e)}/>
            </Box>
            <br/>
            <Results/>
        </div>     
    )
}

export default Calculator