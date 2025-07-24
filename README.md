# Full-Stack Portfolio Website & CI/CD Pipeline

This is the complete source code for my personal portfolio website, available at [hamishc.nz](https://hamishc.nz). This project is more than just a frontend showcase; it's a full-stack application featuring a complete CI/CD pipeline that automates the entire process from a `git push` to a live deployment on a cloud server.

---

## Tech Stack

This project is built with a modern, full-stack JavaScript architecture and a professional DevOps toolchain.

| Category      | Technology                                                              |
| :------------ | :---------------------------------------------------------------------- |
| **Frontend** | React, Vite, Mantine UI, CSS3                                           |
| **Backend** | Node.js, Express.js                                                     |
| **DevOps** | Docker, Docker Compose, GitHub Actions, AWS Lightsail                     |
| **Services** | Nodemailer (for emails), Google reCAPTCHA v3 (for security)             |
| **Database** | Static JSON files (served via API)                                      |

---

## Key Features

- **Modular Architecture:** The entire frontend is built on a component-based architecture, with each section (Navbar, Hero, Projects, etc.) refactored into its own reusable and maintainable file.
- **Responsive & Mobile-First Design:** The site is fully responsive and designed to provide a seamless experience on all devices, from mobile phones to desktops.
- **Dynamic Content:** All project and skills data is served from a backend API, allowing for easy updates without needing to redeploy the frontend code.
- **Secure Contact Form:** The form is protected from spam by Google reCAPTCHA v3. Submissions are securely sent via a backend endpoint that uses Nodemailer to dispatch emails, with clear success or error messages displayed to the user.
- **Interactive Components:** The site can render live, functional React components (like the Stopwatch) directly within a project's description, offering a truly interactive showcase.

---

## CI/CD & DevOps Pipeline

This project features a complete, automated deployment pipeline using modern DevOps practices.

1.  **Containerisation:** The entire application (Vite React frontend and Express.js backend) is containerised using a multi-stage `Dockerfile`. This creates a single, lightweight, and portable image for deployment.
2.  **Continuous Integration:** A GitHub Actions workflow is configured to trigger on every push to the `main` branch.
3.  **Build & Push:** The workflow builds the production Docker image, securely injecting production environment variables, and pushes it to a private repository on Docker Hub.
4.  **Continuous Deployment:** The final step of the workflow securely connects to an AWS Lightsail (Ubuntu) instance via SSH.
5.  **Zero-Downtime Deployment:** On the server, Docker Compose pulls the new image and seamlessly restarts the container with the updated application, ensuring the website is always available.

---

## Project Structure

The repository is organised into a monorepo structure to keep the frontend and backend code separate but within the same project.

```
/
├── backend/                # Contains the Node.js/Express server
│   ├── data/               # Holds the JSON files for projects and skills
│   ├── public/             # Serves static assets like images and CV
│   ├── .env                # Local environment variables for the backend
│   └── server.js           # The main Express server file
│
├── frontend/               # Contains the Vite/React frontend application
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   └── ...
│   ├── .env                # Local environment variables for the frontend
│   └── ...
│
├── .github/workflows/      # GitHub Actions workflow for CI/CD
│   └── deploy.yml
│
├── .dockerignore           # Specifies files to exclude from the Docker image
├── Dockerfile              # Defines the multi-stage Docker build
└── README.md               # This file
```

---

## Getting Started with Local Development

To run this project on your local machine, follow these steps:

### Prerequisites

- Node.js (v18 or later)
- npm
- Docker Desktop

### 1. Clone the Repository

```bash
git clone https://github.com/blankv15/Hamish-Portfolio-Website.git
cd hamish-portfolio-website
```

### 2. Install Dependencies

```bash
# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ../backend && npm install
```

### 3. Configure Environment Variables

You will need to create two `.env` files for local development. These files should be placed in the `frontend` and `backend` directories respectively and should **not** be committed to Git.

**A. Frontend (`frontend/.env`):**

```
# The URL of your local backend server
VITE_API_URL=http://localhost:5001

# Your reCAPTCHA Site Key for localhost
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_goes_here
```

**B. Backend (`backend/.env`):**

```
# The port your Express app will run on
PORT=5001

# Your email provider's SMTP details
SMTP_HOST=your_smtp_host
SMTP_PORT=your_smtp_port
SMTP_SECURE=true
SMTP_USER=your_smtp_username
SMTP_PASS=your_smtp_password

# Email addresses used in your contact form
FROM_EMAIL=the_email_address_your_provider_sends_from
YOUR_EMAIL=the_email_address_you_want_to_receive_mail_at

# Your Google reCAPTCHA secret key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_goes_here
```

### 4. Run the Application

You can run the frontend and backend separately for development or use Docker for a production-like environment.

**A. Run Separately (Standard Development):**

```bash
# Terminal 1 (for the backend)
cd backend && node server.js

# Terminal 2 (for the frontend)
cd frontend && npm run dev
```

**B. Run with Docker (Production Simulation):**

```bash
# Build the Docker image
docker build --build-arg VITE_API_URL=http://localhost:5001 --build-arg VITE_RECAPTCHA_SITE_KEY=your_dev_key -t portfolio-test .

# Run the container
docker run -p 8080:5001 --env-file ./backend/.env portfolio-test
```

The application will be available at `http://localhost:8080`.

---

## Production Deployment

The production environment is managed entirely by the automated CI/CD pipeline. The live server on AWS Lightsail runs the application as a Docker container managed by Docker Compose. All necessary environment variables are stored securely in a `.env` file on the server.

---

## Licence

This project is licenced under the MIT Licence.
