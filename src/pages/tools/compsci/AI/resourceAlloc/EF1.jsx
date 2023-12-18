import React from 'react'
import { CategoryLink, ExternalLink, PageParagraph, PageTextList, SectionBox } from '../../../../../components/UI/DefaultLayout'
import { Box } from '@mui/material'
import Latex from 'react-latex-next'
import RASimulator from './RASimulator'

export default function EF1() {
  return (
    <Box>
      <SectionBox noBorder>
        <Box>
          <PageParagraph text="This tool is an implementation of "/> 
          <ExternalLink href="https://www.researchgate.net/publication/221444777_On_approximately_fair_allocations_of_indivisible_goods">
          Lipton et al.'s algorithm
          </ExternalLink>
          <PageParagraph text=" that produces an "/>
          <CategoryLink name="Resource Allocation" linkText="EF1"/>
          <PageParagraph text=" allocation, "/>
          <Latex>$X$</Latex>
          <PageParagraph text=", under any preference settings."/>
          {/* TODO: Should link to EF1 section */}
        </Box>
      </SectionBox>
      <SectionBox title="How it works">
        <PageParagraph text="Edit the preference table below according to your question (or use our default allocation setting) and click the RUN button. This tool will then perform the algorithm and output an allocation in the form of circles on the table, that satisfies EF1. The steps of the algorithm are visualised below, showing you the transformations in the envy graph, and the reallocations of items."/>
        <PageTextList
          listName="The algorithm works as follows:"
          list={[
            "Initialise all agents' allocations as empty i.e. no items are assigned yet.",
            <PageTextList
              listName="Then, for each item:"
              listStyleType='decimal'
              list={[
                <Box>
                  <PageParagraph text="Allocate it to any agent, "/>
                  <Latex>$i$</Latex>
                  <PageParagraph text=", who no one is envious of. Visually, this is any node in the envy graph that has no incoming edges."/>
                </Box>,
                <Box>
                  <PageParagraph text="This new item assignment may cause rise in new envy towards agent "/>
                  <Latex>$i$</Latex>
                  <PageParagraph text=", or it could cause agent "/>
                  <Latex>$i$</Latex>
                  <PageParagraph text=" to no longer be envious of some agents. Update the envy graph accordingly. Visually, the direction of any edge on the envy graph indicates the direction of envy, for example, an edge pointing from "/>
                  <Latex>$a$</Latex>
                  <PageParagraph text=" to "/>
                  <Latex>$b$</Latex>
                  <PageParagraph text=" would indicate that agent "/>
                  <Latex>$a$</Latex>
                  <PageParagraph text=" is envious of agent "/>
                  <Latex>$b.$</Latex>
                </Box>,
                <Box>
                  <PageParagraph text="Then analyse the envy graph to look for any cycles, if there exists any such cycle e.g. "/>
                  <Latex>{`$a\\rightarrow b \\rightarrow \\ c \\rightarrow a$`}</Latex>
                  <PageParagraph text=", remove this cycle by exchanging those agents' bundles along the cycle. This means that each agent gets the bundle of whoever they are envious of in the cycle. Using the example cycle, this means that "/>
                  <Latex>$a$</Latex>
                  <PageParagraph text=" gets "/>
                  <Latex>$b$</Latex>
                  <PageParagraph text="'s bundle, "/>
                  <Latex>$b$</Latex>
                  <PageParagraph text=" gets "/>
                  <Latex>$c$</Latex>
                  <PageParagraph text="'s bundle, and "/>
                  <Latex>$c$</Latex>
                  <PageParagraph text=" gets "/>
                  <Latex>$a$</Latex>
                  <PageParagraph text="'s bundle. Visually, detected cycles will be highlighted in "/>
                  <PageParagraph color="red" text="red"/>
                  <PageParagraph text="."/>
                </Box>,
                <PageParagraph text="Repeat step 3 until there are no more cycles in the envy graph."/>
              ]}
            />,
            <PageParagraph text="Once all items are allocated and all cycles are removed, the resulting allocation will satisfy EF1."/>
          ]}
        />
        <RASimulator
          fixedMode={-1}
          algorithm='EF1'
          showPropertyValues={false}
          utilities={[
            [7,6,5,8,3,6,4,6],
            [4,3,2,1,5,7,5,4],
            [8,5,2,1,8,9,7,5],
            [2,6,4,2,9,7,6,5],
            [7,6,7,5,3,6,6,9],
            [7,6,5,6,8,7,6,8],
          ]}
        />
      </SectionBox>
    </Box>
  )
}
