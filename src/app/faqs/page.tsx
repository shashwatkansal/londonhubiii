"use client";
import { useState, useEffect } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ, faqHelpers } from "../database/models";
import * as SETTINGS from "@/lib/settings";

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        faqHelpers
          .getAll()
          .then((faqs) => {
            setFaqs(faqs);
          })
          .catch((error) => {
            console.error("Error fetching FAQs:", error);
          });
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, []);

  const categories = [
    "All",
    ...(Array.from(new Set(faqs.map((faq) => faq.category))) as string[]),
  ].reduce<string[]>((acc, category) => {
    if (category) acc.push(category);
    return acc;
  }, []);

  const filteredFAQs = faqs.filter(
    (faq) =>
      (activeCategory === "All" || faq.category === activeCategory) &&
      (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-24 pb-16" // Added pt-24 for header space
    >
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 text-blue-900">
          {SETTINGS.FAQS_PAGE_HEADING}
        </h1>

        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 md:p-4 pl-10 md:pl-12 pr-4 rounded-full border-2 border-blue-300 focus:border-blue-500 focus:outline-none transition duration-300"
            />
            <FaSearch className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-blue-400" />
          </div>
        </div>

        <div className="flex justify-center mb-8 space-x-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3 md:px-4 py-2 rounded-full text-sm font-medium transition duration-300 mb-2 ${
                activeCategory === category
                  ? "bg-blue-500 text-white"
                  : "bg-white text-blue-500 hover:bg-blue-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
            <p className="mt-2 text-xl text-blue-800">Loading FAQs...</p>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              className="max-w-4xl mx-auto space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {filteredFAQs.map((faq, index) => (
                <Disclosure as={motion.div} key={index} layout>
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between w-full px-4 md:px-6 py-3 md:py-4 text-left text-base md:text-lg font-medium bg-white rounded-lg hover:bg-blue-50 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75 transition duration-300">
                        <span>{faq.question}</span>
                        <FaChevronDown
                          className={`${
                            open ? "transform rotate-180" : ""
                          } w-5 h-5 text-blue-500 transition-transform duration-300`}
                        />
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="px-4 md:px-6 pt-3 md:pt-4 pb-4 md:pb-6 text-sm md:text-base text-gray-700 bg-white rounded-b-lg">
                          {faq.answer}
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </motion.div>
  );
}
