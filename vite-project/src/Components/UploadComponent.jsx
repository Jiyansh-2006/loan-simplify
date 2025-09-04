// src/components/UploadComponent.js

import React, { useState } from "react";
import { uploadFile } from "../utils/uploadFile";
import { auth } from "../lib/firebase";
import { signInAnonymously } from "firebase/auth";

const UploadComponent = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) return alert("Please select a file first.");

    try {
      // Anonymous login if user not signed in
      if (!auth.currentUser) {
        await signInAnonymously(auth);
      }

      const userId = auth.currentUser.uid;
      setStatus("Uploading...");

      const url = await uploadFile(file, userId);
      setStatus(`✅ Uploaded! File URL: ${url}`);
    } catch (error) {
      console.error("Upload failed:", error);
      setStatus("❌ Upload failed. See console.");
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "10px", width: "fit-content" }}>
      <h3>📤 Upload File</h3>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br /><br />
      <button onClick={handleUpload}>Upload</button>
      <p>{status}</p>
    </div>
  );
};

export default UploadComponent;