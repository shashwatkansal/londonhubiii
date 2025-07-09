// Service layer for post operations - better separation of concerns
import { Post } from "@/app/database/models";
import { db } from "@/lib/firebaseConfig";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  startAfter,
  CollectionReference,
  QueryDocumentSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { ApiResponse } from "@/types";
import { COLLECTIONS } from "@/lib/constants";
import { NotFoundError, ValidationError, handleApiError, logError } from "@/lib/errors";
import { validatePost } from "@/lib/validation";

export class PostService {
  private collection: CollectionReference;

  constructor() {
    this.collection = collection(db, COLLECTIONS.POSTS);
  }

  async createPost(postData: {
    title: string;
    content: string;
    excerpt: string;
    slug: string;
    authors: { email: string; name: string; picture: string }[];
    coverImage: string;
    ogImage?: { url: string };
  }): Promise<ApiResponse<Post>> {
    try {
      // Validate input data
      const validation = validatePost(postData);
      if (!validation.isValid) {
        const error = new ValidationError(validation.errors.join(', '));
        return { data: null, error, loading: false };
      }

      // Check if slug already exists
      const existingPost = await this.getPostBySlug(postData.slug);
      if (existingPost.data) {
        const error = new ValidationError('A post with this slug already exists');
        return { data: null, error, loading: false };
      }

      // Create post document
      const newPost = {
        ...postData,
        authorsIndex: postData.authors.map(author => author.email),
        date: serverTimestamp(),
        status: "draft" as const,
        ogImage: postData.ogImage || { url: "" },
      };

      const docRef = await addDoc(this.collection, newPost);

      const createdPost = {
        ...newPost,
        slug: postData.slug,
      } as Post;

      return { data: createdPost, error: null, loading: false };
    } catch (error) {
      const apiError = handleApiError(error);
      logError(apiError, 'PostService.createPost');
      return { data: null, error: apiError, loading: false };
    }
  }

  async getPostBySlug(slug: string): Promise<ApiResponse<Post>> {
    try {
      if (!slug) {
        const error = new NotFoundError('Post slug');
        return { data: null, error, loading: false };
      }

      const postRef = doc(this.collection, slug);
      const docSnap = await getDoc(postRef);

      if (docSnap.exists()) {
        const post = { ...docSnap.data(), slug } as Post;
        return { data: post, error: null, loading: false };
      } else {
        const error = new NotFoundError(`Post with slug: ${slug}`);
        return { data: null, error, loading: false };
      }
    } catch (error) {
      const apiError = handleApiError(error);
      logError(apiError, 'PostService.getPostBySlug');
      return { data: null, error: apiError, loading: false };
    }
  }

  async getAllPosts(pageSize: number = 10): Promise<ApiResponse<Post[]>> {
    try {
      const q = query(
        this.collection,
        orderBy("date", "desc"),
        limit(pageSize)
      );

      const snapshot = await getDocs(q);
      const posts = snapshot.docs.map(doc => ({
        ...doc.data(),
        slug: doc.id,
      })) as Post[];

      return { data: posts, error: null, loading: false };
    } catch (error) {
      const apiError = handleApiError(error);
      logError(apiError, 'PostService.getAllPosts');
      return { data: null, error: apiError, loading: false };
    }
  }

  async getPostsPaginated(
    pageSize: number = 10,
    lastDoc?: QueryDocumentSnapshot
  ): Promise<ApiResponse<{ posts: Post[]; lastDoc?: QueryDocumentSnapshot; hasMore: boolean }>> {
    try {
      let q = query(
        this.collection,
        orderBy("date", "desc"),
        limit(pageSize + 1)
      );

      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const snapshot = await getDocs(q);
      const docs = snapshot.docs;
      const hasMore = docs.length > pageSize;

      const posts = docs
        .slice(0, pageSize)
        .map(doc => ({
          ...doc.data(),
          slug: doc.id,
        })) as Post[];

      const newLastDoc = hasMore ? docs[pageSize - 1] : undefined;

      return {
        data: { posts, lastDoc: newLastDoc, hasMore },
        error: null,
        loading: false,
      };
    } catch (error) {
      const apiError = handleApiError(error);
      logError(apiError, 'PostService.getPostsPaginated');
      return { data: null, error: apiError, loading: false };
    }
  }

