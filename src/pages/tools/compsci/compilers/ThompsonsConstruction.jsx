import React from 'react'
import { ExternalLink, PageParagraph, SectionBox } from '../../../../components/UI/DefaultLayout'
import { Box } from '@mui/material'
import { MEPTextField } from '../../../../components/GeneralComponents'

function ThompsonsConstruction() {
  const [regex, setRegex] = React.useState('')
  function handleChange(value) {
    setRegex(value)
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
      </SectionBox>
    </Box>
  )
}

export default ThompsonsConstruction