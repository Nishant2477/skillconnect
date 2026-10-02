const mongoose = require("mongoose");
const Course = require("../Model/course");

// Check whether the current user owns the course
function canManageCourse(course, user) {
    if (user.role === "admin") {
        return true;
    }

    return course.instructorId?.toString() === user.userId;
}

function isValidVideoDuration(value) {
    return typeof value === "string" && /^\d{1,3}:[0-5]\d:[0-5]\d$/.test(value);
}

// GET ALL COURSES
async function getCourses(req, res) {
    try {
        const courses = await Course.find();

        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch courses"
        });
    }
}

// GET ONE COURSE
async function getCourseById(req, res) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid course ID"
            });
        }

        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch course"
        });
    }
}

// CREATE COURSE
async function createCourse(req, res) {
    try {
        const { name, instructor, price, category, playlistUrl, videoDuration } = req.body;

        if (
            typeof name !== "string" || !name.trim() ||
            typeof instructor !== "string" || !instructor.trim() ||
            price === undefined || price === "" ||
            typeof category !== "string" || !category.trim()
        ) {
            return res.status(400).json({
                message: "Please provide name, instructor, price and category"
            });
        }

        if (videoDuration && !isValidVideoDuration(videoDuration.trim())) {
            return res.status(400).json({
                message: "Video duration must use HH:MM:SS format"
            });
        }

        const course = await Course.create({
            name: name.trim(),
            instructor: instructor.trim(),
            price,
            category: category.trim(),

            // Ownership comes from the verified JWT,
            // never from the client's request body.
            instructorId: req.user.userId,
            playlistUrl: typeof playlistUrl === "string" ? playlistUrl.trim() : "",
            videoDuration: typeof videoDuration === "string" ? videoDuration.trim() : ""
        });

        res.status(201).json({
            message: "Course created successfully",
            course
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to create course",
            error: error.message
        });
    }
}

// UPDATE COURSE
async function updateCourse(req, res) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid course ID"
            });
        }

        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        if (!canManageCourse(course, req.user)) {
            return res.status(403).json({
                message: "You can only update your own courses"
            });
        }

        // Backfill ownership for courses created before instructorId was required.
        if (!course.instructorId) {
            course.instructorId = req.user.userId;
        }

        // Only permit editable course fields.
        // Do not allow clients to change instructorId.
        const { name, instructor, price, category, playlistUrl, videoDuration } = req.body;

        if (name !== undefined) {
            if (typeof name !== "string" || !name.trim()) {
                return res.status(400).json({
                    message: "Invalid course name"
                });
            }
            course.name = name.trim();
        }

        if (instructor !== undefined) {
            if (
                typeof instructor !== "string" ||
                !instructor.trim()
            ) {
                return res.status(400).json({
                    message: "Invalid instructor name"
                });
            }
            course.instructor = instructor.trim();
        }

        if (price !== undefined) {
            if (
                price === "" ||
                !Number.isFinite(Number(price)) ||
                Number(price) < 0
            ) {
                return res.status(400).json({
                    message: "Invalid course price"
                });
            }
            course.price = Number(price);
        }

        if (category !== undefined) {
            if (
                typeof category !== "string" ||
                !category.trim()
            ) {
                return res.status(400).json({
                    message: "Invalid course category"
                });
            }
            course.category = category.trim();
        }

        if (playlistUrl !== undefined) {
            if (typeof playlistUrl !== "string") {
                return res.status(400).json({
                    message: "Invalid playlist URL"
                });
            }
            course.playlistUrl = playlistUrl.trim();
        }

        if (videoDuration !== undefined) {
            if (typeof videoDuration !== "string") {
                return res.status(400).json({
                    message: "Invalid video duration"
                });
            }
            const trimmedDuration = videoDuration.trim();
            if (trimmedDuration && !isValidVideoDuration(trimmedDuration)) {
                return res.status(400).json({
                    message: "Video duration must use HH:MM:SS format"
                });
            }
            course.videoDuration = trimmedDuration;
        }

        await course.save();

        res.status(200).json({
            message: "Course updated successfully",
            course
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to update course",
            error: error.message
        });
    }
}

// DELETE COURSE
async function deleteCourse(req, res) {
    try {
        if (!mongoose.isValidObjectId(req.params.id)) {
            return res.status(400).json({
                message: "Invalid course ID"
            });
        }

        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        if (!canManageCourse(course, req.user)) {
            return res.status(403).json({
                message: "You can only delete your own courses"
            });
        }

        await course.deleteOne();

        res.status(200).json({
            message: "Course deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete course"
        });
    }
}

module.exports = {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse
};