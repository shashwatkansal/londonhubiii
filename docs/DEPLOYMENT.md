# 🚀 Deployment Guide

This guide covers all the ways you can deploy your Global Shapers Hub website, from simple one-click deployments to advanced self-hosted setups.

## 🎯 Quick Deployment (Recommended)

### Vercel (One-Click Deploy)
**Best for:** Most hubs, automatic deployments, custom domains

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-org/global-shapers-template)

**Steps:**
1. Click the deploy button above
2. Sign in with GitHub
3. Name your project (e.g., "paris-hub-website")
4. Click "Deploy"
5. Your site will be live in 2-3 minutes!

**Features:**
- ✅ Automatic deployments on Git push
- ✅ Free custom domain support
- ✅ Built-in SSL certificates
- ✅ Global CDN
- ✅ Preview deployments for pull requests

### Netlify (Alternative One-Click)
**Best for:** Static sites, form handling, edge functions

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/your-org/global-shapers-template)

**Steps:**
1. Click the deploy button above
2. Sign in with GitHub
3. Configure your repository
4. Click "Deploy site"

**Features:**
- ✅ Automatic deployments
- ✅ Form handling (great for contact forms)
- ✅ Split testing
- ✅ Edge functions
- ✅ Free tier available

## 🔧 Manual Deployment

### Prerequisites
- Node.js 18+ installed
- Git installed
- Your customized repository

### Build Process
```bash
# Clone your customized repository
git clone https://github.com/your-hub/your-hub-website.git
cd your-hub-website

# Install dependencies
npm install

# Build for production
npm run build

# Test the build locally (optional)
npm start
```

## 🌐 Platform-Specific Guides

### Vercel (Detailed Setup)

#### 1. GitHub Integration
```bash
# Push your code to GitHub
git add .
git commit -m "Initial hub setup"
git push origin main
```

#### 2. Import Project
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure build settings (usually auto-detected)

#### 3. Environment Variables
In Vercel dashboard:
1. Go to Project Settings → Environment Variables
2. Add your environment variables:
   ```
   NEXT_PUBLIC_HUB_NAME=Your Hub Name
   NEXT_PUBLIC_CITY_NAME=Your City
   NEXT_PUBLIC_EMAIL_ADDRESS=yourhub@gmail.com
   ```

#### 4. Custom Domain
1. Go to Project Settings → Domains
2. Add your domain (e.g., `yourhub.com`)
3. Update DNS settings as instructed
4. SSL certificate is automatically provisioned

### Netlify (Detailed Setup)

#### 1. Site Configuration
Create `netlify.toml` in your project root:
```toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Optional: Form handling
[[forms]]
  name = "contact"
```

#### 2. Environment Variables
In Netlify dashboard:
1. Go to Site Settings → Environment Variables
2. Add your variables (same as Vercel example above)

#### 3. Custom Domain
1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS records

### GitHub Pages (Free Option)

#### 1. Enable GitHub Pages
1. Go to your repository on GitHub
2. Settings → Pages
3. Source: "GitHub Actions"

#### 2. Create Workflow
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
```

#### 3. Configure Next.js
Update `next.config.mjs`:
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
};

export default nextConfig;
```

## 🏢 Self-Hosted Deployment

### Docker Deployment

#### 1. Create Dockerfile
```dockerfile
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app

COPY --from=builder /app/out ./out
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./

RUN npm ci --only=production

EXPOSE 3000
CMD ["npm", "start"]
```

#### 2. Build and Run
```bash
# Build Docker image
docker build -t your-hub-website .

# Run container
docker run -p 3000:3000 -d your-hub-website
```

#### 3. Docker Compose (with NGINX)
Create `docker-compose.yml`:
```yaml
version: '3.8'
services:
  app:
    build: .
    container_name: hub-website
    restart: unless-stopped
    
  nginx:
    image: nginx:alpine
    container_name: hub-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
```

### Traditional Server (VPS/Dedicated)

#### 1. Server Setup (Ubuntu/Debian)
```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 (Process Manager)
sudo npm install -g pm2

# Install NGINX
sudo apt install nginx -y
```

#### 2. Deploy Application
```bash
# Clone your repository
git clone https://github.com/your-hub/your-hub-website.git
cd your-hub-website

# Install dependencies and build
npm ci --production
npm run build

# Start with PM2
pm2 start npm --name "hub-website" -- start
pm2 save
pm2 startup
```

#### 3. Configure NGINX
Create `/etc/nginx/sites-available/yourhub.com`:
```nginx
server {
    listen 80;
    server_name yourhub.com www.yourhub.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:
```bash
sudo ln -s /etc/nginx/sites-available/yourhub.com /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## 🔒 SSL/HTTPS Setup

### Automatic SSL (Vercel/Netlify)
- SSL certificates are automatically provisioned
- No additional configuration needed

### Let's Encrypt (Self-Hosted)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourhub.com -d www.yourhub.com

# Auto-renewal is set up automatically
sudo systemctl status certbot.timer
```

## 🌍 CDN & Performance

### Cloudflare Setup (Optional)
1. Sign up for Cloudflare
2. Add your domain
3. Update nameservers
4. Enable caching and optimization features

### Performance Optimization
```javascript
// next.config.mjs optimizations
const nextConfig = {
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  
  images: {
    domains: ['yourdomain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  experimental: {
    optimizeCss: true,
  },
};
```

## 📊 Monitoring & Analytics

### Basic Monitoring
```bash
# PM2 monitoring
pm2 monit

# NGINX logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Advanced Monitoring
- **Uptime monitoring:** UptimeRobot, Pingdom
- **Performance:** Google PageSpeed Insights
- **Analytics:** Google Analytics, Plausible
- **Error tracking:** Sentry

## 🔄 CI/CD Pipeline

### GitHub Actions (Advanced)
Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: vercel/action@v1
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🆘 Troubleshooting

### Common Issues

#### Build Failures
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be 18+
```

#### Environment Variables Not Working
- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Restart development server after adding variables
- Check deployment platform environment variable settings

#### Images Not Loading
- Verify image paths are correct
- Check image file names (case-sensitive)
- Ensure images are in `public/` directory

#### Deployment Platform Issues
- **Vercel:** Check build logs in dashboard
- **Netlify:** Review deploy logs
- **GitHub Pages:** Check Actions tab for workflow status

### Getting Help
1. Check deployment platform documentation
2. Review build logs for specific errors
3. Test locally with `npm run build && npm start`
4. Open an issue in the repository with deployment details

## 📋 Deployment Checklist

### Pre-Deployment
- [ ] All customizations completed
- [ ] Environment variables configured
- [ ] Images optimized and uploaded
- [ ] Local build successful (`npm run build`)
- [ ] All links and forms tested

### Post-Deployment
- [ ] Website loads correctly
- [ ] All pages accessible
- [ ] Forms working (if applicable)
- [ ] Mobile responsiveness verified
- [ ] SSL certificate active
- [ ] Analytics tracking set up
- [ ] Custom domain configured (if applicable)
- [ ] SEO meta tags verified

### Ongoing Maintenance
- [ ] Regular content updates
- [ ] Security updates applied
- [ ] Performance monitoring active
- [ ] Backup strategy in place
- [ ] Team access configured

---

**Your Global Shapers Hub website is now live! 🌍**

*Need help with deployment? Check our [troubleshooting section](#-troubleshooting) or [open an issue](../../issues).* 