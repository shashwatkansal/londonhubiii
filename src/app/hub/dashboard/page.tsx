// // /src/app/dashboard/page.tsx

export default function DashboardPage() {
  return <div></div>;
}

// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { FaKey, FaChartBar } from "react-icons/fa";
// import { useRouter } from "next/router";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// import { updateProfile } from "firebase/auth";
// import { useAuth } from "@lib/auth"; // Custom hook for auth context
// import { db, storage } from "@lib/firebaseConfig"; // Firebase configuration
// import { requireAuth } from "@lib/requireAuth"; // Adjust the path if necessary

// function DashboardPage() {
//   const { user } = useAuth();
//   const [activeTab, setActiveTab] = useState("profile");
//   const [displayName, setDisplayName] = useState(user.displayName || "");
//   const [nickname, setNickname] = useState("");
//   const [bio, setBio] = useState("");
//   const [profileImageUrl, setProfileImageUrl] = useState(user.photoURL || "");
//   const [profileImage, setProfileImage] = useState<File | null>(null);
//   const router = useRouter();

//   // Load user details from Firestore
//   useEffect(() => {
//     const loadUserDetails = async () => {
//       try {
//         const docRef = doc(db, "users", user.uid);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           const userData = docSnap.data();
//           setNickname(userData.nickname || "");
//           setBio(userData.bio || "");
//         }
//       } catch (error) {
//         console.error("Error loading user details: ", error);
//       }
//     };

//     loadUserDetails();
//   }, [user.uid]);

//   // Handle profile image upload
//   const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const file = e.target.files[0];
//       setProfileImage(file);
//       setProfileImageUrl(URL.createObjectURL(file));
//     }
//   };

//   // Handle profile update
//   const handleProfileUpdate = async () => {
//     try {
//       let updatedProfileImageUrl = profileImageUrl;

//       if (profileImage) {
//         const storageRef = ref(storage, `profileImages/${user.uid}`);
//         await uploadBytes(storageRef, profileImage);
//         updatedProfileImageUrl = await getDownloadURL(storageRef);
//         setProfileImageUrl(updatedProfileImageUrl);
//       }

//       // Update Firebase Auth profile
//       await updateProfile(user, {
//         displayName: displayName,
//         photoURL: updatedProfileImageUrl,
//       });

//       // Update Firestore with additional user details
//       await setDoc(
//         doc(db, "users", user.uid),
//         {
//           nickname: nickname,
//           bio: bio,
//         },
//         { merge: true }
//       );

//       // Show success toast
//       showToast("Profile updated successfully!", "success");
//       router.reload();
//     } catch (error) {
//       console.error("Error updating profile: ", error);
//       showToast("Failed to update profile.", "error");
//     }
//   };

//   // Format the date strings
//   const formatDate = (timestamp: string) => {
//     const date = new Date(parseInt(timestamp, 10));
//     return date.toLocaleDateString() + " " + date.toLocaleTimeString();
//   };

//   // Function to show toast notifications
//   const showToast = (message: string, type: "success" | "error") => {
//     const toastId = `toast-${Math.random()}`;
//     const toastElement = document.createElement("div");
//     toastElement.id = toastId;
//     toastElement.className = `toast toast-${type}`;
//     toastElement.innerText = message;
//     document.body.appendChild(toastElement);
//     setTimeout(() => {
//       toastElement.remove();
//     }, 3000); // Automatically remove toast after 3 seconds
//   };

//   return (
//     <div className="container mx-auto p-6">
//       {/* Tabs */}
//       <div className="tabs mb-6">
//         <a
//           className={`tab tab-lifted ${
//             activeTab === "profile" ? "tab-active" : ""
//           }`}
//           onClick={() => setActiveTab("profile")}
//         >
//           Profile
//         </a>
//         <a
//           className={`tab tab-lifted ${
//             activeTab === "analytics" ? "tab-active" : ""
//           }`}
//           onClick={() => setActiveTab("analytics")}
//         >
//           Analytics
//         </a>
//         <a
//           className={`tab tab-lifted ${
//             activeTab === "calendar" ? "tab-active" : ""
//           }`}
//           onClick={() => setActiveTab("calendar")}
//         >
//           Calendar
//         </a>
//       </div>

