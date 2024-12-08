import nodemailer from "nodemailer";
import Mailgen from "mailgen";
import { secret } from "../config.js";

// Nodemailer Configuration
let nodeConfig = {
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: secret.email,
    pass: secret.password,
  },
};

let transporter = nodemailer.createTransport(nodeConfig, {
  debug: true, // Show debugging output
  logger: true, // Log to console
});

// Mailgen Configuration
let mailGenerator = new Mailgen({
  theme: "default", // You can use "salted" or create a custom theme
  product: { name: "Padam Gadshila", link: "http://localhost:3000/" },
});

export const registerMail = async (req, res) => {
  const { username, userEmail, text, subject } = req.body;

  // Define the email content
  let emailBody = {
    body: {
      name: username || "User",
      intro: text || "Welcome to our service! We're thrilled to have you.",
      action: {
        instructions:
          "Please click the button below to verify your email address:",
        button: {
          color: "#22BC66", // Optional button color
          text: "Verify Email",
          link: "https://yourcompany.com/verify", // Verification link
        },
      },
      outro:
        "If you have any questions, feel free to reply to this email. We're always happy to help.",
    },
  };

  // Generate the email HTML content
  let emailTemplate = mailGenerator.generate(emailBody);

  let message = {
    from: `"HRs" <${secret.email}>`,
    to: userEmail,
    subject: subject || "Welcome to Your Company",
    html: emailTemplate, // Use Mailgen's generated HTML content
  };

  try {
    let done = await transporter.sendMail(message);
    console.log("Email sent:", done.messageId);

    return res.status(201).send({ message: "Email sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .send({ error: "Something went wrong while sending the email." });
  }
};
