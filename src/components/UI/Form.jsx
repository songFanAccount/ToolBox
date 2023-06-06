import { Button, Checkbox, FormControlLabel, Input, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";

export function TBSubmitButton({loading}) {
    return (
        <Button 
            type="submit"
            variant="contained"
            loading={loading}
            sx={{
                width: 100,
                maxWidth: 1,
                backgroundColor: '#011627',
                '&:hover': {
                    backgroundColor: '#011627'
                },
            }}
        >
            <Typography sx={{color: '#fdfffc', fontFamily: 'Verdana', fontSize: 14, fontWeight: 550}}>Submit</Typography>
        </Button>
    )
}
/*
By default, text fields cannot start as an error, even if their default value is technically invalid.

Visually, we don't want the form to look red/invalid at first glance. So, error detection takes place only after the field has been
modified
*/
export function TBTextField({value, label, placeholder, width, variant, onChange, required, rows, minRows, maxRows, maxLength, error, errorMsg}) {
    if(rows && (minRows || maxRows)) throw new Error("TBTextField: Rows is defined -> Don't input min/max rows!")
    if(error !== undefined && errorMsg === undefined) throw new Error("TBTextField: If errors can occur, supply an error message!")
    const [modified, setModified] = useState(false)
    return (
        <TextField
            type="text"
            value={value || ''}
            label={label}
            required={required}
            placeholder={placeholder}
            onChange={(e) => {setModified(true); if (onChange) {onChange(e.target.value)}}}
            variant={variant ? variant : 'standard'}
            multiline={rows !== undefined || minRows !== undefined || maxRows !== undefined}
            rows={rows}
            minRows={minRows}
            maxRows={maxRows}
            error={modified && error}
            helperText={modified && error && errorMsg}
            InputLabelProps={{
                shrink: true,
                sx: {
                    fontFamily: 'Verdana',
                }
            }}
            inputProps={{
                maxLength: maxLength ? maxLength : 50
            }}
            InputProps={{
                sx: {
                    fontFamily: 'Verdana',
                }
            }}
            sx={{
                width: width ? width : 200,
                maxWidth: 1,
                height: 'fit-content',
                '& .MuiInput-underline:after': {
                    borderColor: (modified && error) ? 'error' : '#011627'
                },
                '& label.Mui-focused': {
                    color: (modified && error) ? 'error' : '#011627'
                },
                '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                        borderColor: (modified && error) ? 'error' : '#011627'
                    }
                },
                "& .MuiInputBase-input": {
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                }
            }}
        />
    )
}

/*
Read TBTextField on error style handling
*/
export function TBSelect({label, onChange, list, value, maxWidth, error, errorMsg, required}) {
    if(!list) throw new Error("TBSelect: Undefined list!")
    if(!Array.isArray(list)) throw new Error("TBSelect: List is not of type array!")
    if(list.length === 0) throw new Error("TBSelect: Include at least 1 option!")
    if(!onChange) throw new Error("TBSelect: Undefined onChange function, expects a function that takes in newValue from source!")
    /* Does not check for uniqueness in array, but should never be a problem since options should not include dups anyways */
    const [modified, setModified] = useState(false)
    return (
        <TextField
            select
            required={required}
            value={value || ''}
            label={label}
            error={modified && error}
            helperText={modified && error && errorMsg}
            onChange={(e) => {setModified(true); onChange(e.target.value)}}
            variant="standard"
            FormHelperTextProps={{
                fontFamily: 'Verdana'
            }}
            sx={{
                width: 200,
                maxWidth: maxWidth ? maxWidth : 1,
                '& .MuiInput-input': {
                    fontFamily: 'Verdana'
                },
                '& .MuiInput-underline:after': {
                    borderColor: (modified && error) ? 'error' : '#011627'
                },
                '& label.Mui-focused': {
                    color: (modified && error) ? 'error' : '#011627'
                },
                '& label': {
                    fontFamily: 'Verdana'
                },
            }}
        >
            {list.map((el) => <MenuItem value={el}>{el}</MenuItem>)}
        </TextField>
    )
}

export function TBCheckbox({label, checked, onChange}) {
    return (
        <FormControlLabel control={<Checkbox disableRipple checked={checked} onChange={(e) => onChange(e.target.checked)}/>} label={label}
            sx={{
                '& .MuiCheckbox-root.Mui-checked': {
                    color: '#011627'
                },
                '& .MuiTypography-root': {
                    fontFamily: 'Verdana',
                    fontSize: 14
                }
            }}
        />
    )
}
// TODO: Implement once recaptcha acquired
export function TBFileUpload() {
    return (
        <Input
            type="file"
            disableUnderline
            sx={{
                maxWidth: 1,
                border: 0
            }}
        >

        </Input>
    )
}

export const toastStyle = {
    position: "bottom-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "colored",
}