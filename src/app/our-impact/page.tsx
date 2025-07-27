import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";
import { Post } from "../database/models";
import { generateSEOMetadata } from '@/components/SEO';
import { LoadingSpinner } from '@/components/ui';
import { motion } from 'framer-motion';

// Dynamic imports for better performance
const ImpactMetrics = dynamic(() => import('@/components/impact/ImpactMetrics'), {
  loading: () => <LoadingSpinner center />,
});

const ProjectShowcase = dynamic(() => import('@/components/impact/ProjectShowcase'), {
  loading: () => <LoadingSpinner center />,
});

const ImpactTimeline = dynamic(() => import('@/components/impact/ImpactTimeline'), {
  loading: () => <LoadingSpinner center />,
});

const PartnerCarousel = dynamic(() => import('@/components/impact/PartnerCarousel'), {
  loading: () => <LoadingSpinner center />,
});

export const metadata = generateSEOMetadata({
  title: 'Our Impact',
  description: 'Discover how we\'re creating positive change in our community through innovative projects and initiatives.',
  keywords: ['impact', 'projects', 'community', 'social change', 'initiatives'],
});

export default async function ImpactPage() {
  let allPosts: Post[] = [];

  try {
    const postsResponse = await getAllPosts();
    allPosts = postsResponse.data || [];
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    allPosts = [];
  }

  const heroPost = allPosts.length > 0 ? allPosts[0] : null;
  const morePosts = allPosts.slice(1, 4); // Show only 3 recent posts

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-800 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        
        {/* Animated background shapes */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in-up">
              Creating Impact,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Shaping Tomorrow
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-fade-in-up animation-delay-200">
              Discover how we&apos;re driving positive change through innovation, collaboration, and community action.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
              <a
                href="#metrics"
                className="inline-block px-8 py-3 bg-white text-blue-900 font-medium rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
              >
                Explore Our Impact
              </a>
              <a
                href="#projects"
                className="inline-block px-8 py-3 border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:-translate-y-1"
              >
                View Projects
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <div id="metrics">
        <Suspense fallback={<LoadingSpinner center />}>
          <ImpactMetrics />
        </Suspense>
      </div>

      {/* Project Showcase */}
      <div id="projects">
        <Suspense fallback={<LoadingSpinner center />}>
          <ProjectShowcase />
        </Suspense>
      </div>

      {/* Impact Timeline */}
      <Suspense fallback={<LoadingSpinner center />}>
        <ImpactTimeline />
      </Suspense>

      {/* Partner Carousel */}
      <Suspense fallback={<LoadingSpinner center />}>
        <PartnerCarousel />
      </Suspense>

      {/* Blog Posts Section */}
      {allPosts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Latest Stories
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Read about our recent activities and insights from our community
              </p>
            </div>

            {heroPost && (
              <div className="mb-16">
                <HeroPost
                  title={heroPost.title}
                  coverImage={heroPost.coverImage}
                  date={heroPost.date.toDate()}
                  authors={heroPost.authors}
                  slug={heroPost.slug}
                  excerpt={heroPost.excerpt}
                />
              </div>
            )}

            {morePosts.length > 0 && <MoreStories posts={morePosts} />}

            <div className="text-center mt-12">
              <a
                href="/blog"
                className="inline-block px-6 py-3 border-2 border-gray-800 text-gray-800 font-medium rounded-full hover:bg-gray-800 hover:text-white transition-all duration-300"
              >
                View All Stories
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Make an Impact?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join us in creating positive change in our community and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/join"
              className="inline-block px-8 py-3 bg-white text-blue-900 font-medium rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1"
            >
              Become a Shaper
            </a>
            <a
              href="/contact"
              className="inline-block px-8 py-3 border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300 transform hover:-translate-y-1"
            >
              Partner With Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}