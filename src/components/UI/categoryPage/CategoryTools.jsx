import React from "react"
import { Grid } from "@mui/material"

import CategoryToolCard from "./CategoryToolCard"

export default function CategoryTools({category}) {
    const toolsList = getTools(category).map(element => 
                                                    <Grid item xs={12} sm={6} md={4} lg={3}>
                                                        <CategoryToolCard
                                                            key={element.tool.displayName}
                                                            catWithTool={element} />
                                                    </Grid>)
    return (
        <Grid container spacing={0.1}>
            {toolsList}
            {toolsList.length === 0 && <Grid item xs={12}
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                            minHeight="50vh"
                                        >
                                            There is no tool for this category yet!
                                        </Grid>}
        </Grid>
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