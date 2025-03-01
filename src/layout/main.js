import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div>
      <header style={{ padding: "10px", color: "#fff" }}>
        <h1>Chat Search App</h1>
      </header>
      <main style={{ padding: "20px" }}>{children}</main>
      <footer style={{ padding: "10px", textAlign: "center" }}>
        <p>© 2025 Chat Search App</p>
      </footer>
    </div>
  );
};

export default MainLayout;
