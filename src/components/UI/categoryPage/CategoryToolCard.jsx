import React from "react"
import { Card, CardContent, Typography, CardActions, Button } from "@mui/material"

import { ToolLink } from "../DefaultLayout"

export default function CategoryToolCard({catWithTool}) {
    const link = <ToolLink 
                    name={catWithTool.tool.displayName.toLowerCase()}
                    linkText={<Button size="small">Learn More</Button>} 
                />
    return (
        <Card 
            sx={{
                  width: 275,
                  m: 0.5
                }} 
            variant="outlined"
        >
            <CardContent>
                <Typography 
                    sx={{
                        fontSize: 14
                        }} 
                    color="text.secondary"
                    gutterBottom
                >
                    {catWithTool.cat}
                </Typography>
                <Typography variant="h5" component="div">
                    {catWithTool.tool.displayName}
                </Typography>
                <Typography variant="body2">
                    brief <strong>explanation</strong> goes here
                </Typography>
            </CardContent>
            <CardActions>
                {link}
            </CardActions>
        </Card>
    )
}