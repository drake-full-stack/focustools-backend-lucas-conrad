require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ Error:", error));
  
// Import models
app.use("/api/tasks", require("./routes/tasks"));
app.use("/api/sessions", require("./routes/sessions"));



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
