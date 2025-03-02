import { useState } from "react";
import Notification from "../../atoms/Notificaitons";
import Loader from "../../atoms/Loader";
import "./styles.scss";

export default function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [notification, setNotification] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setNotification("Please select a file.");
      return;
    }

    setUploading(true);
    setNotification("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      console.log("🔹 API Response:", data);

      if (res.ok && data.chatData) {
        setNotification("File uploaded successfully!");
        onUploadSuccess(data.chatData, data.senders);
      } else {
        setNotification(`Error: ${data.error}`);
        onUploadSuccess([]);
      }
    } catch (error) {
      setNotification("Upload failed. Please try again.");
      console.log("❌ Fetch error:", error);
      onUploadSuccess([]);
    }

    setUploading(false);
  };

  return (
    <div className="file-upload-container">
      {uploading && <Loader />}
      <h2 className="file-upload-title">Upload Your Chat ZIP File</h2>
      <input 
        type="file" 
        onChange={handleFileChange} 
        className="file-upload-input"
      />
      <button 
        onClick={handleUpload} 
        disabled={uploading}
        className="file-upload-button"
      >
        {uploading ? "Uploading..." : "Upload File"}
      </button>
      <Notification message={notification} onClose={() => setNotification("")} />
    </div>
  );
}
