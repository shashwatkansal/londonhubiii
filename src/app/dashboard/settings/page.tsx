import { useEffect, useState } from 'react';
import DashboardLayout from '../../_components/dashboard/DashboardLayout';
import { auth } from '@/lib/firebaseConfig';
import { updateProfile } from 'firebase/auth';
import TableSkeleton from '../../_components/dashboard/TableSkeleton';

const SettingsPage = () => {
  const user = auth.currentUser;
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const [theme, setTheme] = useState('light');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDisplayName(user?.displayName || '');
    setPhotoURL(user?.photoURL || '');
    setLoading(false);
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      await updateProfile(user, { displayName, photoURL });
      alert('Profile updated!');
    } catch (error) {
      alert('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  // Theme switcher
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <DashboardLayout>
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">Profile Settings</h2>
        {loading ? (
          <div className="mb-8"><TableSkeleton /></div>
        ) : (
          <>
            <div className="flex items-center gap-4 mb-6">
              <img
                src={photoURL || '/default-avatar.png'}
                alt="Profile"
                className="w-16 h-16 rounded-full object-cover border"
              />
              <div>
                <div className="font-semibold text-lg">{user?.email}</div>
                <div className="text-gray-500 text-sm">{user?.uid}</div>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Display Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="border rounded px-3 py-2 w-full focus:outline-blue-400"
                aria-label="Display Name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Photo URL</label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="border rounded px-3 py-2 w-full focus:outline-blue-400"
                aria-label="Photo URL"
              />
            </div>
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold focus:outline-blue-400"
              onClick={handleSave}
              disabled={saving}
              aria-label="Save profile changes"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </>
        )}
        <hr className="my-8" />
        <h3 className="text-xl font-bold mb-2">Theme</h3>
        <div className="flex gap-4 mb-6">
          <button
            className={`px-4 py-2 rounded ${theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-200'} focus:outline-blue-400`}
            onClick={() => setTheme('light')}
            aria-label="Switch to light theme"
          >
            Light
          </button>
          <button
            className={`px-4 py-2 rounded ${theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-200'} focus:outline-blue-400`}
            onClick={() => setTheme('dark')}
            aria-label="Switch to dark theme"
          >
            Dark
          </button>
        </div>
        <h3 className="text-xl font-bold mb-2">Notification Preferences</h3>
        <div className="text-gray-500 mb-2">(Coming soon)</div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage; 