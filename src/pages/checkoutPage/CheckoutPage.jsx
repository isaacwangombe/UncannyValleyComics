import React, { useEffect, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { apiCartCheckout, fetchCurrentUser } from "../../api";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [address, setAddress] = useState({ street: "", city: "", country: "" });
  const [phone, setPhone] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  // ✅ Load current user and prefill name/email
  useEffect(() => {
    const loadUser = async () => {
      try {
        const current = await fetchCurrentUser();
        if (current) {
          setUser(current);
          setFirstName(current.first_name || "");
          setLastName(current.last_name || "");
          setEmail(current.email || "");
        }
      } catch (err) {
        console.warn("⚠️ Could not load user for checkout:", err);
      }
    };
    loadUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        shipping_address: { ...address },
        phone_number: phone,
        user_info: {
          id: user?.id || null,
          first_name: firstName,
          last_name: lastName,
          email: email,
        },
      };

      const data = await apiCartCheckout(payload);
      setMessage(
        `✅ Checkout successful! Order ID: ${data?.order?.id ?? "unknown"}`
      );
      setTimeout(() => navigate("/"), 1800);
    } catch (err) {
      console.error("❌ Checkout failed:", err);
      setMessage(err.message || "Checkout failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: 720 }}>
      <h3 className="mb-4">Checkout</h3>

      <Form onSubmit={handleSubmit}>
        {/* ✅ User Info */}
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Enter your first name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Enter your last name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </Form.Group>

        {/* ✅ Shipping Info */}
        <Form.Group className="mb-3">
          <Form.Label>Street / Address</Form.Label>
          <Form.Control
            value={address.street}
            onChange={(e) => setAddress({ ...address, street: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control
            value={address.city}
            onChange={(e) => setAddress({ ...address, city: e.target.value })}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Control
            value={address.country}
            onChange={(e) =>
              setAddress({ ...address, country: e.target.value })
            }
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button type="submit" variant="dark" disabled={loading}>
            {loading ? "Processing…" : "Pay & Place Order"}
          </Button>
        </div>
      </Form>

      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </Container>
  );
};

export default CheckoutPage;
