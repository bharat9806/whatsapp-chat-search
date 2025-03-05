import multer from "multer";
import AdmZip from "adm-zip";
import dbConnect from "../../lib/dbConnect";
import ChatMessage from "../../models/ChatMessage";

export const config = {
  api: {
    bodyParser: false,
  },
};

const storage = multer.memoryStorage();
const upload = multer({ storage });


function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result);
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  try {
    await runMiddleware(req, res, upload.single("file"));

    if (!req.file) {
      console.log("❌ No file uploaded.");
      return res.status(400).json({ error: "No file uploaded" });
    }

    await dbConnect();

    const zip = new AdmZip(req.file.buffer);
    const zipEntries = zip.getEntries();

    const jsonEntries = zipEntries.filter((entry) => {
      return (
        !entry.isDirectory &&
        entry.entryName.includes("your_instagram_activity/messages/inbox/") &&
        entry.entryName.endsWith(".json")
      );
    });

    if (jsonEntries.length === 0) {
      console.log("❌ No JSON files found in Instagram ZIP.");
      return res
        .status(400)
        .json({ error: "No JSON chat files found in Instagram ZIP." });
    }

    let chatMessages = [];

    jsonEntries.forEach((entry) => {
      try {
        const jsonContent = entry.getData().toString("utf8");
        const jsonData = JSON.parse(jsonContent);

        if (jsonData.messages && Array.isArray(jsonData.messages)) {
          jsonData.messages.forEach((message) => {
            const sender = message.sender_name || "Unknown";
            const text = message.content ? message.content.trim() : "";

            let timestamp = new Date();
            if (message.timestamp_ms) {
              timestamp = new Date(parseInt(message.timestamp_ms, 10));
            }

            if (text) {
              chatMessages.push({ sender, text, timestamp });
            }
          });
        } else {
          console.warn(`No messages array found in ${entry.entryName}`);
        }
      } catch (err) {
        console.error(`Error parsing JSON for entry ${entry.entryName}:`, err);
      }
    });

    if (chatMessages.length === 0) {
      return res
        .status(400)
        .json({ error: "No valid messages found in Instagram chat files." });
    }

    await ChatMessage.insertMany(chatMessages);

    res.status(200).json({
      message: "Instagram chat uploaded and messages saved successfully!",
      chatData: chatMessages,
    });
  } catch (error) {
    console.error("❌ Instagram JSON Upload Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
