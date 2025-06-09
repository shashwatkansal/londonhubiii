import { decryptValue, encryptValue } from "@/lib/secrets";
import { db } from "../../lib/firebaseConfig";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  CollectionReference,
  Timestamp,
} from "firebase/firestore";

export enum Role {
  Curator = "Curator",
  ViceCurator = "Vice-Curator",
  ImpactOfficer = "Impact Officer",
  FoundingCurator = "Founding Curator",
  Shaper = "Shaper",
}

export interface Admins {}

export interface Directory {
  name: string;
  bio: string;
  linkedin: string;
  instagram: string;
  toplink: string;
  profilepic: string;
  externalViewEnabled: boolean;
  role: Role;
}

export interface User extends Directory {
  email: string;
}

export interface FAQ {
  question: string;
  answer: string;
  category: string;
}

export interface Author {
  email: string;
  name: string;
  picture: string;
}

type Email = string;
type RichTextBlock = string;

export interface Post {
  authors: Author[];
  authorsIndex: Email[];
  content: RichTextBlock;
  coverImage: string;
  date: Timestamp;
  excerpt: string;
  ogImage: {
    url: string;
  };
  slug: string;
  title: string;
  status: "draft" | "published";
}

export interface Subscribers {
  email: string;
  name: string;
}

export interface Secret {
  id: string; // Unique identifier for the secret
  key: string; // Secret key name (e.g., "API_KEY")
  value: string; // Encrypted value of the secret
  visibleTo: string[]; // Array of user emails or IDs that can view the secret
  createdAt: Timestamp; // Creation timestamp
  updatedAt: Timestamp; // Last updated timestamp
}

// Collection references
const directoryRef = collection(
  db,
  "directory"
) as CollectionReference<Directory>;
const faqRef = collection(db, "faqs") as CollectionReference<FAQ>;
const postsRef = collection(db, "posts") as CollectionReference<Post>;
const subscribersRef = collection(
  db,
  "subscribers"
) as CollectionReference<Subscribers>;
const secretsRef = collection(db, "secrets") as CollectionReference<Secret>;

// Directory helpers
export const directoryHelpers = {
  async getAll(): Promise<User[]> {
    const snapshot = await getDocs(directoryRef);
    return snapshot.docs.map((doc) => ({ email: doc.id, ...doc.data() }));
  },

  async getById(id: string): Promise<Directory | null> {
    const docRef = doc(directoryRef, id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    return { ...snapshot.data() };
  },

  async getByRole(role: Role): Promise<Directory[]> {
    const q = query(directoryRef, where("role", "==", role));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async update(id: string, data: Partial<Directory>): Promise<void> {
    const docRef = doc(directoryRef, id);
    console.log('[directoryHelpers.update] Updating user:', id, data);
    try {
      await updateDoc(docRef, data);
    } catch (error: any) {
      console.error('[directoryHelpers.update] updateDoc failed:', error);
      // Always try setDoc as a fallback
      console.warn('[directoryHelpers.update] updateDoc failed, using setDoc instead:', id);
      await setDoc(docRef, data, { merge: true });
    }
  },

  async create(id: string, data: Directory): Promise<void> {
    const docRef = doc(directoryRef, id);
    await setDoc(docRef, data);
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(directoryRef, id);
    await deleteDoc(docRef);
  },
};

// FAQ helpers
export const faqHelpers = {
  async getAll(): Promise<FAQ[]> {
    const snapshot = await getDocs(faqRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async getByCategory(category: string): Promise<FAQ[]> {
    const q = query(faqRef, where("category", "==", category));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async create(data: FAQ): Promise<void> {
    const docRef = doc(faqRef);
    await setDoc(docRef, data);
  },

  async update(id: string, data: Partial<FAQ>): Promise<void> {
    const docRef = doc(faqRef, id);
    await updateDoc(docRef, data);
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(faqRef, id);
    await deleteDoc(docRef);
  },
};

// Posts helpers
export const postsHelpers = {
  async getAll(): Promise<Post[]> {
    const snapshot = await getDocs(postsRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async getPublished(): Promise<Post[]> {
    const q = query(postsRef, where("status", "==", "published"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async getBySlug(slug: string): Promise<Post | null> {
    const q = query(postsRef, where("slug", "==", slug));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { ...doc.data() };
  },

  async create(data: Post): Promise<void> {
    const docRef = doc(postsRef);
    await setDoc(docRef, data);
  },

  async update(id: string, data: Partial<Post>): Promise<void> {
    const docRef = doc(postsRef, id);
    await updateDoc(docRef, data);
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(postsRef, id);
    await deleteDoc(docRef);
  },
};

// Subscribers helpers
export const subscribersHelpers = {
  async getAll(): Promise<Subscribers[]> {
    const snapshot = await getDocs(subscribersRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async create(data: Subscribers): Promise<void> {
    const docRef = doc(subscribersRef);
    await setDoc(docRef, data);
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(subscribersRef, id);
    await deleteDoc(docRef);
  },

  async getByEmail(email: string): Promise<Subscribers | null> {
    const q = query(subscribersRef, where("email", "==", email));
    const snapshot = await getDocs(q);
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { ...doc.data() };
  },
};

export const secretsHelpers = {
  async getVisibleToUser(email: string, isAdmin: boolean): Promise<Secret[]> {
    if (isAdmin) {
      const snapshot = await getDocs(secretsRef);
      return snapshot.docs.map((doc) => ({ ...doc.data() }));
    }
    const q = query(secretsRef, where("visibleTo", "array-contains", email));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ ...doc.data() }));
  },

  async update(id: string, data: Partial<Secret>): Promise<void> {
    const docRef = doc(secretsRef, id);
    await updateDoc(docRef, { ...data, updatedAt: Timestamp.now() });
  },

  async delete(id: string): Promise<void> {
    const docRef = doc(secretsRef, id);
    await deleteDoc(docRef);
  },

  async create(
    data: Omit<Secret, "id" | "createdAt" | "updatedAt">
  ): Promise<void> {
    const docRef = doc(secretsRef);
    const encryptedValue = encryptValue(data.value);
    const secretData: Secret = {
      id: docRef.id,
      key: data.key,
      value: encryptedValue,
      visibleTo: data.visibleTo || [],
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
    };
    await setDoc(docRef, secretData);
  },

  async getById(id: string): Promise<Secret | null> {
    const docRef = doc(secretsRef, id);
    const snapshot = await getDoc(docRef);
    if (!snapshot.exists()) return null;
    const data = snapshot.data();
    return {
      ...data,
      value: decryptValue(data.value),
    } as Secret;
  },
};

export type { Email, RichTextBlock };
