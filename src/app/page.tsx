"use client";
import Link from "next/link";
import Image from "next/image";
import { PiHandshakeFill, PiProjectorScreenChartLight } from "react-icons/pi";
import {
  RiEarthFill,
  RiGovernmentFill,
  RiHandHeartFill,
  RiMentalHealthFill,
  RiLightbulbFlashFill,
  RiGroupFill,
  RiTeamFill,
  RiRocketFill,
  RiEyeFill,
  RiTeamLine,
} from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { FormEvent, useEffect, useRef, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { ReactTyped } from "react-typed";
import { motion, useScroll, useTransform } from "framer-motion";
import * as SETTINGS from "@/lib/settings";

export default function Index() {
  const callToActionRef = useRef<null | HTMLElement>(null);
  const [email, setEmail] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0.5]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 100);
    };

    if (window.location.hash === "#join-us" && callToActionRef.current) {
      callToActionRef.current.scrollIntoView({ behavior: "smooth" });
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubscribe = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subscribeToast = toast.loading("Subscribing...");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email.", { id: subscribeToast });
      return;
    }

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
      setEmail("");
    } catch (error) {
      console.error("Error adding document: ", error);
      toast.error("Failed to subscribe. Please try again.", {
        id: subscribeToast,
      });
    }
  };

  const fadeInUpVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Toaster position="top-center" reverseOrder={false} />

      {/* Enhanced Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div className="absolute inset-0" style={{ opacity }}>
          <Image
            src="/assets/images/hub3photo.jpg"
            alt="Global Shapers Hero"
            layout="fill"
            objectFit="cover"
            className="opacity-60"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
            <span className="block">Change Begins</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              With You
            </span>
          </h1>
          <ReactTyped
            strings={["Local Ideas.", "Global Support.", "Real-World Impact."]}
            typeSpeed={50}
            backSpeed={30}
            loop
            backDelay={1500}
            className="text-2xl md:text-4xl text-white tracking-wide font-light mb-12 block"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6"
          >
            <Link href="#mission" passHref>
              <button
                className="px-8 py-4 bg-white text-blue-900 font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
                aria-label="Explore Our Mission"
              >
                Explore Our Mission
              </button>
            </Link>
            <Link href="#join-us">
              <button
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300 text-lg"
                aria-label="Join Us"
              >
                Join Us
              </button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        >
          <MdKeyboardArrowDown className="text-white text-5xl animate-bounce" />
        </motion.div>

        {/* Floating elements */}
        <motion.div
          animate={{
            rotate: [0, 10, 0, -10, 0],
            y: [0, -10, 0, 10, 0],
          }}
          transition={{ duration: 5, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-16 h-16 bg-blue-500 rounded-full opacity-50 blur-md"
        />
        <motion.div
          animate={{
            rotate: [0, -10, 0, 10, 0],
            y: [0, 10, 0, -10, 0],
          }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-20 h-20 bg-purple-500 rounded-full opacity-50 blur-md"
        />
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="rgba(26, 32, 44, 0.8)"
            />
          </svg>
        </div>
      </section>

      {/* Enhanced Mission Section */}
      <section
        id="mission"
        className="relative py-32 bg-gray-900 text-white overflow-hidden"
      >
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/80 via-transparent to-blue-900/80"></div>

        {/* Decorative Elements */}
        <div className="absolute -top-10 -left-10 w-80 h-80 bg-blue-500 rounded-full opacity-20 filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-700 rounded-full opacity-20 filter blur-3xl animate-pulse delay-2000"></div>

        {/* Content */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        >
          <h2 className="text-5xl md:text-7xl font-extrabold mb-8">
            Our Mission in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              {SETTINGS.CITY_NAME}
            </span>
          </h2>
          <p className="text-xl md:text-2xl leading-relaxed max-w-4xl mx-auto mb-12">
            The {SETTINGS.PROJECT_NAME} Hub is a dynamic network of young,
            visionary leaders committed to tackling the city's most urgent
            challenges. United by a passion for positive change, we drive
            innovative projects and collaborations to create a more inclusive,
            sustainable, and resilient future for all of {SETTINGS.CITY_NAME}'s diverse
            communities.
          </p>
          <div className="flex justify-center">
            <Link href="/our-impact">
              <button className="px-10 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-purple-600 hover:to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                Learn More About Our Projects
              </button>
            </Link>
          </div>
        </motion.div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="rgba(30, 58, 138, 1)"
            />
          </svg>
        </div>
      </section>

      {/* Enhanced Impact in London Section */}
      <section className="relative py-32 bg-gradient-to-b from-blue-900 via-indigo-900 to-blue-900 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 -mt-48 -ml-48 filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full opacity-10 -mb-48 -mr-48 filter blur-3xl"></div>
          <div className="absolute inset-0 bg-[url('/assets/patterns/circuit.svg')] opacity-5"></div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          className="relative max-w-7xl mx-auto px-4 z-10"
        >
          <h2 className="text-5xl font-extrabold text-white mb-12 text-center">
            Our Impact in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              London
            </span>
          </h2>
          <p className="text-xl text-blue-100 mb-16 text-center max-w-4xl mx-auto">
            Driving transformative change across London's diverse communities
            through innovation, collaboration, and dedication.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Shapers in Action",
                value: "25+",
                description:
                  "Passionate individuals committed to positive change.",
                icon: <RiTeamFill className="w-16 h-16 text-blue-400" />,
              },
              {
                title: "Local Projects Ongoing",
                value: "6",
                description:
                  "Innovative solutions addressing London's key challenges.",
                icon: (
                  <PiProjectorScreenChartLight className="w-16 h-16 text-green-400" />
                ),
              },
              {
                title: "Local Partnerships",
                value: "15+",
                description:
                  "Collaborating with organizations to amplify impact.",
                icon: <PiHandshakeFill className="w-16 h-16 text-purple-400" />,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-800 to-indigo-800 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-700"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400 to-purple-400 opacity-10"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="mb-6">{stat.icon}</div>
                  <h3 className="text-3xl font-bold text-white mb-2">
                    {stat.title}
                  </h3>
                  <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
                    {stat.value}
                  </div>
                  <p className="text-blue-100">{stat.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-16 text-center"
          >
            <Link href="/our-impact">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                Learn More About Our Projects
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Impact Areas Section with Dark Theme */}
      <section className="relative py-32 bg-gradient-to-b from-blue-900 via-indigo-900 to-blue-800 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-blue-800 opacity-50"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full opacity-10 -mt-48 -ml-48 filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full opacity-10 -mb-48 -mr-48 filter blur-3xl"></div>
          <div
            className="absolute inset-0 bg-no-repeat bg-center opacity-5"
            style={{
              backgroundImage: "url('/assets/patterns/circuit.svg')",
            }}
          ></div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          className="relative max-w-7xl mx-auto px-4 z-10"
        >
          <h2 className="text-5xl font-extrabold text-white mb-12 text-center">
            Our Six Impact Areas
          </h2>
          <p className="text-xl text-blue-100 mb-16 text-center max-w-4xl mx-auto">
            Global Shapers are dedicated to creating positive change across the
            world through six key impact areas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Protecting the Planet",
                description:
                  "Projects that reduce emissions, protect biodiversity and nature, and promote recycling and reusing materials.",
                icon: <RiEarthFill className="w-12 h-12 text-green-400" />,
                color: "from-green-400 to-green-600",
              },
              {
                title: "Strengthening Civic Engagement",
                description:
                  "Projects that strengthen democracy, encourage people to vote and inspire young people to become election candidates.",
                icon: <RiGovernmentFill className="w-12 h-12 text-blue-400" />,
                color: "from-blue-400 to-blue-600",
              },
              {
                title: "Delivering Basic Needs",
                description:
                  "Projects that organize humanitarian responses, respond to natural disasters and fight extreme poverty.",
                icon: <RiHandHeartFill className="w-12 h-12 text-orange-400" />,
                color: "from-orange-400 to-orange-600",
              },
              {
                title: "Improving Health and Wellbeing",
                description:
                  "Projects that aim to improve health and well-being for young people and vulnerable groups.",
                icon: <RiMentalHealthFill className="w-12 h-12 text-red-400" />,
                color: "from-red-400 to-red-600",
              },
              {
                title: "Reskilling for the Future",
                description:
                  "Projects that increase access to education, skills, and jobs and promote entrepreneurship.",
                icon: (
                  <RiLightbulbFlashFill className="w-12 h-12 text-yellow-400" />
                ),
                color: "from-yellow-400 to-yellow-600",
              },
              {
                title: "Creating Inclusive Communities",
                description:
                  "Projects that help improve human rights and social justice while promoting diversity, equity, and inclusion.",
                icon: <RiGroupFill className="w-12 h-12 text-purple-400" />,
                color: "from-purple-400 to-purple-600",
              },
            ].map((area, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{
                  duration: 0.2,
                  delay: index * 0.1,
                }}
                whileHover={{ scale: 1.05 }}
                className="relative p-8 rounded-3xl bg-gradient-to-br from-blue-800 to-indigo-800 shadow-lg hover:shadow-2xl transition-all duration-300 border border-blue-700"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br opacity-10"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div
                    className={`w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-br ${area.color} mb-6`}
                  >
                    {area.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {area.title}
                  </h3>
                  <p className="text-blue-100">{area.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Simplified Meet Our Change Makers Section */}
      <section className="relative py-32 bg-gradient-to-b from-white via-blue-50 to-white overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-white to-purple-100 opacity-50"></div>
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-300 rounded-full opacity-20 -mt-48 -ml-48 filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-300 rounded-full opacity-20 -mb-48 -mr-48 filter blur-3xl"></div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          className="relative max-w-7xl mx-auto px-4 z-10"
        >
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Text Content */}
            <div className="lg:w-1/2">
              <h2 className="text-5xl font-extrabold text-blue-900 mb-8">
                Meet Our{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                  Change Makers
                </span>
              </h2>
              <p className="text-xl text-gray-700 mb-8">
                Our London Hub is powered by passionate individuals committed to
                creating positive impact. Together, we're building a better
                future for our city. From diverse backgrounds and expertise, our
                team brings innovative solutions to London's most pressing
                challenges.
              </p>
              <Link href="/shapers">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  See Our Hub Members
                </motion.button>
              </Link>
            </div>

            {/* Image */}
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/assets/images/christmas.jpg"
                  alt="Our Change Makers"
                  width={600}
                  height={400}
                  objectFit="cover"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Newsletter Section */}
      <section className="py-32 bg-gradient-to-br from-white via-blue-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[url('/assets/patterns/grid.svg')] opacity-5"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20 -ml-48 -mb-48"></div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          className="max-w-7xl mx-auto px-4 relative z-10"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 mb-8"
            >
              Read Our Newsletter
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Stay updated with our latest initiatives, impact stories, and
              events. Discover how we're making a difference in London, one
              story at a time.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Newsletter Preview */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl transform rotate-2 group-hover:rotate-3 transition-transform duration-300"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden transform -rotate-2 group-hover:-rotate-3 transition-transform duration-300">
                <Image
                  src="/assets/images/newsletter.png"
                  alt="Newsletter Preview"
                  width={600}
                  height={800}
                  className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              </div>
            </motion.div>

            {/* Right side - Features */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {[
                {
                  icon: "📈",
                  title: "Impact Updates",
                  description:
                    "Quarterly insights into our projects and their real-world impact on London's communities.",
                },
                {
                  icon: "🎯",
                  title: "Exclusive Content",
                  description:
                    "Behind-the-scenes looks at our initiatives and special features on our Shapers.",
                },
                {
                  icon: "🤝",
                  title: "Networking Opportunities",
                  description:
                    "Information about upcoming events and ways to connect with fellow change-makers.",
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1 + 0.5,
                  }}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <span className="text-4xl">{feature.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-8"
              >
                <Link
                  href="https://www.canva.com/design/DAGLfOjusxQ/5upjRZAU6-L_vDVfJV686A/view"
                  target="_blank"
                >
                  <button className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                    <span>Read Latest Newsletter</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="rgba(37, 99, 235, 1)"
            />
          </svg>
        </div>
      </section>

      {/* Enhanced Stay Connected Section */}
      <section className="py-32 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/assets/patterns/circuit.svg')] opacity-5"></div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          className="max-w-6xl mx-auto px-4 relative z-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <h2 className="text-5xl font-bold mb-8">Stay Connected</h2>
              <p className="text-xl text-gray-200 mb-8">
                Subscribe to our newsletter to receive the latest updates about
                our projects, events, and opportunities to get involved.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-4">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
                    required
                    autoComplete="email"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-white text-blue-900 font-bold rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Subscribe to Newsletter
                </button>
              </form>
            </div>
            <div className="relative lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/assets/images/newsletter.png"
                alt="Newsletter Preview"
                layout="fill"
                objectFit="cover"
                className="transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Enhanced Call to Action Section */}
      <section
        id="join-us"
        ref={callToActionRef}
        className="py-32 bg-gradient-to-b from-blue-800 to-blue-900 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/assets/patterns/grid.svg')] opacity-5"></div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUpVariants}
          className="max-w-6xl mx-auto px-4 text-center relative z-10"
        >
          <h2 className="text-6xl md:text-7xl font-extrabold text-white mb-8">
            Ready to Make an Impact?
          </h2>
          <p className="text-2xl text-gray-200 mb-12 max-w-4xl mx-auto">
            Join the Global Shapers community today and help us build a better
            future.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button
              onClick={() =>
                toast.error(
                  "Unfortunately, the applications have closed for this year. Do stay tuned for our next recruitment round!",
                  {
                    duration: 5000,
                    style: {
                      background: "#333",
                      color: "#fff",
                    },
                  }
                )
              }
              className="px-10 py-5 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              aria-label="Become a Shaper"
            >
              Become a Shaper
            </button>
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLScdWAWxr--Z4_c9piHxW8wZSitKUcRquNp4VKVtb3HUFcbSGw/viewform"
              target="_blank"
            >
              <button
                className="px-10 py-5 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                aria-label="Transfer to London"
              >
                Transfer to London
              </button>
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
