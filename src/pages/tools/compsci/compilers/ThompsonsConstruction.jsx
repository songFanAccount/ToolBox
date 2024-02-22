import React from 'react'
import { ExternalLink, PageParagraph, SectionBox, TBButton } from '../../../../components/UI/DefaultLayout'
import { Box } from '@mui/material'
import { MEPTextField } from '../../../../components/GeneralComponents'
import { isLetterOrDigit, removeSpaces } from '../../../../helpers/generalHelpers'
import { Arrow, DirectedArrow, NormalNode } from '../../../../components/Compsci/DataStructures'

function ThompsonsConstruction() {
  const [regex, setRegex] = React.useState('')
  const [algoOutputs, setAlgoOutputs] = React.useState(null)
  const nodeRadius = 12
  function handleChange(value) {
    setRegex(value)
  }
  function runThompsons() {
    setAlgoOutputs(parse(regex))
  }
  const Node = ({nodeName, value, top, left}) => (
    <NormalNode nodeRadius={nodeRadius} nodeName={nodeName} value={value} top={top} left={left}/> 
  )
  const PlaceholderBox = ({name, top, left}) => (
    <Box
      className={name}
      id={name} 
      sx={{
        position: 'absolute',
        top: top, left: left
      }}
    />
  )
  const LabelsText = ({text, ml}) => (
    <PageParagraph text={text} backgroundColor='white' p={0.5} ml={ml}/>
  )
  const ConstructionGraph = () => {
    const tokens = algoOutputs['tokens']
    console.log(tokens)
    const startX = 0, startY = 150
    const currentCoords = [startX, startY]
    let currentNodeName = "start"
    const edgeLen = 80, labelsML = 1.5
    const nodes = []
    const edges = []
    const boxes = []
    nodes.push(<Node nodeName="start" value="S" left={0} top={startY}/>)
    for (let i = 0; i < tokens.length; i++) {
      processToken(tokens[i])
    }
    function processToken(token) {
      const type = token['type']
      let tokenInfo
      let height, width, relativeTop
      let coordsStart, newNodeName, storeStartCoords, storeStartNodeName, storeTokenStartName
      let boxTop, boxBottom
      switch (type) {
        case '|':
          const orTokens = token['tokens']
          for (let i = 0; i < orTokens.length; i++) {
            for (let j = 0; j < orTokens[i].length; j++) {
              processToken(orTokens[i][j])
            }
          }
          break
        case '*':
          storeStartCoords = [...currentCoords]
          storeStartNodeName = currentNodeName
          // Epsilon branch (start)
          coordsStart = [...currentCoords]
          currentCoords[0] += edgeLen
          newNodeName = `node-${nodes.length}`
          nodes.push(<Node nodeName={newNodeName} value={''} left={currentCoords[0]} top={currentCoords[1]}/>)
          edges.push(<DirectedArrow start={currentNodeName} end={newNodeName} lineID={`line-${edges.length}`} coordsStart={coordsStart} coordsEnd={[...currentCoords]} nodeRadius={nodeRadius} labels={<LabelsText text="ϵ" ml={labelsML}/>}/>)
          currentNodeName = newNodeName
          storeTokenStartName = currentNodeName
          // Process the token * is applied to
          tokenInfo = processToken(token['token'])
          // Epsilon branch for the repeat feature of *
          boxTop = currentCoords[1] - edgeLen/2 - tokenInfo['relativeTop']
          boxes.push(<PlaceholderBox name={`box-${boxes.length}`} top={boxTop} left={currentCoords[0] - nodeRadius/2}/>)
          boxes.push(<PlaceholderBox name={`box-${boxes.length}`} top={boxTop} left={currentCoords[0] - tokenInfo['width'] + nodeRadius/2}/>)
          edges.push(<Arrow start={currentNodeName} end={`box-${boxes.length - 2}`} lineID={`line-${edges.length}`}/>)
          edges.push(<Arrow start={`box-${boxes.length - 2}`} end={`box-${boxes.length - 1}`} lineID={`line-${edges.length}`} labels={<LabelsText text="ϵ"/>}/>)
          edges.push(<DirectedArrow start={`box-${boxes.length - 1}`} end={storeTokenStartName} lineID={`line-${edges.length}`} coordsStart={[currentCoords[0] - tokenInfo['width']+ nodeRadius/2, boxTop]} coordsEnd={[currentCoords[0] - tokenInfo['width'], boxTop + edgeLen/2]} nodeRadius={nodeRadius}/>)
          // Another epsilon branch (end)
          coordsStart = [...currentCoords]
          currentCoords[0] += edgeLen
          newNodeName = `node-${nodes.length}`
          nodes.push(<Node nodeName={newNodeName} value={''} left={currentCoords[0]} top={currentCoords[1]}/>)
          edges.push(<DirectedArrow start={currentNodeName} end={newNodeName} lineID={`line-${edges.length}`} coordsStart={coordsStart} coordsEnd={[...currentCoords]} nodeRadius={nodeRadius} labels={<LabelsText text="ϵ" ml={labelsML}/>}/>)
          currentNodeName = newNodeName
          // Last epsilon branch (from very beginning to end)
          boxBottom = currentCoords[1] + edgeLen/2 + tokenInfo['height'] - tokenInfo['relativeTop']
          boxes.push(<PlaceholderBox name={`box-${boxes.length}`} top={boxBottom} left={storeStartCoords[0] + nodeRadius/2}/>)
          boxes.push(<PlaceholderBox name={`box-${boxes.length}`} top={boxBottom} left={storeStartCoords[0] + tokenInfo['width'] + 2*edgeLen - nodeRadius/2}/>)
          edges.push(<Arrow start={storeStartNodeName} end={`box-${boxes.length - 2}`} lineID={`line-${edges.length}`}/>)
          edges.push(<Arrow start={`box-${boxes.length - 2}`} end={`box-${boxes.length - 1}`} lineID={`line-${edges.length}`} labels={<LabelsText text="ϵ"/>}/>)
          edges.push(<DirectedArrow start={`box-${boxes.length - 1}`} end={currentNodeName} lineID={`line-${edges.length}`} coordsStart={[currentCoords[0] - nodeRadius/2, boxBottom]} coordsEnd={[...currentCoords]} nodeRadius={nodeRadius}/>)
          // Setting return vals
          height = boxBottom - boxTop
          width = 2*edgeLen + tokenInfo['width']
          relativeTop = currentCoords[1] - boxTop
          break
        case '+':
          // Token type is either char or ()
          tokenInfo = processToken(token['token'])
          width = tokenInfo['width']
          tokenInfo = processToken({
            type: '*',
            token: token['token']
          })
          height = tokenInfo['height']
          width += tokenInfo['width']
          relativeTop = tokenInfo['relativeTop']
          break
        case '()':
          const parentTokens = token['tokens']
          let maxTop = startY, maxBottom = startY, tokensWidth = 0
          for (let i = 0; i < parentTokens.length; i++) {
            const tokenInfo = processToken(parentTokens[i])
            tokensWidth += tokenInfo['width']
            const tokenMaxTop = startY - tokenInfo['relativeTop']
            if (tokenMaxTop < maxTop) maxTop = tokenMaxTop
            const tokenMaxBottom = startY + tokenInfo['height'] - tokenInfo['relativeTop']
            if (tokenMaxBottom > maxBottom) maxBottom = tokenMaxBottom
          }
          height = maxBottom - maxTop
          width = tokensWidth
          relativeTop = startY - maxTop
          break
        case 'char':
          coordsStart = [...currentCoords]
          currentCoords[0] += edgeLen
          newNodeName = `node-${nodes.length}`
          nodes.push(<Node nodeName={newNodeName} value={''} left={currentCoords[0]} top={currentCoords[1]}/>)
          edges.push(<DirectedArrow start={currentNodeName} end={newNodeName} lineID={`line-${edges.length}`} coordsStart={coordsStart} coordsEnd={[...currentCoords]} nodeRadius={nodeRadius} labels={<LabelsText text={token['value']} ml={labelsML}/>}/>)
          currentNodeName = newNodeName
          height = 0
          width = edgeLen
          relativeTop = 0
          break
        default:
          throw new Error("processToken: Invalid type = " + type)
      }
      return { height, width, relativeTop }
    }
    return (
      <Box
        position="relative"
        sx={{
          height: 300, width: 500,
        }}
      >
        {nodes}
        {edges}
        {boxes}
      </Box>
    )
  }
  const Construction = () => {
    if (algoOutputs) {
      if (algoOutputs.success) {
        return <ConstructionGraph/>
      } else return <PageParagraph text={"Syntax Error: " + algoOutputs.errorMsg}/>
    } else return <PageParagraph text="Please enter a regular expression to begin!"/>
  }
  return (
    <Box>
      <SectionBox noBorder>
        <Box>
          <PageParagraph text="Thompson's construction algorithm takes in an input "/>
          <ExternalLink href="https://en.wikipedia.org/wiki/Regular_expression">regex</ExternalLink>
          <PageParagraph text=" (regular expression) and outputs the corresponding "/>
          <ExternalLink href="https://en.wikipedia.org/wiki/Nondeterministic_finite_automaton">NFA</ExternalLink>
          <PageParagraph text=" (Nondeterministic Finite Automaton)."/>
        </Box>
      </SectionBox>
      <SectionBox title="How it works">
        <MEPTextField onChange={handleChange} expr={regex} placeHolder='e.g. (0|10*1)*10*'/>
        <TBButton buttonText="Run Algorithm" onClick={runThompsons} ml={0} mt={0}/>
        <SectionBox title="Construction:">
          <Construction/>
        </SectionBox>
      </SectionBox>
    </Box>
  )
}

