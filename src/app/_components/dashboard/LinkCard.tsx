import { FaExternalLinkAlt } from "react-icons/fa";
import Image from "next/image";
import React from "react";

interface LinkCardProps {
  href: string;
  title: string;
  icon?: React.ReactNode;
  image?: string;
}

const LinkCard: React.FC<LinkCardProps> = ({ href, title, icon, image }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow"
    >
      <div className="card-body flex items-center">
        {image ? (
          <Image
            src={image}
            alt={title}
            width={40}
            height={40}
            className="mr-4"
          />
        ) : (
          icon && <div className="mr-4 text-2xl">{icon}</div>
        )}
        <h2 className="card-title">{title}</h2>
        <FaExternalLinkAlt className="ml-auto" />
      </div>
    </a>
  );
};

export default LinkCard;
