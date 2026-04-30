// // Sidebar.jsx
// import React, { useEffect, useState, useRef } from "react";
// import ReactDOM from "react-dom";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   toggleAiChat,
//   toggleAnonymousChat,
//   toggleTrendChat,
//   toggleAddContactChat
// } from "../actions/chatAction";
// import { BsChatText } from "react-icons/bs";
// import { SiDeepgram } from "react-icons/si";
// import { FiSettings } from "react-icons/fi";
// import { PiChatCircleSlashFill } from "react-icons/pi";
// import { TfiStatsUp } from "react-icons/tfi";
// import { LuContact } from "react-icons/lu";
// import { useNavigate } from "react-router-dom";
// import UserDetails from "./UserDetails";

// const Sidebar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [showOptions, setShowOptions] = useState(false);
//   const optionsRef = useRef(null);
//   const logoutButtonRef = useRef(null);

//   const [activeMenu, setActiveMenu] = useState("chat");
//   const [accessMessage, setAccessMessage] = useState(""); // toast message

//   // read anonymous mode from localStorage
//   const [isAnonymousMode, setIsAnonymousMode] = useState(
//     localStorage.getItem("anonymous") === "true"
//   );

//   // keep redux flags (if used by chat area)
//   const isAiChatOpen = useSelector(state => state.chat.isAiChatOpen);
//   const isAnonymousChatOpen = useSelector(state => state.chat.isAnonymousChatOpen);
//   const isTrendChatOpen = useSelector(state => state.chat.isTrendChatOpen);

//   useEffect(() => {
//     // whenever localStorage changes elsewhere, you might want to sync
//     const onStorage = () => {
//       setIsAnonymousMode(localStorage.getItem("anonymous") === "true");
//     };
//     window.addEventListener("storage", onStorage);
//     return () => window.removeEventListener("storage", onStorage);
//   }, []);

//   useEffect(() => {
//     // fetch logged-in user if any (skip when anonymous mode)
//     const fetchLoggedUser = async () => {
//       const stored = localStorage.getItem("username");
//       if (!stored || localStorage.getItem("anonymous") === "true") {
//         setLoggedInUser(null);
//         return;
//       }
//       try {
//         const resp = await fetch(`http://localhost:5000/api/registerUser?username=${stored}`);
//         if (!resp.ok) throw new Error("Failed to fetch user");
//         const data = await resp.json();
//         setLoggedInUser(data.user);
//       } catch (err) {
//         console.error("Error fetching user:", err);
//         setLoggedInUser(null);
//       }
//     };
//     fetchLoggedUser();
//   }, []);

//   // helper: show the exact message required by you
//   const showAccessDenied = () => {
//     setAccessMessage("to acces this chat to get login");
//     setTimeout(() => setAccessMessage(""), 3000);
//   };

//   // Buttons: all visible, but if anonymous mode is ON, restrict access to only Anonymous Chat.
//   const handleChatButtonClick = () => {
//     if (isAnonymousMode) {
//       // normal chat is restricted in anonymous mode
//       showAccessDenied();
//       return;
//     }
//     navigate("/chat");
//     dispatch(toggleAiChat(false));
//     dispatch(toggleAnonymousChat(false));
//     dispatch(toggleTrendChat(false));
//     dispatch(toggleAddContactChat(false));
//     setActiveMenu("chat");
//   };

//   const handleAiButtonClick = () => {
//     if (isAnonymousMode) {
//       showAccessDenied();
//       return;
//     }
//     dispatch(toggleAiChat(true));
//     dispatch(toggleAnonymousChat(false));
//     dispatch(toggleTrendChat(false));
//     dispatch(toggleAddContactChat(false));
//     setActiveMenu("ai");
//     navigate("/chat");
//   };

