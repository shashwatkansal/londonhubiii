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

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const postRef = doc(db, "posts", slug);
    const docSnap = await getDoc(postRef);

    if (docSnap.exists()) {
      const postData = docSnap.data();
      return { ...postData, slug } as Post;
    } else {
      return null;
    }
  } catch (error) {
    // If the collection does not exist or another error occurs, return null
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    const postsCollection = collection(db, "posts").withConverter(postConverter) as CollectionReference<Post>;
    const q = query(postsCollection, orderBy("date", "desc"));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const posts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        slug: doc.id,
      })) as Post[];
      return posts;
    }
    return [];
  } catch (error) {
    // If the collection does not exist or another error occurs, return an empty array
    return [];
  }
}
