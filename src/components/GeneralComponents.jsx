import { InputBase, Stack, Switch } from "@mui/material";
import { TBTextField } from "./UI/Form";
import { PageParagraph } from "./UI/DefaultLayout";
import React from "react";

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
export function MEPTextField({onChange, expr, placeHolder="e.g. ax^2 + bx + c"}) {
    return (
        <ParserTextField 
            onChange={onChange}
            expr={expr}
            placeholder={placeHolder}
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

export function TBText({key, expr, defaultValue, onChange, errorFunc, width=40, height=40, placeholder='', maxLength='', center, disabled, zIndex, border=0}) {
    const [isError, setIsError] = React.useState(errorFunc(defaultValue))
    return (
        <InputBase
            id={key}
            key={key}
            defaultValue={defaultValue}
            value={expr}
            onChange={(e) => {onChange(e.target.value); setIsError(errorFunc(e.target.value))}}
            placeholder={placeholder}
            fullWidth
            disabled={disabled}
            error={isError}
            inputProps={{
                maxLength: maxLength,
                sx: {
                    textAlign: center ? 'center' : '',
                    fontFamily: 'Verdana',
                    color: isError ? 'red' : 'black' 
                }
            }}
            sx={{
                width: width,
                height: height,
                zIndex: zIndex,
                border: border,
                borderRadius: '50%',
                borderColor: 'black',
                '& .MuiInputBase-input.Mui-disabled': {
                    WebkitTextFillColor: isError ? 'red' : "#000000",
                }
            }}
        />
    )
}

export function TBDoubleSizedSwitch({leftText, rightText, checked, onChange}) {
    return (
        <Stack direction="row" alignItems="center">
            <PageParagraph text={leftText} color={checked ? 'grey' : 'black'}/>
            <Switch color="primary"  checked={checked} onChange={(event) => onChange(event.target.checked)} disableRipple
                sx={{
                    '.MuiSwitch-colorPrimary': {
                        color: 'black',
                        backgroundColor: 'transparent',
                        '&:hover': {
                            backgroundColor: 'transparent'
                        }
                    },
                    '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        color: 'black', 
                        backgroundColor: 'black',
                    },
                    '& .MuiSwitch-thumb': {
                        color: 'black', 
                        backgroundColor: 'black',
                    }
                }}
            />
            <PageParagraph text={rightText} color={checked ? 'black' : 'grey'}/>
        </Stack>
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