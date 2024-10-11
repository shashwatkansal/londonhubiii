"use client";
import { Link } from "@/interfaces/links";
import { useAuth } from "@/lib/auth";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBook, FaBrain, FaGoogleDrive, FaLink } from "react-icons/fa";
import { RiNotionFill } from "react-icons/ri";
import { SiGooglecalendar } from "react-icons/si";
import LinkCard, { LinkCardProps } from "./LinkCard";

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
  const { user, isAdmin } = useAuth();
  const [links, setLinks] = useState<LinkCardProps[]>([]); // Initialize with no links
  const [newLink, setNewLink] = useState<Link>({
    href: "",
    iconName: "",
    title: "",
  });
  const [iconLibrary, setIconLibrary] = useState<{
    [key: string]: { [key: string]: React.ComponentType };
  }>({
    fa: {
      FaLink,
      FaBook,
      FaBrain,
      FaGoogleDrive,
    },
    si: {
      SiGooglecalendar,
    },
    ri: {
      RiNotionFill,
    },
  }); // Default to FontAwesome (fa)

  // Fetch user's saved links from Firestore
  useEffect(() => {
    const fetchLinks = async () => {
      if (user) {
        const docRef = doc(db, "users", user.uid); // Fetch by user ID
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const userLinks = docSnap.data().links || [];
          setLinks(userLinks); // Set user links
        }
      }
    };

    // Removed unused variable 'libraryIcons'
  }, [user]);

  // Handle new link input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setNewLink((prev) => ({ ...prev, [name]: value }));
  };

  // Function to get icon from the correct library
  const getIconComponent = (library: string, iconName: string) => {
    const libraryIcons = iconLibrary[library.toLowerCase()];
    return libraryIcons ? libraryIcons[iconName] : null;
  };

  // Save new link to Firestore and update the state
  const addLink = async () => {
    if (!newLink.title || !newLink.href || !newLink.iconName) {
      toast.error("Please fill in all fields.");
      return;
    }

    const IconComponent = getIconComponent(iconLibrary, newLink.iconName);

    if (!IconComponent) {
      toast.error("Invalid icon or icon library. Please try again.");
      return;
    }

    const userLink = { ...newLink, icon: <IconComponent /> };
    const updatedLinks = [...links, userLink];

    setLinks(updatedLinks); // Update the state

    // Save to Firestore
    if (user) {
      const docRef = doc(db, "users", user.uid);
      await setDoc(docRef, { links: updatedLinks }, { merge: true });
    }
  };

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
        {links.map((link, index) => (
          <LinkCard
            key={index}
            href={link.href}
            title={link.title}
            icon={link.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default LinksSection;
