import { TextField } from "@mui/material";

export function MEPTextField({handleChange, expr}) {
    return (
        <TextField
            placeholder="e.g. ax^2 + bx + c"
            sx={{maxWidth: 500,}}
            onChange={(e) => handleChange(e)}
            value={expr}
        />
    )
}