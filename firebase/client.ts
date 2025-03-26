import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCpm4kgqxJdz-YzXanotft8l5o45PH_d-w",
  authDomain: "interviewx-43d88.firebaseapp.com",
  projectId: "interviewx-43d88",
  storageBucket: "interviewx-43d88.firebasestorage.app",
  messagingSenderId: "767758581714",
  appId: "1:767758581714:web:b8a23a4688e4461ea2120b",
  measurementId: "G-6SJ14MQE8Q",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);