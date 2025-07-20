// server.js

// --- 1. IMPORTS & INITIAL SETUP ---
const express = require('express');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');
const axios = require('axios');

// Load environment variables from a .env file
require('dotenv').config();

// --- 2. INITIALIZE EXPRESS APP ---
const app = express();
const PORT = process.env.PORT || 5001;

// --- 3. NODEMAILER TRANSPORTER SETUP ---
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// --- 4. MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// Serve static assets like images from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// FIX: Serve the static React build files from the 'public/react' directory
app.use(express.static(path.join(__dirname, 'public/react')));


// --- 5. API ENDPOINTS ---

app.post('/api/send-email', async (req, res) => {
  const { name, email, message, token } = req.body;

  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    
    const response = await axios.post(verificationURL);
    const { success, score } = response.data;

    if (!success || score < 0.5) {
      return res.status(400).json({ message: 'reCAPTCHA verification failed. Please try again.' });
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
    console.error('Error during reCAPTCHA verification or email sending:', error);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
});

app.get('/api/projects', (req, res) => {
  // FIX: Pointing to the correct 'projects.json' file.
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


// --- 6. SERVE REACT APP ---
// FIX: This catch-all route is essential for serving your React app and enabling client-side routing.
// It must come AFTER your API routes.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/react', 'index.html'));
});


// --- 7. START THE SERVER ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
