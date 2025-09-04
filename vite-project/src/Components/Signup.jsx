import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./Signup.css";

import { auth, db, provider } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

const Signup = () => {
  const navigate = useNavigate();

  // form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // ✅ Save or create Firestore user profile
  const saveUserDoc = async (user, customName = "") => {
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);
    if (!snap.exists()) {
      await setDoc(ref, {
        uid: user.uid,
        name: user.displayName || customName || "",
        email: user.email,
        role: "user",
        createdAt: serverTimestamp(),
      });
    }
  };

  // ✅ Signup with email/password
  const handleSignup = async (e) => {
    e.preventDefault();
    setErr("");

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setErr("Please enter your full name.");
      return;
    }

    if (password !== confirm) {
      setErr("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(
        auth,
        trimmedEmail,
        password
      );

      // update Firebase Auth profile
      await updateProfile(cred.user, { displayName: trimmedName });

      // create Firestore document
      await saveUserDoc(cred.user, trimmedName);

      navigate("/dashboard", { replace: true });
    } catch (error) {
      setErr(readableError(error));
    } finally {
      setLoading(false);
    }
  };

  // ✅ Signup with Google
  const handleGoogleSignup = async () => {
    setErr("");
    setLoading(true);
    try {
      const cred = await signInWithPopup(auth, provider);
      await saveUserDoc(cred.user);
      navigate("/dashboard", { replace: true });
    } catch (error) {
      setErr(readableError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <Header />

      <div className="signup-container">
        <h2 className="signup-title">Create Account</h2>

        <form className="signup-form" onSubmit={handleSignup}>
          <div className="input-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="input-group">
            <label>Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" className="signup-button" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>

          <button
            type="button"
            onClick={handleGoogleSignup}
            className="signup-button google"
            disabled={loading}
          >
            {loading ? "Please wait..." : "Continue with Google"}
          </button>

          {err && <p className="error-message">{err}</p>}

          <p className="login-link">
            Already have an account? <Link to="/login">Login Here</Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  );
};

export default Signup;

// ✅ Firebase error mapper
function readableError(err) {
  const code = err?.code || "";
  if (code.includes("auth/email-already-in-use"))
    return "This email is already registered.";
  if (code.includes("auth/invalid-email")) return "Invalid email format.";
  if (code.includes("auth/weak-password"))
    return "Password should be at least 6 characters.";
  if (code.includes("auth/network-request-failed"))
    return "Network error. Please check your internet connection.";
  if (code.includes("popup-closed-by-user")) return "Google signup cancelled.";
  return err?.message || "Something went wrong. Please try again.";
}
