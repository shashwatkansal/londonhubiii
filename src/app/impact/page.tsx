import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
import { SectionSeparator } from "@/app/_components/section-separator";
import { Post } from "@/interfaces/post";
import { getAllPosts } from "@/lib/api";

// This component fetches posts on the server and renders them dynamically
export default async function ImpactPage() {
  // Fetch posts using your custom function (assuming this is synchronous)
  const allPosts: Post[] = getAllPosts();

  // Hero post is the first post, and the rest are more stories
  const heroPost = allPosts[0];
  const morePosts = allPosts.slice(1);

  return (
    <main>
      <section className="container mx-auto py-10">
        <h1 className="text-7xl font-extrabold mb-8 text-center text-wef-blue py-10">
          Our Impact & Projects
        </h1>

        {heroPost && (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
            author={heroPost.author}
            slug={heroPost.slug}
            excerpt={heroPost.excerpt}
          />
        )}

        <SectionSeparator />

        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </section>
    </main>
  );
}
