"use client";
import * as SETTINGS from "@/lib/settings";
import Image from "next/image";
import Link from "next/link";
import { TEXTS } from "@/lib/texts";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="relative bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src={SETTINGS.HUB_CONFIG.ABOUT_PAGE_IMAGE_MAIN}
          alt={`${SETTINGS.HUB_CONFIG.CITY_NAME} Skyline`}
          layout="fill"
          objectFit="cover"
          className="opacity-40 transform scale-110 transition-transform duration-[6000ms] ease-in-out"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-extrabold drop-shadow-2xl">{TEXTS.about.heading}</h1>
          <p className="text-xl mt-4">
            {TEXTS.about.whoWeAreDesc(SETTINGS.HUB_CONFIG.HUB_NAME, SETTINGS.HUB_CONFIG.CITY_NAME)}
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-gray-100 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-8">
            {TEXTS.about.whoWeAre}
          </h2>
          <p className="text-2xl text-gray-700 mb-12">
            {TEXTS.about.whoWeAreDesc(SETTINGS.HUB_CONFIG.HUB_NAME, SETTINGS.HUB_CONFIG.CITY_NAME)}
          </p>
          <div className="relative group overflow-hidden rounded-xl shadow-2xl">
            <Image
              src={SETTINGS.HUB_CONFIG.ABOUT_PAGE_IMAGE_TEAM}
              alt={`${SETTINGS.HUB_CONFIG.HUB_NAME} Team`}
              width={800}
              height={500}
              className="transform group-hover:scale-105 transition-transform duration-500 ease-in-out w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Mission Statement Section */}
      <section className="py-20 bg-blue-50 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-extrabold text-blue-900 mb-8">
            {TEXTS.about.missionHeading}
          </h2>
          <p className="text-2xl text-gray-700 mb-12">
            {TEXTS.about.missionDesc(SETTINGS.HUB_CONFIG.CITY_NAME)}
          </p>
          <div className="relative group overflow-hidden rounded-xl shadow-2xl">
            <iframe
              width="800"
              height="450"
              src={SETTINGS.HUB_CONFIG.ABOUT_PAGE_VIDEO_URL}
              title={`${SETTINGS.HUB_CONFIG.HUB_NAME} - Shaping ${SETTINGS.HUB_CONFIG.CITY_NAME}'s Future`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-white text-center">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-8">
            {TEXTS.about.whatWeDoHeading}
          </h2>
          <p className="text-2xl text-gray-700 mb-12">
            {TEXTS.about.whatWeDoDesc(SETTINGS.HUB_CONFIG.CITY_NAME)}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="bg-gray-100 p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <Image
                src="https://source.unsplash.com/400x300/?sustainability"
                alt="Sustainability"
                width={400}
                height={300}
                className="rounded-lg"
              />
              <h3 className="text-3xl font-bold mt-6">{TEXTS.about.sustainability.title}</h3>
              <p className="text-xl text-gray-600 mt-2">
                {TEXTS.about.sustainability.desc}
              </p>
            </div>
            <div className="bg-gray-100 p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <Image
                src="https://source.unsplash.com/400x300/?diversity,inclusion"
                alt="Social Inclusion"
                width={400}
                height={300}
                className="rounded-lg"
              />
              <h3 className="text-3xl font-bold mt-6">{TEXTS.about.socialInclusion.title}</h3>
              <p className="text-xl text-gray-600 mt-2">
                {TEXTS.about.socialInclusion.desc}
              </p>
            </div>
            <div className="bg-gray-100 p-8 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <Image
                src="https://source.unsplash.com/400x300/?education"
                alt="Education"
                width={400}
                height={300}
                className="rounded-lg"
              />
              <h3 className="text-3xl font-bold mt-6">{TEXTS.about.education.title}</h3>
              <p className="text-xl text-gray-600 mt-2">
                {TEXTS.about.education.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-blue-900 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-extrabold mb-8">{TEXTS.about.joinHeading}</h2>
          <p className="text-2xl mb-12">
            {TEXTS.about.joinDesc(SETTINGS.HUB_CONFIG.CITY_NAME, SETTINGS.HUB_CONFIG.HUB_NAME)}
          </p>
          <Link href="/join-us">
            <button className="px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-full transform hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl">
              {TEXTS.about.joinButton}
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
