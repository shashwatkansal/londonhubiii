"use client";
import { db } from "@lib/firebaseConfig";
import { collection, getDocs, query, where, CollectionReference } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { FaExternalLinkAlt, FaInstagram, FaLinkedin } from "react-icons/fa";
import * as SETTINGS from "@/lib/settings";
import { TEXTS } from "@/lib/texts";
import type { User } from "@/app/database/models";
import { userConverter } from "@/app/database/models";
import Image from "next/image";

const Modal = ({
  shaper,
  onClose,
}: {
  shaper: User;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 p-6 relative"
        ref={modalRef}
      >
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="flex flex-col items-center">
          {isGoogleDriveUrl(shaper.profilepic!) ? (
            <iframe
              src={convertDriveUrlToDirect(shaper.profilepic!)}
              frameBorder="0"
              allow="autoplay"
              className="w-full h-64 object-cover mb-4"
            />
          ) : (
            <Image
              src={shaper.profilepic!}
              alt={shaper.name}
              width={128}
              height={128}
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
          )}
          <h2 className="text-2xl font-bold mb-2">{shaper.name}</h2>
          <p className="text-gray-600 mb-4">{shaper.role}</p>
          <p className="text-gray-700 mb-4 text-center">{shaper.bio}</p>

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

const isGoogleDriveUrl = (url: string) => url.includes("drive.google.com");

const convertDriveUrlToDirect = (url: string) => {
  const fileIdMatch = url.match(/(?:\/file\/d\/|id=)([\w-]+)/);
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
  role?: string;
  externalViewEnabled: boolean;
}

const ShaperCard = ({
  shaper,
  onClick,
}: {
  shaper: User;
  onClick: () => void;
}) => {
  return (
    <div
      className={`relative bg-white shadow-xl rounded-lg overflow-hidden hover:shadow-2xl duration-500 transform transition-transform hover:scale-105 cursor-pointer`}
      onClick={onClick}
    >
      <div className="relative w-full h-64">
        {isGoogleDriveUrl(shaper.profilepic!) ? (
          <iframe
            src={convertDriveUrlToDirect(shaper.profilepic!)}
            frameBorder="0"
            allow="autoplay"
            className="w-full h-full object-cover"
          />
        ) : (
          <Image
            src={shaper.profilepic!}
            alt={shaper.name}
            width={400}
            height={256}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute top-4 left-4 bg-wef-blue text-white text-sm px-4 py-1 rounded-full shadow-lg z-50 uppercase font-bold tracking-wide">
          {shaper.role}
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
          <h2 className="text-white text-2xl font-bold mb-1">{shaper.name}</h2>
          <p className="text-white text-sm">{shaper.role}</p>
        </div>
      </div>
    </div>
  );
};

export default function ShapersPage() {
  const [shapers, setShapers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedShaper, setSelectedShaper] = useState<User | null>(null);

  useEffect(() => {
    const fetchShapers = async () => {
      try {
        const shapersQuery = query(
          collection(db, "directory").withConverter(userConverter) as CollectionReference<User>,
          where("externalViewEnabled", "==", true)
        );
        const querySnapshot = await getDocs(shapersQuery);
        const shapersData: User[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          shapersData.push({
            email: doc.id,
            name: data.name || "Unknown",
            bio: data.bio || "No bio available",
            linkedin: data.linkedin || "",
            instagram: data.instagram || "",
            toplink: data.toplink || "",
            profilepic: data.profilepic || "/default-profile.png",
            role: data.role || SETTINGS.HUB_CONFIG.SHAPER_DEFAULT_ROLE,
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
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 py-10 px-4">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 text-blue-900 animate-fade-in-down transition-transform duration-200">
          {SETTINGS.HUB_CONFIG.SHAPERS_PAGE_HEADING}
        </h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <p className="text-xl text-gray-600">{TEXTS.shapers.loading}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12">
            {shapers.map((shaper, index) => (
              <ShaperCard
                key={index}
                shaper={{
                  ...shaper,
                  name: shaper.name || TEXTS.shapers.unknown,
                  bio: shaper.bio || TEXTS.shapers.noBio,
                }}
                onClick={() => setSelectedShaper(shaper)}
              />
            ))}
          </div>
        )}

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
