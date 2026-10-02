const mongoose = require("mongoose");
const Course = require("../Model/course");
const Enrollment = require("../Model/Enrollment");
const WatchHistory = require("../Model/WatchHistory");

async function recordCourseWatch(req, res) {
    try {
        const { courseId } = req.params;

        if (!mongoose.isValidObjectId(courseId)) {
            return res.status(400).json({ message: "Invalid course ID" });
        }

        const course = await Course.findById(courseId).select(
            "name instructor price category playlistUrl"
        );
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const enrollment = await Enrollment.findOne({
            student: req.user.userId,
            course: courseId,
            status: "active"
        });
        if (!enrollment) {
            return res.status(403).json({
                message: "Enroll in this course before watching it"
            });
        }

        const history = await WatchHistory.findOneAndUpdate(
            { student: req.user.userId, course: courseId },
            { lastWatchedAt: new Date() },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        ).populate("course", "name instructor price category playlistUrl");

        res.status(200).json({ history });
    } catch (error) {
        res.status(500).json({
            message: "Failed to record watch history",
            error: error.message
        });
    }
}

async function getWatchHistory(req, res) {
    try {
        const history = await WatchHistory.find({
            student: req.user.userId
        })
            .populate("course", "name instructor price category playlistUrl")
            .sort({ lastWatchedAt: -1 });

        res.status(200).json({ count: history.length, history });
    } catch (error) {
        res.status(500).json({
            message: "Failed to load watch history",
            error: error.message
        });
    }
}

module.exports = {
    recordCourseWatch,
    getWatchHistory
};
