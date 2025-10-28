import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import AuthCard from "../../Components/authcard/AuthCard";

const backendUrl = process.env.REACT_APP_API_URL_SHORT;
const googleLoginUrl = backendUrl + `/accounts/google/login/`;

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ 1. Fetch CSRF cookie on load
  useEffect(() => {
    fetch(`${backendUrl}/api/users/set-csrf/`, {
      credentials: "include",
    }).then(() => console.log("CSRF cookie set."));
  }, []);

  const getCookie = (name) => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith(name + "="));
    return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
  };

  // ✅ 2. Normal email/password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const csrfToken = getCookie("csrftoken");

    try {
      const res = await fetch(`${backendUrl}/api/auth/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.non_field_errors?.[0] || "Login failed");
      }

      const data = await res.json();
      console.log("✅ Logged in:", data);
      window.location.href = "/admin";
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ 3. Google login via redirect (NOT fetch)
  const handleGoogleLogin = async () => {
    await fetch(`${backendUrl}/api/users/set-csrf/`, {
      credentials: "include",
    });
    window.location.href = `${googleLoginUrl}?process=login`;
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
