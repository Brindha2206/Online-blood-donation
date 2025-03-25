const express = require("express");
const db = require("../db"); // MySQL connection
const bcrypt = require("bcrypt");

const router = express.Router();

// ✅ 1️⃣ Donor Registration Route
router.post("/register", async (req, res) => {
  const { name, email, password, phone, location, blood_group, date_of_birth } = req.body;

  if (!name || !email || !password || !phone || !location || !blood_group || !date_of_birth) {
    return res.status(400).json({ message: "❌ All fields are required!" });
  }

  try {
    // ✅ Hash the password before storing in DB
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = "INSERT INTO donors (name, email, password, phone, location, blood_group, date_of_birth, donation_history) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [name, email, hashedPassword, phone, location, blood_group, date_of_birth, "nil"], (err, result) => {
      if (err) {
        return res.status(500).json({ message: "❌ Database error", error: err.message });
      }
      res.status(201).json({ message: "✅ Donor registered successfully!", donorId: result.insertId });
    });

  } catch (error) {
    res.status(500).json({ message: "❌ Error hashing password", error: error.message });
  }
});

// ✅ 2️⃣ Donor Login Route
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "❌ Email and password are required!" });
  }

  const sql = "SELECT * FROM donors WHERE email = ?";
  db.query(sql, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({ message: "❌ Database error", error: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "❌ Donor not found!" });
    }

    const donor = results[0];

    // ✅ Compare entered password with hashed password in DB
    const isMatch = await bcrypt.compare(password, donor.password);
    if (!isMatch) {
      return res.status(401).json({ message: "❌ Incorrect password!" });
    }

    res.status(200).json({
      message: "✅ Login successful!",
      donorId: donor.id,
      name: donor.name,
    });
  });
});

// ✅ 3️⃣ Get All Donors Route
router.get("/all", (req, res) => {
  db.query("SELECT id, name, email, phone, location, blood_group, date_of_birth, donation_history FROM donors", (err, results) => {
    if (err) {
      return res.status(500).json({ message: "❌ Database error", error: err.message });
    }
    res.status(200).json(results);
  });
});

// ✅ 4️⃣ Get Donor Details by ID (For Donor Dashboard)
router.get("/:id", (req, res) => {
  const donorId = req.params.id;

  const sql = "SELECT id, name, email, phone, location, blood_group, date_of_birth, donation_history FROM donors WHERE id = ?";
  db.query(sql, [donorId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "❌ Database error", error: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "❌ Donor not found!" });
    }

    res.status(200).json(results[0]);
  });
});

module.exports = router;
