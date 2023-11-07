import React from 'react';
import { Box, Button, Drawer, Icon, IconButton, Typography, SvgIcon, Divider, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useLocation, Link } from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ConstructionSharpIcon from '@mui/icons-material/ConstructionSharp';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import CallMadeIcon from '@mui/icons-material/CallMade';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';
import { tools } from '../../Data/data';

function SideNavBar(props) {
	const inHeader = props.inHeader // Used to determine how the sideNavBar toggle is rendered based on viewport width (passed from DefaultLayout)
    const [open, setOpen] = React.useState(false) // Whether the sideNavBar is open
	const [namePath, setNamePath] = React.useState([]) // Display names path e.g. ['Maths', 'Integration', 'Estimation techniques']
    const [categories, setCategories] = React.useState([]) // Actual url subdirectories e.g. ['maths', 'integration', 'estimation']
	const [curCategory, setCurCategory] = React.useState(tools) // An object of the current category, defaulted to tools from data
	const [newPath, setNewPath] = React.useState("") // A string used to direct to the appropriate tool page e.g. '/tools/maths/integration'
	const [curPath, setCurPath] = React.useState('')
	const location = useLocation()

	React.useEffect(() => {
		setCurPath(location.pathname)
	}, [location])

	const sectionTitleStyle = {
		mt: 3,
		ml: 3,
		p: 0,
		color: '#011627',
		fontSize: 24,
		fontFamily: 'Montserrat'
	}
	const listItemStyle = {
		display: 'flex',
		py: 1,
		px: 0,
		'&:hover > .go': {
			visibility: 'visible'
		}
	}
	const listItemTextStyle = {
		my: 0,
		p: 0,
		color: '#343a40',
		fontSize: 14,
		fontFamily: 'Montserrat',
	}
	function processCurPath() {
		if(curPath.startsWith('/tools')) {
			/*
			current url starts with /tools, this means we are on a potential tool page
			So -> opening side nav bar should open at the current category

			Starting with tools as root, for each subdirectory after /tools
			Check if subdir is a valid subcategory of current category
				- If yes: Branch to that subdir, continue
				- If not: Check if subdir is a valid tool of current category [[NOTE: Logically this is what to do, but as explained below, can just conclude search]]
					- If yes: curCategory is reached, conclude search
					- If not (NOT subcat NOR tool): curCategory is also reached, conclude search, explanation below:

					  e.g. /tools/validsubcat/X
					  The loop should nav to validsubcat as current category successfully, then tries to process X
					  Since X is neither subcat nor tool, it can either be invalid or potentially a valid non cat/tool page
					  If it is invalid, router will automatically direct to 404 page, but the sidenavbar can stay on
					  'validsubcat' as its current category.
					  If it is potentially a valid subpage, it will also make sense to stay on 'validsubcat' in sidenavbar
					  
					  -> curCategory is reached in all scenarios, so conclude search
			*/
			let cat = tools
			let cats = []
			let names = ['Categories']
			let path = '/tools'
			const routes = curPath.split('/')
			for(let i = 2; i < routes.length; i++) {
				const newCat = cat.subCategories?.[routes[i]]
				if(newCat) { // Valid subcategory case
					cat = newCat
					cats.push(routes[i])
					path += `/${routes[i]}`
					names.push(cat.displayName)
				} else { // Not subcategory
					break
				}
			}
			setCurCategory(cat)
			setCategories(cats)
			setNewPath(path)
			setNamePath(names)
		} else {
			setNewPath('/tools')
			setCurCategory(tools)
			setCategories([])
			setNamePath(['Categories'])
		}
	}
    function toggleOn() {
        if(open) {return}
        setOpen(true)
		processCurPath()
    }

    function toggleOff() {
        if(!open) {return}
        setOpen(false)
    }
    const PrevArrow = () => (
        <SvgIcon
            sx={{
                fontSize: 10,
                mx: 0.2,
                px: 0
            }}
        >
            <ArrowForwardIosIcon/>
        </SvgIcon>
    )
    const PrevText = (text) => (
        <Typography
            sx={{
                mx: 0.5,
                px: 0,
                fontSize: 14,
            }}
        >
            {text}
        </Typography>
    )
    const PrevPath = () => {
        const len = namePath.length
        return (
            <Box
                sx={{
					display: 'flex',
					alignItems: 'flex-end',
                    width: "100%",
					height: 55,
					maxHeight: 55
                }}
            >
				<Box
					sx={{
						display: "flex",
						alignItems: 'center',
						ml: 3,
						maxWidth: "100%",
						maxHeight: "100%"
					}}
				>
					{len > 3 && (<>{PrevText("...")}{<PrevArrow/>}</>)}
					{len >= 3 && (<>{PrevText(namePath[len - 3])}{<PrevArrow/>}</>)}
					{len >= 2 && (<>{PrevText(namePath[len - 2])}{<PrevArrow/>}</>)}
				</Box>
            </Box>
        )
    }
	const CurCategory = () => (
		<Typography
			sx={{
				mr: 0,
				p: 0,
				fontSize: 20,
				width: '80%',
				whiteSpace: 'normal',
				fontFamily: 'Montserrat',
				color: 'black',
				fontWeight: 'bold'
			}}
		>
			{categories.length > 0 ? curCategory.displayName : "Categories"}
		</Typography>
	)

	function toPrevCategory() {
		setNamePath(namePath.slice(0, -1))
		setCategories(categories.slice(0, -1))
		let paths = newPath.split('/')
		paths.pop()
		setNewPath(paths.join('/'))
		let newCat = tools
		for(let i = 2; i < paths.length; i++) {
			newCat = newCat.subCategories[paths[i]]
		}
		setCurCategory(newCat)
	}
	const HeadingButton = () => {
		const isBack = categories.length > 0
		return (
			<Box
				sx={{
					width: '20%',
				}}
			>
				<IconButton onClick={isBack ? toPrevCategory : toggleOff}
					sx={{
						alignSelf: 'flex-end',
						py: 2,
						pl: isBack ? 3 : 2,
						pr: isBack ? 1 : 2,
						ml: 1,
						color: 'black'
					}}
				>
					{isBack ? <ArrowBackIosIcon sx={{fontSize: 24}}/> : <CloseIcon sx={{fontSize: 26}}/>}
				</IconButton>
			</Box>
		)
	}
    const Heading = () =>  (
		<Box>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					backgroundColor: 'transparent',
					minheight: 50,
					ml: 3,
					mr: 2,
					mt: .8
				}}
			>
				<CurCategory/>
				<HeadingButton/>
			</Box>
			<Divider/>
		</Box>
	)
	function clickTool() {
		toggleOff()
		window.scrollTo(0, 0)
	}
	const Tools = () => (
		<>
			<Box
				sx={{
					minHeight: 220
				}}
			>
				<Typography
					sx={sectionTitleStyle}
				>
					Tools
				</Typography>
				<List
					sx={{
						pt: 1,
						pb: 0
					}}
				>
					{
						Object.entries(curCategory.tools).map((entry) => (
							<ListItemButton
								component={Link}
								to={`${newPath}/${entry[0]}`}
								key={entry[0]}
								id={entry[0]}
								onClick={clickTool}
								sx={listItemStyle}
							>
								<RemoveIcon
									sx={{
										ml: 4, mr: 1, p: 0,
										fontSize: 14,
										color: 'black',
										maxWidth: '10%',
									}}
								/>
								<ListItemText
									primary=
									{
										<Typography
											sx={listItemTextStyle}
										>
											{entry[1].displayName}
										</Typography>
									}
								/>
								<ListItemIcon
									className="go"
									sx={{
										visibility: 'hidden'
									}}
								>
									<CallMadeIcon
										sx={{
											fontSize: 20,
											alignSelf: 'flex-start',
											mr: 3,
											ml: .8,
											color: '#495057',
										}}
									/>
								</ListItemIcon>
							</ListItemButton>
						))
					}
				</List>	
			</Box>	
			<Divider sx={{mt: 2}}/>
		</>
	)
	function clickCategory(key, value) {
		setNewPath(`${newPath}/${key}`)
		const newCat = curCategory.subCategories[key]
		setCurCategory(newCat)
		setCategories((prevCategories) => [...prevCategories, key])
		setNamePath((prevNamePath) => [...prevNamePath, value.displayName])
	}
	const SubCategories = () => (
		<Box>
			{categories.length > 0 && <Typography sx={sectionTitleStyle}> Sub-categories </Typography>}
			<List
				sx={{
					pt: 1,
					pb: 0
				}}
			>
				{
					Object.entries(curCategory.subCategories).map((entry) => (
						<ListItemButton
							onClick={() => clickCategory(entry[0], entry[1])}
							key={entry[0]}
							disableRipple
							sx={listItemStyle}
						>
							<SubdirectoryArrowRightIcon
								sx={{
									ml: 4, mr: 1, mb: .8, p: 0,
									fontSize: 16,
									color: 'black',
									maxWidth: '10%',
								}}
							/>
							<ListItemText
								primary=
								{
									<Typography
										sx={{...listItemTextStyle, ml: 0}}
									>
										{entry[1].displayName}
									</Typography>
								}
							/>
							<ListItemIcon 
								className="go"
								sx={{
									visibility: 'hidden'
								}}
							>
								<ArrowForwardIosIcon
									sx={{
										fontSize: 16,
										alignSelf: 'flex-start',
										mr: 3,
										ml: 1,
										color: '#495057'
									}}
								/>
							</ListItemIcon>
						</ListItemButton>
					))
				}
			</List>
		</Box>
	)
	const SideBarFooter = () => {
		return (
			<Button
				component={Link}
				to="/tools"
				onClick={toggleOff}
				sx={{
					mt: 'auto',
					mb: 0,
					backgroundColor: '#011627',
					height: 75,
					width: 1,
					display: 'flex',
					justifyContent: 'space-evenly',
					alignItems: 'center',
					borderRadius: 0,
					'&:hover': {
						backgroundColor: '#011627'
					}
				}}
			>
					<Typography
						sx={{
							pt: 1.2,
							fontFamily: 'Braah One',
							fontSize: 18,
							color: '#fdfffc'
						}}
					>
						Explore all categories
					</Typography>
					<Icon
						sx={{
							pb: .5, 
							color: '#fdfffc'
						}}
					>
						<DoubleArrowIcon
							sx={{
								fontSize: 28
							}}
						/>
					</Icon>
			</Button>
		)
	}
    /*
    Contents SHOULD HAVE
    - PrevPath if path is longer than 1 i.e. just categories
    - Heading that displays current category, and a button that goes to previous category (or close navbar if no previous)
	- Available tools in current category
	- Subcategories of current category
	- Footer that sends user to the current category page
    */
    const Contents = () => (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: 320
				}}
			>
				<Box sx={{minHeight: 100}}>
					<PrevPath/>
					<Heading/>
				</Box>	
				{curCategory.tools && <Tools/>}
				{curCategory.subCategories && <SubCategories/>}
				
			</Box>
			<SideBarFooter/>
		</>
    )
	const ToolsIcon = () => {
		let sx = {
			fontSize: 32,
			m: 0,
			p: 0
		}
		if(inHeader) {
			sx = {
				...sx,
				color: '#fdfffc',
				backgroundColor: '#595959',
				p: 1,
				border: 1,
				borderColor: 'transparent',
				borderRadius: '50%'
			}
		}
		return (
			<ConstructionSharpIcon
				aria-hidden='false'
				aria-label='Tools Menu'
				sx={sx}
			/>
		)
	}
	const ToolsButton = () => (
		<IconButton 
			onClick={toggleOn}
			role="navigation"
			sx={{
				color: 'black',
				p: 1,
				ml: 2.5,
				mt: inHeader ? 0 : 3,
				mb: inHeader ? 0 : 3,
				borderRadius: 0,
				zIndex: 10
			}}
		>
			<ToolsIcon/>
			{!inHeader && 
				<Typography
					sx={{
						ml: .5,
						fontSize: 20,
						fontFamily: 'Montserrat'
					}}
				>
					Tools
				</Typography>
			}
		</IconButton>
	)
    return (
		<>
			<Box
				sx={{
					alignSelf: inHeader ? 'inherit' : 'start',
					position: inHeader ? 'static' : 'sticky',
					top: inHeader ? 0 : 100
				}}
			>
				<ToolsButton/>
			</Box>
			<Drawer
				open={open}
				onClose={toggleOff}
			>
				<Contents/>
			</Drawer>
		</>
    )
}
export default SideNavBar