import { FaExternalLinkAlt } from "react-icons/fa";
import React from "react";
import { motion } from "framer-motion";

export interface LinkCardProps {
    href: string;
    title: string;
    icon?: React.ReactNode;
    description: string;
}

const LinkCard: React.FC<LinkCardProps> = ({
    href,
    title,
    icon,
    description,
}) => {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
            }}
        >
            <div className="p-6">
                <div className="flex items-center mb-4">
                    {icon && (
                        <div className="text-3xl text-blue-500 mr-4">
                            {icon}
                        </div>
                    )}
                    <h3 className="text-xl font-semibold text-gray-800">
                        {title}
                    </h3>
                </div>
                <p className="text-gray-600 mb-4">{description}</p>
                <div className="flex items-center text-blue-500 font-medium">
                    Visit Link
                    <FaExternalLinkAlt className="ml-2" />
                </div>
            </div>
        </motion.a>
    );
};

export default LinkCard;
