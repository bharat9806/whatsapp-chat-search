import React from "react";
import Link from "next/link";
import SmoothScrollProvider from "@/components/atoms/SmoothScrollProvider";
import ScrollProgressBar from "@/components/atoms/ScrollProgressBar";
import "./styles.scss"

const MainLayout = ({ children }) => {
  return (
    <div className="container">
      <ScrollProgressBar />
      <header className="header">
        <h1>Chat Search App</h1>
        <nav>
          <Link href="/">Home</Link> |
          <Link href="/whatsapp">WhatsApp</Link> |
          <Link href="/instagram">Instagram</Link>
        </nav>
      </header>
      <SmoothScrollProvider>
        <main className="main">
          <div className="width-wrapper">
            {children}
          </div>
        </main>
      </SmoothScrollProvider>
      <footer className="footer">
        <p>© 2025 Chat Search App</p>
      </footer>
    </div>
  );
};

export default MainLayout;
