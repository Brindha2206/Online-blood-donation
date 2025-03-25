const express = require("express");
const cors = require("cors");
const db = require("./db"); // MySQL connection
const donorRoutes = require("./routes/donorRoutes"); // Import donor routes

const app = express();
const PORT = 1234;

app.use(express.json()); // Middleware to parse JSON requests
app.use(cors()); // Enable CORS

app.use("/donor", donorRoutes); // Use donor routes

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