//   const handleAnonymousButtonClick = () => {
//     // allowed in anonymous mode and for logged-in users too
//     // ensure anonymous flag is set if user came here intentionally
//     // (if logged-in user clicks it, we don't set anonymous flag)
//     dispatch(toggleAnonymousChat(true));
//     dispatch(toggleAiChat(false));
//     dispatch(toggleTrendChat(false));
//     dispatch(toggleAddContactChat(false));
//     setActiveMenu("anonymous");
//     navigate("/chat");
//   };

//   const handleTrendButtonClick = () => {
//     if (isAnonymousMode) {
//       showAccessDenied();
//       return;
//     }
//     dispatch(toggleTrendChat(true));
//     dispatch(toggleAiChat(false));
//     dispatch(toggleAnonymousChat(false));
//     dispatch(toggleAddContactChat(false));
//     setActiveMenu("trend");
//     navigate("/chat");
//   };

//   const handleAddContactButtonClick = () => {
//     if (isAnonymousMode) {
//       showAccessDenied();
//       return;
//     }
//     dispatch(toggleAddContactChat(true));
//     dispatch(toggleTrendChat(false));
//     dispatch(toggleAiChat(false));
//     dispatch(toggleAnonymousChat(false));
//     setActiveMenu("addcontact");
//     navigate("/chat");
//   };

//   const toggleDropdown = () => setShowOptions(prev => !prev);

//   const logOut = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     localStorage.removeItem("anonymous");
//     setIsAnonymousMode(false);
//     setShowOptions(false);
//     navigate("/login");
//   };

//   const handleClickOutside = (e) => {
//     if (optionsRef.current && !optionsRef.current.contains(e.target)) {
//       setShowOptions(false);
//     }
//   };

//   useEffect(() => {
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <>
//       <div className="w-full h-full flex flex-col bg-green-50 p-4 items-center">
//         {/* Chat (regular) - visible always */}
//         <div className="flex justify-start mb-6">
//           <button
//             onClick={handleChatButtonClick}
//             className={`p-2 rounded cursor-pointer hover:bg-green-500 ${activeMenu === "chat" ? "bg-green-600 text-white" : "bg-green-300 text-black"}`}
//             title="Chat (requires login in anonymous mode)"
//           >
//             <BsChatText size={20} />
//           </button>
//         </div>

//         {/* AI Chat - visible always */}
//         <div className="flex justify-start mb-6">
//           <button
//             onClick={handleAiButtonClick}
//             className={`p-2 rounded cursor-pointer hover:bg-green-500 ${activeMenu === "ai" ? "bg-green-600 text-white" : "bg-green-300 text-black"}`}
//             title="AI Chat (requires login in anonymous mode)"
//           >
//             <SiDeepgram size={20} />
//           </button>
//         </div>

//         {/* Anonymous Chat - visible always */}
//         <div className="flex justify-start mb-6">
//           <button
//             onClick={handleAnonymousButtonClick}
//             className={`p-2 rounded cursor-pointer hover:bg-green-500 ${activeMenu === "anonymous" ? "bg-green-600 text-white" : "bg-green-300 text-black"}`}
//             title="Anonymous Chat (allowed in anonymous mode)"
//           >
//             <PiChatCircleSlashFill size={20} />
//           </button>
//         </div>

//         {/* Trend - visible always */}
//         <div className="flex justify-start mb-6">
//           <button
//             onClick={handleTrendButtonClick}
//             className={`p-2 rounded cursor-pointer hover:bg-green-500 ${activeMenu === "trend" ? "bg-green-600 text-white" : "bg-green-300 text-black"}`}
//             title="Trends (requires login in anonymous mode)"
//           >
//             <TfiStatsUp size={20} />
//           </button>
//         </div>

//         {/* Add Contact - visible always */}
//         <div className="flex justify-start mb-6">
//           <button
//             onClick={handleAddContactButtonClick}
//             className={`p-2 rounded cursor-pointer hover:bg-green-500 ${activeMenu === "addcontact" ? "bg-green-600 text-white" : "bg-green-300 text-black"}`}
//             title="Add contact (requires login in anonymous mode)"
//           >
//             <LuContact size={20} />
//           </button>
//         </div>

