import { doc, getDoc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function getSiteSetting(key: string) {
  const docRef = doc(db, "site_settings", key);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data().value : null;
}

export async function setSiteSetting(key: string, value: string) {
  const docRef = doc(db, "site_settings", key);
  await setDoc(docRef, { value });
}

export async function getAllSiteSettings() {
  const colRef = collection(db, "site_settings");
  const snapshot = await getDocs(colRef);
  const settings: Record<string, string> = {};
  snapshot.forEach((doc) => {
    settings[doc.id] = doc.data().value;
  });
  return settings;
} 