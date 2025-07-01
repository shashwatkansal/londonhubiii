# 🌍 Global Shapers Hub Website Template

**A beautiful, customizable, and feature-rich website template for any Global Shapers Hub worldwide.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/shashwatkansal/londonhubiii)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/shashwatkansal/londonhubiii)

---

## ✨ Why This Template?

This template was created by **London Hub III** to help Global Shapers hubs worldwide launch professional websites quickly and easily. Instead of building from scratch, focus on what matters most: **your content and community**.

### 🎯 Perfect For
- **New hubs** launching their first website
- **Existing hubs** wanting a modern, professional redesign
- **Non-technical teams** who need something that "just works"
- **Technical teams** who want a solid foundation to build upon

---

## 🚀 Features

### 🎨 **Fully Customizable**
- Change your hub's name, city, colors, and branding in minutes
- All text content centralized in easy-to-edit files
- No coding required for basic customization

### 📱 **Modern & Responsive**
- Beautiful design that works on all devices
- Fast loading times and SEO optimized
- Accessibility-first approach

### 🛠️ **Built-in Dashboard**
- Member management system
- Blog post creation and editing
- FAQ management
- Newsletter subscriber management
- Admin controls and permissions

### 🌐 **Ready-to-Go Pages**
- Homepage with hero section and impact showcase
- About page with team profiles
- Impact/blog section for sharing your work
- FAQ page for common questions
- Contact and join sections

### ⚡ **Easy Deployment**
- One-click deployment to Vercel or Netlify
- Custom domain support
- Automatic updates when you push changes

---

## 🏃‍♂️ Quick Start (5 Minutes)

### 1. **Get Your Copy**
```bash
# Option 1: Use GitHub template (recommended)
# Click "Use this template" button above

# Option 2: Clone directly
git clone https://github.com/shashwatkansal/londonhubiii.git your-hub-website
cd your-hub-website
```

### 2. **Install & Run**
```bash
npm install
npm run dev
```

### 3. **Customize Your Hub**
Edit these two files with your hub's information:
- `src/lib/settings.ts` - Hub name, city, links, images
- `src/lib/texts.ts` - All website text content

### 4. **Deploy**
```bash
# Push to GitHub, then deploy with Vercel/Netlify
git add .
git commit -m "Initial setup for [Your Hub Name]"
git push origin main
```

**🎉 Your website is live!**

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
│   └── christmas.jpg         # Team photo
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

- **[London Hub III](https://londonshapersiii.com)** - Original creators
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