//         {/* Profile block - only when logged-in */}
//         <div className="flex flex-col items-center justify-center mt-auto gap-5">
//           {loggedInUser ? (
//             <>
//               <div className="relative" ref={logoutButtonRef}>
//                 <div onClick={toggleDropdown} className="cursor-pointer mb-2">
//                   <FiSettings size={27} />
//                 </div>
//               </div>
//               <img
//                 src={loggedInUser.profilePicture ? `http://localhost:5000/${loggedInUser.profilePicture}` : "/default-profile.png"}
//                 alt="Profile"
//                 className="h-10 w-10 rounded-full mb-2 object-cover"
//               />
//             </>
//           ) : (
//             // If in anonymous mode, show small tag so user knows
//             isAnonymousMode && <div className="text-xs text-gray-600 mt-2">Anonymous mode</div>
//           )}
//         </div>
//       </div>

//       {/* dropdown portal */}
//       {showOptions &&
//         ReactDOM.createPortal(
//           <div ref={optionsRef} className="bg-white p-3 rounded shadow z-[9999] cursor-pointer" style={{ position: "absolute", right: 20, bottom: 80 }}>
//             <ul>
//               <li>
//                 <div onClick={logOut}>Log Out</div>
//               </li>
//             </ul>
//           </div>,
//           document.body
//         )}

//       <UserDetails user={loggedInUser} closeOverlayProfile={() => {}} />

//       {/* Access denied toast */}
//       {accessMessage && (
//         <div
//           style={{
//             position: "fixed",
//             bottom: 24,
//             left: "50%",
//             transform: "translateX(-50%)",
//             background: "#111827",
//             color: "white",
//             padding: "10px 16px",
//             borderRadius: 8,
//             zIndex: 99999,
//             boxShadow: "0 6px 18px rgba(0,0,0,0.2)"
//           }}
//         >
//           {accessMessage}
//         </div>
//       )}
//     </>
//   );
// };

// export default Sidebar;






//contine withou account


// Sidebar.jsx
// import React, { useEffect, useRef, useState } from "react";
// import ReactDOM from "react-dom";
// import { useDispatch } from "react-redux";
// import {
//   toggleAiChat,
//   toggleAnonymousChat,
//   toggleTrendChat,
//   toggleAddContactChat,
// } from "../actions/chatAction";
// import { BsChatText } from "react-icons/bs";
// import { SiDeepgram } from "react-icons/si";
// import { FiSettings } from "react-icons/fi";
// import { PiChatCircleSlashFill } from "react-icons/pi";
// import { TfiStatsUp } from "react-icons/tfi";
// import { LuContact } from "react-icons/lu";
// import { useNavigate } from "react-router-dom";
// import UserDetails from "./UserDetails";
// import { GrUserAdmin } from "react-icons/gr";

// const Sidebar = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [activeMenu, setActiveMenu] = useState("chat");
//   const [accessMessage, setAccessMessage] = useState("");
//   const [loggedInUser, setLoggedInUser] = useState(null);
//   const [showOptions, setShowOptions] = useState(false);
//   const optionsRef = useRef(null);

//   const computeAnonymous = () =>
//     !localStorage.getItem("token") && localStorage.getItem("anonymous") === "true";

//   const [isAnonymousMode, setIsAnonymousMode] = useState(computeAnonymous());

//   useEffect(() => {
//     const sync = () => setIsAnonymousMode(computeAnonymous());
//     window.addEventListener("authchange", sync);
//     window.addEventListener("storage", sync);
//     return () => {
//       window.removeEventListener("authchange", sync);
//       window.removeEventListener("storage", sync);
//     };
//   }, []);

