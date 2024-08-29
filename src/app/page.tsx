import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";
import Image from "next/image";

export default function Index() {
  const allPosts = getAllPosts();
  const morePosts = allPosts.slice(0, 3);

  return (
    <main>
      <div>
        {/* Hero Section */}
        <section className="relative bg-wef-blue text-white h-[500px] flex items-center justify-center">
          <Image
            src="/assets/images/hub3photo.jpg"
            alt="Global Shapers Hero Image"
            layout="fill"
            objectFit="cover"
            className="opacity-50"
          />
          <div className="relative z-10 text-center">
            <h1 className="text-5xl font-bold">Change begins here</h1>
            <p className="text-lg mt-4">
              Local ideas. Global support. Real-world impact.
            </p>
            <button className="mt-8 px-6 py-3 bg-wef-light-blue text-wef-dark-blue font-semibold rounded-md">
              Learn more
            </button>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-16 bg-white text-center">
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h2 className="text-4xl font-bold text-wef-dark-blue">11,071</h2>
              <p className="text-xl text-wef-gray mt-2">Global Shapers</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-wef-dark-blue">502</h2>
              <p className="text-xl text-wef-gray mt-2">Hubs</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold text-wef-dark-blue">155</h2>
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
                <div key={post.slug}>
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

        {/* Footer Section */}
        <footer className="bg-wef-blue text-white py-8">
          <Container>
            <div className="text-center">
              <p className="text-sm">
                © 2024 Global Shapers Community. All rights reserved.
              </p>
            </div>
          </Container>
        </footer>
      </div>
    </main>
  );
}
