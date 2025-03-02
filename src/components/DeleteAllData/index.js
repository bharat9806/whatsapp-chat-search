import React, { useState } from "react";

export default function DeleteAllData({ onDeleteSuccess }) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    // Confirm deletion action
    if (!window.confirm("Are you sure you want to delete all chat data? This action cannot be undone.")) {
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/deleteAll", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
        // Optionally trigger any callback (like clearing local state)
        if (onDeleteSuccess) onDeleteSuccess();
      } else {
        setMessage(data.error || "Error deleting data.");
      }
    } catch (error) {
      setMessage("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="delete-all-container" style={{ textAlign: "center", marginTop: "2rem" }}>
      <button
        onClick={handleDelete}
        disabled={loading}
        style={{
          backgroundColor: "#e53e3e",
          color: "#fff",
          border: "none",
          padding: "0.75rem 1.5rem",
          borderRadius: "4px",
          cursor: "pointer",
          transition: "background-color 0.3s ease"
        }}
      >
        {loading ? "Deleting..." : "Delete All Data"}
      </button>
      {message && <p style={{ marginTop: "1rem", color: "#333" }}>{message}</p>}
    </div>
  );
}
