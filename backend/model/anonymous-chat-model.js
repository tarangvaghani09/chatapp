const mongoose = require("mongoose");

const anonymousChatSchema = new mongoose.Schema({
  chatId: { type: String, required: true },
  sender: { type: String, required: true },
  text: { type: String, default: "" },
  emoji: { type: String, default: null },
  media: {
    data: { type: String, default: null }, // Base64 encoded
    mimetype: { type: String, default: null },
  },
  type: { type: String, enum: ["user", "system"], required: true },
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AnonymousChat", anonymousChatSchema);