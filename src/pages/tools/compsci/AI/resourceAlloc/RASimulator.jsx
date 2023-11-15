import { Box, Stack } from '@mui/material'
import React from 'react'
import { CBIconButton, ControlBoardBox } from '../../../../../components/UI/Animation'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Latex from 'react-latex-next';
import { TBText } from '../../../../../components/GeneralComponents';

export default function RASimulator() {
    const sqrWidth = 40
    const [numAgents, setNumAgents] = React.useState(0)
    const [numItems, setNumItems] = React.useState(0)
    const [preferences, setPreferences] = React.useState([])
    const TableBox = ({contents}) => (
        <Box
            sx={{
                width: sqrWidth,
                height: sqrWidth,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {contents}
        </Box>
    )
    const Items = () => {
        const Item = ({subscript}) => (
            <TableBox contents={<Latex>{`$o_{${subscript}}$`}</Latex>}/>
        )
        const items = []
        for (let i = 1; i <= numItems; i++) {
            items.push(<Item subscript={i}/>)
        }
        return items
    }
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
                    ml: 0.5,
                    minWidth: 4*sqrWidth
                }}
            >
                <Items/>
            </Stack>
        </Stack>
    )
    const Agents = () => {
        const Agent = ({num}) => (
            <TableBox contents={<Latex>{`$${num}$`}</Latex>}/>
        )
        const agents = []
        for (let i = 1; i <= numAgents; i++) {
            agents.push(<Agent num={i}/>)
        }
        return agents
    }
    function changePreference(agent, item, value) {
        const isnum = /^\d+$/.test(value);
        if (!isnum) return

    }
    const Preferences = () => {
        const PreferenceRow = ({row}) => {
            const Preference = ({agent, item}) => (
                <TableBox 
                    contents={
                        <TBText expr={preferences[agent][item] === -1 ? '' : preferences[agent][item]} onChange={(value) => changePreference(agent, item, value)} 
                                width={sqrWidth} height={sqrWidth} placeholder='-' maxLength={2} center/>
                    }/>
            )
            const rowGrids = []
            for (let j = 0; j < numItems; j++) {
                rowGrids.push(<Preference agent={row} item={j}/>)
            }
            return (
                <Stack direction="row" sx={{ml: 0.4}}>
                    {rowGrids}
                </Stack>
            )
        }
        const preferenceRows = []
        for (let i = 0; i < numAgents; i++) {
            preferenceRows.push(<PreferenceRow row={i}/>)
        }
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
                    <Agents/>
                </Stack>
                <Stack
                    direction="column"
                >
                    {preferenceRows}
                </Stack>
            </Stack>
        )
    }
    function addAgent() {
        if (numAgents === 10) return
        setNumAgents(numAgents + 1)
        const newPreference = []
        for (let i = 0; i < numItems; i++) {
            newPreference.push(-1)
        }
        setPreferences([...preferences, newPreference])
    }
    function removeAgent() {
        if (numAgents === 0) return
        setNumAgents(numAgents - 1)
    }
    function addItem() {
        if (numItems === 10) return
        setNumItems(numItems + 1)
    }
    function removeItem() {
        if (numItems === 0) return
        setNumItems(numItems - 1)
    }
    const ControlBoard = () => {
        return (
            <ControlBoardBox label="Control board">
                <CBIconButton tooltip="Add agent (up to 10)" onClick={addAgent} icon={<PersonAddAlt1Icon/>}/>
                <CBIconButton tooltip="Remove agent (bottom row)" onClick={removeAgent} icon={<PersonRemoveAlt1Icon/>}/>
                <CBIconButton tooltip="Add item (up to 10)" onClick={addItem} icon={<AddIcon/>}/>
                <CBIconButton tooltip="Remove item (right-most column)" onClick={removeItem} icon={<RemoveIcon/>}/>
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