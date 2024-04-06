const Auth = require("../models/Auth")
const Teacher = require("../models/Teachers")
const Room = require("../models/Rooms")
const Course = require("../models/Course")
const Assigned = require("../models/AssignedNumbers")
const config = require("../config")
const nodemailer = require("nodemailer")
// const mailer = require("../utils/nodeMailer")

const profile = async (req, res, next) => {
  try {
    const user = req.user

    const data = await Auth.findOne({ userName: user.userName }).select(
      "name email"
    )

    return res.json(data)
  } catch (error) {
    next(error)
  }
}

const createTeacher = async (req, res, next) => {
  try {
    console.log(req.body)
    const { teacherData, userId } = req.body
    const { name, status, location, phoneNumber } = teacherData

    const newTeacher = await Teacher.create({
      name,
      status,
      location,
      phoneNumber,
      userId,
    })

    return res.status(200).json({
      success: true,
      message: "Teacher created successfully",
      teacher: newTeacher,
    })
  } catch (error) {
    // Handle errors
    console.error("Error creating teacher:", error)
    return res.status(500).json({
      success: false,
      message: "Failed to create teacher",
      error: error.message,
    })
  }
}

const deleteTeacher = async (req, res, next) => {
  try {
    const { id } = await req.body

    const response = await Teacher.findByIdAndDelete({ _id: id })
    console.log(response)
    if (!response) return res.status(400).json("Teacher not found")

    return res.status(200).json("deleted successfully")
  } catch (error) {
    console.log("Error deleting teacher:", error)
    return res.status(500).json("Internal server error")
  }
}

