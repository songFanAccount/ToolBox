import { MenuItem, TextField } from "@mui/material";

export function TBTextField({label, placeholder, onChange}) {
    return (
        <TextField
            label={label}
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

export function TBSelect({label, onChange, list, value, maxWidth}) {
    if(!list) throw new Error("TBSelect: Undefined list!")
    if(!Array.isArray(list)) throw new Error("TBSelect: List is not of type array!")
    if(!onChange) throw new Error("TBSelect: Undefined onChange function, expects the setValue function from source!")
    /* Does not check for uniqueness in array, but should never be a problem since options should not include dups anyways */
    return (
        <TextField
            select
            value={value || ''}
            label={label}
            onChange={(e) => onChange(e.target.value)}
            variant="standard"
            sx={{
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