// const express = require('express');
// const router = express.Router();
// const AIChat = require('../model/AIChat');
// const { v4: uuidv4 } = require('uuid');

// // Middleware to extract userId from token (simplified; implement your auth logic)
// const authMiddleware = (req, res, next) => {
//   const userId = req.headers['user-id'];
//   if (!userId) return res.status(401).json({ error: 'Unauthorized' });
//   req.userId = userId;
//   next();
// };

// // Save a new AIChat session or update an existing one
// router.post('/save', authMiddleware, async (req, res) => {
//   try {
//     const { sessionId, messages, modelName } = req.body;
//     const userId = req.userId;

//     if (!messages || !Array.isArray(messages) || messages.length === 0) {
//       return res.status(400).json({ error: 'Messages are required' });
//     }

//     const title = messages[0].text.substring(0, 50);

//     if (sessionId) {
//       // Update existing session
//       const aiChat = await AIChat.findOneAndUpdate(
//         { sessionId, userId },
//         { $push: { messages: { $each: messages } }, title, modelName: modelName || 'AIChat' },
//         { new: true }
//       );
//       if (!aiChat) {
//         return res.status(404).json({ error: 'AIChat session not found' });
//       }
//       res.json(aiChat);
//     } else {
//       // Create new session
//       const newAIChat = new AIChat({
//         userId,
//         sessionId: uuidv4(),
//         title,
//         modelName: modelName || 'AIChat',
//         messages,
//       });
//       await newAIChat.save();
//       res.json(newAIChat);
//     }
//   } catch (error) {
//     console.error('Error saving AIChat:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Get list of AIChat sessions for a user
// router.get('/list', authMiddleware, async (req, res) => {
//   try {
//     const userId = req.userId;
//     const aiChats = await AIChat.find({ userId }).select('sessionId title createdAt modelName').sort({ createdAt: -1 });
//     res.json(aiChats);
//   } catch (error) {
//     console.error('Error fetching AIChat list:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Get a specific AIChat session by sessionId
// router.get('/:sessionId', authMiddleware, async (req, res) => {
//   try {
//     const { sessionId } = req.params;
//     const userId = req.userId;
//     const aiChat = await AIChat.findOne({ sessionId, userId });
//     if (!aiChat) {
//       return res.status(404).json({ error: 'AIChat session not found' });
//     }
//     res.json(aiChat);
//   } catch (error) {
//     console.error('Error fetching AIChat:', error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;