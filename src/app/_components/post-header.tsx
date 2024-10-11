import { Timestamp } from "firebase/firestore";
import Avatar from "./avatar";
import CoverImage from "./cover-image";
import DateFormatter from "./date-formatter";
import { PostTitle } from "@/app/_components/post-title";
import { type Author } from "@/interfaces/author";

type Props = {
  title: string;
  coverImage: string;
  date: Timestamp | Date; // Support both string and Date types
  authors: Author[];
};

export function PostHeader({ title, coverImage, date, authors }: Props) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">
        {authors.map((author) => (
          <Avatar
            key={author.name}
            name={author.name}
            picture={author.picture}
          />
        ))}
      </div>
      <div className="mb-8 md:mb-16 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="block md:hidden mb-6">
          {authors.map((author) => (
            <Avatar
              key={author.name}
              name={author.name}
              picture={author.picture}
            />
          ))}
        </div>
        <div className="mb-6 text-lg">
          <DateFormatter dateString={date} />
        </div>
      </div>
    </>
  );
}
