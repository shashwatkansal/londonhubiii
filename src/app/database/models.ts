import { db } from "./firebase-config";
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
  DocumentData,
  QueryDocumentSnapshot,
  DocumentReference,
  CollectionReference,
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
  displayName: string;
  bio: string;
  linkedin: string;
  instagram: string;
  toplink: string;
  profilepic: string;
  externalViewEnabled: boolean;
  role: Role;
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
  date: string;
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

// Directory helpers
export const directoryHelpers = {
  async getAll(): Promise<Directory[]> {
    const snapshot = await getDocs(directoryRef);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async getByRole(role: Role): Promise<Directory[]> {
    const q = query(directoryRef, where("role", "==", role));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  },

  async update(id: string, data: Partial<Directory>): Promise<void> {
    const docRef = doc(directoryRef, id);
    await updateDoc(docRef, data);
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

export type { Email, RichTextBlock };
