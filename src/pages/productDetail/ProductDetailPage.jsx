import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Spinner, Badge } from "react-bootstrap";
import { fetchProducts, fetchProductById, apiAddCartItem } from "../../api";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_API_URL_SHORT;

  useEffect(() => {
    window.scrollTo(0, 0);
    setQuantity(1); // ✅ Reset quantity when switching product
    loadData();
  }, [id]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prod, all] = await Promise.all([
        fetchProductById(id),
        fetchProducts(),
      ]);

      const cleanProduct = {
        ...prod,
        price: parseFloat(prod.price) || 0,
        discounted_price: parseFloat(prod.discounted_price) || 0,
        cost: parseFloat(prod.cost) || 0,
      };

      setProduct(cleanProduct);
      setProducts(all.results || all);

      if (prod.images?.length) {
        setMainImage(resolveImageUrl(prod.images[0]));
      }

      generateRecommendations(prod, all.results || all);
    } catch (err) {
      console.error("❌ Failed to load product details:", err);
    } finally {
      setLoading(false);
    }
  };

  const resolveImageUrl = (img) => {
    if (!img) return null;
    if (typeof img === "string") {
      return img.startsWith("http") ? img : backendUrl + img;
    }
    if (typeof img.image === "string") {
      return img.image.startsWith("http") ? img.image : backendUrl + img.image;
    }
    return img.image?.url ? img.image.url : null;
  };

  const handleAddToCart = async () => {
    try {
      await apiAddCartItem(product.id, quantity);
      alert("✅ Added to cart!");
      setQuantity(1); // ✅ Reset quantity after adding to cart
    } catch (err) {
      console.error("❌ Failed to add to cart:", err);
      alert("Failed to add item to cart");
    }
  };

  const generateRecommendations = (current, all) => {
    if (!current) return [];

    // 1️⃣ same subcategory
    let recs = all.filter(
      (p) => p.id !== current.id && p.category === current.category
    );

    // 2️⃣ same parent category
    if (recs.length < 3 && current.category_obj?.parent) {
      const sameParent = all.filter(
        (p) =>
          p.id !== current.id &&
          p.category_obj?.parent === current.category_obj?.parent
      );
      recs = [...recs, ...sameParent];
    }

    // 3️⃣ similar title word
    if (recs.length < 3) {
      const word = current.title.split(" ")[0].toLowerCase();
      const nameRecs = all.filter(
        (p) => p.id !== current.id && p.title.toLowerCase().includes(word)
      );
      recs = [...recs, ...nameRecs];
    }

    // Deduplicate & limit to 3
    const unique = Array.from(new Map(recs.map((p) => [p.id, p])).values());
    setRecommended(unique.slice(0, 3));
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-5 text-muted">Product not found.</div>
    );
  }

  const effectivePrice =
    product.discounted_price && product.discounted_price > 0
      ? product.discounted_price
      : product.price;

  return (
    <Container className="py-5">
      <Button
        variant="link"
        onClick={() => navigate(-1)}
        className="mb-3 text-decoration-none"
      >
        ← Back
      </Button>

      <Row className="align-items-start">
        {/* LEFT COLUMN: IMAGE + THUMBNAILS */}
        <Col md={6}>
          <div
            className="mb-3 text-center border rounded p-2"
            style={{ background: "#fafafa" }}
          >
            {mainImage ? (
              <img
                src={mainImage}
                alt={product.title}
                style={{
                  width: "100%",
                  height: "400px",
                  objectFit: "contain",
                  borderRadius: "12px",
                }}
              />
            ) : (
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ height: "400px", background: "#eee" }}
              >
                No Image
              </div>
            )}
          </div>

          {/* THUMBNAILS */}
          {product.images?.length > 1 && (
            <div className="d-flex justify-content-center align-items-center gap-2">
              <Button
                variant="light"
                size="sm"
                onClick={() => {
                  const currentIndex = product.images.findIndex(
                    (img) => resolveImageUrl(img) === mainImage
                  );
                  const prevIndex =
                    (currentIndex - 1 + product.images.length) %
                    product.images.length;
                  setMainImage(resolveImageUrl(product.images[prevIndex]));
                }}
              >
                <ChevronLeft size={16} />
              </Button>

              <div
                className="d-flex overflow-auto px-2"
                style={{ gap: "8px", maxWidth: "85%" }}
              >
                {product.images.map((img, i) => {
                  const url = resolveImageUrl(img);
                  return (
                    <div
                      key={i}
                      onClick={() => setMainImage(url)}
                      style={{
                        border:
                          url === mainImage
                            ? "2px solid #007bff"
                            : "1px solid #ccc",
                        borderRadius: "8px",
                        overflow: "hidden",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        src={url}
                        alt="thumb"
                        style={{
                          width: "80px",
                          height: "80px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  );
                })}
              </div>

              <Button
                variant="light"
                size="sm"
                onClick={() => {
                  const currentIndex = product.images.findIndex(
                    (img) => resolveImageUrl(img) === mainImage
                  );
                  const nextIndex = (currentIndex + 1) % product.images.length;
                  setMainImage(resolveImageUrl(product.images[nextIndex]));
                }}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          )}
        </Col>

        {/* RIGHT COLUMN: DETAILS */}
        <Col md={6}>
          <h3 className="fw-bold">{product.title}</h3>

          {product.discounted_price > 0 &&
          product.discounted_price < product.price ? (
            <div className="mb-2">
              <h4 className="text-danger mb-0">
                ${product.discounted_price.toFixed(2)}
              </h4>
              <small className="text-muted text-decoration-line-through">
                ${product.price.toFixed(2)}
              </small>
            </div>
          ) : (
            <h4 className="mb-2">${product.price.toFixed(2)}</h4>
          )}

          {product.stock > 0 ? (
            <Badge bg="success" className="mb-2">
              In Stock
            </Badge>
          ) : (
            <Badge bg="secondary" className="mb-2">
              Out of Stock
            </Badge>
          )}

          <p className="mt-3">{product.description}</p>

          {/* ✅ QUANTITY + ADD TO CART */}
          <div className="d-flex align-items-center mb-4 mt-4">
            <Button
              variant="light"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            >
              −
            </Button>

            <div
              className="px-3 py-1 border mx-2 rounded"
              style={{ minWidth: "50px", textAlign: "center" }}
            >
              {quantity}
            </div>

            <Button variant="light" onClick={() => setQuantity((q) => q + 1)}>
              +
            </Button>

            <Button
              className="ms-3"
              variant="primary"
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
            >
              Add to Cart
            </Button>
          </div>

          <p>
            <strong>Category:</strong>{" "}
            {product.category_obj?.parent_name || "—"}
          </p>
          <p>
            <strong>Subcategory:</strong> {product.category_obj?.name || "—"}
          </p>
        </Col>
      </Row>

      {/* Recommended Items */}
      <hr className="my-5" />
      <h5 className="mb-4">Recommended for You</h5>
      <Row>
        {recommended.length ? (
          recommended.map((rec) => {
            const imgUrl = resolveImageUrl(rec.images?.[0]);
            const recEffective =
              parseFloat(
                rec.discounted_price && rec.discounted_price > 0
                  ? rec.discounted_price
                  : rec.price
              ) || 0;
            return (
              <Col key={rec.id} md={4} sm={6} xs={12} className="mb-4">
                <div
                  className="card h-100 shadow-sm"
                  style={{ cursor: "pointer", transition: "0.2s" }}
                  onClick={() => navigate(`/product/${rec.id}`)}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.02)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1.0)")
                  }
                >
                  {imgUrl && (
                    <img
                      src={imgUrl}
                      className="card-img-top"
                      style={{
                        height: "220px",
                        objectFit: "cover",
                      }}
                      alt={rec.title}
                    />
                  )}
                  <div className="card-body">
                    <h6 className="card-title">{rec.title}</h6>
                    <p className="mb-1 text-muted">
                      ${recEffective.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Col>
            );
          })
        ) : (
          <p className="text-muted">No recommendations available.</p>
        )}
      </Row>
    </Container>
  );
};

export default ProductDetailPage;
