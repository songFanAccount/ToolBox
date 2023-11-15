import { IconButton, Stack, Tooltip } from '@mui/material'
import React from 'react'
import { motion } from 'framer-motion';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { PageParagraph } from './DefaultLayout';

export function ControlBoardBox({label, children}) {
    return (
        <Stack
            direction="column"
            rowGap={1.5}
            alignItems="center"
            sx={{
                p: 1.5,
                width: 'fit-content',
                border:5,
                borderRadius: 5,
                borderStyle: 'double',
                borderColor: '#011627',
            }}
        >
            <PageParagraph text={label}/>
            <Stack
                direction="row"
                alignItems="center"
                flexWrap="wrap"
                rowGap={3}
                columnGap={3}
            >
                {children}
            </Stack>
        </Stack>
    )
}
export function AnimControlBoard({label, play, back, next, skipToEnd, tooltips}) {
    return (
        <ControlBoardBox label={label}>
            {play && <CBIconButton tooltip={tooltips?.play ? tooltips.play : "Play animation"} onClick={play} icon={<PlayArrowIcon />}/>}
            {back && <CBIconButton tooltip={tooltips?.back ? tooltips.back : "Decrement animation"} onClick={back} icon={<ArrowBackIcon />}/>}
            {next && <CBIconButton tooltip={tooltips?.next ? tooltips.next : "Increment animation"} onClick={next} icon={<ArrowForwardIcon />}/>}
            {skipToEnd && <CBIconButton tooltip={tooltips?.skipToEnd ? tooltips.skipToEnd : "Skip to end state"} onClick={skipToEnd} icon={<FastForwardIcon />}/>}
        </ControlBoardBox>
    )
}

export function CBIconButton({icon, label, onClick, tooltip}) {
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

export function SequentialLetters({letters : array}) {
    
}

export const commonAnims = {
    hide: {opacity: [0, 0]},
    show: {opacity: [1, 1]},
    reveal: {opacity: [0, 1]},
    conceal: {opacity: [1, 0]},
}