"use client";
import { useState, useEffect } from "react";
import { db } from "@lib/firebaseConfig"; // Import the firebase config for accessing Firestore
import { getDocs, collection, query, where } from "firebase/firestore";
import Image from "next/image";
import { FaLinkedin, FaInstagram, FaExternalLinkAlt } from "react-icons/fa";

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

export default function ShapersPage() {
  const [shapers, setShapers] = useState<Shaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null); // Track which card is expanded

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
        console.error("Error fetching shapers: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchShapers();
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index); // Toggle expanded card
  };

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
              <div
                key={index}
                className={`relative bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl duration-500 transform transition-transform ${
                  expandedIndex === index ? "scale-105" : "hover:scale-105"
                } cursor-pointer`}
                onClick={() => toggleExpand(index)}
              >
                {/* Profile Image */}
                <div className="relative w-full h-64">
                  <Image
                    src={shaper.profilepic!}
                    alt={shaper.name}
                    layout="fill"
                    objectFit="cover"
                    className="object-cover"
                    quality={90} // Improve image quality
                  />
                  {/* Role Tag */}
                  <div className="absolute top-4 left-4 bg-wef-blue text-white text-sm px-4 py-1 rounded-full shadow-lg z-50 uppercase font-bold tracking-wide">
                    {shaper.role}
                  </div>
                  {/* Overlay for Text */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
                    <h2 className="text-white text-2xl font-bold mb-1">
                      {shaper.name}
                    </h2>
                    <p className="text-white text-sm">{shaper.role}</p>
                  </div>
                </div>

                {/* Expanded Bio */}
                {expandedIndex === index && (
                  <div className="bg-white p-4">
                    <p className="text-gray-700">
                      {shaper.bio} {/* Full bio shown when expanded */}
                    </p>
                  </div>
                )}

                {/* Social Links */}
                <div className="absolute top-4 right-4 flex space-x-2">
                  {shaper.linkedin && (
                    <a
                      href={shaper.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-blue-600 rounded-full p-2 hover:bg-blue-700"
                    >
                      <FaLinkedin />
                    </a>
                  )}
                  {shaper.instagram && (
                    <a
                      href={shaper.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-pink-500 rounded-full p-2 hover:bg-pink-600"
                    >
                      <FaInstagram />
                    </a>
                  )}
                  {shaper.toplink && (
                    <a
                      href={shaper.toplink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white bg-gray-500 rounded-full p-2 hover:bg-gray-600"
                    >
                      <FaExternalLinkAlt />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
