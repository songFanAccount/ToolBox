import { Box, Button, Stack } from '@mui/material'
import React from 'react'
import { CBIconButton, CBTextIconButton, ControlBoardBox } from '../../../../../components/UI/Animation'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Latex from 'react-latex-next';
import { TBDoubleSizedSwitch, TBText } from '../../../../../components/GeneralComponents';
import { CollapseSectionBox, PageParagraph, TBButton } from '../../../../../components/UI/DefaultLayout';
import { InlineMath } from 'react-katex';
import { findCycle } from '../../../../../helpers/graphHelpers';
import { Graph } from '../../../../../components/Compsci/DataStructures';
import { TableBox } from '../../../../../helpers/Tables';
import { copyListOfSets } from '../../../../../helpers/generalHelpers';

const sqrWidth = 40
export default function RASimulator({allocationName='X', utilities, allocations, fixedMode=0, algorithm=null,
                                     modifiable=true, showPreferences=true, showAllocDetails=true, showControlBoard=true, showPropertyValues=true}) {
    const [numAgents, setNumAgents] = React.useState(utilities ? utilities.length : 0)
    const [numItems, setNumItems] = React.useState(utilities ? utilities[0].length : 0)
    const [mode, setMode] = React.useState(fixedMode === 1) // false for edit mode, true for allocate mode
    const inputs = React.useRef(utilities ? utilities : [])
    const [inputsChanged, setInputsChanged] = React.useState(true)
    const netUtils = React.useRef(utilities ? Array(utilities.length).fill(0) : [])
    const [allocation, setAllocation] = React.useState(allocInit())
    const [sumStrs, setSumStrs] = React.useState(sumStrsInit())
    function allocInit() {
        if (allocations) return allocations
        if (utilities) return Array(utilities.length).fill(new Set())
        else return []
    }
    function sumStrsInit() {
        if (allocations) return allocations.map((allocSet, index) => allocationToSumstr(allocSet, index))
        if (utilities) return Array(utilities.length).fill('0')
        else return []
    }
    /* ALGORITHMS */
    const [errorMsg, setErrorMsg] = React.useState(null)
    const [ef1steps, setEF1Steps] = React.useState([])
    const AlgorithmButton = ({buttonText, onClick}) => (
        <Stack direction="column">
            <TBButton buttonText={buttonText} onClick={onClick} ml={0}/>
            { errorMsg && <PageParagraph text={errorMsg}/>}
        </Stack>
    )
    function getNumericalUtilities() {
        return inputs.current.map((row) => row.map((val) => parseInt(val)))
    }
    function runEF1() {
        if (!inputsChanged) return
        if (numAgents === 0 || numItems === 0 || !allPreferencesFilled()) { setErrorMsg("Please fill out all preferences!"); return }
        else setErrorMsg(null)
        const X = ef1(getNumericalUtilities())
        setAllocation(X['allocation'])
        setSumStrs(
            X['allocation'].map((allocSet, index) => (
                allocationToSumstr(allocSet, index)
            ))
        )
        setInputsChanged(false)
        setEF1Steps(X['states'])
    }
    ////////////////
    function allocate(agent, item) {
        let agentLostIndex = -1
        const newAllocation = allocation.map((value, index) => {
            if (agent === index) {
                if (value.has(item)) value.delete(item)
                else value.add(item)
            } else {
                if (value.has(item)) { 
                    value.delete(item)
                    agentLostIndex = index
                }
            }
            return value
        })
        setAllocation(newAllocation)
        setSumStrs(
            sumStrs.map((sumStr, index) => {
                if (index === agent || index === agentLostIndex) {
                    return allocationToSumstr(newAllocation[index], index)
                }
                return sumStr
            })
        )
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
                                    maxLength={2} center disabled={mode || !modifiable} border={allocation[agent].has(item) ? 1 : 0}
                                    errorInit={true} errorFunc={(str) => !(/^[0-9]\d*$/.test(str))}
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
        setInputsChanged(true)
        inputs.current[agent][item] = newValue
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
    function applyChanges() {
        setSumStrs(
            allocation.map((allocSet, index) => (
                allocationToSumstr(allocSet, index)
            ))
        )
    }
    const ApplyChangesButton = () => (
        <TBButton buttonText="Apply changes" onClick={applyChanges} ml={0} mb={0}/>
    )
    const Buttons = () => {
        const showApplyChanges = modifiable && !mode && algorithm !== 'EF1'
        return (
            <Stack direction="row">
                { showApplyChanges && <ApplyChangesButton/> }
                { algorithm === 'EF1' && <AlgorithmButton buttonText="Run EF1 algorithm" onClick={runEF1}/>}
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
        setSumStrs([...sumStrs, '0'])
        netUtils.current.push(0)
    }
    function removeAgent() {
        if (numAgents === 0) return
        setNumAgents(numAgents - 1)
        inputs.current = inputs.current.slice(0, numAgents - 1)
        setAllocation(allocation.slice(0, numAgents - 1))
        setSumStrs(sumStrs.slice(0, numAgents - 1))
        netUtils.current = netUtils.current.slice(0, numAgents - 1)
    }
    function addItem() {
        if (numItems === 10) return
        setNumItems(numItems + 1)
        inputs.current.forEach((value) => value.push(-1))
    }
    function removeItem() {
        if (numItems === 0) return
        setNumItems(numItems - 1)
        let ownerIndex = -1
        let newSumStr
        setAllocation(allocation.map((value, i) => {
            if (value.has(numItems - 1)) {
                value.delete(numItems - 1)
                newSumStr = allocationToSumstr(value, i)
                ownerIndex = i
            }
            return value
        }))
        if (ownerIndex !== -1) {
            setSumStrs(
                sumStrs.map((str, i) => {
                    return i === ownerIndex ? newSumStr : str
                })
            )
        }
        inputs.current = inputs.current.map((value) => value.slice(0, numItems - 1))
    }
    function allocationToSumstr(allocSet, agentIndex) {
        const itemIndices = Array.from(allocSet)
        const numAlloced = itemIndices.length
        if (numAlloced === 0) { netUtils.current[agentIndex] = 0; return '0'}
        itemIndices.sort()
        const utilValues = itemIndices.map((itemIndex) => inputs.current[agentIndex][itemIndex])
        let sumStr = ''
        let sum = 0
        for (let i = 0; i < numAlloced; i++) {
            const value = utilValues[i]
            if (!/^[0-9]\d*$/.test(value)) { sumStr = null; break }
            sumStr += value
            sum += parseInt(value)
            if (i !== numAlloced - 1) sumStr += ' + '
            else if (numAlloced !== 1) sumStr += ` = ${sum}`
        }
        if (sumStr !== null) netUtils.current[agentIndex] = sum
        return sumStr
    }
    const AllocationDetails = ({showTop=true, showUtilSum=true}) => {
        return (
            <Stack direction="column" width="fit-content">
                { showTop &&
                    <TableBox
                        width="1"
                        borderBottom={1}
                        contents={
                            <Box>
                                <Latex>{`$${allocationName} = $`}</Latex>
                                <PageParagraph text=" highlighted allocation:"/>
                            </Box>
                        }
                    />
                }
                <Stack direction="row" columnGap={3}>
                    <Allocation allocation={allocation} allocationName={allocationName}/>
                    { showUtilSum &&
                        <Stack direction="column">
                            {
                                sumStrs.map((sumStr, index) => {
                                    return (
                                        <TableBox
                                            width='fit-content'
                                            contents={
                                                <Box>
                                                    <Latex>{`$u_{${index + 1}}(${allocationName}_{${index + 1}}) = ${sumStr ? sumStr : ''}$`}</Latex>
                                                    { sumStr === null && <PageParagraph color="red" text=" ?"/>}
                                                </Box>
                                            }
                                        />
                                    )
                                })
                            }
                        </Stack>
                    }
                </Stack>
            </Stack>
        )
    }
    function allPreferencesFilled() { 
        return inputs.current.every((row) =>
            row.every((value) => /^[0-9]\d*$/.test(value))
        )
    }
    function allItemsAllocated () {
        let numAllocated = 0
        allocation.forEach((allocSet) => numAllocated += allocSet.size)
        return numAllocated === numItems
    }
    const EnvyFreeStr = () => {
        let enviousAgent = -1
        let enviousOfAgent = -1
        let ownUtility = 0
        let iUtilityOfJsBundle = 0
        for (let i = 0; i < numAgents; i++) {
            ownUtility = netUtils.current[i]
            for (let j = 0; j < numAgents; j++) {
                if (j === i) continue
                const jsAllocation = allocation[j]
                iUtilityOfJsBundle = 0
                for (const itemIndex of jsAllocation) {
                    // For each of agent j's allocated items, figure out how much agent i values it, and determine how much total utility their bundle would give agent i
                    iUtilityOfJsBundle += parseInt(inputs.current[i][itemIndex])
                }
                if (iUtilityOfJsBundle > ownUtility) {
                    enviousAgent = i
                    enviousOfAgent = j
                    break
                }
            }
            if (enviousAgent !== -1) break
        }
        return enviousAgent === -1
        ?
            <PageParagraph bold text="Satisfied!"/>
        :
            <Box>
                <PageParagraph text={`Agent ${enviousAgent+1} is envious of agent ${enviousOfAgent+1}, since `}/>
                <Latex>{`$u_${enviousAgent+1}(${allocationName}_${enviousOfAgent+1}) = ${iUtilityOfJsBundle} > u_${enviousAgent+1}(${allocationName}_${enviousAgent+1}) = ${ownUtility}.$`}</Latex>
            </Box>
    }
    const ProportionalityStr = () => {
        let unpropAgent = -1
        let unpropUtilAll = 0
        let avgUtil = 0
        for (let i = 0; i < numAgents; i++) {
            unpropUtilAll = 0
            for (let j = 0; j < numItems; j++) {
                unpropUtilAll += parseInt(inputs.current[i][j])
            }
            avgUtil = unpropUtilAll / numAgents
            if (netUtils.current[i] < avgUtil) {
                unpropAgent = i
                break
            }
        }
        return unpropAgent === -1
        ?
            <PageParagraph bold text="Satisfied!"/>
        :
            <Box>
                <PageParagraph text={`Agent ${unpropAgent+1} feels unproportional, since `}/>
                <InlineMath math={`u_{${unpropAgent+1}}(${allocationName}_{${unpropAgent+1}}) = ${netUtils.current[unpropAgent]} < \\frac{u_{${unpropAgent+1}}(O)}{n} =  \\frac{${unpropUtilAll}}{${numAgents}} = ${avgUtil.toFixed(2)}.`}/>
            </Box>
    }
    const FairnessStrs = () => {
        if (numAgents === 0 && numItems === 0) return (
            <>
                <TableBox
                    width='fit-content'
                    contents={<PageParagraph text="Please add agents and items to get started!"/>}
                />
                <TableBox
                    width='fit-content'
                    contents={<PageParagraph text="Please add agents and items to get started!"/>}
                />
            </>
        )
        return (allPreferencesFilled() && allItemsAllocated()) 
            ?
                <>
                    <TableBox
                        width='fit-content'
                        contents={<EnvyFreeStr/>}
                    />
                    <TableBox
                        width='fit-content'
                        contents={<ProportionalityStr/>}
                    />
                </>
            :
                <>
                    <TableBox
                        width='fit-content'
                        contents={<PageParagraph text="Require all preferences and allocations!"/>}
                    />
                    <TableBox
                        width='fit-content'
                        contents={<PageParagraph text="Require all preferences and allocations!"/>}
                    />
                </>
    }
    const PropertyValues = () => {
        let netUtilSumStr = '= ' 
        let netUtilSum = 0
        let egalStr = '= \\min('
        let egalMin = 0
        let lexminStr = '= ('
        let nashStr = '= '
        let nashProd = 1
        if (netUtils.current.length === 0)  { 
            netUtilSumStr = '= undefined'; 
            egalStr = '= undefined'; 
            lexminStr = '= undefined'; 
            nashStr = '= undefined' 
        } else {
            netUtils.current.forEach((value, i) => {
                netUtilSum += value
                netUtilSumStr += value
                egalStr += value
                if (value < egalMin || egalMin === 0) egalMin = value
                nashStr += value
                nashProd *= value
                if (i === netUtils.current.length - 1) {
                    if (netUtils.current.length !== 1) {
                        netUtilSumStr += `= ${netUtilSum}`
                        nashStr += `= ${nashProd}`
                    }
                    egalStr += `) = ${egalMin}`
                } else {
                    netUtilSumStr += ' + '
                    egalStr += ', '
                    nashStr += ' \\times '
                }
            })
            const orderedUtils = [...netUtils.current]
            orderedUtils.sort((a,b) => a-b)
            for (let i = 0; i < orderedUtils.length; i++) {
                lexminStr += orderedUtils[i]
                if (i === orderedUtils.length - 1) lexminStr += ')'
                else lexminStr += ', '
            }
        }
        return (
            <Stack direction="column" width="fit-content">
                <TableBox
                    width="1"
                    borderBottom={1}
                    contents={
                        <PageParagraph text="Properties of interest:"/>
                    }
                />
                <Stack direction="row" columnGap={1}>
                    <Stack direction="column">
                        <TableBox
                            width='fit-content'
                            contents={
                                <PageParagraph nowrap text="Utilitarian social welfare"/>
                            }
                        />
                        <TableBox
                            width='fit-content'
                            contents={
                                <PageParagraph nowrap text="Egalitarian social welfare"/>
                            }
                        />
                        <TableBox
                            width='fit-content'
                            contents={
                                <PageParagraph nowrap text="Lexmin welfare"/>
                            }
                        />
                        <TableBox
                            width='fit-content'
                            contents={
                                <PageParagraph nowrap text="Nash product welfare"/>
                            }
                        />
                        <TableBox
                            width='fit-content'
                            contents={
                                <PageParagraph nowrap text="Envy-freeness: "/>
                            }
                        />
                        <TableBox
                            width='fit-content'
                            contents={
                                <PageParagraph nowrap text="Proportionality: "/>
                            }
                        />
                    </Stack>
                    <Stack direction="column">
                        <TableBox
                            width='fit-content'
                            contents={
                                <Latex>{`$${netUtilSumStr}$`}</Latex>
                            }
                        />
                        <TableBox
                            width='fit-content'
                            contents={
                                <Latex>{`$${egalStr}$`}</Latex>
                            }
                        />
                        <TableBox
                            width='fit-content'
                            contents={
                                <Latex>{`$${lexminStr}$`}</Latex>
                            }
                        />
                        <TableBox
                            width='fit-content'
                            contents={
                                <Latex>{`$${nashStr}$`}</Latex>
                            }
                        />
                        <FairnessStrs/>
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
                { fixedMode === 0 && <TBDoubleSizedSwitch leftText="Edit mode" rightText="Allocate mode" checked={mode} onChange={(value) => setMode(value)}/> }
            </ControlBoardBox>
        )
    }
    return (
        <Stack direction="column" rowGap={3}>
            <Stack direction="row" columnGap={5} rowGap={3} flexWrap="wrap">
                {
                    showPreferences && 
                    <Stack
                        direction="column"
                    >
                        <TopRow/>
                        <Preferences/>
                        <Buttons/>
                    </Stack>
                }
                { showAllocDetails && <AllocationDetails/> } 
                { showPropertyValues && <PropertyValues/> }
            </Stack>
            { (showControlBoard || modifiable) && <ControlBoard/> }
            {algorithm === 'EF1' && 
                <CollapseSectionBox title="Algorithm steps:">
                    <EF1Display numVertices={numAgents} states={ef1steps} allocationName={allocationName}/>
                </CollapseSectionBox>
            }
        </Stack>
    )
}
function Allocation({allocation, allocationName}) {
    return (
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
                                    <Latex>{`$${allocationName}_${index + 1} = \\{${setStr}\\}$`}</Latex>
                                </Box>
                            }
                        />
                    )
                })
            }
        </Stack>
    )
}
function EF1Display({numVertices, states, allocationName}) {
    const v = Array.from(Array(numVertices).keys())
    const Explanation = ({num, type, state}) => {
        if (type === 'initial') {
            return <PageParagraph text={`${num+1}. Initially, no items are allocated, and therefore also no envy.`}/>
        } else if (type === 'assignment') {
            return <PageParagraph text={`${num+1}. No one has envy towards agent ${state['agent']}, assign them next item ${state['item']}.`}/>
        } else if (type === 'cycle') {
            let cycleStr = ''
            for (const agent of state['cycle']) cycleStr += `${agent+1} \\rightarrow `
            cycleStr += `${state['cycle'][0] + 1}`
            return (
                <Box>
                    <PageParagraph text={`${num+1}. Cycle detected in envy graph: `}/>
                    <Latex>{`$${cycleStr}$`}</Latex>
                </Box>
            )
        } else if (type === 'postCycle') {
            return <PageParagraph text={`${num+1}. The above cycle is removed by exchanging bundles along the cycle: `}/>
        } else if (type === 'done') {
            return <PageParagraph text={`${num+1}. All items are now assigned without violating EF1. Refer back to the preference table to see the obtained allocation.`}/>
        } else {
            return <></>
        }
    }
    const State = ({num, state}) => {
        const type = state['type']
        let colors = null
        if (type === 'cycle') {
            colors = {}
            const cycle = state['cycle']
            for (let i = 0; i < cycle.length; i++) {
                if (i === cycle.length - 1) {
                    colors[cycle[i]] = {}
                    colors[cycle[i]][cycle[0]] = 'red'
                } else { 
                    colors[cycle[i]] = {}
                    colors[cycle[i]][cycle[i+1]] = 'red'
                }
            }
        }
        return (
            <Box>
                <Explanation num={num} type={type} state={state}/>
                { type !== 'done' && 
                    <Stack direction="row" columnGap={2}>
                        <Graph vertices={v} edges={state['envyGraph']} figure={num} numOffset={1} directed colors={colors}/> 
                        <Box mt={1.2}>
                            <Allocation allocation={state['allocation']} allocationName={allocationName}/>
                        </Box>
                    </Stack>
                }
            </Box>
        )
    }
    return (
        <Stack direction="column">
            {states.map((state, index) => <State num={index} state={state}/>)}
        </Stack>
    )
}
function ef1(utilities) {
    if (utilities.length === 0) throw new Error("Require non empty utility array.")
    // Utilities is a 2D array of n (agents) by m (items' utilities)
    const n = utilities.length
    const m = utilities[0].length
    // 1. Initialise allocation X = (X1, X2, ... , Xn) with Xi being all empty sets
    const X = []
    const relativeUtils = [] // relativeUtils[i,j] should represent the utility gained by agent i if they had agent j's allocation
    const states = []
    for (let i = 0; i < n; i++) {
        X.push(new Set())
    }
    // 2.0 Since at the beginning of the loop, there is no items allocated so there is no envy, we simply allocate item 1 to some random agent, simply pick agent 1
    states.push({
        type: 'initial',
        envyGraph: {},
        allocation: copyListOfSets(X)
    })
    X[0].add(0)
    const firstEnvyGraph = {}
    firstEnvyGraph[0] = new Set()
    for (let i = 1; i < n; i++) {
        const s = new Set()
        s.add(0)
        firstEnvyGraph[i] = s
    }
    states.push({
        type: 'assignment',
        agent: 1,
        item: 1,
        envyGraph: firstEnvyGraph,
        allocation: copyListOfSets(X)
    })
    for (let i = 0; i < n; i++) {
        const IsRelativeUtils = [utilities[i][0]]
        for (let j = 1; j < n; j++) {
            IsRelativeUtils.push(0)
        }
        relativeUtils.push(IsRelativeUtils)
    }
    const G = {} // Initialise G
    // 2. Loop through all items 2..m
    for (let item = 1; item < m; item++) {
        // 3. Construct a directed envy-graph G(X) = (N, E) where an edge (i,j) exists if i is envious of j's allocation in X
        const someoneEnviousOfList = new Set()
        for (let agentI = 0; agentI < n; agentI++) {
            const iEnvyList = new Set()
            for (let agentJ = 0; agentJ < n; agentJ++) {
                if (agentJ === agentI) continue
                if (relativeUtils[agentI][agentJ] > relativeUtils[agentI][agentI]) {
                    iEnvyList.add(agentJ)
                    someoneEnviousOfList.add(agentJ)
                }
            }
            G[agentI] = iEnvyList
        }
        // 4. Pick a vertex, i, that has no incoming edges, i.e. no agents envious of agent i. Just find first one with no envy
        let noEnvyAgent = 0
        for (let i = 0; i < n; i++) {
            if (!someoneEnviousOfList.has(i)) {
                noEnvyAgent = i
                break
            }
        }
        // 5. Allocate current item to this agent
        X[noEnvyAgent].add(item)
        states.push({
            type: 'assignment',
            agent: noEnvyAgent+1,
            item: item+1,
            envyGraph: {...G},
            allocation: copyListOfSets(X)
        })
        relativeUtils[noEnvyAgent][noEnvyAgent] += utilities[noEnvyAgent][item]
        // 6. Step 5 may have caused rise in new envy. If so, this would only be targeted towards the agent who received the item. Update G to reflect the changes
        for (let i = 0; i < n; i++) {
            if (i !== noEnvyAgent) {
                relativeUtils[i][noEnvyAgent] += utilities[i][item]
                if (relativeUtils[i][noEnvyAgent] > relativeUtils[i][i]) G[i].add(noEnvyAgent)
            } else {
                const copyEnvyList = new Set()
                for (const enviousOfAgent of G[noEnvyAgent]) copyEnvyList.add(enviousOfAgent)
                for (const enviousOfAgent of copyEnvyList) {
                    if (relativeUtils[i][i] >= relativeUtils[i][enviousOfAgent]) G[i].delete(enviousOfAgent)
                }
            }
        }
        // 7. Find any cycle in the graph and implement an exchange in which if i points to j in the cycle, then i gets j's allocation
        function getRelativeUtil(i, j) {
            let utilSum = 0
            for (const jItem of X[j]) {
                utilSum += utilities[i][jItem]
            }
            return utilSum
        }
        let cycle = findCycle(G)
        while(cycle) {
            states.push({
                type: 'cycle',
                cycle,
                envyGraph: {...G},
                allocation: copyListOfSets(X)
            })
            // While there is a cycle in G, repeat step 7
            // Exchange of allocations
            const storeFirstAlloc = new Set([...X[cycle[0]]])
            for (let i = 0; i < cycle.length; i++) {
                if (i === cycle.length - 1) {
                    X[cycle[i]] = storeFirstAlloc
                } else {
                    X[cycle[i]] = X[cycle[i+1]]
                }
            }
            // Update relative utils
            for (let a = 0; a < n; a++) {
                for (let i = 0; i < cycle.length; i++) {
                    relativeUtils[a][cycle[i]] = getRelativeUtil(a, cycle[i])
                }
            }
            // Update envy graph
            for (let agentI = 0; agentI < n; agentI++) {
                const iEnvyList = new Set()
                for (let agentJ = 0; agentJ < n; agentJ++) {
                    if (agentJ === agentI) continue
                    if (relativeUtils[agentI][agentJ] > relativeUtils[agentI][agentI]) {
                        iEnvyList.add(agentJ)
                    }
                }
                G[agentI] = iEnvyList
            }
            states.push({
                type: 'postCycle',
                envyGraph: {...G},
                allocation: copyListOfSets(X)
            })
            // Keep going until no cycles left
            cycle = findCycle(G)
        }
    }
    states.push({
        type: 'done'
    })
    return {
        'allocation': X,
        'states': states
    }
}