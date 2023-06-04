import { NativeSelect, TextField } from "@mui/material";

export function TBTextField({label, placeholder, onChange}) {
    return (
        <TextField
            label={label}
            placeholder={placeholder}
            onChange={onChange}
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

export function TBSelect({label, placeholder, onChange, children}) {
    return (
        <NativeSelect
            label={label}
            placeholder={placeholder}
            onChange={onChange}
            variant="standard"
            inputProps={{
                name: label,
                fontFamily: 'Verdana'
            }}
        >
            {children}
        </NativeSelect>
    )
}