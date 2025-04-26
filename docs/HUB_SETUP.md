# Hub Website Setup Guide

This guide will walk you through the process of setting up your own Global Shapers Hub website using this platform.

## Prerequisites

- Node.js 18.x or later
- npm or yarn
- A Firebase account
- Basic knowledge of Git and GitHub
- A domain name (optional)

## Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/hub-platform.git
cd hub-platform
```

## Step 2: Install Dependencies

```bash
npm install
# or
yarn install
```

## Step 3: Set Up Firebase

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable the following Firebase services:
   - Authentication
   - Firestore Database
   - Storage
   - Analytics (optional)
3. Create a new web app in your Firebase project
4. Copy your Firebase configuration

## Step 4: Configure Your Hub

1. Create a new configuration file in `src/config/hubs/your-hub.ts`:

```typescript
import { Hub, HubConfig } from "../../features/hub/types";

export const yourHub: Hub = {
  id: "your-hub-id", // e.g., "newyork" or "tokyo"
  name: "Your Hub Name",
  description: "Your hub's description",
  location: "Your City, Country",
  logo: "/images/your-hub-logo.png",
  theme: {
    primaryColor: "#your-primary-color", // e.g., "#1E40AF"
    secondaryColor: "#your-secondary-color",
    accentColor: "#your-accent-color",
    fontFamily: "Your-Font", // e.g., "Inter"
    logo: "/images/your-hub-logo.png",
    favicon: "/favicon.ico",
  },
  socialLinks: {
    instagram: "https://instagram.com/yourhub",
    linkedin: "https://linkedin.com/company/yourhub",
    twitter: "https://twitter.com/yourhub",
    // Add other social media links as needed
  },
  contact: {
    email: "contact@yourhub.org",
    address: "Your Hub Address",
    phone: "Your Contact Number",
  },
  features: {
    blog: true,
    events: true,
    members: true,
    projects: true,
    newsletter: true,
    impact: true,
    faqs: true,
  },
};

export const yourHubConfig: HubConfig = {
  currentHub: yourHub,
  availableHubs: [yourHub],
};
```

## Step 5: Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Hub Configuration
NEXT_PUBLIC_HUB_NAME="Your Hub Name"
NEXT_PUBLIC_HUB_EMAIL=contact@yourhub.org
NEXT_PUBLIC_HUB_ADDRESS="Your Hub Address"
```

## Step 6: Update the Root Layout

Modify `src/app/layout.tsx` to use your hub configuration:

```typescript
import { yourHubConfig } from '../config/hubs/your-hub';

// In the RootLayout component:
<HubProvider config={yourHubConfig}>
  {/* ... */}
</HubProvider>
```

## Step 7: Add Your Content

1. **Images and Assets**:
   - Place your logo in `public/images/your-hub-logo.png`
   - Add other images to the `public/images` directory
   - Update favicon in `public/favicon.ico`

2. **Content Pages**:
   - Update the home page content in `src/app/page.tsx`
   - Modify or create new pages in the `src/app` directory
   - Update blog posts in the `src/content/posts` directory

3. **Blog Posts**:
   - Create new blog posts in the `src/content/posts` directory
   - Follow the existing markdown format
   - Add featured images in the `public/images/posts` directory

## Step 8: Customize Features

### Enable/Disable Features
Modify the `features` object in your hub configuration to enable or disable specific features:

```typescript
features: {
  blog: true,      // Enable/disable blog section
  events: true,    // Enable/disable events section
  members: true,   // Enable/disable members section
  projects: true,  // Enable/disable projects section
  newsletter: true,// Enable/disable newsletter signup
  impact: true,    // Enable/disable impact section
  faqs: true,      // Enable/disable FAQ section
}
```

### Customize Theme
Update the `theme` object in your hub configuration:

```typescript
theme: {
  primaryColor: "#your-color",    // Main brand color
  secondaryColor: "#your-color",  // Secondary brand color
  accentColor: "#your-color",     // Accent color for highlights
  fontFamily: "Your-Font",        // Custom font (if needed)
  // ... other theme properties
}
```

## Step 9: Deploy Your Website

1. **Local Testing**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. **Production Build**:
   ```bash
   npm run build
   # or
   yarn build
   ```

3. **Deployment Options**:
   - Vercel (recommended)
   - Netlify
   - Firebase Hosting
   - Your own server

## Step 10: Set Up Analytics and SEO

1. **Google Analytics**:
   - Add your tracking ID to the environment variables
   - Update the analytics configuration in `src/lib/analytics.ts`

2. **SEO Optimization**:
   - Update metadata in `src/app/layout.tsx`
   - Add OpenGraph tags
   - Create a sitemap.xml
   - Set up robots.txt

## Maintenance and Updates

1. **Regular Updates**:
   - Keep your dependencies updated
   - Regularly backup your content
   - Monitor your Firebase usage

2. **Content Management**:
   - Use the admin dashboard for content updates
   - Follow the content guidelines
   - Maintain consistent branding

## Support and Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [GitHub Issues](https://github.com/yourusername/hub-platform/issues)

## Troubleshooting

Common issues and solutions:

1. **Firebase Authentication Issues**:
   - Check your Firebase configuration
   - Verify API keys and domain settings
   - Enable required authentication methods

2. **Build Errors**:
   - Clear the `.next` directory
   - Check for missing dependencies
   - Verify TypeScript configurations

3. **Deployment Issues**:
   - Check environment variables
   - Verify build settings
   - Check deployment logs

## Contributing

We welcome contributions to improve this platform. To contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. 