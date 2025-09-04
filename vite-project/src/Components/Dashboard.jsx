import React, { useState, useRef, useEffect } from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';

const Dashboard = () => {
  const [chat, setChat] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const dropdownRef = useRef();
  const chatRef = useRef();

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const newChat = [...chat, { sender: 'user', text: userInput }];
    setChat(newChat);
    setUserInput('');

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/chat`, {
        messages: newChat.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        })),
      });

      const aiReply =
        res.data?.choices?.[0]?.message?.content ||
        "⚠️ No response from AI.";

      setChat([...newChat, { sender: "ai", text: aiReply.trim() }]);
    } catch (error) {
      console.error("Backend error:", error);
      setChat([...newChat, { sender: "ai", text: "❌ Something went wrong. Try again." }]);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (chatRef.current && !chatRef.current.contains(event.target) && !event.target.closest('.ai-toggle-button')) {
        setShowAI(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dashboard-container">
      <Header />

      <main className="dashboard-main">
        <h2>Welcome to the Student Dashboard!</h2>
        <p>Manage your financial documents, apply for loans, and receive assistance from our AI advisor.</p>

        <div className="dashboard-cards-container">
          <Link to="/loanform" className="dashboard-card">
            <h3>Document Upload</h3>
            <p>Securely upload financial documents for verification or loan applications.</p>
          </Link>

          <Link to="/review" className="dashboard-card">
            <h3>Loan Application Status</h3>
            <p>Track the progress of your loan requests and approvals here.</p>
          </Link>
        </div>
      </main>

      {/* Animated Robot Button */}
      <div className="ai-toggle-button" onClick={() => setShowAI(!showAI)} title="AI Financial Assistant">
        <div className="robot-container">
          <div className="robot-head">
            <div className="robot-antenna"></div>
            <div className="robot-eyes">
              <div className="robot-eye"></div>
              <div className="robot-eye"></div>
            </div>
            <div className="robot-mouth"></div>
          </div>
          <div className="robot-body"></div>
        </div>
      </div>

      {/* AI Chat Window */}
      {showAI && (
        <div className="ai-assistant-window" ref={chatRef}>
          <h4>Finance Assistant</h4>
          <div className="chat-messages">
            {chat.length === 0 ? (
              <div className="ai-msg">
                <p>Hello! I'm your financial assistant. How can I help you today?</p>
                <p>You can ask me about:</p>
                <p>• Loan options and eligibility</p>
                <p>• EMI calculations</p>
                <p>• Document requirements</p>
                <p>• Financial tips for students</p>
              </div>
            ) : (
              chat.map((msg, i) => (
                <div key={i} className={msg.sender === "user" ? "user-msg" : "ai-msg"}>
                  {msg.text.split("\n").map((line, idx) => (
                    <p key={idx}>{line}</p>
                  ))}
                </div>
              ))
            )}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask about loans, EMI, or finance tips..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Dashboard;