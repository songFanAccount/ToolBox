import React, { useState } from 'react'
import { CEPTextField } from '../../../components/GeneralComponents'
import { PageParagraph, SectionBox } from '../../../components/UI/DefaultLayout'
import { Box, Stack, Typography } from '@mui/material'
import { useRef } from 'react'
import { getChemEqnInfo } from '../../../helpers/chemHelpers'
import { DisplayError } from '../../../components/Compsci/DataStructures'
import { useEffect } from 'react'

export default function ChemEquationBalancer() {
    const [expr, setExpr] = useState('')
    const chemObj = useRef(null)
    useEffect(() => {
        if(expr !== '') window.MathJax.typeset()
    }, [expr])
    const EquationDisplay = () => {
        if(chemObj.current?.success) {
            return <Typography sx={{overflowX: 'scroll', height: 40}}>{`$\\ce{${chemObj.current.latex}}$`}</Typography>
        } else {
            const errorMsg = chemObj.current ? chemObj.current.errorMsg : "Empty input!"
            return <DisplayError errorMsg={errorMsg}/>
        }
    }
    function handleChange(value) {
        setExpr(value)
        chemObj.current = getChemEqnInfo(value)
    }
    function DisplayElementCount({elementCount}) {
        return (
            <Stack
                direction="column"
            >
                {Object.entries(elementCount).map((value) => (
                    <PageParagraph text={`${value[0]}: ${value[1]}`}/>
                ))}
            </Stack>
        )
    }
    function Reactants() {
        if(chemObj.current?.success) {
            return (
                <Box>
                    <PageParagraph text="Reactants:"/>
                    <Stack
                        direction="row"
                        columnGap={3}
                    >
                        {chemObj.current.reactants.map((reactant) => <DisplayElementCount elementCount={reactant.elementCount}/>)}
                    </Stack>
                </Box>
            )
        } else {
            return (
                <DisplayError errorMsg="Invalid reactants!"/>
            )
        }
    }
    function Products() {
        if(chemObj.current?.success) {
            return (
                <Box>
                    <PageParagraph text="Products:"/>
                    <Stack
                        direction="row"
                        columnGap={3}
                    >
                        {chemObj.current.products.map((product) => <DisplayElementCount elementCount={product.elementCount}/>)}
                    </Stack>
                </Box>
            )
        } else {
            return (
                <DisplayError errorMsg="Invalid products!"/>
            )
        }
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
                <EquationDisplay/>
                <Stack 
                    direction="row"
                    columnGap={3}
                >
                    <Reactants/>
                    <Products/>
                </Stack>
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