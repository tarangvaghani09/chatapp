// import React, { useState } from "react";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Register from "./components/Register";
// import Login from "./components/Login";
// import ChatApp from "./components/ChatApp";
// import PromptAndResponseApp from "./components/PromptAndResponseApp";
// import { Provider } from "react-redux";
// import store from "./store";
// import ProtectedRoute from "./components/ProtectedRoute";
// import LandingPage from "./components/LandingPage";
// import AdminDashboard from "./components/AdminDashboard";
// // import "./App.css";

// function App() {
//   const [isAiChatOpen, setIsAiChatOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);

//   return (
//     <Provider store={store}>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/register" element={<Register />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/admin-dashboard" element={<AdminDashboard />} />

//           {/* Protected Chat Route */}
//           <Route
//             path="/chat"
//             element={
//               <ProtectedRoute
//                 element={
//                   <ChatApp
//                     isAiChatOpen={isAiChatOpen}
//                     setIsAiChatOpen={setIsAiChatOpen}
//                     setSelectedUser={setSelectedUser}
//                   />
//                 }
//               />
//             }
//           />

//           {/* AI Chat Page */}
//           <Route
//             path="/ask"
//             element={<PromptAndResponseApp user={selectedUser} />}
//           />
//         </Routes>
//       </BrowserRouter>
//     </Provider>
//   );
// }

// export default App;











import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import ChatApp from "./components/ChatApp";
import { Provider } from "react-redux";
import store from "./store";
import ProtectedRoute from "./components/ProtectedRoute";
import LandingPage from "./components/LandingPage";
import AdminDashboard from "./components/AdminDashboard";
// import "./App.css";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<LandingPage />} />

          {/* Admin route protected with role check */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute requiredRole="admin" element={<AdminDashboard />} />
            }
          />

          {/* Protected chat routes */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute
                element={<ChatApp />}
              />
            }
          />
          <Route
            path="/aichat"
            element={
              <ProtectedRoute
                element={<ChatApp />}
              />
            }
          />
          <Route
            path="/privatechat"
            element={
              <ProtectedRoute
                element={<ChatApp />}
              />
            }
          />
          <Route
            path="/newcontact"
            element={
              <ProtectedRoute
                element={<ChatApp />}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
