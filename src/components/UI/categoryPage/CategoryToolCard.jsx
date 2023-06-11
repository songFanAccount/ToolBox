import React from "react"
import { Card, CardContent, Typography, CardActions, Button, Grid } from "@mui/material"

export default function CategoryToolCard({catWithTool}) {
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
                    breif <strong>explanation</strong> goes here
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    )
}