import { useState } from "react";
import Fuse from "fuse.js";
import "./styles.scss";

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
  const [filteredMessages, setFilteredMessages] = useState([]);

  const handleSearch = () => {
    let filtered = chatData;
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

  const handleReset = () => {
    setQuery("");
    setFilteredMessages([]);
  };

  return (
    <div className="search-chat-container">
      <h2 className="search-chat-header">Search Chat Messages</h2>

      <div className="search-chat-controls">
        <input
          type="text"
          className="search-chat-input"
          placeholder="Enter search keywords..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="search-chat-buttons">
        <button className="search-chat-button" onClick={handleSearch}>
          Search
        </button>
        <button className="search-chat-button reset" onClick={handleReset}>
          Reset
        </button>
      </div>

      <div className="search-chat-results">
        {filteredMessages.length > 0 ? (
          <ul className="search-chat-list">
            {filteredMessages.map((msg) => (
              <li key={msg.id} className="search-chat-list-item">
                {getMessageContent(msg)}
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-results">No matching messages found.</p>
        )}
      </div>
    </div>
  );
}
