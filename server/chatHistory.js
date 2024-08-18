const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChatHistorySchema = new Schema({
  userPrompt: { type: String, required: true },
  aiResponse: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const ChatHistory = mongoose.model('ChatHistory', ChatHistorySchema);

module.exports = ChatHistory;
