'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiUsers, FiExternalLink, FiFilter } from 'react-icons/fi';
import { impactConfig } from '@/lib/impact-config';
import { OptimizedImage } from '@/components/ui';

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  team: string[];
  impact: string;
  link?: string;
  featured?: boolean;
}

const ProjectCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative ${project.featured ? 'md:col-span-2 md:row-span-2' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden h-full hover:shadow-2xl transition-all duration-300">
        <div className={`relative ${project.featured ? 'h-96' : 'h-64'} overflow-hidden`}>
          <OptimizedImage
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-gray-800">
              {project.category}
            </span>
          </div>
          
          {project.featured && (
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium">
                Featured
              </span>
            </div>
          )}
        </div>
        
        <div className="p-6">
          <h3 className={`${project.featured ? 'text-2xl' : 'text-xl'} font-bold text-gray-900 mb-3 line-clamp-2`}>
            {project.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-3">
            {project.description}
          </p>
          
          <div className="space-y-3">
            <div className="flex items-center text-sm text-gray-500">
              <FiCalendar className="w-4 h-4 mr-2" />
              {project.date}
            </div>
            
            <div className="flex items-center text-sm text-gray-500">
              <FiUsers className="w-4 h-4 mr-2" />
              {project.team.length} team members
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-1">Impact</p>
            <p className="text-sm text-gray-600">{project.impact}</p>
          </div>
          
          {project.link && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="mt-4"
            >
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Learn more <FiExternalLink className="ml-1 w-4 h-4" />
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const ProjectShowcase: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const projects = impactConfig.projects;
  const categories = impactConfig.projectCategories;

  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how we&apos;re making a difference in our community
          </p>
        </motion.div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiFilter className="inline-block w-4 h-4 mr-2" />
            All Projects
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 text-lg mt-12"
          >
            No projects found in this category.
          </motion.p>
        )}
      </div>
    </section>
  );
};

export default ProjectShowcase;