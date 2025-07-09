// Centralized constants for better maintainability

// Firebase collection names
export const COLLECTIONS = {
  POSTS: 'posts',
  USERS: 'users',
  ADMINS: 'admins',
  FAQS: 'faqs',
  DIRECTORY: 'directory',
  SECRETS: 'secrets',
  USER_FEEDBACK: 'userFeedback',
  LINKS: 'links',
  SITE_SETTINGS: 'siteSettings',
} as const;

// API endpoints
export const API_ENDPOINTS = {
  POSTS: '/api/posts',
  USERS: '/api/users',
  AUTH: '/api/auth',
  FAQS: '/api/faqs',
} as const;

// Route paths
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  POSTS: '/posts',
  FAQS: '/faqs',
  SHAPERS: '/shapers',
  IMPACT: '/our-impact',
  SIGNIN: '/signin',
  DASHBOARD: '/hub/dashboard',
  HUB: '/hub',
} as const;

// Pagination defaults
export const PAGINATION_DEFAULTS = {
  PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
  DEFAULT_PAGE: 1,
} as const;

// Validation rules
export const VALIDATION_RULES = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  MAX_TITLE_LENGTH: 100,
  MAX_CONTENT_LENGTH: 10000,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  PASSWORD_TOO_SHORT: `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`,
  FILE_TOO_LARGE: `File size must be less than ${VALIDATION_RULES.MAX_FILE_SIZE / (1024 * 1024)}MB`,
  INVALID_FILE_TYPE: 'Please select a valid image file',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  NETWORK_ERROR: 'Network error. Please check your connection and try again',
  GENERIC_ERROR: 'An unexpected error occurred. Please try again',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  SAVED: 'Changes saved successfully',
  CREATED: 'Created successfully',
  UPDATED: 'Updated successfully',
  DELETED: 'Deleted successfully',
  UPLOADED: 'File uploaded successfully',
} as const;

// Theme configuration
export const THEME = {
  COLORS: {
    PRIMARY: '#003C71',
    SECONDARY: '#89CFF0',
    ACCENT: '#3A3A3A',
    SUCCESS: '#28A745',
    WARNING: '#FFC107',
    ERROR: '#DC3545',
    INFO: '#1E90FF',
  },
  BREAKPOINTS: {
    SM: '640px',
    MD: '768px',
    LG: '1024px',
    XL: '1280px',
  },
} as const;

// Animation durations
export const ANIMATION = {
  FAST: 200,
  NORMAL: 300,
  SLOW: 500,
} as const;

// Storage keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  USER_PREFERENCES: 'userPreferences',
  DRAFT_POST: 'draftPost',
} as const;

// Feature flags
export const FEATURE_FLAGS = {
  ENABLE_ANALYTICS: process.env.NODE_ENV === 'production',
  ENABLE_DEBUG_MODE: process.env.NODE_ENV === 'development',
  ENABLE_MAINTENANCE_MODE: process.env.MAINTENANCE_MODE === 'true',
} as const;