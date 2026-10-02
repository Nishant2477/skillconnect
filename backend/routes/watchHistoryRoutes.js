const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
    recordCourseWatch,
    getWatchHistory
} = require("../controllers/watchHistoryController");

const router = express.Router();

router.use(authMiddleware);
router.use(authorizeRoles("student"));

router.get("/", getWatchHistory);
router.post("/:courseId", recordCourseWatch);

module.exports = router;
