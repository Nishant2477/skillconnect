function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
        // Ensure the user is authenticated first
        if (!req.user) {
            return res.status(401).json({
                message: "Authentication required"
            });
        }

        // Check the user's role
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Access denied. Insufficient permissions."
            });
        }

        // Role is permitted
        next();
    };
}

module.exports = authorizeRoles;