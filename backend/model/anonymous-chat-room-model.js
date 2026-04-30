const mongoose = require("mongoose");

const anonymousChatRoomSchema = new mongoose.Schema({
  chatId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  creator: { type: String, required: true },
  users: [{ type: String }], // Array of usernames
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("AnonymousChatRoom", anonymousChatRoomSchema);