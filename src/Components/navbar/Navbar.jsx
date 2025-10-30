// src/Components/navbar/Navbar.jsx
import React, { useEffect, useState, useRef } from "react";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
  NavDropdown,
  ListGroup,
  InputGroup,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  fetchCategories,
  fetchProducts,
  fetchCurrentUser,
  logoutUser,
} from "../../api";
import { useCart } from "../../contexts/CartContext";
import logo from "../../assets/UVC.png";
import "./Navbar.css";

const Navbars = () => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const navigate = useNavigate();
  const { openCart } = useCart();
  const wrapperRef = useRef(null);
  const debounceRef = useRef(null);

  /* -------------------- 🧩 Load categories -------------------- */
  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCategories();
        const cats = Array.isArray(data) ? data : data.results || [];
        setCategories(cats);
      } catch (err) {
        console.error("Failed to load categories:", err);
      }
    })();
  }, []);

  /* -------------------- 🧩 Load user -------------------- */
  useEffect(() => {
    (async () => {
      const currentUser = await fetchCurrentUser();
      setUser(currentUser);
      setLoadingUser(false);
    })();
  }, []);

  /* -------------------- 🔐 Logout -------------------- */
  const handleLogout = async () => {
    try {
      await logoutUser();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  /* -------------------- 🧩 Search Suggestions -------------------- */
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!search.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const data = await fetchProducts({ page: 1, q: search });
        const results = Array.isArray(data) ? data : data.results || [];
        setSuggestions(results.slice(0, 8));
        setShowSuggestions(results.length > 0);
      } catch (err) {
        console.error("Error fetching product suggestions:", err);
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(debounceRef.current);
  }, [search]);

  /* -------------------- 🧩 Click outside to close suggestions -------------------- */
  useEffect(() => {
    const handleClick = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  /* -------------------- 🧭 Navigation helpers -------------------- */
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const q = search.trim();
    if (q) navigate(`/store?q=${encodeURIComponent(q)}`);
    else navigate("/store");
    setShowSuggestions(false);
  };

  const goToCategory = (slug) => {
    if (!slug) navigate("/store");
    else navigate(`/store?category=${encodeURIComponent(slug)}`);
  };

  const parentCategories = categories.filter((c) => !c.parent);
  const childrenOf = (parentId) =>
    categories.filter((c) => c.parent === parentId);

  const selectSuggestion = (s) => {
    navigate(`/store?q=${encodeURIComponent(s.title)}`);
    setSearch(s.title);
    setShowSuggestions(false);
  };

  const isStaff = user?.is_staff || user?.is_superuser;
  const userRole =
    user?.role ||
    (user?.is_superuser ? "Owner" : user?.is_staff ? "Staff" : "User");

  return (
    <Navbar expand="lg" bg="white" className="px-3 py-2 underline">
      <Container fluid>
        <Navbar.Brand
          className="order-1 order-lg-2 mx-lg-auto"
          style={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            width="90"
            height="60"
            className="d-inline-block align-top"
            alt="Uncanny Valley Comics"
          />
          <span className="mona-sans-base fs-1">Uncanny Valley Comics</span>
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="main-navbar"
          className="order-2 order-lg-3 ms-auto"
        />

        <Navbar.Collapse id="main-navbar" className="order-3 order-lg-1">
          <Nav className="me-auto inter">
            {parentCategories.map((parent) => {
              const children = childrenOf(parent.id);
              if (!children.length)
                return (
                  <Nav.Link
                    key={parent.id}
                    onClick={() => goToCategory(parent.slug)}
                  >
                    {parent.name}
                  </Nav.Link>
                );
              return (
                <NavDropdown
                  title={parent.name}
                  id={`nav-${parent.id}`}
                  key={parent.id}
                >
                  <NavDropdown.Item onClick={() => goToCategory(parent.slug)}>
                    All {parent.name}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  {children.map((sub) => (
                    <NavDropdown.Item
                      key={sub.id}
                      onClick={() => goToCategory(sub.slug)}
                    >
                      {sub.name}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              );
            })}
            <Nav.Link onClick={() => goToCategory("events")}>
              COMMUNITY
            </Nav.Link>

            {isStaff && (
              <Nav.Link
                onClick={() => navigate("/admin/dashboard")}
                className="fw-bold text-danger"
              >
                ADMIN
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>

        <Navbar.Collapse className="order-4 order-lg-3">
          <Form
            className="d-flex ms-lg-auto mt-2 mt-lg-0 position-relative"
            onSubmit={handleSearchSubmit}
            ref={wrapperRef}
          >
            <InputGroup>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onFocus={() => search.trim() && setShowSuggestions(true)}
              />
              <Button variant="outline-primary" type="submit">
                Search
              </Button>
            </InputGroup>

            <Button
              variant="dark"
              className="ms-2"
              style={{
                width: 44,
                height: 44,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => openCart()}
            >
              Cart
            </Button>

            {showSuggestions && suggestions.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  right: 0,
                  left: 0,
                  zIndex: 1050,
                  background: "white",
                  border: "1px solid rgba(0,0,0,.125)",
                  borderRadius: 4,
                  boxShadow: "0 6px 12px rgba(0,0,0,.175)",
                  maxHeight: 300,
                  overflowY: "auto",
                }}
              >
                <ListGroup variant="flush">
                  {suggestions.map((s, i) => (
                    <ListGroup.Item
                      key={s.id}
                      action
                      onClick={() => selectSuggestion(s)}
                      active={i === activeIndex}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      {s.images?.[0]?.image && (
                        <img
                          src={s.images[0].image}
                          alt={s.title}
                          style={{
                            width: 40,
                            height: 40,
                            objectFit: "cover",
                            borderRadius: 4,
                          }}
                        />
                      )}
                      <div>{s.title}</div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            )}
          </Form>

          <div className="ms-3 d-flex align-items-center">
            {loadingUser ? (
              <Spinner animation="border" size="sm" />
            ) : user ? (
              <div className="d-flex align-items-center gap-2">
                <div className="text-end me-2">
                  <div className="fw-semibold">
                    {user.first_name || user.username || user.email}
                  </div>
                  <div className="small text-muted">{userRole}</div>
                </div>
                <Button variant="outline-dark" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <div className="d-flex align-items-center gap-2">
                <span className="text-muted small">Not logged in</span>
                <Button
                  variant="dark"
                  size="sm"
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
              </div>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbars;
