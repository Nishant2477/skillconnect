const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        instructor: {
            type: String,
            required: true,
            trim: true
        },

        instructorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        price: {
            type: Number,
            required: true,
            min: 0
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        playlistUrl: {
            type: String,
            trim: true,
            default: ""
        },

        videoDuration: {
            type: String,
            trim: true,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;