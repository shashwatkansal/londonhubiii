"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { FaUser, FaChartBar, FaCalendar, FaLink, FaPen } from "react-icons/fa";

// Hooks
import { useAuth } from "@/lib/auth";

// Dashboard sections
import ProfileSection from "@components/dashboard/ProfileSection";
import AnalyticsSection from "@components/dashboard/AnalyticsSection";
import CalendarSection from "@components/dashboard/CalendarSection";
import LinksSection from "@components/dashboard/LinksSection";
import CreatePostSection from "@/app/_components/dashboard/CreatePostSection";
import SecretsManager from "@/app/_components/dashboard/SecretsManager";
import { useAdminAccess } from "@/hooks/useAdminAccess";
import { requireAuth } from "@/lib/requireAuth";

enum Tab {
  Profile = "profile",
  Analytics = "analytics",
  Calendar = "calendar",
  Links = "links",
  CreatePost = "create-post",
  PasswordManager = "password-manager",
}

function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || Tab.Profile;
  const [activeTab, setActiveTab] = useState<Tab>(initialTab as Tab);

  const { isAdmin, loading: adminLoading } = useAdminAccess();
  const { user, loading: authLoading } = useAuth();

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
    router.push(`/hub/dashboard?tab=${tab}`);
  };

  if (authLoading || adminLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    router.push("/signin");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          Dashboard
        </h1>
        <TabNavigation
          activeTab={activeTab}
          onTabChange={handleTabChange}
          isAdmin={isAdmin}
        />
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-lg shadow-xl p-6 mt-8"
        >
          {activeTab === Tab.Profile && <ProfileSection />}
          {activeTab === Tab.Analytics && isAdmin && <AnalyticsSection />}
          {activeTab === Tab.Calendar && <CalendarSection />}
          {activeTab === Tab.Links && <LinksSection />}
          {activeTab === Tab.CreatePost && <CreatePostSection />}
          {activeTab === Tab.PasswordManager && <SecretsManager />}
        </motion.div>
      </div>
    </div>
  );
}

interface TabNavigationProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
  isAdmin: boolean;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  activeTab,
  onTabChange,
  isAdmin,
}) => {
  return (
    <nav className="flex justify-center">
      <div className="bg-white rounded-lg shadow-md p-1 flex flex-wrap justify-center">
        <TabItem
          label="Profile"
          icon={<FaUser />}
          active={activeTab === Tab.Profile}
          onClick={() => onTabChange(Tab.Profile)}
        />
        {isAdmin && (
          <TabItem
            label="Analytics"
            icon={<FaChartBar />}
            active={activeTab === Tab.Analytics}
            onClick={() => onTabChange(Tab.Analytics)}
          />
        )}
        <TabItem
          label="Calendar"
          icon={<FaCalendar />}
          active={activeTab === Tab.Calendar}
          onClick={() => onTabChange(Tab.Calendar)}
        />
        <TabItem
          label="Links"
          icon={<FaLink />}
          active={activeTab === Tab.Links}
          onClick={() => onTabChange(Tab.Links)}
        />
        <TabItem
          label="Create Post"
          icon={<FaPen />}
          active={activeTab === Tab.CreatePost}
          onClick={() => onTabChange(Tab.CreatePost)}
        />
        {
          <TabItem
            label="Password Manager"
            icon={<FaPen />}
            active={activeTab === Tab.PasswordManager}
            onClick={() => onTabChange(Tab.PasswordManager)}
          />
        }
      </div>
    </nav>
  );
};

interface TabItemProps {
  label: string;
  icon: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const TabItem: React.FC<TabItemProps> = ({ label, icon, active, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 m-1 rounded-md transition-all duration-200 ${
        active
          ? "bg-blue-500 text-white shadow-md"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </motion.button>
  );
};

export default requireAuth(DashboardPage);
