// import axios from "axios";
// import React, { useState, useEffect } from "react";

// // Categories for buttons
// const categories = [
//   "sports", "ipl", "stockmarket" ,"technology", "science", "health",
//   "fitness", "movies", "music", "education", "space", "fashion",
//   "travel", "food", "finance", "cryptocurrency", "artificial",
//   "learnprogramming", "gaming", "android", "sip",  "startups", "books",
//   "investing", "worldnews", "celebrity", "marketing", "gadgets",
//   "pcmasterrace", "indianfood", "history"
// ];

// const Trend = () => {

//   const [selectedCategory, setSelectedCategory] = useState(() => {
//     return localStorage.getItem("selectedCategory") || "";
//   });
//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedPost, setSelectedPost] = useState(null); // For modal state

//   // Fetch trending data from Reddit API
//   const fetchTrends = async (category) => {
//     setSelectedCategory(category);
//     localStorage.setItem("selectedCategory", category);
//     setLoading(true);
//     try {
//       const res = await axios.get(`http://localhost:5000/api/trends/${category}`);
//       const filteredPosts = res.data.filter(
//         (post) => post.image && post.image.startsWith("http")
//       );
//       setPosts(filteredPosts);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//       setPosts([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Open modal with selected post data
//   const openModal = (post) => {
//     setSelectedPost(post);
//   };

//   // Close the modal
//   const closeModal = () => {
//     setSelectedPost(null);
//   };

//   useEffect(() => {
//     if (selectedCategory) fetchTrends(selectedCategory);
//   }, [selectedCategory]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white px-4 sm:px-6 lg:px-8 py-10 font-sans w-full md:w-[100%] mx-auto">
//       {/* Header */}
//       <h1 className="text-4xl p-5 sm:text-5xl font-extrabold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500 animate-pulse">
//         DeepChat - Trending Topics
//       </h1>

//       {/* Category Buttons */}
//       <div className="mb-10 max-w-5xl mx-auto overflow-x-auto scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-gray-800 whitespace-nowrap pb-2">
//         <div className="flex gap-3">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => fetchTrends(cat)}
//               className={`relative px-5 py-2 rounded-full font-semibold text-sm uppercase tracking-wide transition-all duration-300 shadow-md ${
//                 selectedCategory === cat
//                   ? "bg-gradient-to-r from-teal-500 to-blue-600 text-white scale-105"
//                   : "bg-gray-700 text-gray-200 hover:bg-gray-600 hover:scale-105"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Loading State */}
//       {loading && (
//         <div className="text-center text-gray-300 mb-8 animate-bounce">
//           <span className="text-2xl">🔄</span> Loading Trends...
//         </div>
//       )}

//       {/* No Data State */}
//       {selectedCategory && posts.length === 0 && !loading && (
//         <p className="text-center text-gray-400 text-lg italic">
//           No trending data found for "{selectedCategory}"
//         </p>
//       )}

//       {/* Posts Grid */}
//       <div className="h-[70vh] overflow-y-auto scrollbar-thin scrollbar-thumb-teal-500 scrollbar-track-gray-800 px-2">
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto">
//           {posts.map((post, index) => (
//             <div
//               key={index}
//               className="relative bg-gray-800/80 p-5 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 backdrop-blur-md border border-gray-700/50 cursor-pointer"
//               onClick={() => openModal(post)} // Open modal on post click
//             >
//               <h3 className="text-lg font-semibold text-teal-300 line-clamp-2 mb-3">
//                 {post.title}
//               </h3>
//               {post.image && post.image.startsWith("http") && (
//                 <div className="relative w-full h-56 mb-4">
//                   <img
//                     src={post.image}
//                     alt={post.title}
//                     className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
//                   />
//                 </div>
//               )}
//               {/* Read More Button */}
//               <button
//                 onClick={() => openModal(post)}
//                 className="mt-3 bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 transition-colors duration-200"
//               >
//                 Read More
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Modal for detailed post view */}
//       {selectedPost && (
//         <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50">
//           <div className="bg-gray-800 text-white p-8 rounded-lg max-w-xl w-full">
//             <h3 className="text-2xl font-semibold text-teal-300 mb-4">
//               {selectedPost.title}
//             </h3>
//             {selectedPost.image && (
//               <div className="relative w-full h-60 mb-4">
//                 <img
//                   src={selectedPost.image}
//                   alt={selectedPost.title}
//                   className="w-full h-full object-cover rounded-lg"
//                 />
//               </div>
//             )}
//             <p className="text-gray-400 mb-4">{selectedPost.description}</p>
//             <p className="text-sm text-gray-500">{selectedPost.credit}</p>
//             <div className="mt-4 flex justify-between">
//               <button
//                 onClick={closeModal}
//                 className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
//               >
//                 Close
//               </button>
//               <a
//   href={selectedPost.url}
//   target="_blank"
//   rel="noopener noreferrer"
//   className="bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600"
// >
//   View Full Post
// </a>

//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Trend;


// ccff17730211f9738a1f495713132a42

import axios from "axios";
import React, { useState, useEffect } from "react";

// Supported GNews topics
const topics = [
  "general", "world", "nation", "business", "technology",
  "entertainment", "sports", "science", "health"
];

