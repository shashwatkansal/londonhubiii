"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { auth } from "@lib/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <header className="bg-wef-gradient text-white shadow-lg py-4">
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
              className="w-16 h-auto"
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
              height={50} // Adjust the size for medium screens
              className="h-auto w-24"
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
        <nav className="hidden md:flex space-x-4 xl:space-x-6 lg:pr-8">
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
          <Link href="/partners" className="hover:text-wef-light-blue">
            Our Partners
          </Link>
        </nav>

        {/* User Profile / Sign In Button */}
        <div className="hidden md:flex items-center space-x-4 flex-shrink-0">
          {user ? (
            <div className="dropdown dropdown-end">
              <label
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar cursor-pointer"
              >
                <div className="w-10 rounded-full">
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt="Profile"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="bg-gray-700 text-white w-10 h-10 flex items-center justify-center rounded-full">
                      {user.displayName
                        ? user.displayName.charAt(0).toUpperCase()
                        : user.email.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              </label>
              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-3"
              >
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleSignOut}>Sign Out</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link href="/signin">
              <button className="btn btn-outline btn-sm border-white text-white hover:opacity-80">
                Sign In
              </button>
            </Link>
          )}
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
            {user ? (
              <div className="z-20">
                <Link href="/dashboard" className="hover:text-wef-light-blue">
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="btn btn-outline btn-sm border-white text-white hover:bg-wef-light-blue hover:text-wef-dark-blue mt-4"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/signin"
                className="btn btn-outline btn-sm border-white text-white hover:bg-wef-light-blue hover:text-wef-dark-blue mt-4 z-20"
              >
                Sign In
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
