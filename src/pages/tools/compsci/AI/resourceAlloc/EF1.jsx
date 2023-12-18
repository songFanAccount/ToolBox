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