//   useEffect(() => {
//     // fetch profile only when logged in
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setLoggedInUser(null);
//       return;
//     }
//     (async () => {
//       try {
//         const stored = localStorage.getItem("username");
//         if (!stored) return;
//         const resp = await fetch(`http://localhost:5000/api/registerUser?username=${stored}`);
//         if (resp.ok) {
//           const data = await resp.json();
//           setLoggedInUser(data.user);
//         } else {
//           setLoggedInUser(null);
//         }
//       } catch {
//         setLoggedInUser(null);
//       }
//     })();
//   }, [isAnonymousMode]);

//   const showAccessDenied = () => {
//     setAccessMessage("to acces this chat to get login");
//     setTimeout(() => setAccessMessage(""), 3000);
//   };

//   // Handlers
//   const handleChatButtonClick = () => {
//     if (isAnonymousMode) return showAccessDenied();
//     navigate("/chat");
//     dispatch(toggleAiChat(false));
//     dispatch(toggleAnonymousChat(false));
//     dispatch(toggleTrendChat(false));
//     dispatch(toggleAddContactChat(false));
//     setActiveMenu("chat");
//   };

//   const handleAiButtonClick = () => {
//     if (isAnonymousMode) return showAccessDenied();
//     dispatch(toggleAiChat(true));
//     dispatch(toggleAnonymousChat(false));
//     dispatch(toggleTrendChat(false));
//     dispatch(toggleAddContactChat(false));
//     setActiveMenu("ai");
//     navigate("/chat");
//   };

//   const handleAnonymousButtonClick = () => {
//     dispatch(toggleAnonymousChat(true));
//     dispatch(toggleAiChat(false));
//     dispatch(toggleTrendChat(false));
//     dispatch(toggleAddContactChat(false));
//     setActiveMenu("anonymous");
//     navigate("/chat");
//   };

//   const handleTrendButtonClick = () => {
//     if (isAnonymousMode) return showAccessDenied();
//     dispatch(toggleTrendChat(true));
//     dispatch(toggleAiChat(false));
//     dispatch(toggleAnonymousChat(false));
//     dispatch(toggleAddContactChat(false));
//     setActiveMenu("trend");
//     navigate("/chat");
//   };

//   const handleAddContactButtonClick = () => {
//     if (isAnonymousMode) return showAccessDenied();
//     dispatch(toggleAddContactChat(true));
//     dispatch(toggleTrendChat(false));
//     dispatch(toggleAiChat(false));
//     dispatch(toggleAnonymousChat(false));
//     setActiveMenu("addcontact");
//     navigate("/chat");
//   };

//   const handleOpenAdminButtonClick = () => {
//     if (isAnonymousMode) return showAccessDenied();
//     dispatch(toggleAddContactChat(false));
//     dispatch(toggleTrendChat(false));
//     dispatch(toggleAiChat(false));
//     dispatch(toggleAnonymousChat(false));
//     // setActiveMenu("addcontact");
//     navigate("/admin-dashboard");
//   };

//   const logOut = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("username");
//     localStorage.removeItem("role");
//     localStorage.removeItem("anonymous"); // optional: clear anon on logout
//     window.dispatchEvent(new Event("authchange"));
//     navigate("/login");
//   };

//   return (
//     <>
//       <div className="w-full h-full flex flex-col bg-green-50 p-4 items-center">
//         <div className="flex justify-start mb-6">
//           <button
//             onClick={handleChatButtonClick}
//             className={`p-2 rounded hover:bg-green-500 ${activeMenu === "chat" ? "bg-green-600 text-white" : "bg-green-300 text-black"}`}
//             title="Chat"
//           >
//             <BsChatText size={20} />
//           </button>
//         </div>

//         <div className="flex justify-start mb-6">
//           <button
//             onClick={handleAiButtonClick}
//             className={`p-2 rounded hover:bg-green-500 ${activeMenu === "ai" ? "bg-green-600 text-white" : "bg-green-300 text-black"}`}
//             title="AI Chat"
//           >
//             <SiDeepgram size={20} />
//           </button>
//         </div>

