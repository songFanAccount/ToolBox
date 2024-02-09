import React from 'react';
import { Box, Stack, Typography } from "@mui/material"
import Xarrow, { Xwrapper } from 'react-xarrows';
import { CopyButton, PageParagraph } from '../UI/DefaultLayout';
import { useAnimate, motion } from "framer-motion"
import { useRef } from 'react';
import { AnimControlBoard, commonAnims } from '../UI/Animation';
import { degToRad } from '../../helpers/generalHelpers';
export function DisplayError({errorMsg}) {
    return <PageParagraph text={`>> ${errorMsg}`} bold/>
}
const Arrow = ({start, end, lineID, showHead=false, zIndex=-1, startAnchor="middle", endAnchor="middle", startOffset={x: 0, y: 0}, endOffset={x: 0, y: 0}, color="black"}) => {
    const startA = {
        position: startAnchor,
        offset: startOffset
    }
    const endA = {
        position: endAnchor,
        offset: endOffset
    }
    return (
        <Box zIndex={zIndex} className={lineID}>
            <Xarrow zIndex={zIndex} strokeWidth={1} color={color} start={start} end={end} path="straight" showHead={showHead} startAnchor={startA} endAnchor={endA} headSize={7}/>
        </Box>
    )
}
const DirectedArrow = ({start, end, lineID, coordsStart, coordsEnd, nodeRadius=16, color}) => {
    // From the end coords, find the x and y offsets to make the arrow end at the radius of the node.
    const xDir = coordsEnd[0] > coordsStart[0] ? -1 : 1
    const yDir = coordsEnd[1] > coordsStart[1] ? -1 : 1
    const diffX = coordsEnd[0] - coordsStart[0]
    let xOffset, yOffset
    if (diffX === 0) {
        xOffset = 0
        yOffset = nodeRadius * yDir
    } else {
        const m = (coordsEnd[1] - coordsStart[1]) / diffX
        const theta = Math.abs(Math.atan(m))
        xOffset = nodeRadius * Math.cos(theta) * xDir
        yOffset = nodeRadius * Math.sin(theta) * yDir
    }
    return <Arrow start={start} end={end} lineID={lineID} showHead endOffset={{x: xOffset, y: yOffset}} color={color} zIndex={color ? 0 : -1}/>
}
/*
Use this for an input array of already created DOMs
*/
export function ElementArray({array, maxLength, copyText}) {
    if(maxLength < 0) {throw new Error("ElementArray: Negative maxLength not allowed!")}
    const Elements = () => {
        let generatedArray = []
        const l = maxLength ? Math.min(array.length, maxLength) : array.length
        for(let i = 0; i < l; i++) {
            generatedArray.push(
                <Box
                    sx={{
                        border: 1,
                        minHeight: 25,
                        minWidth: 25,
                        textAlign: 'center'
                    }}
                >
                    {array[i]}
                </Box>
            )
        }
        if(maxLength < array.length) {
            generatedArray.push(
            <Box
                sx={{
                    border: 1,
                    minHeight: 25,
                    minWidth: 25,
                    textAlign: 'center'
                }}
            >
                ...
            </Box>)
        }
        return (
            generatedArray
        )
    }
    return (
        <Stack
            direction="row"
            alignItems="center"
            columnGap={2}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: 'fit-content',
                    maxWidth: 1,
                    flexWrap: 'wrap'
                }}
            >
                <Elements array={array}/>
            </Box>
            {copyText && <CopyButton copyableText={copyText}/>}
        </Stack>
    )
}
export function TextArray({array, copyable}) {
    if(!array || array.length === 0) return <DisplayError errorMsg="Empty or undefined array!"/>
    return (
        <ElementArray copyText={copyable ? array.join(copyable) : null} array={array.map((e) => <Typography>{e}</Typography>)}/>
    )
}

