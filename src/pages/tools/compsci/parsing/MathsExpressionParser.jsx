import React from 'react';
import { Box, Typography } from "@mui/material";
import { CollapseSectionBox, ExternalLink, PageParagraph, PageTextList, SectionBox, ToolLink } from "../../../../components/UI/DefaultLayout";
import { processExpr } from '../../../../components/Maths/LatexDisplay';
import { BinaryTree, DisplayError, ElementArray } from '../../../../components/Compsci/DataStructures';
import { MEPTextField } from '../../../../components/Maths/GeneralComponents';

export default function MathsExpressionParser() {
    const [expr, setExpr] = React.useState('')
    const latexObj = React.useRef(null)
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
    const Tokens = () => {
        if(latexObj.current) {
            return(
                <>
                    {latexObj.current.success ? <ElementArray maxLength={40} array={latexObj.current.tokens.map((e) => <ArrayElement token={e}/>)}/> : <DisplayError errorMsg={latexObj.current.errorMsg}/>}
                </>
            )
        } else {
            return(
                <DisplayError errorMsg="Empty input!"/>
            )
        }   
    }
    const PostfixTokens = () => {
        if(latexObj.current?.success) {
            return(
                <ElementArray maxLength={40} array={latexObj.current.postfixTokens.map((e) => <ArrayElement token={e}/>)}/>
            )
        } else {
            return(
                <DisplayError errorMsg="Could not generate tokens!"/>
            )
        }   
    }
    const OutputExpr = () => {
        if(latexObj.current?.success) {
            return <PageParagraph text={latexObj.current.expr}/>
        } else {
            return <DisplayError errorMsg="Invalid input!"/>
        }
    }
    function handleChange(value) {
        setExpr(value)
        latexObj.current = processExpr(value, true, false)
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
            <SectionBox title="How it works">
                <PageParagraph text="Enter an expression to begin:"/>
                <MEPTextField onChange={handleChange} expr={expr}/>
                <SectionBox title="Step 1:">
                    <PageParagraph text={`The parser first processes the input string, character by character, left to right, and produces an array of tokens.
                                            The parser needs to follow the set of rules listed below and make modifications to the input expression wherever necessary.`}/>
                    <CollapseSectionBox title="Rules:" startClosed={true}>
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
                                        <Box>
                                            <PageParagraph text={
                                                `This was resolved by the introduction of the special '@' operator, which is designed to be equivalent to '*', except with a higher value of precedence.
                                                If we replace every negation-induced * with @, we would end up with '(-1) @ 5 ^ (-1) @ 4', and since @ > ^ in precedence, we now should get 5^(-4) as intended.
                                                However, if you have caught on, you would have seen that the first negation sign is now incorrectly interpreted, and `}/>
                                            <PageParagraph text="[*]" bold={true}/>
                                            <PageParagraph text=" we will instead get (-5)^(-4), NOT -(5^(-4)).
                                                This means that the negation sign is picky, on the left it needs to preserve the '*' precedence, so we need '(-1) * 5 ^ (-1) @ 4'."/>
                                        </Box>
                                        <Box>
                                            <PageParagraph text={
                                                `So to solve this, the choice between using * and @ is determined conditionally by the operator that initiated the negation, for example, 
                                                the negation in '3^-4' is initiated by ^. Based on the initiator operator X, @ is used if X's precedence challenges that of *, so that we ensure the negation
                                                is applied before X. Otherwise if X does not challenge *, simply use *, to avoid incorrectly taking precedence over future operators, like in the case marked `}/>
                                            <PageParagraph text="[*]" bold={true}/>
                                            <PageParagraph text="."/>
                                        </Box>
                                    </SectionBox>
                                ]}/>
                            ]}
                        />
                    </CollapseSectionBox>
                    <PageParagraph text={`
                        Additionally, the parser keeps track of the number of open parentheses. This is used to 1. detect invalid expressions due to
                        an excess of closing parentheses, and 2. after processing the entire input, automatically close any parentheses that are still open.`}/>
                    <Box>
                        <PageParagraph text={`The tokens array generated from your input expression is shown below. Note that anything shown in `}/>
                        <PageParagraph text='red' color='red'/>
                        <PageParagraph text={` is auto-added according to the listed rules. You may also notice a `}/>
                        <PageParagraph text='?' color='red'/>
                        <PageParagraph text=" near the end of the tokens, this is because the parser is expecting a number/variable there, so it uses a placeholder there to validify the otherwise invalid expression."/>
                    </Box>
                    <PageParagraph text='Tokens (showing up to the first 40):'/>
                    <Tokens/>
                </SectionBox>
                <SectionBox title="Step 2: ">
                    <Box>
                        <PageParagraph text={`With these tokens, we apply the `}/>
                        <ExternalLink 
                            href="https://en.wikipedia.org/wiki/Shunting_yard_algorithm#:~:text=In%20computer%20science%2C%20the%20shunting,abstract%20syntax%20tree%20(AST)."
                        >
                            Shunting yard
                        </ExternalLink>
                        <PageParagraph text={` algorithm (pseudo-code and examples on the Wiki) to generate the tokens array in postfix notation. By using postfix
                                            notation instead of the original infix notation, we no longer need to deal with precedence and associativity when
                                            we generate the expression tree.`}/>
                    </Box>
                    <PageParagraph text="Postfix tokens:"/>
                    <PostfixTokens/>
                </SectionBox>
                <SectionBox title="Step 3: ">
                    <Box>
                        <PageParagraph text={`We can then generate a binary expression tree. The method I used can be followed from `}/>
                        <ExternalLink href="https://youtu.be/J8Ht91eeR0E">ComputerAdx's video on Youtube</ExternalLink>
                        <PageParagraph text={`. The method traverses the postfix array right to left. Essentially, we use the tokens to generate child nodes on the
                                            right of the current node until we've reached a number or variable, in which case the right branch terminates, and
                                            only then do we generate child nodes on the left. This means that the numbers and variables are all
                                            leaf nodes of the tree.`}/>
                    </Box>
                    <PageParagraph text="Tree (showing up to 10 layers):"/>
                    <BinaryTree tree={[latexObj.current?.tree]} name="tree" constructOrder="DRL"/>
                </SectionBox>
                <SectionBox title="Step 4: ">
                    <PageParagraph text={
                        `An inorder traversal (LDR) of this expression tree then generates the expression in the appropriate sequence.`
                        
                    }/>
                    <PageParagraph text="Generated expression: "/>
                    <OutputExpr />
                    <Box>
                        <PageParagraph text={
                            `In comparison to your input, you will find that not much has changed. The main differences include a bunch of new * that are auto
                            generated, and you'll find that unnecessary parentheses and negation signs have been handled. However, this expression tree
                            provides a cleaner representation of the expression with its order of operation preserved. This means you may modify/process the output nodes 
                            however you wish to, for example, if you wanted to generate the appropriate LaTeX code, all we need to do is match the correct LaTeX 
                            syntax e.g. matching * to \\cdot, or wrapping {} to ensure exponents like a^(2x) translate correctly to {a}^{2x}. You can see this in action in our `
                        }/>
                        <ToolLink name="latex converter" linkText="LaTeX converter"/>
                        <PageParagraph text="."/>
                    </Box>
                </SectionBox>
            </SectionBox>
            <SectionBox title="Limitations">
                <Box>
                    <PageParagraph text={
                        `Our parser is currently functional but does not support all mathematical functions and constants. You can find a detailed list of limitations at our `
                    }/>
                    <ToolLink name="latex converter" linkText="LaTeX converter"/>
                    <PageParagraph text="."/>
                </Box>
            </SectionBox>
        </Box>
    )
}