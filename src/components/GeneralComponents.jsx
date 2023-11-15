import { InputBase } from "@mui/material";
import { TBTextField } from "./UI/Form";

function ParserTextField({onChange, expr, placeholder}) {
    return (
        <TBTextField
            placeholder={placeholder}
            width={400}
            maxLength={150}
            onChange={onChange}
            value={expr}
            variant="outlined"
            stickToTop={expr && expr !== ''}
        />
    )
}
export function MEPTextField({onChange, expr}) {
    return (
        <ParserTextField 
            onChange={onChange}
            expr={expr}
            placeholder="e.g. ax^2 + bx + c"
        />
    )
}
export function CEPTextField({onChange, expr}) {
    return (
        <ParserTextField 
            onChange={onChange}
            expr={expr}
            placeholder="e.g. 2H2 + O2 -> 2H2O"
        />
    )
}

export function TBText({expr, onChange, width=40, height=40, placeholder='', maxLength='', center}) {
    return (
        <InputBase
            type="text"
            value={expr}
            onChange={onChange}
            placeholder={placeholder}
            fullWidth
            inputProps={{
                maxLength: maxLength,
                sx: {
                    textAlign: center ? 'center' : ''
                }
            }}
            sx={{
                width: width,
                height: height,
            }}
        />
    )
}
// PARSER PAGE CONTENT TEMPLATE
// export default function ChemExpressionParser() {
//     const [expr, setExpr] = useState('')
//     function handleChange(value) {
//         setExpr(value)
//     }
//     return (
//         <Box>
//             <SectionBox noBorder={true}>
//                 <PageParagraph text={
//                     `Description`
//                 }/>
//             </SectionBox>
//             <SectionBox title="How it works">
//                 <PageParagraph text="Enter an expression to begin:"/>
//                 <CEPTextField onChange={handleChange} expr={expr}/>
//                 <SectionBox title="Step 1:" mb={0}>
//                     <PageParagraph text={`Step 1`}/>
//                 </SectionBox>
//                 <SectionBox title="Step 2:" mb={0}>
//                     <PageParagraph text={`Step 2`}/>
//                 </SectionBox>
//                 <SectionBox title="Step 3:" mb={0}>
//                     <PageParagraph text={`Step 3`}/>
//                 </SectionBox>
//                 <SectionBox title="Step 4:" mb={0}>
//                     <PageParagraph text={`Step 4`}/>
//                 </SectionBox>
//             </SectionBox>
//         </Box>
//     )
// }