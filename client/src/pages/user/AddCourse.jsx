import * as React from "react"
import Box from "@mui/material/Box"
import Stepper from "@mui/material/Stepper"
import Step from "@mui/material/Step"
import StepLabel from "@mui/material/StepLabel"
import StepContent from "@mui/material/StepContent"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import TextField from "@mui/material/TextField"
import FormControl from "@mui/material/FormControl"
import InputLabel from "@mui/material/InputLabel"
import useAxiosPrivate from "@hooks/useAxiosPrivate"
import MultiSelect from "./MultiSelect"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast"
import AuthContext from "@contexts/AuthContext"

import * as z from "zod"

const schema = z.object({
  course: z.string().nonempty("Course is required, please select a course"),
  selectedTeachers: z.array(z.string()).nonempty(),
})

const defaultValues = {
  course: "",
  numberOfSubjects: 2,
  subjectNames: [""],
  selectedTeachers: [""],
}

export default function AddCourse() {
  const { user } = React.useContext(AuthContext)
  const [activeStep, setActiveStep] = React.useState(0)
  const api = useAxiosPrivate()
  const [teachers, setTeachers] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)
  const [teachersAndSubs, setTeachersAndSubs] = React.useState([])
  const [filteredCourses, setFilteredCourses] = React.useState([])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues,
  })
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1)
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const [LessTeachersAvailable, setLessTeachersAvailable] = React.useState(null)
  const [course, setCourse] = React.useState("")
  const [numberofSubjects, setnumberofSubjects] = React.useState(2)
  const [TeachsersSelected, SetTeachersSelected] = React.useState([])

  const handleCourseChange = (e) => {
    setCourse(e.target.value)
  }
  const handleNoOfSubjects = (e) => {
    setnumberofSubjects(parseInt(e.target.value))
  }

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const teachersResponse = await api.get(
          `api/user/fetch-all-teachers?userId=${user.userId}`
        )
        setTeachers(teachersResponse.data.teachers)

        const filteredCoursesResponse = await api.get(
          "api/user/get-filtered-courses"
        )
        setFilteredCourses(filteredCoursesResponse.data.filteredCourses)

        setIsLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error.message)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const [subjectNames, setSubjectNames] = React.useState(
    Array(numberofSubjects).fill("")
  )

  const handleSubjectNameChange = (index, newValue) => {
    const updatedSubjectNames = [...subjectNames]
    updatedSubjectNames[index] = newValue
    setSubjectNames(updatedSubjectNames)
  }

  const getTheTeachersAndMapWithSubjects = async (teachers) => {
    const subjectsWithTeachers = subjectNames.map((subject, index) => ({
      name: subject,
      teacher: teachers[index].value,
    }))

    SetTeachersSelected(teachers)

    setTeachersAndSubs(subjectsWithTeachers)
  }

  const CheckTeacherAvailability = (numberOfSubjects) => {
    const teachersWithOneSubject = teachers.filter(
      (teacher) => !teacher.isAssignedToTwoSubjects
    )

    if (teachersWithOneSubject.length < numberOfSubjects) {
      setLessTeachersAvailable(true)
      toast.error(
        `Not enough teachers available for ${numberOfSubjects} subjects.`
      )
    }
  }
  console.log(TeachsersSelected)
  const steps = [
    {
      label: "Select course",
      description: `For each course, you can add 4-5 subjects, and assign teachers to each subject in a course.`,
      formComponent: (
        <Box p={2}>
          <Controller
            name="course"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <FormControl variant="standard" sx={{ m: 1, minWidth: 360 }}>
                <InputLabel id="course-label">Name of the course</InputLabel>
                <Select labelId="course-label" {...field} fullWidth>
                  {filteredCourses.map((course) => (
                    <MenuItem key={course} value={course}>
                      {course}
                    </MenuItem>
                  ))}
                </Select>
                {errors.course && (
                  <span style={{ fontSize: "0.6rem", color: "red" }}>
                    {errors.course.message}
                  </span>
                )}
              </FormControl>
            )}
          />

          <Box sx={{ mb: 2 }}>
            <div>
              <Button
                variant="contained"
                type="submit"
                style={{ background: "#FFC801" }}
                sx={{ mt: 1, mr: 1 }}
              >
                Continue
              </Button>
            </div>
          </Box>
        </Box>
      ),
    },
    {
      label: "Add number of subjects",
      description: "Add the number of subjects for the current course",
      formComponent: (
        <Box p={2}>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 260 }}>
            <InputLabel id="demo-simple-select-filled-label">
              Number of subjects
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              value={numberofSubjects}
              onChange={handleNoOfSubjects}
              fullWidth
            >
              {[...Array(6)].map((_, index) => (
                <MenuItem key={index + 2} value={index + 2}>
                  {index + 2}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {[...Array(numberofSubjects)].map((_, index) => (
            <TextField
              label={`Subject ${index + 1} Name`}
              fullWidth
              onChange={(e) => handleSubjectNameChange(index, e.target.value)}
              value={numberofSubjects[index]}
              sx={{ mt: 2 }}
            />
          ))}
          <Box sx={{ mb: 2 }}>
            <div>
              <Button
                variant="contained"
                type="submit"
                disabled={subjectNames.some((name) => name.trim() === "")}
                style={{ background: "#FFC801" }}
                onClick={() => CheckTeacherAvailability(numberofSubjects)}
                sx={{ mt: 1, mr: 1 }}
              >
                Continue
              </Button>

              <Button
                style={{ color: "#FFC801" }}
                onClick={handleBack}
                sx={{ mt: 1, mr: 1 }}
              >
                Back
              </Button>
            </div>
          </Box>
        </Box>
      ),
    },
    {
      label: "Create an ad",
      description: `Select teachers for subjects ${subjectNames.map(
        (name) => " " + name
      )} orderwise`,
      formComponent: (
        <Box p={2}>
          <MultiSelect
            sendTheTeachers={getTheTeachersAndMapWithSubjects}
            noOfSubjects={numberofSubjects}
            teachers={teachers}
          />
          {LessTeachersAvailable ? (
            <span style={{ fontSize: "0.6rem", color: "red" }}>
              Less teachers available {`(Add new teachers)`}
            </span>
          ) : null}
          <div>
            {TeachsersSelected &&
            TeachsersSelected.length === numberofSubjects ? (
              <Button
                variant="contained"
                type="submit"
                style={{ background: "#FFC801" }}
                disabled={LessTeachersAvailable}
                sx={{ mt: 1, mr: 1 }}
              >
                Submit
              </Button>
            ) : (
              <Button
                variant="contained"
                type="submit"
                style={{ background: "#FFC801" }}
                disabled={true}
                sx={{ mt: 1, mr: 1 }}
              >
                Submit
              </Button>
            )}

            <Button
              style={{ color: "#FFC801" }}
              onClick={handleBack}
              sx={{ mt: 1, mr: 1 }}
            >
              Back
            </Button>
          </div>
        </Box>
      ),
    },
  ]

  const onSubmit = async (data) => {
    try {
      if (!errors.course) {
        handleNext()
      }
      let obj = {
        name: data.course,
        subjects: teachersAndSubs,
      }
      if (numberofSubjects == teachersAndSubs.length) {
        const response = await api.post("/api/user/create-course", obj)
        toast.success("Course created successfully!")
        console.log(response)
      }
    } catch (error) {
      toast.error("Failed to create course. Please try again.")
      console.error("Error creating course:", error.message)
    }
  }

  return (
    <Box sx={{ maxWidth: 400 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Last step</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                {step.formComponent}
              </form>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  )
}
