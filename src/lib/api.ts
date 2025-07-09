import { Post, postConverter } from "@/app/database/models";
import { db } from "@/lib/firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  orderBy,
  limit,
  startAfter,
  CollectionReference,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { ApiResponse, PaginationOptions, QueryOptions } from "@/types";
import { COLLECTIONS } from "./constants";
import { NotFoundError, NetworkError, logError, handleApiError } from "./errors";

export async function getPostSlugs(): Promise<ApiResponse<string[]>> {
  try {
    const postsCollection = collection(db, COLLECTIONS.POSTS).withConverter(postConverter) as CollectionReference<Post>;
    const snapshot = await getDocs(postsCollection);

    const slugs = snapshot.docs.map((doc) => doc.id);
    return { data: slugs, error: null, loading: false };
  } catch (error) {
    const apiError = handleApiError(error);
    logError(apiError, 'getPostSlugs');
    return { data: null, error: apiError, loading: false };
  }
}

export async function getPostBySlug(slug: string): Promise<ApiResponse<Post>> {
  if (!slug) {
    const error = new NotFoundError('Post slug');
    return { data: null, error, loading: false };
  }

  try {
    const postRef = doc(db, COLLECTIONS.POSTS, slug);
    const docSnap = await getDoc(postRef);

    if (docSnap.exists()) {
      const postData = docSnap.data();
      const post = { ...postData, slug } as Post;
      return { data: post, error: null, loading: false };
    } else {
      const error = new NotFoundError(`Post with slug: ${slug}`);
      return { data: null, error, loading: false };
    }
  } catch (error) {
    const apiError = handleApiError(error);
    logError(apiError, 'getPostBySlug');
    return { data: null, error: apiError, loading: false };
  }
}

export async function getAllPosts(options?: QueryOptions): Promise<ApiResponse<Post[]>> {
  try {
    const postsCollection = collection(db, COLLECTIONS.POSTS).withConverter(postConverter) as CollectionReference<Post>;
    let q = query(postsCollection, orderBy("date", "desc"));

    // Apply pagination if provided
    if (options?.pagination) {
      const { limit: pageSize, page } = options.pagination;
      if (pageSize) {
        q = query(q, limit(pageSize));
      }
      // For pagination beyond first page, you would need to pass the last document
      // This is a simplified version - full pagination would require cursor-based approach
    }

    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const posts = snapshot.docs.map((doc) => ({
        ...doc.data(),
        slug: doc.id,
      })) as Post[];
      return { data: posts, error: null, loading: false };
    }
    
    return { data: [], error: null, loading: false };
  } catch (error) {
    const apiError = handleApiError(error);
    logError(apiError, 'getAllPosts');
    return { data: null, error: apiError, loading: false };
  }
}

export async function getPostsPaginated(
  pageSize: number = 10,
  lastDoc?: QueryDocumentSnapshot
): Promise<ApiResponse<{ posts: Post[]; lastDoc?: QueryDocumentSnapshot; hasMore: boolean }>> {
  try {
    const postsCollection = collection(db, COLLECTIONS.POSTS).withConverter(postConverter) as CollectionReference<Post>;
    let q = query(postsCollection, orderBy("date", "desc"), limit(pageSize + 1));

    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }

    const snapshot = await getDocs(q);
    const docs = snapshot.docs;
    const hasMore = docs.length > pageSize;
    
    const posts = docs
      .slice(0, pageSize)
      .map((doc) => ({
        ...doc.data(),
        slug: doc.id,
      })) as Post[];

    const newLastDoc = hasMore ? docs[pageSize - 1] : undefined;

    return {
      data: {
        posts,
        lastDoc: newLastDoc,
        hasMore,
      },
      error: null,
      loading: false,
    };
  } catch (error) {
    const apiError = handleApiError(error);
    logError(apiError, 'getPostsPaginated');
    return { data: null, error: apiError, loading: false };
  }
}

// Helper function to check if a post exists
export async function postExists(slug: string): Promise<boolean> {
  try {
    const postRef = doc(db, COLLECTIONS.POSTS, slug);
    const docSnap = await getDoc(postRef);
    return docSnap.exists();
  } catch (error) {
    logError(error, 'postExists');
    return false;
  }
}
