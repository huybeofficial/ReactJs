// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import "firebase/firestore";
import {
  getAuth,
  FacebookAuthProvider,
  GoogleAuthProvider,
  connectAuthEmulator,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD0ZKRziNPqJoOkZ15il9MAG46rSXfq3cw",
  authDomain: "note-app-91a44.firebaseapp.com",
  projectId: "note-app-91a44",
  storageBucket: "note-app-91a44.appspot.com",
  messagingSenderId: "787194642994",
  appId: "1:787194642994:web:942cf2f587e08a3461322b",
  measurementId: "G-M2E8HN4M69",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const fbProvider = new FacebookAuthProvider();

connectAuthEmulator(auth, "http://127.0.0.1:9099");
connectFirestoreEmulator(db, "127.0.0.1", 8080);

const ggProvider = new GoogleAuthProvider();
export { auth, fbProvider, ggProvider, db };
