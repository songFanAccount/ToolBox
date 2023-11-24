import React, { useState } from "react"
import { Box } from "@mui/material"
import { useLocation } from "react-router-dom"

import CategoryButton from "./CategoryButton"
import CategoryDescription from "./CategoryDescription"
import { tools } from "../../../Data/data"
import CategoryTools from "./CategoryTools"

export default function CategoryPageLayout() {
    let categoryObject
    const param = useQuery()
    if (param) {
        categoryObject = disPlayName2Object(param.get("category"))
    }
    const categoriesButtonObject = generateCategoryButtonObjectList(categoryObject)
    const [categoryButtons, setCategoryButtons] = useState(categoriesButtonObject)
    const [selectedCategory, setSelectedCategory] = useState(categoryObject)

    function handleClick(category) {
        // it possibly changes one or two button/buttons and leave others as it is.
        // case 1. if user select new category, it sets previously selected button to be unselected and new button to be selected.
        // case 2. if user undo the button selected, it simply unselect that button (no button is selected at this stage).
        // state selectedCategory will be updated to newly selected button or to null in case 2 .
        setCategoryButtons(prevcategoryButtons => {
            return prevcategoryButtons.map((Button) => {
                if ((Button.id === category) || (Button.id !== category && Button.selected)) {
                    if (Button.id === category) setSelectedCategory(!Button.selected ? Button.id : null)
                    return {id: Button.id, selected: !Button.selected}
                }
                else {
                    return Button
                }
            })
        })
    }

    const categoryButtonsComponent = categoryButtons.map( categoryButton => <CategoryButton 
                                                                            key={categoryButton.id.displayName}
                                                                            category={categoryButton.id}
                                                                            selected={categoryButton.selected}
                                                                            handleClick={handleClick}/>)
    return (
        <Box
            sx={{
                p: 1.5
            }}
        >
            <Box 
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    mb: 1
                }}
            >
                {categoryButtonsComponent}
            </Box>
            {selectedCategory && <CategoryDescription category={selectedCategory}/>}
            {selectedCategory && <CategoryTools category={selectedCategory}/>}
            {!selectedCategory && <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    minHeight="75vh"
                                  >
                                    Select category to check out tools!
                                  </Box>}
        </Box>
    )
}

function generateCategoryButtonObjectList(categoryName) {
    // This function will create a list of objects of categories.
    // Object looks like this - {id: display name of the category, selected: boolean}
    const categories = [tools, ...Object.values(tools.subCategories)]
    let categoriesObjectList = []
    for (let i = 0; i < categories.length; i++) {
        categoriesObjectList.push({id: categories[i], selected: categoryName === categories[i] ? true : false})
    }
    return categoriesObjectList
}

function disPlayName2Object(name) {
    switch(name) {
        case "Maths":
            return tools.subCategories["maths"]
        case "Chemistry":
            return tools.subCategories["chemistry"]
        case "Physics":
            return tools.subCategories["physics"]
        case "Computer Science":
            return tools.subCategories["compsci"]
        case "Engineering":
            return tools.subCategories["engineering"]
        case "IRL Games":
            return tools.subCategories["irlGames"]
        case "Video Games":
            return tools.subCategories["videoGames"]
        default:
            return tools
    }
}

function useQuery() {
    return new URLSearchParams(useLocation().search)
}