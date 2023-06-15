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
        case "Physics":
            return "Physics is the natural science of matter, involving the study of matter, its fundamental constituents, its motion and behavior through space and time, and the related entities of energy and force."
        case "Engineering":
            return "Engineering is the use of scientific principles to design and build machines, structures, and other items, including bridges, tunnels, roads, vehicles, and buildings."
        case "IRL Games":
            return "Enjoy games in real life!"
        case "Video Games":
            return "Enjoy video games :)"
        case "Computer Science":
            return "Computer science is the study of computation, information, and automation."
        default: // All categories
            return "This page contains every tools avaiable with us!"
    }
}