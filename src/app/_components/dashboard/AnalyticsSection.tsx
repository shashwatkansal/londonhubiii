import React, { useState, useEffect } from "react";
import { FaTrashAlt, FaEdit, FaPlus, FaSave, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ, faqHelpers } from "@/app/database/models";
import toast from "react-hot-toast";

// Internal type to track FAQs with their Firebase document references
type FAQWithKey = FAQ & { key: string };

const FAQManagement = () => {
  const [faqs, setFaqs] = useState<FAQWithKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [newFAQ, setNewFAQ] = useState<FAQ>({
    question: "",
    answer: "",
    category: "general",
  });
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    setLoading(true);
    try {
      const faqsData = await faqHelpers.getAll();
      // Add key property for tracking
      setFaqs(faqsData.map((faq) => ({ ...faq, key: crypto.randomUUID() })));
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      toast.error("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  const handleAddFAQ = async () => {
    if (newFAQ.question && newFAQ.answer) {
      try {
        await faqHelpers.create(newFAQ);
        await fetchFAQs();
        setNewFAQ({ question: "", answer: "", category: "general" });
        setIsAdding(false);
        toast.success("FAQ added successfully");
      } catch (error) {
        console.error("Error adding FAQ:", error);
        toast.error("Failed to add FAQ");
      }
    }
  };

  const handleUpdateFAQ = async (faq: FAQWithKey) => {
    try {
      const { key, ...faqData } = faq;
      await faqHelpers.update(key, faqData);
      setFaqs(faqs.map((f) => (f.key === key ? faq : f)));
      setEditingKey(null);
      toast.success("FAQ updated successfully");
    } catch (error) {
      console.error("Error updating FAQ:", error);
      toast.error("Failed to update FAQ");
    }
  };

  const handleDeleteFAQ = async (key: string) => {
    if (window.confirm("Are you sure you want to delete this FAQ?")) {
      try {
        await faqHelpers.delete(key);
        setFaqs(faqs.filter((faq) => faq.key !== key));
        toast.success("FAQ deleted successfully");
      } catch (error) {
        console.error("Error deleting FAQ:", error);
        toast.error("Failed to delete FAQ");
      }
    }
  };

  const filteredFAQs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage FAQs</h2>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <AnimatePresence>
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 bg-blue-50 p-4 rounded-lg"
          >
            <h3 className="text-xl font-semibold mb-2">Add New FAQ</h3>
            <input
              type="text"
              placeholder="Question"
              value={newFAQ.question}
              onChange={(e) =>
                setNewFAQ({
                  ...newFAQ,
                  question: e.target.value,
                })
              }
              className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            />
            <textarea
              placeholder="Answer"
              value={newFAQ.answer}
              onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded-md"
              rows={3}
            />
            <select
              value={newFAQ.category}
              onChange={(e) =>
                setNewFAQ({ ...newFAQ, category: e.target.value })
              }
              className="w-full p-2 mb-2 border border-gray-300 rounded-md"
            >
              <option value="general">General</option>
              <option value="technical">WEF</option>
              <option value="billing">Recruitment</option>
              <option value="support">Projects</option>
            </select>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsAdding(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddFAQ}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
              >
                Add FAQ
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="mb-6 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-300 flex items-center"
        >
          <FaPlus className="mr-2" /> Add New FAQ
        </button>
      )}

      {loading ? (
        <p className="text-center text-gray-600">Loading FAQs...</p>
      ) : (
        <div className="space-y-4">
          {filteredFAQs.map((faq) => (
            <motion.div
              key={faq.key}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-gray-50 p-4 rounded-lg shadow"
            >
              {editingKey === faq.key ? (
                <div>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) =>
                      setFaqs(
                        faqs.map((f) =>
                          f.key === faq.key
                            ? { ...f, question: e.target.value }
                            : f
                        )
                      )
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                  />
                  <textarea
                    value={faq.answer}
                    onChange={(e) =>
                      setFaqs(
                        faqs.map((f) =>
                          f.key === faq.key
                            ? { ...f, answer: e.target.value }
                            : f
                        )
                      )
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                    rows={3}
                  />
                  <select
                    value={faq.category}
                    onChange={(e) =>
                      setFaqs(
                        faqs.map((f) =>
                          f.key === faq.key
                            ? { ...f, category: e.target.value }
                            : f
                        )
                      )
                    }
                    className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                  >
                    <option value="general">General</option>
                    <option value="technical">Technical</option>
                    <option value="billing">Billing</option>
                    <option value="support">Support</option>
                  </select>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingKey(null)}
                      className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
                    >
                      <FaTimes />
                    </button>
                    <button
                      onClick={() => handleUpdateFAQ(faq)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                    >
                      <FaSave />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600 mb-2">{faq.answer}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    Category: {faq.category}
                  </p>
                  <div className="flex justify-end space-x-2">
                    <button
                      onClick={() => setEditingKey(faq.key)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteFAQ(faq.key)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FAQManagement;
