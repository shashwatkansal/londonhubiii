"use client";
import Link from "next/link";
import Image from "next/image";
import { PiHandshakeFill, PiProjectorScreenChartLight } from "react-icons/pi";
import { RiTeamFill } from "react-icons/ri";
import { MdKeyboardArrowDown } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import { FormEvent, useEffect, useRef, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebaseConfig";
import { ReactTyped } from "react-typed";
import { motion } from "framer-motion";

export default function Index() {
    const callToActionRef = useRef<null | HTMLElement>(null);
    const [email, setEmail] = useState("");
    const [offsetY, setOffsetY] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setOffsetY(window.scrollY);
            setIsVisible(window.scrollY > 100);
        };

        if (window.location.hash === "#join-us" && callToActionRef.current) {
            callToActionRef.current.scrollIntoView({ behavior: "smooth" });
        }

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const parallaxStyles = {
        transform: `translateY(${offsetY * 0.5}px)`,
        transition: "transform 0.05s ease-out",
    };

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
                <div className="absolute inset-0 bg-black">
                    <Image
                        src="/assets/images/hub3photo.jpg"
                        alt="Global Shapers Hero"
                        layout="fill"
                        objectFit="cover"
                        style={parallaxStyles}
                        className="opacity-40"
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/70"></div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="relative z-10 text-center px-4 max-w-5xl mx-auto"
                >
                    <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 leading-tight">
                        Change Begins Here
                    </h1>
                    <ReactTyped
                        strings={[
                            "Local Ideas.",
                            "Global Support.",
                            "Real-World Impact.",
                        ]}
                        typeSpeed={50}
                        backSpeed={30}
                        loop
                        backDelay={1500}
                        className="text-2xl md:text-4xl text-white tracking-wide font-light"
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="mt-12"
                    >
                        <Link href="#mission">
                            <button className="px-12 py-6 bg-white text-blue-900 font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-xl">
                                Explore Our Mission
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
            </section>

            {/* Enhanced Mission Section */}
            <section
                id="mission"
                className="py-32 bg-gradient-to-b from-blue-900 to-blue-800 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-[url('/assets/patterns/grid.svg')] opacity-10"></div>
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUpVariants}
                    transition={{ duration: 1 }}
                    className="max-w-6xl mx-auto px-4 relative z-10"
                >
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-12 text-center">
                        Our Mission in London
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-4xl mx-auto text-center mb-12">
                        The Global Shapers London III Hub is a dynamic network
                        of young, visionary leaders committed to tackling the
                        city's most urgent challenges. United by a passion for
                        positive change, we drive innovative projects and
                        collaborations to create a more inclusive, sustainable,
                        and resilient future for all of London's diverse
                        communities.
                    </p>
                    <div className="text-center">
                        <Link href="/impact">
                            <button className="px-10 py-5 bg-white text-blue-900 font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                                Learn More About Our Projects
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </section>

            {/* Enhanced Impact Stats */}
            <section className="py-32 bg-white relative overflow-hidden">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUpVariants}
                    className="max-w-7xl mx-auto px-4"
                >
                    <h2 className="text-5xl font-extrabold text-blue-900 mb-12 text-center">
                        Our Impact in London
                    </h2>
                    <p className="text-xl text-gray-600 mb-16 text-center max-w-4xl mx-auto">
                        In the heart of London, Global Shapers are driving real
                        change through innovative solutions and collaborative
                        efforts.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="relative p-12 rounded-2xl bg-gradient-to-br from-blue-50 to-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
                            <div className="relative z-10">
                                <RiTeamFill className="w-16 h-16 text-blue-600 mb-6" />
                                <div className="text-6xl font-bold text-blue-900 mb-4">
                                    25
                                </div>
                                <div className="text-xl font-medium text-gray-600">
                                    Shapers in Action
                                </div>
                            </div>
                        </div>

                        <div className="relative p-12 rounded-2xl bg-gradient-to-br from-green-50 to-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
                            <div className="relative z-10">
                                <PiProjectorScreenChartLight className="w-16 h-16 text-green-600 mb-6" />
                                <div className="text-6xl font-bold text-blue-900 mb-4">
                                    6
                                </div>
                                <div className="text-xl font-medium text-gray-600">
                                    Local Projects Ongoing
                                </div>
                            </div>
                        </div>

                        <div className="relative p-12 rounded-2xl bg-gradient-to-br from-purple-50 to-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full -mr-16 -mt-16 opacity-50"></div>
                            <div className="relative z-10">
                                <PiHandshakeFill className="w-16 h-16 text-purple-600 mb-6" />
                                <div className="text-6xl font-bold text-blue-900 mb-4">
                                    15
                                </div>
                                <div className="text-xl font-medium text-gray-600">
                                    Local Partnerships
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* Enhanced Impact Areas Section */}
            {/* Enhanced Impact Areas Section */}
            <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUpVariants}
                    className="max-w-7xl mx-auto px-4"
                >
                    <h2 className="text-5xl font-extrabold text-blue-900 mb-12 text-center">
                        Our Six Impact Areas
                    </h2>
                    <p className="text-xl text-gray-700 mb-16 text-center max-w-4xl mx-auto">
                        Global Shapers are dedicated to creating positive change
                        across the world through six key impact areas.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Protecting the Planet",
                                description:
                                    "Projects that reduce emissions, protect biodiversity and nature, and promote recycling and reusing materials.",
                                image: "https://assets.weforum.org/sites/a0eb0000000ChLUAA0/79955224-a8c0-4f4a-be9f-27fde7350624_360.png",
                                color: "from-green-600 to-green-700",
                            },
                            {
                                title: "Strengthening Civic Engagement",
                                description:
                                    "Projects that strengthen democracy, encourage people to vote and inspire young people to become election candidates.",
                                image: "https://assets.weforum.org/sites/a0eb0000000ChLUAA0/167afaa3-c095-43b1-8140-f0b304436d21_360.png",
                                color: "from-blue-600 to-blue-700",
                            },
                            {
                                title: "Delivering Basic Needs",
                                description:
                                    "Projects that organize humanitarian responses, respond to natural disasters and fight extreme poverty.",
                                image: "https://assets.weforum.org/sites/a0eb0000000ChLUAA0/5d144cc1-0158-4065-87e5-ecd1bf306a36_360.png",
                                color: "from-orange-600 to-orange-700",
                            },
                            {
                                title: "Improving Health and Wellbeing",
                                description:
                                    "Projects that aim to improve health and well-being for young people and vulnerable groups.",
                                image: "https://assets.weforum.org/sites/a0eb0000000ChLUAA0/f90fa689-ba6d-4c98-ae1c-b912cdf5266c_360.png",
                                color: "from-red-600 to-red-700",
                            },
                            {
                                title: "Reskilling for the Future",
                                description:
                                    "Projects that increase access to education, skills, and jobs and promote entrepreneurship.",
                                image: "https://assets.weforum.org/sites/a0eb0000000ChLUAA0/0dffab7e-cc96-4660-ac58-8d5af273f296_360.png",
                                color: "from-purple-600 to-purple-700",
                            },
                            {
                                title: "Creating Inclusive Communities",
                                description:
                                    "Projects that help improve human rights and social justice while promoting diversity, equity and inclusion.",
                                image: "https://assets.weforum.org/sites/a0eb0000000ChLUAA0/b6ba72a1-2244-45ef-a099-9ff7e8673e39_360.png",
                                color: "from-indigo-600 to-indigo-700",
                            },
                        ].map((area, index) => (
                            <motion.div
                                key={index}
                                variants={{
                                    hidden: { opacity: 0, y: 50 },
                                    visible: { opacity: 1, y: 0 },
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                }}
                                className="relative group h-full"
                            >
                                <div className="relative h-full overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${area.color} opacity-90 transition-opacity group-hover:opacity-100`}
                                    ></div>
                                    <div className="relative p-8 text-white h-full flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-center mb-6">
                                                <Image
                                                    src={area.image}
                                                    alt={area.title}
                                                    width={80}
                                                    height={80}
                                                    className="w-20 h-20"
                                                />
                                            </div>
                                            <h3 className="text-2xl font-bold mb-4 text-center">
                                                {area.title}
                                            </h3>
                                            <p className="text-white/90 text-center">
                                                {area.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Enhanced Team Section */}
            {/* Enhanced Team Section */}
            <section className="py-32 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 relative overflow-hidden">
                {/* Decorative backgrounds */}
                <div className="absolute inset-0 bg-[url('/assets/patterns/circuit.svg')] opacity-5"></div>
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-400 rounded-full filter blur-3xl opacity-10 -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-400 rounded-full filter blur-3xl opacity-10 -ml-48 -mb-48"></div>

                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        hidden: { opacity: 0 },
                        visible: { opacity: 1 },
                    }}
                    className="max-w-7xl mx-auto px-4 relative z-10"
                >
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-6xl font-extrabold text-white mb-8">
                                Meet Our{" "}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
                                    Change Makers
                                </span>
                            </h2>
                            <p className="text-xl text-gray-300 mb-16 max-w-3xl mx-auto">
                                Our London Hub is powered by passionate
                                individuals committed to creating positive
                                impact. Together, we're building a better future
                                for our city.
                            </p>
                        </motion.div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left side - Team Showcase */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            {/* Team Stats */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                                    <div className="text-4xl font-bold text-white mb-2">
                                        25+
                                    </div>
                                    <div className="text-gray-300">
                                        Active Shapers
                                    </div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                                    <div className="text-4xl font-bold text-white mb-2">
                                        12+
                                    </div>
                                    <div className="text-gray-300">
                                        Nationalities
                                    </div>
                                </div>
                            </div>

                            {/* Team Features */}
                            {[
                                {
                                    title: "Diverse Backgrounds",
                                    description:
                                        "From tech entrepreneurs to social activists, our members bring unique perspectives to drive change.",
                                },
                                {
                                    title: "United Vision",
                                    description:
                                        "Working together to create lasting positive impact in London's communities.",
                                },
                                {
                                    title: "Continuous Growth",
                                    description:
                                        "Regular learning sessions and leadership development opportunities for all members.",
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
                                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
                                >
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-300">
                                        {feature.description}
                                    </p>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Right side - Image Gallery */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-3xl transform rotate-2 group-hover:rotate-3 transition-transform duration-300"></div>

                            <div className="relative rounded-3xl overflow-hidden transform -rotate-2 group-hover:-rotate-3 transition-transform duration-300">
                                <div className="aspect-w-16 aspect-h-12">
                                    <Image
                                        src="/assets/images/christmas.jpg"
                                        alt="Team Celebration"
                                        layout="fill"
                                        objectFit="cover"
                                        className="transform group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/50 to-transparent">
                                    <div className="absolute bottom-0 left-0 right-0 p-8">
                                        <p className="text-white/90 text-lg mb-4">
                                            Our team celebrates diversity,
                                            innovation, and commitment to
                                            positive change.
                                        </p>
                                        <Link href="/shapers">
                                            <button className="px-8 py-4 bg-white text-blue-900 font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                                                <span>Meet All Members</span>
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
                                    </div>
                                </div>
                            </div>

                            {/* Floating badges */}
                            <div className="absolute -top-6 -right-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full p-4 shadow-xl transform rotate-12">
                                <span className="text-white font-bold">
                                    2024
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </section>

            {/* Enhanced Newsletter Section */}
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
                            Stay updated with our latest initiatives, impact
                            stories, and events. Discover how we're making a
                            difference in London, one story at a time.
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
                                        <span className="text-4xl">
                                            {feature.icon}
                                        </span>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-800 mb-2">
                                                {feature.title}
                                            </h3>
                                            <p className="text-gray-600">
                                                {feature.description}
                                            </p>
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
            </section>

            {/* Enhanced Stay Connected Section */}
            <section className="py-32 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
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
                            <h2 className="text-5xl font-bold mb-8">
                                Stay Connected
                            </h2>
                            <p className="text-xl text-gray-200 mb-8">
                                Subscribe to our newsletter to receive the
                                latest updates about our projects, events, and
                                opportunities to get involved.
                            </p>
                            <form
                                onSubmit={handleSubscribe}
                                className="space-y-4"
                            >
                                <div className="relative">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="Enter your email"
                                        className="w-full px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all duration-300"
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
                className="py-32 bg-gradient-to-br from-blue-900 to-blue-800 relative overflow-hidden"
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
                        Join the Global Shapers community today and help us
                        build a better future.
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
                        >
                            Become a Shaper
                        </button>
                        <Link
                            href="https://docs.google.com/forms/d/e/1FAIpQLScdWAWxr--Z4_c9piHxW8wZSitKUcRquNp4VKVtb3HUFcbSGw/viewform"
                            target="_blank"
                        >
                            <button className="px-10 py-5 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300">
                                Transfer to London
                            </button>
                        </Link>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
