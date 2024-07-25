import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LoggedHeader from './LoggedHeader'
import { AuthContext } from "./AuthContext";

function Header(props) {
  const { user} = useContext(AuthContext);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Development App-AI</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {!user? (
            <Nav className="me-auto">
              <Nav.Link href="/Register" className="btn btn-primary">Sign up</Nav.Link>
              <Nav.Link href="/login" className="btn btn-light">Login</Nav.Link>
            </Nav>
          ) : <LoggedHeader/>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
