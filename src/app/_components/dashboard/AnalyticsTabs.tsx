import { useState, useEffect } from 'react';
import Tabs from './Tabs';
import StatsCards from './StatsCards';
import SampleChart from './SampleChart';
import AnalyticsSection from './AnalyticsSection';
import TableSkeleton from './TableSkeleton';

const AnalyticsTabs = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for demo; replace with real loading if needed
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <TableSkeleton />;

  return (
    <Tabs
      tabs={[
        {
          label: 'Overview',
          content: <><StatsCards /><SampleChart /></>,
        },
        {
          label: 'User Growth',
          content: <SampleChart />, // Could add more charts here
        },
        {
          label: 'Engagement',
          content: <AnalyticsSection />, // Could add more engagement charts here
        },
      ]}
    />
  );
};

export default AnalyticsTabs; 