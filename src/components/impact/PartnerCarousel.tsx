'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { impactConfig } from '@/lib/impact-config';

export const PartnerCarousel: React.FC = () => {
  const partners = impactConfig.partners;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Partners & Supporters
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Working together to amplify our impact
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={2}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
            className="partner-carousel"
          >
            {partners.map((partner) => (
              <SwiperSlide key={partner.id}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-lg shadow-md p-8 h-32 flex items-center justify-center cursor-pointer"
                >
                  {partner.logo ? (
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={150}
                      height={60}
                      className="object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  ) : (
                    <h3 className="text-gray-800 font-semibold text-center">
                      {partner.name}
                    </h3>
                  )}
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-6">
            Interested in partnering with us?
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 border-2 border-blue-600 text-blue-600 font-medium rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"
          >
            Become a Partner
          </a>
        </motion.div>
      </div>

      <style jsx global>{`
        .partner-carousel .swiper-pagination-bullet {
          background-color: #e5e7eb;
          opacity: 1;
        }
        .partner-carousel .swiper-pagination-bullet-active {
          background-color: #3b82f6;
        }
      `}</style>
    </section>
  );
};

export default PartnerCarousel;