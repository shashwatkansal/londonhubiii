import { HUB_CONFIG } from './settings';

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    mutedForeground: string;
    border: string;
    error: string;
    success: string;
    warning: string;
  };
  fonts: {
    body: string;
    heading: string;
    mono: string;
  };
  borderRadius: {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    full: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
  breakpoints: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
  };
}

export interface FeatureFlags {
  enableBlog: boolean;
  enableEvents: boolean;
  enableNewsletter: boolean;
  enableDonations: boolean;
  enableMemberDirectory: boolean;
  enableProjects: boolean;
  enablePartners: boolean;
  enableDashboard: boolean;
  enableAnalytics: boolean;
  enableComments: boolean;
  enableSearch: boolean;
  enableMultiLanguage: boolean;
  enableDarkMode: boolean;
  enablePWA: boolean;
  maintenanceMode: boolean;
}

export interface SiteConfig {
  hub: typeof HUB_CONFIG;
  theme: ThemeConfig;
  features: FeatureFlags;
  navigation: {
    main: Array<{
      label: string;
      href: string;
      external?: boolean;
      icon?: string;
    }>;
    footer: Array<{
      label: string;
      href: string;
      external?: boolean;
    }>;
    social: Array<{
      platform: string;
      url: string;
      icon: string;
    }>;
  };
  integrations: {
    googleAnalytics?: string;
    googleTagManager?: string;
    hotjar?: string;
    clarity?: string;
    sentry?: string;
    mailchimp?: string;
    stripe?: string;
  };
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    defaultKeywords: string[];
    defaultImage: string;
    siteUrl: string;
    twitterHandle: string;
    facebookAppId?: string;
  };
}

const defaultTheme: ThemeConfig = {
  colors: {
    primary: '#003C71',
    secondary: '#89CFF0',
    accent: '#667eea',
    background: '#ffffff',
    foreground: '#1a202c',
    muted: '#f7fafc',
    mutedForeground: '#718096',
    border: '#e2e8f0',
    error: '#e53e3e',
    success: '#38a169',
    warning: '#d69e2e',
  },
  fonts: {
    body: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    heading: 'Apercu, Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: 'Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
  },
  borderRadius: {
    none: '0',
    sm: '0.125rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    full: '9999px',
  },
  spacing: {
    xs: '0.5rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
};

const defaultFeatures: FeatureFlags = {
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
};

export const siteConfig: SiteConfig = {
  hub: HUB_CONFIG,
  theme: defaultTheme,
  features: defaultFeatures,
  navigation: {
    main: [
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about' },
      { label: 'Impact', href: '/our-impact' },
      { label: 'Shapers', href: '/shapers' },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Dashboard', href: '/hub/dashboard' },
    ],
    footer: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Contact', href: '/contact' },
    ],
    social: [
      { platform: 'LinkedIn', url: HUB_CONFIG.LINKEDIN_URL, icon: 'linkedin' },
      { platform: 'Instagram', url: HUB_CONFIG.INSTAGRAM_URL, icon: 'instagram' },
      { platform: 'Twitter', url: HUB_CONFIG.TWITTER_URL || '', icon: 'twitter' },
    ],
  },
  integrations: {
    googleAnalytics: process.env.NEXT_PUBLIC_GA_ID,
    googleTagManager: process.env.NEXT_PUBLIC_GTM_ID,
    sentry: process.env.NEXT_PUBLIC_SENTRY_DSN,
  },
  seo: {
    defaultTitle: HUB_CONFIG.HUB_NAME,
    titleTemplate: `%s | ${HUB_CONFIG.HUB_NAME}`,
    defaultDescription: HUB_CONFIG.META_DESCRIPTION,
    defaultKeywords: HUB_CONFIG.META_KEYWORDS.split(', '),
    defaultImage: HUB_CONFIG.HOME_OG_IMAGE_URL,
    siteUrl: HUB_CONFIG.HUB_URL,
    twitterHandle: HUB_CONFIG.TWITTER_HANDLE,
  },
};

// Helper functions
export function getFeatureFlag(feature: keyof FeatureFlags): boolean {
  return siteConfig.features[feature];
}

export function getThemeColor(color: keyof ThemeConfig['colors']): string {
  return siteConfig.theme.colors[color];
}

export function getNavigationLinks(type: 'main' | 'footer' = 'main') {
  return siteConfig.navigation[type].filter(link => {
    // Filter out disabled features
    if (link.href === '/hub/dashboard' && !siteConfig.features.enableDashboard) return false;
    if (link.href === '/our-impact' && !siteConfig.features.enableBlog) return false;
    if (link.href === '/shapers' && !siteConfig.features.enableMemberDirectory) return false;
    return true;
  });
}

// Configuration validator
export function validateConfig(config: Partial<SiteConfig>): boolean {
  // Add validation logic here
  return true;
}

// Export for runtime configuration updates
export function updateConfig(updates: Partial<SiteConfig>) {
  Object.assign(siteConfig, updates);
}

// Export individual configs for convenience
export const theme = siteConfig.theme;
export const features = siteConfig.features;
export const navigation = siteConfig.navigation;
export const integrations = siteConfig.integrations;
export const seo = siteConfig.seo;