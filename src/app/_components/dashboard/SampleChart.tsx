import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import TableSkeleton from './TableSkeleton';
import EmptyState from './EmptyState';

const defaultData = [
  { month: 'Jan', users: 400 },
  { month: 'Feb', users: 600 },
  { month: 'Mar', users: 800 },
  { month: 'Apr', users: 1000 },
  { month: 'May', users: 1200 },
  { month: 'Jun', users: 1280 },
];

const SampleChart = ({ loading = false, data = defaultData }: { loading?: boolean; data?: any[] }) => (
  <div className="bg-white rounded-lg shadow p-6 mb-8 border border-gray-100">
    <div className="font-semibold mb-2">User Growth</div>
    {loading ? (
      <div className="h-60 flex items-center justify-center"><TableSkeleton /></div>
    ) : !data || data.length === 0 ? (
      <div className="h-60 flex items-center justify-center"><EmptyState message="No chart data available." /></div>
    ) : (
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={3} dot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    )}
  </div>
);

export default SampleChart; 