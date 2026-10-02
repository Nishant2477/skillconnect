const express = require("express");

const {
    enrollInCourse,
    getMyEnrollments,
    cancelEnrollment
} = require("../controllers/enrollmentController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// All enrollment routes require a logged-in student
router.use(authMiddleware);
router.use(authorizeRoles("student"));

// Enroll in a course
router.post("/:courseId", enrollInCourse);

// Get current student's enrollments
router.get("/my", getMyEnrollments);

// Cancel an enrollment
router.delete("/:courseId", cancelEnrollment);

module.exports = router;