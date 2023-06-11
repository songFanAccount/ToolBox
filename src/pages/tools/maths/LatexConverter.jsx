import { Box, Typography } from '@mui/material';
import { MEPTextField } from '../../../components/GeneralComponents';
import { processExpr } from '../../../components/Maths/LatexDisplay';
import { CopyableParagraph, ExternalLink, PageParagraph, PageTextList, SectionBox, ToolLink } from '../../../components/UI/DefaultLayout';
import { DisplayError } from '../../../components/Compsci/DataStructures';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

/*
Page Content:
User input for math equation
*/
function LatexConverter() {
    const [expr, setExpr] = useState('')
    const latexObj = useRef(null)
    useEffect(() => {
        if(expr !== '') window.MathJax.typeset()
    }, [expr])
    function validTex() {
        return latexObj.current?.latex !== '-'
    }
    function getTex() {
        if(latexObj.current?.success) {
            return latexObj.current.latex
        } else {
            return '-'
        }
    }
    function getTexRendered() {
        if(validTex()) {
            return `$${latexObj.current.latex}$`
        } else {
            return '-'
        }
    }
    function getErrorMsg() {
        if(latexObj.current?.success) {
            return ''
        } else {
            return latexObj.current?.errorMsg
        }
    }
    function handleChange(value) {
        setExpr(value)
        latexObj.current = processExpr(value, false, true)
    }
    return (
        <Box>
            <SectionBox noBorder={true}>
                <PageParagraph text="LaTeX converter takes in mathematical expressions and outputs the equivalent expression in LaTeX syntax."/>
                <PageParagraph text="Enter an expression:"/>
                <MEPTextField onChange={handleChange} expr={expr}/>
            </SectionBox>
            <SectionBox title="Results">
                <CopyableParagraph preText="The converted LaTeX expression: " copyableText={getTex()} copyable={validTex()}/>
                {(latexObj.current && !latexObj.current?.success) && <DisplayError errorMsg={getErrorMsg()}/>}
                <PageParagraph text="LaTeX preview:"/>
                {latexObj.current?.success &&
                    <Typography sx={{fontSize: 20}}>
                        {getTexRendered()}
                    </Typography>
                }
            </SectionBox>
            <SectionBox title="How to use" id="How to use">
                <PageParagraph text=
                    {`To use the tool, simply enter your math expression into the input box above. 
                    It will be parsed to be equipped with LaTeX syntax while preserving the intended order of operation.
                    The output LaTeX code can then be copied and pasted into your LaTeX documents.`}/>
            </SectionBox>
            <SectionBox title="Limitations">
                <PageParagraph text=
                    {`The purpose of making this dynamic parser was largely for the development of other maths tools.
                    As a result, there is a lack of support for a large portion of all maths operators, functions and symbols.
                    This may be resolved/improved in future versions, if upcoming tools demands it.`}/>
                <PageTextList
                    listName="Limitations:" 
                    list={[
                        'The expression must be syntactically correct.',
                        'Functions are only activated with braces e.g. sinx should be sin(x), otherwise it is interpreted as s*i*n*x.',
                        'Currently supported operators: +, -, *, /, ^',
                        'Currently supported functions: sin, cos, tan, cosec, sec, cot, arcsin, arccos, arctan, sqrt, log, ln',
                        "No maths constants or symbols are currently supported e.g. Pi, Euler's constant"
                    ]}
                />
            </SectionBox>
            <SectionBox title="How it works">
                <Box>
                    <PageParagraph text={`Inspiration taken from the `}/>
                    <ExternalLink
                        href="https://www.integral-calculator.com/">
                        integral calculator
                    </ExternalLink>
                    <PageParagraph text={`. The LaTeX convertion involves the use of the `}/>
                    <ExternalLink
                        href="https://en.wikipedia.org/wiki/Shunting_yard_algorithm#:~:text=In%20computer%20science%2C%20the%20shunting,abstract%20syntax%20tree%20(AST).">
                        Shunting yard algorithm
                    </ExternalLink>
                    <PageParagraph text={
                        ` to process the input tokens (given in infix notation) to be in postfix notation.
                        A binary expression tree is then generated, from which an inorder traversal of the tree produces the corresponding LaTeX code.
                        The LaTeX preview is rendered using `} />
                    <ExternalLink href="https://www.mathjax.org/">
                        MathJax
                    </ExternalLink>
                    <PageParagraph text="."/>
                </Box>
                <Box>
                    <PageParagraph text="For the programmers, click "/>
                    <ToolLink name="maths expression parser" linkText="here"/>
                    <PageParagraph text=" for a more in-depth explanation."/>
                </Box>
                
            </SectionBox>
        </Box>
    )
}

export default LatexConverter