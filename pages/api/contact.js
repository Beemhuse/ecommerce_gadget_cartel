require('dotenv').config();
const nodemailer = require('nodemailer');

export default function (req, res) {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;
    const phone = req.body.phone;

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // use TLS
      auth: {
            user: "gadgetcartelng@gmail.com",
            // user: process.env.GMAIL_USER,
            // pass: process.env.GMAIL_PASS,
            pass: "cartelgadget2024",
        },
        tls: {
          // do not fail on invalid certs
          rejectUnauthorized: false,
        },
    });

    // Verify transporter
    transporter.verify(function (error, success) {
        if (error) {
            console.error('Error verifying transporter:', error);
            res.status(500).send('Error verifying transporter');
        } else {
            console.log('Server is ready to take our messages');
        }
    });

    // Define mail data
    const mailData = {
        from: "gadgetcartelng@gmail.com",
        to: email, // Change this to the recipient's email address
        subject: `Message from ${name}`,
        html: `<div>Project Description: ${message}</div><p>Sent from: ${email}</p><p>Phone Number: ${phone}</p>`,
    };

    // Send mail
    transporter.sendMail(mailData, (err, info) => {
        if (err) {
            console.error('Error sending email:', err);
            res.status(500).send('Error sending email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
        }
    });
}
