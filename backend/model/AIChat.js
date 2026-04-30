// const mongoose = require('mongoose');

// const messageSchema = new mongoose.Schema({
//   role: { type: String, required: true, enum: ['user', 'model'] },
//   text: { type: String, required: true },
//   timestamp: { type: Date, default: Date.now },
// });

// const aiChatSchema = new mongoose.Schema({
//   userId: { type: String, required: true },
//   sessionId: { type: String, required: true, unique: true },
//   title: { type: String, required: true },
//   modelName: { type: String, default: 'AIChat' },
//   messages: [messageSchema],
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('AIChat', aiChatSchema);