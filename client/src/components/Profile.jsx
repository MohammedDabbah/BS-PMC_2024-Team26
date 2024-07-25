import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import UndoIcon from '@mui/icons-material/Undo';
import Header from "./Header";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:3001/profile', { withCredentials: true });
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="proP">
      <Header />
      <Card style={{ width: '20rem', textAlign: 'center' }} className="profile">
        <Card.Img variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ891HLuugNKthcStMIQ3VD_phd6XrcYAhkjA&s" />
        <Card.Body>
          <Card.Title>{data.fname} {data.lname}</Card.Title>
          <Card.Text>
           <p>username: {data.username}</p>
           <p>your email: {data.mail}</p>
           <label>your role: {data.role}</label>
          </Card.Text>
        </Card.Body>
        <Card.Body>
          <Card.Link href="/ChangePassword" className="btn bt" style={{ color: 'blue', marginRight: '1rem' }}>Change Password</Card.Link>
          <button onClick={handleGoBack} className="btn bt"><UndoIcon style={{ color: 'red' }} /></button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Profile;