const GetTeaachersByPage = async (req, res, next) => {
  try {
    const { page, pageSize, userId } = req.query
    const pageNumber = parseInt(page) || 1
    const limit = parseInt(pageSize) || 5

    const totalCount = await Teacher.countDocuments()
    const totalPages = Math.ceil(totalCount / limit)

    const teachers = await Teacher.find({ userId: userId })
      .skip((pageNumber - 1) * limit)
      .limit(limit)

    return res.status(200).json({
      teachers,
      totalPages,
      currentPage: pageNumber,
      totalCount,
    })
  } catch (error) {
    console.error("Error fetching properties:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

const CreateRoom = async (req, res, next) => {
  try {
    const { roomNumber, userId } = req.body

    const existingRoom = await Room.findOne({
      roomNumber: roomNumber,
      userId: userId,
    })

    if (existingRoom) {
      return res.status(409).json({
        success: false,
        message: `Room with room number ${roomNumber} already exists`,
      })
    }
    const newRoom = await Room.create({ roomNumber, userId })

    return res.status(200).json({
      success: true,
      message: "Room created successfully",
      room: newRoom,
    })
  } catch (error) {
    const errorMessage =
      error && error.message ? error.message : "An error occurred"

    console.error("Error creating room:", error)
    return res.status(500).json({
      success: false,
      message: errorMessage,
    })
  }
}
const DeleteRoom = async (req, res, next) => {
  try {
    const { id } = await req.body

    const response = await Room.findByIdAndDelete({ _id: id })
    console.log(response)
    if (!response) return res.status(400).json("Room not found")

    return res.status(200).json("deleted successfully")
  } catch (error) {
    console.log("Error deleting room:", error)
    return res.status(500).json("Internal server error")
  }
}

const GetRoomsByPage = async (req, res, next) => {
  try {
    const { page, pageSize, userId } = req.query
    const pageNumber = parseInt(page) || 1
    const limit = parseInt(pageSize) || 5

    const totalCount = await Room.countDocuments()
    const totalPages = Math.ceil(totalCount / limit)

    const rooms = await Room.find({ userId })
      .skip((pageNumber - 1) * limit)
      .limit(limit)

    return res.status(200).json({
      rooms,
      totalPages,
      currentPage: pageNumber,
      totalCount,
    })
  } catch (error) {
    console.error("Error fetching properties:", error)
    res.status(500).json({ error: "Internal server error" })
  }
}

const FetchAllTeachers = async (req, res, next) => {
  const { userId } = req.query
  try {
    const teachers = await Teacher.find({ userId: userId })

    const modifiedTeachers = []
    for (const teacher of teachers) {
      const assignedTeacher = await Assigned.findOne({
        teacherName: teacher.name,
        userId: userId,
      })

      // Check if the teacher is assigned to two subjects
      let isAssignedToTwoSubjects = false // Default value

      if (assignedTeacher) {
        isAssignedToTwoSubjects = assignedTeacher.assignedSubjects === 2
      }

      const modifiedTeacher = {
        ...teacher.toObject(),
        isAssignedToTwoSubjects,
      }

      modifiedTeachers.push(modifiedTeacher)
    }

    const totalCount = modifiedTeachers.length

    return res.status(200).json({
      teachers: modifiedTeachers,
      totalCount,
    })
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" })
  }
}

const createCourse = async (req, res) => {
  try {
    const { name, subjects } = req.body
    const newCourse = await Course.create({ name, subjects })

    for (const subject of subjects) {
      const { teacher } = subject
      let assignedTeacher = await Assigned.findOne({ teacherName: teacher })
      if (assignedTeacher) {
        assignedTeacher.assignedSubjects += 1
      } else {
        assignedTeacher = await Assigned.create({
          teacherName: teacher,
          assignedSubjects: 1,
        })
      }
      await assignedTeacher.save()
    }

    return res.status(201).json(newCourse)
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({ message: error.message })
  }
}

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().lean()
    return res.status(200).json({ courses })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const GetAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({})
    return res.status(200).json({ rooms })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const GetFilteredCourses = async (req, res, next) => {
  try {
    const allCourses = await Course.find({}, "name")

    const availableCourses = [
      "B.Tech. Computer Science And Engineering (Block Chain)",
      "B.Tech. Civil Engineering",
      "B.Tech. Mechanical Engineering",
      "B.Tech. Electrical Engineering",
      "B.Tech. Electronics & Communication Engineering",
      "B.Tech. Computer Science and Engineering",
      "B.Tech Internet of Things (IoT)",
      "B.Tech Artificial Intelligence and Data Science",
      "B.Tech Information Technology",
    ]

    const existingCourses = allCourses.map((course) => course.name)

    const filteredCourses = availableCourses.filter(
      (course) => !existingCourses.includes(course)
    )

    return res.json({ filteredCourses })
  } catch (error) {
    console.error("Error:", error)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

const deleteCourse = async (req, res, next) => {
  try {
    const courseId = req.query.id

    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    const teachers = course.subjects.map((subject) => subject.teacher)

    await Assigned.updateMany(
      { teacher: { $in: teachers } },
      { assignedSubjects: 1 }
    )

    await Course.findByIdAndDelete(courseId)

    return res
      .status(200)
      .json({ success: true, message: "Course deleted successfully" })
  } catch (error) {
    console.error("Error:", error)
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" })
  }
}

const createContact = async (req, res, next) => {
  const { name, email, message } = await req.body
  try {
    // console.log("fdsofhsdifhi")
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.NODEMAILER_USER, // host email address
        pass: process.env.NODEMAILER_APP_PASSWORD, // host app password(use app password, if don't have , got to google accout> enable two step verification>  go to app password and generate password)
      },
    })
    let info = await transporter.sendMail({
      from: '"Kaal Sheduler" <shuffled720@gmail.com>', // sender address
      to: `${email}`, // list of receivers email Id's
      subject: `Thanks for Contacting us,${name}`, // Subject line
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // plain text body
      html: `<b><h1>Hello ${name}</h1></b><h3>Your Query:</h3><p>${message}</p><p>reached to us</p><p>Thanks For Contacting Us</p><p>Regards Team KaalScheduler</p>`, // html body
    })
    console.log("Message sent: %s", info.messageId)

    // console.log(req.body)
    return res.status(200).json({ message: "Your message has been sent!" })
  } catch (error) {
    console.error("Error:", error)
    return res.status(500).json({ error: "Internal Server Error" })
  }
}

module.exports = {
  profile,
  createTeacher,
  deleteTeacher,
  GetTeaachersByPage,
  CreateRoom,
  DeleteRoom,
  GetRoomsByPage,
  FetchAllTeachers,
  createCourse,
  deleteCourse,
  GetFilteredCourses,
  getAllCourses,
  GetAllRooms,
  createContact,
}
