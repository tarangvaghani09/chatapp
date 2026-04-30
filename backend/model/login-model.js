// Login Schema

const { Schema, model } = require("mongoose");

const loginSchema = new Schema({
  // username: { type: String, unique: true, required: true },
  username: { type: String },
  phone: { type: String, required: true},
  password: { type: String},
  ipAddress: String,
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false }, // soft-delete flag
  isActive: { type: Boolean, default: true },   // disable login if false
});

const Login = new model("Login", loginSchema);
module.exports = Login;
