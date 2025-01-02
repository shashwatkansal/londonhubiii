"use client";
import React from "react";
import {
    FaFacebookF,
    FaTwitter,
    FaLinkedinIn,
    FaInstagram,
    FaEnvelope,
    FaMapMarkerAlt,
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-16">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Logo and Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                    >
                        <div className="flex space-x-4">
                            <Image
                                src="/assets/images/gs_white_logo.png"
                                alt="Global Shapers Logo"
                                width={80}
                                height={80}
                                className="w-20 h-auto"
                            />
                            <Image
                                src="/assets/images/wef_logo.png"
                                alt="World Economic Forum Logo"
                                width={80}
                                height={80}
                                className="w-20 h-auto"
                            />
                        </div>
                        <h3 className="text-2xl font-bold">London Hub III</h3>
                        <p className="text-sm text-gray-300">
                            An initiative of the World Economic Forum, the
                            Global Shapers Community is a network of young
                            people driving dialogue, action, and change.
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-4"
                    >
                        <h4 className="text-xl font-semibold">Quick Links</h4>
                        <ul className="space-y-2">
                            {[
                                "Home",
                                "Shapers",
                                "Our Impact",
                                "FAQs",
                                "Join Us",
                            ].map((item) => (
                                <li key={item}>
                                    <Link
                                        href={
                                            item === "Home"
                                                ? "/"
                                                : `/${item
                                                      .toLowerCase()
                                                      .replace(" ", "-")}`
                                        }
                                        className="hover:text-blue-300 transition-colors duration-300"
                                    >
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h4 className="text-xl font-semibold">Contact Us</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <FaEnvelope className="mr-2" />
                                <a
                                    href="mailto:londonshapersiii@gmail.com"
                                    className="hover:text-blue-300 transition-colors duration-300"
                                >
                                    londonshapersiii@gmail.com
                                </a>
                            </li>
                            <li className="flex items-center">
                                <FaMapMarkerAlt className="mr-2" />
                                <span>London, United Kingdom</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Social Media and Newsletter */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="space-y-4"
                    >
                        <h4 className="text-xl font-semibold">
                            Connect With Us
                        </h4>
                        <div className="flex space-x-4">
                            {[
                                {
                                    icon: FaFacebookF,
                                    href: "https://www.facebook.com/londonshapersIII",
                                },
                                {
                                    icon: FaTwitter,
                                    href: "https://twitter.com/globalshapers",
                                },
                                {
                                    icon: FaLinkedinIn,
                                    href: "https://www.linkedin.com/company/86249324",
                                },
                                {
                                    icon: FaInstagram,
                                    href: "https://www.instagram.com/londonshapersiii/",
                                },
                            ].map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-800 p-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                        <form className="mt-4">
                            <label htmlFor="newsletter" className="sr-only">
                                Subscribe to our newsletter
                            </label>
                            <div className="flex">
                                <input
                                    type="email"
                                    id="newsletter"
                                    placeholder="Enter your email"
                                    className="px-4 py-2 w-full rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-600 px-4 py-2 rounded-r-md hover:bg-blue-700 transition-colors duration-300"
                                >
                                    Subscribe
                                </button>
                            </div>
                        </form>
                    </motion.div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-12 pt-8 border-t border-blue-800 text-center">
                    <p className="text-sm text-gray-400">
                        © {currentYear} Global Shapers Community. All rights
                        reserved.
                    </p>
                    <p className="text-sm mt-2 text-gray-400">
                        Built by{" "}
                        <a
                            href="https://www.linkedin.com/in/shashwatkansal/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-300 hover:text-blue-200 transition-colors duration-300"
                        >
                            Shashwat Kansal
                        </a>
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
