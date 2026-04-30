// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { toggleAiChat } from "../actions/chatAction";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import ReactLoading from 'react-loading';
// import { FaArrowRight } from "react-icons/fa";
// import { BsPauseCircleFill } from "react-icons/bs";
// import '../prompt.css';

// const PromptAndResponseApp = () => {
//   const dispatch = useDispatch();
//   const isAiChatOpen = useSelector((state) => state.chat.isAiChatOpen);
//   const [inputText, setInputText] = useState("");
//   const [conversation, setConversation] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const messagesEndRef = useRef(null);

//   const apiKey = "AIzaSyCTKaNYTvV7Ky7OMA21pXTq3j6hkcd779A";  // Replace with your actual API key
// const MODEL_NAME = "gemini-1.5-flash";
//   const storedUsername = localStorage.getItem("name");

//   useEffect(() => {
//     scrollToBottom();
//   }, [conversation, isLoading]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   const handleSendMessage = async (event) => {
//     event.preventDefault();
//     if (!inputText.trim()) return;

//     const userMessage = { role: "user", text: inputText };
//     setConversation([...conversation, userMessage]);
//     setInputText("");
//     setIsLoading(true);

//     try {
//       const genAI = new GoogleGenerativeAI(apiKey);
//       const model = genAI.getGenerativeModel({ model: MODEL_NAME });

//       const result = await model.generateContent({
//         contents: [{ role: "user", parts: [{ text: userMessage.text }] }]
//       });

//       let aiResponse = result.response.text();

//       setConversation([...conversation, userMessage, { role: "model", text: aiResponse }]);
//     } catch (error) {
//       console.error("Error fetching AI response:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className={`ai-chat-container ${isAiChatOpen ? "open" : "closed"} mt-5 p-4 h-[80%] w-[80%] mx-auto bg-green-100 relative max-[500px]:h-[70%]`}>
//       <h2 className="ai-heading text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-purple-800 capitalize max-[500px]:text-md">
//         {/* max-[500px]:mb-1 */}
//         Welcome to deepChat AI
//       </h2>

//       <div className="chat-box bg-gray-50 p-4 rounded shadow-inner overflow-y-auto h-[90%] pb-24">
//         {conversation.map((msg, index) => (
//           <div
//             key={index}
//             className={` max-[500px]:text-sm message ${msg.role} flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-4`}
//           >
//             <div className={` max-w-[75%] p-3 rounded-lg ${msg.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"}`}>
//               <strong>{msg.role === "user" ? "You:" : "Gemini:"}</strong>
//               {Array.isArray(msg.text) ? (
//                 <ul className="mt-2">
//                   {msg.text.map((point, idx) => (
//                     <li key={idx}>{point}</li>
//                   ))}
//                 </ul>
//               ) : (
//                 <p className="mt-2">{msg.text}</p>
//               )}
//             </div>
//           </div>
//         ))}

//         {/* Loading Spinner for Gemini's Response */}
//         {isLoading && (
//           <div className="message model loading flex justify-start mb-4">
//             <div className="max-w-[75%] p-3 rounded-lg bg-gray-100 text-left flex items-center">
//               <strong className="mr-2">DeepChat:</strong>
//               <ReactLoading type="spin" color="black" height={30} width={30} />
//             </div>
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       <form onSubmit={handleSendMessage} className="chat-prompt-input flex justify-center bottom-10 left-20 right-0 mx-auto w-[100%] p-4 mt-5 bg-white border-t border-gray-200 shadow-lg border rounded-xl max-[500px]:bottom-3 max-[500px]:p-2">
//         <input
//           type="text"
//           placeholder="Enter a prompt..."
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//           className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ease-in-out max-[500px]:p-1.5"
//         />
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ease-in-out max-[500px]:p-1.5"
//         >
//           {isLoading ? <BsPauseCircleFill /> : <FaArrowRight />}
//         </button>
//       </form>


//     </div>
//   );

// };

// export default PromptAndResponseApp;

//testing

// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import ReactLoading from 'react-loading';
// import { FaArrowRight, FaPlus } from "react-icons/fa";
// import { BsPauseCircleFill } from "react-icons/bs";
// import axios from 'axios';

// const PromptAndResponseApp = () => {
//   const dispatch = useDispatch();
//   const [inputText, setInputText] = useState("");
//   const [conversation, setConversation] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [chatSessions, setChatSessions] = useState([]);
//   const [currentSessionId, setCurrentSessionId] = useState(null);
//   const messagesEndRef = useRef(null);
//   const storedUsername = localStorage.getItem("name") || "User";

