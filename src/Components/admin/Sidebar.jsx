import React from "react";
import { Nav } from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { path: "/admin/dashboard", label: "Dashboard" },
    { path: "/admin/products", label: "Products" },
    { path: "/admin/categories", label: "Categories" },
    { path: "/admin/users", label: "Users" },
    { path: "/admin/orders", label: "Orders" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "200px",
        backgroundColor: "#f8f9fa",
        borderRight: "1px solid #e0e0e0",
        paddingTop: "1rem",
        padding: "2rem",
      }}
    >
      <h5 className="text-center fw-bold mb-4">Admin Panel</h5>
      <Nav className="flex-column">
        {links.map((link) => (
          <Nav.Link
            key={link.path}
            active={location.pathname === link.path}
            onClick={() => navigate(link.path)}
            style={{
              color: location.pathname === link.path ? "#000" : "#555",
              fontWeight: location.pathname === link.path ? "600" : "400",
              padding: "0.75rem 1rem",
            }}
          >
            {link.label}
          </Nav.Link>
        ))}
      </Nav>
    </div>
  );
};

export default Sidebar;
