import { Helmet } from 'react-helmet';
import { PageParagraph } from '../components/UI/DefaultLayout';
import { motion } from "framer-motion";
import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { getLinear } from '../helpers/generalHelpers';

function Home() {
	const [screenWidth, setScreenWidth] = React.useState(window.innerWidth)
    React.useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
        return _ => {
            window.removeEventListener("resize", handleResize)
        }
    // eslint-disable-next-line
    }, [])
	const [showSecond, setShowSecond] = React.useState(false)
	const fs = getLinear(20, 48, 400, 1200, screenWidth)
	const secondLineFS = getLinear(48, 80, 400, 1200, screenWidth)
	const underlineTop = getLinear(28, 80, 400, 1200, screenWidth)
	const spaceWidth = getLinear(10, 16, 400, 1200, screenWidth)
	const topString = "Algorithms, calculations, concepts..."
	const secondString = "Interactable&Visualised"
	const revealAnimations = {
		hidden: { opacity: 0 },
		exist: { opacity: 1 },
		reveal: { opacity: 1, transition: { duration: 0.01 } },
		blink: {opacity: [0, 1, 0], transition: { duration: 0.2 }}
	}
	const lastAnimation = {
		blink: {opacity: [0, 1, 1, 0], transition: { duration: 1, times: [0, 0.15, 0.85, 1], repeat: Infinity }}
	}
	
  return (
    <>
      <Helmet>
        <title>ToolBox</title>
      </Helmet>
      <Stack
				alignItems="center"
				sx={{
					width: screenWidth,
					height: window.innerHeight - 100,
					backgroundImage: 'linear-gradient(to bottom, #011627, #05579c)',
				}}
			>
				<Stack
					sx={{
						width: 'fit-content',
						alignItems: 'flex-start',
						mt: 16
					}}
				>
					<motion.span
						initial="hidden"
						animate="reveal"
						style={{
							fontSize: fs,
						}}
						transition={{
							staggerChildren: 0.108,
						}}
						onAnimationComplete={() => setShowSecond(true)}
					>
						{
							topString.split("").map((char) => (
								char === " " 
								? 
								<Box sx={{display: "inline-block", width: spaceWidth}}></Box>
								:
								<motion.span variants={revealAnimations}><Typography fontSize={fs} color="white" display="inline-block" fontFamily="Courier New">{char}</Typography></motion.span>
							))
						}
					</motion.span>
					<motion.span
						animate="blink"
						transition={{
							staggerChildren: 0.1,
						}}
						style={{
							position: 'relative',
							top: -underlineTop,
							fontSize: fs
						}}
					>
						{
							Array.from({ length: topString.length }).map((_, index) => (
								<motion.span variants={index === topString.length - 1 ? lastAnimation : revealAnimations}><Typography fontSize={fs} color="white" display="inline-block" fontFamily="Courier New">_</Typography></motion.span>
							))
						}
					</motion.span>
				</Stack>
				{ showSecond &&
					<motion.span
						initial="hidden"
						animate="reveal"
						style={{
							fontSize: fs,
						}}
						transition={{
							staggerChildren: 0.108,
						}}
					>
						{
							secondString.split("").map((char) => (
								char === "&" 
								? 
								<motion.span variants={revealAnimations}><Typography fontSize={fs} color="white" display="inline-block" fontFamily="Braah One" mx={3}>{char}</Typography></motion.span>
								:
								<motion.span variants={revealAnimations}><Typography fontSize={secondLineFS} color="white" display="inline-block" fontFamily="Braah One">{char}</Typography></motion.span>
							))
						}
					</motion.span>
				}
			</Stack>
    </>  
  )
}

export default Home