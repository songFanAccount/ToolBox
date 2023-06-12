import React, { useState } from "react"
import { Box } from "@mui/material"

import CategoryButton from "./CategoryButton"
import CategoryDescription from "./CategoryDescription"
import { tools } from "../../../data"
import CategoryTools from "./CategoryTools"

export default function CategoryPageLayout({category}) {
    const categoriesButtonObject = generateCategoryButtonObjectList(category)
    const [categoryButtons, setCategoryButtons] = useState(categoriesButtonObject)
    const [selectedCategory, setSelectedCategory] = useState(category)

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
        <Box>
            <Box 
                sx={{
                    display: "flex",
                    overflowX: "scroll"
                }}
            >
                {categoryButtonsComponent}
            </Box>
            {selectedCategory && <CategoryDescription category={selectedCategory}/>}
            {selectedCategory && <CategoryTools category={selectedCategory}/>}
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