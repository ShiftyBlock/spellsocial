import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBPeE4y0Hs5Z-wAfMN3WzXxR5W_agKPgOU",
  authDomain: "pix2pix-cae40.firebaseapp.com",
  projectId: "pix2pix-cae40",
  storageBucket: "pix2pix-cae40.appspot.com",
  messagingSenderId: "341226841937",
  appId: "1:341226841937:web:da2b03649b02eb27ac1570",
  measurementId: "G-N40CZ9CRPK",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
export { storage, db };
