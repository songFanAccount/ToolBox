import { useId } from 'react';
import { Box, Typography } from "@mui/material"

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
                    minWidth: 0,
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
                overflowX: 'visible',
                border: 1
            }}
        >
            <Tree/>
        </Box>
    )
}