//   // Gemini API key from .env
//   const apiKey = "AIzaSyCTKaNYTvV7Ky7OMA21pXTq3j6hkcd779A";
//   const MODEL_NAME = "gemini-1.5-flash";
//   const backendUrl =  API_BASE + "/api/aipromptchat";

//   // Load chat sessions from MongoDB
//   useEffect(() => {
//     const fetchSessions = async () => {
//       try {
//         const response = await axios.get(backendUrl);
//         setChatSessions(response.data);
//         if (response.data.length > 0 && !currentSessionId) {
//           setCurrentSessionId(response.data[0]._id);
//           setConversation(response.data[0].conversation || []);
//         }
//       } catch (err) {
//         setError("Failed to load chat sessions: " + (err.response?.data?.error || err.message));
//         console.error("Fetch sessions error:", err);
//       }
//     };
//     fetchSessions();
//   }, [backendUrl, currentSessionId]);

//   // Auto-scroll to bottom
//   useEffect(() => {
//     scrollToBottom();
//   }, [conversation, isLoading]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // Handle sending a message
//   const handleSendMessage = async (event) => {
//     event.preventDefault();
//     if (!inputText.trim() || inputText.length > 500) {
//       setError("Message must be between 1 and 500 characters.");
//       return;
//     }

//     const userMessage = { role: "user", text: inputText };
//     const updatedConversation = [...conversation, userMessage];
//     setConversation(updatedConversation);
//     setInputText("");
//     setIsLoading(true);
//     setError(null);

//     try {
//       // Create new session if none exists
//       let sessionId = currentSessionId;
//       if (!sessionId) {
//         const newSession = {
//           name: `Query: ${inputText.slice(0, 20)}...`,
//           conversation: updatedConversation
//         };
//         const response = await axios.post(backendUrl, newSession);
//         sessionId = response.data._id;
//         setCurrentSessionId(sessionId);
//         setChatSessions((prev) => [response.data, ...prev]);
//       } else {
//         // Update session name for first message
//         if (updatedConversation.length === 1) {
//           await axios.put(`${backendUrl}/${sessionId}`, {
//             name: `Query: ${inputText.slice(0, 20)}...`,
//             conversation: updatedConversation
//           });
//           setChatSessions((prev) =>
//             prev.map((session) =>
//               session._id === sessionId
//                 ? { ...session, name: `Query: ${inputText.slice(0, 20)}...`, conversation: updatedConversation }
//                 : session
//             )
//           );
//         }
//       }

//       // Fetch Gemini response
//       const genAI = new GoogleGenerativeAI(apiKey);
//       const model = genAI.getGenerativeModel({ model: MODEL_NAME });
//       const result = await model.generateContent({
//         contents: [{ role: "user", parts: [{ text: userMessage.text }] }]
//       });
//       const aiResponse = result.response.text();
//       console.log("Gemini Response:", aiResponse); // Debug to check for "Login Successfully"
//       const newConversation = [...updatedConversation, { role: "model", text: aiResponse }];

//       // Update MongoDB
//       await axios.put(`${backendUrl}/${sessionId}`, {
//         conversation: newConversation
//       });
//       setChatSessions((prev) =>
//         prev.map((session) =>
//           session._id === sessionId
//             ? { ...session, conversation: newConversation }
//             : session
//         )
//       );

//       setConversation(newConversation);
//     } catch (error) {
//       console.error("Error processing message:", error);
//       console.log("Error Response:", error.response?.data); // Debug backend response
//       setError("Failed to get response: " + (error.response?.data?.error || error.message));
//       setConversation((prev) => [...prev, { role: "model", text: "Sorry, something went wrong!" }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Start a new chat session
//   const startNewChat = async () => {
//     try {
//       // Save current session if it exists
//       if (currentSessionId && conversation.length > 0) {
//         await axios.put(`${backendUrl}/${currentSessionId}`, {
//           conversation
//         });
//       }

//       // Create new session
//       const newSession = {
//         name: `Chat ${new Date().toLocaleString()}`,
//         conversation: []
//       };
//       const response = await axios.post(backendUrl, newSession);
//       setChatSessions((prev) => [response.data, ...prev]);
//       setCurrentSessionId(response.data._id);
//       setConversation([]);
//       setError(null);
//     } catch (err) {
//       setError("Failed to create new chat session: " + (err.response?.data?.error || err.message));
//       console.error("New chat error:", err);
//     }
//   };

