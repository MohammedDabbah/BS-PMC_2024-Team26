import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoggedHeader from './LoggedHeader';
import { AuthContext } from "./AuthContext";


function Header(props) {
  const { user } = useContext(AuthContext);

  const navbarStyle = {
    borderRadius: '5px', // Adjust this value to control the roundness of the corners
    overflow: 'hidden', // This ensures the rounded corners are properly applied
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={navbarStyle}>
      <Container>
        <Navbar.Brand href="/">Development App-AI</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {!user ? (
            <Nav className="me-auto">
              <Nav.Link href="/Register" className="btn btn-primary">Sign up</Nav.Link>
              <Nav.Link href="/login" className="btn btn-light">Login</Nav.Link>
            </Nav>
          ) : <LoggedHeader />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

