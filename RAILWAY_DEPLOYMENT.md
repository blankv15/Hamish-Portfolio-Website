# Railway Deployment Guide

This guide will help you migrate your portfolio website from AWS Lightsail to Railway with Resend email integration.

## Prerequisites

1. Railway account (https://railway.app/)
2. Resend account (https://resend.com/)
3. GitHub repository connected to Railway

## Step 1: Set Up Resend

1. Go to https://resend.com/ and create an account
2. Verify your domain (hamishc.nz) by adding DNS records:
   - Go to Domains → Add Domain
   - Follow instructions to add TXT, MX, and CNAME records to your DNS provider
   - Wait for verification (usually takes a few minutes)

3. Create an API key:
   - Go to API Keys → Create API Key
   - Give it a name (e.g., "Portfolio Production")
   - Copy the API key (you won't see it again!)

4. Set your FROM_EMAIL to use your verified domain:
   - Example: `noreply@hamishc.nz` or `contact@hamishc.nz`

## Step 2: Deploy to Railway

### 2.1 Create New Project

1. Go to https://railway.app/new
2. Choose "Deploy from GitHub repo"
3. Select your portfolio repository
4. Railway will auto-detect your Dockerfile

### 2.2 Configure Environment Variables

In your Railway project, go to Settings → Variables and add:

**Required Variables:**
```
PORT=5001
RESEND_API_KEY=re_xxxxxxxxxxxxx
FROM_EMAIL=noreply@hamishc.nz
YOUR_EMAIL=your-email@example.com
RECAPTCHA_SECRET_KEY=your-recaptcha-secret-key

# Build-time variables (ARGs for Dockerfile)
VITE_API_URL=https://your-railway-app.railway.app
VITE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
```

**Important Notes:**
- Replace `VITE_API_URL` with your actual Railway URL (you'll get this after first deployment)
- You may need to redeploy after setting the correct `VITE_API_URL`

### 2.3 Configure Domain

1. In Railway project → Settings → Domains
2. Railway provides a free subdomain: `your-app.up.railway.app`
3. To use your custom domain (hamishc.nz):
   - Add custom domain in Railway
   - Update your DNS records to point to Railway
   - Railway automatically handles SSL/TLS certificates

### 2.4 Deploy

1. Railway will automatically deploy on every push to your main branch
2. Monitor the build logs in the Railway dashboard
3. Once deployed, test the deployment URL

## Step 3: Update GitHub Actions (Optional)

Your current GitHub Actions workflow deploys to AWS Lightsail. You have two options:

### Option A: Disable GitHub Actions
- Delete or rename `.github/workflows/deploy.yml`
- Railway will handle deployments automatically

### Option B: Update for Railway
Replace the contents of `.github/workflows/deploy.yml` with Railway CLI deployment (if needed)

## Step 4: Test Your Deployment

1. Visit your Railway URL
2. Test the contact form to ensure emails are sent via Resend
3. Check Resend dashboard for email logs

## Step 5: DNS Migration

Once everything works on Railway:

1. Update your domain DNS records from AWS to Railway
2. Point your A/CNAME records to Railway's provided URL
3. Wait for DNS propagation (can take up to 48 hours, usually faster)

## Key Differences from AWS Lightsail

| Feature | AWS Lightsail | Railway |
|---------|--------------|---------|
| SSL Certificates | Manual Let's Encrypt | Automatic |
| Port Management | HTTPS on 5002 | Automatic HTTPS |
| Email Sending | SMTP (blocked ports) | Resend API |
| Deployments | GitHub Actions + SSH | Auto-deploy on push |
| Scaling | Manual | Automatic |

## Troubleshooting

### Email Not Sending
- Verify your domain in Resend dashboard
- Check FROM_EMAIL uses verified domain
- Review Resend logs for errors

### Build Failures
- Check that environment variables are set
- Review Railway build logs
- Ensure Dockerfile is in root directory

### 404 Errors
- Verify `VITE_API_URL` points to correct Railway URL
- May need to rebuild frontend with correct API URL

## Cost Comparison

- **Railway**: $5/month for Hobby plan (includes 500 hours)
- **Resend**: Free tier includes 3,000 emails/month
- **AWS Lightsail**: Variable based on instance size

## Rolling Back

If you need to rollback to AWS:
1. Railway keeps your deployments versioned
2. DNS can be pointed back to AWS
3. Old code is still in git history

## Support

- Railway Docs: https://docs.railway.app/
- Resend Docs: https://resend.com/docs
- Railway Discord: https://discord.gg/railway
