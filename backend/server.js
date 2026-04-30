// server.js (backend entry file)
require("dotenv").config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
const server = http.createServer(app);
const authRoute = require("./router/auth-router");
const connectDb = require("./utils/db");
const Chat = require("./model/chat-model"); // Ensure you import Chat model
const configureSocket = require("./socketio");
const PORT = process.env.PORT || 5000;
const fs = require("fs");
const mongoose = require('mongoose');

// const io = new Server(server, {
//     cors: {
//         origin: 'http://localhost:5173',
//         methods: ['GET', 'POST'],
//     },
// });

const io = configureSocket(server);

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use("/api", authRoute);

// // Socket.io events
// io.on('connection', (socket) => {
//     console.log('a user connected');

//     socket.on('sendMessage', async (data) => {
//         const chat = new Chat(data);
//         await chat.save();
//         io.emit('receiveMessage', chat);
//     });

//     socket.on('deleteMessage', async ({ id, user, deleteForBoth }) => {
//         if (deleteForBoth) {
//             await Chat.findByIdAndDelete(id);
//         } else {
//             await Chat.findByIdAndUpdate(id, { $push: { deletedBy: user } });
//         }
//         io.emit('messageDeleted', { id, user, deleteForBoth });
//     });

//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });

// Configure Multer storage
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//       cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//       cb(null, Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// app.post('/upload', upload.single('image'), (req, res) => {
//   if (!req.file) {
//       return res.status(400).send({ error: 'No file uploaded' });
//   }
//   res.send({ imageUrl: `http://localhost:5000/uploads/${req.file.filename}` });
// });

// app.use('/uploads', express.static('uploads'));

// Serve static files (uploaded images)
app.use("/uploads", express.static("uploads"));

// // Handle file download request
// app.get('/download/:fileName', (req, res) => {
//   const fileName = req.params.fileName;
//   const filePath = path.join(__dirname, 'uploads', fileName);
//   res.download(filePath, fileName);
// });

// Endpoint to handle download requests for PDF and image files
app.get("/download/uploads/:fileName", (req, res) => {
  const fileName = req.params.fileName;
  const filePath = path.join(__dirname, "uploads", fileName);

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Set headers to force download
    res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);
    res.setHeader("Content-Type", "application/octet-stream");

    // Pipe the file stream to the response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    res.status(404).json({ message: "File not found" });
  }
});



// ai chat update testing 



// ChatSession Model for AI Prompt Chat
const aiPromptChatSchema = new mongoose.Schema({
  name: { type: String, required: true },
  conversation: [{
    role: { type: String, required: true },
    text: { type: String, required: true },
    link: { type: String }
  }],
  createdAt: { type: Date, default: Date.now }
});

const AiPromptChat = mongoose.model('AiPromptChat', aiPromptChatSchema);

// API Endpoints for AI Prompt Chat
app.post('/api/aipromptchat', async (req, res) => {
  try {
    const { name, conversation } = req.body;
    if (!name || !Array.isArray(conversation)) {
      return res.status(400).json({ error: 'Invalid request: name (string) and conversation (array) are required' });
    }
    const newSession = new AiPromptChat({ name, conversation });
    await newSession.save();
    res.status(201).json(newSession);
  } catch (err) {
    console.error('Create session error:', err);
    res.status(500).json({ error: 'Failed to create chat session: ' + err.message });
  }
});

app.get('/api/aipromptchat', async (req, res) => {
  try {
    const sessions = await AiPromptChat.find().sort({ createdAt: -1 });
    res.json(sessions);
  } catch (err) {
    console.error('Fetch sessions error:', err);
    res.status(500).json({ error: 'Failed to fetch chat sessions: ' + err.message });
  }
});

app.get('/api/aipromptchat/:id', async (req, res) => {
  try {
    const session = await AiPromptChat.findById(req.params.id);
    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.json(session);
  } catch (err) {
    console.error('Fetch session error:', err);
    res.status(500).json({ error: 'Failed to fetch chat session: ' + err.message });
  }
});

app.put('/api/aipromptchat/:id', async (req, res) => {
  try {
    const { name, conversation } = req.body;
    if (!name && !conversation) {
      return res.status(400).json({ error: 'Invalid request: name or conversation required' });
    }
    const session = await AiPromptChat.findByIdAndUpdate(
      req.params.id,
      { name, conversation },
      { new: true, omitUndefined: true }
    );
    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.json(session);
  } catch (err) {
    console.error('Update session error:', err);
    res.status(500).json({ error: 'Failed to update chat session: ' + err.message });
  }
});

app.delete('/api/aipromptchat/:id', async (req, res) => {
  try {
    const session = await AiPromptChat.findByIdAndDelete(req.params.id);
    if (!session) return res.status(404).json({ error: 'Session not found' });
    res.json({ message: 'Session deleted' });
  } catch (err) {
    console.error('Delete session error:', err);
    res.status(500).json({ error: 'Failed to delete chat session: ' + err.message });
  }
});






connectDb().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`);
  });
});

module.exports = io; // Export io to use in routes
