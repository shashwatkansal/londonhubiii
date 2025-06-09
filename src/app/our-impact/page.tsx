import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
import { SectionSeparator } from "@/app/_components/section-separator";
import { getAllPosts } from "@/lib/api";
import { Post } from "../database/models";
import * as SETTINGS from "@/lib/settings";

export default async function ImpactPage() {
  let allPosts: Post[] = [];

  try {
    allPosts = await getAllPosts();
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    allPosts = [];
  }

  const heroPost = allPosts.length > 0 ? allPosts[0] : null;
  const morePosts = allPosts.slice(1);

  return (
    <main>
      <section className="container mx-auto py-10 px-4">
        <h1 className="text-7xl font-extrabold mb-8 text-center text-wef-blue py-10">
          {SETTINGS.IMPACT_PAGE_HEADING}
        </h1>

        {heroPost ? (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date.toDate()}
            authors={heroPost.authors}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        ) : (
          <p className="text-center text-xl text-gray-500">
            No impact posts available at the moment. Please check back later.
          </p>
        )}

        <SectionSeparator />

        {morePosts.length > 0 ? (
          <MoreStories posts={morePosts} />
        ) : (
          <p className="text-center text-lg text-gray-400 mt-10">
            No more stories to show.
          </p>
        )}
      </section>
    </main>
  );
}
