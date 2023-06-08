import React from "react"
import { Box } from "@mui/material"
import { Outlet, useLocation } from "react-router-dom"
import ToolPageLayout from "../toolPage/ToolPageLayout"
import CategoryPageLayout from "../categoryPage/CategoryPageLayout";
import { useState } from "react";
import { tools } from "../../../data"

export default function DynamicPageLayout() {
    let isCategory = true
    const [curPath, setCurPath] = useState("")
    const location = useLocation()
    
    React.useEffect(() => {
		setCurPath(location.pathname)
	}, [location])
    let page
    if (curPath.startsWith('/tools')) {
        const routes = curPath.split("/")
        let cat = tools
        let names = ['Categories']
        let path = '/tools'
        let urls = ['/tools']
        for(let i = 2; i < routes.length; i++) {
            const newCat = cat.subCategories?.[routes[i]]
            if(newCat) { // Valid subcategory case
                cat = newCat
                path += `/${routes[i]}`
                urls.push(path)
                names.push(cat.displayName)
            } else { // Not subcategory, check if it is a tool
                const tool = cat.tools?.[routes[i]]
                if(tool) {
                    names.push(tool.displayName)
                    path += `/${routes[i]}`
                    urls.push(path)
                    isCategory = false
                }
                break
            }
        }
        page = isCategory ? <CategoryPageLayout url={urls.at(-1)} name={names.at(-1)}/> : <ToolPageLayout/>
    }

    return (
        <>
            <Box>This is dynamic page layout</Box>
            {page}
            <Outlet />
        </>
    )
}