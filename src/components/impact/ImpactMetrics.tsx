'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { FiUsers, FiTarget, FiGlobe, FiTrendingUp } from 'react-icons/fi';
import { impactConfig } from '@/lib/impact-config';

interface MetricProps {
  icon: React.ReactNode;
  value: number;
  suffix?: string;
  label: string;
  description: string;
  color: string;
  delay?: number;
}

const AnimatedMetric: React.FC<MetricProps> = ({
  icon,
  value,
  suffix = '',
  label,
  description,
  color,
  delay = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
      
      // Animate number counting
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(timer);
    }
  }, [inView, value, controls]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
        <div
          className={`inline-flex p-4 rounded-full mb-6 ${color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}
        >
          <div className={`${color.replace('bg-', 'text-')}`}>{icon}</div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-baseline space-x-1">
            <span className="text-4xl md:text-5xl font-bold text-gray-900">
              {displayValue.toLocaleString()}
            </span>
            {suffix && (
              <span className="text-2xl md:text-3xl font-semibold text-gray-700">
                {suffix}
              </span>
            )}
          </div>
          
          <h3 className="text-xl font-semibold text-gray-800">{label}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
        
        {/* Animated background decoration */}
        <div
          className={`absolute -top-4 -right-4 w-24 h-24 ${color} opacity-5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500`}
        />
      </div>
    </motion.div>
  );
};

export const ImpactMetrics: React.FC = () => {
  const metrics = impactConfig.metrics;

  const iconMap = {
    users: <FiUsers className="w-8 h-8" />,
    target: <FiTarget className="w-8 h-8" />,
    globe: <FiGlobe className="w-8 h-8" />,
    trending: <FiTrendingUp className="w-8 h-8" />,
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Measurable change through collective action
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <AnimatedMetric
              key={metric.id}
              icon={iconMap[metric.icon as keyof typeof iconMap]}
              value={metric.value}
              suffix={metric.suffix}
              label={metric.label}
              description={metric.description}
              color={metric.color}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;