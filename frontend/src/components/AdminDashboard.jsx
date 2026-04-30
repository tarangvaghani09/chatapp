// import React, { useEffect, useState } from "react";
// import { Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend
// } from "chart.js";

// // Register Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

// function AdminDashboard() {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalMessages: 0,
//     newUsersLast30Days: 0,
//     activeUsers: 0,
//   });

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await fetch("http://localhost:5000/api/admin-dashboard", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (!res.ok) throw new Error("Failed to fetch stats");
//         const data = await res.json();
//         setStats(data);
//       } catch (err) {
//         console.error(err.message);
//       }
//     };
//     fetchStats();
//   }, []);

//   // Pie chart data
//   const data = {
//     labels: ["Total Users", "Messages Sent", "New Users (30d)", "Active Users"],
//     datasets: [
//       {
//         label: "Admin Stats",
//         data: [
//           stats.totalUsers,
//           stats.totalMessages,
//           stats.newUsersLast30Days,
//           stats.activeUsers,
//         ],
//         backgroundColor: ["#4f46e5", "#10b981", "#8b5cf6", "#ef4444"],
//         borderColor: ["#ffffff", "#ffffff", "#ffffff", "#ffffff"],
//         borderWidth: 2,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "bottom",
//       },
//       tooltip: {
//         enabled: true,
//       },
//     },
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-900 text-white p-6">
//         <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
//         <nav className="space-y-3">
//           <a href="/admin-dashboard" className="block hover:text-gray-300">
//             Dashboard
//           </a>
//           <a href="/chat" className="block hover:text-gray-300">
//             Chat
//           </a>
//           <a href="/register" className="block hover:text-gray-300">
//             Add User
//           </a>
//           <a href="#charts" className="block hover:text-gray-300 mt-4">
//             Charts
//           </a>
//         </nav>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 p-8">
//         <h1 className="text-3xl font-semibold mb-8">Admin Dashboard</h1>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
//           <div className="bg-white shadow rounded-lg p-6">
//             <h3 className="text-lg font-medium text-gray-700">Total Users</h3>
//             <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
//           </div>

//           <div className="bg-white shadow rounded-lg p-6">
//             <h3 className="text-lg font-medium text-gray-700">Messages Sent</h3>
//             <p className="text-2xl font-bold text-green-600">{stats.totalMessages}</p>
//           </div>

//           <div className="bg-white shadow rounded-lg p-6">
//             <h3 className="text-lg font-medium text-gray-700">
//               New Users (Last 30 Days)
//             </h3>
//             <p className="text-2xl font-bold text-purple-600">{stats.newUsersLast30Days}</p>
//           </div>

//           <div className="bg-white shadow rounded-lg p-6">
//             <h3 className="text-lg font-medium text-gray-700">Active Users</h3>
//             <p className="text-2xl font-bold text-red-600">{stats.activeUsers}</p>
//           </div>
//         </div>

//         {/* Pie Chart Section */}
//         <section id="charts">
//           <h2 className="text-2xl font-semibold mb-6">Stats Pie Chart</h2>
//           <div className="bg-white shadow rounded-lg p-6">
//             <Pie data={data} options={options} />
//           </div>
//         </section>
//       </main>
//     </div>
//   );
// }

// export default AdminDashboard;










// import React, { useEffect, useState } from "react";
// import { Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend
// } from "chart.js";

// ChartJS.register(ArcElement, Tooltip, Legend);

// function AdminDashboard() {
//   const [stats, setStats] = useState({
//     totalUsers: 0,
//     totalMessages: 0,
//     newUsersLast30Days: 0,
//     activeUsers: 0,
//   });

//   const [activeTab, setActiveTab] = useState("dashboard"); // track active tab

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const res = await fetch("http://localhost:5000/api/admin-dashboard", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         if (!res.ok) throw new Error("Failed to fetch stats");
//         const data = await res.json();
//         setStats(data);
//       } catch (err) {
//         console.error(err.message);
//       }
//     };
//     fetchStats();
//   }, []);

//   const data = {
//     labels: ["Total Users", "Messages Sent", "New Users (30d)", "Active Users"],
//     datasets: [
//       {
//         label: "Admin Stats",
//         data: [
//           stats.totalUsers,
//           stats.totalMessages,
//           stats.newUsersLast30Days,
//           stats.activeUsers,
//         ],
//         backgroundColor: ["#4f46e5", "#10b981", "#8b5cf6", "#ef4444"],
//         borderColor: ["#ffffff", "#ffffff", "#ffffff", "#ffffff"],
//         borderWidth: 2,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: { position: "bottom" },
//       tooltip: { enabled: true },
//     },
//   };

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-gray-900 text-white p-6">
//         <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
//         <nav className="space-y-3">
//           <button
//             className="block w-full text-left hover:text-gray-300"
//             onClick={() => setActiveTab("dashboard")}
//           >
//             Dashboard
//           </button>
//           <button
//             className="block w-full text-left hover:text-gray-300"
//             onClick={() => setActiveTab("charts")}
//           >
//             Charts
//           </button>
//           <button
//             className="block w-full text-left hover:text-gray-300"
//             onClick={() => setActiveTab("chat")}
//           >
//             Chat
//           </button>
//           <button
//             className="block w-full text-left hover:text-gray-300"
//             onClick={() => setActiveTab("register")}
//           >
//             Add User
//           </button>
//         </nav>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 p-8">
//         {activeTab === "dashboard" && (
//           <>
//             <h1 className="text-3xl font-semibold mb-8">Admin Dashboard</h1>

//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
//               <div className="bg-white shadow rounded-lg p-6">
//                 <h3 className="text-lg font-medium text-gray-700">Total Users</h3>
//                 <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
//               </div>

//               <div className="bg-white shadow rounded-lg p-6">
//                 <h3 className="text-lg font-medium text-gray-700">Messages Sent</h3>
//                 <p className="text-2xl font-bold text-green-600">{stats.totalMessages}</p>
//               </div>

//               <div className="bg-white shadow rounded-lg p-6">
//                 <h3 className="text-lg font-medium text-gray-700">
//                   New Users (Last 30 Days)
//                 </h3>
//                 <p className="text-2xl font-bold text-purple-600">{stats.newUsersLast30Days}</p>
//               </div>

//               <div className="bg-white shadow rounded-lg p-6">
//                 <h3 className="text-lg font-medium text-gray-700">Active Users</h3>
//                 <p className="text-2xl font-bold text-red-600">{stats.activeUsers}</p>
//               </div>
//             </div>
//           </>
//         )}

//         {activeTab === "charts" && (
//           <>
//             <h1 className="text-3xl font-semibold mb-8">Stats Pie Chart</h1>
//             <div className="bg-white shadow rounded-lg p-6 w-full max-w-md">
//               <Pie data={data} options={options} />
//             </div>
//           </>
//         )}

//         {activeTab === "chat" && <h1 className="text-3xl">Chat Section</h1>}
//         {activeTab === "register" && <h1 className="text-3xl">Register User Section</h1>}
//       </main>
//     </div>
//   );
// }

// export default AdminDashboard;



//all access admin 


// AdminDashboard.jsx
// import React, { useEffect, useState } from "react";
// import { Pie } from "react-chartjs-2";
// import { FaChartPie, FaUsers, FaCommentDots, FaUserPlus, FaTable } from "react-icons/fa";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { useNavigate } from "react-router-dom";

// ChartJS.register(ArcElement, Tooltip, Legend);

// function AdminDashboard() {
//     const [stats, setStats] = useState({
//         totalUsers: 0,
//         totalMessages: 0,
//         newUsersLast30Days: 0,
//         activeUsers: 0,
//         loginUsers: 0,
//     });
//     const [activeTab, setActiveTab] = useState("dashboard");
//     const [loading, setLoading] = useState(true);
//     const [users, setUsers] = useState([]);
//     const token = localStorage.getItem("token");

//     const navigate = useNavigate();

//     // Fetch dashboard stats
//     useEffect(() => {
//         if (activeTab === "dashboard" || activeTab === "charts") {
//             const fetchStats = async () => {
//                 try {
//                     setLoading(true);
//                     const res = await fetch("http://localhost:5000/api/admin-dashboard", {
//                         headers: { Authorization: `Bearer ${token}` },
//                     });
//                     if (!res.ok) throw new Error("Failed to fetch stats");
//                     const data = await res.json();
//                     setStats(data);
//                     setLoading(false);
//                 } catch (err) {
//                     console.error(err.message);
//                     setLoading(false);
//                 }
//             };
//             fetchStats();
//         }
//     }, [activeTab, token]);

//     // Fetch users when Users tab is active
//     useEffect(() => {
//         if (activeTab === "users") {
//             const fetchUsers = async () => {
//                 try {
//                     const res = await fetch("http://localhost:5000/api/allUsers", {
//                         headers: { Authorization: `Bearer ${token}` },
//                     });
//                     if (!res.ok) throw new Error("Failed to fetch users");
//                     const data = await res.json();
//                     setUsers(data.users);
//                 } catch (err) {
//                     console.error(err.message);
//                 }
//             };
//             fetchUsers();
//         }
//     }, [activeTab, token]);

//     const pieData = {
//         labels: ["Total Users", "Messages Sent", "New Users (30 Days)", "Active Users", "Login Users (30 Days)"],
//         datasets: [
//             {
//                 label: "Stats",
//                 data: [stats.totalUsers, stats.totalMessages, stats.newUsersLast30Days, stats.activeUsers, stats.loginUsers],
//                 backgroundColor: ["#3B82F6", "#10B981", "#8B5CF6", "#EF4444"],
//                 borderColor: ["#fff", "#fff", "#fff", "#fff"],
//                 borderWidth: 2,
//             },
//         ],
//     };


//     const handleRemoveUser = async (userId) => {
//         const confirmDelete = window.confirm("Are you sure you want to remove this user?");
//         if (!confirmDelete) return;

//         try {
//             const res = await fetch(`http://localhost:5000/api/deleteUser/${userId}`, {
//                 method: "DELETE",
//                 headers: { Authorization: `Bearer ${token}` },
//             });
//             if (!res.ok) throw new Error("Failed to delete user");

//             // Update the local users state
//             setUsers(users.filter(user => user._id !== userId));
//             alert("User removed successfully!");
//         } catch (err) {
//             console.error(err.message);
//             alert("Error removing user");
//         }
//     };


//     return (
//         <div className="flex min-h-screen bg-gray-100">
//             {/* Sidebar */}
//             <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col">
//                 <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
//                 <nav className="space-y-3 flex-1">
//                     <button
//                         className={`flex items-center w-full p-2 rounded hover:bg-gray-800 ${activeTab === "dashboard" ? "bg-gray-800" : ""
//                             }`}
//                         onClick={() => setActiveTab("dashboard")}
//                     >
//                         <FaUsers className="mr-2" /> Dashboard
//                     </button>
//                     <button
//                         className={`flex items-center w-full p-2 rounded hover:bg-gray-800 ${activeTab === "chat" ? "bg-gray-800" : ""
//                             }`}
//                         // onClick={() => setActiveTab("chat")}
//                         onClick={() => navigate("/chat")}
//                     >
//                         <FaCommentDots className="mr-2" /> Chat
//                     </button>
//                     <button
//                         className={`flex items-center w-full p-2 rounded hover:bg-gray-800 ${activeTab === "addUser" ? "bg-gray-800" : ""
//                             }`}
//                         // onClick={() => setActiveTab("addUser")}
//                         onClick={() => navigate("/register")}
//                     >
//                         <FaUserPlus className="mr-2" /> Add User
//                     </button>
//                     <button
//                         className={`flex items-center w-full p-2 rounded hover:bg-gray-800 ${activeTab === "charts" ? "bg-gray-800" : ""
//                             }`}
//                         onClick={() => setActiveTab("charts")}
//                     >
//                         <FaChartPie className="mr-2" /> Charts
//                     </button>
//                     <button
//                         className={`flex items-center w-full p-2 rounded hover:bg-gray-800 ${activeTab === "users" ? "bg-gray-800" : ""
//                             }`}
//                         onClick={() => setActiveTab("users")}
//                     >
//                         <FaTable className="mr-2" /> Users
//                     </button>
//                 </nav>
//             </aside>

//             {/* Main content */}
//             <main className="flex-1 p-8">
//                 <h1 className="text-3xl font-semibold mb-8">
//                     {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//                 </h1>

//                 {loading ? (
//                     <div className="text-center text-gray-500">Loading stats...</div>
//                 ) : (
//                     <>
//                         {activeTab === "dashboard" && (
//                             <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
//                                 <div className="bg-white shadow rounded-lg p-4 text-center">
//                                     <h3 className="text-lg font-medium text-gray-700">Total Users</h3>
//                                     <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
//                                 </div>
//                                 <div className="bg-white shadow rounded-lg p-4 text-center">
//                                     <h3 className="text-lg font-medium text-gray-700">Messages Sent</h3>
//                                     <p className="text-2xl font-bold text-green-600">{stats.totalMessages}</p>
//                                 </div>
//                                 <div className="bg-white shadow rounded-lg p-4 text-center">
//                                     <h3 className="text-lg font-medium text-gray-700">New Users (30 Days)</h3>
//                                     <p className="text-2xl font-bold text-purple-600">{stats.newUsersLast30Days}</p>
//                                 </div>
//                                 <div className="bg-white shadow rounded-lg p-4 text-center">
//                                     <h3 className="text-lg font-medium text-gray-700">Active Users</h3>
//                                     <p className="text-2xl font-bold text-red-600">{stats.activeUsers}</p>
//                                 </div>
//                                 <div className="bg-white shadow rounded-lg p-4 text-center">
//                                     <h3 className="text-lg font-medium text-gray-700">Login Users (30 Days)</h3>
//                                     <p className="text-2xl font-bold text-red-600">{stats.loginUsers}</p>
//                                 </div>
//                             </div>
//                         )}

//                         {activeTab === "charts" && (
//                             <div className="max-w-md mx-auto bg-white p-4 shadow rounded">
//                                 <Pie
//                                     data={pieData}
//                                     options={{ responsive: true, plugins: { legend: { position: "bottom" } } }}
//                                 />
//                             </div>
//                         )}

//                         {activeTab === "users" && (
//                             <div className="overflow-x-auto">
//                                 <table className="min-w-full border border-gray-300 bg-white rounded-lg">
//                                     <thead className="bg-gray-200">
//                                         <tr>
//                                             <th className="px-4 py-2 border-b">#</th>
//                                             <th className="px-4 py-2 border-b">Username</th>
//                                             <th className="px-4 py-2 border-b">Phone</th>
//                                             <th className="px-4 py-2 border-b">Profile Picture</th>
//                                             <th className="px-4 py-2 border-b">Role</th>
//                                             <th className="px-4 py-2 border-b">Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {users.map((user, index) => (
//                                             <tr key={user._id} className="text-center border-b hover:bg-gray-50">
//                                                 <td className="px-4 py-2">{index + 1}</td>
//                                                 <td className="px-4 py-2">{user.username}</td>
//                                                 <td className="px-4 py-2">{user.phone}</td>
//                                                 <td className="px-4 py-2">
//                                                     <img
//                                                         src={`http://localhost:5000/${user.profilePicture}`}
//                                                         alt={user.username}
//                                                         className="w-10 h-10 rounded-full mx-auto object-cover"
//                                                     />
//                                                 </td>
//                                                 <td className="px-4 py-2 capitalize">{user.role}</td>
//                                                 <td className="px-4 py-2">
//                                                     <button
//                                                         className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                                                         onClick={() => handleRemoveUser(user._id)}
//                                                     >
//                                                         Remove
//                                                     </button>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         )}
//                     </>
//                 )}
//             </main>
//         </div>
//     );
// }

// export default AdminDashboard;








//without stasus user detail 




// import React, { useEffect, useState } from "react";
// import { Pie } from "react-chartjs-2";
// import { FaChartPie, FaUsers, FaCommentDots, FaUserPlus, FaTable } from "react-icons/fa";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
// import { useNavigate } from "react-router-dom";

// ChartJS.register(ArcElement, Tooltip, Legend);

// function AdminDashboard() {
//     const [stats, setStats] = useState({
//         totalUsers: 0,
//         totalMessages: 0,
//         newUsersLast30Days: 0,
//         activeUsers: 0,
//         loginUsers: 0,
//     });
//     const [activeTab, setActiveTab] = useState("dashboard");
//     const [loading, setLoading] = useState(true);
//     const [users, setUsers] = useState([]);
//     const token = localStorage.getItem("token");

//     const [query, setQuery] = useState("");

//     const navigate = useNavigate();

//     // Small helper: common fetch options
//     const authHeaders = () => {
//         const headers = { "Content-Type": "application/json" };
//         if (token) headers.Authorization = `Bearer ${token}`;
//         return headers;
//     };

//     // handle unauthorized/forbidden centrally
//     const handleAuthError = async (res) => {
//         if (res.status === 401) {
//             alert("Session expired. Please login again.");
//             localStorage.removeItem("token");
//             localStorage.removeItem("username");
//             navigate("/login");
//             return true;
//         }
//         if (res.status === 403) {
//             alert("You are not authorized to view this page.");
//             navigate("/");
//             return true;
//         }
//         return false;
//     };

//     // Fetch dashboard stats
//     useEffect(() => {
//         if (activeTab === "dashboard" || activeTab === "charts") {
//             const fetchStats = async () => {
//                 setLoading(true);
//                 try {
//                     const res = await fetch("http://localhost:5000/api/admin-dashboard", {
//                         headers: authHeaders(),
//                     });

//                     if (await handleAuthError(res)) {
//                         setLoading(false);
//                         return;
//                     }

//                     if (!res.ok) throw new Error("Failed to fetch stats");

//                     const data = await res.json();
//                     setStats({
//                         totalUsers: data.totalUsers ?? 0,
//                         totalMessages: data.totalMessages ?? 0,
//                         newUsersLast30Days: data.newUsersLast30Days ?? 0,
//                         activeUsers: data.activeUsers ?? 0,
//                         loginUsers: data.loginUsers ?? 0,
//                     });
//                 } catch (err) {
//                     console.error("fetchStats error:", err.message || err);
//                 } finally {
//                     setLoading(false);
//                 }
//             };
//             fetchStats();
//         }
//     }, [activeTab, token, navigate]);

//     // Fetch users when Users tab is active
//     useEffect(() => {
//         if (activeTab === "users") {
//             const fetchUsers = async () => {
//                 try {
//                     const res = await fetch("http://localhost:5000/api/allUsers", {
//                         headers: authHeaders(),
//                     });

//                     if (await handleAuthError(res)) {
//                         setUsers([]);
//                         return;
//                     }

//                     if (!res.ok) throw new Error("Failed to fetch users");
//                     const data = await res.json();
//                     setUsers(Array.isArray(data.users) ? data.users : []);
//                 } catch (err) {
//                     console.error("fetchUsers error:", err.message || err);
//                     setUsers([]);
//                 }
//             };
//             fetchUsers();
//         }
//     }, [activeTab, token, navigate]);

//     const pieData = {
//         labels: ["Total Users", "Messages Sent", "New Users (30 Days)", "Total Distinct Login Users (30 Days)", "Total Login Users (30 Days)"],
//         datasets: [
//             {
//                 label: "Stats",
//                 data: [stats.totalUsers, stats.totalMessages, stats.newUsersLast30Days, stats.activeUsers, stats.loginUsers],
//                 backgroundColor: ["#3B82F6", "#10B981", "#8B5CF6", "#EF4444", "#F59E0B"],
//                 borderColor: ["#fff", "#fff", "#fff", "#fff", "#fff"],
//                 borderWidth: 2,
//             },
//         ],
//     };

//     const handleRemoveUser = async (userId) => {
//         const confirmDelete = window.confirm("Are you sure you want to remove this user?");
//         if (!confirmDelete) return;

//         try {
//             const res = await fetch(`http://localhost:5000/api/deleteUser/${userId}`, {
//                 method: "DELETE",
//                 headers: authHeaders(),
//             });

//             if (await handleAuthError(res)) return;

//             if (!res.ok) {
//                 const text = await res.text();
//                 throw new Error(text || "Failed to delete user");
//             }

//             // Update the local users state
//             setUsers((prev) => prev.filter((user) => user._id !== userId));
//             alert("User removed successfully!");
//         } catch (err) {
//             console.error("handleRemoveUser error:", err.message || err);
//             alert("Error removing user");
//         }
//     };

//     // Filter users by username or phone (case-insensitive)
//     const filteredUsers = users.filter((u) => {
//         const q = query.trim().toLowerCase();
//         if (!q) return true;
//         const username = (u.username || "").toLowerCase();
//         const phone = (u.phone || "").toLowerCase();
//         return username.includes(q) || phone.includes(q);
//     });

//     const exportUsersCSV = () => {
//         const list = filteredUsers.length ? filteredUsers : users;
//         if (!list || list.length === 0) {
//             alert("No users to export");
//             return;
//         }

//         const rows = [["Username", "Phone", "Role", "ProfilePicture", "CreatedAt"]];
//         list.forEach((u) => {
//             rows.push([u.username || "", u.phone || "", u.role || "", u.profilePicture || "", u.createdAt || ""]);
//         });
//         const csvContent = rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
//         const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = `users-${new Date().toISOString().slice(0, 10)}.csv`;
//         a.click();
//         URL.revokeObjectURL(url);
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-100">
//             {/* Sidebar */}
//             <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col">
//                 <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
//                 <nav className="space-y-3 flex-1">
//                     <button
//                         className={`flex items-center w-full p-2 rounded hover:bg-gray-800 ${activeTab === "dashboard" ? "bg-gray-800" : ""} cursor-pointer`}
//                         onClick={() => setActiveTab("dashboard")}
//                     >
//                         <FaUsers className="mr-2" /> Dashboard
//                     </button>

//                     <button
//                         className={`flex items-center w-full p-2 rounded hover:bg-gray-800 ${activeTab === "chat" ? "bg-gray-800" : ""} cursor-pointer`}
//                         // onClick={() => window.location.assign("/chat")}
//                         onClick={() => navigate("/chat")}
//                     >
//                         <FaCommentDots className="mr-2" /> Chat
//                     </button>

//                     <button
//                         className={`flex items-center w-full p-2 rounded hover:bg-gray-800 ${activeTab === "addUser" ? "bg-gray-800" : ""} cursor-pointer`}
//                         // onClick={() => window.location.assign("/register")}
//                         onClick={() => navigate("/register")}
//                     >
//                         <FaUserPlus className="mr-2" /> Add User
//                     </button>

//                     <button
//                         className={`flex items-center w-full p-2 rounded hover:bg-gray-800 ${activeTab === "charts" ? "bg-gray-800" : ""} cursor-pointer`}
//                         onClick={() => setActiveTab("charts")}
//                     >
//                         <FaChartPie className="mr-2" /> Charts
//                     </button>

//                     <button
//                         className={`flex items-center w-full p-2 rounded hover:bg-gray-800 ${activeTab === "users" ? "bg-gray-800" : ""} cursor-pointer`}
//                         onClick={() => setActiveTab("users")}
//                     >
//                         <FaTable className="mr-2" /> Users
//                     </button>
//                 </nav>
//             </aside>

//             {/* Main content */}
//             <main className="flex-1 p-8">
//                 <h1 className="text-3xl font-semibold mb-6">
//                     {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
//                 </h1>

//                 {loading ? (
//                     <div className="text-center text-gray-500">Loading stats...</div>
//                 ) : (
//                     <>
//                         {activeTab === "dashboard" && (
//                             <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
//                                 <div className="bg-white shadow rounded-lg p-4 text-center">
//                                     <h3 className="text-lg font-medium text-gray-700">Total Users</h3>
//                                     <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
//                                 </div>
//                                 <div className="bg-white shadow rounded-lg p-4 text-center">
//                                     <h3 className="text-lg font-medium text-gray-700">Messages Sent</h3>
//                                     <p className="text-2xl font-bold text-green-600">{stats.totalMessages}</p>
//                                 </div>
//                                 <div className="bg-white shadow rounded-lg p-4 text-center">
//                                     <h3 className="text-lg font-medium text-gray-700">New Users (30 Days)</h3>
//                                     <p className="text-2xl font-bold text-purple-600">{stats.newUsersLast30Days}</p>
//                                 </div>
//                                 <div className="bg-white shadow rounded-lg p-4 text-center">
//                                     <h3 className="text-lg font-medium text-gray-700">Total Distinct Login Users (30 Days)</h3>
//                                     <p className="text-2xl font-bold text-red-600">{stats.activeUsers}</p>
//                                 </div>
//                                 <div className="bg-white shadow rounded-lg p-4 text-center">
//                                     <h3 className="text-lg font-medium text-gray-700">Total Login Users (30 Days)</h3>
//                                     <p className="text-2xl font-bold text-yellow-600">{stats.loginUsers}</p>
//                                 </div>
//                             </div>
//                         )}

//                         {activeTab === "charts" && (
//                             <div className="max-w-md mx-auto bg-white p-4 shadow rounded">
//                                 <Pie data={pieData} options={{ responsive: true, plugins: { legend: { position: "bottom" } } }} />
//                             </div>
//                         )}

//                         {activeTab === "users" && (
//                             <>
//                                 {/* Toolbar: search + export */}
//                                 <div className="mb-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
//                                     <div className="flex-1 flex gap-2 items-center">
//                                         <input
//                                             value={query}
//                                             onChange={(e) => setQuery(e.target.value)}
//                                             placeholder="Search by username or phone..."
//                                             className="border p-2 rounded w-full"
//                                         />
//                                         <button
//                                             onClick={() => setQuery("")}
//                                             className="px-3 py-2 bg-gray-700 text-white rounded"
//                                         >
//                                             Clear
//                                         </button>
//                                     </div>

//                                     <div className="flex-shrink-0">
//                                         <button onClick={exportUsersCSV} className="px-3 py-2 bg-blue-600 text-white rounded">
//                                             Export CSV
//                                         </button>
//                                     </div>
//                                 </div>

//                                 <div className="overflow-x-auto">
//                                     <table className="min-w-full border border-gray-300 bg-white rounded-lg">
//                                         <thead className="bg-gray-200">
//                                             <tr>
//                                                 <th className="px-4 py-2 border-b">#</th>
//                                                 <th className="px-4 py-2 border-b">Username</th>
//                                                 <th className="px-4 py-2 border-b">Phone</th>
//                                                 <th className="px-4 py-2 border-b">Profile Picture</th>
//                                                 <th className="px-4 py-2 border-b">Role</th>
//                                                 <th className="px-4 py-2 border-b">Actions</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {users.length === 0 ? (
//                                                 <tr>
//                                                     <td colSpan={6} className="py-6 text-center text-gray-500">
//                                                         No users found.
//                                                     </td>
//                                                 </tr>
//                                             ) : filteredUsers.length === 0 ? (
//                                                 <tr>
//                                                     <td colSpan={6} className="py-6 text-center text-gray-500">
//                                                         No users match your search.
//                                                     </td>
//                                                 </tr>
//                                             ) : (
//                                                 filteredUsers.map((user, index) => (
//                                                     <tr key={user._id} className="text-center border-b hover:bg-gray-50">
//                                                         <td className="px-4 py-2">{index + 1}</td>
//                                                         <td className="px-4 py-2">{user.username}</td>
//                                                         <td className="px-4 py-2">{user.phone}</td>
//                                                         <td className="px-4 py-2">
//                                                             {user.profilePicture ? (
//                                                                 <img
//                                                                     src={`http://localhost:5000/${user.profilePicture}`}
//                                                                     alt={user.username}
//                                                                     className="w-10 h-10 rounded-full mx-auto object-cover"
//                                                                     onError={(e) => {
//                                                                         e.currentTarget.onerror = null;
//                                                                         e.currentTarget.src = "/default-avatar.png";
//                                                                     }}
//                                                                 />
//                                                             ) : (
//                                                                 <img
//                                                                     src="/default-avatar.png"
//                                                                     alt="default"
//                                                                     className="w-10 h-10 rounded-full mx-auto object-cover"
//                                                                 />
//                                                             )}
//                                                         </td>
//                                                         <td className="px-4 py-2 capitalize">{user.role}</td>
//                                                         <td className="px-4 py-2">
//                                                             <button
//                                                                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//                                                                 onClick={() => handleRemoveUser(user._id)}
//                                                             >
//                                                                 Remove
//                                                             </button>
//                                                         </td>
//                                                     </tr>
//                                                 ))
//                                             )}
//                                         </tbody>
//                                     </table>
//                                 </div>
//                             </>
//                         )}
//                     </>
//                 )}
//             </main>
//         </div>
//     );
// }

// export default AdminDashboard;












import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { FaChartPie, FaUsers, FaCommentDots, FaUserPlus, FaTable, FaInfoCircle } from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip, Legend);

function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalMessages: 0,
        newUsersLast30Days: 0,
        activeUsers: 0,
        loginUsers: 0,
    });
    const [activeTab, setActiveTab] = useState("dashboard");
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("token");

    const [query, setQuery] = useState("");

    // modal for user details
    const [detailUser, setDetailUser] = useState(null);
    const [detailLoading, setDetailLoading] = useState(false);
    const [detailData, setDetailData] = useState(null);

    const navigate = useNavigate();

    // Small helper: common fetch options
    const authHeaders = () => {
        const headers = { "Content-Type": "application/json" };
        if (token) headers.Authorization = `Bearer ${token}`;
        return headers;
    };

    // handle unauthorized/forbidden centrally
    const handleAuthError = async (res) => {
        if (res.status === 401) {
            alert("Session expired. Please login again.");
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            navigate("/login");
            return true;
        }
        if (res.status === 403) {
            alert("You are not authorized to view this page.");
            navigate("/");
            return true;
        }
        return false;
    };

    // Fetch dashboard stats
    useEffect(() => {
        if (activeTab === "dashboard" || activeTab === "charts") {
            const fetchStats = async () => {
                setLoading(true);
                try {
                    const res = await fetch("http://localhost:5000/api/admin-dashboard", {
                        headers: authHeaders(),
                    });

                    if (await handleAuthError(res)) {
                        setLoading(false);
                        return;
                    }

                    if (!res.ok) throw new Error("Failed to fetch stats");

                    const data = await res.json();
                    setStats({
                        totalUsers: data.totalUsers ?? 0,
                        totalMessages: data.totalMessages ?? 0,
                        newUsersLast30Days: data.newUsersLast30Days ?? 0,
                        activeUsers: data.activeUsers ?? 0,
                        loginUsers: data.loginUsers ?? 0,
                    });
                } catch (err) {
                    console.error("fetchStats error:", err.message || err);
                } finally {
                    setLoading(false);
                }
            };
            fetchStats();
        }
    }, [activeTab, token, navigate]);

    // Fetch users when Users tab is active
    useEffect(() => {
        if (activeTab === "users") {
            const fetchUsers = async () => {
                try {
                    const res = await fetch("http://localhost:5000/api/allUsers", {
                        headers: authHeaders(),
                    });

                    if (await handleAuthError(res)) {
                        setUsers([]);
                        return;
                    }

                    if (!res.ok) throw new Error("Failed to fetch users");
                    const data = await res.json();
                    setUsers(Array.isArray(data.users) ? data.users : []);
                } catch (err) {
                    console.error("fetchUsers error:", err.message || err);
                    setUsers([]);
                }
            };
            fetchUsers();
        }
    }, [activeTab, token, navigate]);

    const pieData = {
        labels: ["Total Users", "Messages Sent", "New Users (30 Days)", "Total Distinct Login Users (30 Days)", "Total Login Users (30 Days)"],
        datasets: [
            {
                label: "Stats",
                data: [stats.totalUsers, stats.totalMessages, stats.newUsersLast30Days, stats.activeUsers, stats.loginUsers],
                backgroundColor: ["#3B82F6", "#10B981", "#8B5CF6", "#EF4444", "#F59E0B"],
                borderColor: ["#fff", "#fff", "#fff", "#fff", "#fff"],
                borderWidth: 2,
            },
        ],
    };

    const handleRemoveUser = async (userId) => {
        const confirmDelete = window.confirm("Are you sure you want to remove this user?");
        if (!confirmDelete) return;

        try {
            const res = await fetch(`http://localhost:5000/api/deleteUser/${userId}`, {
                method: "DELETE",
                headers: authHeaders(),
            });

            if (await handleAuthError(res)) return;

            if (!res.ok) {
                const text = await res.text();
                throw new Error(text || "Failed to delete user");
            }

            // Update the local users state
            setUsers((prev) => prev.filter((user) => user._id !== userId));
            alert("User removed successfully!");
        } catch (err) {
            console.error("handleRemoveUser error:", err.message || err);
            alert("Error removing user");
        }
    };

    // Filter users by username or phone (case-insensitive)
    const filteredUsers = users.filter((u) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        const username = (u.username || "").toLowerCase();
        const phone = (u.phone || "").toLowerCase();
        return username.includes(q) || phone.includes(q);
    });

    const exportUsersCSV = () => {
        const list = filteredUsers.length ? filteredUsers : users;
        if (!list || list.length === 0) {
            alert("No users to export");
            return;
        }

        const rows = [["Username", "Phone", "Role", "ProfilePicture", "CreatedAt"]];
        list.forEach((u) => {
            rows.push([u.username || "", u.phone || "", u.role || "", u.profilePicture || "", u.createdAt || ""]);
        });
        const csvContent = rows.map((r) => r.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(",")).join("\n");
        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `users-${new Date().toISOString().slice(0, 10)}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    };

    // open detail modal and fetch activity
    const openUserDetail = async (user) => {
        setDetailUser(user);
        setDetailLoading(true);
        setDetailData(null);
        try {
            const res = await fetch(`http://localhost:5000/api/userActivity/${user._id}`, {
                headers: authHeaders(),
            });
            if (await handleAuthError(res)) {
                setDetailLoading(false);
                return;
            }
            if (!res.ok) throw new Error("Failed to fetch user activity");
            const data = await res.json();
            setDetailData(data);
        } catch (err) {
            console.error("openUserDetail error", err);
            alert("Error loading user details");
        } finally {
            setDetailLoading(false);
        }
    };

    const closeUserDetail = () => {
        setDetailUser(null);
        setDetailData(null);
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white p-6 flex flex-col">
                <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
                <nav className="space-y-3 flex-1">
                    <button
                        className={`flex items-center w-full p-2 rounded hover:bg-gray-800 ${activeTab === "dashboard" ? "bg-gray-800" : ""} cursor-pointer`}
                        onClick={() => setActiveTab("dashboard")}
                    >
                        <FaUsers className="mr-2" /> Dashboard
                    </button>

                    <button
                        className={`flex items-center w-full p-2 rounded hover:bg-gray-800 ${activeTab === "chat" ? "bg-gray-800" : ""} cursor-pointer`}
                        // onClick={() => window.location.assign("/chat")}
                        onClick={() => navigate("/chat")}
                    >
                        <FaCommentDots className="mr-2" /> Chat
                    </button>

                    <button
                        className={`flex items-center w-full p-2 rounded hover:bg-gray-800 ${activeTab === "addUser" ? "bg-gray-800" : ""} cursor-pointer`}
                        // onClick={() => window.location.assign("/register")}
                        onClick={() => navigate("/register")}
                    >
                        <FaUserPlus className="mr-2" /> Add User
                    </button>

                    <button
                        className={`flex items-center w-full p-2 rounded hover:bg-gray-800 ${activeTab === "charts" ? "bg-gray-800" : ""} cursor-pointer`}
                        onClick={() => setActiveTab("charts")}
                    >
                        <FaChartPie className="mr-2" /> Charts
                    </button>

                    <button
                        className={`flex items-center w-full p-2 rounded hover:bg-gray-800 ${activeTab === "users" ? "bg-gray-800" : ""} cursor-pointer`}
                        onClick={() => setActiveTab("users")}
                    >
                        <FaTable className="mr-2" /> Users
                    </button>
                </nav>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-8">
                <h1 className="text-3xl font-semibold mb-6">
                    {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h1>

                {loading ? (
                    <div className="text-center text-gray-500">Loading stats...</div>
                ) : (
                    <>
                        {activeTab === "dashboard" && (
                            <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                                <div className="bg-white shadow rounded-lg p-4 text-center">
                                    <h3 className="text-lg font-medium text-gray-700">Total Users</h3>
                                    <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
                                </div>
                                <div className="bg-white shadow rounded-lg p-4 text-center">
                                    <h3 className="text-lg font-medium text-gray-700">Messages Sent</h3>
                                    <p className="text-2xl font-bold text-green-600">{stats.totalMessages}</p>
                                </div>
                                <div className="bg-white shadow rounded-lg p-4 text-center">
                                    <h3 className="text-lg font-medium text-gray-700">New Users (30 Days)</h3>
                                    <p className="text-2xl font-bold text-purple-600">{stats.newUsersLast30Days}</p>
                                </div>
                                <div className="bg-white shadow rounded-lg p-4 text-center">
                                    <h3 className="text-lg font-medium text-gray-700">Total Distinct Login Users (30 Days)</h3>
                                    <p className="text-2xl font-bold text-red-600">{stats.activeUsers}</p>
                                </div>
                                <div className="bg-white shadow rounded-lg p-4 text-center">
                                    <h3 className="text-lg font-medium text-gray-700">Total Login Users (30 Days)</h3>
                                    <p className="text-2xl font-bold text-yellow-600">{stats.loginUsers}</p>
                                </div>
                            </div>
                        )}

                        {activeTab === "charts" && (
                            <div className="max-w-md mx-auto bg-white p-4 shadow rounded">
                                <Pie data={pieData} options={{ responsive: true, plugins: { legend: { position: "bottom" } } }} />
                            </div>
                        )}

                        {activeTab === "users" && (
                            <>
                                {/* Toolbar: search + export */}
                                <div className="mb-4 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                                    <div className="flex-1 flex gap-2 items-center">
                                        <input
                                            value={query}
                                            onChange={(e) => setQuery(e.target.value)}
                                            placeholder="Search by username or phone..."
                                            className="border p-2 rounded w-full"
                                        />
                                        <button
                                            onClick={() => setQuery("")}
                                            className="px-3 py-2 bg-gray-700 text-white rounded"
                                        >
                                            Clear
                                        </button>
                                    </div>

                                    <div className="flex-shrink-0">
                                        <button onClick={exportUsersCSV} className="px-3 py-2 bg-blue-600 text-white rounded">
                                            Export CSV
                                        </button>
                                    </div>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full border border-gray-300 bg-white rounded-lg">
                                        <thead className="bg-gray-200">
                                            <tr>
                                                <th className="px-4 py-2 border-b">#</th>
                                                <th className="px-4 py-2 border-b">Username</th>
                                                <th className="px-4 py-2 border-b">Phone</th>
                                                <th className="px-4 py-2 border-b">Profile Picture</th>
                                                <th className="px-4 py-2 border-b">Status</th>
                                                <th className="px-4 py-2 border-b">Role</th>
                                                <th className="px-4 py-2 border-b">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.length === 0 ? (
                                                <tr>
                                                    <td colSpan={6} className="py-6 text-center text-gray-500">
                                                        No users found.
                                                    </td>
                                                </tr>
                                            ) : filteredUsers.length === 0 ? (
                                                <tr>
                                                    <td colSpan={6} className="py-6 text-center text-gray-500">
                                                        No users match your search.
                                                    </td>
                                                </tr>
                                            ) : (
                                                filteredUsers.map((user, index) => (
                                                    <tr key={user._id} className="text-center border-b hover:bg-gray-50">
                                                        <td className="px-4 py-2">{index + 1}</td>
                                                        <td className="px-4 py-2">{user.username}</td>
                                                        <td className="px-4 py-2">{user.phone}</td>
                                                        <td className="px-4 py-2">
                                                            {user.profilePicture ? (
                                                                <img
                                                                    src={`http://localhost:5000/${user.profilePicture}`}
                                                                    alt={user.username}
                                                                    className="w-10 h-10 rounded-full mx-auto object-cover"
                                                                    onError={(e) => {
                                                                        e.currentTarget.onerror = null;
                                                                        e.currentTarget.src = "/default-avatar.png";
                                                                    }}
                                                                />
                                                            ) : (
                                                                <img
                                                                    src="/default-avatar.png"
                                                                    alt="default"
                                                                    className="w-10 h-10 rounded-full mx-auto object-cover"
                                                                />
                                                            )}
                                                        </td>
                                                        <td> <button onClick={() => openUserDetail(user)} title="Details" className="px-2 py-1 border rounded cursor-pointer"><FaInfoCircle /></button></td>
                                                        <td className="px-4 py-2 capitalize">{user.role}</td>
                                                        <td className="px-4 py-2">
                                                            <button
                                                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 cursor-pointer"
                                                                onClick={() => handleRemoveUser(user._id)}
                                                            >
                                                                Remove
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                    </>
                )}
            </main>

            {/* Detail modal */}
            {detailUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
                    <div className="bg-white rounded-lg w-full max-w-2xl p-4">
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-xl font-semibold">User details — {detailUser.username}</h3>
                            <div className="flex gap-2 items-center">
                                <button className="px-3 py-1 border rounded cursor-pointer" onClick={closeUserDetail}>Close</button>
                            </div>
                        </div>

                        {detailLoading ? (
                            <div>Loading...</div>
                        ) : detailData ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <p><strong>Profile Picture:</strong></p>
                                        <img src={detailData.user.profilePicture ? `http://localhost:5000/${detailData.user.profilePicture}` : "/default-avatar.png"} alt="profile" className="w-20 h-20 rounded-full object-cover" onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/default-avatar.png' }} />
                                        <p><strong>Phone:</strong> {detailData.user.phone}</p>
                                        <p><strong>Role:</strong> {detailData.user.role}</p>
                                        <p><strong>Created At:</strong> {new Date(detailData.user.createdAt).toLocaleString()}</p>
                                        <p><strong>Last Login:</strong> {detailData.lastLogin ? new Date(detailData.lastLogin).toLocaleString() : 'Never'}</p>
                                    </div>
                                    <div>
                                        <p><strong>Active:</strong> {detailData.user.isActive ? 'Yes' : 'No'}</p>
                                        <p><strong>Deleted:</strong> {detailData.user.isDeleted ? 'Yes' : 'No'}</p>
                                        <p><strong>Messages (sent/received):</strong> {detailData.messagesCount ?? 0}</p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="font-semibold mb-2">Audit Trail (recent)</h4>
                                    {detailData.auditLogs && detailData.auditLogs.length > 0 ? (
                                        <div className="max-h-48 overflow-auto border rounded p-2 bg-gray-50">
                                            {detailData.auditLogs.map((log) => (
                                                <div key={log._id} className="mb-2 border-b pb-1">
                                                    <div className="text-sm"><strong>{log.action}</strong> — {log.adminUsername || log.adminId}</div>
                                                    <div className="text-xs text-gray-600">{new Date(log.createdAt).toLocaleString()}</div>
                                                    {log.details && <pre className="text-xs mt-1">{JSON.stringify(log.details)}</pre>}
                                                </div>
                                            ))}
                                        </div>
                                    ) : <div className="text-sm text-gray-500">No audit logs found.</div>}
                                </div>
                            </>
                        ) : (
                            <div className="text-sm text-gray-500">No details available.</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminDashboard;