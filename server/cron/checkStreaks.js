const User = require('../models/user.model');
const sendRemainderEmails = require('../utils/sendRemainderEmails');
const webpush = require('web-push'); // for browser push

const checkStreaks = async () => {
  const users = await User.find({});
  const now = new Date();

  for (let user of users) {
    const lastActive = new Date(user.streak.lastActiveDate);
    const timeSinceLastActive = now - lastActive;
    const hoursSince = timeSinceLastActive / (1000 * 60 * 60);

    if (hoursSince >= 24) {
      // Already lost streak, skip
      continue;
    }

    const hoursUntilLose = 24 - hoursSince;
    if (hoursUntilLose <= 2) {
      // User has <2 hours to keep streak alive, notify

      // Send browser push
      if (user.pushSubscription) {
        await webpush.sendNotification(
          user.pushSubscription,
          JSON.stringify({ title: 'Keep your streak alive!', body: 'Complete a task before midnight!' })
        );
      }

      // Send email
      await sendRemainderEmails(user.email, user.firstName || 'There');
    }
  }
};

module.exports = checkStreaks;
