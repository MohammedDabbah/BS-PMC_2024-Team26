import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header(props) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Development App-AI</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {props.logout && (
            <Nav className="me-auto">
              <Nav.Link href="/Register" className="btn btn-primary">Sign up</Nav.Link>
              <NavDropdown title='Login' id="basic-nav-dropdown">
                <NavDropdown.Item href="/Login">
                  Developer 
                </NavDropdown.Item>
                <NavDropdown.Item href="/Login">
                 Manager 
                </NavDropdown.Item>
                <NavDropdown.Item href="/Login">
                  Tester 
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
