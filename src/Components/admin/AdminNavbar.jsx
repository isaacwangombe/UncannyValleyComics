// src/components/admin/AdminNavbar.jsx
import React, { useEffect, useState } from "react";
import { Navbar, Container, Spinner, Button, Nav } from "react-bootstrap";

const API_BASE = "http://127.0.0.1:8000/api";

const AdminNavbar = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user info from Django
  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch(`${API_BASE}/auth/user/`, {
          credentials: "include", // send session cookie
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Failed to load user:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/auth/logout/`, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
      window.location.href = "http://127.0.0.1:5173/login";
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <Navbar bg="light" expand="lg" className="border-bottom shadow-sm py-2">
      <Container fluid className="justify-content-between">
        <Navbar.Brand className="fw-bold">🧠 Uncanny Valley Admin</Navbar.Brand>

        <Nav className="align-items-center">
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : user ? (
            <div className="d-flex align-items-center gap-3">
              <div className="text-end">
                <div className="fw-semibold">
                  {user.first_name || user.username || user.email}
                </div>
                <div className="small text-muted">{user.role}</div>
              </div>
              <Button
                variant="outline-dark"
                size="sm"
                onClick={handleLogout}
                className="ms-2"
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-2">
              <span className="text-muted small">Not logged in</span>
              <Button
                variant="dark"
                size="sm"
                onClick={() =>
                  (window.location.href = "http://127.0.0.1:5173/login")
                }
              >
                Login
              </Button>
            </div>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default AdminNavbar;
