# 🎨 Customization Examples

This guide shows real examples of how different Global Shapers hubs have customized this template to match their unique identity and needs.

## 🌍 Hub Variations

### 🇬🇧 London Hub III (Original)
**Live Site:** [londonshapersiii.com](https://londonshapersiii.com)

**Key Customizations:**
- Blue and white color scheme matching London branding
- Focus on innovation and technology projects
- Integration with local London events calendar
- Custom team photos from London landmarks

**Settings Highlights:**
```typescript
HUB_NAME: "London Hub III",
CITY_NAME: "London",
EMAIL_ADDRESS: "londonshapersiii@gmail.com",
TWITTER_HANDLE: "@londonshapersiii",
```

---

### 🇫🇷 Paris Hub (Example)
**Live Site:** [example-paris.vercel.app](https://example-paris.vercel.app)

**Key Customizations:**
- French language localization
- Elegant typography matching Parisian style
- Focus on cultural and artistic initiatives
- Integration with local French resources

**Settings Highlights:**
```typescript
HUB_NAME: "Global Shapers Paris",
CITY_NAME: "Paris",
EMAIL_ADDRESS: "paris@globalshapers.org",
TWITTER_HANDLE: "@shapersparis",
META_DESCRIPTION: "Découvrez les initiatives de notre hub parisien...",
```

**Text Customizations:**
```typescript
hero: {
  title: "Le Changement Commence",
  subtitle: "Avec Vous",
  typed: ["Idées Locales.", "Support Global.", "Impact Réel."],
},
```

---

### 🇯🇵 Tokyo Hub (Example)
**Live Site:** [example-tokyo.vercel.app](https://example-tokyo.vercel.app)

**Key Customizations:**
- Minimalist design inspired by Japanese aesthetics
- Integration with local Japanese business networks
- Focus on technology and sustainability
- Custom fonts supporting Japanese characters

**Settings Highlights:**
```typescript
HUB_NAME: "Global Shapers Tokyo",
CITY_NAME: "Tokyo",
EMAIL_ADDRESS: "tokyo@globalshapers.org",
PHYSICAL_ADDRESS: "Tokyo, Japan",
```

---

### 🇧🇷 São Paulo Hub (Example)
**Live Site:** [example-saopaulo.vercel.app](https://example-saopaulo.vercel.app)

**Key Customizations:**
- Vibrant colors reflecting Brazilian culture
- Portuguese language localization
- Focus on social impact and community development
- Integration with local Brazilian organizations

**Settings Highlights:**
```typescript
HUB_NAME: "Global Shapers São Paulo",
CITY_NAME: "São Paulo",
EMAIL_ADDRESS: "saopaulo@globalshapers.org",
PHONE_NUMBER: "+55 11 XXXX-XXXX",
```

## 🎯 Customization by Use Case

### 🎨 Visual Branding

#### Color Scheme Changes
**Before (Default):**
```css
/* Blue theme */
bg-blue-600, text-blue-700, border-blue-500
```

**After (Custom Hub Colors):**
```typescript
// In tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: {
        50: '#fef7ee',   // Light orange
        500: '#f97316',  // Orange
        900: '#9a3412',  // Dark orange
      }
    }
  }
}
```

#### Logo Integration
**Before:** Generic Global Shapers logo
**After:** Custom hub logo with proper sizing

```typescript
// In settings.ts
LOGO_MAIN: "/assets/images/your-hub-logo.png",
LOGO_SECONDARY: "/assets/images/your-partner-logo.png",
```

### 🌐 Language Localization

#### Spanish Hub Example
```typescript
// Spanish text customization
export const TEXTS = {
  hero: {
    title: "El Cambio Comienza",
    subtitle: "Contigo",
    typed: ["Ideas Locales.", "Apoyo Global.", "Impacto Real."],
  },
  mission: {
    heading: "Nuestra Misión en",
    description: (city, hub) => 
      `El ${hub} es una red dinámica de jóvenes líderes...`,
  },
  // ... more Spanish translations
};
```

#### German Hub Example
```typescript
// German text customization
export const TEXTS = {
  hero: {
    title: "Veränderung Beginnt",
    subtitle: "Mit Dir",
    typed: ["Lokale Ideen.", "Globale Unterstützung.", "Echte Wirkung."],
  },
  // ... more German translations
};
```

### 🏢 Industry Focus

#### Tech-Focused Hub
**Customizations:**
- Technology-themed icons and imagery
- Integration with tech event calendars
- Links to GitHub, tech blogs, and innovation resources
- Code snippet sharing in blog posts

```typescript
// Custom dashboard links for tech hub
linksData: [
  {
    href: "https://github.com/your-hub",
    title: "Hub GitHub",
    icon: <FaGithub />,
    description: "Our open source projects and contributions",
  },
  {
    href: "https://tech-calendar.com/your-hub",
    title: "Tech Events",
    icon: <FaCalendar />,
    description: "Local tech meetups and conferences",
  },
];
```

#### Social Impact Hub
**Customizations:**
- Social impact metrics and visualizations
- Integration with volunteer platforms
- Links to NGO partnerships
- Impact story templates

```typescript
// Custom impact areas for social hub
impactAreas: [
  {
    title: "Community Development",
    description: "Building stronger, more resilient communities",
    icon: "🏘️",
  },
  {
    title: "Education Access",
    description: "Ensuring quality education for all",
    icon: "📚",
  },
];
```

### 📊 Content Strategy

#### Blog-Heavy Hub
**Customizations:**
- Enhanced blog layout with categories
- Author profiles and bios
- Newsletter integration
- Social sharing optimization

```typescript
// Enhanced blog configuration
BLOG_CONFIG: {
  POSTS_PER_PAGE: 6,
  FEATURED_POSTS: 3,
  CATEGORIES: ["Innovation", "Impact", "Events", "Insights"],
  NEWSLETTER_INTEGRATION: true,
}
```

#### Event-Focused Hub
**Customizations:**
- Event calendar integration
- RSVP functionality
- Photo galleries from past events
- Sponsor showcase

```typescript
// Event-focused settings
EVENT_CONFIG: {
  CALENDAR_EMBED: "https://calendar.google.com/calendar/embed?src=...",
  EVENTBRITE_INTEGRATION: true,
  PHOTO_GALLERY: true,
  SPONSORS_SECTION: true,
}
```

## 🛠️ Technical Customizations

### Advanced Dashboard Features

#### Custom Collection for Events
```typescript
// Add to models.ts
export interface Event {
  title: string;
  date: Timestamp;
  location: string;
  description: string;
  registrationUrl?: string;
  maxAttendees?: number;
}

// Add to dashboard
<AdvancedCollectionManager
  collectionName="events"
  fields={[
    { key: "title", label: "Event Title", type: "text" },
    { key: "date", label: "Date", type: "date" },
    { key: "location", label: "Location", type: "text" },
    { key: "description", label: "Description", type: "textarea" },
  ]}
  converter={eventConverter}
/>
```

#### Custom Analytics Integration
```typescript
// Add Google Analytics
NEXT_PUBLIC_GA_TRACKING_ID: "GA_MEASUREMENT_ID",

// Add to layout.tsx
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout() {
  return (
    <html>
      <body>
        {children}
        <GoogleAnalytics gaId="GA_MEASUREMENT_ID" />
      </body>
    </html>
  )
}
```

## 📱 Mobile Customizations

### Hub-Specific Mobile Features

#### Location-Based Features
```typescript
// Add location services for local hubs
LOCATION_CONFIG: {
  ENABLE_MAPS: true,
  DEFAULT_LOCATION: "London, UK",
  NEARBY_EVENTS: true,
  LOCAL_RESOURCES: true,
}
```

#### Progressive Web App (PWA)
```typescript
// Enable PWA features
PWA_CONFIG: {
  ENABLE_PWA: true,
  APP_NAME: "London Hub III",
  THEME_COLOR: "#3b82f6",
  BACKGROUND_COLOR: "#ffffff",
}
```

## 🎓 Step-by-Step Customization

### Example: Setting Up Berlin Hub

**Step 1: Basic Information**
```typescript
// settings.ts changes
HUB_NAME: "Global Shapers Berlin",
CITY_NAME: "Berlin",
EMAIL_ADDRESS: "berlin@globalshapers.org",
TWITTER_HANDLE: "@shapersberlin",
```

**Step 2: German Localization**
```typescript
// texts.ts changes
hero: {
  title: "Veränderung Beginnt",
  subtitle: "Mit Dir",
  typed: ["Lokale Ideen.", "Globale Unterstützung.", "Echte Wirkung."],
},
```

**Step 3: Assets**
- Replace `hub3photo.jpg` with Berlin hub photo
- Add `berlin-logo.png` as main logo
- Update team photos in About section

**Step 4: Local Resources**
```typescript
// Add Berlin-specific links
NOTION_URL: "https://www.notion.so/berlin-shapers",
CALENDAR_EMBED_URL: "https://calendar.google.com/calendar/embed?src=berlin...",
```

**Step 5: Deploy**
```bash
git add .
git commit -m "Setup Berlin Hub customization"
git push origin main
```

## 🔄 Migration from Existing Sites

### From WordPress
1. Export content from WordPress
2. Convert blog posts to Markdown format
3. Move images to `public/assets/blog/`
4. Update internal links

### From Squarespace/Wix
1. Download existing content and images
2. Recreate pages using the template structure
3. Update navigation and links
4. Set up redirects for SEO

## 💡 Pro Tips

### Performance Optimization
- Optimize images before uploading (use WebP format)
- Use environment variables for sensitive data
- Enable compression in deployment settings

### SEO Best Practices
- Update meta descriptions for each page
- Add structured data for events and articles
- Set up Google Search Console

### Accessibility
- Test with screen readers
- Ensure proper color contrast
- Add alt text to all images

---

## 🤝 Share Your Customization

Created something awesome? Share it with the community!

1. **Screenshots:** Before/after comparisons
2. **Code snippets:** Unique customizations
3. **Live URL:** Show off your hub's site
4. **Challenges:** What problems did you solve?

**Submit via:**
- [GitHub Discussions](../../discussions)
- [Pull Request](../../pulls) to add to this guide
- Email: [template-support@globalshapers.org](mailto:template-support@globalshapers.org)

---

**Need help with your customization?** Check out our [Setup Guide](SETUP.md) or [Developer Guide](CUSTOMIZATION.md)! 