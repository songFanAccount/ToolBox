import React from "react"
import { Button, Typography } from "@mui/material"

export default function CategoryButton({category, selected, handleClick}) {

    return (
        <Button
            variant={selected ? "contained" : "outlined"}
            color={selected ? "success" : "primary"}
            onClick={() => handleClick(category)}
            sx={{
                margin: "5px",
                minWidth: "fit-content",
                whiteSpace: "nowrap"
            }}
        >
            <Typography
                sx={{
                    fontFamily: 'Montserrat',
                    fontSize: 13
                }}
            >
                {category.displayName}
            </Typography>
        </Button>
    )
}