import { Box } from '@mui/material'
import React from 'react'
import { CategoryLink, ExternalLink, PageParagraph, PageTextList, SectionBox } from '../../../../../components/UI/DefaultLayout'
import Latex from 'react-latex-next'

export default function SPDA() {
  return (
		<Box>
			<SectionBox noBorder>
				<Box>
					<PageParagraph text="This tool is an implementation of the "/>
					<ExternalLink href="https://en.wikipedia.org/wiki/Gale%E2%80%93Shapley_algorithm">Student Proposing Deferred Acceptance algorithm</ExternalLink>
					<PageParagraph text=" by Gale and Shapley. This algorithm is used in a School Choice context and has some differences from the allocation setting mentioned "/>
					<CategoryLink name="Resource Allocation" linkText="here." toSection="#top"/>
				</Box>
				<PageTextList
					mt={1}
					py={0.5}
					listName="Allocation setting:"
					list={[
						<Box>
							<PageParagraph text="Set of students (agents) "/>
							<Latex>$N = \lbrace 1, ..., n \rbrace$</Latex>
						</Box>,
						<Box>
							<PageParagraph text="Set of schools "/>
							<Latex>$C = \lbrace c_1, ..., c_k \rbrace$</Latex>
						</Box>,
						<Box>
							<PageParagraph text="Each school "/>
							<Latex>$c\in C$</Latex>
							<PageParagraph text=" has a quota of "/>
							<Latex>$q(c)$</Latex>
							<PageParagraph text=" school seats (items) that represents the maximum number of students that the school can accept."/>
						</Box>,
						<Box>
							<PageParagraph text="Preferences of students "/>
							<Latex>$\succ = \lbrace \succ_1, ..., \succ_n \rbrace$</Latex>
							<PageParagraph text="; These are strict preferences, meaning no student considers any two schools as equal."/>
						</Box>,
						<Box>
							<PageParagraph text="Each school "/>
							<Latex>$c$</Latex>
							<PageParagraph text=" also has a strict preference "/>
							<Latex>$\succ_c$</Latex>
							<PageParagraph text=" order over the students."/>
						</Box>,
					]}
				/>
				<PageTextList 
					listName="Student Proposing DA produces an allocation that satisfies the following properties:"
					list={[
						<Box>
							<PageParagraph text="The allocation satisfies "/>
							<PageParagraph bold text="justified envy-freeness"/>
							<PageParagraph text=" (Roth and Sotomayor [1990]): An agent "/>
							<Latex>$i$</Latex>
							<PageParagraph text=" has justified envy towards an agent "/>
							<Latex>$j$</Latex>
							<PageParagraph text=" if "/>
							<Latex>$i$</Latex>
							<PageParagraph text=" is envious of "/>
							<Latex>$j$</Latex>
							<PageParagraph text="'s allocated school "/>
							<Latex>$c$</Latex>
							<PageParagraph text=", AND, the school "/>
							<Latex>$c$</Latex>
							<PageParagraph text=" also prefers agent "/>
							<Latex>$j$</Latex>
							<PageParagraph text=" more than agent "/>
							<Latex>$i.$</Latex>
						</Box>,
						<CategoryLink name="Resource Allocation" linkText="Strategyproof" toSection="#Strategyproofness"/>
					]}
				/>
			</SectionBox>
    </Box>
  )
}
