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
              <NavDropdown title='Login'id="basic-nav-dropdown">
                <NavDropdown.Item href="/login">
                  Developer 
                </NavDropdown.Item>
                <NavDropdown.Item href="/login">
                 Manager 
                </NavDropdown.Item>
                <NavDropdown.Item href="/login">
                  Tester 
                </NavDropdown.Item>
                {/* Uncomment and use the following items if needed */}
                {/* <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
              </NavDropdown>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;