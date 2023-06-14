import React, { useState } from 'react'
import { TBTextField } from '../components/UI/Form'
import { Box } from '@mui/material'
import { TBButton } from '../components/UI/DefaultLayout'

export default function Compiler() {
    const [code, setCode] = useState('')
    function compile() {
        console.log('compile')
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
                buttonText="Compile"
                onClick={compile}
            />
        </Box>
    )
}