/* General tree wrapper, simply wrap each layer in a row-flexbox, then wrap the layers in a column flexbox */
function Tree({layers, lines, name, constructOrder}) {
    const array = layers?.[0]
    if(!array) {throw new Error("Tree: Not provided layers!")}
    const Layer = ({layer, layerNum}) => (
        <Box
            className={`${name}-layer-${layerNum}`}
            sx={{
                display: 'flex',
                alignItems: 'center'
            }}
        >
            {layer.map((e) => e)}
        </Box>
    )
    function getConstructionAnims() {
        let anims = []
        function getAnim(id) {
            let anim
            let trans
            let countDash = 0
            for(let i = 0; i < id.length; i++) {if(id[i] === '-') countDash++}
            if(countDash === 3) { // Is line
                anim = commonAnims.reveal
                trans = {
                    duration: 0.001,
                    delay: 0.2
                }
                anims.push([`.${id}`, anim, trans])
            } else { // Is node
                anim = commonAnims.reveal
                trans = {
                    duration: 0.001,
                    delay: 0.2,
                    at: "<"
                }
                anims.push([`.${id}`, anim, trans])
                anim = {
                    backgroundColor: ['#00D100', '#fdfffc']
                }
                trans = {
                    duration: 0.8,
                    at: "<"
                }
                anims.push([`.${id}`, anim, trans])
            }
        }
        constructOrder.forEach((e) => getAnim(e))
        return anims
    }
    function getClearAnims() {
        return constructOrder.map((id) => [`.${id}`, commonAnims.hide, {at: "<"}])
    }
    function getShowAllAnims() {
        return constructOrder.map((id) => [`.${id}`, commonAnims.show, {at: "<"}])
    }
    const constructionAnimation = getConstructionAnims()
    const clearAnimation = getClearAnims()
    const skipToEndAnim = getShowAllAnims()
    const [scope, animate] = useAnimate()
    const step = useRef(-1)
    function fullConstruction() {
        step.current = -1
        animate(constructionAnimation)
    }
    function skipToEndState() {
        step.current = -1
        animate(skipToEndAnim)
    }
    function stepConstruction() {
        /* First step only consists of 2 animations instead of 3, since root node has no parent line to animate */
        function animateFirstNode() {
            animate(clearAnimation)
            animate([constructionAnimation[0], constructionAnimation[1]])
            step.current = 2
        }
        /* 
        If not already in step mode, make everything disappear, then play first step 
        or
        If we've already completed the final step, restart
        */
        if(step.current === -1 || step.current >= constructionAnimation.length) {
            animateFirstNode()
            return
        }
        /* Otherwise, just animate next step -> each step consist of 3 animations: line from parent, new node and its coloring */
        animate([constructionAnimation[step.current], constructionAnimation[step.current+1], constructionAnimation[step.current+2]])
        step.current += 3
    }
    function stepBack() {
        if(step.current <= 2) return // Should only do something if in step mode
        const lastNodeID = constructionAnimation[step.current - 1][0]
        step.current -= 3
        const lastLineID = constructionAnimation[step.current][0]
        animate([[lastNodeID, commonAnims.hide], [lastLineID, commonAnims.hide, {at: "<"}]])
    }
    return (
        <>
            <Box className={name} ref={scope} sx={{ pb: 2, overflowX: 'auto' }}>
                <Xwrapper>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            rowGap: 5,
                            minWidth: 'fit-content',
                            width: 'fit-content',
                            zIndex: 5
                        }}
                    >
                        {array.map((element, index) => (<Layer layer={element} layerNum={index} />))}
                    </Box>
                    <Box sx={{ position: 'relative' }}>
                        {lines.map((e) => e)}
                    </Box>

                </Xwrapper>
            </Box>
            <AnimControlBoard label="Construction" play={fullConstruction} back={stepBack} next={stepConstruction} skipToEnd={skipToEndState}
                tooltips={{
                    play: 'Show ordered construction',
                    next: 'Show next step',
                    back: 'Go back one step'
                }} 
            />
        </>
    )
}
/* Wrapper tree traversal functions

Main functionality and supplied parameters are controlled by source caller

- Takes in a node, apply the supplied function to it with the current layer.
- Recursively call self according to specified traversal order
- Call postNodeFunc to process any variable changes at the end
*/
function DRL(node, func, postNodeFunc, curLayerNum, ...rest) {
    if(!node) return
    func(node, curLayerNum, ...rest)
    DRL(node.right, func, postNodeFunc, curLayerNum + 1, ...rest)
    DRL(node.left, func, postNodeFunc, curLayerNum + 1, ...rest)
    postNodeFunc(node, curLayerNum, ...rest)
}
/*
Input:
Object nested with nodes having value, left, and right.

Set-up:
Do a DFS to determine the max depth of the tree, use this to initialise the layers array e.g. depth=3 -> layers=[[],[],[]]

High level overview:
Ensure all nodes are of the same size for this to work well
Fill the arrays with DOM elements of each layer, each layer is a row-flexbox with no fancy justifyContent, they'd by default just be all to the left.
Spacing between the elements will be done via margin, each node will determine how much to push itself based on the width of their subtrees.

Recursive logic:
For the root node, determine how much margin left it needs by determining the width of the left subtree. Then, determine how much margin right it needs by determining
the width of the right subtree. 

Layer 1: ...
Layer 2:
--- ML1 --- Node 1 --- (MR1 - ML2) --- Node 2 --- (MR2 - ML3) --- Node 3    etc
Layer 3: ... 

ML-> To position the root node itself
MR-> To help position the root node's node on the right, in the same layer
*/
export function BinaryTree({tree, name, maxLayers, constructOrder}) {
    const inputTree = tree?.[0]
    if(!inputTree) {return (<DisplayError errorMsg="Invalid input!"/>)}
    if(maxLayers === 0) {throw new Error("BinaryTree: maxLayers of 0 doesn't make sense!")}
    const nodeRadius = 16 // in px
    const defaultMaxLayers = 10
    function getNumLayers(tree) {
        if(!tree) {return 0}
        return 1 + Math.max(getNumLayers(tree.left), getNumLayers(tree.right))
    }
    let numLayers = getNumLayers(inputTree)
    const MaxExceededMsg = ({maxDisplayable}) => (
        <Box>
            <PageParagraph bold block text="Input tree exceeds the max number of displayable layers!"/> 
            <PageParagraph bold text={`Input layers: ${numLayers}. Max displayable: ${maxDisplayable}.`}/>
        </Box>
    )
    
    if(maxLayers) {
        if(numLayers > maxLayers) {
            return <MaxExceededMsg maxDisplayable={maxLayers}/>
        }
    } else {
        if(numLayers > defaultMaxLayers) {
            return <MaxExceededMsg maxDisplayable={defaultMaxLayers}/>
        }
    }
    let layers = []
    let lines = []
    /* 
    Whenever a leaf node is reached and is null, we need to track the amount of marginLeft to give to nodes further right of the same layer.
    The values in this array are purely used for spacing purposes.
    */
    let nullMarginLeft = [] 
    const Node = ({value, ml, mr, color, nodeName}) => (
        <Box
            className={nodeName}
            id={nodeName}
            component={motion.div}
            sx={{
                zIndex: 1,
                width: nodeRadius * 2 - 2,
                maxWidth: nodeRadius * 2 - 2,
                height: nodeRadius * 2 - 2,
                border: 1,
                borderRadius: '50%',
                ml: `${ml}px`,
                mr: `${mr}px`,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#fdfffc',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
            }}
        >
            <Typography sx={{width:nodeRadius * 2 - 2, textAlign: 'center', color: color, fontSize: 14}}>
                {value}
            </Typography>
        </Box>
    )
    const TreeArrow = ({start, end, lineID}) => (
        <Box zIndex={-1} className={lineID}>
            <Xarrow zIndex={-1} strokeWidth={1} color="black" start={start} end={end} path="straight" showHead={false} startAnchor="middle" endAnchor="middle"/>
        </Box>
    )
    /* 
    Returns the width of the node including its subtrees, used to provide parent nodes their margins
    A null node should return 0
    A singular node should return its radius
    */
    function generateNode(node, curLayerNum) {
        if(!node) {
            for(let i = curLayerNum; i < numLayers; i++) {
                nullMarginLeft[i] += 1.5 * nodeRadius
            }
            return {width: 0, }
        }
        let marginLeft = 0
        marginLeft += nullMarginLeft[curLayerNum]
        nullMarginLeft[curLayerNum] = 0
        const left = generateNode(node.left, curLayerNum + 1)
        const widthLeft = left.width
        marginLeft += Math.max(0, widthLeft - nodeRadius / 2)
        const right = generateNode(node.right, curLayerNum + 1)
        const widthRight = right.width
        const marginRight = Math.max(0, widthRight - nodeRadius / 2) + nodeRadius
        const arrayInd = layers[curLayerNum].length
        const nodeName = `${name}-${curLayerNum}-${arrayInd}`
        layers[curLayerNum].push(<Node value={`${node.value.negate ? '-' : ''}${node.value.token}`} color={node.value.autoAdded ? 'red' : 'inherit'} ml={marginLeft} mr={marginRight} nodeName={nodeName}/>)
        if(left.nodeName) {
            const leftLineID = `${name}-${curLayerNum}-${arrayInd}-${left.arrayInd}`
            lines.push(<TreeArrow lineID={leftLineID} start={nodeName} end={left.nodeName}/>)
        }
        if(right.nodeName) {
            const rightLineID = `${name}-${curLayerNum}-${arrayInd}-${right.arrayInd}`
            lines.push(<TreeArrow lineID={rightLineID} start={nodeName} end={right.nodeName}/>)
        }
        return {width: Math.max(widthLeft, nodeRadius / 2) + Math.max(widthRight, nodeRadius / 2) + nodeRadius, nodeName: nodeName, arrayInd: arrayInd}
    }
    function generateTree(tree) {
        let i
        /* Initialising layers' arrays and nullMarginLeft array */
        for(i = 0; i < numLayers; i++) {
            layers.push([])
            nullMarginLeft.push(0)
        }
        /* Initiating recursive logic */
        generateNode(tree, 0)
    }
    generateTree(inputTree)
    function generateConstructIDs() {
        if(!constructOrder) return null
        let indexArray
        let idArray = []
        function postNodeProc(_, curLayerNum, ...rest) {
            rest[0][curLayerNum]--
        }
        function generateID(_, curLayerNum, indexArray, idArray) {
            /* Add lineID if a parent exist -> Should exist as long as not root node */
            if(curLayerNum > 0) {
                const prevLayerNum = curLayerNum - 1
                const lineFromParentID = `${name}-${prevLayerNum}-${indexArray[prevLayerNum]}-${indexArray[curLayerNum]}`
                idArray.push(lineFromParentID)
            }
            const currentNodeID = `${name}-${curLayerNum}-${indexArray[curLayerNum]}`
            idArray.push(currentNodeID)
        }
        switch(constructOrder) {
            case "DRL":
                indexArray = layers.map((layer) => layer.length - 1)
                DRL(inputTree, generateID, postNodeProc, 0, indexArray, idArray)
                break
            default:
                throw new Error("Currently cannot support")
        }
        return idArray
    }
    const constructOrderIDs = generateConstructIDs()
    return (
        <Tree layers={[layers]} lines={lines} name={name} constructOrder={constructOrderIDs}/>
    )
}

