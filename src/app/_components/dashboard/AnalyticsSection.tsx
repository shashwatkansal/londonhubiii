"use client";
import { useState, useEffect } from "react";
import { FaUserCheck, FaClock } from "react-icons/fa";
import { auth } from "@lib/firebaseConfig"; // Firebase Auth configuration
import { onAuthStateChanged, getAuth, User } from "firebase/auth";

interface UserData {
  email: string;
  lastLogin: string;
  isPresent: boolean; // For demonstration purposes; custom implementation needed
}

const AnalyticsSection = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsersFromAuth = async () => {
      try {
        const auth = getAuth(); // Initialize Firebase Auth
        const currentUser = auth.currentUser;

        if (currentUser) {
          const lastLoginTime = new Date(
            parseInt(currentUser.metadata.lastSignInTime || "0")
          ).toLocaleString();

          // Mocking an active presence check
          const isPresent = true; // This would be based on real-time updates to Firestore or other logic

          const userData: UserData = {
            email: currentUser.email || "Unknown",
            lastLogin: lastLoginTime,
            isPresent,
          };

          setUsers([userData]); // Assuming only current logged in user for now
        }
      } catch (error) {
        console.error("Error fetching users from Firebase Auth:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsersFromAuth();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Loading state */}
      {loading ? (
        <p className="text-center text-lg">Loading user data...</p>
      ) : (
        <>
          {/* Display present users */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">
                <FaUserCheck className="text-blue-500" /> Users Present
              </h2>
              <ul className="list-disc pl-5">
                {users
                  .filter((user) => user.isPresent)
                  .map((user, index) => (
                    <li key={index} className="text-lg">
                      {user.email}
                    </li>
                  ))}
              </ul>
              {users.filter((user) => user.isPresent).length === 0 && (
                <p className="text-gray-600">No users currently present</p>
              )}
            </div>
          </div>

          {/* Display last login for users */}
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="card-title">
                <FaClock className="text-blue-500" /> Last Login Times
              </h2>
              <ul className="list-disc pl-5">
                {users.map((user, index) => (
                  <li key={index} className="text-lg">
                    {user.email}: {user.lastLogin}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AnalyticsSection;
