"use client";
import { useEffect, useState } from "react";
import { getAllSiteSettings, setSiteSetting } from "@/lib/siteSettings";
import toast from "react-hot-toast";

const SETTINGS_KEYS = [
  { key: "recruitment_banner_enabled", label: "Show Recruitment Banner", type: "toggle" },
  { key: "recruitment_banner_text", label: "Recruitment Banner Text" },
  { key: "recruitment_url", label: "Recruitment Form URL" },
  { key: "newsletter_url", label: "Newsletter URL" },
  { key: "join_form_url", label: "Join Form URL" },
  { key: "transfer_form_url", label: "Transfer Form URL" },
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
        {SETTINGS_KEYS.map(({ key, label, type }) => (
          <div key={key} className="flex items-center gap-4">
            <label className="w-48 font-medium">{label}:</label>
            {type === 'toggle' ? (
              <>
                <button
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    settings[key] === 'true'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-700'
                  }`}
                  onClick={() => {
                    const newValue = settings[key] === 'true' ? 'false' : 'true';
                    handleChange(key, newValue);
                    handleSave(key);
                  }}
                >
                  {settings[key] === 'true' ? 'Enabled' : 'Disabled'}
                </button>
                <span className="text-sm text-gray-500">
                  {settings[key] === 'true' ? '✓ Banner is showing' : 'Banner is hidden'}
                </span>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 