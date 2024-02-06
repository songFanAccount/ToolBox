import React from "react"
import { Card, Typography } from "@mui/material"
import { PageParagraph } from "../DefaultLayout"

export default function CategoryDescription({category}) {
    const desc = getDescription(category.displayName)
    const categoryDesc = <PageParagraph text={desc} fs={13}/>
    return (
        <Card 
            variant="outlined"
            sx = {{
                mx: 0.5,
                mb: 1,
                px: 1.5,
                py: 0.5,
                minHeight: 100
            }}
        >
            <Typography sx={{fontFamily: 'Montserrat', fontSize: 20, fontWeight: "Bold", mb: 0.5}}>{category.displayName}</Typography>
            {categoryDesc}
        </Card>
    )
}

function getDescription(categoryName) {
    switch (categoryName) {
        case "Maths":
            return "Mathematics is an area of knowledge that includes the topics of numbers, formulas and related structures, shapes and the spaces in which they are contained, and quantities and their changes."
        case "Chemistry":
            return "Chemistry is the scientific study of the properties and behavior of matter."
        case "Computer Science":
            return "Computer science is the study of computation, information, and automation."
        default: // All categories
            return "This page contains every tool available!"
    }
}