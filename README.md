# ProjectName Website

This repository hosts the official website for **ProjectName**. The website showcases the project's mission, ongoing projects, and impact in the local community. It also provides resources for users to get involved, subscribe to the newsletter, and read updates on the project's activities.

## Table of Contents
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

## Tech Stack

- **Frontend Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Image Optimization:** next/image for responsive image loading
- **Icons:** React Icons
- **Notifications:** react-hot-toast for real-time notifications
- **Forms:** Google Forms (for user interaction)
- **Analytics:** Firebase Analytics (for tracking user interaction)
- **Deployment:** Vercel

## Installation

### Prerequisites

- Node.js v18.x or higher
- Bun
- A Firebase project (for analytics) and Firebase config

### Clone the Repository

```bash
git clone https://github.com/your-username/projectname.git
cd projectname
```

### Install Dependencies

```bash
bun install
bun run dev
```

This will start the server on http://localhost:3000.

## Configuration

### Firebase

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/).
2. In your project settings, find your Firebase config object.
3. Create a `.env.local` file in the root of your project and add the following:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

### Branding & Images

- Replace the images in `/public/assets/images/` with your own project logos and branding.
- Update the project name and description in `src/app/layout.tsx` and other relevant files.

## Contributing
We welcome contributions to improve this project. To contribute:

1. Fork this repository.
2. Create a new branch (`git checkout -b feature-branch-name`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch-name`).
5. Open a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE.md).
