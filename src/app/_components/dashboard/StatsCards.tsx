import { useEffect, useState } from 'react';
import { directoryHelpers, postsHelpers, User, Post } from '@/app/database/models';

const StatsCards = () => {
  const [loading, setLoading] = useState(true);
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeUsers, setActiveUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [engagementRate, setEngagementRate] = useState('0%');

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const users: User[] = await directoryHelpers.getAll();
        const posts: Post[] = await postsHelpers.getAll();
        setTotalUsers(users.length);
        const active = users.filter((u) => u.externalViewEnabled).length;
        setActiveUsers(active);
        setTotalPosts(posts.length);
        setEngagementRate(users.length > 0 ? `${Math.round((active / users.length) * 100)}%` : '0%');
      } catch (error) {
        setTotalUsers(0);
        setActiveUsers(0);
        setTotalPosts(0);
        setEngagementRate('0%');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    { label: 'Total Users', value: loading ? '...' : totalUsers },
    { label: 'Active Users', value: loading ? '...' : activeUsers },
    { label: 'Total Posts', value: loading ? '...' : totalPosts },
    { label: 'Engagement Rate', value: loading ? '...' : engagementRate },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white rounded-lg shadow p-6 flex flex-col items-start border border-gray-100"
        >
          <div className="text-gray-500 text-sm mb-1">{stat.label}</div>
          <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards; 