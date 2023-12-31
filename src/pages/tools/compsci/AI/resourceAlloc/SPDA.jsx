import { Box } from '@mui/material'
import React from 'react'
import { ExternalLink, PageParagraph, SectionBox } from '../../../../../components/UI/DefaultLayout'

export default function SPDA() {
  return (
		<Box>
			<SectionBox noBorder>
				<Box>
					<PageParagraph text="This tool is an implementation of the "/>
					<ExternalLink href="https://en.wikipedia.org/wiki/Gale%E2%80%93Shapley_algorithm">Student Proposing Deferred Acceptance algorithm</ExternalLink>
					<PageParagraph text=" by Gale and Shapley."/>
				</Box>
			</SectionBox>
    </Box>
  )
}
