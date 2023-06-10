import React from "react"
import { Card } from "@mui/material"

export default function CategoryDescription({category}) {
    return (
        <Card 
            variant="outlined"
            sx = {{
                mx: 0.5
            }}
        >
            <h3>{category.displayName}</h3>
            <p>{category.description}</p>
        </Card>
    )
}