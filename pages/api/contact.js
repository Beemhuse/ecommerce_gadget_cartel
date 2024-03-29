export default function (req, res){
    require ('dotenv').config
    
    var nodemailer = require("nodemailer");
    
    
    var name = req.body.name
      var email = req.body.email
      var message = req.body.message
      var phone = req.body.phone
    
    
    
    // const transporter = nodemailer.createTransport({
    //     port: 465,
    //     host: "smtp.gmail.com", 
    //     auth:{
    //         user: process.env.user,
    //         pass:process.env.password
    //     },
    //     tls: {
    //         // do not fail on invalid certs
    //         rejectUnauthorized: false,
    //       },
    //     secure: true,
    // });
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          type: "OAuth2",
          user: "gadgetcartel@gadgetcartel.iam.gserviceaccount.com",
          serviceClient: "113600000000000000000",
          privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBg...",
          accessToken: "ya29.Xx_XX0xxxxx-xX0X0XxXXxXxXXXxX0x",
          expires: 1484314697598,
        },
      });
    const mailData = {
        from :email,
        to: process.env.user,
        subject: `message from ${name}`,
        html: `<div> Project Description: ${message}</div> <p>Sent from : ${email}</p> <p>Phone Number: ${phone}</p>`
    }
    transporter.verify(function (error, success) {
        if (error) {
          console.log(error);
        } else {
          console.log("Server is ready to take our messages");
        }
      });
    transporter.sendMail(mailData, (err, data) => {
        if (err) {
          // console.log(err);
          res.send("error" + JSON.stringify(err));
        } else {
          // console.log("mail send");
          res.send("success");
        }
    });
    
    }