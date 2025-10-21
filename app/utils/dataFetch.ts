import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FIRESTORE_DB } from "@/firebaseConfig";
import { getAuth } from "firebase/auth";
import { WarningTypes } from "../types/warnings";

export const registerUser = async (
  fullName: string,
  email: string,
  password: string,
  username: string,
  age: number
) => {
  try {
    const auth = getAuth();
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // 2️⃣ Dodavanje korisnika u Firestore sa njegovim UID-om
    await setDoc(doc(FIRESTORE_DB, "users", user.uid), {
      fullName,
      username,
      email: user.email,
      uid: user.uid,
      createdAt: new Date(),
      age,
      accountType: "Private",
      profileImage: "",
    });

    console.log("✅ Korisnik uspešno registrovan:", user.uid);
    return user;
  } catch (error: any) {
    console.error("❌ Greška prilikom registracije:", error.message);
    throw error;
  }
};


// 🔹 Dodavanje korisnika sa određenim ID-jem (ili prepisivanje ako postoji)
export const setUser = async (id: string, data: any) => {
  try {
    const userDoc = doc(FIRESTORE_DB, "users", id);
    await setDoc(userDoc, data);
    console.log("✅ Korisnik sa ID:", id, "uspešno sačuvan.");
  } catch (error: any) {
    console.error("❌ Greška pri dodavanju korisnika:", error.message);
    throw error;
  }
};

// 🔹 Ažuriranje korisničkih podataka
export const updateUser = async (id: string, data: any) => {
  try {
    const userDoc = doc(FIRESTORE_DB, "users", id);
    await updateDoc(userDoc, data);
    console.log("✅ Korisnik sa ID:", id, "uspešno ažuriran.");
  } catch (error: any) {
    console.error("❌ Greška pri ažuriranju korisnika:", error.message);
    throw error;
  }
};

export const updateUserProfileImage = async (uid: string, imageUrl: string) => {
  try {
    const userDoc = doc(FIRESTORE_DB, "businessUsers", uid);
    await updateDoc(userDoc, { profileImage: imageUrl });
    console.log("✅ Korisnik sa ID:", uid, "uspešno ažuriran.");
  } catch (error: any) {
    console.error("❌ Greška pri ažuriranju korisnika:", error.message);
    throw error;
  }
};

// 🔹 Brisanje korisnika
export const deleteUser = async (id: string) => {
  try {
    await deleteDoc(doc(FIRESTORE_DB, "users", id));
    console.log("✅ Korisnik sa ID:", id, "obrisan.");
  } catch (error: any) {
    console.error("❌ Greška pri brisanju korisnika:", error.message);
    throw error;
  }
};