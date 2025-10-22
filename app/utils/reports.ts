import { collection, addDoc, deleteDoc, doc, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { FIRESTORE_DB } from "@/firebaseConfig";

export interface Report {
  id?: string;
  type: string;
  latitude: number;
  longitude: number;
  timestamp: string; // ISO format
  userId?: string;
}

// 🔹 Kreiranje novog izveštaja (kamera, radovi, gužva)
export const createReport = async (
  type: string,
  latitude: number,
  longitude: number
) => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;
    const timestamp = new Date().toISOString();

    const report: Report = {
      type,
      latitude,
      longitude,
      timestamp,
      userId: user?.uid || "anonymous",
    };

    await addDoc(collection(FIRESTORE_DB, "reports"), report);
    console.log(`✅ Report added: ${type} at ${latitude}, ${longitude}`);
  } catch (error: any) {
    console.error("❌ Error creating report:", error.message);
    throw error;
  }
};

// 🔹 Brisanje prijave po ID-ju
export const deleteReport = async (id: string) => {
  try {
    await deleteDoc(doc(FIRESTORE_DB, "reports", id));
    console.log("✅ Report deleted:", id);
  } catch (error: any) {
    console.error("❌ Error deleting report:", error.message);
    throw error;
  }
};

// 🔹 Učitavanje svih izveštaja
export const fetchReports = async (): Promise<Report[]> => {
  try {
    const snapshot = await getDocs(collection(FIRESTORE_DB, "reports"));
    const reports: Report[] = snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Report, "id">),
    }));
    console.log(`📥 Loaded ${reports.length} reports`);
    return reports;
  } catch (error: any) {
    console.error("❌ Error fetching reports:", error.message);
    throw error;
  }
};
