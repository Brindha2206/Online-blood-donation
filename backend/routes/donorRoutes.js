const express = require("express");
const router = express.Router();
const db = require("../db");
const authenticateToken = require("../middleware/authenticateToken");
const bcrypt = require("bcrypt");

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

// ✅ Fetch donor details
router.get("/profile", authenticateToken, async (req, res) => {
    try {
        const donorId = req.user.id;
        const [donor] = await db.promise().query(
            "SELECT id, name, email, blood_group, location FROM donors WHERE id = ?",
            [donorId]
        );

        if (donor.length === 0) {
            return res.status(404).json({ message: "Donor not found" });
        }

        res.json(donor[0]);
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
});

// ✅ Get all emergency notifications for the logged-in donor
router.get("/notifications", authenticateToken, async (req, res) => {
    try {
        const donorId = req.user.id;
        const [notifications] = await db.promise().query(
            "SELECT n.id, h.name AS hospital_name, n.message, n.status, n.created_at " +
            "FROM notifications n JOIN hospitals h ON n.hospital_id = h.id " +
            "WHERE n.donor_id = ? ORDER BY n.created_at DESC",
            [donorId]
        );

        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
});

// ✅ Accept or Reject Emergency Notification
router.post("/notifications/respond", authenticateToken, async (req, res) => {
    try {
        const { notificationId, response } = req.body;
        const donorId = req.user.id;

        if (!['accepted', 'rejected'].includes(response)) {
            return res.status(400).json({ message: "Invalid response" });
        }

        // Update the notification status
        const [result] = await db.promise().query(
            "UPDATE notifications SET status = ? WHERE id = ? AND donor_id = ?",
            [response, notificationId, donorId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Notification not found or already updated" });
        }

        // If accepted, add to donation history
        if (response === "accepted") {
            const [notification] = await db.promise().query(
                "SELECT hospital_id FROM notifications WHERE id = ?",
                [notificationId]
            );

            if (notification.length > 0) {
                const hospitalId = notification[0].hospital_id;
                await db.promise().query(
                    "INSERT INTO donation_history (donor_id, hospital_id, donation_date) VALUES (?, ?, NOW())",
                    [donorId, hospitalId]
                );
            }
        }

        res.json({ message: `Notification ${response} successfully!` });
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
});

// ✅ Get Donation History of Donor
router.get("/donation-history", authenticateToken, async (req, res) => {
    try {
        const donorId = req.user.id;
        const [history] = await db.promise().query(
            "SELECT dh.id, h.name AS hospital_name, dh.donation_date " +
            "FROM donation_history dh JOIN hospitals h ON dh.hospital_id = h.id " +
            "WHERE dh.donor_id = ? ORDER BY dh.donation_date DESC",
            [donorId]
        );

        res.json(history);
    } catch (error) {
        res.status(500).json({ message: "Database error", error: error.message });
    }
});

module.exports = router;
