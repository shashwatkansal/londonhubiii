// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI74GgxDp2jlUPxPP_ZVh5PoqiEJrU_A8",
  authDomain: "london-hub-iii.firebaseapp.com",
  projectId: "london-hub-iii",
  storageBucket: "london-hub-iii.appspot.com",
  messagingSenderId: "707184183232",
  appId: "1:707184183232:web:1cfb9e411bfa2ac3eb2a25",
  measurementId: "G-KNCN1NB1RW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { app, db, storage, auth, googleProvider };
