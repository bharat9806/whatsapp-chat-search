import React from "react";
import MainLayout from "../layout/main";
import "./styles.scss";

const HomePage = () => {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Chat Search App</h1>
          <p>
            Easily search through your chat history and find any message instantly.
          </p>
          <a className="hero-button" href="/upload">
            Get Started
          </a>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <h3>1. Select Platform</h3>
            <p>Choose whether to upload WhatsApp or Instagram chat files.</p>
          </div>
          <div className="step">
            <h3>2. Upload ZIP File</h3>
            <p>Head over to our Upload page to submit your exported chat file.</p>
          </div>
          <div className="step">
            <h3>3. Search Chats</h3>
            <p>Use our smart search to quickly locate specific messages.</p>
          </div>
          <div className="step">
            <h3>4. Manage Data</h3>
            <p>Securely store or delete your chat history at any time.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2>Why Choose Us?</h2>
        <div className="feature-container">
          <div className="feature">
            <h3>🔍 Fast Search</h3>
            <p>Our optimized search engine helps you find messages quickly.</p>
          </div>
          <div className="feature">
            <h3>🔐 Secure</h3>
            <p>Your data is kept safe with robust security measures.</p>
          </div>
          <div className="feature">
            <h3>⚡ Easy to Use</h3>
            <p>Enjoy a simple, intuitive interface designed for fast performance.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section">
        <h2>About Chat Search App</h2>
        <p>
          Chat Search App is built to help you reclaim hours lost scrolling through endless chat history. Our
          application indexes your messages efficiently so that you can search for and locate any conversation
          in seconds.
        </p>
        <p>
          Whether you’re managing personal chats or need to retrieve important information, our secure and easy-to-use
          interface makes it effortless.
        </p>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <h2>Ready to Find Your Chats?</h2>
        <p>
          Get started by uploading your chat files. Click the button below to head over to the upload page.
        </p>
        <a className="cta-button" href="/upload">
          Upload Now
        </a>
      </section>
    </MainLayout>
  );
};

export default HomePage;
