# Migration Guide

This guide helps Global Shapers hubs migrate from existing websites to the new template, preserving content and ensuring a smooth transition.

## 🎯 Migration Overview

### Who Should Use This Guide
- Hubs with existing websites (WordPress, Squarespace, Wix, custom sites)
- Hubs upgrading from older versions of this template
- Hubs consolidating multiple sites into one

### What We'll Preserve
- ✅ All existing content (pages, blog posts, images)
- ✅ SEO rankings and search visibility
- ✅ User accounts and data (where applicable)
- ✅ Custom branding and design elements
- ✅ External integrations and forms

## 📋 Pre-Migration Checklist

### 1. Content Audit
- [ ] List all existing pages and their content
- [ ] Inventory blog posts and articles
- [ ] Collect all images and media files
- [ ] Document custom features or integrations
- [ ] Note any custom forms or contact methods

### 2. Technical Assessment
- [ ] Current hosting platform and domain setup
- [ ] Email integrations (newsletters, contact forms)
- [ ] Analytics tracking codes
- [ ] Social media integrations
- [ ] Third-party widgets or plugins

### 3. SEO Preparation
- [ ] Document current URL structure
- [ ] Export Google Analytics data
- [ ] Note high-performing pages and keywords
- [ ] Prepare redirect plan for changed URLs

## 🔄 Migration Strategies

### From WordPress

#### 1. Content Export
```bash
# Export WordPress content
# In WordPress Admin: Tools → Export → All content
# Download the XML file
```

#### 2. Convert Blog Posts
Use our conversion script or manual process:

```javascript
// Convert WordPress posts to Markdown
const convertWordPressPost = (wpPost) => {
  const frontMatter = `---
title: "${wpPost.title}"
excerpt: "${wpPost.excerpt}"
date: "${wpPost.date}"
author: "${wpPost.author}"
coverImage: "/assets/blog/${wpPost.slug}/cover.jpg"
tags: [${wpPost.tags.map(tag => `"${tag}"`).join(', ')}]
---

${wpPost.content}`;
  
  return frontMatter;
};
```

#### 3. Image Migration
```bash
# Download all WordPress media
# Copy to public/assets/blog/ or public/assets/images/
# Update image paths in content
```

#### 4. Page Content
Map WordPress pages to template structure:
- **Home** → Update `texts.ts` hero and mission sections
- **About** → Update `texts.ts` about section + team photos
- **Blog** → Migrate posts to `_posts/` directory
- **Contact** → Update contact forms and information

### From Squarespace/Wix

#### 1. Manual Content Export
Since these platforms don't have direct export options:

```markdown
# Content Extraction Checklist
- [ ] Copy all page text content
- [ ] Download all images (right-click → save)
- [ ] Screenshot complex layouts for reference
- [ ] Export contact form submissions if needed
- [ ] Note any custom code or widgets
```

#### 2. Recreate Structure
Map your existing structure to the template:

```typescript
// Example mapping for a typical hub site
const pageMapping = {
  'Home': 'Update hero section in texts.ts',
  'About Us': 'Update about section + add team photos',
  'Our Work': 'Create blog posts in _posts/',
  'Events': 'Add to calendar integration',
  'Join Us': 'Update join section in texts.ts',
  'Contact': 'Update contact information in settings.ts'
};
```

### From Custom Websites

#### 1. Technical Assessment
```bash
# Analyze current site structure
# Document custom features
# Identify reusable components
# Plan integration strategy
```

#### 2. Feature Mapping
```typescript
// Map custom features to template equivalents
const featureMapping = {
  'Custom member directory': 'Use dashboard user management',
  'Event calendar': 'Google Calendar integration',
  'Newsletter signup': 'Built-in subscriber management',
  'Blog system': 'Markdown-based blog posts',
  'Contact forms': 'Contact section + Firebase',
  'Admin panel': 'Built-in dashboard system'
};
```

## 📝 Step-by-Step Migration Process

### Phase 1: Setup (Day 1)

#### 1. Create New Site
```bash
# Use the template
git clone https://github.com/global-shapers/hub-website-template.git your-hub-new
cd your-hub-new
npm install
```

#### 2. Basic Configuration
```typescript
// Update src/lib/settings.ts
export const HUB_CONFIG = {
  HUB_NAME: "Your Hub Name",
  CITY_NAME: "Your City",
  EMAIL_ADDRESS: "your-existing-email@domain.com",
  // ... copy other details from your current site
};
```

