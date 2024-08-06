import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from "./Header";
import Table from 'react-bootstrap/Table'; // Using react-bootstrap Table component

function DeveloperDetailsPage() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/developers', { withCredentials: true });
        if (response.status === 200) {
          setDevelopers(response.data);
        } else {
          setError('Failed to fetch developers');
        }
      } catch (error) {
        setError('Error fetching developers');
        console.error('Error fetching developers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDevelopers();
  }, []);

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="proP">
      <Header />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {developers.map(developer => (
            <tr key={developer._id}>
              <td>{developer.fname}</td>
              <td>{developer.lname}</td>
              <td>{developer.username}</td>
              <td>{developer.mail}</td>
              <td>{developer.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <button onClick={handleGoBack} className="btn btn-secondary">Go Back</button>
    </div>
  );
}

export default DeveloperDetailsPage;
