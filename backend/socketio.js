const { Server } = require("socket.io");
const Chat = require("./model/chat-model");
const AnonymousChat = require("./model/anonymous-chat-model");
const AnonymousChatRoom = require("./model/anonymous-chat-room-model");

const users = new Map();
const anonymousChats = {}; // Store anonymous chat rooms

function configureSocket(server) {
  const allowedOrigins = [
    "http://localhost:5173",
    process.env.FRONTEND_URL,
  ].filter(Boolean);

  const io = new Server(server, {
    cors: {
      origin: allowedOrigins,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  
  async function reorderContacts(ownerPhone, contactPhone) {
    const doc = await Contact.findOne({ owner: ownerPhone });
    // console.log(doc);
    console.log("call");
    if (!doc) return;

    let arrayField = "contacts";
    let subdoc = doc.contacts.find((c) => c.contactPhone === contactPhone);

    if (!subdoc) {
      arrayField = "unknownContacts";
      subdoc = doc.unknownContacts.find((c) => c.contactPhone === contactPhone);
    }
    if (!subdoc) return;

    // 1) pull it out
    await Contact.updateOne(
      { owner: ownerPhone },
      { $pull: { [arrayField]: { contactPhone } } }
    );
    // 2) push it to front
    await Contact.updateOne(
      { owner: ownerPhone },
      { $push: { [arrayField]: { $each: [subdoc], $position: 0 } } }
    );
  }

  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("userConnected", (username) => {
      users.set(socket.id, username);
      io.emit("updateUserList", Array.from(users.values()));
    });

    socket.on("sendMessage", async (data) => {
      try {
        const { message, sender, receiver, image } = data;
        console.log("hello");
        console.log(image);

        if (!sender || !receiver) {
          console.error("Sender and receiver are required");
          return;
        }

        const chat = new Chat({ message, sender, receiver, image });
        await chat.save();

        // 2) reorder both sides’ contact lists
        // await reorderContacts(sender, receiver);
        // await reorderContacts(receiver, sender);

        io.emit("receiveMessage", chat);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });
    socket.on("messageReceived", async ({ chatId }) => {
      await Chat.findByIdAndUpdate(chatId, { status: "received" });
      io.emit("messageStatusUpdate", { chatId, status: "received" });
    });

    socket.on("messageSeen", async ({ chatId }) => {
      await Chat.findByIdAndUpdate(chatId, { status: "seen" });
      io.emit("messageStatusUpdate", { chatId, status: "seen" });
    });

    // socket.on("deleteMessage", async ({ id, user, deleteForBoth }) => {
    //   if (deleteForBoth) {
    //     await Chat.findByIdAndDelete(id);
    //   } else {
    //     await Chat.findByIdAndUpdate(
    //       id,
    //       { $addToSet: { deletedBy: user } },
    //       { new: true }
    //     );
    //   }
    //   io.emit("messageDeleted", { id, user, deleteForBoth });
    // });

    socket.on("deleteMessage", async ({ id, user, deleteForBoth }) => {
      if (deleteForBoth) {
        await Chat.findByIdAndDelete(id);
      } else {
        await Chat.findByIdAndUpdate(
          id,
          { $addToSet: { deletedBy: user } },
          { new: true }
        );
      }
      io.emit("messageDeleted", { id, user, deleteForBoth });
    });

    // Anonymous chat events
    socket.on("createAnonymousChat", async ({ username }) => {
      const chatId = "DeepChat-" + Math.random().toString(36).substring(2, 10);
      const password = "DeepChat-" + Math.random().toString(36).substring(2, 10);

      // Save chat room metadata to MongoDB
      const chatRoom = new AnonymousChatRoom({
        chatId,
        password,
        creator: username,
        users: [username],
      });
      await chatRoom.save();

      // Initialize in-memory structure
      anonymousChats[chatId] = {
        password,
        users: new Map([[socket.id, username]]),
        messages: [],
        creator: socket.id,
        creatorUsername: username,
        pendingUsers: new Map(),
      };

      socket.join(chatId);

      const joinMessage = {
        chatId,
        sender: "System",
        text: `${username} created the chat`,
        type: "system",
        timestamp: new Date(),
      };
      await new AnonymousChat(joinMessage).save();
      anonymousChats[chatId].messages.push(joinMessage);

      socket.emit("chatCreated", { chatId, password });
      io.to(chatId).emit("updateUserList", Array.from(anonymousChats[chatId].users.values()));
      io.to(chatId).emit("anonymousMessage", joinMessage);
      console.log(`Chat ${chatId} created by ${username}, join message saved`);
    });

    socket.on("joinAnonymousChat", async ({ chatId, password, username }) => {
      const chatRoom = await AnonymousChatRoom.findOne({ chatId });
      if (!chatRoom || chatRoom.password !== password) {
        socket.emit("error", "Invalid Chat ID or Password");
        console.log(`Join attempt failed for chat ${chatId} by ${username}: Invalid credentials`);
        return;
      }

      if (!anonymousChats[chatId]) {
        anonymousChats[chatId] = {
          password: chatRoom.password,
          users: new Map(),
          messages: [],
          creator: chatRoom.creator === username ? socket.id : null,
          creatorUsername: chatRoom.creator,
          pendingUsers: new Map(),
        };
      }

      if (anonymousChats[chatId].users.has(socket.id)) {
        socket.emit("error", "You are already in this chat");
        console.log(`User ${username} already in chat ${chatId}`);
        return;
      }

      anonymousChats[chatId].pendingUsers.set(socket.id, username);
      io.to(anonymousChats[chatId].creator).emit("joinRequest", { username, socketId: socket.id });
      socket.emit("joinRequestSent");
      console.log(`Join request for chat ${chatId} by ${username} sent to creator`);
    });

    socket.on("checkActiveAnonymousChat", async ({ username }) => {
      try {
        const chatRoom = await AnonymousChatRoom.findOne({ users: username });
        if (chatRoom) {
          const { chatId, password } = chatRoom;
          socket.emit("activeAnonymousChat", { chatId, password, isCreator: chatRoom.creator === username });

          if (!anonymousChats[chatId]) {
            anonymousChats[chatId] = {
              password,
              users: new Map(),
              messages: [],
              creator: chatRoom.creator === username ? socket.id : null,
              creatorUsername: chatRoom.creator,
              pendingUsers: new Map(),
            };
          }

          // Remove old socket ID if it exists
          for (let [oldSocketId, user] of anonymousChats[chatId].users) {
            if (user === username) {
              anonymousChats[chatId].users.delete(oldSocketId);
              break;
            }
          }

          anonymousChats[chatId].users.set(socket.id, username);
          socket.join(chatId);

          if (chatRoom.creator === username) {
            anonymousChats[chatId].creator = socket.id;
            console.log(`Creator ${username} reassociated with new socket ${socket.id} in chat ${chatId}`);
          }

          // Fetch chat history
          const history = await AnonymousChat.find({ chatId }).sort({ timestamp: 1 });
          socket.emit("chatHistory", history);
          console.log(`Sent ${history.length} messages to ${username} for chat ${chatId}`);

          io.to(chatId).emit("updateUserList", Array.from(anonymousChats[chatId].users.values()));
          socket.emit("chatJoined");
          console.log(`User ${username} rejoined chat ${chatId}`);
        }
      } catch (error) {
        console.error(`Error checking active anonymous chat for ${username}:`, error);
        socket.emit("error", "Failed to check active chat");
      }
    });

    socket.on("approveJoin", async ({ chatId, socketId, username }) => {
      if (anonymousChats[chatId] && anonymousChats[chatId].creator === socket.id) {
        anonymousChats[chatId].users.set(socketId, username);
        anonymousChats[chatId].pendingUsers.delete(socketId);

        // Update MongoDB
        await AnonymousChatRoom.findOneAndUpdate(
          { chatId },
          { $addToSet: { users: username } }
        );

        const targetSocket = io.sockets.sockets.get(socketId);
        if (targetSocket) {
          targetSocket.join(chatId);
          console.log(`User ${username} joined chat ${chatId}`);

          // Fetch and send chat history
          try {
            const history = await AnonymousChat.find({ chatId }).sort({ timestamp: 1 });
            targetSocket.emit("chatHistory", history);
            console.log(`Sent ${history.length} messages to ${username} for chat ${chatId}`);
          } catch (error) {
            console.error(`Error fetching chat history for ${chatId}:`, error);
            targetSocket.emit("error", "Failed to fetch chat history");
          }

          // Broadcast join message
          const joinMessage = {
            chatId,
            sender: "System",
            text: `${username} joined the chat`,
            type: "system",
            timestamp: new Date(),
          };
          await new AnonymousChat(joinMessage).save();
          anonymousChats[chatId].messages.push(joinMessage);

          io.to(chatId).emit("anonymousMessage", joinMessage);
          io.to(chatId).emit("updateUserList", Array.from(anonymousChats[chatId].users.values()));
          targetSocket.emit("chatJoined");
          console.log(`Join message for ${username} broadcast to chat ${chatId}`);
        } else {
          console.log(`Socket ${socketId} not found for user ${username}`);
        }
      } else {
        console.log(`Unauthorized approveJoin attempt for chat ${chatId} by socket ${socket.id}`);
      }
    });

    socket.on("rejectJoin", ({ chatId, socketId, username }) => {
      if (anonymousChats[chatId] && anonymousChats[chatId].creator === socket.id) {
        anonymousChats[chatId].pendingUsers.delete(socketId);
        io.to(socketId).emit("error", "Your join request was rejected");
        console.log(`Join request rejected for ${username} in chat ${chatId}`);
      }
    });

    socket.on("sendAnonymousMessage", async (data) => {
      const { chatId, message, emoji, media } = data;
      console.log(`Received sendAnonymousMessage: ${JSON.stringify(data)}`);

      if (!anonymousChats[chatId]) {
        socket.emit("error", `Chat ${chatId} not found`);
        console.log(`Chat ${chatId} not found for message send`);
        return;
      }

      let senderUsername = anonymousChats[chatId].users.get(socket.id);
      if (!senderUsername) {
        if (anonymousChats[chatId].creatorUsername === socket.handshake.query.username) {
          senderUsername = anonymousChats[chatId].creatorUsername;
          anonymousChats[chatId].users.delete(anonymousChats[chatId].creator);
          anonymousChats[chatId].creator = socket.id;
          anonymousChats[chatId].users.set(socket.id, senderUsername);
          console.log(`Reassociated creator ${senderUsername} with new socket ${socket.id} in chat ${chatId}`);
        } else {
          socket.emit("error", "You are not in this chat");
          console.log(`User with socket ${socket.id} not in chat ${chatId}`);
          return;
        }
      }

      let msg = {
        chatId,
        sender: senderUsername,
        text: message || "",
        emoji: emoji || null,
        type: "user",
        timestamp: new Date(),
      };

      if (media) {
        if (media.data && media.mimetype && /^image\/(jpeg|jpg|png|gif)$/.test(media.mimetype)) {
          msg.media = {
            data: media.data,
            mimetype: media.mimetype,
          };
        } else {
          socket.emit("error", "Invalid media format. Only images (jpeg, jpg, png, gif) are allowed.");
          console.log(`Invalid media sent to chat ${chatId} by ${msg.sender}`);
          return;
        }
      }

      try {
        const savedMessage = await new AnonymousChat(msg).save();
        console.log(`Message saved to MongoDB: ${JSON.stringify(savedMessage)}`);
        anonymousChats[chatId].messages.push(msg);
        io.to(chatId).emit("anonymousMessage", msg);
        console.log(`Message sent in chat ${chatId} by ${msg.sender}: ${msg.text || "Media"}`);
      } catch (error) {
        console.error(`Error saving message to MongoDB for chat ${chatId}:`, error.message);
        console.error(error.stack);
        socket.emit("error", "Failed to send message");
      }
    });

    socket.on("leaveAnonymousChat", async ({ chatId }) => {
      if (anonymousChats[chatId] && anonymousChats[chatId].users.has(socket.id)) {
        const username = anonymousChats[chatId].users.get(socket.id);
        anonymousChats[chatId].users.delete(socket.id);
        socket.leave(chatId);

        // Update MongoDB: Remove user from the chat room
        await AnonymousChatRoom.findOneAndUpdate(
          { chatId },
          { $pull: { users: username } }
        );

        const leaveMessage = {
          chatId,
          sender: "System",
          text: `${username} left the chat`,
          type: "system",
          timestamp: new Date(),
        };
        await new AnonymousChat(leaveMessage).save();
        anonymousChats[chatId].messages.push(leaveMessage);

        io.to(chatId).emit("anonymousMessage", leaveMessage);
        io.to(chatId).emit("updateUserList", Array.from(anonymousChats[chatId].users.values()));
        socket.emit("leftChat");
        console.log(`User ${username} left chat ${chatId}`);
      }
    });

    socket.on("removeUser", async ({ chatId, userToRemove }) => {
      if (anonymousChats[chatId] && anonymousChats[chatId].creator === socket.id) {
        for (let [socketId, username] of anonymousChats[chatId].users) {
          if (username === userToRemove) {
            anonymousChats[chatId].users.delete(socketId);
            io.sockets.sockets.get(socketId)?.leave(chatId);

            // Update MongoDB: Remove user from the chat room
            await AnonymousChatRoom.findOneAndUpdate(
              { chatId },
              { $pull: { users: username } }
            );

            const removeMessage = {
              chatId,
              sender: "System",
              text: `${username} was removed from the chat`,
              type: "system",
              timestamp: new Date(),
            };
            await new AnonymousChat(removeMessage).save();
            anonymousChats[chatId].messages.push(removeMessage);

            io.to(chatId).emit("anonymousMessage", removeMessage);
            io.to(chatId).emit("updateUserList", Array.from(anonymousChats[chatId].users.values()));
            io.to(socketId).emit("removedFromChat");
            console.log(`User ${username} removed from chat ${chatId}`);
            break;
          }
        }
      }
    });

    socket.on("closeChat", async ({ chatId }) => {
      if (anonymousChats[chatId]) {
        const closeMessage = {
          chatId,
          sender: "System",
          text: "The chat has been closed",
          type: "system",
          timestamp: new Date(),
        };
        await new AnonymousChat(closeMessage).save();

        io.to(chatId).emit("anonymousMessage", closeMessage);
        io.to(chatId).emit("chatClosed");

        // Delete all messages associated with this chatId from MongoDB
        try {
          await AnonymousChat.deleteMany({ chatId });
          console.log(`Deleted all messages for chat ${chatId} from MongoDB (AnonymousChat)`);
          await AnonymousChatRoom.deleteOne({ chatId });
          console.log(`Deleted chat room ${chatId} from MongoDB (AnonymousChatRoom)`);
        } catch (error) {
          console.error(`Error deleting data for chat ${chatId} from MongoDB:`, error);
        }

        delete anonymousChats[chatId];
        console.log(`Chat ${chatId} closed`);
      }
    });

    socket.on("disconnect", async () => {
      for (let chatId in anonymousChats) {
        if (anonymousChats[chatId].users.has(socket.id)) {
          const username = anonymousChats[chatId].users.get(socket.id);
          anonymousChats[chatId].users.delete(socket.id);

          const disconnectMessage = {
            chatId,
            sender: "System",
            text: `${username} disconnected`,
            type: "system",
            timestamp: new Date(),
          };
          await new AnonymousChat(disconnectMessage).save();
          anonymousChats[chatId].messages.push(disconnectMessage);

          io.to(chatId).emit("anonymousMessage", disconnectMessage);
          io.to(chatId).emit("updateUserList", Array.from(anonymousChats[chatId].users.values()));
          console.log(`User ${username} disconnected from chat ${chatId}`);
        }
        if (anonymousChats[chatId].pendingUsers.has(socket.id)) {
          anonymousChats[chatId].pendingUsers.delete(socket.id);
          console.log(`Pending user ${socket.id} removed from chat ${chatId}`);
        }
      }
      users.delete(socket.id);
      io.emit("updateUserList", Array.from(users.values()));
      console.log(`User disconnected: ${socket.id}`);
    });
  });
  return io;
}

module.exports = configureSocket;
