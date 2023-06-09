import React from "react"
import { Button } from "@mui/material"

export default function CategoryButton({categoryName, selected, handleClick}) {

    return (
        <Button
            variant={selected ? "contained" : "outlined"}
            sx={{
                margin: "5px"
            }}
            onClick={() => handleClick(categoryName)}
            color={selected ? "success" : "primary"}
        >
            {categoryName}
        </Button>
    )
}