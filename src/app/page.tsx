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

        {/* London Mission Section */}
        <section className="py-20 bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl font-extrabold text-blue-900 mb-8">
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

        {/* Statistics Section */}
        <section className="py-20 bg-gray-100 text-center">
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-12">
            <div className="transform hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl bg-white p-8 rounded-xl">
              <h2 className="text-5xl font-extrabold text-blue-900">11,071</h2>
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
