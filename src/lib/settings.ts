// Hub configuration for easy customization
// To use: import { HUB_CONFIG } from './settings';
// Edit the values below to match your hub's details

export const HUB_CONFIG = {
  // General Info
  HUB_NAME: process.env.NEXT_PUBLIC_HUB_NAME || "London Hub III", // e.g. "London Hub III"
  CITY_NAME: process.env.NEXT_PUBLIC_CITY_NAME || "London", // e.g. "London"
  CMS_NAME: process.env.NEXT_PUBLIC_CMS_NAME || "London Hub III - Official Website", // e.g. "Your Hub - Official Website"
  EXAMPLE_PATH: process.env.NEXT_PUBLIC_EXAMPLE_PATH || "your-hub-name", // e.g. "your-hub-name"
  HOME_OG_IMAGE_URL: process.env.NEXT_PUBLIC_HOME_OG_IMAGE_URL || "https://yourhuburl.com/assets/images/og-image.png", // e.g. Open Graph image URL

  // Social Links
  TWITTER_HANDLE: process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@londonshapersiii",
  FACEBOOK_URL: process.env.NEXT_PUBLIC_FACEBOOK_URL || "https://www.facebook.com/londonshapersIII",
  INSTAGRAM_URL: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://www.instagram.com/londonshapersiii/",
  LINKEDIN_URL: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/company/86249324",
  EMAIL_ADDRESS: process.env.NEXT_PUBLIC_EMAIL_ADDRESS || "londonshapersiii@gmail.com",

  // Website URLs
  HUB_URL: process.env.NEXT_PUBLIC_HUB_URL || "https://londonshapersiii.com",

  // Dashboard/Hub Resources
  CALENDAR_EMBED_URL: process.env.NEXT_PUBLIC_CALENDAR_EMBED_URL || "https://calendar.google.com/calendar/embed?src=bG9uZG9uc2hhcGVyc2lpaUBnbWFpbC5jb20&ctz=Europe/London&mode=AGENDA",
  NOTION_URL: process.env.NEXT_PUBLIC_NOTION_URL || "https://www.notion.so/londonshapers/Global-Shapers-London-III-628c14e4650745aaa5c0f29f6e25100a",
  TEAM_ALLOCATIONS_URL: process.env.NEXT_PUBLIC_TEAM_ALLOCATIONS_URL || "https://docs.google.com/document/d/1OFlopDRLcM2CoAdZpn0abeaAXlcKm5Be0YpM7PDrQII",

  // SEO/Meta
  META_DESCRIPTION: process.env.NEXT_PUBLIC_META_DESCRIPTION || `Welcome to the official website of London Hub III. Discover our initiatives, explore our impact, and join us in driving positive change across the world.`,
  META_KEYWORDS: process.env.NEXT_PUBLIC_META_KEYWORDS || "community, social impact, young leaders, global initiatives, change-makers, youth leadership, impact projects",

  // Logo paths (relative to /public or external URLs)
  LOGO_MAIN: process.env.NEXT_PUBLIC_LOGO_MAIN || "/assets/images/gs_white_logo.png",
  LOGO_SECONDARY: process.env.NEXT_PUBLIC_LOGO_SECONDARY || "/assets/images/wef_logo.png",

  // Page-specific Images (can be relative paths or external URLs)
  ABOUT_PAGE_IMAGE_MAIN: process.env.NEXT_PUBLIC_ABOUT_PAGE_IMAGE_MAIN || "/assets/images/hub3photo.jpg",
  ABOUT_PAGE_IMAGE_TEAM: process.env.NEXT_PUBLIC_ABOUT_PAGE_IMAGE_TEAM || "/assets/images/christmas.jpg",
  ABOUT_PAGE_VIDEO_URL: process.env.NEXT_PUBLIC_ABOUT_PAGE_VIDEO_URL || "https://www.youtube.com/embed/your-video-id",

  // Join/Application URLs
  APPLICATION_URL: process.env.NEXT_PUBLIC_APPLICATION_URL || "https://docs.google.com/forms/d/e/1FAIpQLSeQG2i-YIVhJHKhmmBk8HcwUbj4iGRwzItB8yPK-6PULPN50A/viewform",
  TRANSFER_APPLICATION_URL: process.env.NEXT_PUBLIC_TRANSFER_APPLICATION_URL || "https://forms.gle/RbZh7udiVLsNng7J8",

  // Newsletter & External Links
  NEWSLETTER_URL: process.env.NEXT_PUBLIC_NEWSLETTER_URL || "https://www.canva.com/design/your-newsletter-link",
  WEF_INTELLIGENCE_URL: process.env.NEXT_PUBLIC_WEF_INTELLIGENCE_URL || "https://intelligence.weforum.org/",
  TOPLINK_URL: process.env.NEXT_PUBLIC_TOPLINK_URL || "https://my.weforum.org/home",
  SHAPER_GUIDE_URL: process.env.NEXT_PUBLIC_SHAPER_GUIDE_URL || "https://new.express.adobe.com/webpage/vnOKwPijAc0by",

  // Page Headings
  IMPACT_PAGE_HEADING: process.env.NEXT_PUBLIC_IMPACT_PAGE_HEADING || "Our Impact & Projects",
  SHAPERS_PAGE_HEADING: process.env.NEXT_PUBLIC_SHAPERS_PAGE_HEADING || "Meet Our Shapers",
  SHAPER_DEFAULT_ROLE: process.env.NEXT_PUBLIC_SHAPER_DEFAULT_ROLE || "Shaper",
  FAQS_PAGE_HEADING: process.env.NEXT_PUBLIC_FAQS_PAGE_HEADING || "Frequently Asked Questions",
}; 