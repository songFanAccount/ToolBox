import { Box, Stack } from '@mui/material'
import React from 'react'
import { CBIconButton, CBTextIconButton, ControlBoardBox } from '../../../../../components/UI/Animation'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { TableBox } from '../../../../../helpers/Tables';

export default function SCSimulator() {
  const [numStudents, setNumStudents] = React.useState(0)
  const [numSchools, setNumSchools] = React.useState(0)
  /* Student preference table */
  const StudentPrefs = () => (
    <Stack direction="column">
      
    </Stack>
  )
  /* Control board */
  function addStudent() {
    
  }
  function removeStudent() {

  }
  function addSchool() {

  }
  function removeSchool() {

  }
  const ControlBoard = () => {
    return (
      <ControlBoardBox label="Control board" maxWidth={440}>
        <CBIconButton tooltip="Add student (up to 10)" onClick={addStudent} icon={<PersonAddAlt1Icon/>}/>
        <CBIconButton tooltip="Remove student (bottom row)" onClick={removeStudent} icon={<PersonRemoveAlt1Icon/>}/>
        <CBTextIconButton text="Add school" onClick={addSchool} endIcon={<AddIcon/>} tooltip="Add school (up to 10)"/>
        <CBTextIconButton text="Del school" onClick={removeSchool} endIcon={<RemoveIcon/>} tooltip="Delete school (right-most column)"/>
      </ControlBoardBox>
    )
  }
  return (
    <Box>
      <Stack direction="column" rowGap={2}>
        <StudentPrefs/>
        <ControlBoard/>
      </Stack>
    </Box>
  )
}
