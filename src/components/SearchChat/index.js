import { useState, useEffect } from "react";
import Fuse from "fuse.js";

// Helper function to extract sender name
const getSender = (msg) => {
  if (msg.sender) {
    return msg.sender.split(":")[0].trim();
  } else if (msg.text) {
    const regex = /-\s*(.*?):/;
    const match = msg.text.match(regex);
    return match ? match[1].trim() : "";
  }
  return "";
};

// Helper function to extract message content by removing duplicate sender prefixes
const getMessageContent = (msg) => {
  if (!msg.text) return "";
  const separator = " - ";
  if (msg.text.includes(separator)) {
    return msg.text.split(separator)[1].trim();
  }
  const sender = getSender(msg);
  const prefix = sender + ":";
  let text = msg.text;
  if (text.startsWith(prefix)) {
    text = text.substring(prefix.length).trim();
    if (text.startsWith(prefix)) {
      text = text.substring(prefix.length).trim();
    }
  }
  return text;
};

export default function SearchChat({ chatData = [] }) {
  const [query, setQuery] = useState("");
  const [selectedSender, setSelectedSender] = useState("");
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [senders, setSenders] = useState([]);

  // Extract unique sender names using fallback extraction and limit to first 2
  useEffect(() => {
    const uniqueSenders = [
      ...new Set(
        chatData.map((msg) => {
          if (msg.sender) {
            return msg.sender.split(":")[0].trim();
          } else if (msg.text) {
            const regex = /-\s*(.*?):/;
            const match = msg.text.match(regex);
            return match ? match[1].trim() : null;
          }
          return null;
        }).filter((name) => name && name !== "null")
      )
    ].slice(0, 2);
    setSenders(uniqueSenders);
    console.log("Unique senders:", uniqueSenders);
  }, [chatData]);

  // Handle search when the Search button is clicked
  const handleSearch = () => {
    let filtered = chatData;
    // Filter by Sender using helper function
    if (selectedSender) {
      filtered = filtered.filter((msg) => getSender(msg) === selectedSender);
    }
    // Apply fuzzy search if query exists
    if (query.trim()) {
      const processedData = filtered.map((msg) => ({
        ...msg,
        content: getMessageContent(msg),
      }));
      const fuse = new Fuse(processedData, { keys: ["content"], threshold: 0.3 });
      filtered = fuse.search(query).map((res) => res.item);
    }
    setFilteredMessages(filtered);
  };

  // Reset all filters and clear displayed results
  const handleReset = () => {
    setQuery("");
    setSelectedSender("");
    setFilteredMessages([]);
  };

  return (
    <div>
      {/* Sender Filter Dropdown */}
      <select onChange={(e) => setSelectedSender(e.target.value)} value={selectedSender}>
        <option value="">All Senders</option>
        {senders.map((sender, index) => (
          <option key={index} value={sender}>
            {sender}
          </option>
        ))}
      </select>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search chats..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* Search and Reset Buttons */}
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleReset}>Reset</button>

      {/* Display Filtered Messages */}
      <ul>
        {filteredMessages.length > 0 ? (
          filteredMessages.map((msg) => (
            <li key={msg.id}>
               {getMessageContent(msg)}
            </li>
          ))
        ) : (
          <li>No matching messages found.</li>
        )}
      </ul>
    </div>
  );
}
