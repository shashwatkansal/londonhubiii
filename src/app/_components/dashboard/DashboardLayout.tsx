import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Breadcrumbs from './Breadcrumbs';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="flex h-screen bg-gray-50">
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only absolute top-2 left-2 z-50 bg-blue-600 text-white px-4 py-2 rounded shadow focus:outline-none"
    >
      Skip to main content
    </a>
    <Sidebar />
    <div className="flex-1 flex flex-col min-w-0">
      <Topbar />
      <div className="px-6 pt-4">
        <Breadcrumbs />
      </div>
      <main id="main-content" className="flex-1 overflow-y-auto p-6 pt-2 focus:outline-none">
        {children}
      </main>
    </div>
  </div>
);

export default DashboardLayout; 