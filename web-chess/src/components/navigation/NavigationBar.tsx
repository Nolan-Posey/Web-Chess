import { Navbar, Nav } from "react-bootstrap";
import "./NavigationBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";

function NavigationBar() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  return (
    <Navbar className="navbar-custom" expand="lg">
      <Navbar.Brand as={NavLink} to="/Home">
        Web-Chess
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/Home">
            Home
          </Nav.Link>
          <Nav.Link as={NavLink} to="/Chessboard">
            Chessboard
          </Nav.Link>
          <Nav.Link as={NavLink} to="/AboutUs">
            About Us
          </Nav.Link>
        </Nav>
        <Nav className="navbar-right">
          {currentUser ? (
            <>
              <Nav.Link disabled className="navbar-text">Hello, {currentUser.email}</Nav.Link>
              <Nav.Link onClick={handleLogout} className="navbar-link-red">Logout</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link as={NavLink} to="/login" className="navbar-link-green">
                Login
              </Nav.Link>
              <Nav.Link as={NavLink} to="/signup" className="navbar-link-green">
                Signup
              </Nav.Link>
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
