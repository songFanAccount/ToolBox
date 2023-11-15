import { Box, Stack } from '@mui/material'
import React from 'react'
import { CBIconButton, ControlBoardBox } from '../../../../../components/UI/Animation'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';

export default function RASimulator() {
    const sqrWidth = 40
    const [agents, setAgents] = React.useState(0)
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
    function addAgent() {
        if (agents === 10) return
        setAgents(agents + 1)
    }
    function removeAgent() {
        if (agents === 0) return
        setAgents(agents - 1)
    }
    const ControlBoard = () => {
        return (
            <ControlBoardBox label="Control board">
                <CBIconButton tooltip="Add agent (up to 10)" onClick={addAgent} icon={<PersonAddAlt1Icon/>}/>
                <CBIconButton tooltip="Remove agent (bottom row)" onClick={removeAgent} icon={<PersonRemoveAlt1Icon/>}/>
            </ControlBoardBox>
        )
    }
    return (
        <Stack direction="column" rowGap={3}>
            <Stack
                direction="column"
                >
                <TopRow/>
                <Preferences/>
            </Stack>
            <ControlBoard/>
        </Stack>
    )
}