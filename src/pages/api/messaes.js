import dbConnect from '../../lib/dbConnect';
import ChatMessage from '../../models/ChatMessage';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const messages = await ChatMessage.find({}).sort({ timestamp: 1 });
      res.status(200).json({ success: true, data: messages });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(400).json({ success: false, error: 'Method not allowed' });
  }
}
