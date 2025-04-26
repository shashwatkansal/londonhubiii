# Quick Start Guide

This guide will help you get your hub website up and running quickly.

## 1. Initial Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/hub-platform.git
cd hub-platform

# Install dependencies
npm install

# Create your hub configuration
cp src/config/hubs/london.ts src/config/hubs/your-hub.ts
```

## 2. Basic Configuration

1. Open `src/config/hubs/your-hub.ts` and update:
   - Hub name and description
   - Location
   - Contact information
   - Social media links
   - Theme colors

2. Create `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 3. Add Your Content

1. Replace the logo:
   ```bash
   cp your-logo.png public/images/your-hub-logo.png
   ```

2. Update the home page:
   - Edit `src/app/page.tsx`
   - Update hero section
   - Modify featured content

3. Add your first blog post:
   ```bash
   cp src/content/posts/example.md src/content/posts/your-first-post.md
   ```

## 4. Run Locally

```bash
npm run dev
```

Visit `http://localhost:3000` to see your site.

## 5. Deploy

1. Create a Vercel account
2. Connect your GitHub repository
3. Add environment variables
4. Deploy!

## Next Steps

- Customize your theme colors
- Add more blog posts
- Set up your member directory
- Configure your events calendar

For more detailed instructions, see the [Full Setup Guide](HUB_SETUP.md). 