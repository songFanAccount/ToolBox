import React, { useState } from "react"
import { Box } from "@mui/material"

import CategoryButton from "./CategoryButton"
import { tools } from "../../../data"

export default function CategoryPageLayout({category}) {
    const categories = generateCategoryButtonObjectList(category ? category.displayName : null)
    const [chosenCategory, setChosenCategory] = useState(categories)

    function handleClick(categoryName) {
        setChosenCategory(prevChosenCategory => {
            return prevChosenCategory.map((category) => {
                if ((category.id === categoryName) || (category.id !== categoryName && category.selected)) {
                    return {id: category.id, selected: !category.selected}
                }
                else {
                    return category
                }
            })
        })
    }

    const categoryButtons = chosenCategory.map( categoryButton => <CategoryButton key={categoryButton.id} categoryName={categoryButton.id} selected={categoryButton.selected} handleClick={handleClick}/>)
    return (
        <Box>
            <Box>This page is for {category ? category.displayName : "all categories"}</Box>
            <Box 
                sx={{display: "flex"}}
            >
                {categoryButtons}
            </Box>
        </Box>
    )
}

function generateCategoryButtonObjectList(categoryName) {
    const categories = Object.keys(tools.subCategories)
    let categoriesObjectList = []
    if (categoryName) {
        for (let i = 0; i < categories.length; i++) {
            categoriesObjectList.push({id: categories[i], selected: categoryName.toLowerCase() === categories[i] ? true : false})
            console.log(categoryName)
            console.log(categories[i])
        }
    }
    else {
        for (let i = 0; i < categories.length; i++) {
            categoriesObjectList.push({id: categories[i], selected: false})
        }
    }
    return [{id:"All Categories", selected: !categoryName ? true : false}, ...categoriesObjectList]
}