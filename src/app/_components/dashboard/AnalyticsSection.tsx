import React, { useState, useEffect } from "react";
import { db } from "@lib/firebaseConfig";
import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { FaTrashAlt, FaEdit, FaPlus, FaSave, FaTimes } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface FAQ {
    id: string;
    question: string;
    answer: string;
}

const FAQManagement = () => {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [newFAQ, setNewFAQ] = useState({ question: "", answer: "" });
    const [isAdding, setIsAdding] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchFAQs();
    }, []);

    const fetchFAQs = async () => {
        setLoading(true);
        try {
            const querySnapshot = await getDocs(collection(db, "faqs"));
            const faqsData: FAQ[] = querySnapshot.docs.map(
                (doc) => ({ id: doc.id, ...doc.data() } as FAQ)
            );
            setFaqs(faqsData);
        } catch (error) {
            console.error("Error fetching FAQs:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddFAQ = async () => {
        if (newFAQ.question && newFAQ.answer) {
            try {
                const docRef = await addDoc(collection(db, "faqs"), newFAQ);
                setFaqs([...faqs, { id: docRef.id, ...newFAQ }]);
                setNewFAQ({ question: "", answer: "" });
                setIsAdding(false);
            } catch (error) {
                console.error("Error adding FAQ:", error);
            }
        }
    };

    const handleUpdateFAQ = async (id: string, updatedFAQ: Partial<FAQ>) => {
        try {
            await updateDoc(doc(db, "faqs", id), updatedFAQ);
            setFaqs(
                faqs.map((faq) =>
                    faq.id === id ? { ...faq, ...updatedFAQ } : faq
                )
            );
            setEditingId(null);
        } catch (error) {
            console.error("Error updating FAQ:", error);
        }
    };

    const handleDeleteFAQ = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this FAQ?")) {
            try {
                await deleteDoc(doc(db, "faqs", id));
                setFaqs(faqs.filter((faq) => faq.id !== id));
            } catch (error) {
                console.error("Error deleting FAQ:", error);
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
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Manage FAQs
            </h2>

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
                        <h3 className="text-xl font-semibold mb-2">
                            Add New FAQ
                        </h3>
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
                            onChange={(e) =>
                                setNewFAQ({ ...newFAQ, answer: e.target.value })
                            }
                            className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                            rows={3}
                        />
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
                            key={faq.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-gray-50 p-4 rounded-lg shadow"
                        >
                            {editingId === faq.id ? (
                                <div>
                                    <input
                                        type="text"
                                        value={faq.question}
                                        onChange={(e) =>
                                            handleUpdateFAQ(faq.id, {
                                                question: e.target.value,
                                            })
                                        }
                                        className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                                    />
                                    <textarea
                                        value={faq.answer}
                                        onChange={(e) =>
                                            handleUpdateFAQ(faq.id, {
                                                answer: e.target.value,
                                            })
                                        }
                                        className="w-full p-2 mb-2 border border-gray-300 rounded-md"
                                        rows={3}
                                    />
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => setEditingId(null)}
                                            className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-300"
                                        >
                                            <FaTimes />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleUpdateFAQ(faq.id, faq)
                                            }
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300"
                                        >
                                            <FaSave />
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">
                                        {faq.question}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {faq.answer}
                                    </p>
                                    <div className="flex justify-end space-x-2">
                                        <button
                                            onClick={() => setEditingId(faq.id)}
                                            className="px-3 py-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-300"
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteFAQ(faq.id)
                                            }
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
