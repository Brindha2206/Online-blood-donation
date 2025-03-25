const express = require("express");
const db = require("../db"); // MySQL connection
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const JWT_SECRET = "your_jwt_secret_key"; // Change this in production

// Hospital Registration
router.post("/register", async (req, res) => {
  const { name, email, password, phone, location, registration_number } = req.body;

  if (!name || !email || !password || !phone || !location || !registration_number) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if hospital already exists
  db.query("SELECT * FROM hospitals WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (result.length > 0) {
      return res.status(400).json({ error: "Hospital already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into database
    db.query(
      "INSERT INTO hospitals (name, email, password, phone, location, registration_number) VALUES (?, ?, ?, ?, ?, ?)",
      [name, email, hashedPassword, phone, location, registration_number],
      (err, result) => {
        if (err) return res.status(500).json({ error: "Database insertion error" });
        res.status(201).json({ message: "Hospital registered successfully" });
      }
    );
  });
});

// Hospital Login
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if hospital exists
  db.query("SELECT * FROM hospitals WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (result.length === 0) {
      return res.status(400).json({ error: "Hospital not found" });
    }

    const hospital = result[0];

    // Compare passwords
    const isMatch = await bcrypt.compare(password, hospital.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: hospital.id, email: hospital.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Login successful", token });
  });
});

module.exports = router;
