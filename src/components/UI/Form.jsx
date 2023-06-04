import { MenuItem, TextField } from "@mui/material";
import React from "react";

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
    const [value, setValue] = React.useState('')
    function onSelect(event) {
        if(onChange) onChange()
        setValue(event.target.value)
        console.log(event.target.value)
    }
    const ListItem = ({valuePair}) => {
        if(valuePair?.length !== 2) throw new Error("TBSelect: Invalid list item!")
        return (
            <MenuItem key={valuePair[0]} value={valuePair[0]}>
                {valuePair[1]}
            </MenuItem>
        )
    }
    const ListItems = ({list}) => {
        if(!list || !Array.isArray(list)) throw new Error("TBSelect: Invalid list!")
        return list.map((el) => <ListItem valuePair={el}/>)
    }
    return (
        <TextField
            select
            label={label}
            placeholder={placeholder}
            onChange={(event) => onSelect(event)}
            variant="standard"
            value={value || ''}
            InputLabelProps={{
                fontFamily: 'Verdana'
            }}
            InputProps={{
                fontFamily: 'Verdana'
            }}
            sx={{
                width: 200,
                '& .MuiInput-underline:after': {
                    borderBottomColor: '#011627'
                },
                '& label.Mui-focused': {
                    color: '#011627'
                }
            }}
        >
            <ListItems list={children}/>
        </TextField>
    )
}