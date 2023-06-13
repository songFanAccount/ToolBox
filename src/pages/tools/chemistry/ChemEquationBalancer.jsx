import React, { useState } from 'react'
import { CEPTextField } from '../../../components/GeneralComponents'
import { LatexBox, PageParagraph, SectionBox } from '../../../components/UI/DefaultLayout'
import { Box, Stack } from '@mui/material'
import { useRef } from 'react'
import { getChemEqnInfo, modifyEqnInfo } from '../../../helpers/chemHelpers'
import { DisplayError } from '../../../components/Compsci/DataStructures'
import { useEffect } from 'react'

export default function ChemEquationBalancer() {
    const [expr, setExpr] = useState('')
    const initialLatex = useRef(<DisplayError errorMsg="Empty input!"/>)
    const curLatex = useRef(<DisplayError errorMsg="Empty input!"/>) // TOREMOVE
    const [exprNoSpace, setExprNoSpace] = useState('')
    const chemObj = useRef(null)
    useEffect(() => {
        if(expr !== '') window.MathJax.typeset()
    }, [expr])
    const EquationDisplay = ({obj}) => {
        if(obj?.success) {
            let latex = obj.latex
            return <LatexBox fs={16} pb={1.5} latex={`$\\ce{${latex}}$`}/>
        } else {
            const errorMsg = obj ? obj.errorMsg : "Empty input!"
            return <DisplayError errorMsg={errorMsg}/>
        }
    }
    function handleChange(value) {
        setExpr(value)
        const valueNoSpace = value.replaceAll(' ', '')
        if(valueNoSpace !== exprNoSpace) {
            setExprNoSpace(valueNoSpace)
            let obj = getChemEqnInfo(valueNoSpace)
            initialLatex.current = <EquationDisplay obj={obj}/>
            if(obj?.success) obj = modifyEqnInfo(obj, true)
            curLatex.current = <EquationDisplay obj={obj}/> // TODO
            chemObj.current = obj
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
            <Box
                sx={{
                    px:1.5,
                    py:1,
                    border: 1,
                    borderRadius: 5,
                    minWidth: 'fit-content',
                    overflowX: 'auto'
                }}
            >
                <PageParagraph text={name} bold/>
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
    function AllElementCounts() {
        return (
            <Stack 
                direction="row"
                columnGap={3}
                rowGap={3}
                flexWrap="wrap"
            >
                <Reactants/>
                <Products/>
            </Stack>
        )
    }

    function BalancingSteps({obj}) {
        if(!obj) return <></>
        if(!obj.success) return <DisplayError errorMsg="Invalid equation!"/>
        /* In order to balance, the equation must have a reactants and products side */
        // eslint-disable-next-line
        let { reactants, products, arrow, latex } = JSON.parse(JSON.stringify(obj))
        if(!reactants.length || !products.length) return <DisplayError errorMsg="Cannot balance without both reactants and products!"/>
        /* Initialise total element counts for reactants and products side */
        let reactantsCount = {}, productsCount = {}
        function initElementCount(countObj, array) {
            array.forEach((value) => {
                Object.entries(value.elementCount).forEach((record) => {
                    countObj[record[0]] ? countObj[record[0]] += record[1] : countObj[record[0]] = record[1]
                })
            })
        }
        initElementCount(reactantsCount, reactants)
        initElementCount(productsCount, products)
        /* Initial check to see if there exists an element on one side, it must exist on the other side as well. If not, eqn is unbalanceable */
        let errorMsg = null
        Object.keys(reactantsCount).some((key) => {
            if(!productsCount[key]) {errorMsg=`Cannot balance equation: ${key} in reactants but not in products!`; return true}
            return false
        })
        Object.keys(productsCount).some((key) => {
            if(!reactantsCount[key]) {errorMsg=`Cannot balance equation: ${key} in products but not in reactants!`; return true}
            return false
        })
        if(errorMsg) return <DisplayError errorMsg={errorMsg}/>
        /* Initial check to see if the total element counts are equal -> Equation is already balanced */
        
        return (
            <PageParagraph text=""/>
        )
    }
    return (
        <Box>
            <SectionBox noBorder={true}>
                <PageParagraph text={
                    `The Chemistry Equation Balancer takes in a chemical equation and equips all reactants and products with coefficients that are optimised to give
                    a balanced equation with the smallest possible combination of integer coefficients.`
                }/>
            </SectionBox>
            <SectionBox title="How it works">
                <PageParagraph text="Enter an expression to begin:"/>
                <CEPTextField onChange={handleChange} expr={expr}/>
                {initialLatex.current}
                <SectionBox title="Step 1:" mb={0}>
                    <PageParagraph text={`Removing the existing coefficients if any, and listing out the number of elements for both the reactants and the products.`}/>
                    {curLatex.current}
                    <AllElementCounts/>
                    <BalancingSteps obj={chemObj.current}/>
                </SectionBox>
            </SectionBox>
            <PageParagraph text="Development paused, please refer to the developers' notes at the top of the page for more information."/>
        </Box>
    )
}