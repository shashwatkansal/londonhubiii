"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { auth } from "@lib/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "@lib/firebaseConfig"; // Firestore
import { collection, addDoc } from "firebase/firestore"; // Firestore methods
import toast from "react-hot-toast";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false); // For feedback modal
  const [feedbackText, setFeedbackText] = useState(""); // For feedback text

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

  // Function to handle feedback submission
  const handleFeedbackSubmit = async () => {
    if (!feedbackText.trim()) {
      toast.error("Feedback cannot be empty.");
      return;
    }

    try {
      await addDoc(collection(db, "user_feedback"), {
        feedback: feedbackText,
        user: user ? user.email : "Anonymous",
        createdAt: new Date(),
      });
      setFeedbackText(""); // Clear feedback form
      setFeedbackOpen(false); // Close modal after submission
      toast.success("Feedback submitted successfully!");
    } catch (error) {
      console.log("Error submitting feedback: ", error);
      toast.error("Failed to submit feedback. Please try again.");
    }
  };

  return (
    <>
      {/* Existing Header and Banner */}
      {user && (
        <div className="">
          <div className="bg-yellow-500 text-black text-center py-2 flex justify-center items-center mx-auto space-x-4 px-4">
            <p className="">
              🚧 This website is currently under development. Some features may
              not be fully functional. 🚧
            </p>
            <div>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => setFeedbackOpen(true)} // Open feedback modal
              >
                Provide Feedback
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="bg-wef-gradient text-white shadow-lg py-4">
        <div className="container mx-auto px-4 md:px-6 py-4 flex flex-wrap justify-between items-center">
          {/* Logo and WEF Initiative */}
          <div className="flex items-center space-x-4 flex-1">
            <Link href="/">
              <Image
                src="/assets/images/gs_white_logo.png"
                alt="Global Shapers Logo"
                width={60}
                height={40}
                className="w-16 h-auto"
              />
            </Link>

            <div className="text-xl md:text-2xl lg:text-3xl font-bold whitespace-nowrap">
              London Hub III
            </div>

            <div className="hidden md:flex items-center space-x-2 flex-shrink-0">
              <span className="text-xs md:text-sm">Initiative of the</span>
              <Image
                src="/assets/images/wef_logo.png"
                alt="World Economic Forum Logo"
                width={80}
                height={50}
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
            <Link href="/shapers" className="hover:text-wef-light-blue">
              Shapers
            </Link>
            <Link href="/impact" className="hover:text-wef-light-blue">
              Our Impact
            </Link>
            <Link href="/#join-us" className="hover:text-wef-light-blue">
              Join Us
            </Link>
            <Link href="/faqs" className="hover:text-wef-light-blue">
              FAQs
            </Link>
          </nav>

          {/* User Profile / Sign In Button */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0 z-20">
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
                  className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-3 bg-wef-gradient"
                >
                  <li>
                    <p className="hover:cursor-default">
                      Signed in
                      {user.displayName
                        ? ` as ${user.displayName}`
                        : ` with ${user.email}`}
                    </p>
                  </li>
                  <hr className="my-2" />
                  <li>
                    <Link href="/hub/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <button
                      onClick={handleSignOut}
                      className="text-red-400 font-bold"
                    >
                      Sign Out
                    </button>
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
              <Link href="/shapers" className="hover:text-wef-light-blue">
                Shapers
              </Link>
              <Link href="/impact" className="hover:text-wef-light-blue">
                Our Impact
              </Link>
              <Link href="/#join-us" className="hover:text-wef-light-blue">
                Join Us
              </Link>
              <Link href="/faqs" className="hover:text-wef-light-blue">
                FAQs
              </Link>
              {user ? (
                <div className="z-20">
                  <p>
                    Signed in
                    {user.displayName
                      ? ` as ${user.displayName}`
                      : ` with ${user.email}`}
                  </p>
                  <hr className="border-white" />
                  <Link
                    href="/hub/dashboard"
                    className="hover:text-wef-light-blue"
                  >
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

      {/* Feedback Modal */}
      {feedbackOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Submit Feedback</h2>
            <textarea
              className="w-full h-32 p-2 border border-gray-300 rounded"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Enter your feedback here..."
            />
            <div className="mt-4 flex justify-end space-x-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setFeedbackOpen(false)} // Close modal
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleFeedbackSubmit} // Submit feedback
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
