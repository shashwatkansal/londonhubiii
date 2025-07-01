# API Reference

This document provides detailed information about the components, configuration options, and APIs available in the Global Shapers Hub Website Template.

## 🔧 Configuration APIs

### HUB_CONFIG (settings.ts)

The main configuration object for hub-specific settings.

```typescript
interface HubConfig {
  // General Information
  HUB_NAME: string;
  CITY_NAME: string;
  CMS_NAME: string;
  EXAMPLE_PATH: string;
  HOME_OG_IMAGE_URL: string;

  // Social Media
  TWITTER_HANDLE: string;
  FACEBOOK_URL: string;
  INSTAGRAM_URL: string;
  LINKEDIN_URL: string;
  EMAIL_ADDRESS: string;

  // Website URLs
  HUB_URL: string;

  // Dashboard Resources
  CALENDAR_EMBED_URL: string;
  NOTION_URL: string;
  TEAM_ALLOCATIONS_URL: string;

  // SEO/Meta
  META_DESCRIPTION: string;
  META_KEYWORDS: string;

  // Assets
  LOGO_MAIN: string;
  LOGO_SECONDARY: string;
  ABOUT_PAGE_IMAGE_MAIN: string;
  ABOUT_PAGE_IMAGE_TEAM: string;
  ABOUT_PAGE_VIDEO_URL: string;

  // Forms
  APPLICATION_URL: string;
  TRANSFER_APPLICATION_URL: string;

  // Contact
  PHYSICAL_ADDRESS: string;
  PHONE_NUMBER: string;

  // External Links
  NEWSLETTER_URL: string;
  WEF_INTELLIGENCE_URL: string;
  TOPLINK_URL: string;
  SHAPER_GUIDE_URL: string;

  // Page Headings
  IMPACT_PAGE_HEADING: string;
  SHAPERS_PAGE_HEADING: string;
  SHAPER_DEFAULT_ROLE: string;
  FAQS_PAGE_HEADING: string;
}
```

### TEXTS (texts.ts)

The centralized text content configuration.

```typescript
interface TextsConfig {
  hero: {
    title: string;
    subtitle: string;
    typed: string[];
    description: string;
    cta: {
      join: string;
      learn: string;
    };
  };

  mission: {
    heading: string;
    description: (city: string, hub: string) => string;
  };

  features: {
    heading: string;
    items: Array<{
      title: string;
      description: string;
      icon: string;
    }>;
  };

  impact: {
    heading: string;
    description: string;
    stats: Array<{
      number: string;
      label: string;
    }>;
  };

  about: {
    heading: string;
    description: (city: string, hub: string) => string;
    team: {
      heading: string;
      description: string;
    };
    values: Array<{
      title: string;
      description: string;
    }>;
  };

  join: {
    heading: string;
    description: string;
    requirements: {
      heading: string;
      items: string[];
    };
    process: {
      heading: string;
      steps: Array<{
        title: string;
        description: string;
      }>;
    };
    cta: {
      apply: string;
      transfer: string;
    };
  };

  footer: {
    description: string;
    links: {
      about: string;
      impact: string;
      shapers: string;
      faqs: string;
      join: string;
    };
    social: {
      follow: string;
    };
    copyright: (year: number, hub: string) => string;
  };

  dashboard: {
    // Dashboard-specific text content
    navigation: Record<string, string>;
    headings: Record<string, string>;
    buttons: Record<string, string>;
    messages: Record<string, string>;
  };
}
```

## 🧩 Component APIs

### AdvancedCollectionManager

A generic component for managing Firestore collections with CRUD operations.

```typescript
interface AdvancedCollectionManagerProps<T> {
  collectionName: string;
  fields: FieldDef[];
  converter: FirestoreDataConverter<T>;
  idField?: string;
  specialBadges?: BadgeDef[];
  contextActions?: ContextAction<T>[];
  exportToCSV?: boolean;
}

interface FieldDef {
  key: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'date' | 'select' | 'role';
  required?: boolean;
  options?: string[]; // For select fields
}

interface BadgeDef {
  field: string;
  value: any;
  label: string;
  color: string;
}

interface ContextAction<T> {
  label: string;
  action: (doc: T) => void;
  condition?: (doc: T) => boolean;
  color?: string;
}
```

**Usage Example:**
```typescript
<AdvancedCollectionManager
  collectionName="directory"
  fields={[
    { key: "name", label: "Name", type: "text", required: true },
    { key: "email", label: "Email", type: "email", required: true },
    { key: "role", label: "Role", type: "role" },
    { key: "bio", label: "Bio", type: "textarea" },
  ]}
  converter={userConverter}
  idField="email"
  specialBadges={[
    { field: "role", value: "Admin", label: "Admin", color: "red" }
  ]}
  contextActions={[
    {
      label: "Make Admin",
      action: (user) => makeAdmin(user),
      condition: (user) => user.role !== "Admin",
      color: "blue"
    }
  ]}
  exportToCSV={true}
/>
```

### ThemeSwitcher

Component for dark/light theme switching.

```typescript
interface ThemeSwitcherProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}
```

### PostPreviewModal

Modal component for previewing blog posts.

```typescript
interface PostPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  post: Post;
}
```

## 🗃️ Database Models

### User Model

```typescript
interface User {
  name: string;
  email: string;
  role: Role;
  bio?: string;
  linkedin?: string;
  twitter?: string;
  image?: string;
  joinDate?: Timestamp;
}

enum Role {
  Shaper = "Shaper",
  Admin = "Admin",
  Alumni = "Alumni",
  Curator = "Curator",
  "Vice Curator" = "Vice Curator",
}
```

