import React from "react"
import { Card, CardContent, Typography, CardActions, Button } from "@mui/material"

import { ToolLink } from "../DefaultLayout"

export default function CategoryToolCard({catWithTool}) {
    const link = <ToolLink 
                    name={catWithTool.tool.displayName.toLowerCase()}
                    linkText={<Button size="small" sx={{fontFamily: 'Verdana', color: "#218f1f"}}>Learn More</Button>} 
                />
    return (
        <Card 
            sx={{
                  m: 0.5,
                  height: "200px",
                  position: "relative"
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
                <Typography variant="h5" component="div" sx={{fontFamily: 'Verdana',}}>
                    {catWithTool.tool.displayName}
                </Typography>
                <Typography variant="body2" sx={{fontFamily: 'Verdana',}}>
                    brief <strong>explanation</strong> goes here
                </Typography>
            </CardContent>
            <CardActions sx={{position: 'absolute', bottom: 0}}>
                {link}
            </CardActions>
        </Card>
    )
}