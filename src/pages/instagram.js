import React, { useState } from "react";
import MainLayout from "../layout/main";
import FileUpload from "../components/organs/FileUpload";
import SearchChat from "../components/organs/SearchChat";
import DeleteData from "../components/organs/DeleteAllData";

const InstagramPage = () => {
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
        <h1>Instagram Chat Search</h1>
        <p>Upload your Instagram chat history and find messages easily.</p>
      </section>

      <section id="upload-section">
        <FileUpload onUploadSuccess={handleUploadSuccess} platform="instagram" />
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

export default InstagramPage;
