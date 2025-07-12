import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  title?: string;
  subtitle?: string;
  description?: string;
  icon?: React.ReactNode;
  stat?: string | number;
  variant?: "default" | "gradient" | "glass" | "outline";
  hover?: boolean;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  description,
  icon,
  stat,
  variant = "default",
  hover = true,
  className = "",
  children,
  onClick,
}) => {
  const baseClasses = "relative rounded-2xl p-8 transition-all duration-300";
  
  const variantClasses = {
    default: "bg-white shadow-lg hover:shadow-xl",
    gradient: "bg-gradient-to-br from-blue-800 to-indigo-800 text-white shadow-lg hover:shadow-2xl",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg",
    outline: "bg-transparent border-2 border-gray-200 hover:border-blue-500",
  };

  const hoverClasses = hover ? "transform hover:scale-105 hover:-translate-y-1" : "";

  return (
    <motion.div
      whileHover={hover ? { scale: 1.05 } : {}}
      whileTap={onClick ? { scale: 0.98 } : {}}
      className={`${baseClasses} ${variantClasses[variant]} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {variant === "gradient" && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-400 to-purple-400 opacity-10"></div>
      )}
      
      <div className="relative z-10">
        {icon && (
          <div className="mb-6 flex justify-center">
            {typeof icon === "string" ? (
              <span className="text-5xl">{icon}</span>
            ) : (
              icon
            )}
          </div>
        )}
        
        {stat && (
          <div className="text-5xl md:text-6xl font-bold text-center mb-4">
            {variant === "gradient" ? (
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                {stat}
              </span>
            ) : (
              <span className="text-blue-600">{stat}</span>
            )}
          </div>
        )}
        
        {title && (
          <h3 className={`text-2xl font-bold mb-2 text-center ${
            variant === "gradient" || variant === "glass" ? "text-white" : "text-gray-900"
          }`}>
            {title}
          </h3>
        )}
        
        {subtitle && (
          <p className={`text-lg mb-4 text-center ${
            variant === "gradient" || variant === "glass" ? "text-white/80" : "text-gray-600"
          }`}>
            {subtitle}
          </p>
        )}
        
        {description && (
          <p className={`text-center ${
            variant === "gradient" || variant === "glass" ? "text-white/70" : "text-gray-600"
          }`}>
            {description}
          </p>
        )}
        
        {children}
      </div>
    </motion.div>
  );
};

export default Card;