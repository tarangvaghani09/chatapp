# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import torch
# from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
# from peft import PeftModel
# # from sentence_transformers import CrossEncoder  # if you add reranker

# MODEL_NAME = "google/flan-t5-base"
# ADAPTER_PATH = "flan_t5_base_lora_search/lora_adapter"
# MAX_IN_LEN = 1024
# MAX_OUT_LEN = 192
# DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# app = Flask(__name__)
# CORS(app)

# # --- Load model once ---
# tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, use_fast=True)
# base_model = AutoModelForSeq2SeqLM.from_pretrained(MODEL_NAME)
# model = PeftModel.from_pretrained(base_model, ADAPTER_PATH).to(DEVICE).eval()

# # Optional: reranker
# # reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2", max_length=512)

# # --- Your search functions (stub here) ---
# def search_duckduckgo(q): ...
# def search_bing(q): ...
# def search_wiki(q): ...

# def format_prompt(query, snippets):
#     lines = []
#     for i, s in enumerate(snippets, 1):
#         lines.append(f"[{i}] {s['title']}: {s['snippet']}")
#     ctx = "\n".join(lines)
#     return (
#         "You are a helpful assistant. Write a concise, accurate answer based only on the snippets. "
#         "Cite sources by their index in square brackets, like [1], [2]. If unsure, say you don't know.\n\n"
#         f"Question: {query}\n\nSnippets:\n{ctx}\n\nAnswer:"
#     )

# def generate_answer(query, snippets):
#     prompt = format_prompt(query, snippets)
#     enc = tokenizer(prompt, return_tensors="pt", truncation=True, max_length=MAX_IN_LEN).to(DEVICE)
#     with torch.no_grad():
#         out_ids = model.generate(
#             **enc,
#             max_length=MAX_OUT_LEN,
#             temperature=0.7,
#             top_p=0.9,
#             do_sample=True,
#             num_return_sequences=1
#         )
#     return tokenizer.decode(out_ids[0], skip_special_tokens=True)

# @app.route("/search", methods=["POST"])
# def search():
#     payload = request.get_json()
#     query = payload.get("query") or payload.get("messages", [{}])[-1].get("content", "")

#     # 1) fetch results
#     snippets = []
#     # Extend with your existing functions and API keys
#     # snippets += search_duckduckgo(query)
#     # snippets += search_bing(query)
#     # snippets += search_wiki(query)
#     # Expect each snippet as: {"title": str, "snippet": str, "url": str}

#     # Fallback demo data if none (so it runs out-of-box)
#     if not snippets:
#         snippets = [
#             {"title":"Example 1","snippet":"This is a demo snippet about Docker Compose and yaml services.","url":"https://example.com"},
#             {"title":"Example 2","snippet":"Compose manages multi-container apps with one command.","url":"https://example.org"},
#         ]

#     # 2) (optional) rerank
#     # pairs = [(query, s["title"] + " " + s["snippet"]) for s in snippets]
#     # scores = reranker.predict(pairs)
#     # ranked = [s for _, s in sorted(zip(scores, snippets), key=lambda x: x[0], reverse=True)]
#     ranked = snippets  # if no reranker yet
#     topk = ranked[:6]

#     # 3) generate
#     answer = generate_answer(query, topk)

#     # 4) return DeepChat-compatible shape
#     # You can also include structured citations
#     return jsonify({
#         "output": {
#             "role": "assistant",
#             "content": answer,
#             "citations": [{"index": i+1, "url": s.get("url","") } for i, s in enumerate(topk)]
#         }
#     })

# if __name__ == "__main__":
#     app.run(port=8000, debug=True)


import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleAiChat } from "../actions/chatAction";
import ReactLoading from 'react-loading';
import { FaArrowRight } from "react-icons/fa";
import { BsPauseCircleFill } from "react-icons/bs";
import '../prompt.css';

