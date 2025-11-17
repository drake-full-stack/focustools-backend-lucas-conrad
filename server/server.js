require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => console.error("❌ Error:", error));

// Import models
const Task = require("./models/Task");
const Session = require("./models/Session");

// Root route
app.get("/", (req, res) => {
  res.json({
    message: "FocusTools API",
    status: "Running",
    endpoints: {
      tasks: "/api/tasks",
      sessions: "/api/sessions",
    },
  });
});

// TODO: Add your Task routes here
app.post('/api/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);

    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(400).json({ error: "Failed to create task" });
  }
});

// GET /api/tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(400).json({ error: "Failed to fetch tasks" });
}});

// GET /api/tasks/:id
// PUT /api/tasks/:id
// DELETE /api/tasks/:id

// TODO: Add your Session routes here
// POST /api/sessions
// GET /api/sessions

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
