import React from "react"
import { Box, Card, CardContent, Typography } from "@mui/material"

import { ToolLink } from "../DefaultLayout"

export default function CategoryToolCard({catWithTool}) {
	const desc = getDescription(catWithTool.tool.displayName)
	return (
		<ToolLink name={catWithTool.tool.displayName.toLowerCase()} textDecoration="none"
			linkText={
			<Card 
				sx={{
					m: 0.5,
					height: 200,
					'&:hover': {
						border: 2
					}
				}}
				variant="outlined"
			>
				<CardContent>
					<Typography 
						sx={{
							fontSize: 14,
							fontFamily: 'Montserrat',
							textDecoration: 'underline'
						}} 
						gutterBottom
					>
						{catWithTool.cat}
					</Typography>
					<Typography variant="h5" sx={{fontFamily: 'Verdana', mb: 0.5, textDecoration: 'underline', mt: 1}}>
						{catWithTool.tool.displayName}
					</Typography>
					<Box 
						sx={{maxHeight: 80, overflow: 'auto', mt: 1.5,
							'&::-webkit-scrollbar': {
								display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
							},
							'&-ms-overflow-style:': {
								display: 'none', // Hide the scrollbar for IE
							}
						}}
					>
						<Typography variant="body2" sx={{fontFamily: 'Verdana', ml: 0.5, pb: 2}}>
							{desc}
						</Typography>
					</Box>
				</CardContent>
			</Card>
		}/>
	)
}

function getDescription(toolDisplayName) {
	switch(toolDisplayName) {
		case "LaTeX Converter":
			return "Given a mathematical expression, output the corresponding LaTeX code."
		case "Chemical Equation Balancer":
			return "The (unfinished) Chemical Equation Balancer takes in a chemical equation and equips each chemical compound with the balanced coefficients."
		case "Maths expression parser":
			return "Processes input mathemical expressions into expression trees that are easier to work with in other math tools."
		case "EF1 Allocation Algorithm":
			return "Given a resource allocation setting of items, agents and their preferences, output an allocation of the items that satisfies the EF1 property."
		case "Student Proposing Deferred Acceptance":
			return "Given a resource allocation setting of students and schools with their respective preferences, output an allocation that prioritises the justified envy-freeness property."
		default:
			throw new Error("CategoryToolCard: getDescription -> 'Invalid toolDisplayName'")
	}
}