import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { secret } from "../env.js";
import { google } from "googleapis";

const oAuth2Client = new google.auth.OAuth2(
  secret.CLIENT_ID,
  secret.CLIENT_SECRET,
  secret.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: secret.REFRESH_TOKEN });

export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: secret.EMAIL, // Your Gmail address
        clientId: secret.CLIENT_ID,
        clientSecret: secret.CLIENT_SECRET,
        refreshToken: secret.REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Your App Name",
        link: "https://yourapp.com",
      },
    });

    const emailBody = mailGenerator.generate({
      body: {
        name: username || "User",
        intro: `${text} is your otp,`,
        outro: "Looking forward to serving you.",
      },
    });

    const mailOptions = {
      from: secret.EMAIL,
      to: userEmail,
      subject: subject || "Password Reset!",
      html: emailBody,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log("Email sent:", result.messageId);

    return res.status(201).send({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .send({ error: "Something went wrong while sending the email." });
  }
};
