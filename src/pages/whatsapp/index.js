import React, { useState } from "react";

import MainLayout from "../../layout/main";
import FileUpload from "../../components/organs/FileUpload";
import SearchChat from "../../components/organs/SearchChat";
import DeleteData from "../../components/organs/DeleteAllData";

import "./styles.scss";

const WhatsAppPage = () => {
  const [chatData, setChatData] = useState([]);

  const handleUploadSuccess = (data) => {
    setChatData(data || []);
  };

  const handleDeleteSuccess = () => {
    setChatData([]);
  };

  return (
    <MainLayout>
      <section className="page-header">
        <h1>WhatsApp Chat Search</h1>
        <p>Upload your WhatsApp chat history and search messages easily.</p>
      </section>

      <section className="export-instructions">
        <h2>How to Export Your WhatsApp Chat Data</h2>
        <ol>
          <li>Open WhatsApp and click on the profile of the chat you want to export.</li>
          <li>Click on the three dots at the top right corner to open the dropdown.</li>
          <li>Click the "More" button (usually the last option in the dropdown).</li>
          <li>Select "Export Chat".</li>
          <li>When the popup appears, choose the "Without Media" option.</li>
          <li>Wait a few seconds, then share or save the file to your device.</li>
          <li>Finally, upload the saved file on this website.</li>
        </ol>
      </section>

      <section id="upload-section">
        <FileUpload onUploadSuccess={handleUploadSuccess} platform="whatsapp" />
        {Array.isArray(chatData) && chatData.length > 0 ? (
          <>
            <SearchChat chatData={chatData} />
            <DeleteData onDeleteSuccess={handleDeleteSuccess} />
          </>
        ) : (
          <p>No chat data uploaded yet.</p>
        )}
      </section>
    </MainLayout>
  );
};

export default WhatsAppPage;