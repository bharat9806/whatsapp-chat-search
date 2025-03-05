import React, { useState } from "react";
import MainLayout from "../layout/main";
import FileUpload from "../components/organs/FileUpload";
import SearchChat from "../components/organs/SearchChat";
import DeleteData from "../components/organs/DeleteAllData";

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
