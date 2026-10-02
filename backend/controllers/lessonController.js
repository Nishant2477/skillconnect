const mongoose = require("mongoose");
const Lesson = require("../Model/Lesson");
const Course = require("../Model/course");
const Enrollment = require("../Model/Enrollment");

function canManageCourse(course, user) {
    return (
        user.role === "admin" ||
        course.instructorId?.toString() === user.userId
    );
}

// Add a lesson to a course
const createLesson = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { title, description, videoUrl, duration, order } = req.body;

        if (!mongoose.isValidObjectId(courseId)) {
            return res.status(400).json({
                message: "Invalid course ID"
            });
        }

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        if (!canManageCourse(course, req.user)) {
            return res.status(403).json({
                message: "You cannot manage this course"
            });
        }

        if (!title || !videoUrl || !Number.isInteger(order) || order < 1) {
            return res.status(400).json({
                message: "Title, video URL, and a valid lesson order are required"
            });
        }

        const lesson = await Lesson.create({
            course: courseId,
            title,
            description,
            videoUrl,
            duration: Number(duration) || 0,
            order,
            isPublished: false
        });

        res.status(201).json({
            message: "Lesson created successfully",
            lesson
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "A lesson already exists at this order"
            });
        }

        res.status(500).json({
            message: "Failed to create lesson",
            error: error.message
        });
    }
};

// Get lessons for a course
const getCourseLessons = async (req, res) => {
    try {
        const { courseId } = req.params;

        if (!mongoose.isValidObjectId(courseId)) {
            return res.status(400).json({
                message: "Invalid course ID"
            });
        }

        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const user = req.user;
        const isManager = canManageCourse(course, user);

        if (!isManager) {
            const enrollment = await Enrollment.findOne({
                student: user.userId,
                course: courseId,
                status: "active"
            });

            if (!enrollment) {
                return res.status(403).json({
                    message: "Enroll in this course to access its lessons"
                });
            }
        }

        const filter = { course: courseId };

        // Students only see published lessons
        if (!isManager) {
            filter.isPublished = true;
        }

        const lessons = await Lesson.find(filter)
            .select("-videoUrl")
            .sort({ order: 1 });

        res.status(200).json({
            count: lessons.length,
            lessons
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to get lessons",
            error: error.message
        });
    }
};

// Get one lesson, including its video URL
const getLessonById = async (req, res) => {
    try {
        const { lessonId } = req.params;

        if (!mongoose.isValidObjectId(lessonId)) {
            return res.status(400).json({
                message: "Invalid lesson ID"
            });
        }

        const lesson = await Lesson.findById(lessonId);

        if (!lesson) {
            return res.status(404).json({
                message: "Lesson not found"
            });
        }

        const course = await Course.findById(lesson.course);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        const isManager = canManageCourse(course, req.user);

        if (!isManager) {
            const enrollment = await Enrollment.findOne({
                student: req.user.userId,
                course: course._id,
                status: "active"
            });

            if (!enrollment || !lesson.isPublished) {
                return res.status(403).json({
                    message: "You do not have access to this lesson"
                });
            }
        }

        res.status(200).json({ lesson });
    } catch (error) {
        res.status(500).json({
            message: "Failed to get lesson",
            error: error.message
        });
    }
};

// Publish a lesson
const publishLesson = async (req, res) => {
    try {
        const { lessonId } = req.params;

        if (!mongoose.isValidObjectId(lessonId)) {
            return res.status(400).json({
                message: "Invalid lesson ID"
            });
        }

        const lesson = await Lesson.findById(lessonId);

        if (!lesson) {
            return res.status(404).json({
                message: "Lesson not found"
            });
        }

        const course = await Course.findById(lesson.course);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        if (!canManageCourse(course, req.user)) {
            return res.status(403).json({
                message: "You cannot manage this course"
            });
        }

        lesson.isPublished = true;
        await lesson.save();

        res.status(200).json({
            message: "Lesson published successfully",
            lesson
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to publish lesson",
            error: error.message
        });
    }
};

module.exports = {
    createLesson,
    getCourseLessons,
    getLessonById,
    publishLesson
};