import React, { useState } from "react";
import MainLayout from "../layout/main";
import FileUpload from "../components/organs/FileUpload";
import SearchChat from "../components/organs/SearchChat";
import DeleteData from "../components/organs/DeleteAllData";

const HomePage = () => {
  const [chatData, setChatData] = useState([]);

  const handleUploadSuccess = (data) => {
    setChatData(data || []);
  };

  const handleDeleteSuccess = () => {
    setChatData([]);
  };

  return (
    <MainLayout>
      <FileUpload onUploadSuccess={handleUploadSuccess} />
      {Array.isArray(chatData) && chatData.length > 0 ? (
        <>
          <SearchChat chatData={chatData} />
          <DeleteData onDeleteSuccess={handleDeleteSuccess} />
        </>
      ) : (
        <p>No chat data uploaded yet.</p>
      )}
    </MainLayout>
  );
};

export default HomePage;
