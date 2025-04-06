const User = require('../models/user.model.js');

const updateUserStreak = async (email) => {
  const user = await User.findOne({ email });
  if (!user) return;

  const today = new Date();
  const lastActive = new Date(user.streak.lastActiveDate);

  const daysDifference = Math.floor((today - lastActive) / (1000 * 60 * 60 * 24));

  if (daysDifference === 1) {
    user.streak.current += 1;
    if (user.streak.current > user.streak.best) {
      user.streak.best = user.streak.current;
    }
  } else if (user.streak.current === 0 || daysDifference > 1) {
    user.streak.current = 1;
  } // else: same day, do nothing

  user.streak.lastActiveDate = today;
  await user.save();
};

module.exports = updateUserStreak;
