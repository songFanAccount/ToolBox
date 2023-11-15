import { Box, Stack } from '@mui/material'
import React from 'react'

export default function RASimulator() {
    const sqrWidth = 40
    const TopRow = () => (
        <Stack
            direction="row"
            borderBottom={1}
        >
            <Box
                sx={{
                    width: sqrWidth,
                    height: sqrWidth,
                    borderRight: 1
                }}
            />
            <Stack
                direction="row"
                sx={{
                    minWidth: 4*sqrWidth
                }}
            >
                
            </Stack>
        </Stack>
    )
    const Preferences = () => {
        return (
            <Stack
                direction="row"
            >
                <Stack
                    direction="column"
                    sx={{
                        minWidth: sqrWidth,
                        minHeight: 2*sqrWidth,
                        borderRight: 1
                    }}
                >

                </Stack>
                <Stack
                    direction="column"
                >

                </Stack>
            </Stack>
        )
    }
    return (
        <Stack
            direction="column"
        >
            <TopRow/>
            <Preferences/>
        </Stack>
    )
}