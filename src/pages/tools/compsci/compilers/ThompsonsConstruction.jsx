import React from 'react'
import { ExternalLink, PageParagraph, SectionBox, TBButton } from '../../../../components/UI/DefaultLayout'
import { Box } from '@mui/material'
import { MEPTextField } from '../../../../components/GeneralComponents'
import { isLetterOrDigit, removeSpaces } from '../../../../helpers/generalHelpers'
import { NormalNode } from '../../../../components/Compsci/DataStructures'

function ThompsonsConstruction() {
  const [regex, setRegex] = React.useState('')
  const [algoOutputs, setAlgoOutputs] = React.useState(null)
  function handleChange(value) {
    setRegex(value)
  }
  function runThompsons() {
    setAlgoOutputs(parse(regex))
  }
  const Node = ({nodeName, value, top, left}) => (
    <NormalNode nodeRadius={12} nodeName={nodeName} value={value} top={top} left={left}/> 
  )
  const ConstructionGraph = () => {
    const tokens = algoOutputs['tokens']
    console.log(tokens)
    // const intervalLen = 100
    const nodes = []
    const edges = []
    nodes.push(<Node nodeName="start" value="S" top={150}/>)
    for (let i = 0; i < tokens.length; i++) {
      processToken(tokens[i])
    }
    function processToken(token) {
      const type = token['type']
      console.log(type)
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
          processToken(token['token'])
          break
        case '+':
          break
        case '()':
          const parentTokens = token['tokens']
          for (let i = 0; i < parentTokens.length; i++) {
            processToken(parentTokens[i])
          }
          break
        case 'char':
          break
        default:
          throw new Error("processToken: Invalid type = " + type)
      }
    }
    return (
      <Box
        position="relative"
        sx={{
          height: 300,
          width: 500,
          border: 1
        }}
      >
        {nodes}
        {edges}
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
            const compoundToken = {
              type: '()',
              tokens: tokens.slice(t + 1)
            }
            tokens.splice(t)
            tokens.push(compoundToken)
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
  // Post-processing
  // Check whether all opened parentheses are matched
  if (openParentCount !== 0) return {
    success: false,
    errorMsg: "Not all parentheses have been closed!"
  }
  // Aggregating |
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