  async updatePost(slug: string, updates: Partial<Post>): Promise<ApiResponse<Post>> {
    try {
      if (!slug) {
        const error = new NotFoundError('Post slug');
        return { data: null, error, loading: false };
      }

      const postRef = doc(this.collection, slug);
      const docSnap = await getDoc(postRef);

      if (!docSnap.exists()) {
        const error = new NotFoundError(`Post with slug: ${slug}`);
        return { data: null, error, loading: false };
      }

      const updateData = {
        ...updates,
        updatedAt: serverTimestamp(),
      };

      await updateDoc(postRef, updateData);

      const updatedPost = {
        ...docSnap.data(),
        ...updateData,
        slug,
      } as Post;

      return { data: updatedPost, error: null, loading: false };
    } catch (error) {
      const apiError = handleApiError(error);
      logError(apiError, 'PostService.updatePost');
      return { data: null, error: apiError, loading: false };
    }
  }

  async deletePost(slug: string): Promise<ApiResponse<boolean>> {
    try {
      if (!slug) {
        const error = new NotFoundError('Post slug');
        return { data: null, error, loading: false };
      }

      const postRef = doc(this.collection, slug);
      const docSnap = await getDoc(postRef);

      if (!docSnap.exists()) {
        const error = new NotFoundError(`Post with slug: ${slug}`);
        return { data: null, error, loading: false };
      }

      await deleteDoc(postRef);
      return { data: true, error: null, loading: false };
    } catch (error) {
      const apiError = handleApiError(error);
      logError(apiError, 'PostService.deletePost');
      return { data: null, error: apiError, loading: false };
    }
  }

  async searchPosts(searchTerm: string, pageSize: number = 10): Promise<ApiResponse<Post[]>> {
    try {
      // Note: This is a basic implementation. For production, consider using
      // a search service like Algolia or Elasticsearch for better search capabilities
      const q = query(
        this.collection,
        orderBy("date", "desc"),
        limit(pageSize)
      );

      const snapshot = await getDocs(q);
      const allPosts = snapshot.docs.map(doc => ({
        ...doc.data(),
        slug: doc.id,
      })) as Post[];

      // Client-side filtering (not ideal for large datasets)
      const filteredPosts = allPosts.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      return { data: filteredPosts, error: null, loading: false };
    } catch (error) {
      const apiError = handleApiError(error);
      logError(apiError, 'PostService.searchPosts');
      return { data: null, error: apiError, loading: false };
    }
  }

  async getPostsByAuthor(authorEmail: string, pageSize: number = 10): Promise<ApiResponse<Post[]>> {
    try {
      // Filter posts by author email in authorsIndex
      const q = query(
        this.collection,
        orderBy("date", "desc"),
        limit(pageSize)
      );

      const snapshot = await getDocs(q);
      const allPosts = snapshot.docs.map(doc => ({
        ...doc.data(),
        slug: doc.id,
      })) as Post[];

      // Filter by author
      const filteredPosts = allPosts.filter(post =>
        post.authorsIndex?.includes(authorEmail)
      );

      return { data: filteredPosts, error: null, loading: false };
    } catch (error) {
      const apiError = handleApiError(error);
      logError(apiError, 'PostService.getPostsByAuthor');
      return { data: null, error: apiError, loading: false };
    }
  }

  async togglePublishStatus(slug: string): Promise<ApiResponse<Post>> {
    try {
      const postResponse = await this.getPostBySlug(slug);
      if (!postResponse.data) {
        return postResponse;
      }

      const currentPost = postResponse.data;
      const newStatus = currentPost.status === "published" ? "draft" : "published";
      const updateResponse = await this.updatePost(slug, {
        status: newStatus,
      });

      return updateResponse;
    } catch (error) {
      const apiError = handleApiError(error);
      logError(apiError, 'PostService.togglePublishStatus');
      return { data: null, error: apiError, loading: false };
    }
  }
}

// Export singleton instance
export const postService = new PostService();