//   // Load a past session
//   const loadSession = async (sessionId) => {
//     try {
//       const response = await axios.get(`${backendUrl}/${sessionId}`);
//       setCurrentSessionId(sessionId);
//       setConversation(response.data.conversation || []);
//       setError(null);
//     } catch (err) {
//       setError("Failed to load session: " + (err.response?.data?.error || err.message));
//       console.error("Load session error:", err);
//     }
//   };

//   // Delete a session
//   const deleteSession = async (sessionId) => {
//     try {
//       await axios.delete(`${backendUrl}/${sessionId}`);
//       setChatSessions((prev) => prev.filter((session) => session._id !== sessionId));
//       if (sessionId === currentSessionId) {
//         setCurrentSessionId(null);
//         setConversation([]);
//       }
//       setError(null);
//     } catch (err) {
//       setError("Failed to delete session: " + (err.response?.data?.error || err.message));
//       console.error("Delete session error:", err);
//     }
//   };

//   return (
//     <div className="flex h-screen bg-gray-900 font-inter text-white">
//       {/* Sidebar */}
//       <div className="w-80 bg-gray-800 p-6 shadow-2xl overflow-y-auto max-[500px]:w-full max-[500px]:absolute max-[500px]:z-20">
//         <div className="flex justify-between items-center mb-6">
//           <h3 className="text-xl font-semibold">Chat History</h3>
//           <button
//             onClick={startNewChat}
//             className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 flex items-center shadow-md transition-transform hover:scale-105"
//           >
//             <FaPlus className="mr-1" /> New Chat
//           </button>
//         </div>
//         {chatSessions.length === 0 && (
//           <p className="text-gray-400 text-sm">No chats yet. Start a new one!</p>
//         )}
//         {chatSessions.map((session) => (
//           <div
//             key={session._id}
//             className={`p-3 mb-3 rounded-xl flex justify-between items-center ${session._id === currentSessionId ? 'bg-gray-700' : 'hover:bg-gray-700'} transition-colors duration-200 cursor-pointer`}
//           >
//             <div
//               onClick={() => loadSession(session._id)}
//               className="flex-1"
//             >
//               <p className="text-sm font-medium truncate">{session.name}</p>
//               <p className="text-xs text-gray-400 truncate">
//                 {session.conversation[0]?.text?.slice(0, 20) || "Empty session"}...
//               </p>
//             </div>
//             <button
//               onClick={() => deleteSession(session._id)}
//               className="text-red-400 hover:text-red-300 text-xs font-medium"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Main Chat Area */}
//       <div className="flex-1 p-6 mx-auto bg-white rounded-2xl shadow-2xl relative text-gray-800 flex flex-col">
//         <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 max-[500px]:text-xl">
//           DeepChat AI
//         </h2>
//         <div className="flex-1 p-6 rounded-xl shadow-inner overflow-y-auto bg-gray-50 flex flex-col">
//           {error && (
//             <div className="text-red-500 text-center mb-4 text-sm font-medium">{error}</div>
//           )}
//           <div className="flex-1">
//             {conversation.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-6 max-[500px]:mb-4 animate-fade-in`}
//               >
//                 <div className={`flex items-start max-w-[70%] p-4 rounded-2xl shadow-md ${msg.role === "user" ? 'bg-gray-200' : 'bg-gray-100'}`}>
//                   <img
//                     src={msg.role === "user" ? "https://img.icons8.com/?size=100&id=108639&format=png&color=000000": "https://img.icons8.com/?size=100&id=7859&format=png&color=000000"}
//                     alt={msg.role === "user" ? "User Avatar" : "DeepChat Avatar"}
//                     className="w-8 h-8 mr-3 rounded-full max-[500px]:w-6 max-[500px]:h-6"
//                   />
//                   <div>
//                     <strong className="text-xs font-semibold text-gray-600">
//                       {msg.role === "user" ? "user" : "DeepChat:"}
//                     </strong>
//                     <p className="mt-1 text-sm">{msg.text}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             {isLoading && (
//               <div className="flex justify-start mb-6">
//                 <div className="max-w-[70%] p-4 rounded-2xl bg-gray-100 text-left flex items-center shadow-md">
//                   <img
//                     src="https://img.icons8.com/?size=100&id=108639&format=png&color=000000"
//                     alt="DeepChat Avatar"
//                     className="w-8 h-8 mr-3 rounded-full max-[500px]:w-6 max-[500px]:h-6"
//                   />
//                   <div>
//                     <strong className="text-xs font-semibold text-gray-600 mr-2">DeepChat:</strong>
//                     <ReactLoading type="spin" color="#000" height={20} width={20} />
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//           <div ref={messagesEndRef} />
//         </div>
//         <form
//           onSubmit={handleSendMessage}
//           className="flex justify-center mt-6 p-4 bg-white border border-gray-200 rounded-2xl shadow-lg max-[500px]:p-3"
//         >
//           <input
//             type="text"
//             placeholder="Enter a prompt... (e.g., 'What is React?')"
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//             className="flex-grow p-3 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-300 max-[500px]:p-2 text-sm text-gray-800"
//             disabled={isLoading}
//           />
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="p-3 bg-gray-700 text-white rounded-r-xl hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-300 max-[500px]:p-2"
//           >
//             {isLoading ? <BsPauseCircleFill className="w-5 h-5" /> : <FaArrowRight className="w-5 h-5" />}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PromptAndResponseApp;





