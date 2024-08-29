import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { getAllPosts } from "@/lib/api";
import Image from "next/image";

export default function Index() {
  const allPosts = getAllPosts();
  const morePosts = allPosts.slice(0, 3);

  return (
    <main className="font-sans">
      <div>
        {/* Hero Section */}
        <section className="relative bg-wef-blue text-white h-[500px] flex items-center justify-center overflow-hidden">
          <Image
            src="/assets/images/hub3photo.jpg"
            alt="Global Shapers Hero Image"
            layout="fill"
            objectFit="cover"
            className="opacity-50 transform scale-105 transition-transform duration-[6000ms] ease-in-out"
          />
          <div className="relative z-10 text-center animate-fade-in-down">
            <h1 className="text-5xl font-bold drop-shadow-lg animate-slide-in-bottom">
              Change begins here
            </h1>
            <p className="text-lg mt-4 animate-fade-in-up delay-200">
              Local ideas. Global support. Real-world impact.
            </p>
            <button className="mt-8 px-6 py-3 bg-wef-light-blue text-wef-dark-blue font-semibold rounded-md transform hover:scale-105 transition-transform duration-300">
              Learn more
            </button>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 bg-white text-center">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-4xl font-bold text-wef-dark-blue ">11,071</h2>
              <p className="text-xl text-wef-gray mt-2">Global Shapers</p>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-4xl font-bold text-wef-dark-blue ">502</h2>
              <p className="text-xl text-wef-gray mt-2">Hubs</p>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-4xl font-bold text-wef-dark-blue ">155</h2>
              <p className="text-xl text-wef-gray mt-2">
                Countries and Territories
              </p>
            </div>
          </div>
        </section>

        {/* More Stories Section */}
        <section className="bg-wef-light-gray py-16">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {morePosts.map((post) => (
                <div
                  key={post.slug}
                  className="transform hover:scale-105 transition-transform duration-300"
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
