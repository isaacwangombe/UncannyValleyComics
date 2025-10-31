// src/pages/login/Login.jsx
import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import AuthCard from "../../Components/authcard/AuthCard";
import { apiLogin, apiGoogleLoginRedirect, ensureCsrf } from "../../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ Ensure CSRF cookie exists
  useEffect(() => {
    ensureCsrf().then(() => console.log("CSRF cookie ensured."));
  }, []);

  // ✅ Normal email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await apiLogin(email, password);
      console.log("✅ Logged in:", data);
      window.location.href = "/admin";
    } catch (err) {
      console.error("❌ Login error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Google login redirect
  const handleGoogleLogin = async () => {
    await apiGoogleLoginRedirect();
  };

  return (
    <AuthCard title="Welcome Back">
      <Form onSubmit={handleSubmit}>
        {error && <div className="text-danger mb-3">{error}</div>}

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          variant="dark"
          type="submit"
          className="w-100 mb-3"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign In"}
        </Button>

        <Button
          variant="outline-dark"
          className="w-100 d-flex align-items-center justify-content-center"
          onClick={handleGoogleLogin}
        >
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google"
            width="18"
            className="me-2"
          />
          Sign in with Google
        </Button>
      </Form>
    </AuthCard>
  );
};

export default Login;
