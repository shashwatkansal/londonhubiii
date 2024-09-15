import { FaBook, FaBrain, FaGoogleDrive, FaLink } from "react-icons/fa";
import LinkCard, { LinkCardProps } from "./LinkCard";
import { SiGooglecalendar } from "react-icons/si";
import { RiNotionFill } from "react-icons/ri";

const linksData: LinkCardProps[] = [
  {
    href: "https://my.weforum.org/home",
    title: "TopLink",
    icon: <FaLink />,
  },
  {
    href: "https://new.express.adobe.com/webpage/vnOKwPijAc0by?",
    title: "Official Shaper Guide",
    icon: <FaBook />,
  },
  {
    href: "https://intelligence.weforum.org/",
    title: "WEF Intelligence",
    icon: <FaBrain />,
  },
  {
    href: "https://calendar.google.com",
    title: "Google Calendar",
    icon: <SiGooglecalendar />,
  },
  {
    // Notion
    href: "https://www.notion.so/londonshapers/Global-Shapers-London-III-628c14e4650745aaa5c0f29f6e25100a",
    title: "Hub's Notion",
    icon: <RiNotionFill />,
  },
  {
    // Team Allocation Docs
    href: "https://docs.google.com/document/d/1OFlopDRLcM2CoAdZpn0abeaAXlcKm5Be0YpM7PDrQII",
    title: "Team Allocations 2024-25",
    icon: <FaGoogleDrive />,
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