// import React, { useState, useEffect, useRef } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import ReactLoading from 'react-loading';
// import { FaArrowRight, FaPlus } from "react-icons/fa";
// import { BsPauseCircleFill } from "react-icons/bs";
// import axios from 'axios';

// const PromptAndResponseApp = () => {
//   const dispatch = useDispatch();
//   const [inputText, setInputText] = useState("");
//   const [conversation, setConversation] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [chatSessions, setChatSessions] = useState([]);
//   const [currentSessionId, setCurrentSessionId] = useState(null);
//   const messagesEndRef = useRef(null);
//   const storedUsername = localStorage.getItem("name") || "User";

//   // Gemini API key from .env
//   const apiKey = "AIzaSyBSVdL0suOurQXR6CgAvNhLSaQFn1n3ogQ";
//   const MODEL_NAME = "gemini-1.5-pro";
//   const backendUrl =  API_BASE + "/api/aipromptchat";

//   "https://generativelanguage.googleapis.com/v1beta/models",

//   // Load chat sessions from MongoDB
//   useEffect(() => {
//     const fetchSessions = async () => {
//       try {
//         const response = await axios.get(backendUrl);
//         setChatSessions(response.data);
//         if (response.data.length > 0 && !currentSessionId) {
//           setCurrentSessionId(response.data[0]._id);
//           setConversation(response.data[0].conversation || []);
//         }
//       } catch (err) {
//         setError("Failed to load chat sessions: " + (err.response?.data?.error || err.message));
//         console.error("Fetch sessions error:", err);
//       }
//     };
//     fetchSessions();
//   }, [backendUrl, currentSessionId]);

//   // Auto-scroll to bottom
//   useEffect(() => {
//     scrollToBottom();
//   }, [conversation, isLoading]);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   // Handle sending a message
//   const handleSendMessage = async (event) => {
//     event.preventDefault();
//     if (!inputText.trim() || inputText.length > 500) {
//       setError("Message must be between 1 and 500 characters.");
//       return;
//     }

//     const userMessage = { role: "user", text: inputText };
//     const updatedConversation = [...conversation, userMessage];
//     setConversation(updatedConversation);
//     setInputText("");
//     setIsLoading(true);
//     setError(null);

//     try {
//       // Create new session if none exists
//       let sessionId = currentSessionId;
//       if (!sessionId) {
//         const newSession = {
//           name: `Query: ${inputText.slice(0, 20)}...`,
//           conversation: updatedConversation
//         };
//         const response = await axios.post(backendUrl, newSession);
//         sessionId = response.data._id;
//         setCurrentSessionId(sessionId);
//         setChatSessions((prev) => [response.data, ...prev]);
//       } else {
//         // Update session name for first message
//         if (updatedConversation.length === 1) {
//           await axios.put(`${backendUrl}/${sessionId}`, {
//             name: `Query: ${inputText.slice(0, 20)}...`,
//             conversation: updatedConversation
//           });
//           setChatSessions((prev) =>
//             prev.map((session) =>
//               session._id === sessionId
//                 ? { ...session, name: `Query: ${inputText.slice(0, 20)}...`, conversation: updatedConversation }
//                 : session
//             )
//           );
//         }
//       }

