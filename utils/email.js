// const nodemailer = require("nodemailer");
// const ejs = require("ejs");
// const htmlToText = require("html-to-text");
// // // const sgMail = require('@sendgrid/mail');
// // // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// // new Email(user, url).sendWelcome();

// module.exports = class Email {
//   constructor(user, url) {
//     this.to = user.email;
//     this.firstName = user.name.split(" ")[0];
//     this.url = url;
//     this.from = process.env.EMAIL_FROM;
//   }
//   newTransport() {
//     // if (process.env.NODE_ENV === "production") {
//     //   return 1;
//     // }
//     return nodemailer.createTransport({
//       service: "SendGrid",
//       port: process.env.EMAIL_PORT,
//       host: process.env.EMAIL_HOST,
//       auth: {
//         user: process.env.EMAIL_USERNAME,
//         pass: process.env.EMAIL_PASSWORD,
//       },
//     });
//   }
//   async send(template, subject) {
//     const html = ejs.renderFile(
//       `${__dirname}/../views/emails/${template}.ejs`,
//       {
//         firstName: this.firstName,
//         url: this.url,
//         subject,
//       }
//     );

//     const mailOptions = {
//       from: this.from,
//       to: this.to,
//       subject,
//       html,
//       text: htmlToText.fromString(html),
//       // html:
//     };

//     await this.newTransport().sendMail(mailOptions);
//   }

//   async sendWelcome() {
//     await this.send("welcome", "Welcome to your deals!");
//   }
//   async sendPasswordReset() {
//     await this.send("welcome", "Welcome to your deals!");
//   }
// };

// // const sendEmail = async (options) => {
// //   const transporter = nodemailer.createTransport({
// //     service: "SendGrid",
// //     auth: {
// //       user: process.env.EMAIL_USERNAME,
// //       pass: process.env.EMAIL_PASSWORD,
// //     },
// //   });

// //   await transporter.sendMail(mailOptions);
// // };

// // module.exports = sendEmail;
// // // // const msg = function(options) {
// // // //   to: 'options.email',
// // // //   from:  'sushantmahajan85@gmail.com'
// // // //   subject: options.subject,
// // // //   text: 'and easy to do anywhere, even with Node.js',
// // // //   html: '<strong>and easy to do anywhere, even with Node.js</strong>';
// // // // };
// // // // // sgMail.send(msg);
// // // // module.exports= msg;

const ejs = require("ejs");
const nodemailer = require("nodemailer");
const htmlToText = require("html-to-text");

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name;
    this.url = url;
    this.from = `NJ <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return nodemailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD
        }
      });
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    const html = await ejs.renderFile(
      `${__dirname}/../views/emails/${template}.ejs`,
      {
        firstName: this.firstName,
        url: this.url,
        subject,
      }
    );

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject: subject,
      html: html,
      text: htmlToText.fromString(html),
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send("welcome", "Welcome To Natours");
  }

  async sendPasswordReset() {
    await this.send(
      "passwordReset",
      "Password Reset Mail - Valid For 10 Minutes Only"
    );
  }
};
