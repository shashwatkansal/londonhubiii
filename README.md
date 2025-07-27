# 🌍 Global Shapers Hub Website Template

**A stunning, production-ready website template for Global Shapers Hubs worldwide. Built with Next.js, TypeScript, and Tailwind CSS.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shashwatkansal/londonhubiii)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/shashwatkansal/londonhubiii)
[![License: CC BY-NC 4.0](https://img.shields.io/badge/License-CC%20BY--NC%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc/4.0/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/shashwatkansal/londonhubiii/pulls)

---

## ✨ Why This Template?

This template was created by **London Hub III (Shashwat Kansal)** to help Global Shapers hubs worldwide launch professional websites quickly and easily. Instead of building from scratch, focus on what matters most: **your content and community**.

### 🎯 Perfect For
- **New hubs** launching their first website
- **Existing hubs** wanting a modern, professional redesign
- **Non-technical teams** who need something that "just works"
- **Technical teams** who want a solid foundation to build upon

---

## 🚀 Features

### 🎨 **Production-Ready & Stunning**
- ⚡ **Lightning Fast**: 95+ Lighthouse score, optimized images, code splitting
- 🎯 **Interactive Impact Page**: Animated metrics, project showcase, timeline visualization
- 🔒 **Enterprise Security**: Security headers, input validation, secure authentication
- ♿ **Fully Accessible**: WCAG compliant, keyboard navigation, screen reader support
- 📱 **PWA Ready**: Works offline, installable, push notifications

### 🛠️ **Easy Customization**
- 🚀 **5-Minute Setup**: Interactive setup script configures everything
- 📝 **No-Code Customization**: Edit configuration files, not code
- 🎨 **Flexible Theming**: Change colors, fonts, layouts easily
- 🌍 **Multi-Language Ready**: Built-in internationalization support

### 📊 **Powerful Dashboard**
- 👥 **Member Management**: User roles, permissions, profiles
- 📝 **Content Management**: Blog posts, FAQs, announcements
- 📈 **Analytics Integration**: Google Analytics, custom metrics
- 🔐 **Secure Admin Panel**: Role-based access control

### 🌐 **Complete Website Solution**
- **Homepage**: Hero section, impact metrics, featured projects
- **Our Impact**: Interactive showcase of projects and achievements
- **About**: Team profiles, mission, values
- **Blog**: Rich text editor, categories, SEO optimization
- **Dashboard**: Complete admin interface

### ⚡ **One-Click Deployment**
- Deploy to Vercel or Netlify in seconds
- Automatic HTTPS and custom domains
- CI/CD pipeline ready
- Environment variable management

---

## 🏃‍♂️ Quick Start (5 Minutes)

### 1. **Use Our Setup Script** ✨ NEW!
```bash
# Clone the template
git clone https://github.com/shashwatkansal/londonhubiii.git your-hub-website
cd your-hub-website

# Run interactive setup
npm run setup
```

The setup script will:
- 🔧 Configure your hub's information
- 📱 Set up social media links
- 🔐 Configure Firebase credentials
- 📁 Create necessary directories
- 🎨 Generate placeholder content

### 2. **Install & Run**
```bash
npm install  # or bun install for faster installation
npm run dev  # or bun run dev
```

### 3. **Quick Customization**
The setup script creates `.env.local` with your configuration. For further customization:
- `src/lib/impact-config.ts` - Impact metrics, projects, timeline
- `src/lib/texts.ts` - All website text content
- `src/lib/settings.ts` - Additional hub settings

### 4. **Deploy in Seconds**
```bash
# Push to GitHub
git add .
git commit -m "Initial setup for [Your Hub Name]"
git push origin main

# Then click the deploy button above!
```

**🎉 Your stunning website is live!**

---

## 📝 Setup Checklist (Required for First-Time Use)

Follow these steps to ensure your hub website works out of the box:

1. **Set Up Firebase**
   - Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - Add a new Web App to your project.
   - Enable **Firestore Database** (start in test mode for development).
   - Enable **Authentication** (Email/Password, Google sign-in) in the Auth section.

2. **Configure Firebase Environment Variables**
   - Copy your Firebase config values (apiKey, authDomain, etc.) from your Firebase project settings.
   - Paste them into your `.env` file (or Vercel/Netlify project settings) using the variable names in `.env.example`.
   - On Vercel: Go to Project > Settings > Environment Variables and add all `NEXT_PUBLIC_FIREBASE_...` and `ENCRYPTION_KEY` values.

3. **Set Up Admin Access**
   - In Firestore, create a collection called `admins`.
   - Add a document with your email address as the document ID (e.g., `your.email@example.com`).
   - This will grant you access to the admin dashboard when you sign in with that email.

4. **Replace Images and Assets**
   - Replace the images in `public/assets/images/` (e.g., `gs_white_logo.png`, `hub3photo.jpg`, `christmas.jpg`) with your hub's branding and team photos.
   - Update blog cover images in `public/assets/blog/` as needed.

5. **Edit Homepage and Content**
   - Edit `src/lib/settings.ts` for your hub's name, city, links, and branding.
   - Edit `src/lib/texts.ts` for all user-facing text and section headings.
   - Optionally, customize the homepage layout and sections in `src/app/page.tsx`.

6. **Vercel Deployment: Use Bun**
   - When deploying to Vercel, go to Project > Settings > General > Build & Development Settings.
   - Set the **Install Command** to `bun install` (instead of `npm install` or `yarn install`).
   - Set the **Build Command** to `bun run build`.

---

## 📚 Documentation

### 📖 **For Everyone**
- **[Setup Guide](docs/SETUP.md)** - Step-by-step instructions (no coding required)
- **[Customization Examples](docs/EXAMPLES.md)** - See how other hubs customized their sites

### 🛠️ **For Developers**
- **[Developer Guide](docs/CUSTOMIZATION.md)** - Technical architecture and advanced customization
- **[API Reference](docs/API.md)** - Component props and configuration options
- **[Contributing Guide](CONTRIBUTING.md)** - How to contribute to the template

---

## 🌟 Live Examples

See how other hubs are using this template:

- **[London Hub III](https://londonshapersiii.com)** - Original template creator

*Want to add your hub to this list? [Open a PR](https://github.com/shashwatkansal/londonhubiii/pulls)!*

---

## 🔧 Configuration Overview

### Essential Files to Customize

```typescript
// src/lib/settings.ts - Your hub's configuration
export const HUB_CONFIG = {
  HUB_NAME: "Your Hub Name",
  CITY_NAME: "Your City", 
  EMAIL_ADDRESS: "yourhub@gmail.com",
  // ... 40+ more options
};
```

```typescript
// src/lib/impact-config.ts - Impact page content (NEW!)
export const impactConfig = {
  metrics: [
    {
      value: 50000,
      label: 'People Reached',
      description: 'Community members impacted'
    }
  ],
  projects: [
    {
      title: 'Digital Literacy Program',
      category: 'education',
      impact: '500+ seniors trained'
    }
  ],
  timeline: [
    {
      year: '2024',
      title: 'Global Recognition',
      description: 'Received impact award'
    }
  ]
};
```

```typescript
// src/lib/texts.ts - All website text
export const TEXTS = {
  hero: {
    title: "Change Begins",
    subtitle: "With You",
  },
  // ... all other text content
};
```

### Asset Structure
```
public/assets/
├── images/
│   ├── gs_white_logo.png     # Your hub logo
│   ├── hub3photo.jpg         # Main hub photo
│   ├── projects/             # Project images (NEW!)
│   └── partners/             # Partner logos (NEW!)
└── blog/
    └── [post-name]/
        └── cover.jpg         # Blog post covers
```

---

## 🤝 Community & Support

### 💬 **Get Help**
- 📋 [GitHub Issues](https://github.com/shashwatkansal/londonhubiii/issues) - Bug reports and feature requests
- 💡 [GitHub Discussions](https://github.com/shashwatkansal/londonhubiii/discussions) - Questions and ideas
- 📧 Email: [template-support@globalshapers.org](mailto:template-support@globalshapers.org)

### 🌟 **Contribute**
We welcome contributions from all Global Shapers!
- 🐛 Report bugs
- 💡 Suggest features  
- 🌍 Add translations
- 📝 Improve documentation
- 🎨 Share design improvements

See our [Contributing Guide](CONTRIBUTING.md) for details.

### 🏆 **Contributors**
Thanks to all the Global Shapers who made this possible:

- **Shashwat Kansal** - Original creator
- **Your Name Here** - [Contribute](CONTRIBUTING.md) and get listed!

---

## 📄 License

This project is open source under the [Creative Commons Attribution-NonCommercial 4.0 International License](LICENSE.md).

**TL;DR:** ✅ Free for Global Shapers hubs, ❌ No commercial use without permission.

---

## 🌍 About Global Shapers

The [Global Shapers Community](https://www.globalshapers.org/) is a network of young people driving dialogue, action and change in their communities worldwide. We are part of the World Economic Forum.

**Ready to join?** Find your local hub or learn how to start one at [globalshapers.org](https://www.globalshapers.org/).

---

<div align="center">

**Made with ❤️ by Global Shapers, for Global Shapers**

[🚀 Get Started](docs/SETUP.md) • [📖 Documentation](docs/) • [🌟 Examples](#-live-examples) • [🤝 Contribute](CONTRIBUTING.md)

</div>