export default ThompsonsConstruction

function parse(regex) {
  regex = removeSpaces(regex)
  const len = regex.length
  let tokens = []
  let openParentCount = 0
  for (let i = 0; i < len; i++) {
    const currentChar = regex[i]
    switch (currentChar) {
      case '*':
      case '+':
        // 0 or more of the token that precedes this operator
        // Find most recent token and attach this quantifier to it
        if (tokens.length === 0) {
          return {
            success: false,
            errorMsg: "No valid token to apply operator: " + currentChar
          }
        } else {
          const lastToken = tokens[tokens.length - 1]
          if (lastToken['type'] === '(' || lastToken['type'] === '*' || lastToken['type'] === '+' || lastToken['type'] === '|') {
            return {
              success: false,
              errorMsg: lastToken['type'] + currentChar
            }
          } else {
            tokens[tokens.length - 1] = {
              type: currentChar,
              token: tokens[tokens.length - 1]
            }
          }
        }
        break
      case '|':
        // Or
        if (tokens.length === 0) {
          return {
            success: false,
            errorMsg: "No valid token to apply operator: " + currentChar
          }
        } else {
          const lastToken = tokens[tokens.length - 1]
          if (lastToken['type'] === '(' || lastToken['type'] === '|') {
            return {
              success: false,
              errorMsg: lastToken['type'] + currentChar
            }
          } else {
            tokens.push({
              type: '|'
            })
          }
        }
        break
      case '(':
        // LPARENT
        // Produce an intermediate token that waits for the closing )
        openParentCount++
        tokens.push({
          type: '('
        })
        break
      case ')':
        // RPARENT
        // Track backwards to find first ( intermediate token
        openParentCount--
        if (tokens.length === 0) {
          return {
            success: false,
            errorMsg: "Invalid first character: )"
          }
        } else if (tokens[tokens.length - 1]['type'] === '(') {
          return {
            success: false,
            errorMsg: '()'
          }
        }
        let foundCloseParenthese = false
        let orTokens = null
        for (let t = tokens.length - 1; t >= 0; t--) {
          const token = tokens[t]
          if (token['type'] === '(') {
            if (orTokens) {
              const orTokenList = tokens.slice(t + 1)
              tokens.splice(t+1)
              orTokens.unshift(orTokenList)
              const orCompoundToken = {
                type: '|',
                tokens: orTokens
              }
              tokens.push(orCompoundToken)
            }
            const nestedTokens = tokens.slice(t+1)
            if (nestedTokens.length === 1 && nestedTokens[0]['type'] === '()') { // Redundant nesting of parentheses
              tokens.splice(t)
              for (const nestedToken of nestedTokens) tokens.push(nestedToken)
            } else {
              const compoundToken = {
                type: '()',
                tokens: tokens.slice(t + 1)
              }
              tokens.splice(t)
              tokens.push(compoundToken)
            }
            foundCloseParenthese = true
            break
          } else if (token['type'] === '|') {
            const orTokenList = tokens.slice(t + 1)
            tokens.splice(t)
            if (orTokens) orTokens.unshift(orTokenList)
            else orTokens = [orTokenList]
          } else continue
        }
        if (!foundCloseParenthese) return {
          success: false,
          errorMsg: "Could not find matching '(' for a ')'"
        }
        break
      default:
        if (isLetterOrDigit(currentChar)) {
          // Letters and digits are to be treated the same way
          tokens.push({
            type: 'char',
            value: currentChar
          })
        } else return {
          success: false,
          errorMsg: "Invalid character: " + currentChar
        }
    }
  }
  // Post-processing:
  // 1. Check whether all opened parentheses are matched
  if (openParentCount !== 0) return {
    success: false,
    errorMsg: "Not all parentheses have been closed!"
  }
  // 2. Aggregating |
  let orTokens = null
  for (let t = tokens.length - 1; t >= 0; t--) {
    const token = tokens[t]
    if (token['type'] === '|') {
      const orTokenList = tokens.slice(t + 1)
      tokens.splice(t)
      if (orTokens) orTokens.unshift(orTokenList)
      else orTokens = [orTokenList]
    } else continue
  }
  if (orTokens) {
    const orTokenList = [...tokens]
    tokens = []
    orTokens.unshift(orTokenList)
    const orCompoundToken = {
      type: '|',
      tokens: orTokens
    }
    tokens.push(orCompoundToken)
  }
  return {
    success: true,
    tokens: tokens
  }
}