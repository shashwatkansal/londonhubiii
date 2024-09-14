"use client";
import { db } from "@lib/firebaseConfig"; // Firebase Firestore configuration
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { FaExternalLinkAlt, FaInstagram, FaLinkedin } from "react-icons/fa";

// Modal Component
const Modal = ({
  shaper,
  onClose,
}: {
  shaper: Shaper;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null); // Ref to the modal content

  // Handle click outside modal content to close the modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose(); // Close modal when clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Attach event listener

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up event listener
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6 relative"
        ref={modalRef} // Attach the modal content to the ref
      >
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
        {/* Modal Content */}
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          {isGoogleDriveUrl(shaper.profilepic!) ? (
            <iframe
              src={convertDriveUrlToDirect(shaper.profilepic!)}
              frameBorder="0"
              allow="autoplay"
              className="w-full h-64 object-cover mb-4"
            />
          ) : (
            <img
              src={shaper.profilepic!}
              alt={shaper.name}
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
          )}
          <h2 className="text-2xl font-bold mb-2">{shaper.name}</h2>
          <p className="text-gray-600 mb-4">{shaper.role}</p>
          <p className="text-gray-700 mb-4 text-center">{shaper.bio}</p>

          {/* Social Links */}
          <div className="flex space-x-4">
            {shaper.linkedin && (
              <a
                href={shaper.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 text-2xl"
              >
                <FaLinkedin />
              </a>
            )}
            {shaper.instagram && (
              <a
                href={shaper.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-500 hover:text-pink-600 text-2xl"
              >
                <FaInstagram />
              </a>
            )}
            {shaper.toplink && (
              <a
                href={shaper.toplink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-700 text-2xl"
              >
                <FaExternalLinkAlt />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions for handling Google Drive URLs
const isGoogleDriveUrl = (url: string) => url.includes("drive.google.com");

const convertDriveUrlToDirect = (url: string) => {
  const fileIdMatch = url.match(/(?:\/file\/d\/|id=)([\w-]+)/); // Match the file ID from the URL
  const id = fileIdMatch ? fileIdMatch[1] : null;
  return id ? `https://drive.google.com/file/d/${id}/preview?autoplay=1` : url;
};

interface Shaper {
  name: string;
  bio: string;
  email: string;
  linkedin: string;
  instagram?: string;
  toplink?: string;
  profilepic?: string;
  role?: string; // Role (if defined)
  externalViewEnabled: boolean;
}

const ShaperCard = ({
  shaper,
  onClick,
}: {
  shaper: Shaper;
  onClick: () => void;
}) => {
  return (
    <div
      className={`relative bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl duration-500 transform transition-transform hover:scale-105 cursor-pointer`}
      onClick={onClick} // Open the modal on click
    >
      {/* Profile Image or Google Drive iframe */}
      <div className="relative w-full h-64">
        {isGoogleDriveUrl(shaper.profilepic!) ? (
          <iframe
            src={convertDriveUrlToDirect(shaper.profilepic!)}
            frameBorder="0"
            allow="autoplay"
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={shaper.profilepic!}
            alt={shaper.name}
            className="w-full h-full object-cover"
          />
        )}
        {/* Role Tag */}
        <div className="absolute top-4 left-4 bg-wef-blue text-white text-sm px-4 py-1 rounded-full shadow-lg z-50 uppercase font-bold tracking-wide">
          {shaper.role}
        </div>
        {/* Overlay for Text */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
          <h2 className="text-white text-2xl font-bold mb-1">{shaper.name}</h2>
          <p className="text-white text-sm">{shaper.role}</p>
        </div>
      </div>
    </div>
  );
};

// Main ShapersPage Component
export default function ShapersPage() {
  const [shapers, setShapers] = useState<Shaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedShaper, setSelectedShaper] = useState<Shaper | null>(null); // Track selected shaper for the modal

  // Fetch the shapers data from the "directory" collection where externalViewEnabled is true
  useEffect(() => {
    const fetchShapers = async () => {
      try {
        const shapersQuery = query(
          collection(db, "directory"),
          where("externalViewEnabled", "==", true) // Only fetch profiles with externalViewEnabled set to true
        );
        const querySnapshot = await getDocs(shapersQuery);
        const shapersData: Shaper[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          shapersData.push({
            name: data.name || "Unknown",
            bio: data.bio || "No bio available",
            email: data.email,
            linkedin: data.linkedin || "",
            instagram: data.instagram || "",
            toplink: data.toplink || "",
            profilepic: data.profilepic || "/default-profile.png", // Default image
            role: data.role || "Shaper", // Default to "Shaper" if no role is defined
            externalViewEnabled: data.externalViewEnabled || false,
          });
        });
        setShapers(shapersData);
      } catch (error) {
        console.error("Error fetching shapers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShapers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 py-10">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 text-blue-900 animate-fade-in-down transition-transform duration-200">
          Meet Our Shapers
        </h1>

        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center items-center">
            <p className="text-xl text-gray-600">Loading Shapers...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {shapers.map((shaper, index) => (
              <ShaperCard
                key={index}
                shaper={shaper}
                onClick={() => setSelectedShaper(shaper)}
              />
            ))}
          </div>
        )}

        {/* Modal for showing full profile */}
        {selectedShaper && (
          <Modal
            shaper={selectedShaper}
            onClose={() => setSelectedShaper(null)}
          />
        )}
      </div>
    </div>
  );
}
