import React from "react"
import { Card } from "@mui/material"

export default function CategoryDescription({category}) {
    const categoryDesc = getDescription(category.displayName)
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

function getDescription(categoryName) {
    switch (categoryName) {
        case "Maths":
            return <p>This is <strong>Maths</strong> Category</p>
        case "Chemistry":
            return <p>This is <strong>Chemistry</strong> Category</p>
        case "Physics":
            return <p>This is <strong>Physics</strong> Category</p>
        case "Engineering":
            return <p>This is <strong>Engineering</strong> Category</p>
        case "IRL Games":
            return <p>This is <strong>IRL Games</strong> Category</p>
        case "Video Games":
            return <p>This is <strong>Video Games</strong> Category</p>
        case "Computer Science":
            return <p>This is <strong>Computer Science</strong> Category</p>
        default: // All categories
            return <p>This is <strong>All Category</strong></p>
    }
}