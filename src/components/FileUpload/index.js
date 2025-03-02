import { useState } from "react";
import "./styles.scss";

export default function FileUpload({ onUploadSuccess }) {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file.");
      return;
    }

    setUploading(true);
    setMessage("");

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
        setMessage("File uploaded successfully!");
        onUploadSuccess(data.chatData, data.senders);
      } else {
        setMessage(`Error: ${data.error}`);
        onUploadSuccess([]);
      }
    } catch (error) {
      setMessage("Upload failed. Please try again.");
      console.log("❌ Fetch error:", error);
      onUploadSuccess([]);
    }

    setUploading(false);
  };

  return (
    <div className="file-upload-container">
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
      {message && <p className="file-upload-message">{message}</p>}
    </div>
  );
}
