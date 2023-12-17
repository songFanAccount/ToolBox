import React from 'react'
import { CategoryLink, PageParagraph, SectionBox } from '../../../../../components/UI/DefaultLayout'
import { Box } from '@mui/material'
import Latex from 'react-latex-next'
import RASimulator from './RASimulator'

export default function EF1() {
  return (
    <Box>
      <SectionBox noBorder>
        <Box>
          <PageParagraph text="This tool takes in an allocation setting instance "/>
          <Latex>$I = (N, O, u)$</Latex>
          <PageParagraph text=" and outputs an "/>
          <CategoryLink name="Resource Allocation" linkText="EF1"/>
          {/* TODO: Should link to EF1 section */}
          <PageParagraph text=" allocation, "/>
          <Latex>$X.$</Latex>
        </Box>
        <RASimulator
          fixedMode={-1}
          algorithm='EF1'
          showPropertyValues={false}
          utilities={[
            [7,3,2,6,8,5,3,2],
            [9,6,5,3,2,6,8,6],
            [5,1,2,4,6,8,3,1],
            [7,3,5,2,6,8,9,4],
            [3,6,1,5,9,6,7,4],
            [5,7,2,8,5,4,3,9],
          ]}
        />
      </SectionBox>
    </Box>
  )
}
