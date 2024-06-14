import { Navbar, Nav } from "react-bootstrap";
import "./NavigationBar.css";
import {NavLink} from "react-router-dom";

function NavigationBar() {
  return (
    <Navbar className="navbar-custom"  expand="lg">
      <Navbar.Brand as={NavLink} to="/Home">Web-Chess</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/Home">Home</Nav.Link>
          <Nav.Link as={NavLink} to="/Chessboard">Chessboard</Nav.Link>
          <Nav.Link as={NavLink} to="/AboutUs">About Us</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
