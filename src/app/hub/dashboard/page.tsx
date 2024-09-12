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
      <div className="tabs mb-6">
        <a
          className={`tab tab-lifted ${
            activeTab === "profile" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("profile")}
        >
          Profile
        </a>
        <a
          className={`tab tab-lifted ${
            activeTab === "analytics" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("analytics")}
        >
          Analytics
        </a>
        <a
          className={`tab tab-lifted ${
            activeTab === "calendar" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("calendar")}
        >
          Calendar
        </a>
        <a
          className={`tab tab-lifted ${
            activeTab === "links" ? "tab-active" : ""
          }`}
          onClick={() => setActiveTab("links")}
        >
          Links
        </a>
      </div>

      {/* Render the active tab */}
      {activeTab === "profile" && <ProfileSection />}
      {activeTab === "analytics" && <AnalyticsSection />}
      {activeTab === "calendar" && <CalendarSection />}
      {activeTab === "links" && <LinksSection />}
    </div>
  );
};

export default requireAuth(DashboardPage);