//         <div className="flex justify-start mb-6">
//           <button
//             onClick={handleAnonymousButtonClick}
//             className={`p-2 rounded hover:bg-green-500 ${activeMenu === "anonymous" ? "bg-green-600 text-white" : "bg-green-300 text-black"}`}
//             title="Anonymous Chat"
//           >
//             <PiChatCircleSlashFill size={20} />
//           </button>
//         </div>

//         <div className="flex justify-start mb-6">
//           <button
//             onClick={handleTrendButtonClick}
//             className={`p-2 rounded hover:bg-green-500 ${activeMenu === "trend" ? "bg-green-600 text-white" : "bg-green-300 text-black"}`}
//             title="Trends"
//           >
//             <TfiStatsUp size={20} />
//           </button>
//         </div>

//         <div className="flex justify-start mb-6">
//           <button
//             onClick={handleAddContactButtonClick}
//             className={`p-2 rounded hover:bg-green-500 ${activeMenu === "addcontact" ? "bg-green-600 text-white" : "bg-green-300 text-black"}`}
//             title="Add Contact"
//           >
//             <LuContact size={20} />
//           </button>
//         </div>

//         {
//           localStorage.getItem("role") === "admin" &&
//           <div className="flex justify-start mb-6">
//             <button
//               onClick={handleOpenAdminButtonClick}
//               className={`p-2 rounded hover:bg-green-500 ${activeMenu === "addcontact" ? "bg-green-600 text-white" : "bg-green-300 text-black"}`}
//               title="Admin"
//             >
//               <GrUserAdmin size={20} />
//             </button>
//           </div>
//         }

//         {/* Settings / logout */}
//         <div className="mt-auto">
//           <button onClick={logOut} className="text-sm text-gray-700 hover:underline flex items-center gap-2">
//             <FiSettings size={20}/> 
//           </button>
//         </div>
//       </div>

//       {/* Access denied toast */}
//       {accessMessage &&
//         ReactDOM.createPortal(
//           <div
//             style={{
//               position: "fixed",
//               bottom: 24,
//               left: "50%",
//               transform: "translateX(-50%)",
//               background: "#111827",
//               color: "white",
//               padding: "10px 16px",
//               borderRadius: 8,
//               zIndex: 99999,
//               boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
//               fontWeight: 600,
//             }}
//           >
//             {accessMessage}
//           </div>,
//           document.body
//         )}
//     </>
//   );
// };

// export default Sidebar;










import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleAiChat, toggleAnonymousChat, toggleTrendChat, toggleAddContactChat } from "../actions/chatAction";
import { BsThreeDotsVertical, BsChatText } from "react-icons/bs";
import { SiDeepgram } from "react-icons/si";
import { FiSettings } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import UserDetails from "./UserDetails";
import { PiChatCircleSlashFill } from "react-icons/pi";
import { TfiStatsUp } from "react-icons/tfi";
import { LuContact } from "react-icons/lu";
import { GrUserAdmin } from "react-icons/gr";

