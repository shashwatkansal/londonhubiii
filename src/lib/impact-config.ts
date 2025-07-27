// Impact Page Configuration
// This file contains all customizable content for the Our Impact page
// Edit the values below to match your hub's achievements and projects

export const impactConfig = {
  // Impact Metrics - Update these with your hub's actual numbers
  metrics: [
    {
      id: 'people-reached',
      icon: 'users',
      value: 50000,
      suffix: '+',
      label: 'People Reached',
      description: 'Community members directly impacted by our initiatives',
      color: 'bg-blue-600',
    },
    {
      id: 'projects-completed',
      icon: 'target',
      value: 125,
      suffix: '',
      label: 'Projects Completed',
      description: 'Successful initiatives delivered since our founding',
      color: 'bg-purple-600',
    },
    {
      id: 'partners',
      icon: 'globe',
      value: 40,
      suffix: '+',
      label: 'Partner Organizations',
      description: 'Collaborating to amplify our collective impact',
      color: 'bg-green-600',
    },
    {
      id: 'volunteer-hours',
      icon: 'trending',
      value: 15000,
      suffix: '+',
      label: 'Volunteer Hours',
      description: 'Contributed by our dedicated Shapers and volunteers',
      color: 'bg-orange-600',
    },
  ],

  // Project Categories
  projectCategories: [
    { id: 'education', name: 'Education' },
    { id: 'sustainability', name: 'Sustainability' },
    { id: 'health', name: 'Health & Wellbeing' },
    { id: 'tech', name: 'Technology' },
    { id: 'community', name: 'Community' },
  ],

  // Featured Projects - Add your hub's projects here
  projects: [
    {
      id: 'project-1',
      title: 'Digital Literacy for Seniors',
      description: 'Teaching essential digital skills to elderly community members to bridge the digital divide.',
      image: '/assets/images/projects/digital-literacy.jpg',
      category: 'education',
      date: 'March 2024',
      team: ['John Doe', 'Jane Smith', 'Alex Johnson'],
      impact: '500+ seniors trained in basic computer and smartphone skills',
      link: 'https://example.com/digital-literacy',
      featured: true,
    },
    {
      id: 'project-2',
      title: 'Green City Initiative',
      description: 'Urban sustainability project focusing on community gardens and renewable energy adoption.',
      image: '/assets/images/projects/green-city.jpg',
      category: 'sustainability',
      date: 'January 2024',
      team: ['Sarah Williams', 'Mike Chen', 'Emma Davis'],
      impact: '20 community gardens established, 30% reduction in neighborhood carbon footprint',
      link: 'https://example.com/green-city',
    },
    {
      id: 'project-3',
      title: 'Mental Health Matters',
      description: 'Providing free mental health resources and support groups for young professionals.',
      image: '/assets/images/projects/mental-health.jpg',
      category: 'health',
      date: 'February 2024',
      team: ['Dr. Lisa Park', 'Tom Brown', 'Rachel Green'],
      impact: '1,000+ individuals supported through workshops and counseling sessions',
    },
    {
      id: 'project-4',
      title: 'Code for Good',
      description: 'Teaching coding skills to underprivileged youth and connecting them with tech opportunities.',
      image: '/assets/images/projects/code-for-good.jpg',
      category: 'tech',
      date: 'November 2023',
      team: ['Chris Martinez', 'Priya Patel', 'James Wilson'],
      impact: '200+ students trained, 85% job placement rate',
      featured: true,
    },
    {
      id: 'project-5',
      title: 'Community Kitchen',
      description: 'Fighting food insecurity by providing nutritious meals to vulnerable community members.',
      image: '/assets/images/projects/community-kitchen.jpg',
      category: 'community',
      date: 'December 2023',
      team: ['Maria Garcia', 'David Lee', 'Sophie Turner'],
      impact: '50,000+ meals served to families in need',
    },
    {
      id: 'project-6',
      title: 'Youth Entrepreneurship Program',
      description: 'Mentoring young entrepreneurs and providing seed funding for social impact startups.',
      image: '/assets/images/projects/youth-entrepreneur.jpg',
      category: 'education',
      date: 'October 2023',
      team: ['Robert Zhang', 'Amanda White', 'Kevin Moore'],
      impact: '30 startups launched, $500K in funding distributed',
    },
  ],

  // Timeline Events - Add your hub's milestones
  timeline: [
    {
      id: 'founding',
      year: '2020',
      title: 'Hub Founded',
      description: 'Our journey began with 20 passionate young leaders committed to creating positive change.',
      icon: 'check',
      color: 'bg-blue-600',
      highlight: true,
    },
    {
      id: 'first-project',
      year: '2021',
      title: 'First Major Project',
      description: 'Launched our flagship education initiative, impacting 1,000+ students in the first year.',
      icon: 'award',
      color: 'bg-green-600',
    },
    {
      id: 'expansion',
      year: '2022',
      title: 'Community Expansion',
      description: 'Grew to 50+ active Shapers and expanded our reach to neighboring communities.',
      icon: 'users',
      color: 'bg-purple-600',
    },
    {
      id: 'recognition',
      year: '2023',
      title: 'Global Recognition',
      description: 'Received the Global Shapers Community Impact Award for our sustainability projects.',
      icon: 'award',
      color: 'bg-orange-600',
      highlight: true,
    },
    {
      id: 'partnerships',
      year: '2024',
      title: 'Strategic Partnerships',
      description: 'Formed key partnerships with government, corporate, and nonprofit organizations.',
      icon: 'globe',
      color: 'bg-blue-600',
    },
  ],

  // Partner Organizations - Add your partners here
  partners: [
    {
      id: 'partner-1',
      name: 'United Nations',
      logo: '/assets/images/partners/un-logo.png',
      url: 'https://un.org',
    },
    {
      id: 'partner-2',
      name: 'World Bank',
      logo: '/assets/images/partners/worldbank-logo.png',
      url: 'https://worldbank.org',
    },
    {
      id: 'partner-3',
      name: 'Local Government',
      logo: '/assets/images/partners/gov-logo.png',
      url: '#',
    },
    {
      id: 'partner-4',
      name: 'Tech Corp',
      logo: '/assets/images/partners/tech-logo.png',
      url: '#',
    },
    {
      id: 'partner-5',
      name: 'Green Foundation',
      logo: '/assets/images/partners/green-logo.png',
      url: '#',
    },
    {
      id: 'partner-6',
      name: 'Education Trust',
      logo: '/assets/images/partners/edu-logo.png',
      url: '#',
    },
    {
      id: 'partner-7',
      name: 'Health Initiative',
      logo: '/assets/images/partners/health-logo.png',
      url: '#',
    },
    {
      id: 'partner-8',
      name: 'Innovation Lab',
      logo: '/assets/images/partners/innovation-logo.png',
      url: '#',
    },
  ],

  // Call to Action
  cta: {
    title: 'Ready to Make an Impact?',
    description: 'Join us in creating positive change in our community and beyond.',
    primaryButton: {
      text: 'Become a Shaper',
      link: '/join',
    },
    secondaryButton: {
      text: 'Support Our Work',
      link: '/donate',
    },
  },
};