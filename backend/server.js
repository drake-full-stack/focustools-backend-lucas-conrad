require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN})
  );
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ Error:", error));
  
// Import models
app.use("/tasks", require("./routes/tasks"));
app.use("/sessions", require("./routes/sessions"));

console.log("MONGO_URI on server:", process.env.MONGO_URI);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
