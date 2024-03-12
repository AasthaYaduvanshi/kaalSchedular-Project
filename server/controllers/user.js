const Auth = require("../models/Auth");
const Teacher = require("../models/Teachers")
const Room = require("../models/Rooms")
const Course = require("../models/Course")
const Assigned = require("../models/AssignedNumbers")
const profile = async (req, res, next) => {
  try {
    const user = req.user;

    const data = await Auth.findOne({ userName: user.userName }).select(
      "name email"
    );

    return res.json(data);
  } catch (error) {
    next(error);
  }
};

const createTeacher = async (req, res, next) => {
  try {
    const teacherData = req.body;

    const newTeacher = await Teacher.create(teacherData);

    return res.status(200).json({
      success: true,
      message: "Teacher created successfully",
      teacher: newTeacher
    });

  } catch (error) {
    // Handle errors
    console.error("Error creating teacher:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create teacher",
      error: error.message
    });
  }
};

const GetTeaachersByPage = async (req, res, next) => {
  try {
    const { page, pageSize } = req.query;
    const pageNumber = parseInt(page) || 1;
    const limit = parseInt(pageSize) || 5;

    const totalCount = await Teacher.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    const teachers = await Teacher.find()
      .skip((pageNumber - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      teachers,
      totalPages,
      currentPage: pageNumber,
      totalCount
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const CreateRoom = async (req, res, next) => {
  try {
    const { roomNumber } = req.body;

    const existingRoom = await Room.findOne({ roomNumber });

    if (existingRoom) {
      return res.status(409).json({
        success: false,
        message: `Room with room number ${roomNumber} already exists`
      });
    }
    const newRoom = await Room.create({ roomNumber });


    return res.status(200).json({
      success: true,
      message: "Room created successfully",
      room: newRoom
    });
  } catch (error) {
    const errorMessage = error && error.message ? error.message : 'An error occurred';

    console.error("Error creating room:", error);
    return res.status(500).json({
      success: false,
      message: errorMessage
    });
  }
};

const GetRoomsByPage = async (req, res, next) => {
  try {
    const { page, pageSize } = req.query;
    const pageNumber = parseInt(page) || 1;
    const limit = parseInt(pageSize) || 5;

    const totalCount = await Room.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    const rooms = await Room.find()
      .skip((pageNumber - 1) * limit)
      .limit(limit);

    return res.status(200).json({
      rooms,
      totalPages,
      currentPage: pageNumber,
      totalCount
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const FetchAllTeachers = async (req, res, next) => {
  try {
    const teachers = await Teacher.find({});

    const modifiedTeachers = [];
    for (const teacher of teachers) {
      const assignedTeacher = await Assigned.findOne({ teacherName: teacher.name });

      // Check if the teacher is assigned to two subjects
      let isAssignedToTwoSubjects = false; // Default value

      if (assignedTeacher) {
        isAssignedToTwoSubjects = assignedTeacher.assignedSubjects === 2;
      }

      const modifiedTeacher = {
        ...teacher.toObject(),
        isAssignedToTwoSubjects
      };

      modifiedTeachers.push(modifiedTeacher);
    }

    const totalCount = modifiedTeachers.length;

    return res.status(200).json({
      teachers: modifiedTeachers,
      totalCount
    });
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  }
};


const createCourse = async (req, res) => {
  try {
    const { name, subjects } = req.body;
    const newCourse = await Course.create({ name, subjects });

    for (const subject of subjects) {
      const { teacher } = subject;
      let assignedTeacher = await Assigned.findOne({ teacherName: teacher });
      if (assignedTeacher) {
        assignedTeacher.assignedSubjects += 1;
      } else {
        assignedTeacher = await Assigned.create({ teacherName: teacher, assignedSubjects: 1 });
      }
      await assignedTeacher.save();
    }

    return res.status(201).json(newCourse);
  } catch (error) {
    console.log(error.message)
    return res.status(400).json({ message: error.message });
  }
};



const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().lean();
    return res.status(200).json({ courses });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


const GetAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    return res.status(200).json({ rooms });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

const GetFilteredCourses = async (req, res, next) => {
  try {
    const allCourses = await Course.find({}, 'name');

    const availableCourses = [
      "B.Tech. Computer Science And Engineering (Block Chain)",
      "B.Tech. Civil Engineering",
      "B.Tech. Mechanical Engineering",
      "B.Tech. Electrical Engineering",
      "B.Tech. Electronics & Communication Engineering",
      "B.Tech. Computer Science and Engineering",
      "B.Tech Internet of Things (IoT)",
      "B.Tech Artificial Intelligence and Data Science",
      "B.Tech Information Technology"
    ];

    const existingCourses = allCourses.map(course => course.name);

    const filteredCourses = availableCourses.filter(course => !existingCourses.includes(course));

    return res.json({ filteredCourses });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const courseId = req.query.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    const teachers = course.subjects.map(subject => subject.teacher);

    await Assigned.updateMany({ teacher: { $in: teachers } }, { assignedSubjects: 1 });

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({ success: true, message: "Course deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};



module.exports = { profile, createTeacher, GetTeaachersByPage, CreateRoom, GetRoomsByPage, FetchAllTeachers, createCourse, deleteCourse, GetFilteredCourses, getAllCourses, GetAllRooms };
