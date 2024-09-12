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

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-900">
          Meet Our Shapers
        </h1>
        {/* Loading state */}
        {loading ? (
          <div className="flex justify-center items-center">
            <p className="text-xl text-gray-600">Loading Shapers...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {shapers.map((shaper, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex flex-col items-center">
                  <Image
                    src={shaper.profilepic!}
                    alt={shaper.name}
                    width={120}
                    height={120}
                    className="rounded-full mb-4"
                  />
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    {shaper.name}
                  </h2>
                  <p className="text-gray-600 text-center mb-4">
                    {shaper.bio.length > 100
                      ? shaper.bio.slice(0, 100) + "..."
                      : shaper.bio}
                  </p>
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
