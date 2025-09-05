import React, { useState } from "react";
import GoogleImg from "../assets/Google.webp";
import { Link, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./login.css";

import { auth, provider, db } from "../lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  // 🔹 Ensure Firestore user doc exists
  const ensureUserDoc = async (user) => {
    const ref = doc(db, "users", user.uid);
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      await setDoc(ref, {
        uid: user.uid,
        name: user.displayName || "",
        email: user.email,
        role: "user",
        createdAt: serverTimestamp(),
      });
    }
  };

  // 🔹 Login with email & password
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      await ensureUserDoc(cred.user);
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: cred.user.uid,
          email: cred.user.email,
          name: cred.user.displayName || "",
        })
      );
      navigate("/dashboard"); // ✅ redirect after login
    } catch (error) {
      setErr(readableError(error));
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Login with Google
  const handleGoogleLogin = async () => {
    setErr("");
    setLoading(true);

    try {
      const cred = await signInWithPopup(auth, provider);
      await ensureUserDoc(cred.user);
      localStorage.setItem(
        "user",
        JSON.stringify({
          uid: cred.user.uid,
          email: cred.user.email,
          name: cred.user.displayName || "",
        })
      );
      navigate("/dashboard"); // ✅ redirect after login
    } catch (error) {
      setErr(readableError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Header />

      <div className="login-container">
        <div className="form-title">Log in with</div>

        {/* 🔹 Google Login */}
        <button
          type="button"
          className="social-login"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <img src={GoogleImg} alt="Google" className="social-icon" />
          {loading ? "Please wait..." : "Google"}
        </button>

        <p className="separator">
          <span>or</span>
        </p>

        {/* 🔹 Email/Password Login */}
        <form className="login-form" onSubmit={handleEmailLogin}>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Email Address"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <i className="material-symbols-rounded">mail</i>
          </div>

          <div className="input-wrapper">
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <i className="material-symbols-rounded">lock</i>
          </div>

          <Link to="/forgotpassword" className="forgot-pass-link">
            Forgot Password?
          </Link>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* 🔹 Error message */}
        {err && <p className="error-message">{err}</p>}

        {/* 🔹 Signup Suggestion */}
        <p className="signup-text">
          Don&apos;t have an account? <Link to="/signup">Signup Now</Link>
        </p>
      </div>

      <Footer />
    </div>
  );
};

export default Login;

// 🔹 Helper: map Firebase errors to friendly text
function readableError(err) {
  const code = err?.code || "";
  if (code.includes("invalid-credential")) return "Invalid email or password.";
  if (code.includes("user-not-found")) return "No account found with this email.";
  if (code.includes("wrong-password")) return "Incorrect password.";
  if (code.includes("too-many-requests")) return "Too many attempts. Try again later.";
  if (code.includes("popup-closed-by-user")) return "Google login cancelled.";
  return err?.message || "Something went wrong. Please try again.";
}
