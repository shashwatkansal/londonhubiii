import React, { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  animation?: "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "scale" | "parallax";
  delay?: number;
  duration?: number;
  stagger?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  className = "",
  animation = "fadeIn",
  delay = 0,
  duration = 0.8,
  stagger = 0.1,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const animations = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
    },
    slideUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
    },
    slideLeft: {
      initial: { opacity: 0, x: 50 },
      animate: { opacity: 1, x: 0 },
    },
    slideRight: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
    },
    parallax: {
      initial: {},
      animate: {},
    },
  };

  if (animation === "parallax") {
    return (
      <motion.div
        ref={ref}
        style={{ y: parallaxY, opacity }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  const { initial, animate } = animations[animation];

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? animate : initial}
      transition={{
        duration,
        delay,
        ease: "easeOut",
      }}
      className={className}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && stagger > 0) {
          return (
            <motion.div
              initial={initial}
              animate={isInView ? animate : initial}
              transition={{
                duration,
                delay: delay + index * stagger,
                ease: "easeOut",
              }}
            >
              {child}
            </motion.div>
          );
        }
        return child;
      })}
    </motion.div>
  );
};

export default AnimatedSection;