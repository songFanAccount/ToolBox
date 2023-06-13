import React from "react"
import { Box } from "@mui/material"
import { useLocation } from "react-router-dom"
import ToolPageLayout from "../toolPage/ToolPageLayout"
import CategoryPageLayout from "../categoryPage/CategoryPageLayout";
import { tools } from "../../../Data/data"

export default function DynamicPageLayout() {
    let isCategory = true
    const location = useLocation()
    const pathname = location.pathname
    
    let page
    let firstCat
    if (pathname.startsWith('/tools')) {
        const routes = pathname.split("/")
        let cat = tools
        if (routes.length === 2) {firstCat = cat}
        for(let i = 2; i < routes.length; i++) {
            const newCat = cat.subCategories?.[routes[i]]
            if(newCat) { // Valid subcategory case
                cat = newCat
                if (i === 2) {firstCat = cat}
            } else { // Not subcategory, check if it is a tool
                const tool = cat.tools?.[routes[i]]
                if(tool) {
                    isCategory = false
                }
                break
            }
        }
        page = isCategory ? <CategoryPageLayout category={firstCat}/> : <ToolPageLayout/>
    }

    return (
        <Box>
            {page}
        </Box>
    )
}