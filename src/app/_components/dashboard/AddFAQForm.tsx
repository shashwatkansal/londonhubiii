"use client";
import { useState, useEffect } from "react";
import { db } from "@lib/firebaseConfig";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuth } from "@/lib/auth";

// Form component to add FAQs (for admins only)
function AddFAQForm() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if the current user is an admin
  useEffect(() => {
    const fetchAdminStatus = async () => {
      const { user } = useAuth();

      if (user) {
        try {
          // Look up the user in the admins collection
          const adminRef = doc(db, "admins", user.email);
          const adminDoc = await getDoc(adminRef);

          if (adminDoc.exists()) {
            setIsAdmin(true); // User is an admin
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchAdminStatus();
  }, []);

  // Function to submit the FAQ
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (question && answer) {
      try {
        await addDoc(collection(db, "faqs"), {
          question,
          answer,
        });
        alert("FAQ added successfully!");
        setQuestion("");
        setAnswer("");
      } catch (error) {
        console.error("Error adding FAQ:", error);
      }
    } else {
      alert("Please fill in both fields");
    }
  };

  // If loading or not an admin, show appropriate message
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!isAdmin) {
    return <p>You do not have access to add FAQs.</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 shadow-lg rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Add a New FAQ</h2>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Question
        </label>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter the question"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Answer
        </label>
        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="Enter the answer"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Submit FAQ
      </button>
    </form>
  );
};

export default AddFAQForm;
