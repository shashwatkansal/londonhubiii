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
import * as SETTINGS from "@/lib/settings";
import { TEXTS } from "@/lib/texts";

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
                                src={SETTINGS.HUB_CONFIG.LOGO_MAIN}
                                alt="Main Logo"
                                width={80}
                                height={80}
                                className="w-20 h-auto"
                            />
                            <Image
                                src={SETTINGS.HUB_CONFIG.LOGO_SECONDARY}
                                alt="Secondary Logo"
                                width={80}
                                height={80}
                                className="w-20 h-auto"
                            />
                        </div>
                        <h3 className="text-2xl font-bold">{SETTINGS.HUB_CONFIG.HUB_NAME}</h3>
                        <p className="text-sm text-gray-300">
                            {TEXTS.footer.description}
                        </p>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="space-y-4"
                    >
                        <h4 className="text-xl font-semibold">{TEXTS.footer.contactHeading}</h4>
                        <ul className="space-y-2">
                            <li className="flex items-center">
                                <a
                                    href={`mailto:${SETTINGS.HUB_CONFIG.EMAIL_ADDRESS}`}
                                    className="hover:text-blue-300 transition-colors duration-300"
                                >
                                    <FaEnvelope className="inline-block mr-2" />
                                    {SETTINGS.HUB_CONFIG.EMAIL_ADDRESS}
                                </a>
                            </li>
                            <li className="flex items-center">
                                <FaMapMarkerAlt className="mr-2" />
                                <span>{SETTINGS.HUB_CONFIG.CITY_NAME}{TEXTS.footer.locationSuffix}</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h4 className="text-xl font-semibold">Quick Links</h4>
                        <ul className="space-y-2">
                            {TEXTS.quickLinks.map((item) => (
                                <li key={item.label}>
                                    <Link
                                        href={item.href}
                                        className="hover:text-blue-300 transition-colors duration-300"
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
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
                                    href: SETTINGS.HUB_CONFIG.FACEBOOK_URL,
                                },
                                {
                                    icon: FaTwitter,
                                    href: SETTINGS.HUB_CONFIG.TWITTER_HANDLE,
                                },
                                {
                                    icon: FaLinkedinIn,
                                    href: SETTINGS.HUB_CONFIG.LINKEDIN_URL,
                                },
                                {
                                    icon: FaInstagram,
                                    href: SETTINGS.HUB_CONFIG.INSTAGRAM_URL,
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
                                    required
                                    autoComplete="email"
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
                            href={"https://www.linkedin.com/in/shashwatkansal/"}
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
