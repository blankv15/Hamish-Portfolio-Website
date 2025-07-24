const express = require('express');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');
const axios = require('axios');
const fs = require('fs'); 
const https = require('https'); 

require('dotenv').config();

const app = express();
const HTTP_PORT = process.env.PORT || 5001;
const HTTPS_PORT = 5002; 

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/react')));

app.post('/api/send-email', async (req, res) => {
  const { name, email, message, token } = req.body;
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    const response = await axios.post(verificationURL);
    const { success, score } = response.data;
    if (!success || score < 0.5) {
      return res.status(400).json({ message: 'reCAPTCHA verification failed.' });
    }
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const mailOptions = {
      from: `"${name}" <${process.env.FROM_EMAIL}>`,
      to: process.env.YOUR_EMAIL,
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `You have a new message from:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error during reCAPTCHA or email sending:', error);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
});

app.get('/api/projects', (req, res) => {
  const projectsDataPath = path.join(__dirname, 'data', 'projects.json');
  res.sendFile(projectsDataPath, (err) => {
    if (err) {
      console.error('Error sending projects.json:', err);
      res.status(404).send('Project data not found');
    }
  });
});

app.get('/api/tabs', (req, res) => {
  const tabsDataPath = path.join(__dirname, 'data', 'tabData.json');
  res.sendFile(tabsDataPath, (err) => {
    if (err) {
      console.error('Error sending tabData.json:', err);
      res.status(404).send('Tab data not found');
    }
  });
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public/react', 'index.html'));
});

app.listen(HTTP_PORT, () => {
  console.log(`HTTP Server is running on http://localhost:${HTTP_PORT}`);
});

try {
  const privateKey = fs.readFileSync('/etc/letsencrypt/live/hamishc.nz/privkey.pem', 'utf8');
  const certificate = fs.readFileSync('/etc/letsencrypt/live/hamishc.nz/fullchain.pem', 'utf8');
  const credentials = { key: privateKey, cert: certificate };

  const httpsServer = https.createServer(credentials, app);
  httpsServer.listen(HTTPS_PORT, () => {
    console.log(`HTTPS Server is running on https://localhost:${HTTPS_PORT}`);
  });
} catch (e) {
  console.log('Could not start HTTPS server. This is normal in local development.');
}
