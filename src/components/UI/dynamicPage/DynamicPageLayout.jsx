import React from "react"
import { Box } from "@mui/material"
import { useLocation } from "react-router-dom"
import ToolPageLayout from "../toolPage/ToolPageLayout"
import { tools } from "../../../Data/data"
import TopicPageLayout from "../topicPage/TopicPageLayout";

export default function DynamicPageLayout() {
    let isCategory = true
    const location = useLocation()
    const pathname = location.pathname
    
    let page
    let lastCat
    if (pathname.startsWith('/tools')) {
        const routes = pathname.split("/")
        let cat = tools
        if (routes.length === 2) {lastCat = cat}
        for(let i = 2; i < routes.length; i++) {
            const newCat = cat.subCategories?.[routes[i]]
            if(newCat) { // Valid subcategory case
                cat = newCat
                lastCat = cat
            } else { // Not subcategory, check if it is a tool
                const tool = cat.tools?.[routes[i]]
                if(tool) {
                    isCategory = false
                }
                break
            }
        }
        page = isCategory ? <TopicPageLayout topic={lastCat.displayName}/> : <ToolPageLayout/>
    }

    return (
        <Box>
            {page}
        </Box>
    )
}