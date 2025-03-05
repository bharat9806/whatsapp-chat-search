import React, { useState } from "react";
import MainLayout from "../../layout/main";
import FileUpload from "../../components/organs/FileUpload";
import SearchChat from "../../components/organs/SearchChat";
import DeleteData from "../../components/organs/DeleteAllData";
import "./styles.scss";

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

      <section className="export-instructions">
        <h2>How to Export Your Instagram Chat Data</h2>
        <ol>
          <li>
            Go to your profile.
          </li>
          <li>
            Click on the three-line menu at the top right corner.
          </li>
          <li>
            Click on "Your Activity".
          </li>
          <li>
            Scroll to the bottom and click "Download Your Information".
          </li>
          <li>
            Click "Download" or "Transfer Information".
          </li>
          <li>
            Select your account and click "Next".
          </li>
          <li>
            Select the information you want.
          </li>
          <li>
            Scroll down a little, select "Messages" and click "Next".
          </li>
          <li>
            Click "Download to Device".
          </li>
          <li>
            Select the date range according to your preference.
          </li>
          <li>
            Change the format to JSON.
          </li>
          <li>
            Click "Create File" and wait for Instagram to generate your file.
          </li>
          <li>
            Once generated, download the file and upload it here.
          </li>
        </ol>
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
