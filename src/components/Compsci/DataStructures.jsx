import React, { useId } from 'react';
import { Box, Typography } from "@mui/material"
import Xarrow, { Xwrapper } from 'react-xarrows';
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

export function BinaryTree(props) {
    const inputTree = props.tree?.[0]
    if(!inputTree) {return <></>}
    const Node = ({node}) => {
        console.log('Input node = ')
        console.log(node)
        const displayStr = node ? node.token : ''
        const NodeInfo = ({str}) => (
            <Typography
                sx={{
                    p: 0,
                    m: 0,
                    minWidth: 0,
                    fontSize: 18,
                }}
            >{str}</Typography>
        )
        return (
            <Box
                key={useId()}
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: 30,
                    aspectRatio: '1 / 1',
                    border: node ? 1 : 1,
                    m: '1%'
                }}
            >
                <NodeInfo str={displayStr}/>
            </Box>
        )
    }
    function generateLayers(tree, layers, curLayerNum) {
        if(curLayerNum >= layers.length) {return}
        const curNode = <Node node={tree?.value}/>
        layers[curLayerNum].push(curNode)
        // Adding child nodes
        generateLayers(tree?.left, layers, curLayerNum + 1)
        generateLayers(tree?.right, layers, curLayerNum + 1)
    }
    function numLayers(tree) {
        if(!tree) {return 0}
        return 1 + Math.max(numLayers(tree.left), numLayers(tree.right))
    }
    const Layer = ({nodes}) => (
        <Box
            key={useId()}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-around',
                my: '2%'
            }}
        >
            {nodes}
        </Box>
    )
    const Tree = () => {
        if(inputTree === {}) {return (<Typography>NO TREE</Typography>)}
        let layers = []
        for(let i = 0; i < numLayers(inputTree); i++) {
            layers.push([])
        }
        generateLayers(inputTree, layers, 0)
        return (
            <Box
                sx={{
                    width: 1,
                }}
            >
                {layers.map((e) => (<Layer nodes={e}/>))}
            </Box>
        )
    }
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                maxWidth: 1,
                width: 'fit-content',
                overflowX: 'scroll',
                border: 1
            }}
        >
            <Tree/>
        </Box>
    )
}

/* General tree wrapper, simply wrap each layer in a row-flexbox, then wrap the layers in a column flexbox */
function Tree({layers, lines, name}) {
    const array = layers?.[0]
    if(!array) {throw new Error("Tree: Not provided layers!")}
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
        <Box className={name} sx={{border: 1, overflowX: 'scroll'}}>
            <Xwrapper>
                <Box 
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        rowGap: 5,
                        border: 1,
                        minWidth: 'fit-content',
                        width: 'fit-content'
                    }}
                >
                    {array.map((e) => (<Layer layer={e}/>))}
                </Box>
                {lines}
            </Xwrapper>
        </Box>
    )
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
export function BinaryTree2({tree, name}) {
    const inputTree = tree?.[0]
    if(!inputTree) {return <></>}
    let numLayers
    let layers = []
    let lines = []
    const nodeRadius = 16 // in px
    function getNumLayers(tree) {
        if(!tree) {return 0}
        return 1 + Math.max(getNumLayers(tree.left), getNumLayers(tree.right))
    }
    const Node = ({value, ml, mr, nodeName}) => (
        <Box
            id={nodeName}
            sx={{
                width: nodeRadius * 2 - 2,
                height: nodeRadius * 2 - 2,
                border: 1,
                borderRadius: '50%',
                ml: `${ml}px`,
                mr: `${mr}px`,
                display: 'flex',
                alignItems: 'center',
                zIndex:5
            }}
        >
            <Typography sx={{minWidth: 1, textAlign: 'center'}}>
                {value}
            </Typography>
        </Box>
    )
    const Arrow = ({start, end}) => (
        <Xarrow zIndex={5} start={start} end={end}/>
    )
    /* 
    Returns the width of the node including its subtrees, used to provide parent nodes their margins
    A null node should return 0
    A singular node should return its radius
    */
    function generateNode(node, curLayerNum) {
        if(!node) {return {width: 0, }}
        const left = generateNode(node.left, curLayerNum + 1)
        const widthLeft = left.width
        const marginLeft = Math.max(0, widthLeft - nodeRadius / 2)
        const right = generateNode(node.right, curLayerNum + 1)
        const widthRight = right.width
        const marginRight = Math.max(0, widthRight) + nodeRadius
        const nodeName = `${name}-${curLayerNum}-${layers[curLayerNum].length}`
        layers[curLayerNum].push(<Node value={node.value.token} ml={marginLeft} mr={marginRight} nodeName={nodeName}/>)
        if(left.nodeName) {
            lines.push(<Arrow zIndex={5} start={nodeName} end={left.nodeName}/>)
        }
        if(right.nodeName) {lines.push(<Arrow zIndex={5} start={nodeName} end={right.nodeName}/>)}
        return {width: Math.max(widthLeft, nodeRadius / 2) + Math.max(widthRight, nodeRadius / 2) + nodeRadius, nodeName: nodeName}
    }
    function generateTree(tree) {
        numLayers = getNumLayers(tree)
        let i
        /* Initialising layers' arrays */
        for(i = 0; i < numLayers; i++) {
            layers.push([])
        }
        /* Initiating recursive logic */
        generateNode(tree, 0)
    }

    generateTree(inputTree)
    return (
        <Tree layers={[layers]} lines={lines}/>
    )
}