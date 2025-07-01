export const TEXTS = {
  hero: {
    title: "Change Begins",
    subtitle: "With You",
    typed: ["Local Ideas.", "Global Support.", "Real-World Impact."],
  },
  mission: {
    heading: "Our Mission in",
    description: (city: string, hub: string) =>
      `The ${hub} Hub is a dynamic network of young, visionary leaders committed to tackling the city's most urgent challenges. United by a passion for positive change, we drive innovative projects and collaborations to create a more inclusive, sustainable, and resilient future for all of ${city}'s diverse communities.`,
  },
  impact: {
    heading: "Our Impact in",
    description: (city: string) =>
      `Driving transformative change across ${city}'s diverse communities through innovation, collaboration, and dedication.`,
    globalDescription: "Global Shapers are dedicated to creating positive change across the world through six key impact areas.",
    areas: [
      {
        title: "Protecting the Planet",
        description: "Projects that reduce emissions, protect biodiversity and nature, and promote recycling and reusing materials.",
      },
      {
        title: "Strengthening Civic Engagement",
        description: "Projects that strengthen democracy, encourage people to vote and inspire young people to become election candidates.",
      },
      {
        title: "Delivering Basic Needs",
        description: "Projects that organize humanitarian responses, respond to natural disasters and fight extreme poverty.",
      },
      {
        title: "Improving Health and Wellbeing",
        description: "Projects that aim to improve health and well-being for young people and vulnerable groups.",
      },
      {
        title: "Reskilling for the Future",
        description: "Projects that increase access to education, skills, and jobs and promote entrepreneurship.",
      },
      {
        title: "Building Inclusive Communities",
        description: "Projects that promote diversity, equity, and inclusion in all aspects of society.",
      },
    ],
  },
  stats: {
    shapers: {
      title: "Shapers in Action",
      value: "25+",
      description: "Passionate individuals committed to positive change.",
    },
    projects: {
      title: "Local Projects Ongoing",
      value: "6",
      description: (city: string) => `Innovative solutions addressing ${city}'s key challenges.`,
    },
    partnerships: {
      title: "Local Partnerships",
      value: "15+",
      description: "Collaborating with organizations to amplify impact.",
    },
  },
  changeMakers: {
    heading: "Meet Our",
    headingHighlight: "Change Makers",
    description: (city: string, hub: string) =>
      `Our ${hub} is powered by passionate individuals committed to creating positive impact. Together, we're building a better future for our city. From diverse backgrounds and expertise, our team brings innovative solutions to ${city}'s most pressing challenges.`,
    buttonText: "See Our Hub Members",
  },
  newsletter: {
    heading: "Read Our Newsletter",
    description: (city: string) =>
      `Stay updated with our latest initiatives, impact stories, and events. Discover how we're making a difference in ${city}, one story at a time.`,
    subscribeHeading: "Stay Connected",
    subscribeDescription: "Subscribe to our newsletter to receive the latest updates about our projects, events, and opportunities to get involved.",
    emailPlaceholder: "Enter your email",
    subscribeButton: "Subscribe to Newsletter",
    readButton: "Read Latest Newsletter",
  },
  features: [
    {
      icon: "📈",
      title: "Impact Updates",
      description: "Quarterly insights into our projects and their real-world impact.",
    },
    {
      icon: "🎯",
      title: "Exclusive Content",
      description: "Behind-the-scenes looks at our initiatives and special features on our Shapers.",
    },
    {
      icon: "🤝",
      title: "Networking Opportunities",
      description: "Information about upcoming events and ways to connect with fellow change-makers.",
    },
  ],
  quickLinks: [
    { label: "Home", href: "/" },
    { label: "Shapers", href: "/shapers" },
    { label: "Our Impact", href: "/our-impact" },
    { label: "FAQs", href: "/faqs" },
    { label: "Join Us", href: "/#join-us" },
  ],
  footer: {
    description: "An initiative of the World Economic Forum, the Global Shapers Community is a network of young people driving dialogue, action, and change.",
    contactHeading: "Contact Us",
    locationSuffix: ", United Kingdom",
  },
  about: {
    heading: "About Us",
    whoWeAre: "Who We Are",
    whoWeAreDesc: (hub: string, city: string) =>
      `The ${hub} is a dynamic community of young professionals and changemakers, driven by a passion to transform the city we call home. We focus on collaborative action to tackle some of ${city}'s most urgent challenges — from sustainability to social inclusion.`,
    missionHeading: "Our Mission",
    missionDesc: (city: string) =>
      `We empower ${city}'s youth to lead the way in creating a more equitable, sustainable, and prosperous future. Through projects, workshops, and city-wide initiatives, we connect young leaders with opportunities to drive positive change.`,
    whatWeDoHeading: "What We Do",
    whatWeDoDesc: (city: string) =>
      `Our projects are designed to bring lasting change to ${city}'s communities. We focus on local solutions that scale globally, ensuring our work resonates not just here, but around the world.`,
    sustainability: {
      title: "Sustainability",
      desc: "Tackling climate change through education and action-based initiatives.",
    },
    socialInclusion: {
      title: "Social Inclusion",
      desc: "Advocating for equal opportunities and bridging societal divides.",
    },
    education: {
      title: "Education",
      desc: "Empowering the next generation through learning and leadership development.",
    },
    joinHeading: "Join Our Journey",
    joinDesc: (city: string, hub: string) =>
      `Ready to help shape the future of ${city}? Become part of the ${hub} and make an impact today.`,
    joinButton: "Become a Shaper",
  },
  shapers: {
    loading: "Loading Shapers...",
    noBio: "No bio available",
    unknown: "Unknown",
  },
  faqs: {
    heading: "Frequently Asked Questions",
  },
  impactPage: {
    heading: "Our Impact & Projects",
    noPosts: "No impact posts available at the moment. Please check back later.",
    noMoreStories: "No more stories to show.",
  },
  join: {
    readyHeading: "Ready to Make an Impact?",
    readyDesc: "Join the Global Shapers community today and help us build a better future.",
    becomeShaper: "Become a Shaper",
    transfer: (city: string) => `Transfer to ${city}`,
    closed: "Unfortunately, the applications have closed for this year. Do stay tuned for our next recruitment round!",
  },
  theme: {
    storageKey: (hubName: string) => `${hubName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/gi, '')}-theme`,
  },
  dashboard: {
    links: {
      toplink: {
        title: "TopLink",
        description: "Access the World Economic Forum's digital collaboration platform.",
      },
      shaperGuide: {
        title: "Official Shaper Guide",
        description: "Your comprehensive guide to being a Global Shaper.",
      },
      intelligence: {
        title: "WEF Intelligence",
        description: "Explore insights and analysis from the World Economic Forum.",
      },
      calendar: {
        title: "Google Calendar",
        description: "Stay updated with all Hub events and important dates.",
      },
      notion: {
        title: (hubName: string) => `${hubName}'s Notion`,
        description: "Access our Hub's knowledge base and collaborative workspace.",
      },
      teamAllocations: {
        title: "Team Allocations 2024-25",
        description: "View the current team allocations for the 2024-25 period.",
      },
    },
  },
}; 