"use client";
import { useEffect, useState } from "react";
import { getSiteSetting } from "@/lib/siteSettings";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiHome, FiSearch, FiArrowLeft, FiMail } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { HUB_CONFIG } from "@/lib/settings";

export default function NotFound() {
  const [lostMessage, setLostMessage] = useState("");
  const [quote, setQuote] = useState("");
  const [helpfulLinks, setHelpfulLinks] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    async function loadData() {
      const message = await getSiteSetting("error_404_text");
      const quoteText = await getSiteSetting("error_404_quote");
      const links = await getSiteSetting("error_404_links");

      setLostMessage(message || "Oops! The page you're looking for doesn't exist.");
      setQuote(quoteText || "Not all those who wander are lost. - J.R.R. Tolkien");
      setHelpfulLinks(links ? links.split(",") : ["/", "/about", "/our-impact", "/shapers"]);
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 text-gray-800 px-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        {/* Animated 404 */}
        <motion.div
          animate={{ 
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.05, 1, 1.05, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="relative"
        >
          <h1 className="text-[150px] md:text-[200px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 leading-none">
            404
          </h1>
          <motion.div
            className="absolute inset-0 blur-3xl opacity-30"
            animate={{ 
              background: [
                "radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(147, 51, 234, 0.5) 0%, transparent 70%)",
                "radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)",
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </motion.div>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-2xl md:text-3xl mb-4 font-semibold text-gray-800"
        >
          {lostMessage}
        </motion.p>
        
        <motion.p 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg text-gray-600 mb-8 italic max-w-md mx-auto"
        >
          &ldquo;{quote}&rdquo;
        </motion.p>

        {/* Action buttons */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
        >
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            <FiArrowLeft className="w-5 h-5" />
            Go Back
          </button>
          
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            <FiHome className="w-5 h-5" />
            Go Home
          </Link>
        </motion.div>

        {/* Helpful links */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-4"
        >
          <p className="text-gray-700 font-medium">You might be looking for:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {helpfulLinks.map((link, index) => {
              const linkNames: Record<string, string> = {
                '/': 'Home',
                '/about': 'About Us',
                '/our-impact': 'Our Impact',
                '/shapers': 'Our Shapers',
              };
              
              return (
                <Link
                  key={index}
                  href={link}
                  className="group relative px-4 py-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
                >
                  <span className="text-gray-700 group-hover:text-blue-600 transition-colors">
                    {linkNames[link] || link.replace('/', '').charAt(0).toUpperCase() + link.slice(2)}
                  </span>
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                </Link>
              );
            })}
          </div>
        </motion.div>

        {/* Contact support */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-gray-600"
        >
          <p className="flex items-center justify-center gap-2 mb-2">
            <FiSearch className="w-4 h-4" />
            Can&apos;t find what you&apos;re looking for?
          </p>
          <a
            href={`mailto:${HUB_CONFIG.EMAIL_ADDRESS}?subject=404 Page Not Found`}
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <FiMail className="w-4 h-4" />
            Contact Support
          </a>
        </motion.div>
      </motion.div>

      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>
    </div>
  );
}