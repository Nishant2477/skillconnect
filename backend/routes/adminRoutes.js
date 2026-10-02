const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/rolemiddleware");

const router = express.Router();

router.get(
    "/dashboard",
    authMiddleware,
    authorizeRoles("admin"),
    (req, res) => {
        res.status(200).json({
            message: "Welcome to the SkillConnect Admin Dashboard",
            user: req.user
        });
    }
);

module.exports = router;