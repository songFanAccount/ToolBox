import React, { useState } from 'react'
import { CEPTextField } from '../../../components/GeneralComponents'
import { PageParagraph, SectionBox } from '../../../components/UI/DefaultLayout'
import { Box } from '@mui/material'

export default function ChemExpressionParser() {
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
            <SectionBox title="How it works">
                <PageParagraph text="Enter an expression to begin:"/>
                <CEPTextField onChange={handleChange} expr={expr}/>
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