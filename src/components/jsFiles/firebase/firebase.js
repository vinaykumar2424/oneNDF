// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBpaKxF4HE423Q1F6vRvtJACAabZDAC7j8",
    authDomain: "onendf-14a40.firebaseapp.com",
    projectId: "onendf-14a40",
    storageBucket: "onendf-14a40.appspot.com",
    messagingSenderId: "66358674226",
    appId: "1:66358674226:web:a2b41a47aeb6fae7644d2b"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
export const provider = new GoogleAuthProvider();