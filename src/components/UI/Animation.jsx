import { Box, Button, IconButton, Stack, Tooltip } from '@mui/material'
import React from 'react'
import { motion } from 'framer-motion';

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FastForwardIcon from '@mui/icons-material/FastForward';
import { PageParagraph } from './DefaultLayout';

export function AnimatableBox({className, children}) {
  return (
    <Box className={className} id={className} component={motion.div}>
      {children}
    </Box>
  )
}
export function ControlBoardBox({label, children, maxWidth, mt}) {
    return (
        <Stack
            direction="column"
            rowGap={1.5}
            alignItems="center"
            sx={{
                p: 1.5, mt: mt,
                width: 'fit-content',
                maxWidth: maxWidth,
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
                justifyContent='center'
                flexWrap='wrap'
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

export function CBTextIconButton({text, endIcon, onClick, tooltip}) {
  return (
    <Tooltip title={tooltip}>
      <Button disableRipple
        onClick={onClick}
        endIcon={endIcon}
        variant="outlined"
        component={motion.button}
        whileTap={{
          scale: 0.9
        }}
        sx={{
          color: 'black',
          borderColor: 'black',
          borderRadius: 10,
          border: 2,
          fontFamily: 'Verdana',
          textTransform: 'none',
          boxSizing: 'content-box',
          '&:hover': {
            backgroundColor: 'black',
            color: 'white',
            borderColor: 'black',
            border: 2
          }
        }}
      >
        {text}
      </Button>
    </Tooltip>
  )
}
export function CBIconButton({icon, label, onClick, tooltip, noBorder}) {
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
          border: noBorder ? 0 : 2,
          borderColor: 'black',
          color: 'black',
          '&:hover': noBorder ? null : {
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