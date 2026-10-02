require("dotenv").config();


const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const courseRoutes = require("./routes/courseRoute");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const enrollmentRoutes = require("./routes/enrollmentRoutes");
const lessonRoutes = require("./routes/lessonRoutes");
const watchHistoryRoutes = require("./routes/watchHistoryRoutes");
const aiRoutes = require("./routes/aiRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "SkillConnect Backend is running!"
    });
});

app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/watch-history", watchHistoryRoutes);
app.use("/api/ai", aiRoutes);

async function startServer() {
    await connectDB();
    app.use("/api/lessons", lessonRoutes);
    app.listen(PORT, () => {
        console.log(
            `SkillConnect server running on http://localhost:${PORT}`
        );
    });
}

startServer();