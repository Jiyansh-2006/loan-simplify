// src/utils/getFiles.js

import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";

// Retrieves all files from Firestore
export const getAllFiles = async () => {
  const querySnapshot = await getDocs(collection(db, "files"));
  return querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};