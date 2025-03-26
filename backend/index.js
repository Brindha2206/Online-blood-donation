const express = require("express");
const cors = require("cors");
const db = require("./db"); // MySQL connection
const donorRoutes = require("./routes/donorRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes"); // Import hospital routes



const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.use("/donor", donorRoutes);
app.use("/hospital", hospitalRoutes); // ✅ Add hospital routes
// app.use('/api/hospitals', hospitalRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
