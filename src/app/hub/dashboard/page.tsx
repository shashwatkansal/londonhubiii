// /src/app/dashboard/page.tsx
"use client";
import { requireAuth } from "@lib/requireAuth"; // Adjust the path if necessary
import { useAuth } from "@lib/auth"; // Custom hook for auth context
import Image from "next/image";
import { FaUserCircle, FaEnvelope, FaPhone, FaKey } from "react-icons/fa";

function DashboardPage() {
  const { user } = useAuth();

  // Format the date strings
  const formatDate = (timestamp: string) => {
    const date = new Date(parseInt(timestamp, 10));
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  return (
    <div className="container mx-auto p-6">
      {/* User Information Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
        <div className="flex items-center space-x-4">
          {user.photoURL ? (
            <Image
              src={user.photoURL}
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full"
            />
          ) : (
            <FaUserCircle size={80} className="text-gray-500" />
          )}
          <div>
            <p className="text-lg font-semibold">
              {user.displayName || user.email}
            </p>
            <p className="text-gray-600">
              <FaEnvelope className="inline mr-2" /> {user.email}
            </p>
            {user.phoneNumber && (
              <p className="text-gray-600">
                <FaPhone className="inline mr-2" /> {user.phoneNumber}
              </p>
            )}
            <p className="text-gray-600">
              <FaKey className="inline mr-2" /> User ID: {user.uid}
            </p>
            <p className="text-gray-600">
              Email Verified: {user.emailVerified ? "Yes" : "No"}
            </p>
            <p className="text-gray-600">
              Last Login: {formatDate(user.metadata.lastLoginAt)}
            </p>
            <p className="text-gray-600">
              Account Created: {formatDate(user.metadata.creationTime)}
            </p>
            {user.providerData.length > 0 && (
              <div className="mt-4">
                <h4 className="font-semibold">Sign-in Providers:</h4>
                <ul className="list-disc list-inside">
                  {user.providerData.map((provider, index) => (
                    <li key={index} className="text-gray-600">
                      {provider.providerId}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Analytics Dashboard Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card 1 */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Total Users</h2>
            <p className="text-2xl font-bold">1,234</p>
            <p className="text-gray-600">Increased by 20% this month</p>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Engagement Rate</h2>
            <p className="text-2xl font-bold">75%</p>
            <p className="text-gray-600">Stable compared to last month</p>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">
            <h2 className="card-title">Monthly Revenue</h2>
            <p className="text-2xl font-bold">$12,345</p>
            <p className="text-gray-600">Decreased by 5% this month</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default requireAuth(DashboardPage);
