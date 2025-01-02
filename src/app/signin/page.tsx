"use client";

import { useState } from "react";
import { auth, googleProvider, db } from "@lib/firebaseConfig";
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithPopup,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const GoogleIcon = () => <FcGoogle className="text-2xl" />;
const FacebookIcon = () => <FaFacebook className="text-2xl text-blue-600" />;
const TwitterIcon = () => <FaTwitter className="text-2xl text-blue-400" />;
const LinkedInIcon = () => <FaLinkedin className="text-2xl text-blue-700" />;

export default function SignIn() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSigningUp, setIsSigningUp] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(e.target.value);

    const checkEmailInDirectory = async (email: string): Promise<boolean> => {
        const docRef = doc(db, "directory", email);
        const docSnap = await getDoc(docRef);
        return docSnap.exists();
    };

    const handleSignIn = async () => {
        try {
            const emailExists = await checkEmailInDirectory(email);
            if (!emailExists) {
                throw new Error(
                    "This email is not authorized for sign-in. Please contact support."
                );
            }
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/hub/dashboard");
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleSignUp = async () => {
        try {
            const emailExists = await checkEmailInDirectory(email);
            if (!emailExists) {
                throw new Error(
                    "This email is not authorized for sign-up. Please contact support."
                );
            }
            await createUserWithEmailAndPassword(auth, email, password);
            router.push("/hub/dashboard");
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleForgotPassword = async () => {
        try {
            const emailExists = await checkEmailInDirectory(email);
            if (!emailExists) {
                throw new Error(
                    "This email is not authorized for password reset. Please contact support."
                );
            }
            await sendPasswordResetEmail(auth, email);
            alert("Password reset email sent!");
        } catch (err: any) {
            setError(err.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const userEmail = result.user.email;
            if (userEmail) {
                const emailExists = await checkEmailInDirectory(userEmail);
                if (!emailExists) {
                    throw new Error(
                        "This email is not authorized for sign-in. Please contact support."
                    );
                }
                router.push("/hub/dashboard");
            }
        } catch (err: any) {
            setError(err.message);
        }
    };
    return (
        <div className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-hidden">
            {/* Background Video */}
            <div className="absolute inset-0 z-0">
                <video
                    src="/assets/videos/shapers_stock.mp4"
                    autoPlay
                    loop
                    muted
                    className="w-full h-full object-cover opacity-70"
                />
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 z-10"></div>

            {/* Sign-In Box */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-20 bg-white/20 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96 border border-white/30"
            >
                <h2 className="text-4xl font-bold mb-6 text-center text-white">
                    {isSigningUp ? "Sign Up" : "Sign In"}
                </h2>
                {error && (
                    <p className="text-red-400 text-center mb-4 bg-red-900/20 py-2 rounded">
                        {error}
                    </p>
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                    className="input w-full mb-4 bg-white/30 border-white/30 text-white placeholder-white/70"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="input w-full mb-4 bg-white/30 border-white/30 text-white placeholder-white/70"
                />
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={isSigningUp ? handleSignUp : handleSignIn}
                    className="btn w-full mb-4 bg-[#00539B] border-0 text-white hover:bg-[#003D73]"
                >
                    {isSigningUp ? "Sign Up" : "Sign In"}
                </motion.button>
                <div className="flex justify-center space-x-4 mb-4">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={handleGoogleSignIn}
                        className="btn btn-circle btn-ghost bg-white/30 hover:bg-white/40"
                    >
                        <GoogleIcon />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="btn btn-circle btn-ghost bg-white/30 hover:bg-white/40"
                    >
                        <FacebookIcon />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="btn btn-circle btn-ghost bg-white/30 hover:bg-white/40"
                    >
                        <TwitterIcon />
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="btn btn-circle btn-ghost bg-white/30 hover:bg-white/40"
                    >
                        <LinkedInIcon />
                    </motion.button>
                </div>
                {!isSigningUp && (
                    <button
                        onClick={handleForgotPassword}
                        className="text-white hover:text-white/80 transition-colors duration-200 w-full text-center"
                    >
                        Forgot Password?
                    </button>
                )}
                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsSigningUp(!isSigningUp)}
                        className="text-white hover:text-white/80 transition-colors duration-200"
                    >
                        {isSigningUp
                            ? "Already have an account? Sign In"
                            : "Don't have an account? Sign Up"}
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
