import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/api";
import Container from "@/app/_components/container";
import { PostBody } from "@/app/_components/post-body";
import { PostHeader } from "@/app/_components/post-header";
import * as SETTINGS from "@/lib/settings";

export default async function Post({ params }: Params) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }
  const content = post.content;

  return (
    <main className="py-4 md:py-8">
      <Container>
        <div className="mb-8">
          <Link href="/our-impact">
            <button className="text-blue-600 hover:text-blue-800 font-bold underline">
              ← Back to Our Impact
            </button>
          </Link>
        </div>

        <article className="mb-32">
          <PostHeader
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
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

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return notFound();
  }

  const title = `${post.title} | ${SETTINGS.HUB_CONFIG.HUB_NAME} Article`;

  return {
    title,
    openGraph: {
      title,
      images: [post.ogImage?.url || ""],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}
