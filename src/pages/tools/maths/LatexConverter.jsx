import { Box, Link, TextField, Typography } from '@mui/material';
import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { BinaryTree } from '../../../components/BinaryTree';
import { exprToLatex } from '../../../components/Maths/LatexDisplay';
import { CopyableParagraph, ExternalLink, PageEndSpace, PageParagraph, PageSectionTitle, PageTextList, SectionBox, ToolLink } from '../../../components/UI/DefaultLayout';
import SideBar from '../../../components/UI/toolPage/SideBar';

/*
Page Content:
User input for math equation
*/
function LatexConverter() {
    const [tex, setTex] = React.useState('-')
    const [tree, setTree] = React.useState({})
    const [delay, setDelay] = React.useState(1000)
    const [errorMsg, setErrorMsg] = React.useState('')
    const [latexRendered, setLatexRendered] = React.useState('-')

    React.useEffect(() => {
        function typeset() {
            if(window?.MathJax !== undefined){
                window.MathJax.typeset()
            }
        }
        if(delay > 0) {
            setTimeout(() => typeset, delay)
            setDelay(0)
        } else {
            typeset()
        }
    // eslint-disable-next-line
    }, [tex])

    function handleChange(event) {
        let input = event.target.value
        input = input.replaceAll(' ', '') // Getting rid of all spaces
        const latexObj = exprToLatex(input)
        if(latexObj.success) {
            setTex(latexObj.latex)
            setTree(latexObj.tree)
            setLatexRendered(`$${latexObj.latex}$`)
            setErrorMsg('')
        } else {
            setErrorMsg(latexObj.errorMsg)
            setLatexRendered('-')
            setTex('-')
        }
    }
    return (
        <Box>
            <SectionBox noBorder={true}>
                <PageParagraph text="LaTeX converter takes in mathematical expressions and outputs the equivalent expression in LaTeX syntax."/>
                <PageParagraph text="Enter an expression:"/>
                <TextField
                    placeholder="e.g. ax^2 + bx + c"
                    sx={{maxWidth: 500,}}
                    onChange={(e) => handleChange(e)}
                />
            </SectionBox>
            <PageSectionTitle title="Results"/>
            <SectionBox>
                <CopyableParagraph preText="The converted LaTeX expression: " copyableText={tex} copyable={tex !== '-'}/>
                {errorMsg !== '' && <PageParagraph bold={true} text={errorMsg}/>}
                {errorMsg === '' &&
                    <>
                        <PageParagraph text="LaTeX preview:"/>
                        {tex !== '-' && 
                        <Typography sx={{fontSize: 20}}>
                            {latexRendered}
                        </Typography>}
                    </>
                }
            </SectionBox>
            <PageSectionTitle title="How to use"/>
            <SectionBox id="How to use">
                <PageParagraph text=
                    {`To use the tool, simply enter your math expression into the input box above. 
                    It will be parsed to be equipped with LaTeX syntax while preserving the intended order of operation.
                    The output LaTeX code can then be copied and pasted into your LaTeX documents.`}/>
            </SectionBox>
            <PageSectionTitle title="Limitations"/>
            <SectionBox>
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
            <PageSectionTitle title="How it works"/>
            <SectionBox>
                <Box>
                    <PageParagraph text={`Inspiration taken from the `} inline={true}/>
                    <ExternalLink target="_blank" 
                        href="https://www.integral-calculator.com/">
                        integral calculator
                    </ExternalLink>
                    <PageParagraph text={`. The LaTeX convertion involves the use of the `} inline={true}/>
                    <ExternalLink target="_blank" 
                        href="https://en.wikipedia.org/wiki/Shunting_yard_algorithm#:~:text=In%20computer%20science%2C%20the%20shunting,abstract%20syntax%20tree%20(AST).">
                        Shunting yard algorithm
                    </ExternalLink>
                    <PageParagraph inline={true} text={
                        ` to process the input tokens (given in infix notation) to be in postfix notation.
                        A binary expression tree is then generated, from which an inorder traversal of the tree produces the corresponding LaTeX code.`} />
                </Box>
                <Box>
                    <PageParagraph inline={true} text="For the programmers, click "/>
                    <ToolLink name="maths expression parser" linkText="here"/>
                    <PageParagraph inline={true} text=" for a more in-depth explanation."/>
                </Box>
                
            </SectionBox>
            <PageEndSpace/>
            {/* <Typography>
                Tree:
            </Typography>
            <BinaryTree tree={[tree]}/> */}
        </Box>
    )
}

export default LatexConverter