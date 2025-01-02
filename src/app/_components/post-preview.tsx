import Link from "next/link";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { Author } from "../database/models";
import { Timestamp } from "firebase/firestore";

type Props = {
  title: string;
  coverImage: string;
  date: Date | Timestamp;
  excerpt: string;
  authors: Author[];
  slug: string;
};

export function PostPreview({
  title,
  coverImage,
  date,
  excerpt,
  authors,
  slug,
}: Props) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link href={`/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <DateFormatter dateString={date} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      {authors.map((author) => (
        <Avatar key={author.name} name={author.name} picture={author.picture} />
      ))}
    </div>
  );
}
