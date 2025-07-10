const nodemailer = require("nodemailer");
require("dotenv").config(); 

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === "true", 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json()); 

app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL, 
      to,
      subject,
      text,
    });
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email.");
  }
});

app.get('/hamish-cv', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'HamishChhaganCV.pdf'); 
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Error downloading PDF');
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
``