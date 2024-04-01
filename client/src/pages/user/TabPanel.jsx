import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import PropTypes from "prop-types"
import { useTheme } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import {
  IconCertificate,
  IconTableImport,
  IconSchool,
  IconChalkboard,
  IconBaguette,
} from "@tabler/icons"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  FormControl,
  Select,
} from "@mui/material"
import { SubmitButton } from "@pages/auth/common"
import TablePagination from "@mui/material/TablePagination"
import Modal from "@mui/material/Modal"
import AddTeachers from "./AddTeachers"
import useAxiosPrivate from "@hooks/useAxiosPrivate"
import AddRoom from "./AddRoom"
import Grid from "@mui/material/Grid"
import graduated from "@assets/images/graduated.jpg"
import AddCourse from "./AddCourse"
import Generate from "./Generate"
import toast from "react-hot-toast"
import AuthContext from "@contexts/AuthContext"

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
}

function Item(props) {
  const { sx, ...other } = props
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#fff",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        p: 1,
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  )
}

function Item1(props) {
  const { sx, ...other } = props
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end", // Align items to the end
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#fff",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        p: 1,
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  )
}

Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])
    ),
    PropTypes.func,
    PropTypes.object,
  ]),
}

export default function FullWidthTabs() {
  const { user } = React.useContext(AuthContext)

  const theme = useTheme()
  const [value, setValue] = React.useState(0)

  const [filter, setFilter] = useState("")
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = (index) => {
    setValue(index)
  }

  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [totalPages, setTotalPages] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [teachers, setTeachers] = useState([])
  const api = useAxiosPrivate()

  const filteredTeachers = teachers.filter((user) =>
    user.name.toLowerCase().includes(filter.toLowerCase())
  )

  const fetchData = async (pageno, rowsPerPagesent) => {
    const response = await api.get(
      `http://localhost:4000/api/user/fetch-teachers?page=${
        pageno + 1
      }&pageSize=${rowsPerPagesent}&userId=${user.userId}`
    )
    const data = response.data

    setTotalPages(data?.totalPages)
    setTeachers(data?.teachers)
    setTotalCount(data?.totalCount)
  }
  const fetchDataClasses = async () => {
    const response = await api.get(
      `http://localhost:4000/api/user/fetch-rooms?page=${
        pageforclass + 1
      }&pageSize=${rowsPerPageforclass}&userId=${user.userId}`
    )
    const data = response.data
    console.log(data)
    setTotalPagesforClasses(data?.totalPages)
    setRooms(data?.rooms)
    setTotalCountforClasses(data?.totalCount)
  }
  const GetTeachers = () => {
    fetchData(page, rowsPerPage)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
    fetchData(newPage, rowsPerPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  }
  const [openAddTeacher, setOpenAddTeacher] = React.useState(false)
  const handleAddUserOpen = () => setOpenAddTeacher(true)
  const handleAddUserClose = () => setOpenAddTeacher(false)

  const [openAddRoom, setOpenAddRoom] = React.useState(false)
  const handleAddRoomOpen = () => setOpenAddRoom(true)
  const handleAddRoomClose = () => setOpenAddRoom(false)

  const [rooms, setRooms] = useState([])
  const [totalPagesforClasses, setTotalPagesforClasses] = useState(0)
  const [totalCountforClasses, setTotalCountforClasses] = useState(0)

  const [pageforclass, setPageforclass] = React.useState(0)
  const [rowsPerPageforclass, setRowsPerPageforclass] = React.useState(5)

  const handleChangePageForClasses = (event, newPage) => {
    setPageforclass(newPage)
  }

  const handleChangeRowsPerPageForClasses = (event) => {
    setRowsPerPageforclass(+event.target.value)
    setPageforclass(0)
  }

  React.useEffect(() => {
    fetchDataClasses()
    GetTeachers()
  }, [pageforclass, rowsPerPageforclass, openAddTeacher, openAddRoom])

  const teacherCreatedConfirmation = (data) => {
    if (data) {
      handleAddUserClose()
    }
  }

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab icon={<IconChalkboard />} label="Add Class Room" />
        <Tab onClick={GetTeachers} icon={<IconSchool />} label="Add Teacher" />
        <Tab icon={<IconCertificate />} label="Add Course" />
        <Tab icon={<IconTableImport />} label="Create time table" />
      </Tabs>
      <TabPanel value={value} index={0} dir={theme.direction}>
        <Box
          sx={{
            display: "grid",
            gridAutoColumns: "1fr",
            gap: 1,
            paddingBottom: 3,
          }}
        >
          <Item sx={{ gridRow: "1", gridColumn: "span 2" }}></Item>
          <Item1 sx={{ gridRow: "1", gridColumn: "4 / 5" }}>
            <SubmitButton onClick={handleAddRoomOpen}>Add Room</SubmitButton>
          </Item1>
        </Box>
        <Modal
          open={openAddRoom}
          onClose={handleAddRoomClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddRoom handleAddRoomClose={handleAddRoomClose} get />
          </Box>
        </Modal>
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ backgroundColor: "#fde6b3", color: "white" }}>
              <TableRow>
                <TableCell>Room id</TableCell>
                <TableCell>Room number</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rooms.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell>{row._id}</TableCell>
                    <TableCell>{row.roomNumber}</TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => {
                          console.log(row._id)
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={async () => {
                          const response = await api.delete(
                            "/api/user/delete-room",
                            {
                              data: {
                                id: row._id,
                              },
                            }
                          )
                          fetchDataClasses()
                          toast.success("Room Deleted successfully")
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={pageforclass}
          onPageChange={handleChangePageForClasses}
          onRowsPerPageChange={handleChangeRowsPerPageForClasses}
        />
      </TabPanel>
      <TabPanel value={value} index={1} dir={theme.direction}>
        <Box
          sx={{
            display: "grid",
            gridAutoColumns: "1fr",
            gap: 1,
            paddingBottom: 3,
          }}
        >
          <Item sx={{ gridRow: "1", gridColumn: "span 2" }}>
            <TextField
              hiddenLabel
              id="filled-hidden-label-small"
              placeholder="Search by name"
              variant="outlined"
              size="small"
              onChange={(e) => setFilter(e.target.value)}
            />
          </Item>
          <Item1 sx={{ gridRow: "1", gridColumn: "4 / 5" }}>
            <SubmitButton onClick={handleAddUserOpen}>Add teacher</SubmitButton>
          </Item1>
        </Box>
        <Modal
          open={openAddTeacher}
          onClose={handleAddUserClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddTeachers
              handleAddUserClose={handleAddUserClose}
              getConfirmation={teacherCreatedConfirmation}
            />
          </Box>
        </Modal>
        <TableContainer component={Paper}>
          <Table>
            <TableHead style={{ backgroundColor: "#fde6b3", fontWeight: 700 }}>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Phonenumber</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTeachers.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.status}</TableCell>
                    <TableCell>{row.location}</TableCell>
                    <TableCell>{row.phoneNumber}</TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => {
                          console.log(row._id)
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={async () => {
                          const response = await api.delete(
                            "/api/user/delete-teacher",
                            {
                              data: {
                                id: row._id,
                              },
                            }
                          )
                          fetchData()
                          toast.success("Teacher deleted successfully")
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5]}
          component="div"
          count={totalCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TabPanel>
      <TabPanel value={value} index={2} dir={theme.direction}>
        <Box display="flex" justifyContent="center" p={2}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <img
                src={graduated}
                alt="Your Image"
                style={{
                  maxWidth: "80%",
                  height: "auto",
                  display: "block",
                  marginLeft: "auto",
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <AddCourse />
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={3} dir={theme.direction}>
        <Box display="flex" justifyContent="center" p={2}>
          <Generate />
        </Box>
      </TabPanel>
    </Box>
  )
}
