// pages/api/upload.js

import multer from "multer";
import AdmZip from "adm-zip";
import dbConnect from "../../lib/dbConnect";
import ChatMessage from "../../models/ChatMessage";

export const config = {
  api: {
    bodyParser: false,
  },
};

// Use memory storage to avoid writing files to disk
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper to run middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Run multer middleware to handle file upload into memory
      await runMiddleware(req, res, upload.single("file"));

      if (!req.file) {
        console.log("❌ No file uploaded.");
        return res.status(400).json({ error: "No file uploaded" });
      }

      // Connect to MongoDB
      await dbConnect();

      // Create AdmZip instance directly from the file buffer
      const zip = new AdmZip(req.file.buffer);

      // Get entries from the zip and find the TXT file
      const zipEntries = zip.getEntries();
      const txtEntry = zipEntries.find((entry) => entry.entryName.endsWith(".txt"));

      if (!txtEntry) {
        console.log("❌ No .txt file found inside ZIP.");
        return res.status(400).json({ error: "No chat text file found in ZIP." });
      }

      // Read the content from the TXT file entry (as UTF-8 string)
      const content = txtEntry.getData().toString("utf8");
      if (!content || content.trim().length === 0) {
        console.log("❌ Chat file is empty.");
        return res.status(400).json({ error: "Chat file is empty." });
      }

      // Parse the chat content.
      // Example expected format for each line:
      // "05/11/2023, 16:01 - Bharat 😇: Hello"
      const chatLines = content.split("\n").filter((line) => line.trim() !== "");
      const chatMessages = chatLines.map((line, index) => {
        const regex = /^(\d{2}\/\d{2}\/\d{4}),\s*(\d{2}:\d{2})\s*-\s*(.*?):\s*(.*)$/;
        const match = line.match(regex);
        if (match) {
          const [ , dateStr, timeStr, sender, message ] = match;
          const [day, month, year] = dateStr.split("/");
          const timestamp = new Date(year, month - 1, day, ...timeStr.split(":").map(Number));
          return {
            sender: sender.trim(),
            text: message.trim(),
            timestamp,
          };
        }
        // Fallback for lines not matching the format
        return {
          sender: "Unknown",
          text: line.trim(),
          timestamp: new Date(),
        };
      });

      if (chatMessages.length === 0) {
        console.log("❌ No valid chat messages parsed.");
        return res.status(400).json({ error: "No valid messages found in chat file." });
      }

      // Insert chat messages into MongoDB
      await ChatMessage.insertMany(chatMessages);
      console.log("✅ Chat messages saved to MongoDB.");

      res.status(200).json({ message: "File uploaded and chat messages saved successfully!", chatData: chatMessages });
    } catch (error) {
      console.error("❌ Upload Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
