import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaKey,
  FaLinkedin,
  FaInstagram,
  FaExternalLinkAlt,
} from "react-icons/fa";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { useAuth } from "@lib/auth"; // Custom hook for auth context
import { db, storage } from "@lib/firebaseConfig"; // Firebase Firestore and Storage configuration
import toast, { Toaster } from "react-hot-toast"; // Import react-hot-toast

// Helper function to generate initials from a name
const generateInitials = (name: string) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  return initials.length > 2 ? initials.slice(0, 2) : initials; // Max 2 initials
};

const ProfileSection = () => {
  const { user, isAdmin } = useAuth();
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [bio, setBio] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [toplink, setToplink] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState(user.photoURL || "");
  const [profileImage, setProfileImage] = useState<File | null>(null); // State for profile image file
  const [externalViewEnabled, setExternalViewEnabled] = useState(false); // External view state

  const email = user.email; // Use user's email as the document key

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const docRef = doc(db, "directory", email);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setDisplayName(userData.name || "");
          setBio(userData.bio || "");
          setLinkedin(userData.linkedin || "");
          setInstagram(userData.instagram || "");
          setToplink(userData.toplink || "");
          setExternalViewEnabled(userData.externalViewEnabled || false); // Load external visibility status
          setProfileImageUrl(userData.profilepic || user.photoURL || "");
        }
      } catch (error) {
        console.error("Error loading user details: ", error);
      }
    };

    if (email) {
      loadUserDetails();
    }
  }, [email, user.photoURL]);

  // Function to handle image upload and autosave
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);

      try {
        // Upload image to Firebase Storage
        const storageRef = ref(storage, `profileImages/${user.uid}`);
        await uploadBytes(storageRef, file);
        const updatedProfileImageUrl = await getDownloadURL(storageRef);
        setProfileImageUrl(updatedProfileImageUrl);

        // Save new profile picture URL to Firestore
        await setDoc(
          doc(db, "directory", email),
          { profilepic: updatedProfileImageUrl },
          { merge: true }
        );

        // Show success toast
        toast.success("Profile image updated!", {
          style: {
            borderRadius: "10px",
            background: "#4caf50",
            color: "#fff",
          },
        });
      } catch (error) {
        console.error("Error uploading profile image: ", error);
        toast.error(`Failed to upload profile image: ${error}`, {
          style: {
            borderRadius: "10px",
            background: "#f44336",
            color: "#fff",
          },
        });
      }
    }
  };

  // Function to save profile details (text fields) to Firestore
  const handleSaveProfile = async () => {
    try {
      await updateDoc(doc(db, "directory", email), {
        name: displayName,
        bio: bio,
        linkedin: linkedin,
        instagram: instagram,
        toplink: toplink,
      });

      toast.success("Profile details updated!", {
        style: {
          borderRadius: "10px",
          background: "#4caf50",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Error updating profile details: ", error);
      toast.error(`Failed to update profile details: ${error}`, {
        style: {
          borderRadius: "10px",
          background: "#f44336",
          color: "#fff",
        },
      });
    }
  };

  // Function to handle removing the profile image
  const handleRemoveImage = async () => {
    try {
      if (profileImageUrl && profileImageUrl.includes("firebasestorage")) {
        const storageRef = ref(storage, `profileImages/${user.uid}`);
        await deleteObject(storageRef);
      }

      await updateDoc(doc(db, "directory", email), {
        profilepic: null,
      });

      setProfileImageUrl("");
      toast.success("Profile image removed!", {
        style: {
          borderRadius: "10px",
          background: "#4caf50",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Error removing profile image: ", error);
      toast.error(`Failed to remove profile image: ${error}`, {
        style: {
          borderRadius: "10px",
          background: "#f44336",
          color: "#fff",
        },
      });
    }
  };

  // Function to handle toggling the external visibility
  const handleExternalVisibilityToggle = async (enabled: boolean) => {
    try {
      await updateDoc(doc(db, "directory", email), {
        externalViewEnabled: enabled,
      });

      setExternalViewEnabled(enabled);
      toast.success(
        `Profile ${enabled ? "is now" : "is no longer"} externally visible.`,
        {
          style: {
            borderRadius: "10px",
            background: "#4caf50",
            color: "#fff",
          },
        }
      );
    } catch (error) {
      console.error("Error updating external visibility: ", error);
      toast.error(`Failed to update visibility: ${error}`, {
        style: {
          borderRadius: "10px",
          background: "#f44336",
          color: "#fff",
        },
      });
    }
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <Toaster />

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">Your Profile</h2>

        <p className="text-gray-600 mb-4 text-sm sm:text-base">
          This is your profile page. The information below is used for both
          internal and external directories.
          <br />
          <strong>Note:</strong> Enabling the external view makes your profile
          accessible to others outside the organization. This is optional.
        </p>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 rounded-full overflow-hidden shadow-md flex items-center justify-center">
              {profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full bg-gray-400 rounded-full text-white text-2xl sm:text-4xl font-bold">
                  {generateInitials(displayName || user.email)}
                </div>
              )}
            </div>

            <label className="block mt-4">
              <span className="sr-only">Choose a profile photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="block w-full text-sm text-gray-500 
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100
                  cursor-pointer"
              />
            </label>

            {profileImageUrl && (
              <button
                onClick={handleRemoveImage}
                className="mt-4 text-red-600 hover:text-red-800 underline text-sm sm:text-base"
              >
                Remove Profile Image
              </button>
            )}
          </div>

          <div className="flex-1 text-center sm:text-left">
            <p className="text-md sm:text-lg font-semibold">
              {email}
              <span className="text-xs sm:text-sm text-gray-500 ml-2">
                {isAdmin && "Admin"}
              </span>
            </p>
            <p className="text-gray-600 text-sm sm:text-base">
              <FaKey className="inline mr-2" /> User ID: {user.uid}
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Don't share this key with anyone else. This is your unique user
                ID.
              </p>
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
        <h3 className="text-lg sm:text-xl font-bold mb-4">
          External Profile Visibility
        </h3>
        <div className="flex items-center space-x-4">
          <label className="cursor-pointer label">
            <span className="label-text pr-2 text-sm sm:text-base">
              Enable External View
            </span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={externalViewEnabled}
              onChange={(e) => handleExternalVisibilityToggle(e.target.checked)}
            />
          </label>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-lg sm:text-xl font-bold mb-4">Update Profile</h3>

        <div className="form-control mb-4">
          <label className="label text-sm sm:text-base">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>

        <div className="form-control mb-4">
          <label className="label text-sm sm:text-base">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>

        <div className="form-control mb-4">
          <label className="label text-sm sm:text-base">LinkedIn</label>
          <div className="flex items-center space-x-2">
            <FaLinkedin className="text-blue-700 text-2xl sm:text-3xl" />
            <input
              type="url"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="input input-bordered w-full"
              placeholder="https://linkedin.com/in/your-profile"
            />
          </div>
        </div>

        <div className="form-control mb-4">
          <label className="label text-sm sm:text-base">Instagram</label>
          <div className="flex items-center space-x-2">
            <FaInstagram className="text-pink-600 text-2xl sm:text-3xl" />
            <input
              type="url"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="input input-bordered w-full"
              placeholder="https://instagram.com/your-profile"
            />
          </div>
        </div>

        <div className="form-control mb-4">
          <label className="label text-sm sm:text-base">TopLink</label>
          <div className="flex items-center space-x-2">
            <FaExternalLinkAlt className="text-gray-600 text-2xl" />
            <input
              type="url"
              value={toplink}
              onChange={(e) => setToplink(e.target.value)}
              className="input input-bordered w-full"
              placeholder="https://my.weforum.org/network/people/your-profile"
            />
          </div>
        </div>

        <button
          onClick={handleSaveProfile}
          className="btn btn-primary w-full mt-4"
        >
          Save Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileSection;
