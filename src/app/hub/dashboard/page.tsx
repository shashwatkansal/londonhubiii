"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation"; // Next.js navigation hooks
import { db } from "@lib/firebaseConfig"; // Firestore config
import { doc, getDoc } from "firebase/firestore"; // Firestore methods
import { requireAuth } from "@lib/requireAuth"; // Require authentication wrapper
import { useAuth } from "@/lib/auth"; // Custom auth hook

// Dashboard sections
import ProfileSection from "@components/dashboard/ProfileSection";
import AnalyticsSection from "@components/dashboard/AnalyticsSection";
import CalendarSection from "@components/dashboard/CalendarSection";
import LinksSection from "@components/dashboard/LinksSection";
import CreatePostSection from "@/app/_components/dashboard/CreatePostSection";

enum Tab {
  Profile = "profile",
  Analytics = "analytics",
  Calendar = "calendar",
  Links = "links",
  CreatePost = "create-post",
}

function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || Tab.Profile;
  const [activeTab, setActiveTab] = useState<Tab>(initialTab as Tab);
  const [isAdmin, setIsAdmin] = useState(false); // Admin state
  const { user } = useAuth();

  // Fetch admin status from Firestore
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user?.email) return;
      try {
        const docRef = doc(db, "admins", user.email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) setIsAdmin(true);
      } catch (error) {
        console.error("Error checking admin status: ", error);
      }
    };
    checkAdminStatus();
  }, [user]);

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
      {/* Tabs Navigation */}
      <TabNavigation
        activeTab={activeTab}
        onTabChange={handleTabChange}
        isAdmin={isAdmin}
      />

      {/* Render the active tab */}
      <div className="p-4 sm:p-6">
        {activeTab === Tab.Profile && <ProfileSection />}
        {activeTab === Tab.Analytics && isAdmin && <AnalyticsSection />}
        {activeTab === Tab.Calendar && <CalendarSection />}
        {activeTab === Tab.Links && <LinksSection />}
        {activeTab === Tab.CreatePost && <CreatePostSection />}
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
    <div className="flex justify-center mb-6">
      <div className="bg-gray-100 rounded-lg shadow-lg w-full sm:w-auto">
        <div className="flex flex-col sm:flex-row justify-around sm:justify-start">
          <TabItem
            label="Profile"
            active={activeTab === Tab.Profile}
            onClick={() => onTabChange(Tab.Profile)}
          />
          {isAdmin && (
            <TabItem
              label="Admin"
              active={activeTab === Tab.Analytics}
              onClick={() => onTabChange(Tab.Analytics)}
            />
          )}
          <TabItem
            label="Calendar"
            active={activeTab === Tab.Calendar}
            onClick={() => onTabChange(Tab.Calendar)}
          />
          <TabItem
            label="Links"
            active={activeTab === Tab.Links}
            onClick={() => onTabChange(Tab.Links)}
          />
          <TabItem
            label="Create Post"
            active={activeTab === Tab.CreatePost}
            onClick={() => onTabChange(Tab.CreatePost)}
          />
        </div>
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
