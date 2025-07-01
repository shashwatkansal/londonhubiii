# 🛠️ Developer Customization Guide

This guide is for developers who want to modify the codebase, add new features, or understand the technical architecture of the Global Shapers Hub website template.

## 🏗️ Architecture Overview

### Tech Stack
- **Frontend:** Next.js 14 (React 18)
- **Styling:** Tailwind CSS
- **Database:** Firebase Firestore (optional)
- **Authentication:** Firebase Auth (optional)
- **Deployment:** Vercel/Netlify
- **Language:** TypeScript

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── _components/        # Reusable components
│   │   └── dashboard/      # Dashboard-specific components
│   ├── about/             # About page
│   ├── faqs/              # FAQs page
│   ├── hub/               # Hub dashboard
│   ├── our-impact/        # Impact/blog page
│   ├── posts/[slug]/      # Dynamic blog post pages
│   ├── shapers/           # Team members page
│   ├── signin/            # Sign-in page
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and config
│   ├── api.ts            # Blog post API
│   ├── auth.tsx          # Authentication context
│   ├── firebaseConfig.ts # Firebase configuration
│   ├── settings.ts       # Hub configuration
│   └── texts.ts          # All user-facing text
└── database/
    └── models.ts         # Firestore data models
```

## 🎨 Styling & Theming

### Tailwind CSS Configuration

The project uses Tailwind CSS with custom configuration in `tailwind.config.ts`:

```typescript
// Custom colors, fonts, and animations
theme: {
  extend: {
    colors: {
      // Add your hub's brand colors
      primary: {
        50: '#eff6ff',
        500: '#3b82f6',
        900: '#1e3a8a',
      }
    },
    fontFamily: {
      // Add custom fonts
      sans: ['Aperçu', 'Avenir', 'Proxima Nova', ...defaultTheme.fontFamily.sans],
    }
  }
}
```

### Global Styles

Global styles are defined in `src/app/globals.css`:
- CSS variables for theme colors
- Custom animations
- Component-specific styles

### Component Styling

All components use Tailwind classes for styling. Key patterns:
- Responsive design with `sm:`, `md:`, `lg:` prefixes
- Dark mode support with `dark:` prefix
- Hover and focus states for accessibility

## 🔧 Configuration System

### Settings Architecture

The configuration system is designed for easy customization without code changes:

**`src/lib/settings.ts`** - Hub-specific configuration
```typescript
export const HUB_CONFIG = {
  // All configuration options with environment variable fallbacks
  HUB_NAME: process.env.NEXT_PUBLIC_HUB_NAME || "Default Hub Name",
  // ... other settings
};
```

**`src/lib/texts.ts`** - All user-facing text
```typescript
export const TEXTS = {
  // Organized by page/section
  hero: { title: "...", subtitle: "..." },
  mission: { heading: "...", description: (city, hub) => `...` },
  // ... other text content
};
```

### Environment Variables

Environment variables follow the pattern `NEXT_PUBLIC_*` for client-side access:
- All variables are optional with sensible defaults
- Variables are documented in `.env.example`
- Type-safe access through the settings system

## 🗃️ Database & Models

### Firestore Collections

The app uses several Firestore collections with type-safe models:

```typescript
// src/app/database/models.ts

export interface User {
  name: string;
  email: string;
  role: Role;
  bio?: string;
  // ... other fields
}

export interface Post {
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published';
  // ... other fields
}
```

### Data Converters

All Firestore operations use type-safe converters:

```typescript
export const userConverter: FirestoreDataConverter<User> = {
  toFirestore(user: User): DocumentData {
    return { ...user };
  },
  fromFirestore(snapshot, options) {
    return snapshot.data(options) as User;
  },
};
```

### Helper Functions

Database operations are abstracted through helper functions:

```typescript
export const usersHelpers = {
  getAll: () => getAllDocuments(collection(db, 'directory').withConverter(userConverter)),
  getById: (id: string) => getDocument(doc(db, 'directory', id).withConverter(userConverter)),
  create: (user: User) => createDocument(collection(db, 'directory').withConverter(userConverter), user),
  // ... other operations
};
```

## 🔐 Authentication & Authorization

### Authentication Flow

1. Firebase Auth for user authentication
2. Custom `useAuth` hook for auth state management
3. `requireAuth` HOC for protected pages
4. Admin role checking through Firestore

### Admin System

Admin privileges are managed through:
- `admins` collection in Firestore
- `useAdminAccess` hook for checking admin status
- Role-based UI rendering

```typescript
// Usage in components
const { isAdmin } = useAdminAccess();

