const nodemailer = require('nodemailer');
require("dotenv").config(); // Load environment variables

const sendReminderEmail = async (email, name) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vnrita27@gmail.com',
        pass: process.env.Mail_Pass,
      },
    });

    const mailOptions = {
      from: '"HabiFy" <vnrita27@gmail.com>',
      to: email,
      subject: 'Don’t lose your streak! 🔥',
      html: `<p>Hey ${name},</p><p>You’re close to losing your streak. Complete a task today to keep it going!</p>`,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Email sent:', result);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

module.exports = sendReminderEmail;
