// firebaseConfig.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra;

if (!extra) {
  throw new Error(
    "Expo extra config is missing! Make sure app.json is set up correctly."
  );
}

const firebaseConfig = {
  apiKey: "AIzaSyBFjy12g08h6TER28pr_f6TVkFDXBj5hXI",
  authDomain: "veloxrs.firebaseapp.com",
  projectId: "veloxrs",
  storageBucket: "veloxrs.firebasestorage.app",
  messagingSenderId: "613071268609",
  appId: "1:613071268609:web:76aab94a9dded9c8b88900",
  measurementId: "G-H9LP93R75C"
};

const FIREBASE_APP =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
