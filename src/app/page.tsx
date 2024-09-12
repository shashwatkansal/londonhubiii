import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { getAllPosts } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

export default function Index() {
  const allPosts = getAllPosts();
  const morePosts = allPosts.slice(0, 3);

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
              Through innovative projects and partnerships, we aim to foster
              inclusivity, sustainability, and social impact across London’s
              diverse communities.
            </p>
            <div className="py-8">
              <div className="relative group overflow-hidden rounded-xl shadow-2xl">
                <Image
                  src="/assets/images/working.jpg"
                  alt="Global Shapers London in Action"
                  width={800}
                  height={500}
                  className="transform group-hover:scale-105 transition-transform duration-500 ease-in-out w-full object-cover"
                />
              </div>
            </div>
            <Link className="" href="/about">
              <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full transform hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl">
                Recruitment is open. Join us!
              </button>
            </Link>
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
              real change. Here are a few ways we’re making an impact.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
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

        {/* Team Section */}
        <section className="py-20 bg-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-extrabold text-gray-900 mb-12">
              Meet the Team
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              Our London Hub is led by a group of passionate individuals. Meet
              the leaders driving change.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              <div className="transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl bg-white p-8 rounded-xl">
                <Image
                  src="/assets/images/team1.jpg"
                  alt="Team Member"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto"
                />
                <h3 className="text-3xl font-bold mt-6">Jane Doe</h3>
                <p className="text-xl text-gray-600">London Hub Curator</p>
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl bg-white p-8 rounded-xl">
                <Image
                  src="/assets/images/team2.jpg"
                  alt="Team Member"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto"
                />
                <h3 className="text-3xl font-bold mt-6">John Smith</h3>
                <p className="text-xl text-gray-600">Vice-Curator</p>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="py-20 bg-gray-100 text-center">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-5xl font-extrabold text-blue-900 mb-12">
              Our Partners
            </h2>
            <p className="text-xl text-gray-700 mb-12">
              We’re proud to collaborate with organizations that share our
              vision for a more inclusive and sustainable world.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
              <div className="transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl bg-white p-8 rounded-xl">
                <Image
                  src="/assets/images/partner1.png"
                  alt="Partner 1"
                  width={150}
                  height={150}
                  className="mx-auto"
                />
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl bg-white p-8 rounded-xl">
                <Image
                  src="/assets/images/partner2.png"
                  alt="Partner 2"
                  width={150}
                  height={150}
                  className="mx-auto"
                />
              </div>
              <div className="transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl bg-white p-8 rounded-xl">
                <Image
                  src="/assets/images/partner3.png"
                  alt="Partner 3"
                  width={150}
                  height={150}
                  className="mx-auto"
                />
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

        {/* More Stories Section */}
        <section className="bg-blue-50 py-20">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {morePosts.map((post) => (
                <div
                  key={post.slug}
                  className="transform hover:scale-105 transition-transform duration-300 shadow-lg hover:shadow-2xl bg-white p-8 rounded-xl"
                >
                  <HeroPost
                    title={post.title}
                    coverImage={post.coverImage}
                    date={post.date}
                    author={post.author}
                    slug={post.slug}
                    excerpt={post.excerpt}
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      </div>
    </main>
  );
}