const Trend = () => {
  const [selectedTopic, setSelectedTopic] = useState(() => localStorage.getItem("selectedTopic") || "general");
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Replace with your VALID free API key from gnews.io/dashboard
  const API_KEY =  "ccff17730211f9738a1f495713132a42";

  // Fetch trending data from GNews API
  const fetchTrends = async (topicOrQuery = "general") => {
    setSelectedTopic(topicOrQuery);
    localStorage.setItem("selectedTopic", topicOrQuery);
    setPosts([]);
    setLoading(true);
    try {
      let url = `https://gnews.io/api/v4/top-headlines?token=${API_KEY}&lang=en&country=us`;
      if (topics.includes(topicOrQuery.toLowerCase())) {
        url += `&topic=${topicOrQuery}`;
      } else {
        url += `&q=${encodeURIComponent(topicOrQuery)}`;
      }
      console.log("Fetching URL:", url);
      const res = await axios.get(url);
      console.log("API Response:", res.data);
      const articles = res.data.articles || [];
      const filteredPosts = articles
        .map((article) => ({
          title: article.title,
          description: article.description || "No description available.",
          url: article.url,
          image: article.image,
          credit: article.source?.name || "Unknown Source",
        }))
        .filter((post) => post.image && post.image.startsWith("http"));
      setPosts(filteredPosts.slice(0, 10));
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response?.status === 403) {
        alert("403 Forbidden: Invalid API key. Update it in .env from gnews.io/dashboard.");
      } else if (error.response?.status === 429) {
        alert("API rate limit reached (100/day). Try again after ~05:30 AM IST.");
      } else if (error.response?.status === 401) {
        alert("401 Unauthorized: Check API key format.");
      } else {
        alert("Failed to fetch data. Check console.");
      }
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle search input with autocomplete
  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    if (value) {
      const filteredSuggestions = topics.filter(topic =>
        topic.toLowerCase().includes(value)
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Handle search submission
  const handleSearchSubmit = () => {
    if (searchTerm.trim()) {
      fetchTrends(searchTerm.trim());
    }
    setSuggestions([]);
  };

  // Handle suggestion click
  const handleSuggestionClick = (topic) => {
    setSearchTerm(topic);
    fetchTrends(topic);
    setSuggestions([]);
  };

  // Open modal with selected post
  const openModal = (post) => {
    setSelectedPost(post);
  };

  // Close modal
  const closeModal = () => {
    setSelectedPost(null);
  };

  useEffect(() => {
    if (selectedTopic) fetchTrends(selectedTopic);
  }, [selectedTopic]);

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header with Search */}
      <header className="bg-gray-900 p-4 shadow-md">
        <div className="max-w mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 md:mb-0">
            DeepChat trends
          </h1>
          <div className="relative w-full max-w-sm">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              onKeyPress={(e) => e.key === "Enter" && handleSearchSubmit()}
              placeholder="Search news or topics..."
              className="w-full px-4 py-2 rounded-l-full bg-gray-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500 transition-all duration-300"
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-gray-800 mt-1 rounded-md shadow-lg max-h-40 overflow-y-auto">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-700 transition-colors"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={handleSearchSubmit}
              className="absolute right-0 top-0 h-full px-6 py-2 bg-gray-600 text-white rounded-r-full hover:bg-gray-500 transition-all duration-300"
            >
              Search
            </button>
          </div>
        </div>
      </header>

      {/* Topic Carousel */}
      <div className="max-w-7xl mx-auto p-4">
        <h2 className="text-xl font-semibold text-gray-200 mb-4">Trending Topics</h2>
        <div className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800 pb-2">
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => fetchTrends(topic)}
              className={`px-6 py-2 rounded-full font-medium text-sm uppercase transition-all duration-300 ${
                selectedTopic === topic
                  ? "bg-gray-600 text-white shadow-md scale-105"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:scale-105"
              }`}
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="text-center text-gray-400 mt-8 animate-pulse">
          <span className="text-2xl">🔄 Loading News...</span>
        </div>
      )}

      {/* No Data State */}
      {selectedTopic && posts.length === 0 && !loading && (
        <p className="text-center text-gray-500 text-lg italic mt-8">
          No data available for "{selectedTopic}"
        </p>
      )}

      {/* Scrollable News Feed */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-gray-700 overflow-hidden"
                onClick={() => openModal(post)}
              >
                <h3 className="text-lg font-semibold text-gray-200 line-clamp-2 mb-2 hover:text-gray-100 transition-colors">
                  {post.title}
                </h3>
                {post.image && post.image.startsWith("http") && (
                  <div className="relative w-full h-32 mb-2 overflow-hidden rounded">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-opacity duration-300"
                    />
                  </div>
                )}
                <p className="text-gray-400 text-sm line-clamp-2 mb-2">{post.description}</p>
                <button className="w-full bg-gray-600 text-white py-1 rounded hover:bg-gray-500 transition-colors duration-300 text-sm">
                  Join Chat
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for detailed post view */}
      {selectedPost && (
        <div className="fixed inset-0 bg-gray-900/80 flex items-center justify-center z-50">
          <div className="bg-gray-800 text-white p-6 rounded-lg max-w-md w-full shadow-lg border border-gray-700">
            <h3 className="text-2xl font-bold text-gray-200 mb-4">{selectedPost.title}</h3>
            {selectedPost.image && (
              <div className="relative w-full h-48 mb-4 overflow-hidden rounded-lg">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <p className="text-gray-400 mb-4">{selectedPost.description}</p>
            <p className="text-sm text-gray-500 mb-4">Source: {selectedPost.credit}</p>
            <div className="flex justify-between">
              <button
                onClick={closeModal}
                className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-500 transition-colors"
              >
                Close
              </button>
              <a
                href={selectedPost.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-400 transition-colors"
              >
                Read More
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trend;