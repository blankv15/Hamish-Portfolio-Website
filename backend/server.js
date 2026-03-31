const express = require('express');
const path = require('path');
const cors = require('cors');
const { Resend } = require('resend');
const axios = require('axios');
const fs = require('fs');
const https = require('https');

let stripe = null;
if (process.env.STRIPE_SECRET_KEY) {
  stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
}

require('dotenv').config();

const app = express();
const HTTP_PORT = process.env.PORT || 5001;
const HTTPS_PORT = 5002;

const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());

// Stripe webhook — must be before express.json() middleware
app.post('/api/webhook/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
  if (!stripe) return res.status(503).send('Stripe not configured');

  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) return res.status(503).send('Webhook secret not configured');

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const customerEmail = session.customer_details?.email;

    if (customerEmail) {
      try {
        // Find which product was purchased by matching price ID
        const storeDataPath = path.join(__dirname, 'data', 'storeData.json');
        const products = JSON.parse(fs.readFileSync(storeDataPath, 'utf8'));

        // Get line items to find the product
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        const priceId = lineItems.data[0]?.price?.id;
        const product = products.find(p => p.stripePriceId === priceId);

        if (product) {
          let emailBody = `<p>Hi there,</p><p>Thanks for purchasing <strong>${product.name}</strong>!</p>`;

          if (product.downloadUrl) {
            emailBody += `<p>Here is your download link: <a href="${product.downloadUrl}">${product.downloadUrl}</a></p>`;
          }

          if (product.deliveryNote) {
            emailBody += `<p>${product.deliveryNote}</p>`;
          }

          emailBody += `<p>If you have any questions, just reply to this email.</p><p>— Hamish</p>`;

          await resend.emails.send({
            from: process.env.FROM_EMAIL || 'noreply@hamishc.nz',
            to: [customerEmail],
            subject: `Your purchase: ${product.name}`,
            html: emailBody,
          });

          console.log(`Delivery email sent to ${customerEmail} for product: ${product.name}`);
        }
      } catch (err) {
        console.error('Error sending delivery email:', err);
      }
    }
  }

  res.json({ received: true });
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/react')));

// Health check endpoint for Railway
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

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

    await resend.emails.send({
      from: `${name} <${process.env.FROM_EMAIL}>`,
      to: [process.env.YOUR_EMAIL],
      reply_to: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `You have a new message from:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error during reCAPTCHA or email sending:', error);
    res.status(500).json({ message: 'An internal server error occurred.' });
  }
});

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
  const tabsDataPath = path.join(__dirname, 'data', 'tabData.json');
  res.sendFile(tabsDataPath, (err) => {
    if (err) {
      console.error('Error sending tabData.json:', err);
      res.status(404).send('Tab data not found');
    }
  });
});

app.get('/api/blog', (req, res) => {
  const blogDataPath = path.join(__dirname, 'data', 'blogData.json');
  const posts = JSON.parse(fs.readFileSync(blogDataPath, 'utf8'));
  // Return list without full content for the index
  const index = posts.map(({ content, ...rest }) => rest);
  res.json(index);
});

app.get('/api/blog/:slug', (req, res) => {
  const blogDataPath = path.join(__dirname, 'data', 'blogData.json');
  const posts = JSON.parse(fs.readFileSync(blogDataPath, 'utf8'));
  const post = posts.find(p => p.slug === req.params.slug);
  if (!post) return res.status(404).json({ message: 'Post not found' });
  res.json(post);
});

app.get('/api/store', (req, res) => {
  const storeDataPath = path.join(__dirname, 'data', 'storeData.json');
  res.sendFile(storeDataPath, (err) => {
    if (err) {
      console.error('Error sending storeData.json:', err);
      res.status(404).send('Store data not found');
    }
  });
});

app.post('/api/checkout/session', async (req, res) => {
  if (!stripe) {
    return res.status(503).json({ error: 'Store payments are not configured yet. Please check back soon.' });
  }
  const { productId } = req.body;
  if (!productId) return res.status(400).json({ error: 'Product ID is required.' });

  const storeDataPath = path.join(__dirname, 'data', 'storeData.json');
  const products = JSON.parse(fs.readFileSync(storeDataPath, 'utf8'));
  const product = products.find(p => p.id === productId);

  if (!product) return res.status(404).json({ error: 'Product not found.' });
  if (!product.stripePriceId) {
    return res.status(400).json({ error: 'This product is not yet available for purchase. Check back soon.' });
  }

  try {
    const siteUrl = process.env.SITE_URL || 'https://hamishc.nz';
    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: product.stripePriceId, quantity: 1 }],
      mode: 'payment',
      success_url: `${siteUrl}/store?payment=success`,
      cancel_url: `${siteUrl}/store?payment=cancelled`,
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err);
    res.status(500).json({ error: 'Payment processing error. Please try again.' });
  }
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'public/react', 'index.html'));
});

app.listen(HTTP_PORT, '0.0.0.0', () => {
  console.log(`HTTP Server is running on http://0.0.0.0:${HTTP_PORT}`);
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
