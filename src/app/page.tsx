"use client";
import { useState, useEffect } from "react";
import { db } from "@lib/firebaseConfig"; // Firebase config for Firestore
import { getDocs, collection, query, where } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

interface TeamMember {
  name: string;
  role: string;
  profilepic: string;
  externalViewEnabled: boolean;
}

export default function Index() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const teamQuery = query(
          collection(db, "directory"),
          where("externalViewEnabled", "==", true)
        );
        const querySnapshot = await getDocs(teamQuery);
        const membersData: TeamMember[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          membersData.push({
            name: data.name || "Unknown",
            role: data.role || "Shaper",
            profilepic: data.profilepic || "/default-profile.png",
            externalViewEnabled: data.externalViewEnabled,
          });
        });
        setTeamMembers(membersData);
      } catch (error) {
        console.error("Error fetching team members:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <main>
      <div>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white h-[500px] flex items-center justify-center overflow-hidden">
          <Image
            src="/assets/images/hub3photo.jpg"
            alt="Global Shapers Hero Image"
            layout="fill"
            objectFit="cover"
            className="opacity-40 transform scale-110 transition-transform duration-[6000ms] ease-in-out"
          />
          <div className="relative z-10 text-center animate-fade-in-down">
            <h1 className="text-6xl font-extrabold drop-shadow-2xl animate-slide-in-bottom">
              Change Begins Here
            </h1>
            <p className="text-xl mt-4 animate-fade-in-up delay-200">
              Local Ideas. Global Support. Real-World Impact.
            </p>
            <button className="mt-8 px-8 py-4 bg-blue-500 text-white font-bold rounded-full transform hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl">
              Learn More
            </button>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-gradient-to-r from-wef-blue to-wef-dark-blue text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-extrabold text-white mb-8">
              Our Mission in London
            </h2>
            <p className="text-2xl text-white mb-12">
              The Global Shapers London Hub is a community of young leaders
              dedicated to addressing the city's most pressing challenges.
            </p>
            <Link href="/about">
              <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full transform hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl">
                Recruitment is open. Join us!
              </button>
            </Link>
          </div>
        </section>

        {/* Team Section with Swiper Slider */}
        <section className="py-20 bg-white text-center">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-extrabold text-gray-900 mb-12">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              Our London Hub is led by a group of passionate individuals. Meet
              the leaders driving change.
            </p>

            {/* Swiper Slider */}
            {!loading ? (
              <Swiper
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                  640: { slidesPerView: 2 },
                  1024: { slidesPerView: 3 },
                }}
              >
                {teamMembers.map((member, index) => (
                  <SwiperSlide key={index}>
                    <div className="transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl bg-white p-8 rounded-xl">
                      <Image
                        src={member.profilepic}
                        alt={member.name}
                        width={200}
                        height={200}
                        className="rounded-full mx-auto"
                      />
                      <h3 className="text-3xl font-bold mt-6">{member.name}</h3>
                      <p className="text-xl text-gray-600">{member.role}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p className="text-lg text-gray-500">Loading team members...</p>
            )}
            <div className="mt-12">
              <Link
                href="/shapers"
                className="text-blue-600 font-semibold underline"
              >
                See All Members
              </Link>
            </div>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-20 bg-gray-100 text-center">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-extrabold text-blue-900 mb-12">
              Our Impact
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              Through collaboration and innovation, Global Shapers are making
              real change.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
              {/* Impact Stats */}
              <div className="transform hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl bg-white p-8 rounded-xl">
                <h2 className="text-5xl font-extrabold text-blue-900">
                  11,071
                </h2>
                <p className="text-2xl text-gray-600 mt-4">Global Shapers</p>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl bg-white p-8 rounded-xl">
                <h2 className="text-5xl font-extrabold text-blue-900">502</h2>
                <p className="text-2xl text-gray-600 mt-4">Hubs</p>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl bg-white p-8 rounded-xl">
                <h2 className="text-5xl font-extrabold text-blue-900">155</h2>
                <p className="text-2xl text-gray-600 mt-4">
                  Countries and Territories
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-20 bg-blue-900 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-extrabold mb-8">
              Ready to Make an Impact?
            </h2>
            <p className="text-2xl mb-12">
              Join the Global Shapers community today and help us build a better
              future.
            </p>
            <Link href="/join">
              <button className="px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-full transform hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl">
                Become a Shaper
              </button>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
