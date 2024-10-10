"use client";
import Link from "next/link";
import Image from "next/image";
import { PiHandshakeFill, PiProjectorScreenChartLight } from "react-icons/pi";
import { RiTeamFill } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import {
  FormEvent,
  FormEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { MdEmail } from "react-icons/md";

export default function Index() {
  const callToActionRef = useRef<null | HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  // Smooth scroll to the CTA section if the URL contains #join-us
  useEffect(() => {
    if (window.location.hash === "#join-us" && callToActionRef.current) {
      callToActionRef.current.scrollIntoView({ behavior: "smooth" });
    }
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxStyles = {
    transform: `translateY(${offsetY * 0.5}px) scale(1.1)`,
    transition: "transform 0.05s ease-out",
    opacity: 0.4,
  };

  const handleSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subscribeToast = toast.loading("Subscribing...");

    try {
      await setDoc(
        doc(db, "subscribers", email),
        {
          email: email,
          timestamp: new Date(),
        },
        { merge: true }
      );
      toast.success("Thank you for subscribing!", { id: subscribeToast });
      setEmail(""); // Reset the input after successful subscription
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to subscribe. Please try again.", {
        id: subscribeToast,
      });
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 text-white h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/images/hub3photo.jpg"
          alt="Global Shapers Hero Image"
          layout="fill"
          objectFit="cover"
          style={parallaxStyles}
        />
        <div className="relative z-10 text-center">
          <h1 className="text-7xl font-bold drop-shadow-xl animate-fade-in-down">
            Change Begins Here
          </h1>
          <p className="text-xl mt-4 animate-fade-in-up delay-200">
            Local Ideas. Global Support. Real-World Impact.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-gradient-to-r from-wef-blue to-wef-dark-blue text-center px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-extrabold text-white mb-8 animate-fade-in-down">
            Our Mission in London
          </h2>
          <p className="text-2xl text-white mb-12">
            The Global Shapers London III Hub is a dynamic network of young,
            visionary leaders committed to tackling the city's most urgent
            challenges. United by a passion for positive change, we drive
            innovative projects and collaborations to create a more inclusive,
            sustainable, and resilient future for all of London's diverse
            communities.
          </p>
          <Link href="/impact">
            <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full transform hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl animate-slide-in-bottom">
              Learn More About Our Projects
            </button>
          </Link>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 bg-gray-100 text-center px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-extrabold text-blue-900 mb-12 animate-fade-in-down">
            Our Impact in London
          </h2>
          <p className="text-xl text-gray-700 mb-12 animate-fade-in-up">
            In the heart of London, Global Shapers are driving real change
            through innovative solutions and collaborative efforts.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
            {/* Global Shapers */}
            <div className="relative bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 opacity-10 rounded-lg"></div>
              <div className="relative z-10">
                <div className="mb-4 text-center">
                  <span className="text-blue-900 text-6xl font-extrabold">
                    25
                  </span>
                </div>
                <div className="text-gray-600 text-xl font-medium">
                  Shapers in Action
                </div>
                <div className="mt-4">
                  <RiTeamFill className="w-12 h-12 mx-auto text-blue-600" />
                </div>
              </div>
            </div>

            {/* Projects */}
            <div className="relative bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-600 opacity-10 rounded-lg"></div>
              <div className="relative z-10">
                <div className="mb-4 text-center">
                  <span className="text-blue-900 text-6xl font-extrabold">
                    6
                  </span>
                </div>
                <div className="text-gray-600 text-xl font-medium">
                  Local Projects Ongoing
                </div>
                <div className="mt-4">
                  <PiProjectorScreenChartLight className="w-12 h-12 mx-auto text-green-600" />
                </div>
              </div>
            </div>

            {/* Collaborations */}
            <div className="relative bg-white p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300 hover:shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-10 rounded-lg"></div>
              <div className="relative z-10">
                <div className="mb-4 text-center">
                  <span className="text-blue-900 text-6xl font-extrabold">
                    15
                  </span>
                </div>
                <div className="text-gray-600 text-xl font-medium">
                  Local Collaborations and Partnerships
                </div>
                <div className="mt-4">
                  <PiHandshakeFill className="w-12 h-12 mx-auto text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Six Impact Areas Section */}
      <section className="py-20 bg-white text-center px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-extrabold text-blue-900 mb-12">
            Our Six Impact Areas
          </h2>
          <p className="text-xl text-gray-700 mb-12">
            Global Shapers are dedicated to creating positive change across the
            world through six key impact areas.
          </p>

          {/* Impact Areas Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {/* Impact Area 1 */}
            <div className="bg-wef-blue text-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Image
                src="https://assets.weforum.org/sites/a0eb0000000ChLUAA0/79955224-a8c0-4f4a-be9f-27fde7350624_360.png"
                alt="Climate Action"
                width={100}
                height={100}
                className="mx-auto mb-4"
              />
              <h3 className="text-3xl font-bold">Protecting the Planet</h3>
              <p className="text-md mt-4">
                Projects that reduce emissions, protect biodiversity and nature,
                and promote recycling and reusing materials.
              </p>
            </div>

            {/* Impact Area 2 */}
            <div className="bg-wef-dark-blue text-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Image
                src="https://assets.weforum.org/sites/a0eb0000000ChLUAA0/167afaa3-c095-43b1-8140-f0b304436d21_360.png"
                alt="Gender Equality"
                width={100}
                height={100}
                className="mx-auto mb-4"
              />
              <h3 className="text-3xl font-bold">
                Strengthening Civic Engagement
              </h3>
              <p className="text-md mt-4">
                Projects that strengthen democracy, encourage people to vote and
                inspire young people to become election candidates.
              </p>
            </div>

            {/* Impact Area 3 */}
            <div className="bg-blue-600 text-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Image
                src="https://assets.weforum.org/sites/a0eb0000000ChLUAA0/5d144cc1-0158-4065-87e5-ecd1bf306a36_360.png"
                alt="Education & Employment"
                width={100}
                height={100}
                className="mx-auto mb-4"
              />
              <h3 className="text-3xl font-bold">Delivering Basic Needs</h3>
              <p className="text-md mt-4">
                Projects that organize humanitarian responses, respond to
                natural disasters and fight extreme poverty.
              </p>
            </div>

            {/* Impact Area 4 */}
            <div className="bg-wef-blue text-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Image
                src="https://assets.weforum.org/sites/a0eb0000000ChLUAA0/f90fa689-ba6d-4c98-ae1c-b912cdf5266c_360.png"
                alt="Inclusion"
                width={100}
                height={100}
                className="mx-auto mb-4"
              />
              <h3 className="text-3xl font-bold">
                Improving Health and Wellbeing
              </h3>
              <p className="text-md mt-4">
                Projects that aim to improve health and well-being for young
                people and vulnerable groups.
              </p>
            </div>

            {/* Impact Area 5 */}
            <div className="bg-wef-dark-blue text-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Image
                src="https://assets.weforum.org/sites/a0eb0000000ChLUAA0/0dffab7e-cc96-4660-ac58-8d5af273f296_360.png"
                alt="Mental Health"
                width={100}
                height={100}
                className="mx-auto mb-4"
              />
              <h3 className="text-3xl font-bold">Reskilling for the Future </h3>
              <p className="text-md mt-4">
                Projects that increase access to education, skills, and jobs and
                promote entrepreneurship.
              </p>
            </div>

            {/* Impact Area 6 */}
            <div className="bg-blue-600 text-white p-8 rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300">
              <Image
                src="https://assets.weforum.org/sites/a0eb0000000ChLUAA0/b6ba72a1-2244-45ef-a099-9ff7e8673e39_360.png"
                alt="Civic Engagement"
                width={100}
                height={100}
                className="mx-auto mb-4"
              />
              <h3 className="text-3xl font-bold">
                Creating Inclusive Communities{" "}
              </h3>
              <p className="text-md mt-4">
                Projects that help improve human rights and social justice while
                promoting diversity, equity and inclusion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section with Swiper Slider */}
      <section className="py-20 bg-white text-center px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-extrabold text-wef-blue mb-12">
            Meet the Team
          </h2>
          <p className="text-xl text-gray-700 mb-12">
            Our London Hub is led by a group of passionate individuals. Meet the
            leaders driving change.
          </p>

          {/* Swiper Slider with Christmas Image */}
          <Image
            src="/assets/images/christmas.jpg"
            alt="Christmas Celebration"
            width={800}
            height={600}
            className="rounded-lg mx-auto"
          />
          <div className="mt-12">
            <Link
              href="/shapers"
              className="text-blue-600 font-semibold underline hover:text-blue-800 transition-colors duration-300"
            >
              See All Members
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white text-center px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-extrabold text-blue-900 mb-8">
            Read Our Newsletter
          </h2>
          <p className="text-xl text-gray-700 mb-12">
            Stay updated with our latest initiatives, impact stories, and events
            by reading our monthly newsletter. Get the latest insights from
            Global Shapers London!
          </p>
          {/* Newsletter Image */}
          <Image
            src="/assets/images/newsletter.png"
            alt="Global Shapers Newsletter"
            width={1000}
            height={600}
            className="mx-auto rounded-lg shadow-lg"
          />
          <div className="mt-8">
            <Link
              href="https://www.canva.com/design/DAGLfOjusxQ/5upjRZAU6-L_vDVfJV686A/view?utm_content=DAGLfOjusxQ&utm_campaign=designshare&utm_medium=link&utm_source=editor"
              target="_blank"
            >
              <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full transform hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl">
                View Full Newsletter
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* // Stay Connected Section */}
      <section className="py-20 bg-gradient-to-r from-blue-400 to-blue-600 text-white text-center px-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8">
          {/* Left side: Content */}
          <div className="animate-fade-in-down">
            <h2 className="text-5xl font-extrabold mb-6">Stay Connected</h2>
            <p className="text-xl mb-8">
              Subscribe to our newsletter to receive the latest news and
              exclusive updates.
            </p>
          </div>

          {/* Right side: Form */}
          <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in-up">
            <form
              onSubmit={handleSubscribe}
              className="flex flex-col gap-4 items-center"
            >
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="px-6 py-3 w-full text-gray-900 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-500 ease-in-out"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      <section
        className="py-20 bg-gradient-to-r from-blue-700 to-blue-900 text-white text-center px-4"
        id="join-us"
        ref={callToActionRef}
      >
        <div className="max-w-5xl mx-auto animate-fade-in-down">
          <h2 className="text-6xl font-extrabold mb-8">
            Ready to Make an Impact?
          </h2>
          <p className="text-2xl mb-12 animate-fade-in-up">
            Join the Global Shapers community today and help us build a better
            future.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button
              className="px-10 py-5 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-full shadow-md hover:shadow-xl transform hover:scale-110 transition-transform duration-300"
              onClick={() =>
                toast.error(
                  "Unfortunately, the applications have closed for this year. Do check back next year!",
                  {
                    duration: 5000,
                    style: {
                      background: "#333",
                      color: "#fff",
                    },
                    ariaProps: {
                      role: "status",
                      "aria-live": "assertive",
                    },
                  }
                )
              }
            >
              Become a Shaper
            </button>
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLScdWAWxr--Z4_c9piHxW8wZSitKUcRquNp4VKVtb3HUFcbSGw/viewform?usp=sharing"
              target="_blank"
            >
              <button className="px-10 py-5 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-full shadow-md hover:shadow-xl transform hover:scale-110 transition-transform duration-300">
                Transfer to London
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
