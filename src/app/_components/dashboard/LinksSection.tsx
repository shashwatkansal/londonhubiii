import { FaBook, FaGoogleDrive, FaLink } from "react-icons/fa";
import LinkCard from "./LinkCard";
import { SiGooglecalendar } from "react-icons/si";

const linksData = [
  {
    href: "https://drive.google.com",
    title: "Google Drive",
    icon: <FaGoogleDrive />,
  },
  {
    href: "https://toplink.example.com",
    title: "TopLink",
    icon: <FaLink />,
  },
  {
    href: "https://new.express.adobe.com/webpage/vnOKwPijAc0by?",
    title: "Official Shaper Guide",
    icon: <FaBook />,
  },
  {
    href: "https://calendar.google.com",
    title: "Google Calendar",
    icon: <SiGooglecalendar />,
  },
];

const LinksSection = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Useful Links</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {linksData.map((link, index) => (
          <LinkCard
            key={index}
            href={link.href}
            title={link.title}
            icon={link.icon}
            image={link.image}
          />
        ))}
      </div>
    </div>
  );
};

export default LinksSection;