### Post Model

```typescript
interface Post {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  date: Timestamp;
  author: string;
  status: 'draft' | 'published';
  tags?: string[];
  readTime?: number;
}
```

### FAQ Model

```typescript
interface FAQ {
  question: string;
  answer: string;
  category: string;
  order?: number;
  isActive?: boolean;
}
```

### SiteSetting Model

```typescript
interface SiteSetting {
  key: string;
  value: string;
  description?: string;
  type?: 'string' | 'number' | 'boolean' | 'json';
}
```

## 🔐 Authentication Hooks

### useAuth

Hook for accessing authentication state and methods.

```typescript
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
}

const { user, loading, signIn, signOut, signUp } = useAuth();
```

### useAdminAccess

Hook for checking admin privileges.

```typescript
interface AdminAccessType {
  isAdmin: boolean;
  loading: boolean;
  checkAdminStatus: () => Promise<boolean>;
}

const { isAdmin, loading, checkAdminStatus } = useAdminAccess();
```

## 📊 Helper Functions

### Database Helpers

```typescript
// Generic CRUD operations
export const createDocument = <T>(
  collection: CollectionReference<T>,
  data: T
): Promise<DocumentReference<T>>;

export const getDocument = <T>(
  docRef: DocumentReference<T>
): Promise<DocumentSnapshot<T>>;

export const updateDocument = <T>(
  docRef: DocumentReference<T>,
  data: Partial<T>
): Promise<void>;

export const deleteDocument = <T>(
  docRef: DocumentReference<T>
): Promise<void>;

export const getAllDocuments = <T>(
  collection: CollectionReference<T>
): Promise<QuerySnapshot<T>>;
```

### Specific Model Helpers

```typescript
// User helpers
export const usersHelpers = {
  getAll: () => Promise<User[]>;
  getById: (id: string) => Promise<User | null>;
  create: (user: User) => Promise<string>;
  update: (id: string, data: Partial<User>) => Promise<void>;
  delete: (id: string) => Promise<void>;
};

// Post helpers
export const postsHelpers = {
  getAll: () => Promise<Post[]>;
  getPublished: () => Promise<Post[]>;
  getDrafts: () => Promise<Post[]>;
  getBySlug: (slug: string) => Promise<Post | null>;
  create: (post: Post) => Promise<string>;
  update: (id: string, data: Partial<Post>) => Promise<void>;
  publish: (id: string) => Promise<void>;
  unpublish: (id: string) => Promise<void>;
  delete: (id: string) => Promise<void>;
};
```

## 🎨 Styling APIs

### Theme Configuration

The project uses Tailwind CSS with custom configuration:

```typescript
// tailwind.config.ts
interface TailwindConfig {
  theme: {
    extend: {
      colors: {
        primary: ColorScale;
        secondary: ColorScale;
        accent: ColorScale;
      };
      fontFamily: {
        sans: string[];
        serif: string[];
        mono: string[];
      };
      animation: Record<string, string>;
      keyframes: Record<string, Record<string, any>>;
    };
  };
}
```

### CSS Custom Properties

Available CSS variables for theming:

```css
:root {
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --color-accent: #f59e0b;
  --color-background: #ffffff;
  --color-foreground: #0f172a;
  --color-muted: #f1f5f9;
  --color-border: #e2e8f0;
}
```

## 🔄 Event System

### Custom Events

The application uses custom events for component communication:

```typescript
// Event types
interface CustomEvents {
  'theme-changed': { theme: 'light' | 'dark' };
  'user-updated': { user: User };
  'post-published': { post: Post };
  'admin-action': { action: string; target: string };
}

// Event dispatch
const dispatchCustomEvent = <K extends keyof CustomEvents>(
  type: K,
  detail: CustomEvents[K]
) => {
  window.dispatchEvent(new CustomEvent(type, { detail }));
};

// Event listener
const useCustomEvent = <K extends keyof CustomEvents>(
  type: K,
  handler: (event: CustomEvent<CustomEvents[K]>) => void
) => {
  useEffect(() => {
    window.addEventListener(type, handler as EventListener);
    return () => window.removeEventListener(type, handler as EventListener);
  }, [type, handler]);
};
```

## 🚀 Performance APIs

### Image Optimization

```typescript
// Next.js Image component with optimization
import Image from 'next/image';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
}
```

### Dynamic Imports

```typescript
// Lazy loading components
const DynamicComponent = dynamic(() => import('./Component'), {
  loading: () => <Spinner />,
  ssr: false, // Disable server-side rendering if needed
});
```

## 📱 Responsive Design

### Breakpoints

```typescript
// Tailwind breakpoints
const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};
```

### Responsive Utilities

```typescript
// Custom hooks for responsive design
const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState('sm');
  
  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= 1536) setBreakpoint('2xl');
      else if (width >= 1280) setBreakpoint('xl');
      else if (width >= 1024) setBreakpoint('lg');
      else if (width >= 768) setBreakpoint('md');
      else setBreakpoint('sm');
    };
    
    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);
  
  return breakpoint;
};
```

---

## 📚 Additional Resources

- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Firebase Web SDK](https://firebase.google.com/docs/web/setup)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

**Need help with the API?** Check our [Developer Guide](CUSTOMIZATION.md) or [open an issue](../../issues) for specific questions. 