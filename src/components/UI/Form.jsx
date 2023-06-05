import { Input, MenuItem, TextField } from "@mui/material";

export function TBTextField({label, placeholder, onChange, required}) {
    return (
        <TextField
            label={label}
            required={required}
            placeholder={placeholder}
            onChange={(e) => {if (onChange) {onChange(e.target.value)}}}
            variant="standard"
            InputLabelProps={{
                shrink: true,
                sx: {
                    fontFamily: 'Verdana',
                }
            }}
            InputProps={{
                sx: {
                    fontFamily: 'Verdana',
                }
            }}
            sx={{
                width: 200,
                mr: 5,
                mb: 3,
                '& .MuiInput-underline:after': {
                    borderBottomColor: '#011627'
                },
                '& label.Mui-focused': {
                    color: '#011627'
                }
            }}
        />
    )
}

export function TBSelect({label, onChange, list, value, maxWidth, error, required, helperText}) {
    if(!list) throw new Error("TBSelect: Undefined list!")
    if(!Array.isArray(list)) throw new Error("TBSelect: List is not of type array!")
    if(list.length === 0) throw new Error("TBSelect: Include at least 1 option!")
    if(!onChange) throw new Error("TBSelect: Undefined onChange function, expects a function that takes in newValue from source!")
    /* Does not check for uniqueness in array, but should never be a problem since options should not include dups anyways */
    return (
        <TextField
            select
            error={error}
            required={required}
            value={value || ''}
            label={label}
            helperText={helperText}
            onChange={(e) => onChange(e.target.value)}
            variant="standard"
            FormHelperTextProps={{
                fontFamily: 'Verdana'
            }}
            sx={{
                mr: 5,
                mb: 3,
                minWidth: 200,
                maxWidth: maxWidth ? maxWidth : 'fit-content',
                '& .MuiInput-input': {
                    fontFamily: 'Verdana'
                },
                '& .MuiInput-underline:after': {
                    borderBottomColor: '#011627'
                },
                '& label': {
                    fontFamily: 'Verdana'
                },
                '& label.Mui-focused': {
                    color: '#011627'
                }
            }}
        >
            {list.map((el) => <MenuItem value={el}>{el}</MenuItem>)}
        </TextField>
    )
}

export function TBFileUpload() {
    return (
        <Input
            type="file"
            disableUnderline
            sx={{
                border: 0
            }}
        >

        </Input>
    )
}