//       // Fetch Gemini response
//       const genAI = new GoogleGenerativeAI(apiKey);
//       const model = genAI.getGenerativeModel({ model: MODEL_NAME });
//       const result = await model.generateContent({
//         contents: [{ role: "user", parts: [{ text: userMessage.text }] }]
//       });
//       const aiResponse = result.response.text();
//       console.log("Gemini Response:", aiResponse); // Debug to check for "Login Successfully"
//       const newConversation = [...updatedConversation, { role: "model", text: aiResponse }];

//       // Update MongoDB
//       await axios.put(`${backendUrl}/${sessionId}`, {
//         conversation: newConversation
//       });
//       setChatSessions((prev) =>
//         prev.map((session) =>
//           session._id === sessionId
//             ? { ...session, conversation: newConversation }
//             : session
//         )
//       );

//       setConversation(newConversation);
//     } catch (error) {
//       console.error("Error processing message:", error);
//       console.log("Error Response:", error.response?.data); // Debug backend response
//       setError("Failed to get response: " + (error.response?.data?.error || error.message));
//       setConversation((prev) => [...prev, { role: "model", text: "Sorry, something went wrong!" }]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Start a new chat session
//   const startNewChat = async () => {
//     try {
//       // Save current session if it exists
//       if (currentSessionId && conversation.length > 0) {
//         await axios.put(`${backendUrl}/${currentSessionId}`, {
//           conversation
//         });
//       }

//       // Create new session
//       const newSession = {
//         name: `Chat ${new Date().toLocaleString()}`,
//         conversation: []
//       };
//       const response = await axios.post(backendUrl, newSession);
//       setChatSessions((prev) => [response.data, ...prev]);
//       setCurrentSessionId(response.data._id);
//       setConversation([]);
//       setError(null);
//     } catch (err) {
//       setError("Failed to create new chat session: " + (err.response?.data?.error || err.message));
//       console.error("New chat error:", err);
//     }
//   };

//   // Load a past session
//   const loadSession = async (sessionId) => {
//     try {
//       const response = await axios.get(`${backendUrl}/${sessionId}`);
//       setCurrentSessionId(sessionId);
//       setConversation(response.data.conversation || []);
//       setError(null);
//     } catch (err) {
//       setError("Failed to load session: " + (err.response?.data?.error || err.message));
//       console.error("Load session error:", err);
//     }
//   };

//   // Delete a session
//   const deleteSession = async (sessionId) => {
//     try {
//       await axios.delete(`${backendUrl}/${sessionId}`);
//       setChatSessions((prev) => prev.filter((session) => session._id !== sessionId));
//       if (sessionId === currentSessionId) {
//         setCurrentSessionId(null);
//         setConversation([]);
//       }
//       setError(null);
//     } catch (err) {
//       setError("Failed to delete session: " + (err.response?.data?.error || err.message));
//       console.error("Delete session error:", err);
//     }
//   };

//  return (
//   <div className="flex h-screen bg-gray-900 font-inter text-white pt-5">
//     {/* Sidebar */}
//     <div className="w-80 bg-gray-800 p-6 shadow-2xl overflow-y-auto max-[500px]:w-full max-[500px]:absolute max-[500px]:z-20">
//       <div className="flex justify-between items-center mb-6">
//         <h3 className="text-xl font-semibold">Chat History</h3>
//         <button
//           onClick={startNewChat}
//           className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 flex items-center shadow-md transition-transform hover:scale-105"
//         >
//           <FaPlus className="mr-1" /> New Chat
//         </button>
//       </div>
//       {chatSessions.length === 0 && (
//         <p className="text-gray-400 text-sm">No chats yet. Start a new one!</p>
//       )}
//       {chatSessions.map((session) => (
//         <div
//           key={session._id}
//           className={`p-3 mb-3 rounded-xl flex justify-between items-center ${session._id === currentSessionId ? 'bg-gray-700' : 'hover:bg-gray-700'} transition-colors duration-200 cursor-pointer`}
//         >
//           <div
//             onClick={() => loadSession(session._id)}
//             className="flex-1"
//           >
//             <p className="text-sm font-medium truncate">{session.name}</p>
//             <p className="text-xs text-gray-400 truncate">
//               {session.conversation[0]?.text?.slice(0, 20) || "Empty session"}...
//             </p>
//           </div>
//           <button
//             onClick={() => deleteSession(session._id)}
//             className="text-red-400 hover:text-red-300 text-xs font-medium"
//           >
//             Delete
//           </button>
//         </div>
//       ))}
//     </div>

