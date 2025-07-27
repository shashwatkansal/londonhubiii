import dynamic from 'next/dynamic';
import React from 'react';
import { LoadingSpinner } from '@/components/ui';

// Default loading component
const DefaultLoading = () => (
  <div className="flex items-center justify-center min-h-[200px]">
    <LoadingSpinner size="lg" />
  </div>
);

// Pre-configured dynamic imports for heavy components
export const DynamicChart = dynamic(
  () => import('@/components/dashboard/Chart').then(mod => ({ default: mod.Chart })),
  { 
    loading: () => <DefaultLoading />,
    ssr: false 
  }
);

export const DynamicContentEditor = dynamic(
  () => import('@/components/ui/ContentEditor'),
  { 
    loading: () => <DefaultLoading />,
    ssr: false 
  }
);

export const DynamicDataTable = dynamic(
  () => import('@/components/dashboard/DataTable').then(mod => ({ default: mod.DataTable })),
  { loading: () => <DefaultLoading /> }
);

export const DynamicCalendarSection = dynamic(
  () => import('@/app/_components/dashboard/CalendarSection'),
  { loading: () => <DefaultLoading /> }
);

export const DynamicUserManagement = dynamic(
  () => import('@/app/_components/dashboard/UserManagementSection'),
  { loading: () => <DefaultLoading /> }
);

export const DynamicAdvancedCollectionManager = dynamic(
  () => import('@/app/_components/dashboard/AdvancedCollectionManager'),
  { loading: () => <DefaultLoading /> }
);

// Dashboard sections with loading states
export const DynamicDashboardSections = {
  profile: dynamic(
    () => import('@/app/_components/dashboard/ProfileSection'),
    { loading: () => <DefaultLoading /> }
  ),
  faqs: dynamic(
    () => import('@/app/_components/dashboard/FAQsSection'),
    { loading: () => <DefaultLoading /> }
  ),
  calendar: dynamic(
    () => import('@/app/_components/dashboard/CalendarSection'),
    { loading: () => <DefaultLoading /> }
  ),
  links: dynamic(
    () => import('@/app/_components/dashboard/LinksSection'),
    { loading: () => <DefaultLoading /> }
  ),
  createPost: dynamic(
    () => import('@/app/_components/dashboard/CreatePostSection'),
    { loading: () => <DefaultLoading /> }
  ),
  passwordManager: dynamic(
    () => import('@/app/_components/dashboard/SecretsManager'),
    { loading: () => <DefaultLoading /> }
  ),
  userManagement: dynamic(
    () => import('@/app/_components/dashboard/UserManagementSection'),
    { loading: () => <DefaultLoading /> }
  ),
};