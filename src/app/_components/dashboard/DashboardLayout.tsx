import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Breadcrumbs from './Breadcrumbs';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen bg-gray-50">
    <Sidebar />
    <div className="flex-1 flex flex-col min-w-0">
      <Topbar />
      <div className="px-6 pt-4">
        <Breadcrumbs />
      </div>
      <main className="flex-1 overflow-y-auto p-6 pt-2">{children}</main>
    </div>
  </div>
);

export default DashboardLayout; 