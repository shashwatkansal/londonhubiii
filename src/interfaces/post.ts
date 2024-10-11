import { Timestamp } from "firebase/firestore";
import { type Author } from "./author";

export type Post = {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  ogImage: {
    url: string;
  };
  slug: string;
  authors: Author[];
  date: Timestamp;
  status: "draft" | "published";
  authorsIndex: string[];
};
