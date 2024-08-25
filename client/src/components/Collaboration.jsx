import React, { useState,useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import AddingCollab from './AddingCollab';


function Collaboration() {
    const [collaborations, setCollaborations] = useState([]);

    const fetchCollaborations = async () => {
        try {
            const response = await axios.get('http://localhost:3001/get-collaborations', { withCredentials: true });
            setCollaborations(response.data.collaborations);
        } catch (error) {
            console.error('Failed to fetch collaborations:', error);
        }
    };

    useEffect(() => {
        fetchCollaborations();
    }, []);

    async function handleDelete(index) {
        try {
          const response = await axios.delete("http://localhost:3001/collab-delete", {
            params: { index: index },
            withCredentials: true
          });
          if (response.status === 200) {
            // Update the local state to remove the deleted message
            setCollaborations(prevCollab => prevCollab.filter((_, i) => i !== index));
          }
        } catch (err) {
          console.error("Error deleting message:", err);
        }
      }

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
                    width: "90%",
                    margin: "1rem",
                }}
            >
                <AddingCollab refreshCollaborations={fetchCollaborations} />
                <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Your collaborations</h1>
                <p style={{ textAlign: "center" }}>Here you will see your collaborations</p>

                {collaborations.length === 0 ? (
                    <p>No collaborations yet.</p>
                ) : (
                    collaborations.map((collab, index) => (
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
                            <div style={{ flex: 1 }}>
                                <h4>Name: {collab.fname + ' ' + collab.lname}</h4>
                                <h5>Username: @{collab.username}</h5>
                                <h6>Email: {collab.mail}</h6>
                                <div style={{ marginTop: "10px" }}>
                                    <button
                                        style={{
                                            padding: "5px 10px",
                                            backgroundColor: "#f44336",
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                        }}
                                       onClick={() => handleDelete(index)}
                                    >
                                        Remove
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

export default Collaboration;
