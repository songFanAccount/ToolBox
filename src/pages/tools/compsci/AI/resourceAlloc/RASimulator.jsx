import { Box, Button, Stack } from '@mui/material'
import React from 'react'
import { CBIconButton, CBTextIconButton, ControlBoardBox } from '../../../../../components/UI/Animation'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Latex from 'react-latex-next';
import { TBDoubleSizedSwitch, TBText } from '../../../../../components/GeneralComponents';
import { PageParagraph, TBButton } from '../../../../../components/UI/DefaultLayout';

export default function RASimulator() {
    const sqrWidth = 40
    const [numAgents, setNumAgents] = React.useState(0)
    const [numItems, setNumItems] = React.useState(0)
    const [mode, setMode] = React.useState(false) // false for edit mode, true for allocate mode
    const inputs = React.useRef([])
    const [updateNeeded, setUpdateNeeded] = React.useState(false)
    const [allocation, setAllocation] = React.useState([])
    const TableBox = ({contents, width, borderBottom}) => (
        <Box
            sx={{
                width: width ? width : sqrWidth,
                height: sqrWidth,
                borderBottom: borderBottom,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            {contents}
        </Box>
    )
    function allocate(agent, item) {
        setAllocation(allocation.map((value, index) => {
            if (agent === index) {
                if (value.has(item)) value.delete(item)
                else value.add(item)
            } else {
                if (value.has(item)) value.delete(item)
            }
            return value
        }))
    }
    const SelectTableBox = ({agent, item}) => {
        return (
            <TableBox 
                contents={
                    <Box width={sqrWidth} height={sqrWidth}
                        sx={{
                            position: 'relative'
                        }}
                    >
                        <Box width={1} height={1} display="flex" justifyContent="center" alignItems="center">
                            <TBText key={`sim(${agent},${item})`} defaultValue={inputs.current[agent][item] === -1 ? '' : inputs.current[agent][item]} 
                                    onChange={(value) => changePreference(agent, item, value)} width={sqrWidth - 10} height={sqrWidth - 10} placeholder='-' 
                                    maxLength={2} center disabled={mode} border={allocation[agent].has(item) ? 1 : 0}
                                    errorInit={true} errorFunc={(str) => !(/^[1-9]\d*$/.test(str))}
                            />
                        </Box>
                        <Button
                            disableRipple
                            disabled={!mode}
                            onClick={() => allocate(agent, item)}
                            sx={{
                                height: 1,
                                width: 1,
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                '&:hover': {
                                    backgroundColor: 'transparent'
                                }
                            }}
                        />
                    </Box>
                }
            />
        )
    }
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
    function changePreference(agent, item, newValue) {
        inputs.current[agent][item] = newValue
        setUpdateNeeded(true)
    }
    const Preferences = () => {
        const PreferenceRow = ({row}) => {
            const rowGrids = []
            for (let j = 0; j < numItems; j++) {
                rowGrids.push(<SelectTableBox agent={row} item={j}/>)
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
        inputs.current.push([...newPreference])
        setAllocation([...allocation, new Set()])
    }
    function removeAgent() {
        if (numAgents === 0) return
        setNumAgents(numAgents - 1)
        inputs.current = inputs.current.slice(0, numAgents - 1)
        setAllocation(allocation.slice(0, numAgents - 1))
    }
    function addItem() {
        if (numItems === 10) return
        setNumItems(numItems + 1)
        inputs.current.forEach((value) => value.push(-1))
    }
    function removeItem() {
        if (numItems === 0) return
        setNumItems(numItems - 1)
        inputs.current = inputs.current.map((value) => value.slice(0, numItems - 1))
        setAllocation(allocation.map((value) => {
            if (value.has(numItems - 1)) {
                value.delete(numItems - 1)
            }
            return value
        }))
    }
    const AllocationDetails = () => {
        return (
            <Stack direction="column">
                <TableBox
                    width="fit-content"
                    borderBottom={1}
                    contents={
                        <Box>
                            <PageParagraph text="Let "/>
                            <Latex>$X$</Latex>
                            <PageParagraph text=" be your highlighted allocation:"/>
                        </Box>
                    }
                />
                <Stack direction="row" columnGap={3}>
                    <Stack direction="column">
                        {
                            allocation.map((value, index) => {
                                let setStr = ''
                                const a = Array.from(value)
                                a.sort()
                                for (let i = 0; i < value.size; i++) {
                                    setStr += `o_{${a[i] + 1}}`
                                    if (i !== value.size - 1) setStr += ', '
                                }
                                return (
                                    <TableBox
                                        width="fit-content"
                                        contents={
                                            <Box>
                                                <Latex>{`$X_${index + 1} = \\{${setStr}\\}$`}</Latex>
                                            </Box>
                                        }
                                    />
                                )
                            })
                        }
                    </Stack>
                    <Stack direction="column">
                        {
                            allocation.map((value, index) => {
                                let sum = 0
                                let sumStr = ''
                                const a = Array.from(value)
                                a.sort()
                                for (let i = 0; i < a.length; i++) {
                                    const itemIndex = a[i]
                                    const curPrefValue = inputs.current[index][itemIndex]
                                    if (/^[1-9]\d*$/.test(curPrefValue)) { sum += parseInt(curPrefValue); sumStr += curPrefValue }
                                    else { sumStr = null; break }
                                    if (i !== a.length - 1) sumStr += ' + '
                                    else {
                                        if (i !== 0) sumStr += ` = ${sum}`
                                    }
                                }
                                if (a.length === 0) sumStr = '0'
                                return (
                                    <TableBox
                                        width='fit-content'
                                        contents={
                                            <Box>
                                                <Latex>{`$u_{${index + 1}}(X_{${index + 1}}) = ${sumStr ? sumStr : ''}$`}</Latex>
                                                { sumStr === null && <PageParagraph color="red" text=" ?"/>}
                                            </Box>
                                        }
                                    />
                                )
                            })
                        }
                    </Stack>
                </Stack>
            </Stack>
        )
    }
    const ControlBoard = () => {
        return (
            <ControlBoardBox label="Control board" maxWidth={400}>
                <CBIconButton tooltip="Add agent (up to 10)" onClick={addAgent} icon={<PersonAddAlt1Icon/>}/>
                <CBIconButton tooltip="Remove agent (bottom row)" onClick={removeAgent} icon={<PersonRemoveAlt1Icon/>}/>
                <CBTextIconButton text="Add item" onClick={addItem} endIcon={<AddIcon/>} tooltip="Add item (up to 10)"/>
                <CBTextIconButton text="Del item" onClick={removeItem} endIcon={<RemoveIcon/>} tooltip="Delete item (right-most column)"/>
                <TBDoubleSizedSwitch leftText="Edit mode" rightText="Allocate mode" checked={mode} onChange={(value) => setMode(value)}/>
            </ControlBoardBox>
        )
    }
    return (
        <Stack direction="column" rowGap={3}>
            <Stack direction="row" columnGap={5}>
                <Stack
                    direction="column"
                >
                    <TopRow/>
                    <Preferences/>
                    {
                        updateNeeded && <TBButton buttonText="Apply changes" onClick={() => {setUpdateNeeded(false);}}/>
                    }
                </Stack>
                <AllocationDetails/>
            </Stack>
            <ControlBoard/>
        </Stack>
    )
}