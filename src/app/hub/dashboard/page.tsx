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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Tabs Navigation */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 rounded-lg shadow-lg w-full sm:w-auto">
          <div className="flex flex-col sm:flex-row justify-around sm:justify-start">
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
      <div className="p-4 sm:p-6">
        {activeTab === "profile" && <ProfileSection />}
        {activeTab === "analytics" && <AnalyticsSection />}
        {activeTab === "calendar" && <CalendarSection />}
        {activeTab === "links" && <LinksSection />}
      </div>
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
      className={`cursor-pointer px-4 sm:px-6 py-3 text-sm sm:text-lg font-semibold transition-colors duration-300 ${
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
