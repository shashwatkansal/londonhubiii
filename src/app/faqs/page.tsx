"use client";
import { useState, useEffect } from "react";
import { db } from "@lib/firebaseConfig"; // Firebase Firestore configuration
import { getDocs, collection } from "firebase/firestore";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { FaChevronDown } from "react-icons/fa";

interface FAQ {
  question: string;
  answer: string;
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch FAQs from Firebase Firestore
  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "faqs"));
        const faqsData: FAQ[] = [];
        querySnapshot.forEach((doc) => {
          faqsData.push(doc.data() as FAQ);
        });
        setFaqs(faqsData);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl font-extrabold text-center mb-12 text-blue-900">
          Frequently Asked Questions
        </h1>

        {loading ? (
          <p className="text-center text-xl text-gray-600">Loading FAQs...</p>
        ) : (
          <div className="max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <Disclosure key={index}>
                {({ open }) => (
                  <div className="mb-4 bg-white shadow-lg rounded-lg overflow-hidden">
                    <DisclosureButton className="flex justify-between w-full px-4 py-4 text-left text-xl font-medium text-gray-800 hover:bg-gray-200 transition">
                      <span>{faq.question}</span>
                      <FaChevronDown
                        className={`${
                          open ? "transform rotate-180" : ""
                        } text-gray-600 transition-transform duration-200`}
                      />
                    </DisclosureButton>
                    <DisclosurePanel className="px-4 pt-4 pb-2 text-gray-700">
                      {faq.answer}
                    </DisclosurePanel>
                  </div>
                )}
              </Disclosure>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
