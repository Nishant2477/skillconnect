const express = require("express");

const {
    createLesson,
    getCourseLessons,
    getLessonById,
    publishLesson
} = require("../controllers/lessonController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// All lesson routes require login
router.use(authMiddleware);

// Instructors and admins can create lessons
router.post(
    "/course/:courseId",
    authorizeRoles("instructor", "admin"),
    createLesson
);

// Logged-in users can request course lessons;
// controller checks enrollment or course ownership
router.get(
    "/course/:courseId",
    getCourseLessons
);

// Access to an individual lesson is checked in the controller
router.get(
    "/:lessonId",
    getLessonById
);

// Instructors and admins can publish lessons
router.patch(
    "/:lessonId/publish",
    authorizeRoles("instructor", "admin"),
    publishLesson
);

module.exports = router;