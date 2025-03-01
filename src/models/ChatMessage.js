import mongoose from 'mongoose';

const ChatMessageSchema = new mongoose.Schema({
  sender: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

export default mongoose.models.ChatMessage || mongoose.model('ChatMessage', ChatMessageSchema);