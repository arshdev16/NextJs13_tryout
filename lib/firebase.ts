import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore , QueryDocumentSnapshot} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { note } from "./interfaces";

const firebaseConfig = {
  apiKey: "AIzaSyCWvMALyyVwQc-RNatDEt-RBKDnvaDIxRo",
  authDomain: "notes-app-9c5e8.firebaseapp.com",
  projectId: "notes-app-9c5e8",
  storageBucket: "notes-app-9c5e8.appspot.com",
  messagingSenderId: "165602586817",
  appId: "1:165602586817:web:76e4bd4b2b5cf7b400a440",
  measurementId: "G-GT80GTCKKM",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);

export const noteToJSON = (doc: QueryDocumentSnapshot) => {
  const data = doc.data();
  return {
    ...data,
    createdAt: data?.createdAt.toMillis() || 0,
  };
};
