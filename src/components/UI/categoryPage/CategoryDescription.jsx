import React from "react"
import { Card, Typography } from "@mui/material"
import { PageParagraph } from "../DefaultLayout"

export default function CategoryDescription({category}) {
    const categoryDesc = getDescription(category.displayName)
    return (
        <Card 
            variant="outlined"
            sx = {{
                mx: 0.5,
                px: 0.5
            }}
        >
            <Typography sx={{fontFamily: 'Montserrat', fontSize: 20, fontWeight: "Bold"}}>{category.displayName}</Typography>
            {categoryDesc}
        </Card>
    )
}

function getDescription(categoryName) {
    switch (categoryName) {
        case "Maths":
            return <PageParagraph text={"Mathematics is an area of knowledge that includes the topics of numbers, formulas and related structures, shapes and the spaces in which they are contained, and quantities and their changes."} fs={13}/>
        case "Chemistry":
            return <PageParagraph text={"Chemistry is the scientific study of the properties and behavior of matter."} fs={13}/>
        case "Physics":
            return <PageParagraph text={"Physics is the natural science of matter, involving the study of matter, its fundamental constituents, its motion and behavior through space and time, and the related entities of energy and force."} fs={13}/>
        case "Engineering":
            return <PageParagraph text={"Engineering is the use of scientific principles to design and build machines, structures, and other items, including bridges, tunnels, roads, vehicles, and buildings."} fs={13}/>
        case "IRL Games":
            return <PageParagraph text={"Enjoy games in real life!"} fs={13}/>
        case "Video Games":
            return <PageParagraph text={"Enjoy video games :)"} fs={13}/>
        case "Computer Science":
            return <PageParagraph text={"Computer science is the study of computation, information, and automation."} fs={13}/>
        default: // All categories
            return <PageParagraph text={"This page contains every tools avaiable with us!"} fs={13}/>
    }
}