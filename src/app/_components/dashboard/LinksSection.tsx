"use client";
import { useState } from "react";
import {
    FaBook,
    FaBrain,
    FaGoogleDrive,
    FaLink,
    FaSearch,
    FaPlus,
    FaTrash,
    FaEdit,
    FaSave,
    FaTimes
} from "react-icons/fa";
import { RiNotionFill } from "react-icons/ri";
import { SiGooglecalendar } from "react-icons/si";
import LinkCard, { LinkCardProps } from "./LinkCard";
import { motion } from "framer-motion";
import { useLinks, DashboardLink, getDynamicIcon } from "./LinksContext";
import { useAuth } from "@/lib/auth";
import * as SETTINGS from "@/lib/settings";
import { TEXTS } from "@/lib/texts";
import * as faIcons from "react-icons/fa";
import * as mdIcons from "react-icons/md";
import * as riIcons from "react-icons/ri";

// Curated subset: FontAwesome, Material, Remix
const ICON_SOURCES = [
    { lib: "fa", icons: faIcons },
    { lib: "md", icons: mdIcons },
    { lib: "ri", icons: riIcons },
];

type IconIndexEntry = { lib: string; name: string; Icon: React.ComponentType<any> };

const ICON_INDEX: IconIndexEntry[] = ICON_SOURCES.flatMap(({ lib, icons }) =>
    Object.keys(icons).map((name) => ({ lib, name, Icon: (icons as Record<string, React.ComponentType<any>>)[name] }))
);

const linksData: LinkCardProps[] = [
    {
        href: SETTINGS.HUB_CONFIG.TOPLINK_URL,
        title: TEXTS.dashboard.links.toplink.title,
        icon: <FaLink />,
        description: TEXTS.dashboard.links.toplink.description,
    },
    {
        href: SETTINGS.HUB_CONFIG.SHAPER_GUIDE_URL,
        title: TEXTS.dashboard.links.shaperGuide.title,
        icon: <FaBook />,
        description: TEXTS.dashboard.links.shaperGuide.description,
    },
    {
        href: SETTINGS.HUB_CONFIG.WEF_INTELLIGENCE_URL,
        title: TEXTS.dashboard.links.intelligence.title,
        icon: <FaBrain />,
        description: TEXTS.dashboard.links.intelligence.description,
    },
    {
        href: "https://calendar.google.com",
        title: TEXTS.dashboard.links.calendar.title,
        icon: <SiGooglecalendar />,
        description: TEXTS.dashboard.links.calendar.description,
    },
    {
        href: SETTINGS.HUB_CONFIG.NOTION_URL,
        title: TEXTS.dashboard.links.notion.title(SETTINGS.HUB_CONFIG.HUB_NAME),
        icon: <RiNotionFill />,
        description: TEXTS.dashboard.links.notion.description,
    },
    {
        href: SETTINGS.HUB_CONFIG.TEAM_ALLOCATIONS_URL,
        title: TEXTS.dashboard.links.teamAllocations.title,
        icon: <FaGoogleDrive />,
        description: TEXTS.dashboard.links.teamAllocations.description,
    },
];

const emptyLink: DashboardLink = {
    href: "",
    title: "",
    icon: { lib: "fa", name: "FaLink" },
    description: "",
};

function IconPicker({ value, onChange }: { value: { lib: string; name: string }; onChange: (icon: { lib: string; name: string }) => void }) {
    const [search, setSearch] = useState("");
    const [results, setResults] = useState(ICON_INDEX.slice(0, 50));

    const handleSearch = (q: string) => {
        setSearch(q);
        if (!q) {
            setResults(ICON_INDEX.slice(0, 50));
            return;
        }
        const filtered = ICON_INDEX.filter((entry: IconIndexEntry) => entry.name.toLowerCase().includes(q.toLowerCase()));
        setResults(filtered.slice(0, 50));
    };

    return (
        <div className="flex flex-col gap-2">
            <input
                type="text"
                placeholder="Search icon..."
                value={search}
                onChange={e => handleSearch(e.target.value)}
                className="p-2 border rounded flex-1"
            />
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto border rounded p-2 bg-white">
                {results.map((entry: IconIndexEntry) => (
                    <button
                        key={entry.lib + entry.name}
                        className={`p-2 border rounded hover:bg-blue-100 ${value.name === entry.name && value.lib === entry.lib ? 'bg-blue-200 border-blue-400' : ''}`}
                        onClick={() => onChange({ lib: entry.lib, name: entry.name })}
                        type="button"
                        title={entry.name}
                    >
                        <entry.Icon size={24} />
                    </button>
                ))}
                {results.length === 0 && <span className="text-gray-400">No icons found</span>}
            </div>
            <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-600">Selected:</span>
                {getDynamicIcon(value.lib, value.name, { size: 24 })}
                <span className="text-xs text-gray-500">{value.lib}:{value.name}</span>
            </div>
        </div>
    );
}

