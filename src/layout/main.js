import React from "react";
import "./styles.scss"

const MainLayout = ({ children }) => {
  return (
    <div className="container">
      <header className="header">
        <h1>Chat Search App</h1>
      </header>
      <main className="main">{children}</main>
      <footer className="footer">
        <p>© 2025 Chat Search App</p>
      </footer>
    </div>
  );
};

export default MainLayout;
