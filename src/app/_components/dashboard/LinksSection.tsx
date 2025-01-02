"use client";
import { useState } from "react";
import {
    FaBook,
    FaBrain,
    FaGoogleDrive,
    FaLink,
    FaSearch,
} from "react-icons/fa";
import { RiNotionFill } from "react-icons/ri";
import { SiGooglecalendar } from "react-icons/si";
import LinkCard, { LinkCardProps } from "./LinkCard";
import { motion } from "framer-motion";

const linksData: LinkCardProps[] = [
    {
        href: "https://my.weforum.org/home",
        title: "TopLink",
        icon: <FaLink />,
        description:
            "Access the World Economic Forum's digital collaboration platform.",
    },
    {
        href: "https://new.express.adobe.com/webpage/vnOKwPijAc0by?",
        title: "Official Shaper Guide",
        icon: <FaBook />,
        description: "Your comprehensive guide to being a Global Shaper.",
    },
    {
        href: "https://intelligence.weforum.org/",
        title: "WEF Intelligence",
        icon: <FaBrain />,
        description:
            "Explore insights and analysis from the World Economic Forum.",
    },
    {
        href: "https://calendar.google.com",
        title: "Google Calendar",
        icon: <SiGooglecalendar />,
        description: "Stay updated with all Hub events and important dates.",
    },
    {
        href: "https://www.notion.so/londonshapers/Global-Shapers-London-III-628c14e4650745aaa5c0f29f6e25100a",
        title: "Hub's Notion",
        icon: <RiNotionFill />,
        description:
            "Access our Hub's knowledge base and collaborative workspace.",
    },
    {
        href: "https://docs.google.com/document/d/1OFlopDRLcM2CoAdZpn0abeaAXlcKm5Be0YpM7PDrQII",
        title: "Team Allocations 2024-25",
        icon: <FaGoogleDrive />,
        description:
            "View the current team allocations for the 2024-25 period.",
    },
];

const LinksSection = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredLinks = linksData.filter(
        (link) =>
            link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            link.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-6 bg-gray-50 rounded-lg shadow-lg"
        >
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Useful Links
            </h2>
            <div className="mb-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search links..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
            </div>
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={{
                    hidden: { opacity: 0 },
                    show: {
                        opacity: 1,
                        transition: {
                            staggerChildren: 0.1,
                        },
                    },
                }}
                initial="hidden"
                animate="show"
            >
                {filteredLinks.map((link, index) => (
                    <LinkCard
                        key={index}
                        href={link.href}
                        title={link.title}
                        icon={link.icon}
                        description={link.description}
                    />
                ))}
            </motion.div>
        </motion.div>
    );
};

export default LinksSection;
