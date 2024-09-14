"use client";
import Image from "next/image";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <section className="relative bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://source.unsplash.com/1600x900/?london,city"
          alt="London Skyline"
          layout="fill"
          objectFit="cover"
          className="opacity-40 transform scale-110 transition-transform duration-[6000ms] ease-in-out"
        />
        <div className="relative z-10 text-center">
          <h1 className="text-6xl font-extrabold drop-shadow-2xl">About Us</h1>
          <p className="text-xl mt-4">
            Empowering Young Leaders to Shape London's Future
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-gray-100 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-extrabold text-gray-900 mb-8">
            Who We Are
          </h2>
          <p className="text-2xl text-gray-700 mb-12">
            The Global Shapers London Hub is a dynamic community of young
            professionals and changemakers, driven by a passion to transform the
            city we call home. We focus on collaborative action to tackle some
            of London's most urgent challenges — from sustainability to social
            inclusion.
          </p>
          <div className="relative group overflow-hidden rounded-xl shadow-2xl">
            <Image
              src="https://source.unsplash.com/800x500/?community,teamwork"
              alt="Global Shapers London Team"
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
            Our Mission
          </h2>
          <p className="text-2xl text-gray-700 mb-12">
            We empower London’s youth to lead the way in creating a more
            equitable, sustainable, and prosperous future. Through projects,
            workshops, and city-wide initiatives, we connect young leaders with
            opportunities to drive positive change.
          </p>
          <div className="relative group overflow-hidden rounded-xl shadow-2xl">
            <iframe
              width="800"
              height="450"
              src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"
              title="Global Shapers - Shaping London's Future"
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
            What We Do
          </h2>
          <p className="text-2xl text-gray-700 mb-12">
            Our projects are designed to bring lasting change to London’s
            communities. We focus on local solutions that scale globally,
            ensuring our work resonates not just here, but around the world.
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
              <h3 className="text-3xl font-bold mt-6">Sustainability</h3>
              <p className="text-xl text-gray-600 mt-2">
                Tackling climate change through education and action-based
                initiatives.
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
              <h3 className="text-3xl font-bold mt-6">Social Inclusion</h3>
              <p className="text-xl text-gray-600 mt-2">
                Advocating for equal opportunities and bridging societal
                divides.
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
              <h3 className="text-3xl font-bold mt-6">Education</h3>
              <p className="text-xl text-gray-600 mt-2">
                Empowering the next generation through learning and leadership
                development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-blue-900 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-extrabold mb-8">Join Our Journey</h2>
          <p className="text-2xl mb-12">
            Ready to help shape the future of London? Become part of the Global
            Shapers London Hub and make an impact today.
          </p>
          <Link href="/join">
            <button className="px-8 py-4 bg-yellow-400 text-blue-900 font-bold rounded-full transform hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl">
              Become a Shaper
            </button>
          </Link>
        </div>
      </section>
    </main>
  );
}
