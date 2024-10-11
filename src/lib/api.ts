import { Post } from "@/interfaces/post";
import { db } from "@/lib/firebaseConfig"; // Import Firebase Firestore config
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
} from "firebase/firestore";

// Get all slugs (IDs) from Firestore collection
export async function getPostSlugs(): Promise<string[]> {
  const postsCollection = collection(db, "posts");
  const snapshot = await getDocs(postsCollection);

  return snapshot.docs.map((doc) => doc.id); // Return the document IDs (which can serve as slugs)
}

// Get a single post by its slug (document ID in Firestore)
export async function getPostBySlug(slug: string): Promise<Post> {
  const postRef = doc(db, "posts", slug); // Find the post document by slug (id)
  const docSnap = await getDoc(postRef);

  if (docSnap.exists()) {
    const postData = docSnap.data();
    return { ...postData, slug } as Post;
  } else {
    throw new Error(`Post with slug ${slug} not found`);
  }
}

// Get all posts from Firestore, sorted by date
export async function getAllPosts(): Promise<Post[]> {
  const postsCollection = collection(db, "posts");

  // Query posts and order them by 'date' field in descending order
  const q = query(postsCollection, orderBy("date", "desc"));
  const snapshot = await getDocs(q);

  const posts = snapshot.docs.map((doc) => ({
    ...doc.data(),
    slug: doc.id, // Use the document ID as the slug
  })) as Post[];

  return posts; // Return all posts sorted by date
}