#### 3. Content Migration
```typescript
// Update src/lib/texts.ts
export const TEXTS = {
  hero: {
    title: "Your Current Hero Title",
    subtitle: "Your Current Subtitle",
    // ... migrate existing content
  },
  // ... continue with other sections
};
```

### Phase 2: Content Transfer (Days 2-3)

#### 1. Blog Posts Migration
```bash
# Create _posts directory structure
mkdir -p _posts
mkdir -p public/assets/blog

# For each blog post:
# 1. Create markdown file in _posts/
# 2. Add images to public/assets/blog/[post-slug]/
# 3. Update image paths in markdown
```

Example post conversion:
```markdown
---
title: "Your Post Title"
excerpt: "Brief description from your original post"
coverImage: "/assets/blog/your-post-slug/cover.jpg"
date: "2024-01-15T05:35:07.322Z"
authors:
  - name: "Original Author"
    email: "author@yourhub.com"
---

Your post content here...
(converted from original HTML/rich text)
```

#### 2. Team Members
```typescript
// Add team members to Firebase or update static content
const teamMembers = [
  {
    name: "Member Name",
    role: "Shaper",
    bio: "Bio from original site",
    email: "member@email.com",
    image: "/assets/images/team/member-photo.jpg"
  },
  // ... continue for all members
];
```

#### 3. Images and Assets
```bash
# Organize images
public/assets/
├── images/
│   ├── your-hub-logo.png
│   ├── team-photo.jpg
│   └── about-photo.jpg
└── blog/
    ├── post-1/
    │   └── cover.jpg
    └── post-2/
        └── cover.jpg
```

### Phase 3: Advanced Features (Days 4-5)

#### 1. Forms Migration
```typescript
// Update contact forms
// If you had custom forms, recreate using:
// - Contact section for basic contact
// - Firebase for data collection
// - Third-party integrations (Typeform, etc.)
```

#### 2. Integrations
```bash
# Migrate existing integrations:
# - Google Analytics: Add tracking ID to environment variables
# - Social media: Update links in settings.ts
# - Newsletter: Connect to existing service or use built-in
# - Calendar: Connect Google Calendar
```

#### 3. SEO Migration
```typescript
// Preserve SEO elements
export const HUB_CONFIG = {
  META_DESCRIPTION: "Your existing meta description",
  META_KEYWORDS: "your, existing, keywords",
  HOME_OG_IMAGE_URL: "https://yourdomain.com/og-image.png",
  // ... other SEO settings
};
```

### Phase 4: Testing & Launch (Day 6)

#### 1. Testing Checklist
- [ ] All pages load correctly
- [ ] All links work (internal and external)
- [ ] Images display properly
- [ ] Forms submit successfully
- [ ] Mobile responsiveness verified
- [ ] SEO meta tags present
- [ ] Analytics tracking works

#### 2. Domain Migration
```bash
# Option 1: Update DNS to point to new hosting
# Option 2: Use subdomain for testing first
# Option 3: Gradual migration with redirects
```

## 🔄 URL Structure & Redirects

### Planning Redirects
```javascript
// Map old URLs to new URLs
const redirects = [
  { from: '/old-about-page', to: '/about' },
  { from: '/blog/old-post-name', to: '/posts/new-post-slug' },
  { from: '/team', to: '/shapers' },
  { from: '/contact-us', to: '/#contact' },
];
```

### Implementing Redirects
```javascript
// In next.config.mjs
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/old-about-page',
        destination: '/about',
        permanent: true,
      },
      // ... add all your redirects
    ];
  },
};
```

### Vercel Redirects
```json
// In vercel.json
{
  "redirects": [
    {
      "source": "/old-path",
      "destination": "/new-path",
      "permanent": true
    }
  ]
}
```

## 📊 SEO Preservation

### 1. Meta Tags Migration
```typescript
// Preserve important meta information
const seoMigration = {
  title: "Keep your existing title format",
  description: "Preserve high-performing descriptions",
  keywords: "Maintain successful keyword strategies",
  openGraph: "Update with new design but keep successful copy"
};
```

### 2. Structured Data
```json
// Add structured data for better SEO
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Hub Name",
  "url": "https://yourdomain.com",
  "logo": "https://yourdomain.com/logo.png",
  "description": "Your hub description",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Your City",
    "addressCountry": "Your Country"
  }
}
```