const PromptAndResponseApp = () => {
  const dispatch = useDispatch();
  const isAiChatOpen = useSelector((state) => state.chat.isAiChatOpen);
  const [inputText, setInputText] = useState("");
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [conversation, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Mock AI response (since no free AI API is used)
  const getMockAIResponse = (query) => {
    return `This is a mock AI response for your query "${query}". For learning purposes, no real AI API is used.`;
  };

  // Fetch DuckDuckGo results (free JSON API, no key needed)
  const searchDuckDuckGo = async (query) => {
    try {
      const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_redirect=1&skip_disambig=1`;
      const response = await fetch(url);
      const data = await response.json();
      let results = [];
      if (data.Abstract) {
        results.push(`${data.Heading || 'Abstract'}: ${data.Abstract} (${data.AbstractURL || ''})`);
      }
      if (data.RelatedTopics) {
        results.push(...data.RelatedTopics
          .filter(topic => topic.Text && topic.FirstURL)
          .map(topic => `${topic.Text} (${topic.FirstURL})`)
          .slice(0, 3)); // Limit to 3 results
      }
      return results.length ? results.join('\n\n') : "No results found from DuckDuckGo.";
    } catch (error) {
      console.error("Error fetching DuckDuckGo results:", error);
      return "Error fetching DuckDuckGo results.";
    }
  };

  // Mock Google results (since no free API and scraping is restricted)
  const searchGoogle = async (query) => {
    // Simulate Google results for learning
    return `Mock Google Result 1: Sample result for "${query}".[](https://example.com/google1)\n\n` +
           `Mock Google Result 2: Another sample for "${query}".[](https://example.com/google2)`;
    // Note: For real Google results, consider Google News RSS (e.g., https://news.google.com/rss/search?q=query) or SerpAPI free tier.
  };

  // Mock Bing results (since no free API and scraping is restricted)
  const searchBing = async (query) => {
    // Simulate Bing results for learning
    return `Mock Bing Result 1: Sample result for "${query}".[](https://example.com/bing1)\n\n` +
           `Mock Bing Result 2: Another sample for "${query}".[](https://example.com/bing2)`;
    // Note: No free Bing API exists; scraping is not viable in frontend.
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();
    if (!inputText.trim()) return;

    const userMessage = { role: "user", text: inputText };
    setConversation([...conversation, userMessage]);
    setInputText("");
    setIsLoading(true);

    try {
      // Get mock AI response
      const aiResponse = getMockAIResponse(inputText);

      // Fetch search results
      const googleResults = await searchGoogle(inputText);
      const bingResults = await searchBing(inputText);
      const ddgResults = await searchDuckDuckGo(inputText);

      // Add all to conversation: AI, Google, Bing, DuckDuckGo
      setConversation([
        ...conversation,
        userMessage,
        { role: "model", text: aiResponse },
        { role: "search", source: "Google", text: googleResults },
        { role: "search", source: "Bing", text: bingResults },
        { role: "search", source: "DuckDuckGo", text: ddgResults }
      ]);
    } catch (error) {
      console.error("Error processing request:", error);
      setConversation([
        ...conversation,
        userMessage,
        { role: "model", text: "Error processing your request." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`ai-chat-container ${isAiChatOpen ? "open" : "closed"} mt-5 p-4 h-[80%] w-[80%] mx-auto bg-green-100 relative max-[500px]:h-[70%]`}>
      <h2 className="ai-heading text-2xl font-bold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-purple-800 capitalize max-[500px]:text-md">
        Welcome to deepChat AI
      </h2>

      <div className="chat-box bg-gray-50 p-4 rounded shadow-inner overflow-y-auto h-[90%] pb-24">
        {conversation.map((msg, index) => (
          <div
            key={index}
            className={`max-[500px]:text-sm message ${msg.role} flex ${msg.role === "user" ? "justify-end" : "justify-start"} mb-4`}
          >
            <div className={`max-w-[75%] p-3 rounded-lg ${msg.role === "user" ? "bg-blue-100 text-right" : "bg-gray-100 text-left"}`}>
              <strong>
                {msg.role === "user" ? "You:" : msg.role === "model" ? "AI:" : `${msg.source} Results:`}
              </strong>
              {Array.isArray(msg.text) ? (
                <ul className="mt-2">
                  {msg.text.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 whitespace-pre-wrap">{msg.text}</p>
              )}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="message model loading flex justify-start mb-4">
            <div className="max-w-[75%] p-3 rounded-lg bg-gray-100 text-left flex items-center">
              <strong className="mr-2">DeepChat:</strong>
              <ReactLoading type="spin" color="black" height={30} width={30} />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="chat-prompt-input flex justify-center bottom-10 left-20 right-0 mx-auto w-[100%] p-4 mt-5 bg-white border-t border-gray-200 shadow-lg border rounded-xl max-[500px]:bottom-3 max-[500px]:p-2">
        <input
          type="text"
          placeholder="Enter a prompt..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ease-in-out max-[500px]:p-1.5"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="p-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 ease-in-out max-[500px]:p-1.5"
        >
          {isLoading ? <BsPauseCircleFill /> : <FaArrowRight />}
        </button>
      </form>
    </div>
  );
};

export default PromptAndResponseApp;