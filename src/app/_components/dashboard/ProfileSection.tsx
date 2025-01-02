import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaKey,
  FaLinkedin,
  FaInstagram,
  FaExternalLinkAlt,
  FaCamera,
  FaTrash,
} from "react-icons/fa";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useAuth } from "@lib/auth";
import { storage } from "@lib/firebaseConfig";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { Directory, Role, directoryHelpers } from "@/app/database/models";

const generateInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const ProfileSection = () => {
  const { user, isAdmin } = useAuth();
  const [profile, setProfile] = useState<Directory>({
    displayName: user.displayName || "",
    bio: "",
    linkedin: "",
    instagram: "",
    toplink: "",
    profilepic: user.photoURL || "",
    externalViewEnabled: false,
    role: Role.Shaper,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUserDetails = async () => {
      if (!user?.email) return;
      try {
        // Using the new directoryHelpers to get user profile
        const userProfile = await directoryHelpers.getById(user.email);
        if (userProfile) {
          setProfile((prev) => ({ ...prev, ...userProfile }));
        }
      } catch (error) {
        console.error("Error loading user details: ", error);
        toast.error("Failed to load profile details");
      }
    };

    loadUserDetails();
  }, [user?.email]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user?.email || !e.target.files?.[0]) return;
    setLoading(true);
    const file = e.target.files[0];

    try {
      const storageRef = ref(storage, `profileImages/${user.uid}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      // Update both local state and Firebase using directoryHelpers
      setProfile((prev) => ({ ...prev, profilepic: url }));
      await directoryHelpers.update(user.email, {
        profilepic: url,
      });

      toast.success("Profile image updated!");
    } catch (error) {
      console.error("Error uploading profile image: ", error);
      toast.error("Failed to upload profile image");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      if (profile.profilepic?.includes("firebasestorage")) {
        const storageRef = ref(storage, `profileImages/${user.uid}`);
        await deleteObject(storageRef);
      }

      // Update both local state and Firebase using directoryHelpers
      await directoryHelpers.update(user.email, {
        profilepic: "",
      });
      setProfile((prev) => ({ ...prev, profilepic: "" }));

      toast.success("Profile image removed!");
    } catch (error) {
      console.error("Error removing profile image: ", error);
      toast.error("Failed to remove profile image");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user?.email) return;
    setLoading(true);
    try {
      // Using directoryHelpers to update the profile
      await directoryHelpers.update(user.email, profile);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile: ", error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <Toaster />
      <h1 className="text-3xl font-bold mb-8 text-center">Your Profile</h1>

      <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-8">
        <div className="p-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {profile.profilepic ? (
                  <Image
                    src={profile.profilepic}
                    alt="Profile"
                    width={96}
                    height={96}
                    objectFit="cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-gray-400">
                    {generateInitials(profile.displayName || user?.email || "")}
                  </span>
                )}
              </div>
              <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer">
                <FaCamera className="text-gray-600" />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </label>
            </div>
            <div>
              <h2 className="text-2xl font-semibold">
                {profile.displayName || user?.email}
              </h2>
              <p className="text-sm opacity-75">{user?.email}</p>
              {isAdmin && (
                <span className="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full mt-1 inline-block">
                  Admin
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Display Name
            </label>
            <input
              type="text"
              name="displayName"
              value={profile.displayName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {["linkedin", "instagram", "toplink"].map((field) => (
            <div key={field} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                {field}
              </label>
              <div className="flex items-center">
                {field === "linkedin" && (
                  <FaLinkedin className="text-blue-600 mr-2" />
                )}
                {field === "instagram" && (
                  <FaInstagram className="text-pink-600 mr-2" />
                )}
                {field === "toplink" && (
                  <FaExternalLinkAlt className="text-gray-600 mr-2" />
                )}
                <input
                  type="url"
                  name={field}
                  value={String(profile[field as keyof Directory])}
                  onChange={handleChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder={`https://${field}.com/your-profile`}
                />
              </div>
            </div>
          ))}

          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              name="externalViewEnabled"
              checked={profile.externalViewEnabled}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-sm text-gray-700">
              Enable External View
            </label>
          </div>

          <button
            onClick={handleSaveProfile}
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleRemoveImage}
          className="text-red-600 hover:text-red-800 flex items-center justify-center mx-auto"
        >
          <FaTrash className="mr-2" /> Remove Profile Image
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileSection;
