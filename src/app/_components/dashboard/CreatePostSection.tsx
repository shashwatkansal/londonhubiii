"use client";
import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  doc,
  Timestamp,
  getDoc,
  setDoc,
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
import { Author } from "@/interfaces/author";

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
  const [isAdmin, setIsAdmin] = useState(false);
  const [post, setPost] = useState<Post>({
    title: "",
    excerpt: "",
    content: "",
    coverImage: "",
    ogImage: { url: "" },
    slug: "",
    authors: [
      {
        name: user?.displayName || "Anonymous",
        email: user?.email || "unknown@example.com",
        picture: "",
      },
    ],
    authorsIndex: [],
    date: Timestamp.now(),
    status: "draft",
  });
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [drafts, setDrafts] = useState<Post[]>([]);
  const [publishedPosts, setPublishedPosts] = useState<Post[]>([]);
  const [editingDraftId, setEditingDraftId] = useState<string | null>(null);

  // New state for managing additional authors
  const [newAuthorName, setNewAuthorName] = useState("");
  const [newAuthorEmail, setNewAuthorEmail] = useState("");
  const [newAuthorPicture, setNewAuthorPicture] = useState("");

  // Fetch if the user is an admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user?.email) {
        const adminDocRef = doc(db, "admins", user.email);
        const adminDocSnap = await getDoc(adminDocRef);

        if (adminDocSnap.exists()) {
          setIsAdmin(true); // Set user as admin if document with their email exists
        } else {
          setIsAdmin(false);
        }
      }
    };

    checkAdminStatus();
  }, [user]);

  // Fetch both drafts and published posts
  useEffect(() => {
    const fetchPosts = async () => {
      if (user?.email) {
        let draftsQuery;
        let publishedQuery;

        // Fetch all posts for admins, otherwise only fetch posts for the user
        if (isAdmin) {
          draftsQuery = query(
            collection(db, "posts"),
            where("status", "==", "draft")
          );
          publishedQuery = query(
            collection(db, "posts"),
            where("status", "==", "published")
          );
        } else {
          draftsQuery = query(
            collection(db, "posts"),
            where("authorsIndex", "array-contains", user.email),
            where("status", "==", "draft")
          );
          publishedQuery = query(
            collection(db, "posts"),
            where("authorsIndex", "array-contains", user.email),
            where("status", "==", "published")
          );
        }

        // Fetch drafts
        const draftDocs = await getDocs(draftsQuery);
        const userDrafts = draftDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as unknown as Post[];

        // Fetch published posts
        const publishedDocs = await getDocs(publishedQuery);
        const userPublished = publishedDocs.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as unknown as Post[];

        setDrafts(userDrafts);
        setPublishedPosts(userPublished);
      }
    };

    fetchPosts();
  }, [user, isAdmin]);

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

  // Function to add an author
  const addAuthor = () => {
    if (!newAuthorName || !newAuthorEmail) {
      toast.error("Please enter both name and email for the author.");
      return;
    }

    const newAuthor: Author = {
      name: newAuthorName,
      email: newAuthorEmail,
      picture: newAuthorPicture || "", // Optional picture
    };

    setPost((prevPost) => ({
      ...prevPost,
      authors: [...prevPost.authors, newAuthor], // Add new author
    }));

    // Clear the input fields
    setNewAuthorName("");
    setNewAuthorEmail("");
    setNewAuthorPicture("");
  };

  // Function to remove an author by index
  const removeAuthor = (index: number) => {
    setPost((prevPost) => ({
      ...prevPost,
      authors: prevPost.authors.filter((_, i) => i !== index),
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

      // Generate authorsIndex array from authors' emails
      const authorsIndex = post.authors.map((author) => author.email);

      // Prepare updated post data
      const updatedPost = {
        ...post,
        coverImage: uploadedImageUrl || "",
        slug,
        status,
        authorsIndex, // Include the authorsIndex array in the post data
        date: Timestamp.now(),
      };

      const postRef = doc(db, "posts", slug);
      const docSnapshot = await getDoc(postRef);

      if (docSnapshot.exists()) {
        // Update existing post (re-publish or revert to draft)
        await updateDoc(postRef, updatedPost);
        toast.success(
          status === "draft"
            ? "Post reverted to draft successfully!"
            : "Post updated and published successfully!"
        );
      } else {
        // Create a new post
        await setDoc(postRef, updatedPost);
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
        authors: [
          {
            name: user?.displayName || "Anonymous",
            email: user?.email || "unknown@example.com",
            picture: "",
          },
        ],
        authorsIndex: [],
        date: Timestamp.now(),
        status: "draft",
      });
      setCoverImageFile(null);
      setEditingDraftId(null);
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("Failed to save post." + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a draft
  const deleteDraft = async (draftId: string) => {
    try {
      await deleteDoc(doc(db, "posts", draftId));
      toast.success("Draft deleted successfully!");

      setDrafts((prevDrafts) =>
        prevDrafts.filter((draft) => draft.slug !== draftId)
      );
    } catch (error) {
      console.error("Error deleting draft:", error);
      toast.error("Failed to delete draft.");
    }
  };

  // Function to load a post (draft or published) into the form for editing
  const loadPost = (postToEdit: Post) => {
    setPost(postToEdit);
    setEditingDraftId(postToEdit.slug);
  };

  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-center">
        {editingDraftId ? "Edit Post" : "Create a New Post"}
        <p className="text-sm text-gray-600 mt-2 text-center max-w-md mx-auto">
          Ensure you save the draft once you're done editing, or publish the
          post when you're ready. Otherwise, your changes will be lost.
        </p>
      </h2>
      {isAdmin && (
        <div className="p-4 mb-6 bg-yellow-100 border border-yellow-300 rounded-lg">
          <p className="text-yellow-800">
            You are viewing this as an <strong>Admin</strong>. You have access
            to all posts in the system. Please ensure to contact the post author
            before making changes, as this post might not belong to you.
          </p>
        </div>
      )}
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

        {/* Authors */}
        <div>
          <label className="block text-lg font-semibold mb-2">Authors</label>
          {post.authors.map((author, index) => (
            <div key={index} className="flex items-center mb-2 space-x-4">
              <p>{author.name}</p>
              <button
                type="button"
                className="text-red-500 underline"
                onClick={() => removeAuthor(index)}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Add new author fields */}
          <div className="mt-4">
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg mb-2"
              placeholder="Author Name"
              value={newAuthorName}
              onChange={(e) => setNewAuthorName(e.target.value)}
            />
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg mb-2"
              placeholder="Author Email"
              value={newAuthorEmail}
              onChange={(e) => setNewAuthorEmail(e.target.value)}
            />
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg mb-2"
              placeholder="Author Picture URL (Optional)"
              value={newAuthorPicture}
              onChange={(e) => setNewAuthorPicture(e.target.value)}
            />
            <button
              type="button"
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
              onClick={addAuthor}
            >
              Add Author
            </button>
          </div>
        </div>

        {/* Cover Image */}
        <div>
          <FileUpload onFileChange={(file) => setCoverImageFile(file)} />
          {post.coverImage && (
            <div className="mt-4">
              <p className="text-gray-600">Current Cover Image:</p>
              <img
                src={post.coverImage}
                alt="Current cover"
                className="mt-2 max-w-full h-auto rounded"
              />
            </div>
          )}
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
                <p className="text-sm text-gray-600">
                  {draft.excerpt} - By{" "}
                  {draft.authors.map((a) => a.name).join(", ")}
                </p>
                <button
                  className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg"
                  onClick={() => loadPost(draft)}
                >
                  Edit this Draft
                </button>
                <button
                  className="mt-4 ml-4 px-4 py-2 bg-red-600 text-white font-bold rounded-lg"
                  onClick={() => deleteDraft(draft.slug)}
                >
                  Delete this Draft
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Display Published Posts */}
      {publishedPosts.length > 0 && (
        <section className="mt-8">
          <h3 className="text-2xl font-semibold mb-4">Your Published Posts</h3>
          <ul className="space-y-4">
            {publishedPosts.map((post) => (
                <li key={post.slug} className="p-4 border rounded-lg shadow-md">
                  <h4 className="text-xl font-bold">{post.title}</h4>
                  <p className="text-sm text-gray-600">
                    {post.excerpt} - By{" "}
                    {post.authors.map((a) => a.name).join(", ")}
                  </p>
                  <button
                    className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded-lg"
                    onClick={() => loadPost(post)}
                  >
                  Edit this Post
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
