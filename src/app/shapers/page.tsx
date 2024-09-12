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
                className={`bg-white shadow-xl rounded-lg p-8 hover:shadow-2xl duration-500 transform transition-transform ${
                  expandedIndex === index ? "scale-105" : "hover:scale-105"
                } cursor-pointer relative group`}
                onClick={() => toggleExpand(index)}
              >
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <Image
                      src={shaper.profilepic!}
                      alt={shaper.name}
                      width={120}
                      height={120}
                      className="rounded-full object-cover border-4 border-blue-200 group-hover:border-blue-500 transition-border duration-500"
                    />
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-2 transition-colors duration-300 group-hover:text-blue-600">
                    {shaper.name}
                  </h2>

                  <p
                    className={`text-gray-600 text-center mb-4 transition-opacity duration-300 ${
                      expandedIndex === index
                        ? "opacity-100"
                        : "group-hover:opacity-80"
                    }`}
                  >
                    {expandedIndex === index
                      ? shaper.bio // Show full bio when card is expanded
                      : shaper.bio.length > 100
                      ? shaper.bio.slice(0, 100) + "..."
                      : shaper.bio}
                  </p>

                  <div className="flex space-x-4 mt-4">
                    {shaper.linkedin && (
                      <a
                        href={shaper.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-700 text-2xl transition-transform transform hover:scale-110"
                      >
                        <FaLinkedin />
                      </a>
                    )}
                    {shaper.instagram && (
                      <a
                        href={shaper.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-pink-500 hover:text-pink-600 text-2xl transition-transform transform hover:scale-110"
                      >
                        <FaInstagram />
                      </a>
                    )}
                    {shaper.toplink && (
                      <a
                        href={shaper.toplink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-gray-700 text-2xl transition-transform transform hover:scale-110"
                      >
                        <FaExternalLinkAlt />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
