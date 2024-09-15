# Global Shapers London Hub III Website

This repository hosts the official website for the **Global Shapers London Hub III**. The website showcases the hub's mission, ongoing projects, and impact in the local community. It also provides resources for users to get involved, subscribe to the newsletter, and read updates on the hub's activities.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Development](#development)
- [Production](#production)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Dynamic Content:** A hero section with parallax effects for modern visuals.
- **Impact Statistics:** Display live statistics on projects, collaborations, and shapers in action.
- **Responsive Design:** Optimized for mobile and desktop.
- **Smooth Scrolling:** Navigation to the `Join Us` call-to-action.
- **Newsletter Subscription:** A section to subscribe to the latest updates.
- **Team Section:** Dynamic content to showcase team members.

## Tech Stack

- **Frontend Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Image Optimization:** next/image for responsive image loading
- **Icons:** React Icons
- **Notifications:** react-hot-toast for real-time notifications
- **Forms:** Google Forms (for user interaction)
- **Analytics:** Firebase Analytics (for tracking user interaction)

## Installation

### Prerequisites

- Node.js v18.x or higher
- npm or Yarn
- A Firebase project (for analytics) and Firebase config

### Clone the Repository

```bash
git clone https://github.com/your-username/global-shapers-london-hub.git
cd global-shapers-london-hub
```

## Installation

### Prerequisites

- Node.js v18.x or higher
- Bun
- A Firebase project (for analytics) and Firebase config

### Install Dependencies

```bash
bun install
bun run dev
```

This will start the server on http://localhost:3000.

### Testing the Parallax Effect
The Hero section uses a parallax effect on the main image. Ensure your browser supports smooth scrolling and that it's responsive on both mobile and desktop views.

### Development with Hot Reloading
The project is built with the Next.js app router, allowing dynamic imports and component-level hot reloading.

## Contributing
We welcome contributions to improve this project. To contribute:

Fork this repository.
1. Create a new branch (git checkout -b feature-branch-name).
2. Make your changes and commit them (git commit -m 'Add new feature').
3. Push to the branch (git push origin feature-branch-name).
4. Open a pull request.

### License
This project is licensed under the MIT License. See the LICENSE file for details.
