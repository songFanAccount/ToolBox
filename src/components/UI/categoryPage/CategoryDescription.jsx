import React from "react"
import { Card } from "@mui/material"

export default function CategoryDescription({category}) {
    let categoryDesc
    switch (category.displayName) {
        case "Maths":
            categoryDesc = <p>This is <strong>Maths</strong> Category</p>
            break
        case "Chemistry":
            categoryDesc = <p>This is <strong>Chemistry</strong> Category</p>
            break
        case "Physics":
            categoryDesc = <p>This is <strong>Physics</strong> Category</p>
            break
        case "Engineering":
            categoryDesc = <p>This is <strong>Engineering</strong> Category</p>
            break
        case "IRL Games":
            categoryDesc = <p>This is <strong>IRL Games</strong> Category</p>
            break
        case "Video Games":
            categoryDesc = <p>This is <strong>Video Games</strong> Category</p>
            break
        case "Computer Science":
            categoryDesc = <p>This is <strong>Computer Science</strong> Category</p>
            break
        default:
            categoryDesc = <p>This is <strong>All Category</strong></p>
    }
    return (
        <Card 
            variant="outlined"
            sx = {{
                mx: 0.5
            }}
        >
            <h3>{category.displayName}</h3>
            {categoryDesc}
        </Card>
    )
}