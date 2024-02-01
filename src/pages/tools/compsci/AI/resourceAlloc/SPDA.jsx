import { Box } from '@mui/material'
import React from 'react'
import { CategoryLink, ExternalLink, PageParagraph, PageTextList, SectionBox } from '../../../../../components/UI/DefaultLayout'
import Latex from 'react-latex-next'
import SCSimulator from './SCSimulator'

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
					mt={2}
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
						<Box>
							<CategoryLink name="Resource Allocation" linkText="Strategyproof:" toSection="#Strategyproofness"/>
							<PageParagraph text=" Additionally, the resulting allocation Pareto-dominates ALL other allocations that satisfy justified envy-freeness. However, since Student Proposing DA also takes into account the schools' preferences, this does not mean the allocation is necessarily Pareto-optimal with regards to only students' preferences."/>
						</Box>
					]}
				/>
			</SectionBox>
			<SectionBox title="How it works">
				<PageParagraph text="Edit the students' and schools' preference tables by first adding the appropriate number of students and schools (both 1 to 10 inclusively), then dragging the entries to match the correct preference orders, where most-to-least preferred school/students are listed left-to-right. Then set the schools' quotas (1 to 10 inclusively) using the + and - buttons. Once these are all set appropriately according to your question's setting, click the RUN SPDA button to run the algorithm. The algorithm steps will be shown, where you can see the schools application lists at each step of the algorithm."/>
				<PageTextList
					listStyleType='decimal'
					listName="The algorithm works as follows:"
					list={[
						"All students apply to their most preferred school.",
						"If any schools' applicant count exceeds their quota, keep the 'quota' number of students based on the schools' preferences, and reject the rest.",
						"All rejected students apply to their next most preferred school.",
						"Repeat steps 2 and 3 until no schools exceed their quota, and all students are either assigned to a school or have been rejected by all schools."
					]}
				/>
				<SCSimulator algorithm="SPDA"/>
			</SectionBox>
    </Box>
  )
}
