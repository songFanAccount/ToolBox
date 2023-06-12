import React from "react"
import { Button } from "@mui/material"

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
            {category.displayName}
        </Button>
    )
}