import React from 'react';
import { Box, TextField, Typography } from "@mui/material";
import { ExternalLink, PageParagraph, PageSectionTitle, PageTextList, SectionBox, ToolLink } from "../../../../components/UI/DefaultLayout";
import { exprToLatex } from '../../../../components/Maths/LatexDisplay';
import { ElementArray, TextArray } from '../../../../components/Compsci/DataStructures';

export default function MathsExpressionParser() {
    const [expr, setExpr] = React.useState('')
    const [latex, setLatex] = React.useState('')
    const [tokens, setTokens] = React.useState(null)
    const ArrayElement = ({token}) => {
        let newToken = token.negate ? '-' : ''
        newToken += token.token
        return (
            <Typography
                sx={{
                    color: token.autoAdded || token.negate ? 'red' : 'inherit'
                }}
            >
                {newToken}
            </Typography>
        )
    }
    function handleChange(event) {
        const newExpr = event.target.value
        setExpr(newExpr)
        const latexObj = exprToLatex(newExpr)
        if(latexObj.success) {
            setLatex(latexObj.latex)
            setTokens(<ElementArray maxLength={40} array={latexObj.tokens.map((e) => <ArrayElement token={e}/>)}/>)
        } else {
            setLatex(null)
            setTokens(null)
        }
    }
    return (
        <Box>
            <SectionBox noBorder={true}>
                <Box>
                    <PageParagraph text={`This tool showcases the implementation of our maths expression parser, it is used in the development of many other maths tools like the `}/>
                    <ToolLink name="latex converter" linkText="LaTeX converter"/>
                    <PageParagraph text={`. The source `}/>
                    <ExternalLink href="https://github.com/songFanAccount/ToolBox/blob/main/src/components/Maths/LatexDisplay.jsx">code</ExternalLink>
                    <PageParagraph text={` is available (functional but currently not well documented) on GitHub for anyone to use freely.`}/>
                </Box>
            </SectionBox>
            <SectionBox title="How it works" collapsible={true} startClosed={true}>
                <PageParagraph text="Enter an expression to begin:"/>
                <TextField
                    placeholder="e.g. ax^2 + bx + c"
                    sx={{maxWidth: 500,}}
                    onChange={(e) => handleChange(e)}
                />
                <PageParagraph text={`The parser first processes the input string, character by character, left to right, and produces an array of tokens.
                                      The parser needs to follow the set of rules listed below, some of which account for typical conventions such as negation.`}/>
                <PageTextList 
                    listName="If the current token is a number, and the next character is a:"
                    list={[
                        "Number: Simply merge them e.g. '5' sees '6' -> '56', with the exception of '.', which handles decimal mode.",
                        "Variable: Need to add a '*' so that 5x can be correctly interpreted as 5*x.",
                        "Operator: Should be completely fine. With a special case of '5(' needing a '*' to be '5*('."
                    ]}
                />
                <PageTextList 
                    listName="If the current token is a variable, and the next character is a:"
                    list={[
                        "Number: Not allowed, as 'x4' does not follow convention.",
                        "Variable: Need to add a '*' so that xy can be correctly interpreted as x*y.",
                        `Operator: Should be completely fine. There is a special case if the operator is '(', my implementation uses
                        this as an indication to check for functions. For example, sin is interpreted as s*i*n, but sin( would initiate a check to see if the variables form a
                        supported function, in which case it merges the variables into a 'sin' function token.`
                    ]}
                />
                <PageTextList 
                    listName="If the current token is an operator, and the next character is a:"
                    list={[
                        "Number/variable: Should be completely fine. With a special case of ')5' needing a '*' to be ')*5'.",
                        <PageTextList 
                            listName={
                                `Operator: Should not be allowed most of the time, like '+*' or '*/'. 
                                There are two exceptions to this, '(' and '-':`}
                            noPaddingsY={true} 
                            list={[
                            "In the case of '(', all operators can be placed before it.",
                            <SectionBox noBorder={true}>
                                <PageParagraph block={true} text={
                                    `In the case of seeing a '-', the parser must recognise '-' to be no longer the binary subtraction sign, but instead an unary negation sign.
                                    This was one of the biggest development challenges of this tool, since our implementation of the Shunting yard algorithm cannot support unary operators.`}/>
                                <PageParagraph block={true} text={
                                    `My solution was to interpret '-' as '(-1) *', but this was still insufficient. Take for example '-5 ^ -4', both '-' signs here
                                    are negation signs so it would be interpreted as '(-1) * 5 ^ (-1) * 4', since ^ takes precedence over *, we end up with 5 to the power of -1 instead of -4.`}/>
                                <PageParagraph block={true} text={
                                    `This was resolved by the introduction of the special '@' operator, which is designed to be equivalent to '*', except with a higher value of precedence.
                                    If we replace every negation-induced * with @, we would end up with '(-1) @ 5 ^ (-1) @ 4', and since @ > ^ in precedence, we now should get 5^(-4) as intended.
                                    However, if you have caught on, you would have seen that the first negation sign is now incorrectly interpreted, and (!!!) we will instead get (-5)^(-4), NOT -(5^(-4)).
                                    This means that the negation sign is picky, on the left it needs to preserve the '*' precedence, so we need '(-1) * 5 ^ (-1) @ 4'.`}/>
                                <PageParagraph block={true} text={
                                    `So to solve this, the choice between using * and @ is determined conditionally by the operator that initiated the negation, for example, 
                                    the negation in '3^-4' is initiated by ^. Based on the initiator operator X, @ is used if X's precedence challenges that of *, so that we ensure the negation
                                    is applied before X. Otherwise if X does not challenge *, simply use *, to avoid incorrectly taking precedence over future operators, like in the case marked (!!!).`}/>
                            </SectionBox>
                        ]}/>
                    ]}
                />
                <PageParagraph text="Tokens:"/>
                {tokens}
                {latex}
            </SectionBox>
        </Box>
    )
}