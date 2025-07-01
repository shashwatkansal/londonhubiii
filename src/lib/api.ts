import { Post, postConverter } from "@/app/database/models";
import { db } from "@/lib/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
  CollectionReference,
} from "firebase/firestore";

export async function getPostSlugs(): Promise<string[]> {
  const postsCollection = collection(db, "posts").withConverter(postConverter) as CollectionReference<Post>;
  const snapshot = await getDocs(postsCollection);

  return snapshot.docs.map((doc) => doc.id);
}

export async function getPostBySlug(slug: string): Promise<Post> {
  const postRef = doc(db, "posts", slug);
  const docSnap = await getDoc(postRef);

  if (docSnap.exists()) {
    const postData = docSnap.data();
    return { ...postData, slug } as Post;
  } else {
    throw new Error(`Post with slug ${slug} not found`);
  }
}

export async function getAllPosts(): Promise<Post[]> {
  const postsCollection = collection(db, "posts").withConverter(postConverter) as CollectionReference<Post>;

  const q = query(postsCollection, orderBy("date", "desc"));
  const snapshot = await getDocs(q);

  const posts = snapshot.docs.map((doc) => ({
    ...doc.data(),
    slug: doc.id,
  })) as Post[];

  return posts;
}
