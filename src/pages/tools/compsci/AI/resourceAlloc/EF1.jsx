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
        />
      </SectionBox>
    </Box>
  )
}