### 3. Google Search Console
```bash
# Steps after migration:
# 1. Submit new sitemap
# 2. Monitor crawl errors
# 3. Check mobile usability
# 4. Verify rich snippets
```

## 🔧 Technical Considerations

### Database Migration

#### From WordPress Database
```sql
-- Export user data (if applicable)
SELECT user_email, display_name, user_registered 
FROM wp_users 
WHERE user_status = 0;

-- Export post data
SELECT post_title, post_content, post_date, post_name 
FROM wp_posts 
WHERE post_status = 'publish' AND post_type = 'post';
```

#### To Firebase
```javascript
// Convert and import to Firebase
const migrateUsers = async (wordpressUsers) => {
  for (const user of wordpressUsers) {
    await addDoc(collection(db, 'directory'), {
      name: user.display_name,
      email: user.user_email,
      joinDate: new Date(user.user_registered),
      role: 'Shaper'
    });
  }
};
```

### Performance Optimization
```bash
# Optimize migrated images
# Use tools like:
npm install -g imagemin-cli
imagemin public/assets/images/* --out-dir=public/assets/images/optimized

# Or online tools:
# - TinyPNG
# - ImageOptim
# - Squoosh
```

## 🚨 Common Migration Issues

### 1. Image Path Problems
```typescript
// Common issue: Broken image paths
// Solution: Update all image references
const updateImagePaths = (content: string) => {
  return content
    .replace(/src="\/wp-content\/uploads\//g, 'src="/assets/blog/')
    .replace(/src="https:\/\/old-domain\.com\//g, 'src="/');
};
```

### 2. Styling Differences
```css
/* Add custom CSS for specific styling needs */
.migrated-content {
  /* Preserve important styling from old site */
}
```

### 3. Form Functionality
```typescript
// Recreate custom forms using template patterns
const ContactForm = () => {
  // Use existing form components
  // Or integrate with your previous form service
};
```

## 📱 Mobile Migration

### Responsive Design Check
```bash
# Test on multiple devices
# Use browser dev tools
# Check touch interactions
# Verify mobile navigation
```

### Performance on Mobile
```javascript
// Optimize for mobile performance
const mobileOptimizations = {
  images: 'Use WebP format and responsive images',
  fonts: 'Subset fonts for faster loading',
  javascript: 'Minimize and defer non-critical scripts',
  css: 'Remove unused styles'
};
```

## 🔄 Post-Migration Tasks

### Week 1: Monitoring
- [ ] Monitor Google Analytics for traffic patterns
- [ ] Check Google Search Console for crawl errors
- [ ] Verify all forms are receiving submissions
- [ ] Test all integrations (newsletter, calendar, etc.)
- [ ] Monitor site performance metrics

### Week 2-4: Optimization
- [ ] Analyze user behavior on new site
- [ ] Optimize any slow-loading pages
- [ ] Fix any broken links discovered
- [ ] Improve SEO based on initial performance
- [ ] Gather feedback from team and users

### Month 2+: Enhancement
- [ ] Add new features unique to the template
- [ ] Improve content based on analytics
- [ ] Optimize conversion rates
- [ ] Plan future content strategy

## 🆘 Migration Support

### Getting Help
1. **Documentation**: Check all guides in `/docs`
2. **Community**: Join GitHub Discussions
3. **Issues**: Report problems on GitHub Issues
4. **Direct Support**: Contact template maintainers

### Professional Migration Services
If you need hands-on help:
- Technical migration assistance
- Content strategy consulting
- Design customization
- SEO optimization

Contact: migration-support@globalshapers.org

## 📋 Migration Checklist

### Pre-Migration
- [ ] Content audit completed
- [ ] Technical assessment done
- [ ] SEO baseline established
- [ ] Backup of current site created
- [ ] Migration timeline planned

### During Migration
- [ ] Template setup completed
- [ ] Configuration files updated
- [ ] Content migrated and formatted
- [ ] Images optimized and uploaded
- [ ] Forms and integrations tested
- [ ] SEO elements preserved

### Post-Migration
- [ ] All functionality tested
- [ ] Redirects implemented
- [ ] Analytics tracking verified
- [ ] Search Console updated
- [ ] Team trained on new system
- [ ] Launch announcement prepared

---

**Ready to migrate?** Start with our [Setup Guide](SETUP.md) and then return to this guide for migration-specific steps.

**Need help?** Don't hesitate to [open an issue](../../issues) or reach out to the community! 