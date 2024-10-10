"use client";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  query,
  where,
  getDocs,
  doc,
  Timestamp,
  getDoc,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { db } from "@lib/firebaseConfig";
import { useAuth } from "@/lib/auth";
import { toast } from "react-hot-toast";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import FileUpload from "./file-upload";
import { Post } from "@/interfaces/post";

// Dynamically import ReactQuill to prevent server-side rendering issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// Slug generation function
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
    .replace(/^-+|-+$/g, ""); // Remove any leading or trailing hyphens
}

const CreatePostSection = () => {
  const { user } = useAuth(); // Get current user
  const [post, setPost] = useState<Post>({
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    ogImage: { url: "" }, // Ensure ogImage is initialized with an empty url
    slug: "",
    author: {
      name: user?.displayName || "Anonymous",
      email: user?.email || "unknown@example.com",
      picture: "", // Default to empty string
    },
    date: Timestamp.now(),
    status: "draft",
  });
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null); // File for cover image
  const [loading, setLoading] = useState(false);
  const [drafts, setDrafts] = useState<Post[]>([]); // Store user drafts
  const [editingDraftId, setEditingDraftId] = useState<string | null>(null); // Track the draft being edited

  // Fetch drafts created by the current user
  useEffect(() => {
    const fetchDrafts = async () => {
      if (user?.email) {
        const draftsQuery = query(
          collection(db, "posts"),
          where("author.email", "==", user.email),
          where("status", "==", "draft")
        );
        const draftDocs = await getDocs(draftsQuery);
        const userDrafts = draftDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Post[];
        setDrafts(userDrafts);
      }
    };

    fetchDrafts();
  }, [user]);

  // Handle form updates
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [id]: value,
    }));
  };

  // Handle ReactQuill content change
  const handleContentChange = (value: string) => {
    setPost((prevPost) => ({
      ...prevPost,
      content: value,
    }));
  };

  // Function to upload image to Firebase Storage
  const uploadImage = async (file: File) => {
    const storage = getStorage();
    const storageRef = ref(storage, `cover-images/${file.name}_${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    return new Promise<string>((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Optionally, handle progress updates here
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error("Upload failed:", error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  // Function to save a post (either draft or published)
  const savePost = async (status: "draft" | "published") => {
    setLoading(true);

    // Validate form inputs
    if (!post.title || !post.excerpt || !post.content) {
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      let uploadedImageUrl = post.coverImage;

      // If the user selected a new file, upload it
      if (coverImageFile) {
        uploadedImageUrl = await uploadImage(coverImageFile);
      }

      const slug = generateSlug(post.title);

      // Prepare post data
      const updatedPost = {
        ...post,
        coverImage: uploadedImageUrl || "",
        slug,
        status,
        date: Timestamp.now(),
      };

      if (editingDraftId) {
        // If editing an existing draft, update it
        const docRef = doc(db, "posts", editingDraftId);
        const docSnapshot = await getDoc(docRef); // Check if the document exists

        if (docSnapshot.exists()) {
          await updateDoc(docRef, updatedPost);
          toast.success(
            status === "draft"
              ? "Draft updated successfully!"
              : "Post published successfully!"
          );
        } else {
          toast.error("No document found to update.");
        }
      } else {
        // If creating a new post or draft
        const postRef = collection(db, "posts");
        await addDoc(postRef, updatedPost);
        toast.success(
          status === "draft"
            ? "Draft saved successfully!"
            : "Post published successfully!"
        );
      }

      // Reset form
      setPost({
        title: "",
        excerpt: "",
        content: "",
        coverImage: "",
        ogImage: { url: "" },
        slug: "",
        author: {
          name: user?.displayName || "Anonymous",
          email: user?.email || "unknown@example.com",
          picture: "",
        },
        date: Timestamp.now(),
        status: "draft",
      });
      setCoverImageFile(null); // Clear the file input
      setEditingDraftId(null); // Reset draft edit mode
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("Failed to save post." + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to load a draft into the form for editing
  const loadDraft = (draft: Post) => {
    setPost(draft);
    setEditingDraftId(draft.slug); // Track the draft being edited
  };

  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-center">
        {editingDraftId ? "Edit Draft" : "Create a New Post"}
        <p className="text-sm text-gray-600 mt-2 text-center max-w-md mx-auto">
          Ensure you save the draft once you're done editing, or publish the
          post when you're ready. Otherwise, your changes will be lost.
        </p>
      </h2>
      <form className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-lg font-semibold mb-2">
            Post Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full px-4 py-2 border rounded-lg"
            value={post.title}
            onChange={handleInputChange}
            placeholder="Enter the post title"
            required
          />
        </div>

        {/* Excerpt */}
        <div>
          <label htmlFor="excerpt" className="block text-lg font-semibold mb-2">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            className="w-full px-4 py-2 border rounded-lg"
            value={post.excerpt}
            onChange={handleInputChange}
            placeholder="Enter a short description of the post"
            required
          />
        </div>

        {/* Rich Text Editor for Post Content */}
        <div>
          <label htmlFor="content" className="block text-lg font-semibold mb-2">
            Post Content
          </label>
          <ReactQuill
            theme="snow"
            value={post.content}
            onChange={handleContentChange}
            modules={{
              toolbar: [
                [{ header: "1" }, { header: "2" }, { font: [] }],
                [{ list: "ordered" }, { list: "bullet" }],
                ["bold", "italic", "underline", "strike"],
                ["blockquote", "code-block"],
                [{ align: [] }],
                ["link", "image", "video"],
                [{ color: [] }, { background: [] }],
                ["clean"],
              ],
            }}
            formats={[
              "header",
              "font",
              "list",
              "bullet",
              "bold",
              "italic",
              "underline",
              "strike",
              "blockquote",
              "code-block",
              "link",
              "image",
              "video",
              "color",
              "background",
              "align",
            ]}
            placeholder="Write your post content here..."
            className="bg-white"
            style={{
              fontFamily:
                "'Aperçu', 'Avenir', 'Proxima Nova', Arial, sans-serif",
            }}
          />
        </div>

        {/* Cover Image */}
        <div>
          <FileUpload onFileChange={(file) => setCoverImageFile(file)} />
        </div>

        {/* OG Image URL */}
        <div>
          <label htmlFor="ogImage" className="block text-lg font-semibold mb-2">
            Open Graph Image URL (Optional)
          </label>
          <input
            type="text"
            id="ogImage"
            className="w-full px-4 py-2 border rounded-lg"
            value={post.ogImage.url}
            onChange={(e) =>
              setPost((prevPost) => ({
                ...prevPost,
                ogImage: { url: e.target.value },
              }))
            }
            placeholder="Enter the OG image URL (optional)"
          />
        </div>

        {/* Save as Draft or Publish Buttons */}
        <div className="flex space-x-4 justify-center">
          <button
            type="button"
            className="px-6 py-3 bg-gray-600 text-white font-bold rounded-lg shadow-md hover:bg-gray-700 transition-colors duration-300"
            disabled={loading}
            onClick={() => savePost("draft")}
          >
            {loading ? "Saving..." : "Save as Draft"}
          </button>
          <button
            type="button"
            className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
            disabled={loading}
            onClick={() => savePost("published")}
          >
            {loading ? "Publishing..." : "Publish"}
          </button>
        </div>
      </form>

      {/* Display User's Drafts */}
      {drafts.length > 0 && (
        <section className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Your Drafts</h3>
          <ul className="space-y-4">
            {drafts.map((draft) => (
              <li key={draft.slug} className="p-4 border rounded-lg shadow-md">
                <h4 className="text-xl font-bold">{draft.title}</h4>
                <p className="text-sm text-gray-600">{draft.excerpt}</p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg"
                  onClick={() => loadDraft(draft)}
                >
                  Edit this Draft
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
};

export default CreatePostSection;
