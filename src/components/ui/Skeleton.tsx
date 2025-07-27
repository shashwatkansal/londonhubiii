import React from 'react';
import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular' | 'rounded';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  variant = 'text',
  width,
  height,
  animation = 'pulse',
}) => {
  const baseClasses = 'bg-gray-200 dark:bg-gray-700';
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: '',
    rounded: 'rounded-lg',
  };

  const animationClasses = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  const style: React.CSSProperties = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1em' : '100%'),
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${animationClasses[animation]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
};

interface SkeletonGroupProps {
  count?: number;
  className?: string;
  children?: React.ReactNode;
}

export const SkeletonGroup: React.FC<SkeletonGroupProps> = ({
  count = 1,
  className = '',
  children,
}) => {
  if (children) {
    return <div className={`space-y-2 ${className}`}>{children}</div>;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} />
      ))}
    </div>
  );
};

export const CardSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 ${className}`}>
    <Skeleton variant="rectangular" height={200} className="mb-4" />
    <Skeleton variant="text" className="mb-2" />
    <SkeletonGroup count={3}>
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="70%" />
    </SkeletonGroup>
  </div>
);

export const ProfileSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex items-center space-x-4 ${className}`}>
    <Skeleton variant="circular" width={64} height={64} />
    <div className="flex-1">
      <Skeleton variant="text" width="40%" className="mb-2" />
      <Skeleton variant="text" width="60%" />
    </div>
  </div>
);

export const TableRowSkeleton: React.FC<{ columns?: number }> = ({ columns = 4 }) => (
  <tr>
    {Array.from({ length: columns }).map((_, index) => (
      <td key={index} className="px-6 py-4">
        <Skeleton variant="text" />
      </td>
    ))}
  </tr>
);

export const PostSkeleton: React.FC = () => (
  <article className="max-w-4xl mx-auto">
    <Skeleton variant="rectangular" height={400} className="mb-8 rounded-lg" />
    <Skeleton variant="text" height={48} className="mb-4" />
    <div className="flex items-center space-x-4 mb-8">
      <Skeleton variant="circular" width={48} height={48} />
      <div className="flex-1">
        <Skeleton variant="text" width="30%" className="mb-1" />
        <Skeleton variant="text" width="20%" />
      </div>
    </div>
    <SkeletonGroup count={5} className="space-y-4">
      <Skeleton variant="text" />
      <Skeleton variant="text" width="95%" />
      <Skeleton variant="text" width="90%" />
      <Skeleton variant="text" />
      <Skeleton variant="text" width="85%" />
    </SkeletonGroup>
  </article>
);

export const DashboardSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white rounded-lg shadow p-6">
          <Skeleton variant="text" width="60%" className="mb-2" />
          <Skeleton variant="text" height={32} width="40%" />
        </div>
      ))}
    </div>
    <div className="bg-white rounded-lg shadow p-6">
      <Skeleton variant="rectangular" height={300} />
    </div>
  </div>
);

export default Skeleton;