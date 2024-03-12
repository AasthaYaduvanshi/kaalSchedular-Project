const { Router } = require("express");
const userController = require("../../controllers/user");

const router = Router();

router.use("/profile", userController.profile);

router.use("/create-teacher", userController.createTeacher)

router.use("/fetch-teachers", userController.GetTeaachersByPage)

router.use("/create-room", userController.CreateRoom)

router.use("/fetch-rooms", userController.GetRoomsByPage)

router.use('/fetch-all-teachers', userController.FetchAllTeachers)

router.use("/create-course", userController.createCourse)

router.use("/get-courses", userController.getAllCourses)

router.use("/get-all-rooms",userController.GetAllRooms)

router.use("/get-filtered-courses",userController.GetFilteredCourses)

router.use("/delete-course", userController.deleteCourse)


module.exports = router;
