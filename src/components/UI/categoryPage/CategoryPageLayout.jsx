import React from "react"
import { Box } from "@mui/material"

export default function CategoryPageLayout({category}) {
    return (
        <Box>This page is for {category.displayName}</Box>
    )
}