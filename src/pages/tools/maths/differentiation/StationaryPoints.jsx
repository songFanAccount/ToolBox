import { Box, TextField } from '@mui/material';
import React from 'react';
//import { parse, evaluate } from 'mathjs';
import { processExpr } from '../../../../components/Maths/LatexDisplay';

export default function StationaryPoints() {
    const [tex, setTex] = React.useState('')

    function handleChange(event) {
        try {
            setTex(processExpr(event.target.value))
        } catch(e) {
            console.log("INVALID EXPR")
        }
    }
    return (
        <Box>
            <TextField
                sx={{minWidth: 'fit-content', width:1000}}
                onChange={(e) => handleChange(e)}
            />
            {tex}
        </Box>
    )
}