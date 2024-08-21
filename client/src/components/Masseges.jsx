import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";

function Messages() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get("http://localhost:3001/messages", { withCredentials: true });
        if (response.data) {
          setMessages(response.data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []); // Empty dependency array to ensure it only runs once when the component mounts.

  async function handleDone(index) {
    console.log("Button clicked, message index:", index);  // Log to ensure function is called

    const message = messages[index];
    if (!message) {
      console.error("No message found at the given index!");
      return;
    }

    try {
      console.log("Sending POST request to update message status..."); // Log before the request
      const response = await axios.post(
        "http://localhost:3001/update-message-status",
        { messageId: message._id || index },  // Use index or _id if available
        { withCredentials: true }
      );

      console.log("Server response:", response); // Log after the request

      if (response.status === 200) {
        console.log("Before state update:", messages);
        setMessages((prevMessages) =>
          prevMessages.map((msg, i) =>
            i === index ? { ...msg, done: true } : msg
          )
        );
        console.log("Message status updated successfully");
      } else {
        console.error('Failed to update message status:', response.data.message);
      }
    } catch (error) {
      console.error("Error updating message status:", error);
    }
  }

  async function handleDelete() { };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        backgroundColor: "#2E073F",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Header />
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          borderRadius: "6px",
          padding: "20px",
          maxWidth: "700px",
          color: "#fff",
          marginBottom: "20px",
          overflowY: "auto",
          width: "90%", // Ensures responsiveness
          margin: "1rem",
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Your Messages</h1>
        <p style={{ textAlign: "center" }}>Here you will receive your messages</p>

        {messages.length === 0 ? (
          <p>No messages found.</p>
        ) : (
          messages.map((x, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "flex-start",
                marginBottom: "20px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                padding: "15px",
                borderRadius: "6px",
              }}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ891HLuugNKthcStMIQ3VD_phd6XrcYAhkjA&s"
                alt="Profile"
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  marginRight: "20px",
                }}
              />
              <div style={{ flex: 1, textDecoration: x.done ? 'line-through' : null }}>
                <h4>Sender: @{x.senderUsername}</h4>
                <h5>Subject: {x.subject}</h5>
                <h6>Content: {x.body}</h6>
                <div style={{ marginTop: "10px" }}>
                  <button
                    style={{
                      marginRight: "10px",
                      padding: "5px 10px",
                      backgroundColor: "#4CAF50",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={() => handleDone(index)}  // Use index as identifier
                  >
                    Done
                  </button>
                  <button
                    style={{
                      padding: "5px 10px",
                      backgroundColor: "#f44336",
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Messages;
