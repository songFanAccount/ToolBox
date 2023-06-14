import React, { useState } from 'react'
import { PageParagraph, SectionBox } from '../../../../components/UI/DefaultLayout'
import { Box } from '@mui/material'
import { MEPTextField } from '../../../../components/GeneralComponents'

export default function SeriesAndSequences() {
    const [expr, setExpr] = useState('')
    function handleChange(value) {
        setExpr(value)
    }
    return (
        <Box>
            <SectionBox noBorder={true}>
                <PageParagraph text={
                    `Description`
                }/>
            </SectionBox>
            <SectionBox noBorder>
                <PageParagraph text="Please provide all the information you know about the series/sequence:"/>
                <MEPTextField onChange={handleChange} expr={expr}/>
                <SectionBox title="Step 1:" mb={0}>
                    <PageParagraph text={`Step 1`}/>
                </SectionBox>
                <SectionBox title="Step 2:" mb={0}>
                    <PageParagraph text={`Step 2`}/>
                </SectionBox>
                <SectionBox title="Step 3:" mb={0}>
                    <PageParagraph text={`Step 3`}/>
                </SectionBox>
                <SectionBox title="Step 4:" mb={0}>
                    <PageParagraph text={`Step 4`}/>
                </SectionBox>
            </SectionBox>
        </Box>
    )
}
