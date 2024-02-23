import React from 'react'
import { ExternalLink, PageParagraph, PageTextList, SectionBox, TBButton } from '../../../../components/UI/DefaultLayout'
import { Box, Stack } from '@mui/material'
import { MEPTextField } from '../../../../components/GeneralComponents'
import { isLetterOrDigit, removeSpaces } from '../../../../helpers/generalHelpers'
import { Arrow, DirectedArrow, NormalNode } from '../../../../components/Compsci/DataStructures'
import { AnimControlBoard, commonAnims } from '../../../../components/UI/Animation'
import { useAnimate } from 'framer-motion'

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
    <PageParagraph text={text} backgroundColor='white' p={0.5} ml={0}/>
  )
  const ConstructionGraph = () => {
    const tokens = algoOutputs['tokens']
    let currentNodeName = "start"
    const edgeLen = 80, labelsML = 1.5
    const nodes = []
    const edges = []
    const boxes = []
    // Anim related
    const anims = []
    const [scope, animate] = useAnimate()
    const step = React.useRef(-1)
    //
    const wholeDiagramDims = getTokenSectionDims({
      type: '()',
      tokens: tokens
    })
    const startX = 0, startY = wholeDiagramDims['relativeTop']
    const currentCoords = [startX, startY]
    nodes.push(<Node nodeName="start" value="S" left={0} top={startY}/>)
    for (let i = 0; i < tokens.length; i++) {
      processToken(tokens[i], i === tokens.length - 1)
    }
    function getTokenSectionDims(token) {
      const type = token['type']
      let height, width, relativeTop
      let tokenDims
      let tokenMaxTop, tokenMaxBottom
      let ORStartRelTop, ORRelBottom
      switch (type) {
        case 'char':
          height = 0
          width = edgeLen
          relativeTop = 0
          break
        case '*':
          tokenDims = getTokenSectionDims(token['token'])
          height = tokenDims['height'] + edgeLen
          width = tokenDims['width'] + 2*edgeLen
          relativeTop = tokenDims['relativeTop'] + edgeLen/2
          break
        case '+':
          tokenDims = getTokenSectionDims(token['token'])
          width = tokenDims['width']
          tokenDims = getTokenSectionDims({
            type: '*',
            token: token['token']
          })
          width += tokenDims['width']
          height = tokenDims['height']
          relativeTop = tokenDims['relativeTop']
          break
        case '()':
          width = 0
          tokenMaxTop = 0
          tokenMaxBottom = 0
          for (let i = 0; i < token['tokens'].length; i++) {
            tokenDims = getTokenSectionDims(token['tokens'][i])
            width += tokenDims['width']
            const tokenTop = tokenDims['relativeTop']
            const tokenBottom = tokenDims['height'] - tokenTop
            if (tokenTop > tokenMaxTop) tokenMaxTop = tokenTop
            if (tokenBottom > tokenMaxBottom) tokenMaxBottom = tokenBottom
          }
          height = tokenMaxTop + tokenMaxBottom
          relativeTop = tokenMaxTop
          break
        case '|':
          width = 0
          height = 0
          ORStartRelTop = []
          ORRelBottom = []
          for (let i = 0; i < token['tokens'].length; i++) {
            tokenDims = getTokenSectionDims({
              type: '()',
              tokens: token['tokens'][i]
            })
            ORStartRelTop.push(tokenDims['relativeTop'])
            ORRelBottom.push(tokenDims['height'] - tokenDims['relativeTop'])
            if (tokenDims['width'] > width) width = tokenDims['width']
            height += tokenDims['height']
          }
          width += 2 * edgeLen
          height += (token['tokens'].length - 1) * (3 * edgeLen / 4)
          relativeTop = Math.floor(height / 2)
          break
        default:
          throw new Error("getTokenSectionDims: Invalid type = " + type)
      }
      return {height, width, relativeTop, ORStartRelTop, ORRelBottom}
    }
    function processToken(token, isLast) {
      const type = token['type']
      let tokenInfo, tokensWidth
      let height, width, relativeTop, finalNodeInfo
      let coordsStart, newNodeName, storeStartCoords, storeStartNodeName, storeTokenStartName
      let yLevel, boxTop, boxBottom
      let edgeName, multiEdge
      switch (type) {
        case '|':
          const orTokens = token['tokens']
          storeStartCoords = [...currentCoords]
          // Determine the overall dimensions of all the OR sections
          const dims = getTokenSectionDims(token)
          storeStartNodeName = currentNodeName
          // Determine and create the final node
          const finalNodeName = `node-${nodes.length}`
          const storeEndNodeCoords = [currentCoords[0] + dims['width'], currentCoords[1]]
          nodes.push(<Node nodeName={finalNodeName} value={isLast ? 'E' : ''} left={currentCoords[0] + dims['width']} top={currentCoords[1]}/>)
          anims.push([`.${finalNodeName}`, commonAnims.reveal, {duration: 0.001, at: "<", delay: 1}])
          // Move to where the token start needs to be
          currentCoords[0] += edgeLen
          currentCoords[1] -= dims['relativeTop']
          for (let i = 0; i < orTokens.length; i++) {
            // Move down by relativeTops to get to where the section is generated from
            currentCoords[1] += dims['ORStartRelTop'][i]
            coordsStart = [...currentCoords]
            // Produce the start node
            newNodeName = `node-${nodes.length}`
            nodes.push(<Node nodeName={newNodeName} value={''} left={currentCoords[0]} top={currentCoords[1]}/>)
            edgeName = `line-${edges.length}`
            edges.push(<DirectedArrow start={storeStartNodeName} end={newNodeName} lineID={edgeName} coordsStart={[...storeStartCoords]} coordsEnd={[...currentCoords]} nodeRadius={nodeRadius} labels={<LabelsText text="ϵ" ml={labelsML}/>}/>)
            // ANIM
            anims.push([`.${edgeName}`, commonAnims.reveal, {duration: 0.001, delay: 1}])
            anims.push([`.${newNodeName}`, commonAnims.reveal, {duration: 0.001, at: "<", delay: 1}])
            currentNodeName = newNodeName
            // Produce the section
            let finalNode
            for (let j = 0; j < orTokens[i].length; j++) {
              tokenInfo = processToken(orTokens[i][j])
              if (j === orTokens[i].length - 1) finalNode = tokenInfo['finalNodeInfo']
            }
            // Create an edge to an intermediate box based on how far the end node is from the end box
            const dist = storeEndNodeCoords[0] - edgeLen - finalNode['coords'][0]
            let endNodeName, endNodeCoords
            multiEdge = []
            if (dist > 0) {
              endNodeName = `box-${boxes.length}`
              endNodeCoords = [finalNode['coords'][0] + dist, finalNode['coords'][1]]
              boxes.push(<PlaceholderBox name={endNodeName} left={finalNode['coords'][0] + dist} top={finalNode['coords'][1]}/>)
              edgeName = `line-${edges.length}`
              edges.push(<Arrow start={finalNode['name']} end={endNodeName} lineID={edgeName} coordsStart={[...finalNode['coords']]} coordsEnd={[...endNodeCoords]} nodeRadius={nodeRadius}/>)
              multiEdge.push(edgeName)
            } else {
              endNodeName = finalNode['name']
              endNodeCoords = [...finalNode['coords']]
            }
            edgeName = `line-${edges.length}`
            edges.push(<DirectedArrow start={endNodeName} end={finalNodeName} lineID={edgeName} coordsStart={[...endNodeCoords]} coordsEnd={[...storeEndNodeCoords]} nodeRadius={nodeRadius} labels={<LabelsText text="ϵ" ml={labelsML}/>}/>)
            multiEdge.push(edgeName)
            // ANIM
            multiEdge.forEach((name, index) => {
              if (index === 0) anims.push([`.${name}`, commonAnims.reveal, {duration: 0.001, delay: 1}])
              else anims.push([`.${name}`, commonAnims.reveal, {duration: 0.001, delay: 1, at: '<'}])
            })
            anims.push([`.${finalNodeName}`, commonAnims.show, {duration: 0.001, delay: 1, at: '<'}])
            currentCoords[0] = coordsStart[0]
            currentCoords[1] = coordsStart[1] + dims['ORRelBottom'][i] + 3 * edgeLen / 4
          }
          currentCoords[0] = storeEndNodeCoords[0]
          currentCoords[1] = storeEndNodeCoords[1]
          currentNodeName = finalNodeName
          height = dims['height']
          width = dims['width']
          relativeTop = dims['relativeTop']
          finalNodeInfo = {
            name: finalNodeName,
            coords: storeEndNodeCoords
          }
          break
        case '*':
          storeStartCoords = [...currentCoords]
          storeStartNodeName = currentNodeName
          // Epsilon branch (start)
          coordsStart = [...currentCoords]
          currentCoords[0] += edgeLen
          newNodeName = `node-${nodes.length}`
          edgeName = `line-${edges.length}`
          nodes.push(<Node nodeName={newNodeName} value={''} left={currentCoords[0]} top={currentCoords[1]}/>)
          edges.push(<DirectedArrow start={currentNodeName} end={newNodeName} lineID={edgeName} coordsStart={coordsStart} coordsEnd={[...currentCoords]} nodeRadius={nodeRadius} labels={<LabelsText text="ϵ" ml={labelsML}/>}/>)
          currentNodeName = newNodeName
          storeTokenStartName = currentNodeName
          // ANIM
          anims.push([`.${edgeName}`, commonAnims.reveal, {duration: 0.001, delay: 1}])
          anims.push([`.${newNodeName}`, commonAnims.reveal, {duration: 0.001, at: "<", delay: 1}])
          // Process the token * is applied to
          tokenInfo = processToken(token['token'])
          const endNodeCoords = [...currentCoords]
          const endNodeName = currentNodeName
          // Another epsilon branch (end)
          coordsStart = [...currentCoords]
          currentCoords[0] += edgeLen
          newNodeName = `node-${nodes.length}`
          nodes.push(<Node nodeName={newNodeName} value={isLast ? 'E' : ''} left={currentCoords[0]} top={currentCoords[1]}/>)
          edgeName = `line-${edges.length}`
          edges.push(<DirectedArrow start={currentNodeName} end={newNodeName} lineID={edgeName} coordsStart={coordsStart} coordsEnd={[...currentCoords]} nodeRadius={nodeRadius} labels={<LabelsText text="ϵ" ml={labelsML}/>}/>)
          // ANIM
          anims.push([`.${edgeName}`, commonAnims.reveal, {duration: 0.001, delay: 1}])
          anims.push([`.${newNodeName}`, commonAnims.reveal, {duration: 0.001, at: "<", delay: 1}])
          currentNodeName = newNodeName
          // Epsilon branch for the repeat feature of *
          boxTop = endNodeCoords[1] - edgeLen/2 - tokenInfo['relativeTop']
          boxes.push(<PlaceholderBox name={`box-${boxes.length}`} top={boxTop} left={endNodeCoords[0] - nodeRadius}/>)
          boxes.push(<PlaceholderBox name={`box-${boxes.length}`} top={boxTop} left={endNodeCoords[0] - tokenInfo['width'] + nodeRadius}/>)
          multiEdge = [`line-${edges.length}`, `line-${edges.length+1}`, `line-${edges.length+2}`]
          edges.push(<Arrow start={endNodeName} end={`box-${boxes.length - 2}`} lineID={`line-${edges.length}`}/>)
          edges.push(<Arrow start={`box-${boxes.length - 2}`} end={`box-${boxes.length - 1}`} lineID={`line-${edges.length}`} labels={<LabelsText text="ϵ"/>}/>)
          edges.push(<DirectedArrow start={`box-${boxes.length - 1}`} end={storeTokenStartName} lineID={`line-${edges.length}`} coordsStart={[endNodeCoords[0] - tokenInfo['width']+ nodeRadius, boxTop]} coordsEnd={[endNodeCoords[0] - tokenInfo['width'], boxTop + edgeLen/2]} nodeRadius={nodeRadius}/>)
          // ANIM
          anims.push([`.${multiEdge[0]}`, commonAnims.reveal, {duration: 0.001, delay: 1}])
          anims.push([`.${multiEdge[1]}`, commonAnims.reveal, {duration: 0.001, at: "<", delay: 1}])
          anims.push([`.${multiEdge[2]}`, commonAnims.reveal, {duration: 0.001, at: "<", delay: 1}])
          anims.push([`.${storeTokenStartName}`, commonAnims.show, {duration: 0.001, delay: 1, at: '<'}])
          // Last epsilon branch (from very beginning to end)
          boxBottom = currentCoords[1] + edgeLen/2 + tokenInfo['height'] - tokenInfo['relativeTop']
          boxes.push(<PlaceholderBox name={`box-${boxes.length}`} top={boxBottom} left={storeStartCoords[0] + nodeRadius}/>)
          boxes.push(<PlaceholderBox name={`box-${boxes.length}`} top={boxBottom} left={storeStartCoords[0] + tokenInfo['width'] + 2*edgeLen - nodeRadius}/>)
          multiEdge = [`line-${edges.length}`, `line-${edges.length+1}`, `line-${edges.length+2}`]
          edges.push(<Arrow start={storeStartNodeName} end={`box-${boxes.length - 2}`} lineID={`line-${edges.length}`}/>)
          edges.push(<Arrow start={`box-${boxes.length - 2}`} end={`box-${boxes.length - 1}`} lineID={`line-${edges.length}`} labels={<LabelsText text="ϵ"/>}/>)
          edges.push(<DirectedArrow start={`box-${boxes.length - 1}`} end={currentNodeName} lineID={`line-${edges.length}`} coordsStart={[currentCoords[0] - nodeRadius, boxBottom]} coordsEnd={[...currentCoords]} nodeRadius={nodeRadius}/>)
          // ANIM
          anims.push([`.${multiEdge[0]}`, commonAnims.reveal, {duration: 0.001, delay: 1}])
          anims.push([`.${multiEdge[1]}`, commonAnims.reveal, {duration: 0.001, at: "<", delay: 1}])
          anims.push([`.${multiEdge[2]}`, commonAnims.reveal, {duration: 0.001, at: "<", delay: 1}])
          anims.push([`.${currentNodeName}`, commonAnims.show, {duration: 0.001, delay: 1, at: '<'}])
          // Setting return vals
          height = boxBottom - boxTop
          width = 2*edgeLen + tokenInfo['width']
          relativeTop = currentCoords[1] - boxTop
          finalNodeInfo = {
            name: currentNodeName,
            coords: [...currentCoords]
          }
          break
        case '+':
          // Token type is either char or ()
          tokenInfo = processToken(token['token'])
          width = tokenInfo['width']
          tokenInfo = processToken({
            type: '*',
            token: token['token']
          }, isLast)
          height = tokenInfo['height']
          width += tokenInfo['width']
          relativeTop = tokenInfo['relativeTop']
          finalNodeInfo = {
            name: currentNodeName,
            coords: [...currentCoords]
          }
          break
        case '()':
          const parentTokens = token['tokens']
          yLevel = currentCoords[1]
          let maxTop = yLevel, maxBottom = yLevel
          tokensWidth = 0
          for (let i = 0; i < parentTokens.length; i++) {
            const tokenInfo = processToken(parentTokens[i], isLast && i === parentTokens.length - 1)
            tokensWidth += tokenInfo['width']
            const tokenMaxTop = yLevel - tokenInfo['relativeTop']
            if (tokenMaxTop < maxTop) maxTop = tokenMaxTop
            const tokenMaxBottom = yLevel + tokenInfo['height'] - tokenInfo['relativeTop']
            if (tokenMaxBottom > maxBottom) maxBottom = tokenMaxBottom
          }
          height = maxBottom - maxTop
          width = tokensWidth
          relativeTop = yLevel - maxTop
          finalNodeInfo = {
            name: currentNodeName,
            coords: [...currentCoords]
          }
          break
        case 'char':
          coordsStart = [...currentCoords]
          currentCoords[0] += edgeLen
          newNodeName = `node-${nodes.length}`
          nodes.push(<Node nodeName={newNodeName} value={isLast ? 'E' : ''} left={currentCoords[0]} top={currentCoords[1]}/>)
          edgeName = `line-${edges.length}`
          edges.push(<DirectedArrow start={currentNodeName} end={newNodeName} lineID={edgeName} coordsStart={coordsStart} coordsEnd={[...currentCoords]} nodeRadius={nodeRadius} labels={<LabelsText text={token['value']} ml={labelsML}/>}/>)
          anims.push([`.${edgeName}`, commonAnims.reveal, {duration: 0.001, delay: 1}])
          anims.push([`.${newNodeName}`, commonAnims.reveal, {duration: 0.001, at: "<", delay: 1}])
          currentNodeName = newNodeName
          height = 0
          width = edgeLen
          relativeTop = 0
          finalNodeInfo = {
            name: currentNodeName,
            coords: [...currentCoords]
          }
          break
        default:
          throw new Error("processToken: Invalid type = " + type)
      }
      return { height, width, relativeTop, finalNodeInfo }
    }
    function fullConstruction() {
      step.current = -1
      animate(anims)
    }
    function getAllAnims() {
      return anims.map((anim) => [anim[0], commonAnims.show, {at: "<"}])
    }
    function getClearAnims() {
      return anims.map((anim) => [anim[0], commonAnims.hide, {at: "<"}])
    }
    const allAnims = getAllAnims()
    const clearAnims = getClearAnims()
    function stepConstruction() {
      function animateFrom(s) {
        stepAnims = []
        let i
        for (i = s; i < anims.length; i++) {
          stepAnims.push([anims[i][0], commonAnims.show])
          if (anims[i][0].startsWith('.node')) break
        }
        i++
        while (i < anims.length && anims[i][0].startsWith('.node')) {
          stepAnims.push([anims[i][0], commonAnims.show])
          i++
        }
        step.current = i
        animate(stepAnims)
      }
      let stepAnims
      if (step.current >= anims.length) step.current = -1
      if (step.current === -1) {
        animate(clearAnims)
        animateFrom(0)
      } else {
        animateFrom(step.current)
      }
    }
    function stepBack() {
      if (step.current === 0) return
      if (step.current === -1) step.current = anims.length
      let stepAnims = []
      let i = step.current - 1
      while (i >= 0 && anims[i][0].startsWith('.node')) {
        console.log(anims[i])
        stepAnims.push([anims[i][0], commonAnims.hide, {at: '<'}])
        i--
      }
      while (i >= 0 && anims[i][0].startsWith('.line')) {
        console.log(anims[i])
        stepAnims.push([anims[i][0], commonAnims.hide, {at: '<'}])
        i--
      }
      animate(stepAnims)
      step.current = i + 1
    }
    function skipToEnd() {
      animate(allAnims)
      step.current = -1
    }
    return (
      <Stack direction="column" rowGap={4}>
        <Box
          ref={scope}
          position="relative"
          sx={{
            height: wholeDiagramDims['height'], width: wholeDiagramDims['width'],
          }}
          >
          {nodes}
          {edges}
          {boxes}
        </Box>
        <AnimControlBoard label="Construction Control Board" play={fullConstruction} next={stepConstruction} back={stepBack} skipToEnd={skipToEnd}
          tooltips={{
            play: 'Show ordered construction',
            next: 'Show next step',
            back: 'Go back one step'
          }}
        />
      </Stack>
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
        <PageTextList
          listName="To begin, enter a valid regular expression composed of:"
          list={[
            "Character classes (a-z, A-Z, and 0-9): Accepted characters are alphanumeric characters.",
            "Quantifiers (*, +): Characters that indicate how many occurrences of a character, or set of characters using paretheses, are allowed in the matched expression. Here, (token)* indicates 0 or more tokens are allowed, whereas (token)+ indicates 1 or more occurrences is possible. (token)+ can also be interpreted as token(token)*.",
            "Alternation (|): Alternation allows the specification of multiple possible search patterns, we will use | to do this. A simple example is a|b, which means the expression can either be a, OR, b. A more complicated example may be S(a|b*c|(d+b))E, this means, our expression must start with S, then choose one of either a, b*c or (d+b), then it must end with E."
          ]}
        />
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