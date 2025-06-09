import DashboardLayout from '../../_components/dashboard/DashboardLayout';
import AnalyticsSection from '../../_components/dashboard/AnalyticsSection';
import StatsCards from '../../_components/dashboard/StatsCards';
import SampleChart from '../../_components/dashboard/SampleChart';

const ImpactPage = () => (
  <DashboardLayout>
    <StatsCards />
    <SampleChart />
    <AnalyticsSection />
  </DashboardLayout>
);

export default ImpactPage; 