
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Header from "./Header";

function TesterDetailsPage() {
  const [testers, setTesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTesters = async () => {
      try {
        const response = await axios.get('http://localhost:3001/testers', { withCredentials: true });
        if (response.status === 200) {
          setTesters(response.data);
        } else {
          setError('Failed to fetch testers');
        }
      } catch (error) {
        setError('Error fetching testers');
        console.error('Error fetching testers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTesters();
  }, []);

  const handleGoBack = () => {
    navigate(-1); 
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
          {testers.map(tester => (
            <tr key={tester._id}>
              <td>{tester.fname}</td>
              <td>{tester.lname}</td>
              <td>{tester.username}</td>
              <td>{tester.mail}</td>
              <td>{tester.role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <button onClick={handleGoBack} className="btn btn-secondary">Go Back</button>
    </div>
  );
}

export default TesterDetailsPage;
