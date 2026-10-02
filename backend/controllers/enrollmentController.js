const mongoose = require("mongoose");
const Enrollment = require("../Model/Enrollment");
const Course = require("../Model/course");

// ENROLL IN A COURSE
async function enrollInCourse(req, res) {
    try {
        const { courseId } = req.params;
        const studentId = req.user.userId;

        if (!mongoose.isValidObjectId(courseId)) {
            return res.status(400).json({
                message: "Invalid course ID"
            });
        }

        // Check whether course exists
        const course = await Course.findById(courseId);

        if (!course) {
            return res.status(404).json({
                message: "Course not found"
            });
        }

        // Check for existing enrollment
        const existingEnrollment =
            await Enrollment.findOne({
                student: studentId,
                course: courseId
            });

        if (existingEnrollment) {
            if (existingEnrollment.status === "active") {
                return res.status(409).json({
                    message: "You are already enrolled in this course"
                });
            }

            existingEnrollment.status = "active";
            existingEnrollment.enrolledAt = new Date();
            await existingEnrollment.save();

            return res.status(201).json({
                message: "Successfully enrolled in course",
                enrollment: existingEnrollment
            });
        }

        // Create enrollment
        const enrollment = await Enrollment.create({
            student: studentId,
            course: courseId
        });

        res.status(201).json({
            message: "Successfully enrolled in course",
            enrollment
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({
                message: "You are already enrolled in this course"
            });
        }

        res.status(500).json({
            message: "Enrollment failed",
            error: error.message
        });
    }
}

// GET MY ENROLLED COURSES
async function getMyEnrollments(req, res) {
    try {
        const enrollments = await Enrollment.find({
            student: req.user.userId,
            status: "active"
        })
            .populate(
                "course",
                "name instructor price category"
            )
            .sort({ enrolledAt: -1 });

        res.status(200).json({
            count: enrollments.length,
            enrollments
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch enrollments",
            error: error.message
        });
    }
}

// CANCEL ENROLLMENT
async function cancelEnrollment(req, res) {
    try {
        const { courseId } = req.params;

        if (!mongoose.isValidObjectId(courseId)) {
            return res.status(400).json({
                message: "Invalid course ID"
            });
        }

        const enrollment = await Enrollment.findOne({
            student: req.user.userId,
            course: courseId,
            status: "active"
        });

        if (!enrollment) {
            return res.status(404).json({
                message: "Active enrollment not found"
            });
        }

        enrollment.status = "cancelled";
        await enrollment.save();

        res.status(200).json({
            message: "Enrollment cancelled successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to cancel enrollment",
            error: error.message
        });
    }
}

module.exports = {
    enrollInCourse,
    getMyEnrollments,
    cancelEnrollment
};