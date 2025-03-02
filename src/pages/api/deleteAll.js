import dbConnect from "../../lib/dbConnect";
import ChatMessage from "../../models/ChatMessage";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      await dbConnect();
      await ChatMessage.deleteMany({});
      console.log("✅ All chat messages deleted.");
      res.status(200).json({ message: "All chat messages deleted successfully!" });
    } catch (error) {
      console.error("❌ Deletion Error:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