//     {/* Main Chat Area */}
//     <div className="flex-1 p-6 mx-auto bg-white rounded-2xl shadow-2xl relative text-gray-800 flex flex-col">
//       <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 max-[500px]:text-xl">
//         DeepChat AI
//       </h2>
//       <div className="flex-1 p-6 rounded-xl shadow-inner overflow-y-auto bg-gray-50 flex flex-col">
//         {error && (
//           <div className="text-red-500 text-center mb-4 text-sm font-medium">{error}</div>
//         )}
//         <div className="flex-1">
//           {conversation.map((msg, index) => (
//             <div
//               key={index}
//               className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-6 max-[500px]:mb-4 animate-fade-in`}
//             >
//               <div className={`flex items-start max-w-[70%] p-4 rounded-2xl shadow-md ${msg.role === "user" ? 'bg-gray-200' : 'bg-gray-100'}`}>
//                 <img
//                     src={msg.role === "user" ? "https://img.icons8.com/?size=100&id=108639&format=png&color=000000": "https://img.icons8.com/?size=100&id=7859&format=png&color=000000"}
//                   alt={msg.role === "user" ? "User Avatar" : "DeepChat Avatar"}
//                   className="w-8 h-8 mr-3 rounded-full max-[500px]:w-6 max-[500px]:h-6"
//                 />
//                 <div>
//                   <strong className="text-xs font-semibold text-gray-600">
//                     {msg.role === "user" ? `user :` : "DeepChat:"}
//                   </strong>
//                   <div className="mt-1 text-sm">
//                     {msg.role === "model" ? (
//                       msg.text
//                         .split('*')
//                         .filter(segment => segment && segment.trim())
//                         .map((segment, i) => (
//                           <div key={i}>{segment.trim()}</div>
//                         ))
//                     ) : (
//                       <p>{msg.text}</p>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//           {isLoading && (
//             <div className="flex justify-start mb-6">
//               <div className="max-w-[70%] p-4 rounded-2xl bg-gray-100 text-left flex items-center shadow-md">
//                 <img
//                   src="https://img.icons8.com/?size=100&id=108639&format=png&color=000000"
//                   alt="DeepChat Avatar"
//                   className="w-8 h-8 mr-3 rounded-full max-[500px]:w-6 max-[500px]:h-6"
//                 />
//                 <div>
//                   <strong className="text-xs font-semibold text-gray-600 mr-2">DeepChat:</strong>
//                   <ReactLoading type="spin" color="#000" height={20} width={20} />
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//         <div ref={messagesEndRef} />
//       </div>
//       <form
//         onSubmit={handleSendMessage}
//         className="flex justify-center mt-6 p-4 bg-white border border-gray-200 rounded-2xl shadow-lg max-[500px]:p-3"
//       >
//         <input
//           type="text"
//           placeholder="Enter a prompt... (e.g., 'What is React?')"
//           value={inputText}
//           onChange={(e) => setInputText(e.target.value)}
//           className="flex-grow p-3 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-300 max-[500px]:p-2 text-sm text-gray-800"
//           disabled={isLoading}
//         />
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="p-3 bg-gray-700 text-white rounded-r-xl hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-300 max-[500px]:p-2"
//         >
//           {isLoading ? <BsPauseCircleFill className="w-5 h-5" /> : <FaArrowRight className="w-5 h-5" />}
//         </button>
//       </form>
//     </div>
//   </div>
// );
// };

// export default PromptAndResponseApp;


import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ReactLoading from 'react-loading';
import { FaArrowRight, FaPlus } from "react-icons/fa";
import { BsPauseCircleFill } from "react-icons/bs";
import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

