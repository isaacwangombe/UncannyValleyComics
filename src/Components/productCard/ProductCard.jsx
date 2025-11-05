import React from "react";
import { Card, Button } from "react-bootstrap";
import { useCart } from "../../contexts/CartContext";
import "./productCard.css";

const formatKES = (v) => {
  if (v === null || v === undefined) return "Kes 0.00";
  return `Kes ${Number(v).toFixed(2)}`;
};

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const imageUrl = product.images?.length ? product.images[0].image : null;
  const effectivePrice = product.discounted_price ?? product.price ?? "0.00";
  const hasDiscount =
    product.discounted_price !== null && product.discounted_price !== undefined;

  return (
    <div className="card_container">
      <a
        href="#"
        className="card product_card"
        onClick={(e) => e.preventDefault()}
      >
        <img
          src={
            imageUrl
              ? imageUrl
              : "https://cdn.shopify.com/s/files/1/0743/0032/6179/files/22B77C0F-7215-492D-9DAF-2F2AB22323E9.jpg?v=1757157725"
          }
          className="card__image"
          alt=""
        />
        <div className="card__overlay">
          <div className="card__header">
            <svg className="card__arc" xmlns="http://www.w3.org/2000/svg">
              <path />
            </svg>

            <div className="card__header-text">
              <h3 className="card__title">{product.title}</h3>
              <span className="card__status">
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
              </span>
            </div>
          </div>
          <div className="card__description">
            <p className="line-clamp">{product.description}</p>
            <div>
              <Button
                variant="dark"
                size="sm"
                onClick={() => addItem({ product_id: product.id, quantity: 1 })}
              >
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

export default ProductCard;
