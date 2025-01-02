"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { auth, db } from "@lib/firebaseConfig";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [feedbackOpen, setFeedbackOpen] = useState(false);
    const [feedbackText, setFeedbackText] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setDropdownOpen(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            unsubscribe();
            window.removeEventListener("scroll", handleScroll);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSignOut = async () => {
        await signOut(auth);
        setUser(null);
        setDropdownOpen(false);
    };

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
            setFeedbackText("");
            setFeedbackOpen(false);
            toast.success("Feedback submitted successfully!");
        } catch (error) {
            console.error("Error submitting feedback: ", error);
            toast.error("Failed to submit feedback. Please try again.");
        }
    };

    const getUserInitials = (user) => {
        if (user.displayName) {
            return user.displayName
                .split(" ")
                .map((name) => name[0])
                .join("")
                .toUpperCase();
        }
        return user.email[0].toUpperCase();
    };

    return (
        <>
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    isScrolled ? "bg-wef-gradient shadow-lg" : "bg-transparent"
                }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <Link href="/">
                            <Image
                                src="/assets/images/gs_white_logo.png"
                                alt="Global Shapers Logo"
                                width={60}
                                height={40}
                                className="w-16 h-auto"
                            />
                        </Link>
                        <div className="text-xl md:text-2xl lg:text-3xl font-bold text-white">
                            London Hub III
                        </div>
                    </div>

                    <nav className="hidden md:flex space-x-6">
                        {[
                            "Home",
                            "Shapers",
                            "Our Impact",
                            "Join Us",
                            "FAQs",
                        ].map((item) => (
                            <Link
                                key={item}
                                href={
                                    item === "Home"
                                        ? "/"
                                        : `/${item
                                              .toLowerCase()
                                              .replace(" ", "-")}`
                                }
                                className="text-white hover:text-wef-light-blue transition-colors duration-200"
                            >
                                {item}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-4">
                        {user && (
                            <button
                                onClick={() => setFeedbackOpen(true)}
                                className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm hover:bg-yellow-400 transition-colors duration-200"
                            >
                                Provide Feedback
                            </button>
                        )}
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() =>
                                        setDropdownOpen(!dropdownOpen)
                                    }
                                    className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center cursor-pointer overflow-hidden"
                                >
                                    {user.photoURL && !imageError ? (
                                        <Image
                                            src={user.photoURL}
                                            alt={user.displayName || user.email}
                                            width={40}
                                            height={40}
                                            className="rounded-full"
                                            onError={() => setImageError(true)}
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                                            {getUserInitials(user)}
                                        </div>
                                    )}
                                </button>
                                <AnimatePresence>
                                    {dropdownOpen && (
                                        <motion.div
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
                                        >
                                            <div className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                                                Signed in as
                                                <br />
                                                <strong>{user.email}</strong>
                                            </div>
                                            <Link
                                                href="/hub/dashboard"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Dashboard
                                            </Link>
                                            <button
                                                onClick={handleSignOut}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                            >
                                                Sign Out
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link href="/signin">
                                <button className="bg-white text-wef-dark-blue px-4 py-2 rounded-full hover:bg-wef-light-blue transition-colors duration-200">
                                    Sign In
                                </button>
                            </Link>
                        )}
                        <button
                            className="md:hidden text-white"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            {menuOpen ? (
                                <FaTimes size={24} />
                            ) : (
                                <FaBars size={24} />
                            )}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden bg-wef-gradient"
                        >
                            <nav className="flex flex-col space-y-2 px-6 py-4">
                                {[
                                    "Home",
                                    "Shapers",
                                    "Our Impact",
                                    "Join Us",
                                    "FAQs",
                                ].map((item) => (
                                    <Link
                                        key={item}
                                        href={
                                            item === "Home"
                                                ? "/"
                                                : `/${item
                                                      .toLowerCase()
                                                      .replace(" ", "-")}`
                                        }
                                        className="text-white hover:text-wef-light-blue transition-colors duration-200"
                                        onClick={() => setMenuOpen(false)}
                                    >
                                        {item}
                                    </Link>
                                ))}
                                {user && (
                                    <>
                                        <Link
                                            href="/hub/dashboard"
                                            className="text-white hover:text-wef-light-blue transition-colors duration-200"
                                            onClick={() => setMenuOpen(false)}
                                        >
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={handleSignOut}
                                            className="text-white hover:text-wef-light-blue transition-colors duration-200 text-left"
                                        >
                                            Sign Out
                                        </button>
                                    </>
                                )}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.header>

            <AnimatePresence>
                {feedbackOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
                        >
                            <h2 className="text-xl font-bold mb-4">
                                Submit Feedback
                            </h2>
                            <textarea
                                className="w-full h-32 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={feedbackText}
                                onChange={(e) =>
                                    setFeedbackText(e.target.value)
                                }
                                placeholder="Enter your feedback here..."
                            />
                            <div className="mt-4 flex justify-end space-x-4">
                                <button
                                    className="px-4 py-2 rounded text-gray-600 hover:bg-gray-100 transition-colors duration-200"
                                    onClick={() => setFeedbackOpen(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200"
                                    onClick={handleFeedbackSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
