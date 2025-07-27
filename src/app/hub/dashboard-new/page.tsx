"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  FiGrid, FiFileText, FiSettings, FiClock, FiTrendingUp,
  FiUsers, FiLock, FiCalendar, FiLink, FiEdit, FiActivity,
  FiEye, FiMessageSquare, FiAward
} from "react-icons/fi";

import { useAuth } from "@/lib/auth";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Chart } from "@/components/dashboard/Chart";
import { ContentManager } from "@/components/dashboard/ContentManager";
import { DataTable } from "@/components/dashboard/DataTable";
import { useRealtimeCollection, useRealtimeAggregation } from "@/hooks/useRealtimeData";
import { hasPermission } from "@/lib/rbac";
import { queryAuditLogs, getAuditStats } from "@/lib/audit";
import { requireAuth } from "@/lib/requireAuth";
import toast from "react-hot-toast";
import { where, orderBy, limit } from "firebase/firestore";

// Navigation items for the dashboard
const navItems = [
  { key: 'overview', label: 'Overview', icon: <FiGrid />, href: '/hub/dashboard-new' },
  { key: 'content', label: 'Content', icon: <FiFileText />, href: '/hub/dashboard-new?tab=content' },
  { key: 'users', label: 'Users', icon: <FiUsers />, href: '/hub/dashboard-new?tab=users' },
  { key: 'analytics', label: 'Analytics', icon: <FiTrendingUp />, href: '/hub/dashboard-new?tab=analytics' },
  { key: 'calendar', label: 'Calendar', icon: <FiCalendar />, href: '/hub/dashboard-new?tab=calendar' },
  { key: 'links', label: 'Links', icon: <FiLink />, href: '/hub/dashboard-new?tab=links' },
  { key: 'audit', label: 'Audit Logs', icon: <FiClock />, href: '/hub/dashboard-new?tab=audit' },
  { key: 'settings', label: 'Settings', icon: <FiSettings />, href: '/hub/dashboard-new?tab=settings' },
];

function ModernDashboardPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [auditStats, setAuditStats] = useState<any>(null);

  // Real-time data hooks
  const { data: posts, loading: postsLoading } = useRealtimeCollection(
    'posts',
    [orderBy('createdAt', 'desc'), limit(10)]
  );

  const { data: totalUsers } = useRealtimeAggregation('directory', 'count');
  const { data: totalPosts } = useRealtimeAggregation('posts', 'count');
  const { data: totalEvents } = useRealtimeAggregation('events', 'count');
  const { data: totalViews } = useRealtimeAggregation('analytics', 'sum', 'views');

  // Get user role
  const userRole = user?.role || 'member';

  useEffect(() => {
    // Parse URL params
    const params = new URLSearchParams(window.location.search);
    const tab = params.get('tab') || 'overview';
    setActiveTab(tab);

    // Fetch audit logs if on audit tab
    if (tab === 'audit' && hasPermission(userRole, 'analytics', 'read')) {
      fetchAuditData();
    }
  }, [userRole]);

  const fetchAuditData = async () => {
    try {
      const logs = await queryAuditLogs({}, 50);
      setAuditLogs(logs);

      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 30); // Last 30 days
      const stats = await getAuditStats(startDate, endDate);
      setAuditStats(stats);
    } catch (error) {
      console.error('Failed to fetch audit data:', error);
    }
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    router.push("/signin");
    return null;
  }

  // Sample data for charts
  const monthlyPostsData = [
    { name: 'Jan', posts: 12, views: 450 },
    { name: 'Feb', posts: 19, views: 580 },
    { name: 'Mar', posts: 15, views: 620 },
    { name: 'Apr', posts: 25, views: 890 },
    { name: 'May', posts: 22, views: 750 },
    { name: 'Jun', posts: 30, views: 1200 },
  ];

  const contentTypeData = [
    { name: 'Posts', value: 45 },
    { name: 'Events', value: 30 },
    { name: 'Pages', value: 15 },
    { name: 'Announcements', value: 10 },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Total Users"
                value={totalUsers}
                icon={<FiUsers />}
                trend={12}
                color="blue"
              />
              <StatsCard
                title="Total Posts"
                value={totalPosts}
                icon={<FiFileText />}
                trend={8}
                color="green"
              />
              <StatsCard
                title="Total Events"
                value={totalEvents}
                icon={<FiCalendar />}
                trend={-5}
                color="purple"
              />
              <StatsCard
                title="Total Views"
                value={totalViews}
                icon={<FiEye />}
                trend={25}
                color="orange"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Chart
                type="line"
                data={monthlyPostsData}
                dataKey={['posts', 'views']}
                title="Monthly Activity"
                subtitle="Posts created and views over time"
              />
              <Chart
                type="pie"
                data={contentTypeData}
                title="Content Distribution"
                subtitle="Breakdown by content type"
              />
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Posts
              </h3>
              <DataTable
                data={(posts || []).map((post: any) => ({ ...post, id: post.id || Math.random().toString() }))}
                columns={[
                  { key: 'title' as any, label: 'Title', sortable: true },
                  { key: 'author' as any, label: 'Author', sortable: true },
                  { 
                    key: 'createdAt' as any, 
                    label: 'Created', 
                    sortable: true,
                    render: (value: any) => new Date(value?.toDate?.() || value).toLocaleDateString()
                  },
                  {
                    key: 'status' as any,
                    label: 'Status',
                    render: (value: string) => (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        value === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {value}
                      </span>
                    )
                  }
                ]}
                searchable
                searchKeys={['title' as any, 'author' as any]}
              />
            </div>
          </div>
        );

      case 'content':
        return (
          <ContentManager onContentChange={() => {
            // Refresh data if needed
          }} />
        );

      case 'analytics':
        if (!hasPermission(userRole, 'analytics', 'read')) {
          return (
            <div className="text-center py-12">
              <FiLock className="mx-auto text-4xl text-gray-400 mb-4" />
              <p className="text-gray-500">You don&apos;t have permission to view analytics.</p>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Chart
                type="area"
                data={monthlyPostsData}
                dataKey="views"
                title="Page Views Trend"
                subtitle="Views over the last 6 months"
              />
              <Chart
                type="bar"
                data={monthlyPostsData}
                dataKey="posts"
                title="Content Creation"
                subtitle="Posts created per month"
              />
            </div>
          </div>
        );

      case 'audit':
        if (!hasPermission(userRole, 'analytics', 'read')) {
          return (
            <div className="text-center py-12">
              <FiLock className="mx-auto text-4xl text-gray-400 mb-4" />
              <p className="text-gray-500">You don&apos;t have permission to view audit logs.</p>
            </div>
          );
        }
        return (
          <div className="space-y-6">
            {/* Audit Stats */}
            {auditStats && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatsCard
                  title="Total Events"
                  value={auditStats.totalEvents}
                  icon={<FiActivity />}
                  color="blue"
                />
                <StatsCard
                  title="Success Rate"
                  value={`${auditStats.successRate.toFixed(1)}%`}
                  icon={<FiAward />}
                  color="green"
                />
                <StatsCard
                  title="Active Users"
                  value={auditStats.topUsers.length}
                  icon={<FiUsers />}
                  color="purple"
                />
              </div>
            )}

            {/* Audit Logs Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Recent Audit Logs
              </h3>
              <DataTable
                data={auditLogs}
                columns={[
                  { 
                    key: 'timestamp', 
                    label: 'Time', 
                    sortable: true,
                    render: (value: Date) => new Date(value).toLocaleString()
                  },
                  { key: 'userEmail', label: 'User', sortable: true },
                  { key: 'action', label: 'Action', sortable: true },
                  { key: 'resource', label: 'Resource', sortable: true },
                  {
                    key: 'result',
                    label: 'Result',
                    render: (value: string) => (
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        value === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {value}
                      </span>
                    )
                  }
                ]}
                searchable
                searchKeys={['userEmail', 'action', 'resource']}
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <DashboardLayout navItems={navItems}>
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderContent()}
      </motion.div>
    </DashboardLayout>
  );
}

export default requireAuth(ModernDashboardPage);