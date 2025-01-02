import { HeroPost } from "@/app/_components/hero-post";
import { MoreStories } from "@/app/_components/more-stories";
import { SectionSeparator } from "@/app/_components/section-separator";
import { Post } from "@/interfaces/post";
import { getAllPosts } from "@/lib/api";

// This component fetches posts on the server and renders them dynamically
export default async function ImpactPage() {
  // Fetch posts asynchronously from Firestore
  let allPosts: Post[] = [];

  try {
    allPosts = await getAllPosts(); // Make sure this function is awaited as it's async
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    allPosts = [];
  }

  // Ensure there's at least one post for the hero post
  const heroPost = allPosts.length > 0 ? allPosts[0] : null;
  const morePosts = allPosts.slice(1);

  return (
    <main>
      <section className="container mx-auto py-10 px-4">
        <h1 className="text-7xl font-extrabold mb-8 text-center text-wef-blue py-10">
          Our Impact & Projects
        </h1>

        {/* Render Hero Post if available */}
        {heroPost ? (
          <HeroPost
            title={heroPost.title}
            coverImage={heroPost.coverImage}
            date={heroPost.date}
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

        {/* Render more posts if they exist */}
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
