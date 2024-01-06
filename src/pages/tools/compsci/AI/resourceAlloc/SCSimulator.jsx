import { Box, Stack } from '@mui/material'
import React from 'react'
import { CBIconButton, CBTextIconButton, ControlBoardBox } from '../../../../../components/UI/Animation'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { TableBox } from '../../../../../helpers/Tables';
import { PageParagraph } from '../../../../../components/UI/DefaultLayout';
import Draggable from 'react-draggable';
import Latex from 'react-latex-next';

export default function SCSimulator() {
  const [numStudents, setNumStudents] = React.useState(0)
  const [numSchools, setNumSchools] = React.useState(0)
  const [studentPrefs, setStudentPrefs] = React.useState([])

  const squareWidth = 40
  /* Student preference table */
  const StudentRows = () => {
    const nums = []
    const Row = ({studentIndex}) => {
      return (
        <Stack direction="row">
          <TableBox borderRight={1} contents={<PageParagraph text={`${studentIndex+1}`}/>}/>
          {
            studentPrefs[studentIndex].map((value) => <TableBox contents={
              <Draggable>
                <div>
                  <Latex>{`$c_{${value+1}}$`}</Latex>
                </div>
              </Draggable>
            }/>)
          }
        </Stack>
      )
    }
    for (let i = 0; i < numStudents; i++) {
      nums.push(
        <Row studentIndex={i}/>
      )
    }
    return (
      <Stack direction="column" borderTop={1}>
        {nums}
      </Stack>
    )
  }
  const StudentPrefs = () => (
    <Stack direction="column">
      <Stack direction="row">
        <TableBox borderRight={1}/>
      </Stack>
      <StudentRows/>
    </Stack>
  )
  /* Control board */
  function addStudent() {
    if (numStudents >= 10) return
    setNumStudents(numStudents + 1)
    const newPrefs = [...studentPrefs]
    newPrefs.push([])
    setStudentPrefs(newPrefs)
  }
  function removeStudent() {
    if (numStudents === 0) return
    setNumStudents(numStudents - 1)
    const newPrefs = [...studentPrefs]
    newPrefs.pop()
    setStudentPrefs(newPrefs)
  }
  function addSchool() {
    if (numSchools >= 10) return
    setNumSchools(numSchools + 1)
    const newPrefs = []
    for (let i = 0; i < numStudents; i++) {
      const newPref = [...studentPrefs[i]]
      newPref.push(numSchools)
      newPrefs.push(newPref)
    }
    setStudentPrefs(newPrefs)
  }
  function removeSchool() {
    if (numSchools === 0) return
    setNumSchools(numSchools - 1)
    const newPrefs = []
    for (let i = 0; i < numStudents; i++) {
      const newPref = [...studentPrefs[i]]
      newPref.pop()
      newPrefs.push(newPref)
    }
    setStudentPrefs(newPrefs)
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
