// src/utils/uploadFile.js

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../lib/firebase";

// Uploads file to Firebase Storage and stores metadata in Firestore
export const uploadFile = async (file, userId) => {
  const fileRef = ref(storage, `uploads/${userId}/${file.name}`);
  const snapshot = await uploadBytes(fileRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);

  await addDoc(collection(db, "files"), {
    name: file.name,
    url: downloadURL,
    uploaderId: userId,
    uploadedAt: serverTimestamp(),
  });

  return downloadURL;
};