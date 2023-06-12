import React, { useState } from 'react'
import { CEPTextField } from '../../../components/GeneralComponents'
import { PageParagraph, SectionBox } from '../../../components/UI/DefaultLayout'
import { Box, Stack, Typography } from '@mui/material'
import { useRef } from 'react'
import { getChemEqnInfo, modifyEqnInfo } from '../../../helpers/chemHelpers'
import { DisplayError } from '../../../components/Compsci/DataStructures'
import { useEffect } from 'react'

export default function ChemEquationBalancer() {
    const [expr, setExpr] = useState('')
    const [exprNoSpace, setExprNoSpace] = useState('')
    const chemObj = useRef(null)
    useEffect(() => {
        if(expr !== '') window.MathJax.typeset()
    }, [expr])
    const EquationDisplay = ({withoutCoefficients=false}) => {
        if(chemObj.current?.success) {
            let latex = chemObj.current.latex
            if(withoutCoefficients) {
                latex = modifyEqnInfo(chemObj.current, true)
            }
            return <Typography sx={{overflowX: 'auto', height: 40}}>{`$\\ce{${latex}}$`}</Typography>
        } else {
            const errorMsg = chemObj.current ? chemObj.current.errorMsg : "Empty input!"
            return <DisplayError errorMsg={errorMsg}/>
        }
    }
    function handleChange(value) {
        setExpr(value)
        const valueNoSpace = value.replaceAll(' ', '')
        if(valueNoSpace !== exprNoSpace) {
            setExprNoSpace(valueNoSpace)
            chemObj.current = getChemEqnInfo(valueNoSpace)
            console.log(chemObj.current)
        }
    }
    function ElementCount({elementCount}) {
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
    function DisplayElementCounts({name, children}) {
        return (
            <Box>
                <PageParagraph text={name}/>
                <Stack
                    direction="row"
                    columnGap={3}
                >
                    {children}
                </Stack>
            </Box>
        )
    }
    function Reactants() {
        if(chemObj.current?.success) {
            return (
                <DisplayElementCounts name="Reactants:">
                    {chemObj.current.reactants.map((reactant) => <ElementCount elementCount={reactant.elementCount}/>)}
                </DisplayElementCounts>
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
                <DisplayElementCounts name="Products:">
                    {chemObj.current.products.map((product) => <ElementCount elementCount={product.elementCount}/>)}
                </DisplayElementCounts>
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
                <EquationDisplay nocoefficients/>
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