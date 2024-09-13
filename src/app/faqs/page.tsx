"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { db } from "@lib/firebaseConfig"; // Firestore connection
import { getDocs, collection } from "firebase/firestore";

// FAQ Interface
interface FAQ {
  question: string;
  answer: string;
  imageUrl?: string;
}

export default function FAQsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Fetch FAQs dynamically from Firestore
  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const faqsCollection = collection(db, "faqs"); // Assume an "faqs" collection exists
        const querySnapshot = await getDocs(faqsCollection);
        const faqsData: FAQ[] = [];
        querySnapshot.forEach((doc) => {
          faqsData.push(doc.data() as FAQ);
        });
        setFaqs(faqsData);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };

    fetchFaqs();
  }, []);

  // Toggle the expanded FAQ answer
  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto">
        <h1 className="text-5xl font-bold text-center text-blue-900 mb-12">
          Frequently Asked Questions
        </h1>

        {/* FAQs Section */}
        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <h2 className="text-2xl font-semibold text-gray-800">
                  {faq.question}
                </h2>
                <span
                  className={`transform transition-transform duration-300 ${
                    expandedIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ⬇️
                </span>
              </div>
              {expandedIndex === index && (
                <div className="mt-4 space-y-4 text-gray-700">
                  <p>{faq.answer}</p>
                  {faq.imageUrl && (
                    <div className="mt-4">
                      <Image
                        src={faq.imageUrl}
                        alt="FAQ related image"
                        width={800}
                        height={450}
                        className="rounded-lg"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Media Section */}
        <div className="mt-20">
          <h2 className="text-4xl font-bold text-center text-blue-900 mb-8">
            Learn More About the WEF Initiatives
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="relative">
              <Image
                src="/assets/images/wef-media-1.jpg"
                alt="WEF Media"
                width={400}
                height={250}
                className="rounded-lg object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-lg">
                <a
                  href="https://www.weforum.org/videos"
                  target="_blank"
                  className="text-white text-lg font-semibold bg-blue-600 px-4 py-2 rounded-full"
                  rel="noopener noreferrer"
                >
                  Watch Videos
                </a>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/assets/images/wef-media-2.jpg"
                alt="WEF Reports"
                width={400}
                height={250}
                className="rounded-lg object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-lg">
                <a
                  href="https://www.weforum.org/reports"
                  target="_blank"
                  className="text-white text-lg font-semibold bg-blue-600 px-4 py-2 rounded-full"
                  rel="noopener noreferrer"
                >
                  Read Reports
                </a>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/assets/images/wef-media-3.jpg"
                alt="WEF Podcasts"
                width={400}
                height={250}
                className="rounded-lg object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center rounded-lg">
                <a
                  href="https://www.weforum.org/podcasts"
                  target="_blank"
                  className="text-white text-lg font-semibold bg-blue-600 px-4 py-2 rounded-full"
                  rel="noopener noreferrer"
                >
                  Listen to Podcasts
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* WEF Global Image Section */}
        <div className="mt-20 text-center">
          <Image
            src="/assets/images/wef-globe.jpg"
            alt="WEF Globe"
            width={1200}
            height={600}
            className="rounded-lg shadow-lg"
          />
          <p className="text-gray-700 text-lg mt-6">
            The World Economic Forum works to bring global leaders together to
            tackle the world’s most pressing challenges, from climate change to
            social inequality. Learn more about the projects and initiatives
            shaping the future.
          </p>
        </div>
      </div>
    </div>
  );
}
