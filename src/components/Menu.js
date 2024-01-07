import axios from "axios";
import { useEffect, useState } from "react";
import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { Navigate } from "react-router-dom";


export default function Menu() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLogout, setIsLogout] = useState(false)

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.get("/users/check-auth");
        if (response.data.success) {
          setAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };
    checkAuthentication();
  }, []);

  async function handleLogout(e) {
    e.preventDefault();
    await axios.post('users/logout')
    setAuthenticated(false)
    setIsLogout(true)
}

if (isLogout){
  return <Navigate to={'/login'} />
}

  return (
    <>
      <Navbar
        expand="lg"
        className="bg-body-tertiary"
        bg="primary"
        data-bs-theme="dark"
        sticky="top"
      >
        <Container>
          <Navbar.Brand href="#home">Messages</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="/feeds">Feeds</Nav.Link>
              {authenticated ? (
                <>
                  <NavDropdown title="Messages" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/create-message">
                      Create
                    </NavDropdown.Item>
                    <NavDropdown.Item href="/edit-message">
                      Edit
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.3">
                      Delete
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      Manage messages
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link href="/account">Account</Nav.Link>

                  <Nav.Link  onClick={handleLogout}>Log out</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/signup">Sign up</Nav.Link>
                  <Nav.Link href="/login">Log in</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
