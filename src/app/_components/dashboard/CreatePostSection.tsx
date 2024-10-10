import { useAuth } from "@/lib/auth";
import { db } from "@lib/firebaseConfig"; // Import Firestore config
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";

// Dynamically import ReactQuill to prevent server-side rendering issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const CreatePostSection = () => {
  const { user } = useAuth(); // Get current user
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState(""); // Content from ReactQuill
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [drafts, setDrafts] = useState<any[]>([]); // Store user drafts
  const [editingDraftId, setEditingDraftId] = useState<string | null>(null); // Track the draft being edited

  // Quill modules for controlling the toolbar (you can customize it further)
  const quillModules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      [{ align: [] }],
      ["link", "image", "video"], // media buttons
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      ["clean"], // remove formatting button
    ],
  };

  const quillFormats = [
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
  ];

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
        }));
        setDrafts(userDrafts);
      }
    };

    fetchDrafts();
  }, [user]);

  // Function to save a post (either draft or published)
  const savePost = async (status: "draft" | "published") => {
    setLoading(true);

    if (!title || !excerpt || !content) {
      toast.error("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      if (editingDraftId) {
        // If editing an existing draft, update it
        const docRef = doc(db, "posts", editingDraftId);
        await updateDoc(docRef, {
          title,
          excerpt,
          content,
          coverImage: coverImage || "",
          status,
          date: Timestamp.now(),
        });
        toast.success(
          status === "draft"
            ? "Draft updated successfully!"
            : "Post published successfully!"
        );
      } else {
        // If creating a new post or draft
        const postRef = collection(db, "posts");
        const newPost = {
          title,
          excerpt,
          content,
          coverImage: coverImage || "",
          author: {
            name: user?.displayName || "Anonymous",
            email: user?.email || "unknown@example.com",
          },
          date: Timestamp.now(),
          status,
        };
        await addDoc(postRef, newPost);
        toast.success(
          status === "draft"
            ? "Draft saved successfully!"
            : "Post published successfully!"
        );
      }

      // Reset form
      setTitle("");
      setExcerpt("");
      setContent("");
      setCoverImage("");
      setEditingDraftId(null); // Reset draft edit mode
    } catch (error) {
      console.error("Error saving post:", error);
      toast.error("Failed to save post.");
    } finally {
      setLoading(false);
    }
  };

  // Function to load a draft into the form for editing
  const loadDraft = (draft: any) => {
    setTitle(draft.title);
    setExcerpt(draft.excerpt);
    setContent(draft.content);
    setCoverImage(draft.coverImage || "");
    setEditingDraftId(draft.id); // Track the draft being edited
  };

  return (
    <section className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-extrabold mb-6 text-center">
        {editingDraftId ? "Edit Draft" : "Create a New Post"}
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
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
            value={content}
            onChange={setContent}
            modules={quillModules}
            formats={quillFormats}
            placeholder="Write your post content here..."
            className="bg-white"
          />
        </div>

        {/* Cover Image */}
        <div>
          <label
            htmlFor="coverImage"
            className="block text-lg font-semibold mb-2"
          >
            Cover Image URL (Optional)
          </label>
          <input
            type="text"
            id="coverImage"
            className="w-full px-4 py-2 border rounded-lg"
            value={coverImage}
            onChange={(e) => setCoverImage(e.target.value)}
            placeholder="Enter the cover image URL (optional)"
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
              <li key={draft.id} className="p-4 border rounded-lg shadow-md">
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
