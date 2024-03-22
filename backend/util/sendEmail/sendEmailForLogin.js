import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: "xavishajan44@gmail.com",
    pass: "najl qyrt udyn wdmr",
  },
});

export const sendEmailwithCredentials = async (email, password,ID) => {
    const mailOptions = {
      from: "xavishajan44@gmail.com",
      to: email,
      subject: "ID and password for Login",
      html: `<html lang="en">
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>TeacherID and Password</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                padding: 20px;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                padding: 40px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
              }
              h1 {
                color: #333;
                text-align: center;
              }
              p {
                color: #666;
                font-size: 16px;
                line-height: 1.6;
                margin-bottom: 20px;
              }
              .otp {
                background-color: #f8f8f8;
                padding: 10px 20px;
                border-radius: 4px;
                text-align: center;
                font-size: 20px;
                font-weight: bold;
              }
              .cta-button {
                display: block;
                width: fit-content;
                margin: 0 auto;
                background-color: #007bff;
                color: #fff;
                text-decoration: none;
                padding: 12px 24px;
                border-radius: 4px;
                text-align: center;
              }
              .cta-button:hover {
                background-color: #0056b3;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>TeacherID and Password for login</h1>
              <p>Hello, welcome to ......!</p>
              <p>Your ID for Login:</p>
              <div class="ID">${ID}</div>
              <p>Your Password for Login:</p>
              <div class="Password">${password}</div>
              <p>If you did not request this, please ignore this email.</p>
            </div>
          </body>
          </html>`,
    };
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  };