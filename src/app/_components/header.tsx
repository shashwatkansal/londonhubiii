"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-wef-gradient text-white shadow-lg">
      <div className="container mx-auto px-4 md:px-6 py-4 flex flex-wrap justify-between items-center">
        {/* Logo and WEF Initiative */}
        <div className="flex items-center space-x-4 flex-1">
          {/* Global Shapers Logo */}
          <Link href="/">
            <Image
              src="/assets/images/gs_white_logo.png" // Replace with your logo path
              alt="Global Shapers Logo"
              width={60} // Adjust the size for medium screens
              height={40} // Adjust the size for medium screens
              className="w-12 h-auto"
            />
          </Link>

          {/* London Hub III Text */}
          <div className="text-xl md:text-2xl lg:text-3xl font-bold whitespace-nowrap">
            London Hub III
          </div>

          {/* WEF Initiative */}
          <div className="hidden md:flex items-center space-x-2 flex-shrink-0">
            <span className="text-xs md:text-sm">Initiative of the</span>
            <Image
              src="/assets/images/wef_logo.png" // Replace with WEF logo path
              alt="World Economic Forum Logo"
              width={80} // Adjust the size for medium screens
              height={25} // Adjust the size for medium screens
              className="h-auto"
            />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-4 lg:space-x-6 lg:pr-8">
          <Link href="/" className="hover:text-wef-light-blue">
            Home
          </Link>
          <Link href="/about" className="hover:text-wef-light-blue">
            About
          </Link>
          <Link href="/hubs" className="hover:text-wef-light-blue">
            Hubs
          </Link>
          <Link href="/shapers" className="hover:text-wef-light-blue">
            Shapers
          </Link>
          <Link href="/impact" className="hover:text-wef-light-blue">
            Our Impact
          </Link>
          <Link href="/insights" className="hover:text-wef-light-blue">
            Insights
          </Link>
          <Link href="/partners" className="hover:text-wef-light-blue">
            Our Partners
          </Link>
        </nav>

        {/* Sign In Button */}
        <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
          <Link href="/signin">
            <button className="btn btn-outline btn-sm border-white text-white hover:bg-wef-light-blue hover:text-wef-dark-blue">
              Sign In
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <div className="md:hidden bg-wef-gradient text-white">
          <nav className="flex flex-col space-y-2 px-6 py-4">
            <Link href="/" className="hover:text-wef-light-blue">
              Home
            </Link>
            <Link href="/about" className="hover:text-wef-light-blue">
              About
            </Link>
            <Link href="/shapers" className="hover:text-wef-light-blue">
              Shapers
            </Link>
            <Link href="/impact" className="hover:text-wef-light-blue">
              Our Impact
            </Link>
            <Link href="/partners" className="hover:text-wef-light-blue">
              Our Partners
            </Link>
            <Link
              href="/signin"
              className="btn btn-outline btn-sm border-white text-white hover:bg-wef-light-blue hover:text-wef-dark-blue mt-4"
            >
              Sign In
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
