import { Box, useMediaQuery } from "@mui/material"
import { Outlet, useLocation } from "react-router-dom"
import { tools } from "../../../data"
import { PageEndSpace, PageTitle } from "../DefaultLayout"
import SideBar from "./SideBar"
import ToolPagePath from "./ToolPagePath"

/*
THIS MIGHT BREAK IF CATEGORY NAME = TOOL NAME BUT NOT SURE
*/
function getToolInfo(curPath) {
    if(curPath.startsWith('/tools')) {
        let cat = tools
        let names = ['Categories']
        let path = '/tools'
        let urls = ['/tools']
        let sectionTitles = null
        const routes = curPath.split('/')
        for(let i = 2; i < routes.length; i++) {
            const newCat = cat.subCategories?.[routes[i]]
            if(newCat) { // Valid subcategory case
                cat = newCat
                //cats.push(routes[i])
                path += `/${routes[i]}`
                urls.push(path)
                names.push(cat.displayName)
            } else { // Not subcategory, check if it is a tool
                const tool = cat.tools?.[routes[i]]
                if(tool) {
                    names.push(tool.displayName)
                    path += `/${routes[i]}`
                    urls.push(path)
                    sectionTitles = tool.sectionTitles
                }
                break
            }
        }
        if(!sectionTitles) {throw new Error("Section titles shouldn't be null!")}
        const ret = {
            displayNames: names,
            pathURLs: urls,
            sectionTitles: sectionTitles
        }
        return ret
    } else {
        throw new Error("Should only be called if URL is valid and starts with /tools. Are you using this function elsewhere?")
    }  
}
function ToolPageLayout() {
    let dimX = 0
    if(useMediaQuery('(min-width:900px)')) {
        dimX = 1
    }
    /*
    It is the responsibility of the layout to figure out the following info of the tool from the URL:
    - Chain of display names -> Page path display
    - Chain of path names -> Making page path interactive
    - Potentially info about the tool's category but not needed ATM
    */
    const location = useLocation()
    const pathName = location.pathname
    let curToolName = ''
    let displayNames = ['Categories']
    let pathURLs = ['/tools']
    let sectionTitles
    try {
        const toolInfo = getToolInfo(pathName)
        displayNames = toolInfo.displayNames
        pathURLs = toolInfo.pathURLs
        curToolName = displayNames.at(-1)
        sectionTitles = toolInfo.sectionTitles
    } catch(e) {
        console.log(e.message)
    }
    return(
        <Box className="pageContent"
            sx={{
                position: 'absolute',
                overflowX: 'clip',
                top: 130,
                width: dimX > 0 ? 'calc(100vw - 370px)' : '100vw',
            }}
        >
            <Box sx={{zIndex: 7,
                    position: 'relative',
                    left: dimX > 0 ? 370 : 20,
                    width: dimX > 0 ? 'calc(100vw - 2*370px)' : '100vw',}}>
                <ToolPagePath urls={pathURLs} displayNames={displayNames}/>
                <PageTitle title={curToolName}/>
                <Outlet />
                <PageEndSpace/>
            </Box>
            {dimX > 0 && <SideBar toolName={curToolName} sections={sectionTitles}/>}
        </Box>
    )
}

export default ToolPageLayout