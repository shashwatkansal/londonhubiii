import { FaBell, FaUserCircle, FaCog } from 'react-icons/fa';

const Topbar = () => (
  <header className="w-full h-16 bg-white border-b flex items-center justify-between px-6 shadow-sm z-10">
    <div className="font-semibold text-lg">Dashboard</div>
    <div className="flex items-center gap-4">
      <button className="hover:text-blue-600" title="Notifications"><FaBell size={20} /></button>
      <button className="hover:text-blue-600" title="Settings"><FaCog size={20} /></button>
      <button className="hover:text-blue-600" title="Profile"><FaUserCircle size={24} /></button>
    </div>
  </header>
);

export default Topbar; 