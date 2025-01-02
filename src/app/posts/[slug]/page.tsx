import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import Container from "@/app/_components/container";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";

export default async function Post({ params }: Params) {
  // Fetch the post data asynchronously
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }
  const content = post.content;

  return (
    <main className="py-4 md:py-8">
      {/* <Alert preview={post.preview} /> */}
      <Container>
        {/* Back to Our Impact Button */}
        <div className="mb-8">
          <Link href="/impact">
            <button className="text-blue-600 hover:text-blue-800 font-bold underline">
              ← Back to Our Impact
            </button>
          </Link>
        </div>

        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={new Date(post.date)}
            authors={post.authors}
          />
          <PostBody content={content} />
        </article>
      </Container>
    </main>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

// Async function to generate metadata, as we fetch post data asynchronously
export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | Global Shapers London Hub III Article`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage?.url || ""], // Ensure the ogImage URL is present
    },
  };
}

// Async function to generate static params for dynamic routes
export async function generateStaticParams() {
  const posts = await getAllPosts(); // Ensure we await the posts fetching

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