function NormalNode({nodeName, nodeRadius=16, ml=0, mr=0, color, value, top, left}) {
    return (
        <Box
            className={nodeName}
            id={nodeName}
            component={motion.div}
            sx={{
                zIndex: 1,
                position: 'absolute',
                top: top-nodeRadius, left: left-nodeRadius,
                width: nodeRadius * 2 - 2,
                maxWidth: nodeRadius * 2 - 2,
                height: nodeRadius * 2 - 2,
                border: 1,
                borderRadius: '50%',
                ml: `${ml}px`,
                mr: `${mr}px`,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#fdfffc',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis'
            }}
        >
            <Typography sx={{width:nodeRadius * 2 - 2, textAlign: 'center', color: color, fontSize: 14}}>
                {value}
            </Typography>
        </Box>
    )
}
export function Graph({graphName="G", vertices, edges, figure=0, numOffset=0, directed=false, nodeRadius=16, colors}) {
    const canvasWidth = 150
    const center = canvasWidth / 2
    function generateCoords() {
        const coords = {}
        const numVertices = vertices.length
        const angleBetween = 360*1.0 / numVertices
        for (let i = 0; i < numVertices; i++) {
            const xOffset = Math.cos(degToRad(i * angleBetween)) * canvasWidth / 2
            const yOffset = Math.sin(degToRad(i * angleBetween)) * canvasWidth / 2
            const x = center + xOffset
            const y = center + yOffset
            coords[vertices[i]] = [x,y]
        }
        return coords
    }
    const verticesCoords = generateCoords()
    return (
        <Box
            sx={{
                width: canvasWidth,
                height: canvasWidth,
                m: 3,
                position: 'relative'
            }}
        >
            {/* <Box width={20} height={20} border={1} position={'relative'} top={center - 10} left={center - 10}></Box> */}
            { Object.entries(verticesCoords).map((vertexPairs) => <NormalNode nodeName={`${graphName}-${vertexPairs[0]}$${figure}`} nodeRadius={nodeRadius} value={parseInt(vertexPairs[0])+numOffset} top={vertexPairs[1][1]} left={vertexPairs[1][0]}/>)}
            { edges && Object.entries(edges).map((edgePairs) => {
                return Array.from(edgePairs[1]).map((toNode) => {
                    const startName = `${graphName}-${edgePairs[0]}$${figure}`
                    const endName = `${graphName}-${toNode}$${figure}`
                    const lineID = `${graphName}-${edgePairs[0]},${toNode}$${figure}`
                    const color = colors?.[edgePairs[0]]?.[toNode]
                    return (
                        directed 
                        ?
                        <DirectedArrow start={startName} end={endName} lineID={lineID} nodeRadius={nodeRadius} coordsStart={verticesCoords[edgePairs[0]]} coordsEnd={verticesCoords[toNode]} color={color}/>
                        :
                        <Arrow start={startName} end={endName} lineID={lineID} color={color}/>
                    )
                }
                )
            })}
        </Box>
    )
}