import React, { useState } from "react";
import ConfirmModal from "../../atoms/Model";
import Notification from "../../atoms/Notificaitons";
import Loader from "../../atoms/Loader";
import "./styles.scss"

export default function DeleteAllData({ onDeleteSuccess }) {
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/deleteAll", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (res.ok) {
        setNotification(data.message);
        if (onDeleteSuccess) onDeleteSuccess();
      } else {
        setNotification(data.error || "Error deleting data.");
      }
    } catch (error) {
      setNotification("Error: " + error.message);
    }
    setLoading(false);
  };

  const handleConfirm = () => {
    setShowModal(false);
    handleDelete();
  };

  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <div className="delete-data-container" style={{ textAlign: "center", marginTop: "2rem" }}>
      {loading && <Loader />}
      <button
        onClick={() => setShowModal(true)}
        disabled={loading}
        className="delete-button"
      >
        {loading ? "Deleting..." : "Delete All Data"}
      </button>
      {notification && (
        <Notification message={notification} onClose={() => setNotification("")} />
      )}
      {showModal && (
        <ConfirmModal
          message="Are you sure you want to delete all chat data? This action cannot be undone."
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}
