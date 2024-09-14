"use client";
import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

export default function Index() {
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
            {/* <button className="mt-8 px-8 py-4 bg-blue-500 text-white font-bold rounded-full transform hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl">
              Learn More
            </button> */}
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-gradient-to-r from-wef-blue to-wef-dark-blue text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-extrabold text-white mb-8">
              Our Mission in London
            </h2>
            <p className="text-2xl text-white mb-12">
              The Global Shapers London III Hub we are a dynamic network of
              young, visionary leaders committed to tackling the city's most
              urgent challenges. United by a passion for positive change, we
              drive innovative projects and collaborations to create a more
              inclusive, sustainable, and resilient future for all of London's
              diverse communities.
            </p>
            <Link href="/about">
              <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full transform hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl">
                Learn more about us
              </button>
            </Link>
          </div>
        </section>

        {/* Impact Section */}
        <section className="py-20 bg-gray-100 text-center">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-extrabold text-blue-900 mb-12">
              {" "}
              Our Impact in London{" "}
            </h2>{" "}
            <p className="text-xl text-gray-700 mb-12">
              {" "}
              In the heart of London, Global Shapers are driving real change.
              Through innovative solutions and collaborative efforts, we tackle
              the city's most urgent challenges—from fostering sustainability to
              creating more inclusive opportunities for all Londoners.{" "}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
              {/* Impact Stats */}
              <div className="transform hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl bg-white p-8 rounded-xl">
                <h2 className="text-5xl font-extrabold text-blue-900">25</h2>
                <p className="text-2xl text-gray-600 mt-4">Global Shapers</p>
              </div>
              <div className="transform hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl bg-white p-8 rounded-xl">
                <h2 className="text-5xl font-extrabold text-blue-900">6</h2>
                <p className="text-2xl text-gray-600 mt-4">Projects</p>
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

        {/* Team Section with Swiper Slider */}
        <section className="py-20 bg-white text-center">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-extrabold text-wef-blue mb-12">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              Our London Hub is led by a group of passionate individuals. Meet
              the leaders driving change.
            </p>

            {/* Swiper Slider with Christmas Image */}
            <Image
              src="/assets/images/christmas.jpg"
              alt="Christmas Celebration"
              width={800}
              height={600}
              className="rounded-lg mx-auto"
            />
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

        {/* Call to Action Section */}
        <section className="py-20 bg-gradient-to-r from-wef-blue to-wef-dark-blue text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-extrabold mb-8">
              Ready to Make an Impact?
            </h2>
            <p className="text-2xl mb-12">
              Join the Global Shapers community today and help us build a better
              future.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center space-x-0 md:space-x-4 space-y-4 md:space-y-0">
              <Link href="/join">
                <button className="px-8 py-4 bg-white text-wef-blue font-bold rounded-full transform hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl">
                  Become a Shaper
                </button>
              </Link>
              <Link href="/join">
                <button className="px-8 py-4 bg-white text-wef-blue font-bold rounded-full transform hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl">
                  Transfer to London
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
