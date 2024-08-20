import React from "react";
import Header from "./Header";

function Messages() {
  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundColor:'#2E073F',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center', // optional: set the background color for the entire page
      }}
    >
     <Header/>
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '6px',
          padding: '20px',
          maxWidth: '700px',
          color: '#fff',
          marginBottom: '20px',
          overflowY: 'auto',
          width: '100%', // ensures it remains responsive
          margin:'1rem'
        }}
      >
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Your Messages</h1>
        <p style={{ textAlign: 'center' }}>Here you will receive your messages</p>

        {/* First Message */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '15px',
            borderRadius: '6px',
          }}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ891HLuugNKthcStMIQ3VD_phd6XrcYAhkjA&s"
            alt="Profile"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              marginRight: '20px',
            }}
          />
          <div style={{ flex: 1 }}>
            <h4>Sender: @username</h4>
            <h5>Subject: Build a function in C++</h5>
            <h6>Content: Provide more details...</h6>
            <div style={{ marginTop: '10px' }}>
              <button
                style={{
                  marginRight: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Done
              </button>
              <button
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#f44336',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Second Message */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            marginBottom: '20px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            padding: '15px',
            borderRadius: '6px',
          }}
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ891HLuugNKthcStMIQ3VD_phd6XrcYAhkjA&s"
            alt="Profile"
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              marginRight: '20px',
            }}
          />
          <div style={{ flex: 1 }}>
            <h4>Sender: @username</h4>
            <h5>Subject: Build a function in C++</h5>
            <h6>Content: Provide more details...</h6>
            <div style={{ marginTop: '10px' }}>
              <button
                style={{
                  marginRight: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#4CAF50',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Done
              </button>
              <button
                style={{
                  padding: '5px 10px',
                  backgroundColor: '#f44336',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;
