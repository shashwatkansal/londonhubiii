"use client";
import { useEffect, useState } from "react";
import { getAllSiteSettings, setSiteSetting } from "@/lib/siteSettings";
import toast from "react-hot-toast";

const SETTINGS_KEYS = [
  { key: "newsletter_url", label: "Newsletter URL" },
  { key: "join_form_url", label: "Join Form URL" },
  { key: "error_404_text", label: "404 Error Text" },
  { key: "error_500_text", label: "500 Error Text" },
  // Add more as needed
];

export default function SiteSettingsSection() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllSiteSettings().then((data) => {
      setSettings(data);
      setLoading(false);
    });
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (key: string) => {
    try {
      await setSiteSetting(key, settings[key]);
      toast.success("Setting saved!");
    } catch (e) {
      toast.error("Failed to save setting.");
    }
  };

  if (loading) return <div>Loading site settings...</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Site Settings</h2>
      <div className="space-y-4">
        {SETTINGS_KEYS.map(({ key, label }) => (
          <div key={key} className="flex items-center gap-4">
            <label className="w-48 font-medium">{label}:</label>
            <input
              className="border px-2 py-1 rounded flex-1"
              value={settings[key] || ""}
              onChange={(e) => handleChange(key, e.target.value)}
            />
            <button
              className="bg-blue-600 text-white px-4 py-1 rounded"
              onClick={() => handleSave(key)}
            >
              Save
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 