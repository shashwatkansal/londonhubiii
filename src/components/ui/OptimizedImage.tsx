import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';
import { motion } from 'framer-motion';

interface OptimizedImageProps extends Omit<ImageProps, 'onLoad' | 'onError'> {
  fallbackSrc?: string;
  aspectRatio?: string;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  priority?: boolean;
  quality?: number;
  blur?: boolean;
  blurDataURL?: string;
}

const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#f0f0f0" offset="20%" />
      <stop stop-color="#e0e0e0" offset="50%" />
      <stop stop-color="#f0f0f0" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#f0f0f0" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc = '/assets/images/placeholder.jpg',
  aspectRatio,
  objectFit = 'cover',
  priority = false,
  quality = 75,
  blur = true,
  blurDataURL,
  className = '',
  ...props
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    if (fallbackSrc && imgSrc !== fallbackSrc) {
      setImgSrc(fallbackSrc);
    }
  };

  const defaultBlurDataURL = `data:image/svg+xml;base64,${toBase64(
    shimmer(700, 475)
  )}`;

  const imageClasses = `
    ${className}
    ${isLoading ? 'animate-pulse' : ''}
    transition-all duration-300 ease-in-out
  `.trim();

  return (
    <div 
      className={`relative overflow-hidden ${aspectRatio ? '' : 'w-full h-full'}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0.5 : 1 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0"
      >
        <Image
          {...props}
          src={imgSrc}
          alt={alt}
          className={imageClasses}
          style={{ objectFit }}
          onLoad={handleLoad}
          onError={handleError}
          priority={priority}
          quality={quality}
          placeholder={blur ? 'blur' : 'empty'}
          blurDataURL={blur ? (blurDataURL || defaultBlurDataURL) : undefined}
        />
      </motion.div>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
        </div>
      )}
      
      {hasError && imgSrc === fallbackSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <svg
              className="w-12 h-12 mx-auto text-gray-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm text-gray-500">Image unavailable</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;