return (
  <div>
    {isAdmin && <AdminOnlyComponent />}
  </div>
);
```

## 📱 Dashboard System

### Component Architecture

The dashboard uses a tab-based system with reusable components:

```typescript
// Tab configuration
const TABS = [
  { key: "profile", label: "Profile", icon: <FaUser />, admin: false },
  { key: "analytics", label: "Analytics", icon: <FaChartBar />, admin: true },
  // ... other tabs
];
```

### Advanced Collection Manager

The `AdvancedCollectionManager` component provides CRUD operations for any Firestore collection:

```typescript
<AdvancedCollectionManager
  collectionName="users"
  fields={[
    { key: "name", label: "Name", type: "text" },
    { key: "email", label: "Email", type: "email" },
  ]}
  converter={userConverter}
  idField="email"
  exportToCSV={true}
/>
```

## 🎯 Adding New Features

### Adding a New Page

1. Create a new directory in `src/app/`
2. Add a `page.tsx` file
3. Update navigation if needed
4. Add any required text to `texts.ts`

```typescript
// src/app/events/page.tsx
export default function EventsPage() {
  return (
    <div>
      <h1>{TEXTS.events.heading}</h1>
      {/* Page content */}
    </div>
  );
}
```

### Adding a New Dashboard Tab

1. Add tab configuration to `TABS` array
2. Create the component
3. Add rendering logic in the main dashboard component

```typescript
// Add to TABS array
{ key: "events", label: "Events", icon: <FaCalendar />, admin: false }

// Add rendering logic
{activeTab === "events" && <EventsSection />}
```

### Adding a New Firestore Collection

1. Define the interface in `models.ts`
2. Create a Firestore converter
3. Add helper functions
4. Optionally add to dashboard with `AdvancedCollectionManager`

## 🔍 SEO & Performance

### SEO Configuration

SEO is handled through Next.js metadata API:

```typescript
// src/app/layout.tsx
export const metadata: Metadata = {
  title: SETTINGS.HUB_CONFIG.HUB_NAME,
  description: SETTINGS.HUB_CONFIG.META_DESCRIPTION,
  // ... other metadata
};
```

### Performance Optimizations

- Image optimization with Next.js `Image` component
- Dynamic imports for heavy components
- Static generation for blog posts
- Efficient re-renders with proper React patterns

## 🧪 Testing

### Testing Setup

The project is set up for testing with:
- Jest for unit tests
- React Testing Library for component tests
- Cypress for E2E tests (optional)

### Writing Tests

```typescript
// Example component test
import { render, screen } from '@testing-library/react';
import { HeroSection } from './HeroSection';

test('renders hero title', () => {
  render(<HeroSection />);
  expect(screen.getByText(TEXTS.hero.title)).toBeInTheDocument();
});
```

## 🚀 Deployment & CI/CD

### Build Configuration

The project includes build optimizations:
- Static exports for static hosting
- Environment variable validation
- Bundle analysis tools

### Deployment Platforms

**Vercel (Recommended):**
- Automatic deployments from Git
- Environment variable management
- Preview deployments for PRs

**Netlify:**
- Similar features to Vercel
- Build command: `npm run build`
- Publish directory: `out`

### CI/CD Pipeline

Example GitHub Actions workflow:

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
      - run: npm install
      - run: npm run build
      - run: npm run test
```

## 🐛 Debugging & Troubleshooting

### Common Development Issues

**Build Errors:**
- Check TypeScript errors: `npm run type-check`
- Validate environment variables
- Check import paths

**Runtime Errors:**
- Check browser console
- Verify Firebase configuration
- Check network requests in dev tools

**Styling Issues:**
- Verify Tailwind classes are correct
- Check responsive breakpoints
- Validate CSS custom properties

### Development Tools

Useful tools for development:
- React Developer Tools
- Firebase Emulator Suite
- Tailwind CSS IntelliSense
- TypeScript Language Server

## 📚 Further Reading

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Firebase Documentation](https://firebase.google.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

Happy coding! 🚀 