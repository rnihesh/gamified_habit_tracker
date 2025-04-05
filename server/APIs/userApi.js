const exp = require("express");
const userApp = exp.Router();

const User = require("../models/user.model.js");
const expressAsyncHandler = require("express-async-handler");
const createUser = require("../APIs/createUser.js");

userApp.post("/user", expressAsyncHandler(createUser));

//task incrementer
userApp.put(
  "/t-incr",
  expressAsyncHandler(async (req, res) => {
    const { email, taskName } = req.body;

    if (!email || !taskName) {
      return res.status(400).json({ message: "email and taskName required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const task = user.tasks.find((t) => t.name === taskName);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.count += 1;
    user.nScore = 5;
    user.score += 5;

    await user.save();

    res.status(200).json({
      message: "Task count incremented",
      tasks: user.tasks,
    });
  })
);

//task decrementer
userApp.put(
  "/t-decr",
  expressAsyncHandler(async (req, res) => {
    const { email, taskName } = req.body;

    if (!email || !taskName) {
      return res.status(400).json({ message: "email and taskName required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const task = user.tasks.find((t) => t.name === taskName);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.count -= 1;
    user.nScore = -5;
    user.score -= 5;
    await user.save();
    res.status(200).json({
      message: "Task count incremented",
      tasks: user.tasks,
    });
  })
);

//daily incrementer
userApp.put(
  "/d-incr",
  expressAsyncHandler(async (req, res) => {
    const { email, taskName } = req.body;

    if (!email || !taskName) {
      return res.status(400).json({ message: "email and taskName required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const task = user.daily.find((t) => t.name === taskName);
    if (!task) return res.status(404).json({ message: "Daily task not found" });

    task.count += 1;
    user.nScore = 10;
    user.score += 10;
    await user.save();
    res
      .status(200)
      .json({ message: "Daily task count incremented", daily: user.daily });
  })
);

//create task
userApp.post(
  "/create-task",
  expressAsyncHandler(async (req, res) => {
    const { email, taskName } = req.body;
    if (!email || !taskName) {
      return res.status(400).json({ message: "email and taskName required" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const existing = user.tasks.find((t) => t.name === taskName);
    if (existing) {
      return res.status(400).json({ message: "Task already exists" });
    }
    user.tasks.push({ name: taskName, count: 0 });
    await user.save();
    res.status(201).json({
      message: "Task created",
      tasks: user.tasks,
    });
  })
);

//delete tasks
userApp.delete(
  "/delete-task",
  expressAsyncHandler(async (req, res) => {
    const { email, taskName } = req.body;
    if (!email || !taskName) {
      return res.status(400).json({ message: "email and taskName required" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const initialLength = user.tasks.length;
    user.tasks = user.tasks.filter((t) => t.name !== taskName);
    if (user.tasks.length === initialLength) {
      return res.status(404).json({ message: "Task not found" });
    }
    await user.save();
    res.status(200).json({
      message: "Task deleted",
      tasks: user.tasks,
    });
  })
);

//create daily
userApp.post(
  "/create-daily",
  expressAsyncHandler(async (req, res) => {
    const { email, taskName } = req.body;
    if (!email || !taskName) {
      return res.status(400).json({ message: "email and taskName required" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const existing = user.daily.find((d) => d.name === taskName);
    if (existing) {
      return res.status(400).json({ message: "Daily task already exists" });
    }
    user.daily.push({ name: taskName, count: 0 });
    await user.save();
    res.status(201).json({
      message: "Daily task created",
      daily: user.daily,
    });
  })
);

//get community details
userApp.get(
  "/community",
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({}, "firstName profileImageUrl nScore updatedAt")
      .sort({ updatedAt: -1 });

    res.status(200).json({
      message: "Community leaderboard fetched",
      users,
    });
  })
);

//get leaderboard details
userApp.get(
  "/leaderboard",
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({}, "firstName profileImageUrl score")
      .sort({ score: -1 }); // descending order

    res.status(200).json({
      message: "Leaderboard fetched",
      users,
    });
  })
);

//get user details
userApp.get('/userDet', async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Error fetching user details:", err);
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = userApp;
