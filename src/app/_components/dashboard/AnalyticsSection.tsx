"use client";
import { useState, useEffect } from "react";
import { db } from "@lib/firebaseConfig"; // Firestore configuration
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

// FAQ interface
interface FAQ {
  id: string;
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null); // For editing
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("manageFaqs"); // Active tab state

  // Fetch FAQs from Firestore
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "faqs"));
        const faqsData: FAQ[] = querySnapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as FAQ)
        );
        setFaqs(faqsData);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  // Add or Update FAQ
  const handleAddOrUpdateFAQ = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newQuestion && newAnswer) {
      try {
        if (editingFAQ) {
          // Update existing FAQ
          await updateDoc(doc(db, "faqs", editingFAQ.id), {
            question: newQuestion,
            answer: newAnswer,
          });
          setFaqs(
            faqs.map((faq) =>
              faq.id === editingFAQ.id
                ? { ...faq, question: newQuestion, answer: newAnswer }
                : faq
            )
          );
          setEditingFAQ(null); // Clear edit state
        } else {
          // Add new FAQ
          const docRef = await addDoc(collection(db, "faqs"), {
            question: newQuestion,
            answer: newAnswer,
          });
          setFaqs([
            ...faqs,
            { id: docRef.id, question: newQuestion, answer: newAnswer },
          ]);
        }

        setNewQuestion("");
        setNewAnswer("");
      } catch (error) {
        console.error("Error adding/updating FAQ:", error);
      }
    }
  };

  // Delete an FAQ with double confirmation
  const handleDeleteFAQ = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this FAQ?"
    );
    if (confirmDelete) {
      const doubleCheck = window.confirm(
        "This action is irreversible. Are you sure?"
      );
      if (doubleCheck) {
        try {
          await deleteDoc(doc(db, "faqs", id));
          setFaqs(faqs.filter((faq) => faq.id !== id));
        } catch (error) {
          console.error("Error deleting FAQ:", error);
        }
      }
    }
  };

  // Set FAQ to be edited
  const handleEditFAQ = (faq: FAQ) => {
    setEditingFAQ(faq);
    setNewQuestion(faq.question);
    setNewAnswer(faq.answer);
  };

  // Tab content for Manage FAQs
  const renderManageFAQContent = () => (
    <div>
      <h4
        className="
        text-center text-lg
        bg-blue-100 text-blue-800
        p-4 rounded-lg shadow-lg
        mb-8
      "
      >
        Manage your FAQs here. You can add, edit, and delete FAQs as needed.
      </h4>
      {/* Add/Edit FAQ Form */}
      <form
        onSubmit={handleAddOrUpdateFAQ}
        className="max-w-xl mx-auto bg-white p-6 shadow-lg rounded-lg mb-8"
      >
        <h2 className="text-2xl font-bold mb-4">
          {editingFAQ ? "Edit FAQ" : "Add a New FAQ"}
        </h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Question
          </label>
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter the question"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Answer
          </label>
          <textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Enter the answer"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          {editingFAQ ? "Update FAQ" : "Submit FAQ"}
        </button>
      </form>

      {/* Display FAQs */}
      {loading ? (
        <p className="text-center text-lg">Loading FAQs...</p>
      ) : (
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="mb-4 bg-white shadow-lg rounded-lg overflow-hidden p-6"
            >
              <h2 className="text-xl font-bold">{faq.question}</h2>
              <p className="mt-2 text-gray-700">{faq.answer}</p>
              <div className="flex space-x-4 mt-4">
                <button
                  className="text-blue-500 flex items-center"
                  onClick={() => handleEditFAQ(faq)}
                >
                  <FaEdit className="mr-2" /> Edit
                </button>
                <button
                  className="text-red-500 flex items-center"
                  onClick={() => handleDeleteFAQ(faq.id)}
                >
                  <FaTrashAlt className="mr-2" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Tab content for another tab (e.g. Dashboard, Analytics)
  const renderOtherTabContent = () => (
    <div className="p-6 text-center">
      <h2 className="text-3xl font-bold">Other Tab Content</h2>
      <p>Here you can display other relevant content for your admins.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-blue-900">
          Admin Dashboard
        </h1>
        <p
          className="
          text-center text-lg
          bg-blue-100 text-blue-800
          p-4 rounded-lg shadow-lg
          mb-8
        "
        >
          Welcome to the Admin Dashboard! Here you can manage your FAQs, view
          analytics, and more
        </p>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setActiveTab("manageFaqs")}
            className={`${
              activeTab === "manageFaqs"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            } px-4 py-2 rounded-lg mx-2`}
          >
            Manage FAQs
          </button>
          {/* <button
            onClick={() => setActiveTab("otherTab")}
            className={`${
              activeTab === "otherTab"
                ? "bg-blue-500 text-white"
                : "bg-gray-300"
            } px-4 py-2 rounded-lg mx-2`}
          >
            Other Tab
          </button> */}
        </div>

        {/* Tab Content */}
        {activeTab === "manageFaqs"
          ? renderManageFAQContent()
          : renderOtherTabContent()}
      </div>
    </div>
  );
};

export default FAQSection;
