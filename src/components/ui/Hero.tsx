import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ReactTyped } from "react-typed";
import { MdKeyboardArrowDown } from "react-icons/md";

interface HeroProps {
  title: string | React.ReactNode;
  subtitle: string | React.ReactNode;
  typedStrings: string[];
  backgroundImage: string;
  primaryButton?: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  secondaryButton?: {
    text: string;
    href: string;
    onClick?: () => void;
  };
  showScrollIndicator?: boolean;
  overlay?: "dark" | "light" | "gradient";
}

const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  typedStrings,
  backgroundImage,
  primaryButton,
  secondaryButton,
  showScrollIndicator = true,
  overlay = "gradient",
}) => {
  const overlayClasses = {
    dark: "bg-black/70",
    light: "bg-white/70",
    gradient: "bg-gradient-to-b from-black/70 via-black/50 to-transparent",
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <Image
          src={backgroundImage}
          alt="Hero Background"
          fill
          style={{ objectFit: "cover" }}
          className="opacity-80"
          priority
        />
      </motion.div>

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClasses[overlay]}`}></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        className="relative z-10 text-center px-4 max-w-6xl mx-auto"
      >
        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="block">{title}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
            {subtitle}
          </span>
        </motion.h1>

        <ReactTyped
          strings={typedStrings}
          typeSpeed={50}
          backSpeed={30}
          loop
          backDelay={1500}
          className="text-xl md:text-3xl lg:text-4xl text-white/90 tracking-wide font-light mb-12 block"
        />

        {/* CTA Buttons */}
        {(primaryButton || secondaryButton) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {primaryButton && (
              <Link 
                href={primaryButton.href}
                onClick={primaryButton.onClick}
                className="group relative inline-block px-8 py-4 bg-white text-blue-900 font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                aria-label={primaryButton.text}
              >
                <span className="relative z-10">{primaryButton.text}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              </Link>
            )}
            {secondaryButton && (
              <Link 
                href={secondaryButton.href}
                onClick={secondaryButton.onClick}
                className="group inline-block px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300"
                aria-label={secondaryButton.text}
              >
                {secondaryButton.text}
              </Link>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 w-20 h-20 bg-blue-500/30 rounded-full blur-2xl"
      />
      <motion.div
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-10 w-32 h-32 bg-purple-500/30 rounded-full blur-2xl"
      />

      {/* Scroll Indicator */}
      {showScrollIndicator && (
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        >
          <MdKeyboardArrowDown className="text-white text-5xl animate-bounce" />
        </motion.div>
      )}

      {/* Wave SVG */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="rgba(26, 32, 44, 0.8)"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;