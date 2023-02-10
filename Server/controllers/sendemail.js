const nodemailer = require("nodemailer");
// const config = require("./../config");

const sendEmail = (subject, htmlMessage, email) => {
    let transport = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.email.username,
            pass: process.env.email.password
        },
        secure: true,
        pool: true
    });

    const message = {
        from: "Flipkart NFT Team Team <rahulkpatro@gmail.com>",
        to: email,
        subject: subject, // Subject line
        html: htmlMessage
    };
    transport.sendMail(message, function (err, info) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Email Sent");
        }
    });
}

module.exports = sendEmail;