const express = require("express");
const db = require("../db"); // MySQL connection
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key"; // Use environment variable in production

// Middleware for verifying JWT tokens
function authenticateToken(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(403).json({ message: "Access denied! No token provided." });

    jwt.verify(token.replace("Bearer ", ""), JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token!" });
        req.user = user;
        next();
    });
}

// ✅ 1️⃣ Hospital Registration
router.post("/register", async (req, res) => {
    const { name, email, password, phone, location, registration_number } = req.body;

    if (!name || !email || !password || !phone || !location || !registration_number) {
        return res.status(400).json({ message: "❌ All fields are required!" });
    }

    try {
        // Check if the hospital is already registered
        db.query("SELECT * FROM hospitals WHERE email = ?", [email], async (err, result) => {
            if (err) return res.status(500).json({ message: "Database error", error: err.message });
            if (result.length > 0) {
                return res.status(400).json({ message: "❌ Hospital already exists!" });
            }

            // Hash password before saving
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new hospital
            db.query(
                "INSERT INTO hospitals (name, email, password, phone, location, registration_number) VALUES (?, ?, ?, ?, ?, ?)",
                [name, email, hashedPassword, phone, location, registration_number],
                (err, result) => {
                    if (err) return res.status(500).json({ message: "Database error", error: err.message });
                    res.status(201).json({ message: "✅ Hospital registered successfully!", hospitalId: result.insertId });
                }
            );
        });
    } catch (error) {
        res.status(500).json({ message: "❌ Server error", error: error.message });
    }
});

// ✅ 2️⃣ Hospital Login
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "❌ Email and password are required!" });
    }

    // Check if hospital exists
    db.query("SELECT * FROM hospitals WHERE email = ?", [email], async (err, result) => {
        if (err) return res.status(500).json({ message: "Database error", error: err.message });

        if (result.length === 0) {
            return res.status(401).json({ message: "❌ Invalid email or password!" });
        }

        const hospital = result[0];

        // Compare entered password with hashed password in DB
        const isMatch = await bcrypt.compare(password, hospital.password);
        if (!isMatch) {
            return res.status(401).json({ message: "❌ Incorrect password!" });
        }

        // Generate JWT Token
        const token = jwt.sign({ id: hospital.id, email: hospital.email }, JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "✅ Login successful!",
            token
        });
    });
});

// ✅ 3️⃣ Get Hospital Profile (Requires Authentication)
router.get("/profile", authenticateToken, (req, res) => {
    const hospitalId = req.user.id;

    db.query("SELECT id, name, email, phone, location, registration_number FROM hospitals WHERE id = ?", 
        [hospitalId], 
        (err, result) => {
            if (err) return res.status(500).json({ message: "❌ Database error", error: err.message });

            if (result.length === 0) {
                return res.status(404).json({ message: "❌ Hospital not found!" });
            }

            res.json(result[0]);
        }
    );
});

module.exports = router;
