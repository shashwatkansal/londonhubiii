import React from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { FiTrendingUp, FiTrendingDown, FiMinus } from 'react-icons/fi';

interface StatsCardProps {
  title: string;
  value: string | number | null;
  change?: number;
  changeLabel?: string;
  icon: React.ReactNode;
  trend?: number;
  color?: 'blue' | 'green' | 'purple' | 'red' | 'yellow' | 'orange';
  loading?: boolean;
}

const colorClasses = {
  blue: 'from-blue-500 to-blue-600',
  green: 'from-green-500 to-green-600',
  purple: 'from-purple-500 to-purple-600',
  red: 'from-red-500 to-red-600',
  yellow: 'from-yellow-500 to-yellow-600',
  orange: 'from-orange-500 to-orange-600',
};

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  change,
  changeLabel,
  trend,
  icon,
  color = 'blue',
  loading = false,
}) => {
  const getTrendIcon = () => {
    const trendValue = change ?? trend;
    if (!trendValue) return <FiMinus />;
    return trendValue > 0 ? <FiTrendingUp /> : <FiTrendingDown />;
  };

  const getTrendColor = () => {
    const trendValue = change ?? trend;
    if (!trendValue) return 'text-gray-500';
    return trendValue > 0 ? 'text-green-500' : 'text-red-500';
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color]} opacity-10`} />
      
      <div className="relative p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 bg-gradient-to-br ${colorClasses[color]} rounded-xl text-white shadow-lg`}>
            {icon}
          </div>
          
          {(change !== undefined || trend !== undefined) && (
            <div className={`flex items-center space-x-1 text-sm ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="font-semibold">{Math.abs(change ?? trend ?? 0)}%</span>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>
          
          {loading ? (
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          ) : (
            <p className="text-2xl font-bold text-gray-800 dark:text-white">
              {value ?? 0}
            </p>
          )}
          
          {changeLabel && (
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {changeLabel}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
};