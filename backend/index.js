const express = require("express");
const db = require("./db"); // Import the MySQL connection object

const app = express();
const PORT = 1234;

// Route to check if the server is running
app.get("/", (req, res) => {
  res.send("✅ Backend is running!");
});

// Route to test MySQL connection
app.get("/test-db", (req, res) => {
  db.query("SELECT 1", (err, rows) => {
    if (err) {
      return res.status(500).json({ message: "❌ Database connection failed", error: err.message });
    }
    res.json({ message: "✅ Database connected successfully", result: rows });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
