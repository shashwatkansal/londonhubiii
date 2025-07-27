"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  FaUser, FaChartBar, FaCalendar, FaLink, FaPen, FaKey, FaUsers, 
  FaBars, FaTimes, FaHome, FaFileAlt, FaCog, FaHistory, FaChartLine 
} from "react-icons/fa";
import { 
  FiGrid, FiFileText, FiSettings, FiClock, FiTrendingUp,
  FiUsers, FiLock, FiCalendar, FiLink, FiEdit
} from "react-icons/fi";

import { useAuth } from "@/lib/auth";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Chart } from "@/components/dashboard/Chart";
import { ContentManager } from "@/components/dashboard/ContentManager";
import { DataTable } from "@/components/dashboard/DataTable";
import ProfileSection from "@/app/_components/dashboard/ProfileSection";
import FAQsSection from "@/app/_components/dashboard/FAQsSection";
import CalendarSection from "@/app/_components/dashboard/CalendarSection";
import LinksSection from "@/app/_components/dashboard/LinksSection";
import CreatePostSection from "@/app/_components/dashboard/CreatePostSection";
import SecretsManager from "@/app/_components/dashboard/SecretsManager";
import { useAdminAccess } from "@/hooks/useAdminAccess";
import { requireAuth } from "@/lib/requireAuth";
import UserManagementSection from "@/app/_components/dashboard/UserManagementSection";
import Topbar from "@/app/_components/dashboard/Topbar";
import AdvancedCollectionManager from "@/app/_components/dashboard/AdvancedCollectionManager";
import { adminConverter, userConverter, faqConverter, postConverter, secretConverter, siteSettingConverter, subscribersConverter } from "@/app/database/models";
import { collection, doc, setDoc, deleteDoc, getDocs, where, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { useRealtimeCollection, useRealtimeAggregation } from "@/hooks/useRealtimeData";
import { hasPermission } from "@/lib/rbac";
import { queryAuditLogs, getAuditStats } from "@/lib/audit";
import toast from "react-hot-toast";

const TABS = [
  { key: "profile", label: "Profile", icon: <FaUser />, admin: false },
  { key: "faqs", label: "FAQs", icon: <FaChartBar />, admin: true },
  { key: "calendar", label: "Calendar", icon: <FaCalendar />, admin: false },
  { key: "links", label: "Links", icon: <FaLink />, admin: false },
  { key: "create-post", label: "Create Post", icon: <FaPen />, admin: false },
  { key: "password-manager", label: "Password Manager", icon: <FaKey />, admin: false },
  { key: "user-management", label: "User Management", icon: <FaUsers />, admin: true },
  { key: "collections", label: "Settings", icon: <FaKey />, admin: true },
];

function DashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "profile";
  const [activeTab, setActiveTab] = useState(initialTab);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [adminEmails, setAdminEmails] = useState<string[]>([]);

  const { isAdmin, loading: adminLoading } = useAdminAccess();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    // Fetch admin emails for badges/context actions
    const fetchAdmins = async () => {
      const adminsRef = collection(db, "admins").withConverter(adminConverter);
      const snapshot = await getDocs(adminsRef);
      setAdminEmails(snapshot.docs.map(doc => doc.id));
    };
    fetchAdmins();
  }, []);

  const isAdminUser = (email: string) => adminEmails.includes(email);

  const handleTabChange = (tab: string) => {
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      <a href="#dashboard-main-content" className="sr-only focus:not-sr-only bg-blue-600 text-white px-4 py-2 z-50 absolute top-2 left-2 rounded shadow-lg">Skip to main content</a>
      <Topbar>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center justify-center p-2 rounded-full hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 ml-2"
          aria-label="Open sidebar menu"
          onClick={() => setDrawerOpen(true)}
        >
          <FaBars size={22} />
        </button>
      </Topbar>
      <div className="flex flex-1 min-h-0">
        {/* Sidebar for desktop */}
        <aside className="hidden md:flex flex-col w-64 bg-white border-r shadow-lg py-6 px-2 transition-all duration-200" aria-label="Sidebar navigation">
          <nav className="flex-1">
            <ul className="space-y-2">
              {TABS.filter(tab => isAdmin || !tab.admin).map(tab => (
                <li key={tab.key}>
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 font-medium text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 group
                      ${activeTab === tab.key ? "bg-blue-600 text-white shadow-md" : "text-gray-700 hover:bg-blue-100"}`}
                    onClick={() => handleTabChange(tab.key)}
                    aria-current={activeTab === tab.key ? "page" : undefined}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        {/* Mobile sidebar drawer */}
        {drawerOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-30 z-40"
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />
            <aside
              className="fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 flex flex-col py-6 px-2 animate-slide-in-bottom"
              aria-label="Mobile sidebar navigation"
              tabIndex={0}
            >
              <button
                className="self-end mb-4 p-2 rounded-full hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                aria-label="Close sidebar menu"
                onClick={() => setDrawerOpen(false)}
              >
                <FaTimes size={22} />
              </button>
              <nav className="flex-1">
                <ul className="space-y-2">
                  {TABS.filter(tab => isAdmin || !tab.admin).map(tab => (
                    <li key={tab.key}>
                      <button
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-150 font-medium text-lg focus:outline-none focus:ring-2 focus:ring-blue-400 group
                          ${activeTab === tab.key ? "bg-blue-600 text-white shadow-md" : "text-gray-700 hover:bg-blue-100"}`}
                        onClick={() => { handleTabChange(tab.key); setDrawerOpen(false); }}
                        aria-current={activeTab === tab.key ? "page" : undefined}
                      >
                        <span className="text-xl">{tab.icon}</span>
                        <span>{tab.label}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          </>
        )}
        {/* Mobile bottom nav (hide if drawer is open) */}
        {!drawerOpen && (
          <aside className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg flex z-20" aria-label="Mobile navigation">
            {TABS.filter(tab => isAdmin || !tab.admin).map(tab => (
              <button
                key={tab.key}
                className={`flex-1 flex flex-col items-center justify-center py-2 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400
                  ${activeTab === tab.key ? "text-blue-600" : "text-gray-500 hover:text-blue-500"}`}
                onClick={() => handleTabChange(tab.key)}
                aria-current={activeTab === tab.key ? "page" : undefined}
                title={tab.label}
              >
                <span className="text-xl">{tab.icon}</span>
                <span className="text-xs">{tab.label}</span>
              </button>
            ))}
          </aside>
        )}
        <main
          id="dashboard-main-content"
          className="flex-1 flex flex-col items-center justify-start px-2 sm:px-4 md:px-8 py-8 overflow-y-auto min-h-0 transition-all duration-200"
          style={{ paddingBottom: '4.5rem' }} // space for mobile nav
        >
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl p-4 sm:p-6 md:p-10 animate-fade-in-up min-h-[60vh]"
            tabIndex={0}
            aria-live="polite"
          >
            {activeTab === "profile" && <ProfileSection />}
            {activeTab === "faqs" && isAdmin && <FAQsSection />}
            {activeTab === "calendar" && <CalendarSection />}
            {activeTab === "links" && <LinksSection />}
            {activeTab === "create-post" && <CreatePostSection />}
            {activeTab === "password-manager" && <SecretsManager />}
            {activeTab === "user-management" && isAdmin && <UserManagementSection />}
            {activeTab === "collections" && isAdmin && (
              <>
                {/* Directory (Users) */}
                <AdvancedCollectionManager
                  collectionName="directory"
                  fields={[
                    { key: "name", label: "Name", type: "text" },
                    { key: "email", label: "Email", type: "email" },
                    { key: "role", label: "Role", type: "text" }
                  ]}
                  converter={userConverter}
                  idField="email"
                  specialBadges={adminEmails.length > 0 ? [
                    { key: "email", value: true, label: "Admin", color: "green" }
                  ] : []}
                  contextActions={[
                    {
                      label: (row) => isAdminUser(row.email) ? "Remove Admin" : "Make Admin",
                      show: () => true,
                      color: "blue",
                      onClick: async (row) => {
                        const adminsRef = collection(db, "admins").withConverter(adminConverter);
                        const adminDocRef = doc(adminsRef, row.email);
                        if (isAdminUser(row.email)) {
                          await deleteDoc(adminDocRef);
                        } else {
                          await setDoc(adminDocRef, { email: row.email });
                        }
                        // Refresh admin list
                        const snapshot = await getDocs(adminsRef);
                        setAdminEmails(snapshot.docs.map(doc => doc.id));
                      },
                      dynamicColor: (row) => isAdminUser(row.email) ? "red" : "blue"
                    }
                  ]}
                />
                {/* Admins */}
                <AdvancedCollectionManager
                  collectionName="admins"
                  fields={[{ key: "email", label: "Email", type: "email" }]}
                  converter={adminConverter}
                  idField="email"
                />
                {/* FAQs */}
                <AdvancedCollectionManager
                  collectionName="secrets"
                  fields={[
                    { key: "key", label: "Key", type: "text" },
                    { key: "value", label: "Value", type: "text" }
                  ]}
                  converter={secretConverter}
                  idField="key"
                />
                {/* Site Settings */}
                <AdvancedCollectionManager
                  collectionName="site_settings"
                  fields={[
                    { key: "key", label: "Key", type: "text" },
                    { key: "value", label: "Value", type: "text" }
                  ]}
                  converter={siteSettingConverter}
                  idField="key"
                />
                {/* Subscribers */}
                <AdvancedCollectionManager
                  collectionName="subscribers"
                  fields={[
                    { key: "email", label: "Email", type: "email" },
                    { key: "name", label: "Name", type: "text" }
                  ]}
                  converter={subscribersConverter}
                  idField="email"
                  exportToCSV={true}
                />
              </>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

export default requireAuth(DashboardPage);
