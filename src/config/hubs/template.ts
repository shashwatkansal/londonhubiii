import { Hub, HubConfig } from "../../features/hub/types";

/**
 * Template configuration for a new hub.
 * Copy this file to create a new hub configuration.
 *
 * Usage:
 * 1. Copy this file to src/config/hubs/your-hub.ts
 * 2. Replace all placeholder values with your hub's information
 * 3. Update the imports in src/app/layout.tsx
 */

export const templateHub: Hub = {
    // Unique identifier for your hub
    id: "your-hub-id",

    // Basic information
    name: "Your Hub Name",
    description: "A brief description of your hub and its mission.",
    location: "City, Country",

    // Logo and branding
    logo: "/images/your-hub-logo.png",

    // Theme configuration
    theme: {
        // Brand colors
        primaryColor: "#1E40AF", // Main brand color
        secondaryColor: "#047857", // Secondary brand color
        accentColor: "#F59E0B", // Accent color for highlights

        // Typography
        fontFamily: "Inter", // Font family

        // Assets
        logo: "/images/your-hub-logo.png",
        favicon: "/favicon.ico",
    },

    // Social media links
    socialLinks: {
        instagram: "https://instagram.com/yourhub",
        linkedin: "https://linkedin.com/company/yourhub",
        twitter: "https://twitter.com/yourhub",
        facebook: "https://facebook.com/yourhub",
        youtube: "https://youtube.com/yourhub",
    },

    // Contact information
    contact: {
        email: "contact@yourhub.org",
        address: "Your Hub Address",
        phone: "+1234567890",
        website: "https://yourhub.org",
    },

    // Feature flags
    features: {
        blog: true, // Enable blog section
        events: true, // Enable events section
        members: true, // Enable members section
        projects: true, // Enable projects section
        newsletter: true, // Enable newsletter signup
        impact: true, // Enable impact section
        faqs: true, // Enable FAQ section
    },
};

// Hub configuration export
export const templateHubConfig: HubConfig = {
    currentHub: templateHub,
    availableHubs: [templateHub],
};
