import React from "react";
import { motion } from "framer-motion";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  variant?: "default" | "dark" | "gradient" | "light";
  pattern?: boolean;
  wave?: boolean;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}

const Section: React.FC<SectionProps> = ({
  id,
  title,
  subtitle,
  description,
  variant = "default",
  pattern = false,
  wave = false,
  children,
  className = "",
  containerClassName = "",
}) => {
  const variantClasses = {
    default: "bg-white text-gray-900",
    dark: "bg-gray-900 text-white",
    gradient: "bg-gradient-to-b from-blue-900 via-indigo-900 to-blue-900 text-white",
    light: "bg-gradient-to-b from-white via-blue-50 to-white text-gray-900",
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id={id}
      className={`relative py-24 md:py-32 overflow-hidden ${variantClasses[variant]} ${className}`}
    >
      {/* Background Pattern */}
      {pattern && (
        <div className="absolute inset-0 bg-[url('/assets/patterns/circuit.svg')] opacity-5"></div>
      )}

      {/* Floating Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 -mt-48 -ml-48 filter blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full opacity-10 -mb-48 -mr-48 filter blur-3xl"></div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUpVariants}
        transition={{ duration: 0.8 }}
        className={`relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${containerClassName}`}
      >
        {/* Section Header */}
        {(title || subtitle || description) && (
          <div className="text-center mb-12 md:mb-16">
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className={`text-sm md:text-base font-semibold tracking-wider uppercase mb-2 ${
                  variant === "dark" || variant === "gradient"
                    ? "text-blue-400"
                    : "text-blue-600"
                }`}
              >
                {subtitle}
              </motion.p>
            )}
            
            {title && (
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
                  variant === "dark" || variant === "gradient"
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                {title}
              </motion.h2>
            )}
            
            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`text-lg md:text-xl max-w-4xl mx-auto ${
                  variant === "dark" || variant === "gradient"
                    ? "text-gray-300"
                    : "text-gray-600"
                }`}
              >
                {description}
              </motion.p>
            )}
          </div>
        )}

        {/* Section Content */}
        {children}
      </motion.div>

      {/* Wave SVG */}
      {wave && (
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill={
                variant === "dark" || variant === "gradient"
                  ? "rgba(30, 58, 138, 1)"
                  : "rgba(37, 99, 235, 1)"
              }
            />
          </svg>
        </div>
      )}
    </section>
  );
};

export default Section;