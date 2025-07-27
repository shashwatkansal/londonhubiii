"use client";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex items-center justify-center h-screen bg-gradient-to-br from-primary to-secondary overflow-hidden">
      {/* Subtle animated gradient overlay */}
      <div className="absolute inset-0 bg-base-100 opacity-10 animate-pulse"></div>

      {/* Floating blurred spheres */}
      <div className="absolute -top-16 -left-16 w-48 h-48 bg-secondary opacity-20 rounded-full filter blur-3xl animate-spin-slow"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent opacity-20 rounded-full filter blur-2xl animate-ping"></div>

      <div className="relative z-10 flex flex-col items-center justify-center p-8 bg-base-100 bg-opacity-30 backdrop-blur-lg rounded-2xl shadow-2xl max-w-md text-center">
        <Image
          src="/assets/404-illustration.svg"
          alt="Page not found illustration"
          width={300}
          height={225}
          className="mb-6"
        />

        <h1 className="text-5xl font-serif font-bold text-wef-dark-blue mb-2">
          404
        </h1>
        <p className="text-2xl font-sans text-wef-gray mb-4">Page Not Found</p>
        <p className="text-base text-wef-dark-gray mb-6 max-w-xs">
          Oops! The page you’re looking for doesn’t exist. Let’s get you back
          on track.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center space-x-2 btn btn-primary px-6 py-3 text-lg font-medium transition-transform hover:scale-105"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
}
