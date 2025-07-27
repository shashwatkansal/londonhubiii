import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

interface UseAccessibilityOptions {
  announcePageChanges?: boolean;
  enableKeyboardShortcuts?: boolean;
  enableFocusTrap?: boolean;
  skipLinks?: Array<{ label: string; href: string }>;
}

export function useAccessibility(options: UseAccessibilityOptions = {}) {
  const {
    announcePageChanges = true,
    enableKeyboardShortcuts = true,
    enableFocusTrap = false,
    skipLinks = [],
  } = options;

  const router = useRouter();
  const [announcement, setAnnouncement] = useState('');
  const announcementRef = useRef<HTMLDivElement>(null);

  // Announce page changes for screen readers
  useEffect(() => {
    if (!announcePageChanges) return;

    const handleRouteChange = () => {
      const pageTitle = document.title;
      setAnnouncement(`Navigated to ${pageTitle}`);
      
      // Focus management
      const mainContent = document.querySelector('main');
      if (mainContent instanceof HTMLElement) {
        mainContent.tabIndex = -1;
        mainContent.focus();
      }
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, [announcePageChanges]);

  // Keyboard shortcuts
  useEffect(() => {
    if (!enableKeyboardShortcuts) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Skip if user is typing in an input
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable
      ) {
        return;
      }

      // Alt + H: Go home
      if (e.altKey && e.key === 'h') {
        e.preventDefault();
        router.push('/');
      }

      // Alt + S: Skip to main content
      if (e.altKey && e.key === 's') {
        e.preventDefault();
        const mainContent = document.querySelector('main');
        if (mainContent instanceof HTMLElement) {
          mainContent.tabIndex = -1;
          mainContent.focus();
        }
      }

      // Alt + / : Show keyboard shortcuts
      if (e.altKey && e.key === '/') {
        e.preventDefault();
        setAnnouncement('Keyboard shortcuts: Alt+H for home, Alt+S to skip to content');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [enableKeyboardShortcuts, router]);

  return {
    announcement,
    announcementRef,
  };
}

// Focus trap hook for modals and dialogs
export function useFocusTrap(containerRef: React.RefObject<HTMLElement>, isActive = true) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstFocusable = focusableElements[0] as HTMLElement;
    const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement;

    // Store previously focused element
    const previouslyFocused = document.activeElement as HTMLElement;

    // Focus first element
    firstFocusable?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstFocusable) {
          lastFocusable?.focus();
          e.preventDefault();
        }
      } else {
        // Tab
        if (document.activeElement === lastFocusable) {
          firstFocusable?.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      // Restore focus to previously focused element
      previouslyFocused?.focus();
    };
  }, [containerRef, isActive]);
}

// Reduced motion hook
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return prefersReducedMotion;
}

// Live region announcer component
export function LiveRegionAnnouncer({ announcement }: { announcement: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  );
}

// Skip links component
export function SkipLinks({ links }: { links: Array<{ label: string; href: string }> }) {
  return (
    <div className="skip-links">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-blue-600 focus:text-white"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

// ARIA labels helper
export const ariaLabels = {
  navigation: {
    main: 'Main navigation',
    breadcrumb: 'Breadcrumb navigation',
    pagination: 'Pagination navigation',
  },
  buttons: {
    close: 'Close',
    menu: 'Open menu',
    search: 'Search',
    submit: 'Submit form',
    edit: 'Edit',
    delete: 'Delete',
    save: 'Save changes',
    cancel: 'Cancel',
  },
  forms: {
    required: 'Required field',
    error: 'Error:',
    success: 'Success:',
    info: 'Information:',
  },
  status: {
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Action completed successfully',
  },
};