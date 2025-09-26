// utils/emailService.ts
import nodemailer from "nodemailer";

export const sendEmail = async (req,res) => {
  try {
    const {text} = req.body;
    console.log("Text is  :",text)
    console.log("Email : ",req.user.email)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // sender email
        pass: process.env.EMAIL_PASS, // sender app password
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER, // your backend system email
      to: req.user.email,       // receiver (static or fetched from DB)
      subject: "🚨 Crypto Price Alert", // static subject
      text: text, // dynamic message from req.body
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent:", info.response);
    return res.status(200).json({
        message:"Email sent"
    });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    throw error;
  }
};
