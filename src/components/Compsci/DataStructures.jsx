import React from 'react';
import { Box, Typography } from "@mui/material"
import Xarrow, { Xwrapper } from 'react-xarrows';
import { PageParagraph } from '../UI/DefaultLayout';
/*
Use this for an input array of already created DOMs
*/
export function ElementArray({array, maxLength}) {
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
    )
}
export function TextArray({array}) {
    if(!array || array.length === 0) {throw new Error("TextArray: Input array is undefined or is empty!")}
    return (
        <ElementArray array={array.map((e) => <Typography>{e}</Typography>)}/>
    )
}

// https://www.framer.com/motion/animate-function/###at
/* General tree wrapper, simply wrap each layer in a row-flexbox, then wrap the layers in a column flexbox */
function Tree({layers, lines, name, constructOrder}) {
    const array = layers?.[0]
    if(!array) {throw new Error("Tree: Not provided layers!")}
    if(constructOrder) console.log(constructOrder)
    const Layer = ({layer}) => (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center'
            }}
        >
            {layer}
        </Box>
    )
    return (
        <Box className={name} sx={{pb: 2, overflowX: 'auto'}}>
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
                    {array.map((e) => (<Layer layer={e}/>))}
                </Box>
                <Box sx={{position: 'relative'}}>
                    {lines}
                </Box>
                
            </Xwrapper>
        </Box>
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
    console.log(rest)
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
    if(!inputTree) {return <></>}
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
            id={nodeName}
            sx={{
                width: nodeRadius * 2 - 2,
                maxWidth: nodeRadius * 2 - 2,
                height: nodeRadius * 2 - 2,
                border: 1,
                borderRadius: '50%',
                ml: `${ml}px`,
                mr: `${mr}px`,
                display: 'flex',
                alignItems: 'center',
                backgroundColor: 'white',
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
    const Arrow = ({start, end, lineID}) => (
        <Xarrow id={lineID} zIndex={-1} strokeWidth={2} color="black" start={start} end={end} path="straight" showHead={false} startAnchor="middle" endAnchor="middle"/>
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
        layers[curLayerNum].push(<Node value={node.value.token} color={node.value.autoAdded ? 'red' : 'inherit'} ml={marginLeft} mr={marginRight} nodeName={nodeName}/>)
        if(left.nodeName) {
            const leftLineID = `${name}-${curLayerNum}-${arrayInd}-${left.arrayInd}`
            lines.push(<Arrow lineID={leftLineID} zIndex={5} start={nodeName} end={left.nodeName}/>)
        }
        if(right.nodeName) {
            const rightLineID = `${name}-${curLayerNum}-${arrayInd}-${left.arrayInd}`
            lines.push(<Arrow lineID={rightLineID} zIndex={5} start={nodeName} end={right.nodeName}/>)
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
        <Tree layers={[layers]} lines={lines} constructOrder={constructOrderIDs}/>
    )
}