const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Change this if needed

function authenticateToken(req, res, next) {
    const token = req.header("Authorization");
    
    if (!token) {
        return res.status(403).json({ message: "Access denied! No token provided." });
    }

    jwt.verify(token.replace("Bearer ", ""), JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token!" });
        }
        req.user = user; // Attach user data to request object
        next(); // Proceed to next middleware
    });
}

module.exports = authenticateToken;
