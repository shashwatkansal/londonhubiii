'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { FiCheckCircle, FiAward, FiUsers, FiGlobe } from 'react-icons/fi';
import { impactConfig } from '@/lib/impact-config';

interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  highlight?: boolean;
}

const TimelineItem: React.FC<{ event: TimelineEvent; index: number; isLeft: boolean }> = ({ 
  event, 
  index, 
  isLeft 
}) => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  
  const iconMap = {
    check: <FiCheckCircle className="w-6 h-6" />,
    award: <FiAward className="w-6 h-6" />,
    users: <FiUsers className="w-6 h-6" />,
    globe: <FiGlobe className="w-6 h-6" />,
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`flex items-center mb-12 ${isLeft ? 'flex-row-reverse' : ''}`}
    >
      {/* Content */}
      <div className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'pl-8'}`}>
        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`p-6 rounded-xl shadow-lg ${
            event.highlight 
              ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
              : 'bg-white'
          }`}
        >
          <div className={`text-sm font-bold mb-2 ${event.highlight ? 'text-blue-100' : 'text-gray-500'}`}>
            {event.year}
          </div>
          <h3 className={`text-xl font-bold mb-2 ${event.highlight ? 'text-white' : 'text-gray-900'}`}>
            {event.title}
          </h3>
          <p className={`text-sm ${event.highlight ? 'text-blue-50' : 'text-gray-600'}`}>
            {event.description}
          </p>
        </motion.div>
      </div>

      {/* Timeline dot */}
      <div className="w-2/12 flex justify-center">
        <motion.div
          whileHover={{ scale: 1.2 }}
          className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg z-10 ${event.color} text-white`}
        >
          {iconMap[event.icon as keyof typeof iconMap]}
        </motion.div>
      </div>

      {/* Empty space */}
      <div className="w-5/12" />
    </motion.div>
  );
};

export const ImpactTimeline: React.FC = () => {
  const events = impactConfig.timeline;

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Journey of Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Milestones and achievements that define our story
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-blue-600 to-purple-600 opacity-20" />

          {/* Timeline items */}
          {events.map((event, index) => (
            <TimelineItem 
              key={event.id} 
              event={event} 
              index={index} 
              isLeft={index % 2 === 0} 
            />
          ))}

          {/* Call to action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mt-16"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Be Part of Our Next Chapter
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join us in creating lasting impact and shaping the future of our community
            </p>
            <a
              href="/contact"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Get Involved
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ImpactTimeline;