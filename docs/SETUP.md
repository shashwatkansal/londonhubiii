# 🚀 Global Shapers Hub Website Setup Guide

This guide will walk you through setting up your own Global Shapers Hub website using this template. No coding experience required!

## 📋 Prerequisites

Before you start, make sure you have:
- A computer with internet access
- A GitHub account (free at [github.com](https://github.com))
- Basic familiarity with editing text files

## 🎯 Quick Start (5 Minutes)

### Step 1: Get Your Copy
1. Go to the main repository page
2. Click the green **"Use this template"** button
3. Name your repository (e.g., `paris-hub-website`)
4. Make it **Public** (recommended for open source)
5. Click **"Create repository from template"**

### Step 2: Basic Customization
1. In your new repository, click on `src/lib/settings.ts`
2. Click the **pencil icon** to edit
3. Replace the London Hub III details with your hub's information:
   ```typescript
   HUB_NAME: "Your Hub Name", // e.g., "Paris Hub"
   CITY_NAME: "Your City", // e.g., "Paris"
   EMAIL_ADDRESS: "yourhub@gmail.com",
   // ... update other fields as needed
   ```
4. Click **"Commit changes"** at the bottom

### Step 3: Deploy Your Website
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Click **"New Project"**
4. Import your repository
5. Click **"Deploy"**
6. Your website will be live in 2-3 minutes!

## 🎨 Complete Customization Guide

### 1. Hub Information & Branding

**File to edit:** `src/lib/settings.ts`

Replace these key values with your hub's details:

```typescript
export const HUB_CONFIG = {
  // Basic Info
  HUB_NAME: "Your Hub Name",
  CITY_NAME: "Your City",
  EMAIL_ADDRESS: "yourhub@gmail.com",
  
  // Social Media
  TWITTER_HANDLE: "@yourhub",
  FACEBOOK_URL: "https://www.facebook.com/yourhub",
  INSTAGRAM_URL: "https://www.instagram.com/yourhub/",
  LINKEDIN_URL: "https://www.linkedin.com/company/your-id",
  
  // Website
  HUB_URL: "https://yourhub.vercel.app", // Your deployed URL
  
  // Contact
  PHYSICAL_ADDRESS: "Your Hub Address, City, Country",
  PHONE_NUMBER: "+XX XXX XXX XXXX",
};
```

### 2. Website Text & Content

**File to edit:** `src/lib/texts.ts`

Customize all the text that appears on your website:

```typescript
export const TEXTS = {
  hero: {
    title: "Change Begins",
    subtitle: "With You",
    typed: ["Local Ideas.", "Global Support.", "Real-World Impact."],
  },
  mission: {
    heading: "Our Mission in",
    description: (city: string, hub: string) =>
      `The ${hub} is a dynamic network of young leaders...`,
  },
  // ... customize other sections
};
```

### 3. Images & Assets

**Folder:** `public/assets/images/`

Replace these images with your hub's photos:
- `gs_white_logo.png` - Your hub's logo (white version)
- `wef_logo.png` - World Economic Forum logo (usually keep as is)
- `hub3photo.jpg` - Main hub photo for About page
- `christmas.jpg` - Team photo
- `cover.jpg` - Blog post covers (in `public/assets/blog/`)

**Image Requirements:**
- Logo: 200x200px, PNG with transparent background
- Hub photo: 1200x800px, JPG
- Team photo: 1200x600px, JPG

### 4. Dashboard Resources

Update these URLs in `settings.ts` to point to your hub's resources:

```typescript
// Dashboard/Hub Resources
CALENDAR_EMBED_URL: "https://calendar.google.com/calendar/embed?src=YOUR_CALENDAR_ID",
NOTION_URL: "https://www.notion.so/your-workspace",
TEAM_ALLOCATIONS_URL: "https://docs.google.com/document/d/YOUR_DOC_ID",
NEWSLETTER_URL: "https://your-newsletter-link",
```

### 5. Application Forms

Update these URLs to point to your hub's application forms:

```typescript
APPLICATION_URL: "https://forms.gle/your-application-form",
TRANSFER_APPLICATION_URL: "https://forms.gle/your-transfer-form",
```

## 🔧 Advanced Setup (Optional)

### Environment Variables

For more advanced configuration, create a `.env.local` file in your project root:

```bash
# Copy from .env.example and customize
NEXT_PUBLIC_HUB_NAME="Your Hub Name"
NEXT_PUBLIC_CITY_NAME="Your City"
NEXT_PUBLIC_EMAIL_ADDRESS="yourhub@gmail.com"
# ... add other variables as needed
```

### Firebase Setup (For Dashboard Features)

If you want the full dashboard with user management:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication and Firestore
4. Get your config and add to `.env.local`:
   ```bash
   NEXT_PUBLIC_FIREBASE_API_KEY="your-api-key"
   NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-project-id"
   # ... other Firebase config
   ```

### Custom Domain

To use your own domain (e.g., `yourhub.com`):

1. In Vercel dashboard, go to your project
2. Click **"Domains"**
3. Add your custom domain
4. Update DNS settings as instructed
5. Update `HUB_URL` in `settings.ts`

## 📝 Content Management

### Adding Blog Posts

1. Create markdown files in `_posts/` folder
2. Use this format:
   ```markdown
   ---
   title: "Your Post Title"
   excerpt: "Brief description"
   coverImage: "/assets/blog/your-post/cover.jpg"
   date: "2024-01-15T05:35:07.322Z"
   authors:
     - name: "Author Name"
       email: "author@email.com"
   ---
   
   Your post content here...
   ```

### Managing FAQs

Use the dashboard at `/hub/dashboard` (requires admin access) or edit directly in the database.

### Managing Team Members

Use the dashboard's User Management section to add/edit team members.

## 🚀 Deployment Options

### Vercel (Recommended - Free)
1. Connect your GitHub repository
2. Automatic deployments on every push
3. Free custom domain support

### Netlify (Alternative - Free)
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `out`

### Self-Hosted
1. Build the project: `npm run build`
2. Export static files: `npm run export`
3. Upload the `out/` folder to your web server

## 🆘 Troubleshooting

### Common Issues

**Images not showing:**
- Check file paths in `settings.ts`
- Ensure images are in `public/assets/images/`
- File names are case-sensitive

**Deployment fails:**
- Check for syntax errors in `settings.ts` and `texts.ts`
- Ensure all required fields are filled
- Check Vercel/Netlify build logs

**Dashboard not working:**
- Set up Firebase configuration
- Ensure you have admin access
- Check browser console for errors

### Getting Help

1. Check the [Issues](../../issues) section
2. Create a new issue with:
   - What you were trying to do
   - What happened instead
   - Screenshots if applicable
3. Contact your hub's tech lead

## 🎉 You're Done!

Your Global Shapers Hub website is now live! Share the URL with your team and start building your online presence.

**Next Steps:**
- Add your team members to the dashboard
- Create your first blog post
- Set up Google Analytics (optional)
- Add your hub to the Global Shapers directory

---

**Happy Shaping!** 🌍 