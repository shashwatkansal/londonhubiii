export interface Hub {
    id: string;
    name: string;
    description: string;
    location: string;
    logo: string;
    theme: HubTheme;
    socialLinks: SocialLinks;
    contact: ContactInfo;
    features: HubFeatures;
}

export interface HubTheme {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    fontFamily: string;
    logo: string;
    favicon: string;
    heroImage?: string;
}

export interface SocialLinks {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    youtube?: string;
}

export interface ContactInfo {
    email: string;
    address?: string;
    phone?: string;
    website?: string;
}

export interface HubFeatures {
    projects: boolean;
    events: boolean;
    members: boolean;
    newsletter: boolean;
    impactAreas: Array<{
        title: string;
        description: string;
        icon: string;
    }>;
    transferFormUrl: string;
}

export interface HubConfig {
    currentHub: Hub;
    availableHubs: Hub[];
}
