import React from 'react';
import { Box, TextField, Typography } from "@mui/material";
import { ExternalLink, PageParagraph, PageSectionTitle, SectionBox, ToolLink } from "../../../../components/UI/DefaultLayout";
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
                    color: token.autoAdded ? 'red' : 'inherit'
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
            setTokens(<ElementArray array={latexObj.tokens.map((e) => <ArrayElement token={e}/>)}/>)
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
            <PageSectionTitle title="How it works"/>
            <SectionBox>
                <PageParagraph text="Enter an expression to begin:"/>
                <TextField
                    placeholder="e.g. ax^2 + bx + c"
                    sx={{maxWidth: 500,}}
                    onChange={(e) => handleChange(e)}
                />
                <PageParagraph text={`The parser first processes the input string, character by character, left to right, and produces an array of tokens.
                                      The parser needs to follow a set of rules, some of which account for special conventions such as negation.`}/>
                <PageParagraph text="Token creation rules:"/>
                
                <PageParagraph text="Tokens:"/>
                {tokens}
                {latex}
            </SectionBox>
        </Box>
    )
}