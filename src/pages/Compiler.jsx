import React, { useState } from 'react'
import { TBTextField } from '../components/UI/Form'
import { Box } from '@mui/material'
import { TBButton } from '../components/UI/DefaultLayout'
import { preProcessCode } from '../helpers/compilerHelpers'

/*
Our compiler restrictions:

- Variable assignments:

*/
export default function Compiler() {
    const [code, setCode] = useState('')
    let curLineIndex // Use -1 to indicate code termination
    function executeLine(line) {
        curLineIndex = -1
    }
    function executeCode() {
        console.log('executing code...')
        const lines = preProcessCode(code)
        curLineIndex = 0
        while(curLineIndex !== -1) {
            executeLine(lines[curLineIndex])
        }
        console.log('code execution finished!')
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
                maxLength={1000}
                allowTab
            />
            <TBButton 
                buttonText="Execute"
                onClick={executeCode}
            />
        </Box>
    )
}
