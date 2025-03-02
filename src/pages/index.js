import React, { useState } from "react";
import MainLayout from "../layout/main";
import FileUpload from "../components/organs/FileUpload";
import SearchChat from "../components/organs/SearchChat";
import DeleteData from "../components/organs/DeleteAllData";
import "./styles.scss";

const HomePage = () => {
  const [chatData, setChatData] = useState([]);

  const handleUploadSuccess = (data) => {
    setChatData(data || []);
  };

  const handleDeleteSuccess = () => {
    setChatData([]);
  };

  return (
    <MainLayout>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Chat Search App</h1>
          <p>Upload your chat history and find any message instantly.</p>
          <a className="hero-button" onClick={(e) => {
            e.preventDefault();
            document.getElementById("upload-section").scrollIntoView({ behavior: "smooth" });
          }}>
            Get Started
          </a>
        </div>
      </section>

      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <h3>1. Upload ZIP File</h3>
            <p>Upload your WhatsApp exported ZIP file.</p>
          </div>
          <div className="step">
            <h3>2. Search Chats</h3>
            <p>Use our smart search to find messages instantly.</p>
          </div>
          <div className="step">
            <h3>3. Manage Data</h3>
            <p>Delete your chat history anytime.</p>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="feature-container">
          <div className="feature">
            <h3>🔍 Fast Search</h3>
            <p>Quickly find messages using our optimized search engine.</p>
          </div>
          <div className="feature">
            <h3>🔐 Secure</h3>
            <p>Your chat data is secure, and you can delete it anytime.</p>
          </div>
          <div className="feature">
            <h3>⚡ Easy to Use</h3>
            <p>Simple interface with fast performance.</p>
          </div>
        </div>
      </section>

      <section id="upload-section" className="upload-section">
        <h2>Upload & Search Your Chats</h2>
        <FileUpload onUploadSuccess={handleUploadSuccess} />
        {Array.isArray(chatData) && chatData.length > 0 ? (
          <>
            <SearchChat chatData={chatData} />
            <DeleteData onDeleteSuccess={handleDeleteSuccess} />
          </>
        ) : (
          <p className="no-data">No chat data uploaded yet.</p>
        )}
      </section>
    </MainLayout>
  );
};

export default HomePage;
