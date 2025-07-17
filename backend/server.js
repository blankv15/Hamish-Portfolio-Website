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

app.post('/api/send-email', async (req, res) => {
  // Destructure name, email, message, AND the new token
  const { name, email, message, token } = req.body;

  // --- reCAPTCHA Verification Step ---
  try {
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const verificationURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;
    
    const response = await axios.post(verificationURL);
    const { success, score } = response.data;

    // Check if verification failed or the score is too low
    if (!success || score < 0.5) {
      return res.status(400).json({ message: 'reCAPTCHA verification failed. Please try again.' });
    }

    // --- If verification succeeds, proceed to send the email ---
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
    // Provide a generic error message to the user
    res.status(500).json({ message: 'An internal server error occurred.' });
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
