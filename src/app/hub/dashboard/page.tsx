"use client";
import { useState } from "react";
import ProfileSection from "@components/dashboard/ProfileSection";
import AnalyticsSection from "@components/dashboard/AnalyticsSection";
import CalendarSection from "@components/dashboard/CalendarSection";
import LinksSection from "@components/dashboard/LinksSection";
import { requireAuth } from "@lib/requireAuth";

const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="container mx-auto p-6">
      {/* Tabs Navigation */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 rounded-lg shadow-lg w-full md:w-auto">
          <div className="flex justify-around md:justify-start">
            <TabItem
              label="Profile"
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
            />
            <TabItem
              label="Analytics"
              active={activeTab === "analytics"}
              onClick={() => setActiveTab("analytics")}
            />
            <TabItem
              label="Calendar"
              active={activeTab === "calendar"}
              onClick={() => setActiveTab("calendar")}
            />
            <TabItem
              label="Links"
              active={activeTab === "links"}
              onClick={() => setActiveTab("links")}
            />
          </div>
        </div>
      </div>

      {/* Render the active tab */}
      {activeTab === "profile" && <ProfileSection />}
      {activeTab === "analytics" && <AnalyticsSection />}
      {activeTab === "calendar" && <CalendarSection />}
      {activeTab === "links" && <LinksSection />}
    </div>
  );
};

interface TabItemProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabItem: React.FC<TabItemProps> = ({ label, active, onClick }) => {
  return (
    <a
      onClick={onClick}
      className={`cursor-pointer px-6 py-3 text-lg font-semibold transition-colors duration-300 ${
        active
          ? "bg-blue-500 text-white rounded-t-lg shadow-lg"
          : "text-gray-700 hover:text-blue-500"
      }`}
    >
      {label}
    </a>
  );
};

export default requireAuth(DashboardPage);
