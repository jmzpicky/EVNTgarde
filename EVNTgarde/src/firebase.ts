import { initializeApp } from "firebase/app";
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  OAuthProvider, 
  UserCredential 
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-775DBmHg6gHOXYPFEVw-d9pHYo5szIM",
  authDomain: "account-management-fb55c.firebaseapp.com",
  projectId: "account-management-fb55c",
  storageBucket: "account-management-fb55c.firebasestorage.app",
  messagingSenderId: "546251900701",
  appId: "1:546251900701:web:df3493a2f3166cc64383f4",
  measurementId: "G-FX688QBEL9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// OAuth Providers
const googleProvider = new GoogleAuthProvider();
const yahooProvider = new OAuthProvider("yahoo.com");

// Exporting with types
export {
  auth,
  db,
  googleProvider,
  yahooProvider,
  createUserWithEmailAndPassword,
  signInWithPopup,
  type UserCredential,
};
