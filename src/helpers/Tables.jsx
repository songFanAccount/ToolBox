import { Box } from '@mui/material'
import React from 'react'

const sqrWidth = 40
export function TableBox({contents, width=sqrWidth, borderBottom, borderRight, cursor}) {
  return (
    <Box
        sx={{
            width: width ? width : sqrWidth,
            minWidth: width ? width : sqrWidth,
            height: sqrWidth,
            borderBottom: borderBottom,
            borderRight: borderRight,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: cursor
        }}
    >
        {contents}
    </Box>
  )
}
