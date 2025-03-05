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
    const txtEntry = zipEntries.find((entry) => entry.entryName.endsWith(".txt"));

    if (!txtEntry) {
      console.log("❌ No .txt file found inside ZIP.");
      return res.status(400).json({ error: "No chat text file found in ZIP." });
    }

    const content = txtEntry.getData().toString("utf8");
    if (!content || content.trim().length === 0) {
      console.log("❌ Chat file is empty.");
      return res.status(400).json({ error: "Chat file is empty." });
    }

    const chatLines = content.split("\n").filter((line) => line.trim() !== "");
    const chatMessages = chatLines.map((line) => {
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
      return {
        sender: "Unknown",
        text: line.trim(),
        timestamp: new Date(),
      };
    });

    if (chatMessages.length === 0) {
      return res.status(400).json({ error: "No valid messages found in chat file." });
    }

    await ChatMessage.insertMany(chatMessages);

    res.status(200).json({
      message: "WhatsApp chat uploaded and messages saved successfully!",
      chatData: chatMessages,
    });
  } catch (error) {
    console.error("❌ WhatsApp Upload Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
