import React from 'react'
import { CollapseSectionBox, ExternalLink, PageParagraph, SectionBox } from '../../../../components/UI/DefaultLayout'
import { Box } from '@mui/material'
import Latex from 'react-latex-next'

function Compilers() {
  return (
  	<SectionBox title="Compilers" usePageTitle>
			<Box>
				<PageParagraph text="Compilers are responsible for translating source code, what you have written, into "/>
				<ExternalLink href="https://en.wikipedia.org/wiki/Machine_code">machine code</ExternalLink>
				<PageParagraph text=", which the computer uses to operate accordingly."/>
			</Box>
			<PageParagraph text="Typically, compilers follow the structure: "/>
			<Box>
				<PageParagraph text="Scanner "/>
				<Latex>$\rightarrow$</Latex>
				<PageParagraph text=" Parser "/>
				<Latex>$\rightarrow$</Latex>
				<PageParagraph text=" Semantic Analyser "/>
				<Latex>$\rightarrow$</Latex>
				<PageParagraph text=" *IR Generation "/>
				<Latex>$\rightarrow$</Latex>
				<PageParagraph text=" Code Optimisation "/>
				<Latex>$\rightarrow$</Latex>
				<PageParagraph text=" Code Generation "/>
			</Box>
			<PageParagraph text="*IR: Intermediate Representation" fs={12}/>
			<CollapseSectionBox title="Scanner">
				<PageParagraph text="The scanner is responsible for the lexical analysis of the source code. From the beginning to the end of the source code, the scanner reads character by character, and matches groups of characters to corresponding tokens"/>
			</CollapseSectionBox>
		</SectionBox>
  )
}

export default Compilers