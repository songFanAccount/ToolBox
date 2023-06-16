import React from "react"
import { Box, Card, CardContent, Tooltip, Typography } from "@mui/material"

import { ToolLink } from "../DefaultLayout"

export default function CategoryToolCard({catWithTool}) {
    const desc = getDescription(catWithTool.tool.displayName)
    return (
        <ToolLink name={catWithTool.tool.displayName.toLowerCase()}
        linkText={
            <Tooltip title="Click to check out!" arrow>
                <Card 
                    sx={{
                        m: 0.5,
                        height: 200
                        }}
                    variant="outlined"
                >
                    <CardContent>
                        <Typography 
                            sx={{
                                fontSize: 14,
                                fontFamily: 'Montserrat'
                                }} 
                            color="text.secondary"
                            gutterBottom
                        >
                            {catWithTool.cat}
                        </Typography>
                        <Typography variant="h5" component="div" sx={{fontFamily: 'Verdana', mb: 0.5}}>
                            {catWithTool.tool.displayName}
                        </Typography>
                        <Box component="div" sx={{maxHeight: 80, overflow: 'auto'}}>
                            <Typography variant="body2" sx={{fontFamily: 'Verdana', ml: 0.5, pb: 1}}>
                                {desc}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Tooltip>
        }/>
    )
}

function getDescription(toolDisplayName) {
    switch(toolDisplayName) {
        case "LaTeX Converter":
            return "This is description for LaTeX Converter."
        case "Stationary points":
            return "This is description for stationary points"
        case "Chemistry Equation Balancer":
            return "This is description for CEB"
        case "Maths expression parser":
            return "This is description for MEP"
        default:
            return "-"
    }
}