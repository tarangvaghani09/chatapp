import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  query: { username: localStorage.getItem("username") || "Guest" },
});

const AnonymousChat = () => {
  const [chatId, setChatId] = useState("");
  const [currentChatId, setCurrentChatId] = useState("");
  const [password, setPassword] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [isCreator, setIsCreator] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState("");
  const [joinSuccess, setJoinSuccess] = useState(false);
  const [joinRequestSent, setJoinRequestSent] = useState(false);
  const [media, setMedia] = useState(null);
  const [pendingUsers, setPendingUsers] = useState([]);
  const storedUsername = localStorage.getItem("username") || "Guest";
  const fileInputRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Check for active chats on page load
    socket.emit("checkActiveAnonymousChat", { username: storedUsername });
    console.log(`Checking active chat for ${storedUsername}`);

    socket.on("activeAnonymousChat", ({ chatId, password, isCreator }) => {
      setCurrentChatId(chatId);
      setChatId(chatId);
      setPassword(password);
      setJoined(true);
      setIsCreator(isCreator);
      console.log(`Active chat found: ${chatId}, isCreator: ${isCreator}`);
    });

    socket.on("chatCreated", ({ chatId, password }) => {
      setCurrentChatId(chatId);
      setChatId(chatId);
      setPassword(password);
      setJoined(true);
      setIsCreator(true);
      console.log(`Chat created: ${chatId}`);
    });

    socket.on("chatHistory", (history) => {
      console.log(`Received chat history for ${currentChatId}: ${history.length} messages`);
      setMessages(history);
    });

    socket.on("anonymousMessage", (msg) => {
      console.log(`Received message in chat ${msg.chatId}: ${msg.text || "Media"}`);
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("updateUserList", (userList) => {
      setUsers(userList);
      console.log(`Updated user list: ${userList}`);
    });

    socket.on("joinRequest", ({ username, socketId }) => {
      if (isCreator) {
        setPendingUsers((prev) => [...prev, { username, socketId }]);
        console.log(`Join request from ${username} for chat ${currentChatId}`);
      }
    });

    socket.on("joinRequestSent", () => {
      setJoinRequestSent(true);
      setTimeout(() => setJoinRequestSent(false), 3000);
      console.log(`Join request sent for chat ${currentChatId} by ${storedUsername}`);
    });

    socket.on("removedFromChat", () => {
      alert("You have been removed from the chat.");
      resetState();
      console.log(`User ${storedUsername} removed from chat`);
    });

    socket.on("chatClosed", () => {
      alert("The chat has been closed.");
      resetState();
      console.log(`Chat ${currentChatId} closed`);
    });

    socket.on("error", (errMsg) => {
      alert(errMsg);
      if (errMsg === "Invalid Chat ID or Password" || errMsg === "Your join request was rejected") {
        setChatId("");
        setPassword("");
        setJoinRequestSent(false);
      }
      console.log(`Error: ${errMsg}`);
    });

    socket.on("chatJoined", () => {
      setJoinSuccess(true);
      setJoined(true);
      setJoinRequestSent(false);
      setTimeout(() => setJoinSuccess(false), 3000);
      console.log(`User ${storedUsername} joined chat ${currentChatId}`);
    });

    socket.on("leftChat", () => {
      resetState();
      console.log(`User ${storedUsername} left chat`);
    });

    return () => {
      socket.off("activeAnonymousChat");
      socket.off("chatCreated");
      socket.off("chatHistory");
      socket.off("anonymousMessage");
      socket.off("updateUserList");
      socket.off("joinRequest");
      socket.off("joinRequestSent");
      socket.off("removedFromChat");
      socket.off("chatClosed");
      socket.off("error");
      socket.off("chatJoined");
      socket.off("leftChat");
    };
  }, [isCreator, currentChatId, storedUsername]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const resetState = () => {
    setJoined(false);
    setChatId("");
    setCurrentChatId("");
    setPassword("");
    setUsers([]);
    setMessages([]);
    setIsCreator(false);
    setPendingUsers([]);
    setJoinRequestSent(false);
    console.log("State reset");
  };

  const createRoom = () => {
    socket.emit("createAnonymousChat", { username: storedUsername });
    console.log(`Creating chat for ${storedUsername}`);
  };

  const handleJoinChat = (e) => {
    e.preventDefault();
    if (chatId && password) {
      setCurrentChatId(chatId);
      socket.emit("joinAnonymousChat", { chatId, password, username: storedUsername });
      console.log(`Join request sent for chat ${chatId} by ${storedUsername}`);
    }
  };

  const sendMessage = async () => {
    if (message.trim() || media) {
      let mediaData = null;
      if (media) {
        try {
          const base64 = await toBase64(media);
          mediaData = {
            data: base64.split(",")[1],
            mimetype: media.type,
          };
        } catch (error) {
          alert("Error processing media file.");
          console.log(`Media processing error: ${error.message}`);
          return;
        }
      }

      socket.emit("sendAnonymousMessage", {
        chatId: currentChatId,
        message,
        emoji: null,
        media: mediaData,
      });
      console.log(`Message sent to chat ${currentChatId}: ${message || "Media"}`);
      setMessage("");
      setMedia(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } else {
      console.log("No message or media to send");
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleMediaChange = (e) => {
    const file = e.target.files[0];
    if (file && /^image\/(jpeg|jpg|png|gif)$/.test(file.type)) {
      setMedia(file);
      console.log(`Media selected: ${file.name}`);
    } else {
      alert("Only images (jpeg, jpg, png, gif) are allowed.");
      console.log("Invalid media type selected");
    }
  };

  const removeUser = (user) => {
    if (isCreator) {
      socket.emit("removeUser", { chatId: currentChatId, userToRemove: user });
      console.log(`Removing user ${user} from chat ${currentChatId}`);
    }
  };

  const leaveChat = () => {
    socket.emit("leaveAnonymousChat", { chatId: currentChatId });
    console.log(`Leaving chat ${currentChatId}`);
  };

  const closeChat = () => {
    if (isCreator) {
      socket.emit("closeChat", { chatId: currentChatId });
      console.log(`Closing chat ${currentChatId}`);
    }
  };

  const approveJoin = (socketId, username) => {
    socket.emit("approveJoin", { chatId: currentChatId, socketId, username });
    setPendingUsers((prev) => prev.filter((user) => user.socketId !== socketId));
    console.log(`Approved join for ${username} in chat ${currentChatId}`);
  };

  const rejectJoin = (socketId, username) => {
    socket.emit("rejectJoin", { chatId: currentChatId, socketId, username });
    setPendingUsers((prev) => prev.filter((user) => user.socketId !== socketId));
    console.log(`Rejected join for ${username} in chat ${currentChatId}`);
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(`${type} Copied!`);
    setTimeout(() => setCopyFeedback(""), 2000);
    console.log(`${type} copied: ${text}`);
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-[#1e1e2f] to-[#2a2a4a] font-poppins text-white w-full mx-auto">
      <div className="w-full bg-white/10 backdrop-blur-lg p-4 md:p-2 border-b border-white/20 shadow-md sticky top-0 z-10">
        <h1 className="text-xl md:text-2xl font-semibold text-teal-400 text-center md:text-left">
          Anonymous Chat
        </h1>
      </div>
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden w-full md:w-[95vw] mx-auto">
        <div className="w-full md:w-[30%] p-4 md:p-8 bg-white/5 backdrop-blur-lg border-r border-white/10 shadow-xl overflow-y-auto">
          {!joined ? (
            <div>
              <button
                onClick={createRoom}
                className="w-full py-3 bg-gradient-to-r from-teal-400 to-green-400 text-white font-semibold rounded-lg hover:scale-105 transition-transform mb-5"
              >
                Create Room
              </button>
              <form onSubmit={handleJoinChat}>
                <h3 className="text-xl md:text-2xl mb-5">Join Anonymous Chat</h3>
                <input
                  type="text"
                  placeholder="Chat ID"
                  value={chatId}
                  onChange={(e) => setChatId(e.target.value)}
                  required
                  disabled={joined}
                  className="w-full p-3 mb-4 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:border-teal-400 transition-colors disabled:opacity-50"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={joined}
                  className="w-full p-3 mb-4 rounded-lg border border-white/20 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:border-teal-400 transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={joined}
                  className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-300 text-white font-semibold rounded-lg hover:scale-105 transition-transform disabled:opacity-50"
                >
                  Request to Join
                </button>
              </form>
            </div>
          ) : (
            <div>
              <div className="bg-white/8 p-4 rounded-xl mb-5 shadow-lg">
                <h3 className="text-lg font-semibold text-teal-400 flex items-center gap-2 mb-2">
                  Chat ID: <span className="font-mono text-white text-sm pl-5">{currentChatId}</span>
                  <button
                    onClick={() => handleCopy(currentChatId, "Chat ID")}
                    className="bg-white/10 text-teal-400 px-2 py-1 mr-2 rounded-md hover:bg-white/20 transition-colors"
                  >
                    📋 Copy
                  </button>
                </h3>
                <h3 className="text-lg font-semibold text-teal-400 flex items-center gap-2 mb-2">
                  Password: <span className="font-mono text-white text-sm">{password}</span>
                  <button
                    onClick={() => handleCopy(password, "Password")}
                    className="bg-white/10 text-teal-400 px-2 py-1 rounded-md hover:bg-white/20 transition-colors"
                  >
                    📋 Copy
                  </button>
                </h3>
                {copyFeedback && (
                  <p className="text-sm text-green-400 text-center mt-2 animate-fade-in-out">
                    {copyFeedback}
                  </p>
                )}
              </div>
              {isCreator && pendingUsers.length > 0 && (
                <div className="bg-white/8 p-4 rounded-xl mb-5 shadow-lg">
                  <h3 className="text-lg font-semibold text-yellow-400 mb-4">
                    Pending Join Requests
                  </h3>
                  <ul className="list-none p-0">
                    {pendingUsers.map((user, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center p-3 bg-white/5 rounded-lg mb-2"
                      >
                        <span>{user.username}</span>
                        <div>
                          <button
                            onClick={() => approveJoin(user.socketId, user.username)}
                            className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                          >
                            ✅
                          </button>
                          <button
                            onClick={() => rejectJoin(user.socketId, user.username)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                          >
                            ❌
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className="bg-white/8 p-4 rounded-xl shadow-lg">
                <h3 className="text-lg md:text-xl font-semibold text-blue-400 mb-4">
                  Users Online ({users.length})
                </h3>
                <ul className="list-none p-0 max-h-60 md:max-h-72 overflow-y-auto">
                  {users.map((user, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center p-3 bg-white/5 rounded-lg mb-2 hover:bg-white/10 hover:translate-x-1 transition-all"
                    >
                      <span className="text-base font-medium">{user}</span>
                      {isCreator && user !== storedUsername && (
                        <button
                          onClick={() => removeUser(user)}
                          className="bg-green-500/80 text-white px-2 py-1 rounded hover:bg-red-500 transition-colors"
                        >
                          ❌
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
{!isCreator && (
  <button
    onClick={leaveChat}
    className="w-full py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg hover:scale-105 transition-transform mt-5"
  >
    Leave Chat
  </button>
)}
{isCreator && (
  <button
    onClick={closeChat}
    className="w-full py-3 bg-gradient-to-r from-red-500 to-red-300 text-white font-semibold rounded-lg hover:scale-105 transition-transform mt-5"
  >
    Close Chat
  </button>
)}
            </div>
          )}
        </div>
        <div className="w-full md:w-[70%] p-4 md:p-8 flex flex-col bg-white/3">
          <div
            className="flex-1 overflow-y-auto rounded-xl p-5 bg-white/5 shadow-inner"
            ref={chatContainerRef}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-3 rounded-xl mb-2 max-w-[80%] md:max-w-[70%] break-words shadow-md ${
                  msg.type === "system"
                    ? "self-center bg-gray-500/30 text-white text-center"
                    : msg.sender === storedUsername
                    ? "self-end bg-teal-500/30 text-white"
                    : "self-start bg-blue-500/30 text-white"
                }`}
              >
                {msg.type !== "system" && (
                  <strong className="text-teal-400">{msg.sender}: </strong>
                )}
                {msg.text}
                {msg.emoji && <span>{msg.emoji}</span>}
                {msg.media && msg.type !== "system" && (
                  <div className="mt-2">
                    {/* <img
                      src={`data:${msg.media.mimetype};base64,${msg.media.data}`}
                      alt="Shared media"
                      className="max-w-full rounded-lg"
                    /> */}
                  </div>
                )}
                <div className="text-xs text-gray-300 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
          <div className="flex mt-5 gap-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleMediaChange}
              ref={fileInputRef}
              className="p-3 text-white"
            />
            <input
              type="text"
              placeholder="Type a message or emoji (e.g., 😊)..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 p-3 rounded-lg border border-white/40 bg-white/10 text-white placeholder-white/50 focus:outline-none focus:border-teal-400 transition-colors"
            />
            <button
              onClick={sendMessage}
              className="px-4 md:px-5 py-3 bg-gradient-to-r from-teal-400 to-green-400 text-white font-semibold rounded-lg hover:scale-105 transition-transform"
            >
              Send
            </button>
          </div>
        </div>
      </div>
      {joinSuccess && (
        <div className="fixed top-16 md:top-20 right-4 bg-green-500 text-white p-4 rounded-lg shadow-lg animate-fade-in-out flex items-center gap-2">
          <span>🎉</span> Chat Joined Successfully!
        </div>
      )}
      {joinRequestSent && (
        <div className="fixed top-16 md:top-20 right-4 bg-yellow-500 text-white p-4 rounded-lg shadow-lg animate-fade-in-out flex items-center gap-2">
          <span>📨</span> Request Sent!
        </div>
      )}
    </div>
  );
};

export default AnonymousChat;
