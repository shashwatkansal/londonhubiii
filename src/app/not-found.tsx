// app/not-found.tsx
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4">
      {/* Fun 404 Image or Animation */}
      <Image
        src="/assets/404-illustration.svg" // Replace with your own image/illustration
        alt="Page not found illustration"
        width={400}
        height={300}
        className="mb-8"
      />

      {/* Title */}
      <h1 className="text-6xl font-extrabold mb-4 animate-pulse">
        404 - Page Not Found
      </h1>

      {/* Descriptive Text */}
      <p className="text-lg text-center max-w-lg mb-8">
        Oops! It seems like the page you're looking for doesn't exist. Don't
        worry, you can find plenty of exciting things on our homepage!
      </p>

      {/* Home Button */}
      <Link href="/">
        <button className="bg-white text-blue-600 px-6 py-3 rounded-full shadow-lg hover:bg-gray-100 hover:scale-105 transition-transform duration-300 flex items-center space-x-2">
          <FaArrowLeft />
          <span>Go back to Home</span>
        </button>
      </Link>

      {/* Decorative Animated Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-yellow-400 opacity-50 rounded-full filter blur-xl animate-bounce"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-400 opacity-50 rounded-full filter blur-xl animate-bounce animation-delay-200"></div>
    </div>
  );
}
