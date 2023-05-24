import { Box, Typography } from "@mui/material"
import { useId } from "react"

export function BinaryTree(props) {
    const inputTree = props.tree[0]
    const Node = ({node}) => {
        console.log('Input node = ')
        console.log(node)
        const displayStr = node ? node.token : ''
        const NodeInfo = ({str}) => (
            <Typography
                sx={{
                    p: 0,
                    m: 0,
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
                    border: node ? 1 : 0,
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
        let tree = (
            <Box
                sx={{
                    width: 1,
                }}
            >
                {layers.map((e) => (<Layer nodes={e}/>))}
            </Box>
        )
        return tree
    }
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center'
            }}
        >
            <Tree/>
        </Box>
    )
}