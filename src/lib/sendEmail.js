const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

const renderTemplate = (file, data) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(path.join(__dirname.slice(0, -5), file), data, (err, result) => {
      if (err) {
        console.error(err);
        reject(err);
      }
      resolve(result);
    });
  });
};

// const sendEmail = async (receiver, subject, data, templateId) => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: process.env.SENDERS_EMAIL,
//       pass: process.env.SENDERS_PASSWORD,
//     },
//   });

//   const template = await renderTemplate(templateId, data);

//   const mailOptions = {
//     from: process.env.SENDERS_EMAIL, // sender address
//     to: receiver, // list of receivers
//     subject: subject, // Subject line
//     html: template, // html body
//   };

//   return (await transporter.sendMail(mailOptions)).accepted;
// };
const sendEmail = async (receiver, subject, data, templatePath) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SENDERS_EMAIL,
        pass: process.env.SENDERS_PASSWORD,
      },
    });

    const template = await renderTemplate(templatePath, data);

    const mailOptions = {
      from: process.env.SENDERS_EMAIL,
      to: receiver,
      subject,
      html: template,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent: ", info.accepted);
    return info.accepted;
  } catch (err) {
    console.error("❌ Email error: ", err.message);
    throw err;
  }
};



module.exports = sendEmail;