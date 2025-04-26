'use client';

import { useHub } from '@/features/hub/HubProvider';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebaseConfig';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { FaGlobe, FaLandmark, FaHandsHelping, FaHeartbeat, FaBolt, FaUsers } from 'react-icons/fa';

export default function HomePage() {
  const { hub } = useHub();
  const [email, setEmail] = useState('');
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  const iconMap = {
    globe: FaGlobe,
    landmark: FaLandmark,
    'hands-helping': FaHandsHelping,
    heartbeat: FaHeartbeat,
    bolt: FaBolt,
    users: FaUsers,
  };

  const iconBgMap = {
    globe: 'bg-green-500',
    landmark: 'bg-blue-400',
    'hands-helping': 'bg-orange-400',
    heartbeat: 'bg-red-400',
    bolt: 'bg-yellow-400',
    users: 'bg-purple-500',
  };

  const getIcon = (iconName: string) => {
    const Icon = iconMap[iconName as keyof typeof iconMap];
    if (!Icon) return null;
    return <Icon className="w-10 h-10 text-white" />;
  };

  const handleSubscribe = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subscribeToast = toast.loading('Subscribing...');

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email.', { id: subscribeToast });
      return;
    }

    try {
      await setDoc(
        doc(db, 'subscribers', email),
        {
          email: email,
          timestamp: new Date(),
        },
        { merge: true }
      );
      toast.success('Thank you for subscribing!', { id: subscribeToast });
      setEmail('');
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Failed to subscribe. Please try again.', {
        id: subscribeToast,
      });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {hub.theme.heroImage && (
          <motion.div className="absolute inset-0" style={{ opacity }}>
            <Image
              src={hub.theme.heroImage}
              alt={`${hub.name} Hero`}
              fill
              className="object-cover opacity-60"
              priority
            />
          </motion.div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
            <span className="block">Change Begins</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              With You
            </span>
          </h1>
          <p className="text-2xl md:text-4xl text-white tracking-wide font-light mb-12">
            {hub.description}
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <Link href="#mission" passHref>
              <button
                className="px-8 py-4 bg-white text-blue-900 font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
                aria-label="Explore Our Mission"
              >
                Explore Our Mission
              </button>
            </Link>
            <Link href="#join-us">
              <button
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300 text-lg"
                aria-label="Join Us"
              >
                Join Us
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section
        id="mission"
        className="relative py-32 bg-gray-900 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-transparent to-blue-900/80"></div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8">
            Our Mission in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              {hub.location}
            </span>
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto mb-12">
            {hub.description}
          </p>
          <div className="flex justify-center">
            <Link href="/our-impact">
              <button className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                Learn More About Our Projects
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Impact Areas Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4 text-center">Our Six Impact Areas</h2>
          <p className="text-lg md:text-xl text-blue-100 mb-12 text-center max-w-3xl mx-auto">
            Global Shapers are dedicated to creating positive change across the world through six key impact areas.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {hub.features.impactAreas.map((area, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white/5 border border-white/10 shadow-xl p-8 flex flex-col items-center text-center backdrop-blur-md hover:scale-105 transition-transform duration-300"
              >
                <div className={`mb-6 w-16 h-16 flex items-center justify-center rounded-full shadow-lg ${iconBgMap[area.icon as keyof typeof iconBgMap]}`}>
                  {getIcon(area.icon)}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{area.title}</h3>
                <p className="text-blue-100 text-base md:text-lg font-normal">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-32 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/patterns/circuit.svg')] opacity-5"></div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          className="max-w-6xl mx-auto px-4 relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <h2 className="text-5xl font-bold mb-8">Stay Connected</h2>
              <p className="text-xl text-gray-200 mb-8">
                Subscribe to our newsletter to receive the latest updates about
                our projects, events, and opportunities to get involved.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                    required
                    autoComplete="email"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-white text-blue-900 font-bold rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Subscribe to Newsletter
                </button>
              </form>
            </div>
            <div className="relative lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/images/newsletter.png"
                alt="Newsletter Preview"
                fill
                className="object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <section
        id="join-us"
        className="py-32 bg-gradient-to-b from-blue-800 to-blue-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/assets/patterns/grid.svg')] opacity-5"></div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          className="max-w-6xl mx-auto px-4 text-center relative z-10"
        >
          <h2 className="text-6xl md:text-7xl font-extrabold text-white mb-8">
            Ready to Make an Impact?
          </h2>
          <p className="text-2xl text-gray-200 mb-12 max-w-4xl mx-auto">
            Join the Global Shapers community today and help us build a better
            future.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() =>
                toast.error(
                  'Unfortunately, the applications have closed for this year. Do stay tuned for our next recruitment round!',
                  {
                    duration: 5000,
                    style: {
                      background: '#333',
                      color: '#fff',
                    },
                  }
                )
              }
              className="px-10 py-5 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              aria-label="Become a Shaper"
            >
              Become a Shaper
            </button>
            <Link href={hub.features.transferFormUrl} target="_blank">
              <button
                className="px-10 py-5 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                aria-label="Transfer to Hub"
              >
                Transfer to {hub.location}
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
} 