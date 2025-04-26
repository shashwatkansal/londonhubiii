# Hub Platform

A modern, customizable platform for managing and showcasing hub communities. Built with Next.js, React, and Firebase.

## Features

- 🎨 Customizable theme and branding
- 📱 Mobile-first responsive design
- 🔐 Secure authentication
- 📝 Blog system
- 📅 Event management
- 👥 Member directory
- 🚀 Project showcase
- 📊 Analytics integration

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/hub-platform.git
   cd hub-platform
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up Firebase:
   - Create a new Firebase project
   - Copy the Firebase configuration from your project settings
   - Create `src/lib/firebaseConfig.ts` using the template in `src/lib/firebaseConfig.example.ts`
   - Replace the placeholder values with your Firebase configuration

4. Configure your hub:
   - Create a new configuration file in `src/lib/hubConfig.ts`
   - Customize the settings according to your hub's needs

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Customization

### Theme Customization

The platform uses Tailwind CSS for styling. You can customize the theme by modifying the `hubConfig.ts` file:

```typescript
export const yourHubConfig: HubConfig = {
  ...defaultHubConfig,
  theme: {
    primaryColor: "#your-color",
    secondaryColor: "#your-color",
    accentColor: "#your-color",
    fontFamily: "Your-Font",
  },
};
```

### Feature Toggle

Enable or disable features in the `hubConfig.ts` file:

```typescript
export const yourHubConfig: HubConfig = {
  ...defaultHubConfig,
  features: {
    enableBlog: true,
    enableEvents: true,
    enableMembers: true,
    enableProjects: true,
  },
};
```

### Adding Custom Pages

1. Create a new page in the `src/app` directory
2. Use the existing components and layouts
3. Add your custom content and functionality

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.

## Acknowledgments

- Next.js
- React
- Firebase
- Tailwind CSS
- All contributors and supporters
