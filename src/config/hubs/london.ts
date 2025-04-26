import { Hub, HubConfig } from "../../features/hub/types";

export const londonHub: Hub = {
    id: "london-iii",
    name: "London Hub III",
    description:
        "Global Shapers London Hub III - Empowering young leaders to drive positive change in London and beyond. We are a diverse community of young leaders working together to create a better future for London and the world.",
    location: "London, United Kingdom",
    logo: "/images/london-hub-logo.png",
    theme: {
        primaryColor: "#1E40AF", // blue-800
        secondaryColor: "#047857", // emerald-700
        accentColor: "#F59E0B", // amber-500
        fontFamily: "Inter",
        logo: "/assets/images/gslh3_logo.png",
        favicon: "/favicon.ico",
        heroImage: "/assets/images/hub3photo.jpg",
    },
    socialLinks: {
        instagram: "https://instagram.com/londonshapers",
        linkedin: "https://linkedin.com/company/londonshapers",
        twitter: "https://twitter.com/londonshapers",
        facebook: "https://facebook.com/londonshapers",
        youtube: "https://youtube.com/londonshapers",
    },
    contact: {
        email: "contact@londonshapers.org",
        address: "London, United Kingdom",
        phone: "+44 20 1234 5678",
        website: "https://londonshapers.org",
    },
    features: {
        projects: true,
        events: true,
        members: true,
        newsletter: true,
        impactAreas: [
            {
                title: "Protecting the Planet",
                description:
                    "Projects that reduce emissions, protect biodiversity and nature, and promote recycling and reusing materials.",
                icon: "globe",
            },
            {
                title: "Strengthening Civic Engagement",
                description:
                    "Projects that strengthen democracy, encourage people to vote and inspire young people to become election candidates.",
                icon: "landmark",
            },
            {
                title: "Delivering Basic Needs",
                description:
                    "Projects that organize humanitarian responses, respond to natural disasters and fight extreme poverty.",
                icon: "hands-helping",
            },
            {
                title: "Improving Health and Wellbeing",
                description:
                    "Projects that aim to improve health and well-being for young people and vulnerable groups.",
                icon: "heartbeat",
            },
            {
                title: "Reskilling for the Future",
                description:
                    "Projects that increase access to education, skills, and jobs and promote entrepreneurship.",
                icon: "bolt",
            },
            {
                title: "Creating Inclusive Communities",
                description:
                    "Projects that help improve human rights and social justice while promoting diversity, equity, and inclusion.",
                icon: "users",
            },
        ],
        transferFormUrl: "https://forms.gle/example",
    },
};

export const londonHubConfig: HubConfig = {
    currentHub: londonHub,
    availableHubs: [londonHub],
};
