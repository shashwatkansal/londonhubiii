"use client";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import * as faIcons from "react-icons/fa";
import * as mdIcons from "react-icons/md";
import * as riIcons from "react-icons/ri";
import * as siIcons from "react-icons/si";
import { LinkCardProps } from "./LinkCard";

export interface DashboardLink {
  href: string;
  title: string;
  icon: {
    lib: string; // e.g. 'fa', 'ri', 'si'
    name: string; // e.g. 'FaLink', 'RiNotionFill', 'SiGooglecalendar'
  };
  description: string;
}

const DEFAULT_LINKS: DashboardLink[] = [
  {
    href: "https://my.weforum.org/home",
    title: "TopLink",
    icon: { lib: "fa", name: "FaLink" },
    description: "Access the World Economic Forum's digital collaboration platform.",
  },
  {
    href: "https://new.express.adobe.com/webpage/vnOKwPijAc0by?",
    title: "Official Shaper Guide",
    icon: { lib: "fa", name: "FaBook" },
    description: "Your comprehensive guide to being a Global Shaper.",
  },
  {
    href: "https://intelligence.weforum.org/",
    title: "WEF Intelligence",
    icon: { lib: "fa", name: "FaBrain" },
    description: "Explore insights and analysis from the World Economic Forum.",
  },
  {
    href: "https://calendar.google.com",
    title: "Google Calendar",
    icon: { lib: "si", name: "SiGooglecalendar" },
    description: "Stay updated with all Hub events and important dates.",
  },
  {
    href: "https://www.notion.so/your-hub/Your-Hub-Notion-Link",
    title: "Hub's Notion",
    icon: { lib: "ri", name: "RiNotionFill" },
    description: "Access our Hub's knowledge base and collaborative workspace.",
  },
  {
    href: "https://docs.google.com/document/d/1OFlopDRLcM2CoAdZpn0abeaAXlcKm5Be0YpM7PDrQII",
    title: "Team Allocations 2024-25",
    icon: { lib: "fa", name: "FaGoogleDrive" },
    description: "View the current team allocations for the 2024-25 period.",
  },
];

interface LinksContextType {
  links: DashboardLink[];
  addLink: (link: DashboardLink) => void;
  removeLink: (index: number) => void;
  updateLink: (index: number, link: DashboardLink) => void;
}

const LinksContext = createContext<LinksContextType | undefined>(undefined);

export const LinksProvider = ({ children }: { children: ReactNode }) => {
  const [links, setLinks] = useState<DashboardLink[]>(DEFAULT_LINKS);

  useEffect(() => {
    const stored = localStorage.getItem("dashboard_links");
    if (stored) {
      try {
        setLinks(JSON.parse(stored));
      } catch {
        setLinks(DEFAULT_LINKS);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("dashboard_links", JSON.stringify(links));
  }, [links]);

  const addLink = (link: DashboardLink) => setLinks((prev) => [...prev, link]);
  const removeLink = (index: number) => setLinks((prev) => prev.filter((_, i) => i !== index));
  const updateLink = (index: number, link: DashboardLink) => setLinks((prev) => prev.map((l, i) => (i === index ? link : l)));

  return (
    <LinksContext.Provider value={{ links, addLink, removeLink, updateLink }}>
      {children}
    </LinksContext.Provider>
  );
};

export const useLinks = () => {
  const ctx = useContext(LinksContext);
  if (!ctx) throw new Error("useLinks must be used within a LinksProvider");
  return ctx;
};

// Static map of all icons from fa, md, ri, si
const ALL_ICONS_MAP: Record<string, Record<string, React.ComponentType<any>>> = {
  fa: faIcons,
  md: mdIcons,
  ri: riIcons,
  si: siIcons,
};

// Utility to render any icon from the static map
export function getDynamicIcon(lib: string, name: string, props = {}) {
  const IconLib = ALL_ICONS_MAP[lib];
  if (!IconLib) return null;
  const Icon = IconLib[name];
  if (!Icon) return null;
  return <Icon {...props} />;
} 