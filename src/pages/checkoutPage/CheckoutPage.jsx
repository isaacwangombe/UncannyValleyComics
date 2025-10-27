// src/pages/CheckoutPage.jsx
import React, { useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { apiCartCheckout } from "../../api";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const [address, setAddress] = useState({ street: "", city: "", country: "" });
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = { shipping_address: { ...address, phone } };
      const data = await apiCartCheckout(payload);
      setMessage(
        `Checkout successful! Order ID: ${data?.order?.id ?? "unknown"}`
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
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>

        <div className="d-grid gap-2">
          <Button type="submit" variant="dark" disabled={loading}>
            {loading ? "Processing…" : "Pay & Place order"}
          </Button>
        </div>
      </Form>

      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </Container>
  );
};

export default CheckoutPage;
