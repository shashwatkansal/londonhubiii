import { useState, useEffect } from "react";
import Image from "next/image";
import { FaKey } from "react-icons/fa";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { useAuth } from "@lib/auth"; // Custom hook for auth context
import { db, storage } from "@lib/firebaseConfig"; // Firebase configuration

const ProfileSection = () => {
  const { user } = useAuth();
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState(user.photoURL || "");
  const [profileImage, setProfileImage] = useState<File | null>(null);

  useEffect(() => {
    const loadUserDetails = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          setNickname(userData.nickname || "");
          setBio(userData.bio || "");
        }
      } catch (error) {
        console.error("Error loading user details: ", error);
      }
    };

    loadUserDetails();
  }, [user.uid]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfileImage(file);
      setProfileImageUrl(URL.createObjectURL(file));
    }
  };

  const handleProfileUpdate = async () => {
    try {
      let updatedProfileImageUrl = profileImageUrl;

      if (profileImage) {
        const storageRef = ref(storage, `profileImages/${user.uid}`);
        await uploadBytes(storageRef, profileImage);
        updatedProfileImageUrl = await getDownloadURL(storageRef);
        setProfileImageUrl(updatedProfileImageUrl);
      }

      await updateProfile(user, {
        displayName: displayName,
        photoURL: updatedProfileImageUrl,
      });

      await setDoc(
        doc(db, "users", user.uid),
        {
          nickname: nickname,
          bio: bio,
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
        <div className="flex items-center space-x-4">
          <div className="relative">
            <label htmlFor="profileImage">
              <Image
                src={profileImageUrl || "/default-profile.png"}
                alt="Profile"
                width={80}
                height={80}
                className="rounded-full cursor-pointer"
              />
            </label>
            <input
              id="profileImage"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>
          <div className="flex-1">
            <p className="text-lg font-semibold">{user.email}</p>
            <p className="text-gray-600">
              <FaKey className="inline mr-2" /> User ID: {user.uid}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Update Profile</h3>
        <div className="form-control mb-4">
          <label className="label">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">Nickname</label>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="textarea textarea-bordered w-full"
          ></textarea>
        </div>
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
