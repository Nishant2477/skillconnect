const express = require("express");

const {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
} = require("../controllers/courseController");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/rolemiddleware");

const router = express.Router();

// Public routes
router.get("/", getCourses);
router.get("/:id", getCourseById);

// Instructor and admin routes
router.post(
    "/",
    authMiddleware,
    authorizeRoles("instructor", "admin"),
    createCourse
);

router.put(
    "/:id",
    authMiddleware,
    authorizeRoles("instructor", "admin"),
    updateCourse
);

router.delete(
    "/:id",
    authMiddleware,
    authorizeRoles("instructor", "admin"),
    deleteCourse
);

module.exports = router;