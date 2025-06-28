// testEmail.js
require('dotenv').config();
const nodemailer = require('nodemailer');

async function testEmail() {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDERS_EMAIL,
        pass: process.env.SENDERS_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SENDERS_EMAIL,
      to: 'abdulbasidhussain9@gmail.com',
      subject: 'Testing Email from MyMakaranta',
      html: '<h1>This is a test email</h1>',
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Email sent:', result.accepted);
  } catch (err) {
    console.error('❌ Email sending failed:', err.message);
  }
}

testEmail();
