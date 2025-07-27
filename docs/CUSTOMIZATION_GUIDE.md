# 🎨 Complete Customization Guide

This guide will help you customize every aspect of your Global Shapers Hub website. Follow these steps to make it uniquely yours!

## 📋 Table of Contents

1. [Quick Start](#quick-start)
2. [Essential Customizations](#essential-customizations)
3. [Impact Page Customization](#impact-page-customization)
4. [Visual Customization](#visual-customization)
5. [Content Management](#content-management)
6. [Advanced Customization](#advanced-customization)
7. [Deployment](#deployment)

## 🚀 Quick Start

### 1. Run the Setup Script

```bash
npm run setup
# or
node scripts/setup.js
```

This interactive script will:
- Configure your hub's basic information
- Set up environment variables
- Create necessary directories
- Generate configuration files

### 2. Install Dependencies

```bash
npm install
# or for faster installation
bun install
```

### 3. Start Development Server

```bash
npm run dev
# or
bun run dev
```

## 🔧 Essential Customizations

### Hub Information (`src/lib/settings.ts`)

```typescript
export const HUB_CONFIG = {
  // Basic Information
  HUB_NAME: "Your Hub Name",
  CITY_NAME: "Your City",
  COUNTRY: "Your Country",
  
  // Contact
  EMAIL_ADDRESS: "yourhub@email.com",
  
  // Social Media
  TWITTER_HANDLE: "@yourhub",
  FACEBOOK_URL: "https://facebook.com/yourhub",
  INSTAGRAM_URL: "https://instagram.com/yourhub",
  LINKEDIN_URL: "https://linkedin.com/company/yourhub",
  
  // Website
  HUB_URL: "https://yourhub.com",
};
```

### Text Content (`src/lib/texts.ts`)

All user-facing text is centralized here:

```typescript
export const TEXTS = {
  hero: {
    title: "Change Begins",
    subtitle: "With You",
    typed: [
      "Building Tomorrow's Leaders",
      "Creating Lasting Impact",
      "Shaping Our Community",
    ],
  },
  // ... customize all sections
};
```

## 🎯 Impact Page Customization

### 1. Impact Metrics (`src/lib/impact-config.ts`)

Update your hub's achievements:

```typescript
metrics: [
  {
    id: 'people-reached',
    icon: 'users',
    value: 50000, // Your actual number
    suffix: '+',
    label: 'People Reached',
    description: 'Community members directly impacted',
    color: 'bg-blue-600',
  },
  // Add more metrics...
]
```

### 2. Featured Projects

Add your hub's projects:

```typescript
projects: [
  {
    id: 'project-1',
    title: 'Your Project Name',
    description: 'Brief description of the project',
    image: '/assets/images/projects/your-project.jpg',
    category: 'education', // education, sustainability, health, tech, community
    date: 'March 2024',
    team: ['Member 1', 'Member 2'],
    impact: 'Specific impact achieved',
    link: 'https://project-link.com', // optional
    featured: true, // Makes it larger in the grid
  },
  // Add more projects...
]
```

### 3. Timeline Events

Document your hub's journey:

```typescript
timeline: [
  {
    id: 'founding',
    year: '2020',
    title: 'Hub Founded',
    description: 'Your founding story',
    icon: 'check', // check, award, users, globe
    color: 'bg-blue-600',
    highlight: true, // Makes it stand out
  },
  // Add more milestones...
]
```

### 4. Partner Organizations

```typescript
partners: [
  {
    id: 'partner-1',
    name: 'Partner Name',
    logo: '/assets/images/partners/partner-logo.png',
    url: 'https://partner-website.com',
  },
  // Add more partners...
]
```

## 🎨 Visual Customization

### Theme Colors (`tailwind.config.ts`)

```typescript
theme: {
  extend: {
    colors: {
      "wef-blue": "#003C71", // Your primary color
      "wef-light-blue": "#89CFF0", // Your secondary color
      // Add your brand colors
    },
  },
}
```

### Logo and Images

Replace these files with your hub's assets:

```
public/
├── assets/
│   ├── images/
│   │   ├── gs_white_logo.png      # Your hub logo
│   │   ├── hub3photo.jpg          # Hero section background
│   │   ├── christmas.jpg          # Team photo
│   │   ├── newsletter.png         # Newsletter preview
│   │   └── working.jpg            # About page image
│   ├── projects/                  # Project images
│   │   ├── project-1.jpg
│   │   └── ...
│   └── partners/                  # Partner logos
│       ├── partner-1.png
│       └── ...
```

### Fonts

To use custom fonts:

1. Add font files to `public/assets/fonts/`
2. Update `src/app/globals.css`:

```css
@font-face {
  font-family: "YourFont";
  src: url("/assets/fonts/your-font.woff") format("woff");
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}
```

3. Update `tailwind.config.ts`:

```typescript
fontFamily: {
  sans: ['"YourFont"', 'sans-serif'],
}
```

## 📝 Content Management

### Creating Blog Posts

1. Sign in to the dashboard at `/hub/dashboard`
2. Navigate to "Create Post"
3. Fill in the post details:
   - Title
   - Content (supports rich text)
   - Cover image
   - Authors
   - Tags

### Managing FAQs

1. Go to Dashboard → FAQs
2. Add questions and answers
3. They'll automatically appear on the FAQs page

### Team Members

1. Dashboard → User Management
2. Add team members with:
   - Name
   - Email
   - Role
   - Profile image

## 🚀 Advanced Customization

### Feature Flags (`src/lib/config.ts`)

Enable/disable features:

```typescript
features: {
  enableBlog: true,
  enableEvents: true,
  enableNewsletter: true,
  enableDonations: false,
  enableMemberDirectory: true,
  enableProjects: true,
  enablePartners: true,
  enableDashboard: true,
  enableAnalytics: true,
  enableComments: false,
  enableSearch: true,
  enableMultiLanguage: false,
  enableDarkMode: false,
  enablePWA: true,
  maintenanceMode: false,
}
```

### Adding New Pages

1. Create a new file: `src/app/your-page/page.tsx`
2. Add the page component:

```typescript
import { generateSEOMetadata } from '@/components/SEO';

export const metadata = generateSEOMetadata({
  title: 'Your Page Title',
  description: 'Page description',
});

export default function YourPage() {
  return (
    <main>
      {/* Your content */}
    </main>
  );
}
```

3. Add to navigation in `src/app/_components/header.tsx`

### Custom Components

Create reusable components in `src/components/`:

```typescript
// src/components/YourComponent.tsx
export const YourComponent = ({ title, description }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};
```

## 🌐 Deployment

### Environment Variables

Set these in your hosting platform:

```env
# Required
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
ENCRYPTION_KEY=

# Optional
NEXT_PUBLIC_GA_ID=
NEXT_PUBLIC_GTM_ID=
NEXT_PUBLIC_SENTRY_DSN=
```

### Vercel Deployment

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Custom Domain

1. Add domain in Vercel/Netlify settings
2. Update DNS records
3. Enable HTTPS

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Firebase Setup](https://firebase.google.com/docs/web/setup)
- [Vercel Deployment](https://vercel.com/docs)

## 🆘 Need Help?

- Check `docs/` directory for more guides
- Open an issue on GitHub
- Contact the template maintainers

---

Made with ❤️ for Global Shapers worldwide