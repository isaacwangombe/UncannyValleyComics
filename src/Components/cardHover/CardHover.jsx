import React, { useState } from "react";
import "./CardHover.css";
import Button from "react-bootstrap/Button";
import { useCart } from "../../contexts/CartContext";

const formatKES = (v) => {
  if (v === null || v === undefined) return "Kes 0.00";
  return `Kes ${Number(v).toFixed(2)}`;
};

const CardHover = ({ product }) => {
  const imageUrl =
    product?.images?.[0]?.image || "https://via.placeholder.com/400";

  const effectivePrice = product?.discounted_price ?? product?.price ?? 0;
  const hasDiscount =
    product?.discounted_price !== null &&
    product?.discounted_price !== undefined;

  const { addItem } = useCart();

  const [adding, setAdding] = useState(false);
  const [addedMsg, setAddedMsg] = useState("");

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      await addItem({ product_id: product.id, quantity: 1 });
      setAddedMsg("Added to cart");
      // hide message after 1.2s
      setTimeout(() => setAddedMsg(""), 1200);
    } catch (err) {
      console.error("Add to cart failed", err);
      setAddedMsg("Failed to add");
      setTimeout(() => setAddedMsg(""), 1500);
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="card">
      <div className="image">
        <img src={imageUrl} alt={product.title} />
      </div>
      <div className="details">
        <div className="center">
          <h1>{product.title}</h1>
          <p>{product.description?.slice(0, 500)}...</p>
          <p>
            {hasDiscount ? (
              <>
                <span
                  style={{
                    textDecoration: "line-through",
                    opacity: 0.7,
                    marginRight: 8,
                  }}
                >
                  {formatKES(product.price)}
                </span>
                <span style={{ fontWeight: 700 }}>
                  {formatKES(effectivePrice)}
                </span>
              </>
            ) : (
              <span style={{ fontWeight: 700 }}>
                {formatKES(effectivePrice)}
              </span>
            )}
          </p>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <Button
              variant="dark"
              size="lg"
              className="btn-trending"
              onClick={handleAddToCart}
              disabled={adding}
            >
              {adding ? "Adding…" : "Add to Cart"}
            </Button>

            {addedMsg && (
              <div
                style={{
                  marginLeft: 8,
                  color: addedMsg.startsWith("Added") ? "green" : "crimson",
                }}
              >
                {addedMsg}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardHover;
