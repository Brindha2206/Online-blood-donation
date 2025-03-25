const express = require("express");
const db = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// ✅ 1️⃣ Hospital Registration
router.post("/register", async (req, res) => {
    const { name, email, password, phone, location, registration_number } = req.body;

    if (!name || !email || !password || !phone || !location || !registration_number) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if hospital already exists
        const [existingHospital] = await db.promise().query("SELECT * FROM hospitals WHERE email = ?", [email]);
        if (existingHospital.length > 0) {
            return res.status(400).json({ message: "Hospital already registered with this email" });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert into database
        await db.promise().query(
            "INSERT INTO hospitals (name, email, password, phone, location, registration_number) VALUES (?, ?, ?, ?, ?, ?)",
            [name, email, hashedPassword, phone, location, registration_number]
        );

        res.status(201).json({ message: "Hospital registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
});

// ✅ 2️⃣ Hospital Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const [hospital] = await db.promise().query("SELECT * FROM hospitals WHERE email = ?", [email]);

        if (hospital.length === 0) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, hospital[0].password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ id: hospital[0].id, email: hospital[0].email }, JWT_SECRET, { expiresIn: "1h" });

        res.json({ message: "✅ Login successful!", token });
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
});

// ✅ 3️⃣ Fetch All Donors (No Authentication Required)
router.get("/donors", async (req, res) => {
    const { bloodGroup, location } = req.query;

    let sql = "SELECT id, name, email, phone, location, blood_group FROM donors WHERE 1=1";
    let params = [];

    if (bloodGroup) {
        sql += " AND blood_group = ?";
        params.push(bloodGroup);
    }

    if (location) {
        sql += " AND location = ?";
        params.push(location);
    }

    console.log("Executing SQL:", sql, "Parameters:", params); // ✅ Log query for debugging

    try {
        const [results] = await db.promise().query(sql, params);
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
});

// ✅ 4️⃣ Get Hospital Profile (Requires Token)
function authenticateToken(req, res, next) {
    const token = req.header("Authorization");
    if (!token) return res.status(403).json({ message: "Access denied! No token provided." });

    jwt.verify(token.replace("Bearer ", ""), JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token!" });
        req.user = user;
        next();
    });
}

router.get("/profile", authenticateToken, async (req, res) => {
    try {
        const [hospital] = await db.promise().query("SELECT id, name, email, phone, location, registration_number FROM hospitals WHERE id = ?", [req.user.id]);

        if (hospital.length === 0) {
            return res.status(404).json({ message: "Hospital not found" });
        }

        res.json(hospital[0]);
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
});

module.exports = router;
