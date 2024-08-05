import React, { useState, useEffect, useRef } from "react";
import "./Home.css";
import { sendUserInputToOpenAI } from "./OpenAI";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  // Refs to chat container and chat messages
  const chatContainerRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const [isWaitingForBot, setIsWaitingForBot] = useState(false);

  // Function to handle user message submission
  const handleSearch = async () => {
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery && !isWaitingForBot) {
      const userMessage = { sender: "You", content: trimmedQuery };
      setChatMessages((prevMessages) => [...prevMessages, userMessage]);
      setIsWaitingForBot(true);

      try {
        const openAIResponse = await sendUserInputToOpenAI(trimmedQuery);
        const fitNavResponse = { sender: "FitNav", text: openAIResponse };
        setChatMessages((prevMessages) => [...prevMessages, fitNavResponse]);
      } catch (error) {
        console.error("Error fetching response from OpenAI:", error);
      } finally {
        setIsWaitingForBot(false);
      }

      setSearchQuery("");
    }
  };

  // Function to handle input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Effect to display FitNav's initial message
  useEffect(() => {
    if (chatMessages.length === 0) {
      const initialMessage = {
        sender: "FitNav",
        text: "Hello, since the free trial is over I won't be able to assist you today. Have a nice day!",
      };
      setChatMessages([initialMessage]);
    }
  }, [chatMessages.length]);

  // Effect to auto-scroll to the last message
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    const chatMessagesDiv = chatMessagesRef.current;

    chatContainer.scrollTop = chatMessagesDiv.scrollHeight;
  }, [chatMessages]);

  return (
    <section className="home">
      <div className="chat-container" ref={chatContainerRef}>
        <div className="chat-messages" ref={chatMessagesRef}>
          {chatMessages.map((message, index) => (
            <div className={`chat-message ${message.sender}`} key={index}>
              <span className="message-sender">
                {message.sender === "FitNav" ? "FitNav: " : "You: "}
              </span>
              <p className="message-text">{message.content}</p>
              <p className="message-text">{message.text}</p>
              <br />
            </div>
          ))}
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Type your question..."
            value={searchQuery}
            onChange={handleInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
          <button onClick={handleSearch}>Send</button>
        </div>
      </div>
    </section>
  );
}

export default Home;
