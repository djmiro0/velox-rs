// firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBFjy12g08h6TER28pr_f6TVkFDXBj5hXI",
  authDomain: "veloxrs.firebaseapp.com",
  projectId: "veloxrs",
  storageBucket: "veloxrs.firebasestorage.app",
  messagingSenderId: "613071268609",
  appId: "1:613071268609:web:76aab94a9dded9c8b88900",
  measurementId: "G-H9LP93R75C"
};

// Prevent re-initialization in Fast Refresh (Expo dev mode)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Export commonly used services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


export default app;