const PromptAndResponseApp = () => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [chatSessions, setChatSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const messagesEndRef = useRef(null);
  const storedUsername = localStorage.getItem("name") || "User";

  // Gemini API key from .env
  const apiKey = "AIzaSyBSVdL0suOurQXR6CgAvNhLSaQFn1n3ogQ";
  const MODEL_NAME = "gemini-2.5-flash"; // Updated to stable model
  const backendUrl = API_BASE + "/api/aipromptchat";

  // Load chat sessions from MongoDB
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const response = await axios.get(backendUrl);
        setChatSessions(response.data);
        if (response.data.length > 0 && !currentSessionId) {
          setCurrentSessionId(response.data[0]._id);
          setConversation(response.data[0].conversation || []);
        }
      } catch (err) {
        setError("Failed to load chat sessions: " + (err.response?.data?.error || err.message));
        console.error("Fetch sessions error:", err);
      }
    };
    fetchSessions();
  }, [backendUrl, currentSessionId]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [conversation, isLoading]);

  // Debug: List available models on mount
  useEffect(() => {
    const listAvailableModels = async () => {
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const models = await genAI.getGenerativeModels();
        console.log("Available Models:", models.map(m => ({ name: m.name, supportedGenerationMethods: m.supportedGenerationMethods })));
      } catch (error) {
        console.error("Error listing models:", error);
      }
    };
    listAvailableModels();
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Handle sending a message
  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!inputText.trim() || inputText.length > 500) {
      setError("Message must be between 1 and 500 characters.");
      return;
    }

    const userMessage = { role: "user", text: inputText };
    const updatedConversation = [...conversation, userMessage];
    setConversation(updatedConversation);
    setInputText("");
    setIsLoading(true);
    setError(null);

    try {
      // Create new session if none exists
      let sessionId = currentSessionId;
      if (!sessionId) {
        const newSession = {
          name: `Query: ${inputText.slice(0, 20)}...`,
          conversation: updatedConversation
        };
        const response = await axios.post(backendUrl, newSession);
        sessionId = response.data._id;
        setCurrentSessionId(sessionId);
        setChatSessions((prev) => [response.data, ...prev]);
      } else {
        // Update session name for first message
        if (updatedConversation.length === 1) {
          await axios.put(`${backendUrl}/${sessionId}`, {
            name: `Query: ${inputText.slice(0, 20)}...`,
            conversation: updatedConversation
          });
          setChatSessions((prev) =>
            prev.map((session) =>
              session._id === sessionId
                ? { ...session, name: `Query: ${inputText.slice(0, 20)}...`, conversation: updatedConversation }
                : session
            )
          );
        }
      }

      // Fetch Gemini response
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: MODEL_NAME });
      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: userMessage.text }] }]
      });
      
      // Safer response extraction
      let aiResponse;
      if (result.response.text) {
        aiResponse = result.response.text();
      } else {
        aiResponse = result.response.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
      }
      
      console.log("Gemini Response:", aiResponse);
      const newConversation = [...updatedConversation, { role: "model", text: aiResponse }];

      // Update MongoDB
      await axios.put(`${backendUrl}/${sessionId}`, {
        conversation: newConversation
      });
      setChatSessions((prev) =>
        prev.map((session) =>
          session._id === sessionId
            ? { ...session, conversation: newConversation }
            : session
        )
      );

      setConversation(newConversation);
    } catch (error) {
      console.error("Error processing message:", error);
      console.log("Full Error Details:", JSON.stringify(error, null, 2));
      setError("Failed to get response: " + (error.response?.data?.error || error.message));
      setConversation((prev) => [...prev, { role: "model", text: "Sorry, something went wrong!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Start a new chat session
  const startNewChat = async () => {
    try {
      // Save current session if it exists
      if (currentSessionId && conversation.length > 0) {
        await axios.put(`${backendUrl}/${currentSessionId}`, {
          conversation
        });
      }

      // Create new session
      const newSession = {
        name: `Chat ${new Date().toLocaleString()}`,
        conversation: []
      };
      const response = await axios.post(backendUrl, newSession);
      setChatSessions((prev) => [response.data, ...prev]);
      setCurrentSessionId(response.data._id);
      setConversation([]);
      setError(null);
    } catch (err) {
      setError("Failed to create new chat session: " + (err.response?.data?.error || err.message));
      console.error("New chat error:", err);
    }
  };

  // Load a past session
  const loadSession = async (sessionId) => {
    try {
      const response = await axios.get(`${backendUrl}/${sessionId}`);
      setCurrentSessionId(sessionId);
      setConversation(response.data.conversation || []);
      setError(null);
    } catch (err) {
      setError("Failed to load session: " + (err.response?.data?.error || err.message));
      console.error("Load session error:", err);
    }
  };

  // Delete a session
  const deleteSession = async (sessionId) => {
    try {
      await axios.delete(`${backendUrl}/${sessionId}`);
      setChatSessions((prev) => prev.filter((session) => session._id !== sessionId));
      if (sessionId === currentSessionId) {
        setCurrentSessionId(null);
        setConversation([]);
      }
      setError(null);
    } catch (err) {
      setError("Failed to delete session: " + (err.response?.data?.error || err.message));
      console.error("Delete session error:", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 font-inter text-white pt-5">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 p-6 shadow-2xl overflow-y-auto max-[500px]:w-full max-[500px]:absolute max-[500px]:z-20">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Chat History</h3>
          <button
            onClick={startNewChat}
            className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 flex items-center shadow-md transition-transform hover:scale-105"
          >
            <FaPlus className="mr-1" /> New Chat
          </button>
        </div>
        {chatSessions.length === 0 && (
          <p className="text-gray-400 text-sm">No chats yet. Start a new one!</p>
        )}
        {chatSessions.map((session) => (
          <div
            key={session._id}
            className={`p-3 mb-3 rounded-xl flex justify-between items-center ${session._id === currentSessionId ? 'bg-gray-700' : 'hover:bg-gray-700'} transition-colors duration-200 cursor-pointer`}
          >
            <div
              onClick={() => loadSession(session._id)}
              className="flex-1"
            >
              <p className="text-sm font-medium truncate">{session.name}</p>
              <p className="text-xs text-gray-400 truncate">
                {session.conversation[0]?.text?.slice(0, 20) || "Empty session"}...
              </p>
            </div>
            <button
              onClick={() => deleteSession(session._id)}
              className="text-red-400 hover:text-red-300 text-xs font-medium"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 p-6 mx-auto bg-white rounded-2xl shadow-2xl relative text-gray-800 flex flex-col">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900 max-[500px]:text-xl">
          DeepChat AI
        </h2>
        <div className="flex-1 p-6 rounded-xl shadow-inner overflow-y-auto bg-gray-50 flex flex-col">
          {error && (
            <div className="text-red-500 text-center mb-4 text-sm font-medium">{error}</div>
          )}
          <div className="flex-1">
            {conversation.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-6 max-[500px]:mb-4 animate-fade-in`}
              >
                <div className={`flex items-start max-w-[70%] p-4 rounded-2xl shadow-md ${msg.role === "user" ? 'bg-gray-200' : 'bg-gray-100'}`}>
                  <img
                    src={msg.role === "user" ? "https://img.icons8.com/?size=100&id=108639&format=png&color=000000" : "https://img.icons8.com/?size=100&id=7859&format=png&color=000000"}
                    alt={msg.role === "user" ? "User Avatar" : "DeepChat Avatar"}
                    className="w-8 h-8 mr-3 rounded-full max-[500px]:w-6 max-[500px]:h-6"
                  />
                  <div>
                    <strong className="text-xs font-semibold text-gray-600">
                      {msg.role === "user" ? `user :` : "DeepChat:"}
                    </strong>
                    <div className="mt-1 text-sm">
                      {msg.role === "model" ? (
                        msg.text
                          .split('*')
                          .filter(segment => segment && segment.trim())
                          .map((segment, i) => (
                            <div key={i}>{segment.trim()}</div>
                          ))
                      ) : (
                        <p>{msg.text}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start mb-6">
                <div className="max-w-[70%] p-4 rounded-2xl bg-gray-100 text-left flex items-center shadow-md">
                  <img
                    src="https://img.icons8.com/?size=100&id=108639&format=png&color=000000"
                    alt="DeepChat Avatar"
                    className="w-8 h-8 mr-3 rounded-full max-[500px]:w-6 max-[500px]:h-6"
                  />
                  <div>
                    <strong className="text-xs font-semibold text-gray-600 mr-2">DeepChat:</strong>
                    <ReactLoading type="spin" color="#000" height={20} width={20} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div ref={messagesEndRef} />
        </div>
        <form
          onSubmit={handleSendMessage}
          className="flex justify-center mt-6 p-4 bg-white border border-gray-200 rounded-2xl shadow-lg max-[500px]:p-3"
        >
          <input
            type="text"
            placeholder="Enter a prompt... (e.g., 'What is React?')"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-grow p-3 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-300 max-[500px]:p-2 text-sm text-gray-800"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="p-3 bg-gray-700 text-white rounded-r-xl hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-colors duration-300 max-[500px]:p-2"
          >
            {isLoading ? <BsPauseCircleFill className="w-5 h-5" /> : <FaArrowRight className="w-5 h-5" />}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PromptAndResponseApp;