const LinksSection = () => {
    const { links, addLink, removeLink, updateLink } = useLinks();
    const [searchTerm, setSearchTerm] = useState("");
    const [editingIndex, setEditingIndex] = useState<number | null>(null);
    const [newLink, setNewLink] = useState<DashboardLink>(emptyLink);
    const [isAdding, setIsAdding] = useState(false);
    const { isAdmin } = useAuth();

    const filteredLinks = links.filter((link: DashboardLink) =>
        link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        link.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewLink((prev) => ({ ...prev, [name]: value }));
    };

    const handleIconChange = (icon: { lib: string; name: string }) => {
        setNewLink((prev) => ({ ...prev, icon }));
    };

    const handleAdd = () => {
        addLink(newLink);
        setNewLink(emptyLink);
        setIsAdding(false);
    };

    const handleEdit = (idx: number) => {
        setEditingIndex(idx);
        setNewLink(links[idx]);
    };

    const handleSaveEdit = () => {
        if (editingIndex !== null) {
            updateLink(editingIndex, newLink);
            setEditingIndex(null);
            setNewLink(emptyLink);
        }
    };

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
            <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search links..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                </div>
                {isAdmin && (
                    <button
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                        onClick={() => { setIsAdding(true); setNewLink(emptyLink); }}
                    >
                        <FaPlus /> Add Link
                    </button>
                )}
            </div>
            {isAdding && isAdmin && (
                <div className="mb-6 bg-white p-4 rounded-lg shadow flex flex-col gap-2">
                    <input
                        name="title"
                        placeholder="Title"
                        value={newLink.title}
                        onChange={handleEditChange}
                        className="p-2 border rounded"
                    />
                    <input
                        name="href"
                        placeholder="URL"
                        value={newLink.href}
                        onChange={handleEditChange}
                        className="p-2 border rounded"
                    />
                    <IconPicker value={newLink.icon} onChange={handleIconChange} />
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={newLink.description}
                        onChange={handleEditChange}
                        className="p-2 border rounded"
                    />
                    <div className="flex gap-2 mt-2">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleAdd}><FaSave /> Save</button>
                        <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={() => setIsAdding(false)}><FaTimes /> Cancel</button>
                    </div>
                </div>
            )}
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
                {filteredLinks.map((link: DashboardLink, index: number) => (
                    <div key={index} className="relative group">
                        {editingIndex === index ? (
                            <div className="bg-white p-4 rounded-lg shadow flex flex-col gap-2">
                                <input
                                    name="title"
                                    placeholder="Title"
                                    value={newLink.title}
                                    onChange={handleEditChange}
                                    className="p-2 border rounded"
                                />
                                <input
                                    name="href"
                                    placeholder="URL"
                                    value={newLink.href}
                                    onChange={handleEditChange}
                                    className="p-2 border rounded"
                                />
                                <IconPicker value={newLink.icon} onChange={handleIconChange} />
                                <textarea
                                    name="description"
                                    placeholder="Description"
                                    value={newLink.description}
                                    onChange={handleEditChange}
                                    className="p-2 border rounded"
                                />
                                <div className="flex gap-2 mt-2">
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleSaveEdit}><FaSave /> Save</button>
                                    <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={() => setEditingIndex(null)}><FaTimes /> Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <LinkCard {...link} icon={getDynamicIcon(link.icon.lib, link.icon.name)} />
                                {isAdmin && (
                                    <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 bg-yellow-100 rounded hover:bg-yellow-200" onClick={() => handleEdit(index)} title="Edit"><FaEdit /></button>
                                        <button className="p-2 bg-red-100 rounded hover:bg-red-200" onClick={() => removeLink(index)} title="Delete"><FaTrash /></button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default LinksSection;
