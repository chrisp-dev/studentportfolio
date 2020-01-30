"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main({ name }) {


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'lexus43@ethereal.email',
            pass: 'zGezZpDu4sgy7ng2HC'
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Cosmos Counselling" <no-reply@cosmoscounselling.com>', // sender address
        to: "bar@example.com, baz@example.com", // list of receivers
        subject: `Thank You, ${name}!`, // Subject line
        text: "", // plain text body
        html: `<b>Thank You, ${name}!</b>` // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return "Message Sent";
}

module.exports = main;