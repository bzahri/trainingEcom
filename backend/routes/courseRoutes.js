const express = require("express");
const {
  createCourse,
  getCourseById,
  getAllCourses,
  updateCourse,
  deleteCourse,
  publishCourse,
  enrollStudent,
  unenrollStudent,
  getUserCourses,
  getCourseStudents
} = require("../controllers/courseController");
const { authMiddleware,adminMiddleware } = require('../middlewares/authMiddleware'); // Middleware d'authentification

const router = express.Router();

router.post("/", createCourse);
router.get("/", getAllCourses);
router.get("/mycourses",authMiddleware, getUserCourses);
router.get("/:id", getCourseById);
router.put("/:id", updateCourse);
router.get("/:courseId/students", getCourseStudents);
router.delete("/:id", deleteCourse);
router.patch("/:id/publish", publishCourse);
router.post("/enroll",authMiddleware, enrollStudent);
router.post("/:id/unenroll", unenrollStudent);

module.exports = router;
