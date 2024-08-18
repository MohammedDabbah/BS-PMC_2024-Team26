import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import SendIcon from "@mui/icons-material/Send";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";

function AI_assistant() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  // Load messages and input from cookies when the component mounts
  useEffect(() => {
    const savedMessages = Cookies.get("chatMessages");
    // const savedInput = Cookies.get("chatInput");

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    // if (savedInput) {
    //   setInput(savedInput);
    // }
  },[]);

  // Save messages and input to cookies whenever they update


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (input.trim() === "") return;

    const newMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setInput(""); // Clear the input field immediately after submitting

    try {
      const response = await axios.post("http://localhost:3001/api/completions", {
        prompt: input,
      });

      const aiMessage = { text: response.data.text.trim(), sender: "ai" };
      setMessages((prevMessages) => [...prevMessages, aiMessage]);
    } catch (error) {
      console.error("Error getting response from AI:", error);
      const errorMessage = { text: "Sorry, there was an error processing your request.", sender: "ai" };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  const formatMessageText = (text) => {
    if (!text) return ""; // If the text is undefined or empty, return an empty string

    let formattedText = text.replace(/\n/g, "<br />");
    formattedText = formattedText.replace(/;/g, "<br />").replace(/\./g, "<br />");
    return formattedText;
  };

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      <h1>
        Use AI to help in your task <TipsAndUpdatesIcon fontSize="large" />
      </h1>
      <div
        style={{
          maxHeight: "400px",
          overflowY: "auto",
          marginBottom: "20px",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "20px",
          backgroundColor: "#f9f9f9",
        }}
      >
        {messages.length === 0 && <p style={{ fontStyle: "italic", color: "#888" }}>No messages yet!</p>}
        {messages.map((message, index) => (
          <div
            key={index}
            style={{
              textAlign: message.sender === "user" ? "right" : "left",
              margin: "10px 0",
              display: "flex",
              justifyContent: message.sender === "user" ? "flex-end" : "flex-start",
            }}
          >
            <span
              style={{
                background: message.sender === "user" ? "#17b16b" : "#ff828d",
                padding: "10px 15px",
                borderRadius: "20px",
                maxWidth: "70%",
                textAlign: "left",
                fontSize: "16px",
                lineHeight: "1.5",
                wordWrap: "break-word",
              }}
              dangerouslySetInnerHTML={{ __html: formatMessageText(message.text) }}
            />
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", justifyContent: "center" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
          style={{
            padding: "10px",
            width: "70%",
            marginRight: "10px",
            borderRadius: "15px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          onClick={  useEffect(() => {
    Cookies.set("chatMessages", JSON.stringify(messages), { expires: 1 }); // Cookie expires in 7 days
    // Cookies.set("chatInput", input, { expires: 7 });
  }, [messages, input])}
          style={{
            padding: "10px",
            width: "20%",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          Send <SendIcon />
        </button>
      </form>
    </div>
  );
}

export default AI_assistant;
