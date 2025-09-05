const API_URL =https://backend-loansimplify.onrender.com/;

export const verifyDocument = async (docType, number, file) => {
  try {
    const formData = new FormData();
    formData.append("doc_type", docType);
    formData.append("number", number);
    formData.append("file", file);

    const response = await fetch(`${API_URL}/verify`, {
      method: "POST",
      body: formData
    });

    if (!response.ok) throw new Error("Network response not ok");
    return await response.json();

  } catch (error) {
    console.error("Verification error:", error);
    return { status: "Rejected", feedback: "Server error" };
  }
};


