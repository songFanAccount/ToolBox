import React, { useState } from 'react'
import { TBTextField } from '../components/UI/Form'
import { Box } from '@mui/material'
import { TBButton } from '../components/UI/DefaultLayout'

export default function Compiler() {
    const [code, setCode] = useState('')
    function execute() {
        console.log('executing code...')
        console.log('Input code =')
        console.log(code)
        /*
        1. Split input by line breaks so we can process line by line
        */
    }
    return (
        <Box>
            <TBTextField
                onChange={setCode}
                value={code}
                rows={20}
                variant='outlined'
                placeholder='Insert code here...'
                width={600}
            />
            <TBButton 
                buttonText="Execute"
                onClick={execute}
            />
        </Box>
    )
}
