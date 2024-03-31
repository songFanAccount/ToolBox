import { Box, Typography } from "@mui/material"
import { CategoryLink, PageParagraph } from "./DefaultLayout"

function CollaboratorInfo({self}) {
  const infoBox = self ? 
    <Box mb={2}>
      <PageParagraph text="Developed by "/>
      <CategoryLink name="About" linkText="me, myself, and I" toSection="#Meet the dev!"/> 
      <PageParagraph text=" :)"/>
    </Box>
    :
    <Box
      sx={{
        mb: 2,
        display: 'flex',
        flexDirection: 'column',
        width: 0.8,
        maxHeight: 'fit-content'
      }}
    >
      <Typography
        sx={{
          fontSize: 24,
          fontFamily: 'Montserrat',
          mb: 1.5
        }}
      >
        Collaborator Info
      </Typography>
      <Box
        sx={{
          width: 1
        }}
      >
        <Box
          sx={{
            display: 'flex',
          }}
        >
          <Box
            sx={{
              height: 100,
              mr: 2,
              aspectRatio: '1 / 1',
              border: 1
            }}
          >
            PFP
          </Box>
          <Box>
            <Typography>Name</Typography>
            <Typography>LinkedIn link</Typography>
            <Typography>Other links</Typography>
          </Box>
        </Box>
        <Typography>About me</Typography>
      </Box>
    </Box>
  return infoBox
}

export default CollaboratorInfo