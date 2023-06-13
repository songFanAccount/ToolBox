import React from "react"
import { Box } from "@mui/material"

import CategoryToolCard from "./CategoryToolCard"

export default function CategoryTools({category}) {
    const toolsList = getTools(category).map(element => <CategoryToolCard key={element.tool.displayName} catWithTool={element} />)
    return (
        <div>
            {toolsList}
            {toolsList.length === 0 && <Box
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            minHeight="50vh"
                                        >
                                            There is no tool for this category yet!
                                        </Box>}
        </div>
    )
}

function getTools(category) {
    // This is recursive function that gets all the tools under the category.
    // firstly, add tools directly in this category to the list.
    // secondly, check if there is sub-categories and repeat the process on each sub-category if exists.
    let toolsList = []
    if ("tools" in category && category.tools) {
        const toolWithCat = Object.values(category.tools).map(a => ({cat: category.displayName, tool: a}))
        toolsList = [...toolsList, ...toolWithCat]
    }
    if ("subCategories" in category && category.subCategories) {
        const subCat = Object.keys(category.subCategories)
        for (let i = 0; i < subCat.length; i++) {
            toolsList = [...toolsList, ...getTools(category.subCategories[subCat[i]])]
        }
    }
    return toolsList
}