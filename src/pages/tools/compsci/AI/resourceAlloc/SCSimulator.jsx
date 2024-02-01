import { Box, Stack } from '@mui/material'
import React from 'react'
import { CBIconButton, CBTextIconButton, ControlBoardBox } from '../../../../../components/UI/Animation'
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { TableBox } from '../../../../../helpers/Tables';
import { CollapseSectionBox, PageParagraph, TBButton } from '../../../../../components/UI/DefaultLayout';
import Draggable from 'react-draggable';
import Latex from 'react-latex-next';
import { copyListOfSets } from '../../../../../helpers/generalHelpers';

export default function SCSimulator({algorithm, initNumStudents=2, initNumSchools=2, initStudentPrefs, initSchoolPrefs}) {
  const [numStudents, setNumStudents] = React.useState(initNumStudents)
  const [numSchools, setNumSchools] = React.useState(initNumSchools)
  let sPrefs = []
  if (initStudentPrefs) sPrefs = initStudentPrefs
  else {
    for (let i = 0; i < initNumStudents; i++) {
      const initPref = Array.from(Array(initNumSchools).keys())
      sPrefs.push(initPref)
    }
  }
  const [studentPrefs, setStudentPrefs] = React.useState(sPrefs)
  let scPrefs = []
  if (initSchoolPrefs) scPrefs = initSchoolPrefs
  else {
    for (let i = 0; i < initNumSchools; i++) {
      const initPref = Array.from(Array(initNumStudents).keys())
      scPrefs.push(initPref)
    }
  }
  const [schoolPrefs, setSchoolPrefs] = React.useState(scPrefs)
  const [quotas, setQuotas] = React.useState(Array(initNumSchools).fill(1))
  /* Algorithm states */
  const [SPDAsteps, setSPDAsteps] = React.useState(null)
  const [studentsAssignment, setStudentsAssignment] = React.useState(null)

  const squareWidth = 40
  /* Student preference table */
  function studentPrefMove(data, studentIndex, index) {
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
  function schoolPrefMove(data, schoolIndex, index) {
    let { x, y } = data
    if (Math.abs(y) > squareWidth / 2) return
    const moveDir = Math.sign(x)
    x = Math.abs(x)
    if (x <= squareWidth / 2) return
    const squaresShifted =  Math.floor((x - squareWidth / 2) / squareWidth) + 1
    const maxPossibleShift = moveDir === 1 ? numStudents - 1 - index : index
    if (squaresShifted > maxPossibleShift) return
    const schoolNewPrefs = [...schoolPrefs[schoolIndex]]
    const newIndex = index + moveDir * squaresShifted
    const studentMoved = schoolNewPrefs[index]
    for (let i = 0; i < squaresShifted; i++) {
      const ind = index + moveDir * i
      schoolNewPrefs[ind] = schoolNewPrefs[ind + moveDir]
    }
    schoolNewPrefs[newIndex] = studentMoved
    const newSchoolPrefs = []
    for (let i = 0; i < numSchools; i++) {
      if (i === schoolIndex) newSchoolPrefs.push(schoolNewPrefs)
      else newSchoolPrefs.push(schoolPrefs[i])
    }
    setSchoolPrefs(newSchoolPrefs)
  }
  const StudentRows = () => {
    const rows = []
    const Row = ({studentIndex}) => {
      return (
        <Stack direction="row">
          <TableBox borderRight={1} contents={<PageParagraph color={studentsAssignment && studentsAssignment[studentIndex] === -1 ? 'red' : 'inherit'} text={`${studentIndex+1}`}/>}/>
          {
            studentPrefs[studentIndex].map((value, index) => <TableBox cursor="grab" contents={
              <Draggable
                position={{x: 0, y: 0}}
                onStop={(_, data) => studentPrefMove(data, studentIndex, index)}
              >
                <div>
                  <Stack
                    sx={{
                      width: 26, height: 26,
                      border: studentsAssignment && studentsAssignment[studentIndex] === value ? 1 : 0,
                      borderRadius: '50%',
                      justifyContent: 'center', alignItems: 'center'
                    }}
                  >
                    <Latex>{`$c_{${value+1}}$`}</Latex>
                  </Stack>
                </div>
              </Draggable>
            }/>)
          }
        </Stack>
      )
    }
    for (let i = 0; i < numStudents; i++) {
      rows.push(
        <Row studentIndex={i}/>
      )
    }
    return (
      <Stack direction="column" borderTop={1}>
        {rows}
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
  function incQuota(schoolIndex) {
    if (quotas[schoolIndex] >= 10) return
    const newQuotas = [...quotas]
    newQuotas[schoolIndex]++
    setQuotas(newQuotas)
    setSPDAsteps(null)
    setStudentsAssignment(null)
  }
  function decQuota(schoolIndex) {
    if (quotas[schoolIndex] <= 1) return
    const newQuotas = [...quotas]
    newQuotas[schoolIndex]--
    setQuotas(newQuotas)
    setSPDAsteps(null)
    setStudentsAssignment(null)
  }
  const SchoolRows = () => {
    const rows = []
    const Row = ({schoolIndex}) => {
      return (
        <Stack direction="row">
          <TableBox borderRight={1} contents={<Latex>{`$c_{${schoolIndex + 1}}$`}</Latex>}/>
          {
            schoolPrefs[schoolIndex].map((value, index) => <TableBox cursor="grab" contents={
              <Draggable
                position={{x: 0, y: 0}}
                onStop={(_, data) => schoolPrefMove(data, schoolIndex, index)}
              >
                <div>
                  <PageParagraph text={`${value+1}`}/>
                </div>
              </Draggable>
            }/>)
          }
          <TableBox width="fit-content" contents={
            <Stack direction="row" ml={1} alignItems="center" columnGap={2}>
              <PageParagraph nowrap bold text={`Quota: ${quotas[schoolIndex]}`}/>
              <Stack direction="row">
                <CBIconButton onClick={() => incQuota(schoolIndex)} noBorder icon={<AddIcon />}/>
                <CBIconButton onClick={() => decQuota(schoolIndex)} noBorder icon={<RemoveIcon />}/>
              </Stack>
            </Stack>
          }/>
        </Stack>
      )
    }
    for (let i = 0; i < numSchools; i++) {
      rows.push(
        <Row schoolIndex={i}/>
      )
    }
    return (
      <Stack direction="column" borderTop={1}>
        {rows}
      </Stack>
    )
  }
  const SchoolPrefs = () => (
    <Stack direction="column">
      <Stack direction="row" columnGap={1.5}>
        <TableBox borderRight={1}/>
        <TableBox
          width="fit-content"
          contents={<PageParagraph text="Schools' preferences"/>}
        />
      </Stack>
      <SchoolRows/>
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
    const newSchoolPrefs = []
    for (let i = 0; i < numSchools; i++) {
      const newSchoolPref = [...schoolPrefs[i]]
      newSchoolPref.push(numStudents)
      newSchoolPrefs.push(newSchoolPref)
    }
    setSchoolPrefs(newSchoolPrefs)
    setSPDAsteps(null)
    setStudentsAssignment(null)
  }
  function removeStudent() {
    if (numStudents === 0) return
    setNumStudents(numStudents - 1)
    const newPrefs = [...studentPrefs]
    newPrefs.pop()
    setStudentPrefs(newPrefs)
    const newSchoolPrefs = []
    for (let i = 0; i < numSchools; i++) {
      const newScPref = [...schoolPrefs[i]]
      newScPref.splice(newScPref.indexOf(numStudents - 1), 1)
      newSchoolPrefs.push(newScPref)
    }
    setSchoolPrefs(newSchoolPrefs)
    setSPDAsteps(null)
    setStudentsAssignment(null)
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
    const newSchoolPrefs = [...schoolPrefs]
    const newScPref = Array.from(Array(numStudents).keys())
    newSchoolPrefs.push(newScPref)
    setSchoolPrefs(newSchoolPrefs)
    const newQuotas = [...quotas]
    newQuotas.push(1)
    setQuotas(newQuotas)
    setSPDAsteps(null)
    setStudentsAssignment(null)
  }
  function removeSchool() {
    if (numSchools === 0) return
    setNumSchools(numSchools - 1)
    const newPrefs = []
    for (let i = 0; i < numStudents; i++) {
      const newPref = [...studentPrefs[i]]
      newPref.splice(newPref.indexOf(numSchools - 1), 1)
      newPrefs.push(newPref)
    }
    setStudentPrefs(newPrefs)
    const newSchoolPrefs = [...schoolPrefs]
    newSchoolPrefs.pop()
    setSchoolPrefs(newSchoolPrefs)
    const newQuotas = [...quotas]
    newQuotas.pop()
    setQuotas(newQuotas)
    setSPDAsteps(null)
    setStudentsAssignment(null)
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
  function SPDA() {
    const states = []
    const assigned = Array(numStudents).fill(-1)
    const nextSchoolIndex = Array(numStudents).fill(0)
    const curSchoolApplied = []
    for (let i = 0; i < numSchools; i++) {
      curSchoolApplied.push(new Set())
    }
    while (true) {
      /* For all unassigned students, apply to the next most preferred school */
      const newApplicants = []
      for (let i = 0; i < numStudents; i++) {
        if (assigned[i] === -1) {
          const nsi = nextSchoolIndex[i]
          if (nsi >= numSchools) continue
          const schoolToApply = studentPrefs[i][nsi]
          curSchoolApplied[schoolToApply].add(i)
          nextSchoolIndex[i]++
          assigned[i] = 1
          newApplicants.push(i)
        }
      }
      if (newApplicants.length === 0) break
      states.push({
        type: 'apply',
        applicants: [...newApplicants],
        applicationList: copyListOfSets(curSchoolApplied)
      })
      const rejected = []
      for (let i = 0; i < numSchools; i++) {
        if (curSchoolApplied[i].size > quotas[i]) {
          const newApplicationList = new Set()
          for (const student of schoolPrefs[i]) {
            if (curSchoolApplied[i].has(student)) {
              if (newApplicationList.size === quotas[i]) {
                assigned[student] = -1
                rejected.push(student)
              } else newApplicationList.add(student)
            }
          }
          curSchoolApplied[i] = newApplicationList
        }
      }
      if (rejected.length > 0) {
        states.push({
          type: 'reject',
          rejectList: [...rejected],
          applicationList: copyListOfSets(curSchoolApplied)
        })
      }
    }
    const newStudentsAssign = Array(numStudents).fill(-1)
    for (let i = 0; i < numSchools; i++) {
      const studentsAtSchoolI = curSchoolApplied[i]
      for (const student of studentsAtSchoolI) {
        newStudentsAssign[student] = i
      }
    }
    setStudentsAssignment(newStudentsAssign)
    setSPDAsteps(states)
  }
  const SPDADisplay = () => {
    const Explanation = ({step, state}) => {
      const type = state['type']
      if (type === 'apply') {
        
        return (
          <PageParagraph text={`${step}. Students ${state['applicants']?.map((student) => student+1).join(", ")} apply to their next most preferred school.`}/>
        )
      } else if (type === 'reject') {
        console.log(state['rejectList'])
        return (
          <PageParagraph text={`${step}. Students ${state['rejectList']?.map((student) => student+1).join(", ")} are rejected by their applied school.`}/>
        )
      }
    }
    const ApplicationList = ({list}) => (
      <Stack direction="column" my={2}>
        { list && list.map((set, index) => {
          let setStr = ''
          const studentList = Array.from(set)
          for (let i = 0; i < studentList.length; i++) {
            setStr += `${studentList[i]+1}`
            if (i < studentList.length - 1) setStr += ', '
          }
          return (
            <Stack direction="row">
              <Latex>{`$c_${index + 1}: \\{${setStr}\\}$`}</Latex>
            </Stack>
          )
        })}
      </Stack>
    )
    const State = ({step, state}) => (
      <Stack direction="column">
        <Explanation step={step} state={state}/>
        <ApplicationList list={state['applicationList']}/>
      </Stack>
    )
    return (
      <Stack direction="column">
        {SPDAsteps && SPDAsteps.map((value, index) => <State step={index+1} state={value}/>)}
        {SPDAsteps && <PageParagraph text={`${SPDAsteps.length + 1}. The algorithm has terminated, refer to step ${SPDAsteps.length} for the obtained allocation/assignment.`}/>}
      </Stack>
    )
  }
  const AlgorithmButton = () => {
    let buttonText = ""
    let onClick
    if (algorithm === 'SPDA') {
      buttonText = 'Run SPDA'
      onClick = SPDA
    }
    return (
      <TBButton buttonText={buttonText} onClick={onClick} ml={0}/>
    )
  }
  const AlgorithmDisplay = () => {
    if (algorithm === 'SPDA') return <SPDADisplay/>
    else return <></>
  }
  return (
    <Box>
      <Stack direction="row" columnGap={2}>
        <StudentPrefs/>
        <SchoolPrefs/>
      </Stack>
      { algorithm &&
        <>
          <br></br>
          <AlgorithmButton/>
        </>
      }
      <br></br>
      <ControlBoard/>
      { algorithm &&
        <>
          <br></br>
          <CollapseSectionBox title="Algorithm Steps:">
            <AlgorithmDisplay/>
          </CollapseSectionBox>
        </>
      }
    </Box>
  )
}
