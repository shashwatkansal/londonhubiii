import { HUB_CONFIG } from './settings';
import { useState, useEffect, useRef } from 'react';

export interface PWAManifest {
  name: string;
  short_name: string;
  description: string;
  start_url: string;
  display: 'standalone' | 'fullscreen' | 'minimal-ui' | 'browser';
  background_color: string;
  theme_color: string;
  orientation: 'portrait' | 'landscape' | 'any';
  icons: Array<{
    src: string;
    sizes: string;
    type: string;
    purpose?: string;
  }>;
  categories?: string[];
  screenshots?: Array<{
    src: string;
    sizes: string;
    type: string;
    label?: string;
  }>;
  shortcuts?: Array<{
    name: string;
    short_name?: string;
    description?: string;
    url: string;
    icons?: Array<{
      src: string;
      sizes: string;
      type: string;
    }>;
  }>;
}

export function generatePWAManifest(): PWAManifest {
  return {
    name: `${HUB_CONFIG.HUB_NAME} - Global Shapers ${HUB_CONFIG.CITY_NAME}`,
    short_name: HUB_CONFIG.HUB_NAME,
    description: HUB_CONFIG.META_DESCRIPTION,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#003C71',
    orientation: 'any',
    icons: [
      {
        src: '/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
    categories: ['social', 'education', 'business'],
    shortcuts: [
      {
        name: 'Dashboard',
        short_name: 'Dashboard',
        description: 'Access your dashboard',
        url: '/hub/dashboard',
        icons: [
          {
            src: '/favicon/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
      {
        name: 'Our Impact',
        short_name: 'Impact',
        description: 'View our projects and impact',
        url: '/our-impact',
        icons: [
          {
            src: '/favicon/android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
        ],
      },
    ],
  };
}

// Service Worker registration helper
export function registerServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', async () => {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        console.log('Service Worker registered:', registration);

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'activated') {
                // New service worker activated
                if (confirm('New version available! Reload to update?')) {
                  window.location.reload();
                }
              }
            });
          }
        });
      } catch (error) {
        console.error('Service Worker registration failed:', error);
      }
    });
  }
}

// PWA install prompt handler
export function usePWAInstall() {
  const [canInstall, setCanInstall] = useState(false);
  const deferredPromptRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      deferredPromptRef.current = e;
      setCanInstall(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const install = async () => {
    if (!deferredPromptRef.current) return;

    deferredPromptRef.current.prompt();
    const { outcome } = await deferredPromptRef.current.userChoice;
    
    if (outcome === 'accepted') {
      console.log('PWA installation accepted');
    }
    
    deferredPromptRef.current = null;
    setCanInstall(false);
  };

  if (typeof window === 'undefined') {
    return { canInstall: false, install: () => {} };
  }

  return { canInstall, install };
}

// Generate meta tags for PWA
export function generatePWAMetaTags() {
  return {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': HUB_CONFIG.HUB_NAME,
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#003C71',
    'msapplication-tap-highlight': 'no',
    'theme-color': '#003C71',
  };
}