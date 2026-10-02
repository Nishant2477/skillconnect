const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema(
    {
        course: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            default: ""
        },
        videoUrl: {
            type: String,
            required: true
        },
        duration: {
            type: Number,
            default: 0
        },
        order: {
            type: Number,
            required: true,
            min: 1
        },
        isPublished: {
            type: Boolean,
            default: false
        }
    },
    { timestamps: true }
);

lessonSchema.index(
    { course: 1, order: 1 },
    { unique: true }
);

module.exports = mongoose.model("Lesson", lessonSchema);