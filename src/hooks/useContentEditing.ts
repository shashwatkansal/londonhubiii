import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import toast from "react-hot-toast";

interface ContentData {
  [key: string]: any;
}

export const useContentEditing = (collection: string, documentId: string, initialData: ContentData) => {
  const [content, setContent] = useState<ContentData>(initialData);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Check if user is in edit mode (could be based on auth, URL params, etc.)
  useEffect(() => {
    const checkEditMode = () => {
      // Check for edit mode in URL params
      const urlParams = new URLSearchParams(window.location.search);
      const editParam = urlParams.get("edit");
      setIsEditMode(editParam === "true");
    };

    checkEditMode();
    window.addEventListener("popstate", checkEditMode);
    return () => window.removeEventListener("popstate", checkEditMode);
  }, []);

  // Load content from Firestore only in edit mode
  useEffect(() => {
    const loadContent = async () => {
      if (!isEditMode) return;
      
      setIsLoading(true);
      try {
        const docRef = doc(db, collection, documentId);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setContent({ ...initialData, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error loading content:", error);
        // Don't show error toast in non-edit mode
        if (isEditMode) {
          toast.error("Failed to load content");
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadContent();
  }, [collection, documentId, initialData, isEditMode]);

  // Update a specific field
  const updateField = async (field: string, value: any) => {
    const newContent = { ...content, [field]: value };
    setContent(newContent);
    
    if (isEditMode) {
      setIsSaving(true);
      try {
        const docRef = doc(db, collection, documentId);
        await setDoc(docRef, newContent, { merge: true });
        toast.success("Content updated!");
      } catch (error) {
        console.error("Error saving content:", error);
        toast.error("Failed to save content");
      } finally {
        setIsSaving(false);
      }
    }
  };

  // Toggle edit mode
  const toggleEditMode = () => {
    const newEditMode = !isEditMode;
    setIsEditMode(newEditMode);
    
    // Update URL
    const url = new URL(window.location.href);
    if (newEditMode) {
      url.searchParams.set("edit", "true");
    } else {
      url.searchParams.delete("edit");
    }
    window.history.pushState({}, "", url);
  };

  return {
    content,
    isEditMode,
    isLoading,
    isSaving,
    updateField,
    toggleEditMode,
  };
};