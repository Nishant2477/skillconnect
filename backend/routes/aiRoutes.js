const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/rolemiddleware");

const {
    askCourseQuestion,
    analyzeCourseVideo
} = require("../controllers/aiController");

const router = express.Router();

// Ask an AI question about an enrolled course
router.post(
    "/course/:courseId/ask",
    authMiddleware,
    authorizeRoles("student"),
    askCourseQuestion
);

router.post(
    "/course/:courseId/analyze-video",
    authMiddleware,
    authorizeRoles("student"),
    analyzeCourseVideo
);

module.exports = router;