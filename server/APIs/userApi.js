const exp = require("express");
const userApp = exp.Router();

const User = require("../models/user.model.js");
const Post = require("../models/posts.model.js");

const expressAsyncHandler = require("express-async-handler");
const createUser = require("../APIs/createUser.js");
const updateUserStreak = require("../utils/updateUserStreak.js")

userApp.use(exp.json());

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
    const users = await User.find(
      {},
      "firstName profileImageUrl nScore updatedAt"
    ).sort({ updatedAt: -1 });

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
    const users = await User.find({}, "firstName profileImageUrl score").sort({
      score: -1,
    }); // descending order

    res.status(200).json({
      message: "Leaderboard fetched",
      users,
    });
  })
);

//get user details
userApp.get(
  "/userDet",
  expressAsyncHandler(async (req, res) => {
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
  })
);

const avatars = [
  {
    name: "Zen Frog",
    emoji: "🐸",
    cost: 60,
    description: "Hop into calm after tasks",
  },
  {
    name: "Cozy Cat",
    emoji: "🐱",
    cost: 70,
    description: "For calm & chill habiters",
  },
  {
    name: "Night Coder",
    emoji: "🧛‍♂️",
    cost: 80,
    description: "For night owls and coders",
  },
  {
    name: "Space Explorer",
    emoji: "👽",
    cost: 90,
    description: "For out-of-this-world focus",
  },
  {
    name: "Wizard of Focus",
    emoji: "🧙‍♂️",
    cost: 100,
    description: "For the task-completing sorcerer",
  },
  {
    name: "Skeleton Punk",
    emoji: "💀",
    cost: 110,
    description: "For the rebel productive soul",
  },
  {
    name: "Productivity Hero",
    emoji: "🦸‍♀️",
    cost: 120,
    description: "You’re saving your own time!",
  },
  {
    name: "Cyber Bot",
    emoji: "🤖",
    cost: 130,
    description: "Complete tasks like a machine",
  },
  {
    name: "Royal Achiever",
    emoji: "👑",
    cost: 140,
    description: "Rule your habit kingdom",
  },
  {
    name: "Dragon Tamer",
    emoji: "🐉",
    cost: 150,
    description: "You’ve conquered the habit beast",
  },
];

//routes for rewards
userApp.put(
  "/reward/:num",
  expressAsyncHandler(async (req, res) => {
    const email = req.body.email; // assuming frontend sends it
    const user = await User.findOne({ email });

    const index = parseInt(req.params.num, 10) - 1;

    if (index < 0 || index >= avatars.length) {
      return res.status(400).json({ message: "Invalid reward number." });
    }

    const reward = avatars[index];

    if (user.score >= reward.cost) {
      user.score -= reward.cost;
      user.rewards.push(reward.name); // optional
      await user.save();
      res.send({
        message: `Purchased: ${reward.name}`,
        remainingScore: user.score,
      });
    } else {
      const needed = reward.cost - user.score;
      res.status(400).send({
        message: `Not enough points. You need ${needed} more.`,
      });
    }
  })
);

//post for posts
userApp.post(
  "/post",
  expressAsyncHandler(async (req, res) => {
    const { firstName, profileImageUrl, desc, score } = req.body;

    if (!firstName || !desc) {
      res.status(400).send({ message: "firstName and desc are required" });
      return;
    }

    const newPost = new Post({
      firstName,
      profileImageUrl,
      desc,
      score,
    });

    await newPost.save();
    res.status(201).send({ message: "Post created", post: newPost });
  })
);

//like count
userApp.put(
  "/like/:postId",
  expressAsyncHandler(async (req, res) => {
    // console.log("testing req.body : ",req.params)
    const  {postId}  = req.params;
    if (!postId) {
      return res.status(400).send({ message: "postId is required" });
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send({ message: "Post not found" });
    }
    post.likeCount += 1;
    await post.save();
    res.status(200).send({ message: "Post liked", likeCount: post.likeCount });
  })
);

//get posts
userApp.get(
  "/posts",
  expressAsyncHandler(async (req, res) => {
    const posts = await Post.find().sort({ createdAt: -1 }); // latest first
    res.status(200).send(posts);
  })
);



//streaks
userApp.post('/complete-activity', async (req, res) => {
  try {
    const { email, activityName } = req.body; 

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Find and update the activity by name
    const activity = user.daily.find(item => item.name === activityName);
    if (!activity) {
      return res.status(404).json({ success: false, message: 'Activity not found' });
    }

    activity.count += 1; 

    await user.save();

    // Update streak using email
    await updateUserStreak(email);

    res.status(200).json({ success: true, message: 'Activity completed and streak updated' });
  } catch (error) {
    console.error('Error completing activity:', error);
    res.status(500).json({ success: false, message: 'Failed to complete activity' });
  }
});

userApp.get('/streak/:email', expressAsyncHandler(async (req, res) => {
  try {
    const email = req.params.email; 
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email }).select('streak');
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      currentStreak: user.streak.current,
      bestStreak: user.streak.best
    });
  } catch (error) {
    console.error('Error loading streak:', error);
    res.status(500).json({ success: false, message: 'Failed to load streak data' });
  }
}));



module.exports = userApp;
