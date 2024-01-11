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

export default function SCSimulator({initNumStudents=2, initNumSchools=2, initStudentPrefs}) {
  const [numStudents, setNumStudents] = React.useState(initNumStudents)
  const [numSchools, setNumSchools] = React.useState(initNumSchools)
  const sPrefs = []
  if (initStudentPrefs) sPrefs = initStudentPrefs
  else {
    for (let i = 0; i < initNumStudents; i++) {
      const initPref = Array.from(Array(initNumSchools).keys())
      sPrefs.push(initPref)
    }
  }
  const [studentPrefs, setStudentPrefs] = React.useState(sPrefs)

  const squareWidth = 40
  /* Student preference table */
  function prefMove(data, studentIndex, index) {
    let { x, y } = data
    if (Math.abs(y) > squareWidth / 2) return
    const moveDir = Math.sign(x)
    x = Math.abs(x)
    if (x <= squareWidth / 2) return
    const squaresShifted =  Math.floor((x - squareWidth / 2) / squareWidth) + 1
    const maxPossibleShift = moveDir === 1 ? numSchools - 1 - index : index
    if (squaresShifted > maxPossibleShift) return
    const studentNewPrefs = [...studentPrefs[studentIndex]]
    const newIndex = index + moveDir * squaresShifted
    const schoolMoved = studentNewPrefs[index]
    for (let i = 0; i < squaresShifted; i++) {
      const ind = index + moveDir * i
      studentNewPrefs[ind] = studentNewPrefs[ind + moveDir]
    }
    studentNewPrefs[newIndex] = schoolMoved
    const newStudentPrefs = []
    for (let i = 0; i < numStudents; i++) {
      if (i === studentIndex) newStudentPrefs.push(studentNewPrefs)
      else newStudentPrefs.push(studentPrefs[i])
    }
    setStudentPrefs(newStudentPrefs)
  }
  const StudentRows = () => {
    const nums = []
    const Row = ({studentIndex}) => {
      return (
        <Stack direction="row">
          <TableBox borderRight={1} contents={<PageParagraph text={`${studentIndex+1}`}/>}/>
          {
            studentPrefs[studentIndex].map((value, index) => <TableBox contents={
              <Draggable
                position={{x: 0, y: 0}}
                onStop={(_, data) => prefMove(data, studentIndex, index)}
              >
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
      <Stack direction="row" columnGap={1.5}>
        <TableBox borderRight={1}/>
        <TableBox
          width="fit-content"
          contents={<PageParagraph text="Students' preferences"/>}
        />
      </Stack>
      <StudentRows/>
    </Stack>
  )
  const SchoolPrefs = () => (
    <Stack direction="column">
      <Stack direction="row" columnGap={1.5}>
        <TableBox borderRight={1}/>
        <TableBox
          width="fit-content"
          contents={<PageParagraph text="Schools' preferences"/>}
        />
      </Stack>
      <StudentRows/>
    </Stack>
  )
  /* Control board */
  function addStudent() {
    if (numStudents >= 10) return
    setNumStudents(numStudents + 1)
    const newPrefs = [...studentPrefs]
    const newPref = Array.from(Array(numSchools).keys())
    newPrefs.push(newPref)
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
      <Stack direction="row" columnGap={2}>
        <StudentPrefs/>
        <SchoolPrefs/>
      </Stack>
      <br></br>
      <ControlBoard/>
    </Box>
  )
}
