// pushNotifications.js
const webpush = require('web-push');
require('dotenv').config();

// Configure web-push with your VAPID keys
webpush.setVapidDetails(
  'mailto:niheshr03@gmail.com',
  process.env.PUBLIC_VAPID_KEY,
  process.env.PRIVATE_VAPID_KEY
);

// Create and export a function to send notifications
const sendPushNotification = async (subscription, payloadData) => {
  try {
    const payload = JSON.stringify(payloadData);
    await webpush.sendNotification(subscription, payload);
    console.log('Push notification sent');
  } catch (error) {
    console.error('Error sending push notification', error);
  }
};

module.exports = { sendPushNotification };
