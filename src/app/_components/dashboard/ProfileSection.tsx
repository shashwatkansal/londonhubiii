import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaKey,
  FaLinkedin,
  FaInstagram,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useAuth } from "@lib/auth"; // Custom hook for auth context
import { db } from "@lib/firebaseConfig"; // Firebase configuration

const ProfileSection = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState(user.email || "");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [toplink, setToplink] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState(
    user.photoURL || "/default-profile.png"
  );
  const [externalViewEnabled, setExternalViewEnabled] = useState(false);

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setDisplayName(userData.name || "");
          setBio(userData.bio || "");
          setEmail(userData.email || user.email || "");
          setLinkedin(userData.linkedin || "");
          setInstagram(userData.instagram || "");
          setToplink(userData.toplink || "");
          setExternalViewEnabled(userData.externalViewEnabled || false);
          setProfileImageUrl(
            userData.profilepic || user.photoURL || "/default-profile.png"
          );
        }
      } catch (error) {
        console.error("Error loading user details: ", error);
      }
    };

    loadUserDetails();
  }, [user.uid, user.email, user.photoURL]);

  const handleProfileUpdate = async () => {
    try {
      // Update Firestore document
      await setDoc(
        doc(db, "users", user.uid),
        {
          name: displayName,
          bio: bio,
          linkedin: linkedin,
          instagram: instagram,
          toplink: toplink,
          externalViewEnabled: externalViewEnabled,
        },
        { merge: true }
      );

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile: ", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div>
      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold mb-4">Your Profile</h2>

        {/* Profile Page Description */}
        <p className="text-gray-600 mb-4">
          This is your profile page. The information below is used for both
          internal and external directories.
          <br />
          <strong>Note:</strong> Enabling the external view makes your profile
          accessible to others outside the organization. This is optional.
        </p>

        <div className="flex items-center space-x-4">
          <div className="relative">
            {/* Profile Image from Google Sign-In */}
            <Image
              src={profileImageUrl}
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full"
            />
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold">{email}</p>
            <p className="text-gray-600">
              <FaKey className="inline mr-2" /> User ID: {user.uid}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Update Profile</h3>

        {/* Display Name */}
        <div className="form-control mb-4">
          <label className="label">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        {/* Bio */}
        <div className="form-control mb-4">
          <label className="label">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        {/* Email (Disabled) */}
        <div className="form-control mb-4">
          <label className="label">Email</label>
          <input
            type="email"
            value={email}
            className="input input-bordered w-full"
            disabled
          />
        </div>

        {/* LinkedIn */}
        <div className="form-control mb-4">
          <label className="label">LinkedIn</label>
          <div className="flex items-center space-x-2">
            <FaLinkedin className="text-blue-700 text-3xl" />
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="input input-bordered w-full"
              placeholder="https://linkedin.com/in/your-profile"
            />
          </div>
        </div>

        {/* Instagram */}
        <div className="form-control mb-4">
          <label className="label">Instagram</label>
          <div className="flex items-center space-x-2">
            <FaInstagram className="text-pink-600 text-3xl" />
            <input
              type="url"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="input input-bordered w-full"
              placeholder="https://instagram.com/your-profile"
            />
          </div>
        </div>

        {/* TopLink */}
        <div className="form-control mb-4">
          <label className="label">TopLink</label>
          <div className="flex items-center space-x-2">
            <FaExternalLinkAlt className="text-gray-600 text-2xl" />
            <input
              type="url"
              value={toplink}
              onChange={(e) => setToplink(e.target.value)}
              className="input input-bordered w-full"
              placeholder="https://toplink.com/your-profile"
            />
          </div>
        </div>

        {/* External View Option */}
        <div className="form-control mb-4">
          <label className="label">Enable External Directory View</label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={externalViewEnabled}
                onChange={() => setExternalViewEnabled(true)}
                className="radio radio-primary"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                checked={!externalViewEnabled}
                onChange={() => setExternalViewEnabled(false)}
                className="radio radio-primary"
              />
              <span>No</span>
            </label>
          </div>
        </div>

        {/* Update Button */}
        <button
          onClick={handleProfileUpdate}
          className="btn btn-primary w-full"
        >
          Update Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
