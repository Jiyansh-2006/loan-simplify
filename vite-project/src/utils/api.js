// utils/api.js

const API_URL = "https://backend-loansimplify.onrender.com";

// =======================
// Document Verification
// =======================
export const verifyDocument = async (docType, number, file) => {
  try {
    const formData = new FormData();
    formData.append("doc_type", docType);
    formData.append("user_input", number); // match backend param name
    formData.append("file", file);

    const response = await fetch(`${API_URL}/verify`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Network response not ok");
    return await response.json();
  } catch (error) {
    console.error("Verification error:", error);
    return { status: "Rejected", feedback: "Server error" };
  }
};

// =======================
// Chatbot
// =======================
export const sendChatMessage = async (messages) => {
  try {
    const response = await fetch(`${API_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) throw new Error("Network response not ok");
    return await response.json();
  } catch (error) {
    console.error("Chatbot error:", error);
    return { error: "Server error" };
  }
};

// =======================
// OTP Verification Helpers
// =======================
export const sendOtp = async (type, number) => {
  try {
    const response = await fetch(`${API_URL}/api/verify/${type}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [`${type}Number`]: number }),
    });

    if (!response.ok) throw new Error("Network response not ok");
    return await response.json();
  } catch (error) {
    console.error(`OTP error for ${type}:`, error);
    return { error: "Server error" };
  }
};

export const verifyOtp = async (type, otp) => {
  try {
    const response = await fetch(`${API_URL}/api/verify/${type}/otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ otp }),
    });

    if (!response.ok) throw new Error("Network response not ok");
    return await response.json();
  } catch (error) {
    console.error(`OTP verification error for ${type}:`, error);
    return { error: "Server error" };
  }
};

// =======================
// Reset Verification System
// =======================
export const resetVerification = async () => {
  try {
    const response = await fetch(`${API_URL}/api/reset-verification`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("Network response not ok");
    return await response.json();
  } catch (error) {
    console.error("Reset verification error:", error);
    return { error: "Server error" };
  }
};
