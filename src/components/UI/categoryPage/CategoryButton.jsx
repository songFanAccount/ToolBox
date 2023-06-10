import React from "react"
import { Button } from "@mui/material"

export default function CategoryButton({category, selected, handleClick}) {

    return (
        <Button
            variant={selected ? "contained" : "outlined"}
            sx={{
                margin: "5px"
            }}
            onClick={() => handleClick(category)}
            color={selected ? "success" : "primary"}
        >
            {category.displayName}
        </Button>
    )
}