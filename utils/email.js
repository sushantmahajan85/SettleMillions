// const nodemailer = require('nodemailer');
// // const sgMail = require('@sendgrid/mail');
// // sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// const sendEmail = async options => {
//     const transporter = nodemailer.createTransport({
//         service: 'SendGrid',
//         auth: {
//             user: process.env.EMAIL_USERNAME,
//             pass: process.env.EMAIL_PASSWORD
//         }
//     });

//     const mailOptions = {
//         from: 'Thapar Food Festival <sushantmahajan85@gmail.com>',
//         to: options.email,
//         subject: options.subject,
//         text: options.message,
//         // html:
//     };

//     await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;
// // const msg = function(options) {
// //   to: 'options.email',
// //   from:  'sushantmahajan85@gmail.com'
// //   subject: options.subject,
// //   text: 'and easy to do anywhere, even with Node.js',
// //   html: '<strong>and easy to do anywhere, even with Node.js</strong>';
// // };
// // // sgMail.send(msg);
// // module.exports= msg;