//       {/* Tab Contents */}
//       {activeTab === "profile" && (
//         <div>
//           {/* User Information Section */}
//           <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
//             <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
//             <div className="flex items-center space-x-4">
//               <div className="relative">
//                 <label htmlFor="profileImage">
//                   <Image
//                     src={profileImageUrl || "/default-profile.png"}
//                     alt="Profile"
//                     width={80}
//                     height={80}
//                     className="rounded-full cursor-pointer"
//                   />
//                 </label>
//                 <input
//                   id="profileImage"
//                   type="file"
//                   className="hidden"
//                   accept="image/*"
//                   onChange={handleImageUpload}
//                 />
//               </div>
//               <div className="flex-1">
//                 <p className="text-lg font-semibold">{user.email}</p>
//                 <p className="text-gray-600">
//                   <FaKey className="inline mr-2" /> User ID: {user.uid}
//                 </p>
//                 <p className="text-gray-600">
//                   Last Login: {formatDate(user.metadata.lastLoginAt)}
//                 </p>
//                 <p className="text-gray-600">
//                   Account Created: {formatDate(user.metadata.creationTime)}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Profile Update Form */}
//           <div className="bg-white shadow-lg rounded-lg p-6">
//             <h3 className="text-xl font-bold mb-4">Update Profile</h3>
//             <div className="form-control mb-4">
//               <label className="label">
//                 <span className="label-text">Display Name</span>
//               </label>
//               <input
//                 type="text"
//                 value={displayName}
//                 onChange={(e) => setDisplayName(e.target.value)}
//                 className="input input-bordered w-full"
//               />
//             </div>
//             <div className="form-control mb-4">
//               <label className="label">
//                 <span className="label-text">Nickname</span>
//               </label>
//               <input
//                 type="text"
//                 value={nickname}
//                 onChange={(e) => setNickname(e.target.value)}
//                 className="input input-bordered w-full"
//               />
//             </div>
//             <div className="form-control mb-4">
//               <label className="label">
//                 <span className="label-text">Bio</span>
//               </label>
//               <textarea
//                 value={bio}
//                 onChange={(e) => setBio(e.target.value)}
//                 className="textarea textarea-bordered w-full"
//                 placeholder="Tell us about yourself"
//               ></textarea>
//             </div>
//             <button
//               onClick={handleProfileUpdate}
//               className="btn btn-primary w-full"
//             >
//               Update Profile
//             </button>
//           </div>
//         </div>
//       )}

//       {activeTab === "analytics" && (
//         <div>
//           {/* Analytics Dashboard Section */}
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {/* Card 1 */}
//             <div className="card bg-base-100 shadow-lg">
//               <div className="card-body">
//                 <h2 className="card-title">
//                   <FaChartBar className="text-blue-500" /> Total Users
//                 </h2>
//                 <p className="text-2xl font-bold">1,234</p>
//                 <p className="text-gray-600">Increased by 20% this month</p>
//               </div>
//             </div>

//             {/* Card 2 */}
//             <div className="card bg-base-100 shadow-lg">
//               <div className="card-body">
//                 <h2 className="card-title">Engagement Rate</h2>
//                 <p className="text-2xl font-bold">75%</p>
//                 <p className="text-gray-600">Stable compared to last month</p>
//               </div>
//             </div>

//             {/* Card 3 */}
//             <div className="card bg-base-100 shadow-lg">
//               <div className="card-body">
//                 <h2 className="card-title">Monthly Revenue</h2>
//                 <p className="text-2xl font-bold">$12,345</p>
//                 <p className="text-gray-600">Decreased by 5% this month</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {activeTab === "calendar" && (
//         <div className="bg-white shadow-lg rounded-lg p-6">
//           <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
//           <div className="overflow-hidden rounded-lg">
//             <iframe
//               src="https://calendar.google.com/calendar/embed?src=bG9uZG9uc2hhcGVyc2lpaUBnbWFpbC5jb20&ctz=Europe/London&mode=AGENDA"
//               style={{ border: 0 }}
//               width="100%"
//               height="600"
//               frameBorder="0"
//               scrolling="no"
//               className="rounded-lg"
//             ></iframe>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default requireAuth(DashboardPage);
