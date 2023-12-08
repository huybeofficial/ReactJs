import { addDoc, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./config";

export const addDocument = async (collect, data) => {
  const docRef = await addDoc(collection(db, collect), {
    ...data,
  });
  console.log("Document written with ID: ", docRef.id);
};
export const updateDocument = async (collect, docId, data) => {
  const docRef = doc(db, collect, docId);
  await updateDoc(docRef, data);
  console.log("Document updated with ID: ", docRef.id);
};
