import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Select from '@mui/material/Select'
import createTable from '@assets/images/createTable.jpg'
import useAxiosPrivate from '@hooks/useAxiosPrivate'
import FormControl from '@mui/material/FormControl'
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { SubmitButton } from '@pages/auth/common'
import Table from '@mui/material/Table'
import Paper from '@mui/material/Paper'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import '@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css';
import 'react-calendar/dist/Calendar.css';
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton'
import TableRow from '@mui/material/TableRow'
import { IconArrowBigUpLine, IconArrowBigDownLine } from '@tabler/icons'
import toast from 'react-hot-toast'
import { IconTrash } from '@tabler/icons';
export default function Generate() {

  const api = useAxiosPrivate()
  const [courses, Setcourses] = useState([])
  const [rooms, setRooms] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await api.get('/api/user/get-courses')
      Setcourses(response?.data?.courses)
      setFirstSelectValue(response?.data?.courses[0]?.name)
    }
    fetchCourses()
  }, [])

  useEffect(() => {
    const fetchRooms = async () => {
      const response = await api.get('/api/user/get-all-rooms')
      setRooms(response.data.rooms)
    }
    fetchRooms()
  }, [])



  const [selectedRooms, setSelectedRooms] = useState(new Array(courses.length).fill(''));
  const [showTts, setShowTts] = useState(null)
  const [timetables, setTimetables] = useState({});
  const handleRoomSelect = (index) => (event) => {
    const newSelectedRooms = [...selectedRooms];
    newSelectedRooms[index] = event.target.value;
    setSelectedRooms(newSelectedRooms);
  };

  const [lecturesPerDay, setLecturesPerDay] = useState(4);

  const handleChange = (event) => {
    let newValue = parseInt(event.target.value);
    if (!isNaN(newValue) && newValue > 3) {
      setLecturesPerDay(newValue);
    }
  };

  const [roomDateRanges, setRoomDateRanges] = useState([]);
  const [breakRoomName, setBreakRoomName] = useState('')
  const handleDateRangeChange = (courseName, index) => (newDateRange) => {
    setRoomDateRanges(prevRoomDateRanges => {
      const updatedRoomDateRanges = [...prevRoomDateRanges];
      updatedRoomDateRanges[index] = {
        courseName: courseName,
        dateRange: newDateRange
      };
      return updatedRoomDateRanges;
    });
  };
  function getDatesInInterval(roomDateRanges) {
    const datesByInterval = [];

    roomDateRanges.forEach(room => {
      const startDate = new Date(room.dateRange[0]);
      const endDate = new Date(room.dateRange[1]);
      const currentDate = new Date(startDate);
      const dates = [];

      while (currentDate <= endDate) {
        const formattedDate = currentDate.toISOString().split('T')[0];
        dates.push(formattedDate);
        currentDate.setDate(currentDate.getDate() + 1);
      }

      datesByInterval.push(dates);
    });

    for (var j = 0; j < datesByInterval.length; j++) {
      let timetable = GenerateFunction(courses, selectedRooms, datesByInterval[j]);
      let courseName = roomDateRanges[j].courseName;
      let obj = {
        [courseName]: timetable[courseName]
      };

      setTimetables(prevTimetables => ({
        ...prevTimetables,
        ...obj
      }));
      setShowTts(true)
    }
  }


  function GenerateFunction(courses, selectedRooms, days) {
    const timetables = {};


    courses.forEach(course => {
      const timetable = {};
      days.forEach(day => {
        timetable[day] = [];
      });
      timetables[course.name] = timetable;
    });


    const teacherAvailability = {};
    courses.forEach(course => {
      course.subjects.forEach(subject => {
        teacherAvailability[subject.teacher] = {};
        days.forEach(day => {
          teacherAvailability[subject.teacher][day] = new Array(course.subjects.length).fill(false);
        });
      });
    });


    days.forEach(day => {

      const shuffledCourses = courses.sort(() => Math.random() - 0.5);

      shuffledCourses.forEach(course => {
        const availableSubjects = [...course.subjects];

        for (let i = 0; i < course.subjects.length; i++) {
          const subjectIndex = Math.floor(Math.random() * availableSubjects.length);
          const subject = availableSubjects.splice(subjectIndex, 1)[0];

          const room = selectedRooms[Math.floor(Math.random() * selectedRooms.length)];

          let teacher = subject.teacher;
          let tries = 0;
          while (teacherAvailability[teacher][day][i]) {
            const otherTeachers = Object.keys(teacherAvailability).filter(t => t !== teacher);
            teacher = otherTeachers[Math.floor(Math.random() * otherTeachers.length)];
            tries++;
            if (tries >= otherTeachers.length) {

              teacher = otherTeachers[Math.floor(Math.random() * otherTeachers.length)];
              break;
            }
          }

          teacherAvailability[teacher][day][i] = true;
          timetables[course.name][day].push({
            subject: subject.name,
            teacher: teacher,
            room: room
          });
        }
      });
    });



    Object.values(timetables).forEach(course => {
      Object.entries(course).forEach(([day, lectures]) => {
        const numLectures = lectures.length;
        let startTime = 9;

        for (let i = 0; i < numLectures; i++) {
          const endTime = startTime + 1;
          course[day][i].timeSlot = {
            start: `${startTime < 12 ? startTime : startTime - 12}:00 ${startTime < 12 ? 'AM' : 'PM'}`,
            end: `${endTime < 12 ? endTime : endTime - 12}:00 ${endTime < 12 ? 'AM' : 'PM'}`
          };
          startTime += 1;
          if (startTime >= 12) startTime -= 12;
        }
      });
    });

    /*     setTimetables(timetables)
        setShowTts(true) */
    return timetables
  }

  const [anchor, setAnchor] = React.useState(null);
  const handleClick = (event, i, courseName) => {
    setBreakRoomName(courseName)
    let course = courses.find(course => course.name === courseName);
    if (i == 0 || i == course?.subjects?.length - 1) {
      toast.error('Cannot add lunch break at this position')
      return;
    }
    setLunchBreakPosition(i)
    setAnchor(anchor ? null : event.currentTarget);
  };

  const [lunchBreakPosition, setLunchBreakPosition] = useState(null);
  const [lunchBreakOpen, setLunchBreakOpen] = useState(false);

  const handleMoveLunchBreak = (direction, position) => {

    const newTimetables = { ...timetables };

    for (const date in newTimetables[breakRoomName]) {
      const dateArray = newTimetables[breakRoomName][date];

      if (direction === 'up') {
        if (position > 0 && position <= dateArray.length) {
          dateArray.splice(position, 0, {
            subject: "Lunch Break",
            teacher: "N/A",
            timeSlot: {
              start: "12:00 PM",
              end: "1:00 PM"
            }
          });
        } else {
          console.log("Invalid position");
        }
      } else if (direction === 'down') {
        if (position >= 0 && position < dateArray.length) {
          dateArray.splice(position + 1, 0, {
            subject: "Lunch Break",
            teacher: "N/A",
            timeSlot: {
              start: "12:00 PM",
              end: "1:00 PM"
            }
          });
        } else {
          console.log("Invalid position");
        }
      } else {
        console.log("Invalid direction");
      }
    }

    console.log(newTimetables);

    Object.values(newTimetables).forEach(course => {
      Object.entries(course).forEach(([day, lectures]) => {
        const numLectures = lectures.length;
        let startTime = 9;

        for (let i = 0; i < numLectures; i++) {
          const endTime = startTime + 1;
          course[day][i].timeSlot = {
            start: `${startTime < 12 ? startTime : startTime - 12}:00 ${startTime < 12 ? 'AM' : 'PM'}`,
            end: `${endTime < 12 ? endTime : endTime - 12}:00 ${endTime < 12 ? 'AM' : 'PM'}`
          };
          startTime += 1;
          if (startTime >= 12) startTime -= 12;
        }
      });
    });
    setTimetables({ ...newTimetables });
  };


  const open = Boolean(anchor);
  const id = open ? 'simple-popper' : undefined;

  const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };

  const blue = {
    200: '#99CCFF',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E5',
    700: '#0066CC',
  };
  const PopupBody = styled('div')(
    ({ theme }) => `
    width: max-content;
    padding: 12px 16px;
    margin: 8px;
    border-radius: 8px;
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    box-shadow: ${theme.palette.mode === 'dark'
        ? `0px 4px 8px rgb(0 0 0 / 0.7)`
        : `0px 4px 8px rgb(0 0 0 / 0.1)`
      };
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    font-size: 0.875rem;
    z-index: 1;
  `,
  );

  const handleDeleteCourse = async (course) => {
    try {
      let filteredCourses = courses.filter(a => a.name !== course.name)
      Setcourses(filteredCourses)
      const response = await api.delete(`/api/user/delete-course?id=${course._id}`);
      if (response?.data?.success) {
        toast.success(response.data.message);
      } else {
        console.log(response)
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (showTts) ? (
    <div>
      {Object.entries(timetables).map(([courseName, timetable]) => {
        const maxLectures = Math.max(...Object.values(timetable).map(day => day.length));

        return (
          <div key={courseName}>
            <h2>{courseName}</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Time Slot</TableCell>
                    {Object.keys(timetable).map(day => (
                      <TableCell key={day}>{day}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[...Array(maxLectures).keys()].map((hour, i) => (
                    <TableRow key={hour}>
                      <TableCell onClick={(e) => handleClick(e, i, courseName)}>
                        <EditText
                          name="textbox1"
                          defaultValue={`${9 + hour}:00 AM - ${10 + hour}:00 AM`}
                          inputClassName='bg-success'
                        />
                      </TableCell>
                      <BasePopup id={id} open={open} anchor={anchor}>
                        <PopupBody>
                          <Typography>
                            Add lunch break
                          </Typography>
                          <Box flexDirection={'row'} alignItems={'center'} justifyContent={'center'}>
                            <IconButton onClick={() => handleMoveLunchBreak('up', lunchBreakPosition)}><IconArrowBigUpLine /></IconButton>
                            <IconButton onClick={() => handleMoveLunchBreak('down', lunchBreakPosition)}><IconArrowBigDownLine /></IconButton>
                          </Box>
                        </PopupBody>
                      </BasePopup>
                      {Object.keys(timetable).map(day => {
                        const lecturesForDayAndTimeSlot = timetable[day].filter(lecture =>
                          parseInt(lecture.timeSlot.start) === (9 + hour) % 12 && parseInt(lecture.timeSlot.end) === (10 + hour) % 12
                        );
                        return (
                          <TableCell key={day}>
                            <ul>
                              {lecturesForDayAndTimeSlot.map((lecture, index) => (
                                <li key={index}>
                                  {lecture.subject} ({lecture.teacher})
                                </li>
                              ))}
                              {lecturesForDayAndTimeSlot.length === 0 && <div>&nbsp;</div>}
                            </ul>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        );
      })}
    </div>
  ) : (
    <Grid container spacing={2} flexDirection={'row'} alignItems="center" justifyContent="center">
      <Grid item xs={6} container flexDirection={'column'} alignItems="center" justifyContent="space-between">
        <div style={{ textAlign: 'center' }}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Generate/Schedule
          </Typography>
          <Typography color={'#f3ac12'} variant="h4" fontWeight={600} gutterBottom>
            TimeTables
          </Typography>
          {
            courses.length > 0 ? (
              courses.map((course, i) => (
                <div key={i} style={{ paddingTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                    <Typography variant="h6">{course.name}</Typography>
                    <IconButton style={{background:'#FDE6B3', borderRadius:'100px', padding:2}} aria-label="delete" onClick={() => handleDeleteCourse(course)}>
                      <IconTrash />
                    </IconButton>
                  </div>
                  <div style={{ display: 'flex', marginTop: '10px', width: '100%', justifyContent: 'center' }}>
                    <FormControl style={{ minWidth: 200, marginRight: 10 }}>
                      <InputLabel id={`room-select-label-${i}`}>Select Room</InputLabel>
                      <Select
                        labelId={`room-select-label-${i}`}
                        id={`room-select-${i}`}
                        label="Select Room"
                        value={selectedRooms[i]}
                        onChange={handleRoomSelect(i)}
                      >
                        {rooms.map((room, j) => (
                          <MenuItem key={j} value={room.roomNumber}>{room.roomNumber}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <DateRangePicker
                      key={i}
                      onChange={handleDateRangeChange(course.name, i)}
                      value={roomDateRanges[i]?.dateRange}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div>
                <Typography variant="h6">No courses available</Typography>
              </div>
            )
          }
        </div>
        {
          courses.length > 0 ? (
            <Box sx={{ mb: 2, mt: 6 }}>
              <div>
                <SubmitButton
                  variant="contained"
                  onClick={() => { getDatesInInterval(roomDateRanges) }}
                >
                  Generate
                </SubmitButton>
              </div>
            </Box>
          ) : (null)
        }

      </Grid>
    </Grid>



  )
}
