import { FaChartBar } from "react-icons/fa";

const AnalyticsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <h2 className="card-title">
            <FaChartBar className="text-blue-500" /> Total Users
          </h2>
          <p className="text-2xl font-bold">1,234</p>
          <p className="text-gray-600">Increased by 20% this month</p>
        </div>
      </div>
      {/* More cards can go here */}
    </div>
  );
};

export default AnalyticsSection;
