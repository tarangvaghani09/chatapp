// models/AuditLog.js
const mongoose = require('mongoose');

const AuditLogSchema = new mongoose.Schema({
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Register' },
  adminUsername: String,
  action: String, // e.g., "soft-delete", "restore", "deactivate", "update-role"
  targetUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'Register' },
  targetUserPhone: String,
  details: Object,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AuditLog', AuditLogSchema);