const Sidebar = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAiChatOpen = useSelector((state) => state.chat.isAiChatOpen);
  const isAnonymousChatOpen = useSelector((state) => state.chat.isAnonymousChatOpen);
  const isTrendChatOpen = useSelector((state) => state.chat.isTrendChatOpen);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserList, setShowUserList] = useState(true);
  const [dropdownStyle, setDropdownStyle] = useState({});
  const logoutButtonRef = useRef(null);
  // activeMenu state: "chat" or "ai", default is "chat"
  const [activeMenu, setActiveMenu] = useState("chat");

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const storedUsername = localStorage.getItem("username");
        const response = await fetch(
          `http://localhost:5000/api/registerUser?username=${storedUsername}`
        );
        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        setLoggedInUser(data.user);
      } catch (error) {
        console.error("Error fetching logged-in user:", error.message);
      }
    };
    fetchLoggedInUser();
  }, []);

  // When AI button is clicked: open AI chat and set active menu to "ai"
  const handleAiButtonClick = () => {
    dispatch(toggleAiChat(true));
    dispatch(toggleAnonymousChat(false));
    dispatch(toggleTrendChat(false));
    dispatch(toggleAddContactChat(false));
    setActiveMenu("ai");
  };

  // When chat button is clicked: close AI chat and set active menu to "chat"
  const handleChatButtonClick = () => {
    // Clear query parameters by navigating to the base "/chat" route
    navigate("/chat");
    dispatch(toggleAiChat(false));
    dispatch(toggleAnonymousChat(false));
    dispatch(toggleTrendChat(false));
    dispatch(toggleAddContactChat(false));
    setActiveMenu("chat");
  };

  // When chat button is clicked: close AI chat and set active menu to "chat"
  const handleAnonymousButtonClick = () => {
    // Clear query parameters by navigating to the base "/chat" route
    navigate("/chat");
    dispatch(toggleAnonymousChat(true));
    dispatch(toggleTrendChat(false));
    dispatch(toggleAiChat(false));
    dispatch(toggleAddContactChat(false));
    setActiveMenu("anonymous");
  };

  // When chat button is clicked: close AI chat and set active menu to "chat"
  const handleTrendButtonClick = () => {
    // Clear query parameters by navigating to the base "/chat" route
    navigate("/chat");
    dispatch(toggleTrendChat(true));
    dispatch(toggleAiChat(false));
    dispatch(toggleAnonymousChat(false));
    dispatch(toggleAddContactChat(false));
    setActiveMenu("trend");
  };

  // When chat button is clicked: close AI chat and set active menu to "chat"
  const handleAddContactButtonClick = () => {
    // Clear query parameters by navigating to the base "/chat" route
    navigate("/chat");
    dispatch(toggleAddContactChat(true));
    dispatch(toggleTrendChat(false));
    dispatch(toggleAiChat(false));
    dispatch(toggleAnonymousChat(false));
    setActiveMenu("addcontact");
  };

  const handleOpenAdminButtonClick = () => {
    dispatch(toggleAddContactChat(false));
    dispatch(toggleTrendChat(false));
    dispatch(toggleAiChat(false));
    dispatch(toggleAnonymousChat(false));
    setActiveMenu("admindashboard");
    navigate("/admin-dashboard");
  };

  const handleProfileImageClick = () => {
    setSelectedUser(loggedInUser);
    setShowUserList(!showUserList);
  };

  const toggleDropdown = () => {
    // Toggle the dropdown and compute its absolute position relative to the three dots button
    setShowOptions((prev) => {
      if (!prev && logoutButtonRef.current) {
        const rect = logoutButtonRef.current.getBoundingClientRect();
        setDropdownStyle({
          position: "absolute",
          top: rect.top,
          left: rect.right + 10, // 10px gap from the three dots button
        });
      }
      return !prev;
    });
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setShowOptions(false);
    navigate("/");
  };

  const handleClickOutside = (e) => {
    if (optionsRef.current && !optionsRef.current.contains(e.target)) {
      setShowOptions(false);
    }
  };

  const closeOverlayProfile = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="w-full h-full flex flex-col bg-green-50 p-4 items-center">
        {/* Chat button - active when activeMenu is "chat" */}
        <div className="flex justify-start mb-8">
          {loggedInUser && (
            <button
              onClick={handleChatButtonClick}
              className={`p-2 rounded cursor-pointer hover:bg-green-500 ${activeMenu === "chat" ? "bg-green-600 text-white" : "bg-green-300 text-black"
                }`}
              title="Chat"
            >
              <BsChatText size={20} />
            </button>
          )}
        </div>
        {/* AI button - active when activeMenu is "ai" */}
        <div className="flex justify-start">
          {loggedInUser && (
            <button
              onClick={handleAiButtonClick}
              className={`p-2 rounded mb-8 cursor-pointer hover:bg-green-500 ${activeMenu === "ai" ? "bg-green-600 text-white" : "bg-green-300 text-black"
                }`}
              title="AI Chat"
            >
              {<SiDeepgram size={20} />}
              {/* {isAiChatOpen ? <IoCloseOutline size={20} /> : <SiDeepgram size={20} />} */}
            </button>
          )}
        </div>
        {/* when activeMenu is "anonymous" */}
        <div className="flex justify-start">
          {loggedInUser && (
            <button
              onClick={handleAnonymousButtonClick}
              className={`p-2 rounded mb-8 cursor-pointer hover:bg-green-500 ${activeMenu === "anonymous" ? "bg-green-600 text-white" : "bg-green-300 text-black"
                }`}
              title="Private Chat"
            >
              {<PiChatCircleSlashFill size={20} />}
              {/* {isAiChatOpen ? <IoCloseOutline size={20} /> : <SiDeepgram size={20} />} */}
            </button>
          )}

        </div>
        {/*when activeMenu is "trend" */}
        <div className="flex justify-start">
          {loggedInUser && (
            <button
              onClick={handleTrendButtonClick}
              className={`p-2 rounded mb-8 cursor-pointer hover:bg-green-500 ${activeMenu === "trend" ? "bg-green-600 text-white" : "bg-green-300 text-black"
                }`}
              title="Trends"
            >
              {<TfiStatsUp size={20} />}
              {/* {isAiChatOpen ? <IoCloseOutline size={20} /> : <SiDeepgram size={20} />} */}
            </button>
          )}

        </div>

        {/*when add  is contact */}
        <div className="flex justify-start">
          {loggedInUser && (
            <button
              onClick={handleAddContactButtonClick}
              className={`p-2 rounded mb-8 cursor-pointer hover:bg-green-500 ${activeMenu === "addcontact" ? "bg-green-600 text-white" : "bg-green-300 text-black"
                }`}
              title="Add Contact"
            >
              {<LuContact size={20} />}
              {/* {isAiChatOpen ? <IoCloseOutline size={20} /> : <SiDeepgram size={20} />} */}
            </button>
          )}

        </div>

        <div className="flex justify-start">
          {
            loggedInUser && localStorage.getItem("role") === "admin" &&
            <button
              onClick={handleOpenAdminButtonClick}
              className={`p-2 rounded mb-8 cursor-pointer hover:bg-green-500 ${activeMenu === "admindashboard" ? "bg-green-600 text-white" : "bg-green-300 text-black"}`}
              title="Admin"
            >
              <GrUserAdmin size={20} />
            </button>
          }
        </div>

        {/* User profile and logout section */}
        <div className="flex flex-col items-center justify-center mt-auto gap-5">
          {loggedInUser && (
            <>
              <div className="relative" ref={logoutButtonRef}>
                <div
                  id="logout"
                  onClick={toggleDropdown}
                  className="cursor-pointer mb-2"
                  title="Setting"
                >
                  <FiSettings size={27} />
                  {/* <BsThreeDotsVertical size={20} /> */}
                </div>
              </div>
              <img
                onClick={handleProfileImageClick}
                src={`http://localhost:5000/${loggedInUser.profilePicture}`}
                alt="Profile"
                className="h-10 w-10 rounded-full mb-2 cursor-pointer object-cover"
                title="Profile"
              />
            </>
          )}
        </div>
      </div>
      {showOptions &&
        ReactDOM.createPortal(
          <div
            ref={optionsRef}
            style={dropdownStyle}
            className="bg-white p-3 rounded shadow z-[9999] cursor-pointer"
          >
            <ul>
              <li>
                <div onClick={logOut}>Log Out</div>
              </li>
            </ul>
          </div>,
          document.body
        )}
      <UserDetails
        user={selectedUser}
        closeOverlayProfile={closeOverlayProfile}
      />
    </>
  );
};

export default Sidebar;
