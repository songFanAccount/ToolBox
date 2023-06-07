import { IconButton, Stack, Tooltip } from '@mui/material'
import React from 'react'
import { motion } from 'framer-motion';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export function ControlBoard({play, next, tooltips}) {
    return (
        <Stack 
            direction="row"
            alignItems="center"
            flexWrap="wrap"
            rowGap={3}
            columnGap={3}
            sx={{
                mt: 3,
                p: 1.5,
                width: 'fit-content',
                border:5,
                borderRadius: 5,
                borderStyle: 'double',
                borderColor: '#011627',
            }}
        >
            {play && <CBIconButton tooltip={tooltips?.play ? tooltips.play : "Play animation"} onClick={play} icon={<PlayArrowIcon />}/>}
            {next && <CBIconButton tooltip={tooltips?.next ? tooltips.next : "Increment animation"} onClick={next} icon={<ArrowForwardIcon />}/>}
        </Stack>
    )
}

function CBIconButton({icon, label, onClick, tooltip}) {
    return (
        <Tooltip title={tooltip}>
            <IconButton aria-label={label} disableRipple
                size="small"
                onClick={onClick}
                component={motion.button}
                whileTap={{
                    scale: 0.9
                }}
                sx={{
                    border: 2,
                    borderColor: 'black',
                    color: 'black',
                    '&:hover': {
                        backgroundColor: 'black',
                        color: 'white',
                        borderColor: 'none'
                    },
                }}
            >
                {icon}
            </IconButton>
        </Tooltip>
    )
}