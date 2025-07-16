// server.js

// --- 1. IMPORTS & INITIAL SETUP ---
const express = require('express');
const path = require('path');
const cors = require('cors');
const nodemailer = require('nodemailer');

// Load environment variables from a .env file
require('dotenv').config();

// --- 2. INITIALIZE EXPRESS APP ---
const app = express();
const PORT = process.env.PORT || 5001; // Use port from .env or default to 5000

// --- 3. NODEMAILER TRANSPORTER SETUP ---
// This configures the email sending service using credentials from your .env file.
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === 'true', // `secure: true` for port 465, false for others
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// --- 4. MIDDLEWARE ---
// Enable CORS (Cross-Origin Resource Sharing) for all routes
app.use(cors());

// Enable Express to parse JSON in request bodies (for the /send-email endpoint)
app.use(express.json());

// Serve static files (images, CSS, your PDF, etc.) from the "public" directory.
// This is the most efficient way to serve assets. Any file in the 'public' folder
// will be accessible at its root path. e.g., 'public/HamishChhaganCV.pdf' -> '/HamishChhaganCV.pdf'
app.use(express.static(path.join(__dirname, 'public')));


// --- 5. API ENDPOINTS ---

// Endpoint for sending emails from your contact form
app.post('/send-email', async (req, res) => {
  // Destructure the name, email, and message from the request body
  const { name, email, message } = req.body;

  // Basic validation
  if (!name || !email || !message) {
    return res.status(400).send('All fields are required.');
  }

  const mailOptions = {
    from: `"${name}" <${process.env.FROM_EMAIL}>`, // Use a friendly sender name
    to: process.env.YOUR_EMAIL, // The email address you want to receive messages at
    replyTo: email, // Set the reply-to field to the user's email
    subject: `New Contact Form Submission from ${name}`,
    text: `You have a new message from:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Failed to send email.');
  }
});

    app.get('/', (req, res) => {
      res.send('Hello from Express!');
    });

// Endpoint to get project data from a JSON file
app.get('/api/projects', (req, res) => {
  const projectsDataPath = path.join(__dirname, 'data', 'projectsData.json');
  res.sendFile(projectsDataPath, (err) => {
    if (err) {
      console.error('Error sending projects.json:', err);
      res.status(404).send('Project data not found');
    }
  });
});

app.get('/api/tabs', (req, res) => {
  const projectsDataPath = path.join(__dirname, 'data', 'tabData.json');
  res.sendFile(projectsDataPath, (err) => {
    if (err) {
      console.error('Error sending projects.json:', err);
      res.status(404).send('Project data not found');
    }
  });
});


// Note: You no longer need a separate endpoint for your PDF file.
// Because you're using `app.use(express.static('public'))`, if you place
// 'HamishChhaganCV.pdf' inside the 'public' folder, it will be automatically
// available at http://your-server-address/HamishChhaganCV.pdf


// --- 6. START THE SERVER ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
