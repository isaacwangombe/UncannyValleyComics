import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Modal,
  Table,
  Row,
  Col,
  Spinner,
  Badge,
} from "react-bootstrap";
import { fetchProducts, fetchCategories } from "../../api";
import {
  apiAddProduct,
  apiEditProduct,
  uploadProductImage,
  deleteProductImage,
  toggleProductTrending,
  bulkUploadProducts,
} from "../../apiAdmin";

function getCookie(name) {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return cookieValue ? decodeURIComponent(cookieValue.split("=")[1]) : null;
}

const ProductsAdminPage = () => {
  const [products, setProducts] = useState([]);
  const [expandedImage, setExpandedImage] = useState(null);
  const [categories, setCategories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [excelFile, setExcelFile] = useState(null);
  const [zipFile, setZipFile] = useState(null);

  const [search, setSearch] = useState("");
  const [mainFilter, setMainFilter] = useState("");
  const [subFilter, setSubFilter] = useState("");
  const [stockFilter, setStockFilter] = useState("");
  const [sortField, setSortField] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");
  const [trendingFilter, setTrendingFilter] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mainCategory: "",
    category: "",
    price: "",
    stock: "",
    is_active: true,
  });

  const backendUrl = import.meta.env.VITE_API_URL_SHORT;

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
      ]);
      setProducts(prodRes.results || prodRes);
      setCategories(catRes);

      const parents = catRes.filter((c) => c.parent === null);
      const children = catRes.filter((c) => c.parent !== null);
      setMainCategories(parents);
      setSubCategories(children);
    } catch (err) {
      console.error("Failed to load data:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products
    .filter((p) => {
      const sub = categories.find((c) => c.id === p.category);
      const main = categories.find((c) => c.id === sub?.parent);
      return (
        (!mainFilter || main?.id === parseInt(mainFilter)) &&
        (!subFilter || sub?.id === parseInt(subFilter)) &&
        (!stockFilter || (stockFilter === "in" ? p.stock > 0 : p.stock <= 0)) &&
        (!search ||
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.description?.toLowerCase().includes(search.toLowerCase())) &&
        (!trendingFilter ||
          (trendingFilter === "true" && !!p.trending) ||
          (trendingFilter === "false" && !p.trending))
      );
    })
    .sort((a, b) => {
      if (!sortField) return 0;
      let valA = a[sortField];
      let valB = b[sortField];
      if (sortField === "title") {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      } else {
        valA = parseFloat(valA);
        valB = parseFloat(valB);
      }
      return sortDirection === "asc"
        ? valA > valB
          ? 1
          : -1
        : valA < valB
        ? 1
        : -1;
    });

  const handleEdit = (p) => {
    const subCat = categories.find((c) => c.id === p.category);
    const mainCat = subCat?.parent || "";
    setSelectedProduct(p);
    setFormData({
      id: p.id,
      title: p.title,
      description: p.description,
      mainCategory: mainCat,
      category: p.category,
      price: p.price,
      stock: p.stock,
      is_active: p.is_active,
    });
    setSelectedImages([]);
    setShowEditModal(true);
  };

  const handleAddNew = () => {
    setSelectedProduct(null);
    setFormData({
      title: "",
      description: "",
      mainCategory: "",
      category: "",
      price: "",
      stock: "",
      is_active: true,
    });
    setSelectedImages([]);
    setShowEditModal(true);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const handleSave = async () => {
    try {
      const payload = { ...formData, category: formData.category };
      let product;
      if (formData.id) {
        product = await apiEditProduct(formData.id, payload);
      } else {
        product = await apiAddProduct(payload);
      }

      for (const file of selectedImages) {
        await uploadProductImage(product.id || formData.id, file);
      }

      setShowEditModal(false);
      loadData();
    } catch (err) {
      console.error("Save failed:", err);
    }
  };

  const handleBulkUpload = async () => {
    try {
      if (!excelFile) {
        alert("Please select an Excel file first.");
        return;
      }

      const data = await bulkUploadProducts(excelFile, zipFile);
      alert(data.message || "Upload completed successfully.");
    } catch (err) {
      console.error("❌ Bulk upload failed:", err);
      alert("Upload failed: " + err.message);
    }
  };

  return (
    <Container className="py-4">
      {/* Header */}
      <Row className="align-items-center mb-3">
        <Col>
          <h4>Products</h4>
        </Col>
        <Col className="text-end">
          <Button onClick={handleAddNew}>+ Add Product</Button>
        </Col>
        <Col className="text-end">
          <Form.Group className="mb-3">
            <Form.Label>Excel File (.xlsx)</Form.Label>
            <Form.Control
              type="file"
              accept=".xlsx"
              onChange={(e) => setExcelFile(e.target.files[0])}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>ZIP of Images (optional)</Form.Label>
            <Form.Control
              type="file"
              accept=".zip"
              onChange={(e) => setZipFile(e.target.files[0])}
            />
          </Form.Group>

          <Button onClick={handleBulkUpload}>Upload Products</Button>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-3 g-2">
        <Col md={3}>
          <Form.Control
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Col>
        <Col md={2}>
          <Form.Select
            value={mainFilter}
            onChange={(e) => {
              setMainFilter(e.target.value);
              setSubFilter("");
            }}
          >
            <option value="">All Main Categories</option>
            {mainCategories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select
            value={subFilter}
            onChange={(e) => setSubFilter(e.target.value)}
          >
            <option value="">All Subcategories</option>
            {subCategories
              .filter((s) => !mainFilter || s.parent === parseInt(mainFilter))
              .map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
          >
            <option value="">All Stock</option>
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
          </Form.Select>
        </Col>
        <Col md={2}>
          <Form.Select
            value={trendingFilter}
            onChange={(e) => setTrendingFilter(e.target.value)}
          >
            <option value="">All Products</option>
            <option value="true">Trending</option>
            <option value="false">Not Trending</option>
          </Form.Select>
        </Col>
        <Col md={3}>
          <Form.Select
            value={sortField + "-" + sortDirection}
            onChange={(e) => {
              const [field, dir] = e.target.value.split("-");
              setSortField(field);
              setSortDirection(dir);
            }}
          >
            <option value="title-asc">Title A→Z</option>
            <option value="title-desc">Title Z→A</option>
            <option value="price-asc">Price Low→High</option>
            <option value="price-desc">Price High→Low</option>
            <option value="stock-asc">Stock Low→High</option>
            <option value="stock-desc">Stock High→Low</option>
          </Form.Select>
        </Col>
      </Row>

      {/* Product Table */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Main Category</th>
              <th>Subcategory</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Trending</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length ? (
              filteredProducts.map((p) => {
                const sub = categories.find((c) => c.id === p.category);
                const main = categories.find((c) => c.id === sub?.parent);
                return (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.title}</td>
                    <td>{main?.name || "—"}</td>
                    <td>{sub?.name || "—"}</td>
                    <td>${p.price}</td>
                    <td>{p.stock}</td>
                    <td>
                      {p.is_active ? (
                        <Badge bg="success">Active</Badge>
                      ) : (
                        <Badge bg="secondary">Inactive</Badge>
                      )}
                    </td>
                    <td className="text-center">
                      <Form.Check
                        type="switch"
                        checked={p.trending}
                        onChange={async () => {
                          try {
                            const res = await toggleProductTrending(p.id);
                            setProducts((prev) =>
                              prev.map((prod) =>
                                prod.id === res.id
                                  ? { ...prod, trending: res.trending }
                                  : prod
                              )
                            );
                          } catch (err) {
                            console.error("❌ Failed to toggle trending:", err);
                          }
                        }}
                      />
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant="outline-primary"
                        className="me-2"
                        onClick={() => handleViewDetails(p)}
                      >
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={8} className="text-center text-muted">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}

      {/* --- View Details Modal --- */}
      <Modal
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Product Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <>
              <h4 className="fw-semibold mb-3">{selectedProduct.title}</h4>
              <p className="text-muted mb-4">
                {selectedProduct.description || "No description provided."}
              </p>

              <Row>
                <Col md={6}>
                  <p>
                    <strong>Main Category:</strong>{" "}
                    {
                      categories.find(
                        (c) =>
                          c.id ===
                          categories.find(
                            (x) => x.id === selectedProduct.category
                          )?.parent
                      )?.name
                    }
                  </p>
                  <p>
                    <strong>Subcategory:</strong>{" "}
                    {
                      categories.find((c) => c.id === selectedProduct.category)
                        ?.name
                    }
                  </p>
                </Col>
                <Col md={6}>
                  <p>
                    <strong>Price:</strong> ${selectedProduct.price}
                  </p>
                  <p>
                    <strong>Stock:</strong> {selectedProduct.stock}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    {selectedProduct.is_active ? (
                      <Badge bg="success">Active</Badge>
                    ) : (
                      <Badge bg="secondary">Inactive</Badge>
                    )}
                  </p>
                </Col>
              </Row>

              <hr />
              <h6>Images</h6>
              {console.log("🖼️ Product images:", selectedProduct.images)}

              {selectedProduct.images?.length ? (
                <Row>
                  {selectedProduct.images.map((img) => {
                    let imageUrl = "";
                    if (typeof img.image === "string") {
                      imageUrl = img.image.startsWith("http")
                        ? img.image
                        : backendUrl + `${img.image}`;
                    } else if (img.image?.url) {
                      imageUrl = img.image.url;
                    }
                    return (
                      <Col
                        key={img.id}
                        md={3}
                        sm={4}
                        xs={6}
                        className="mb-3"
                        onClick={() => setExpandedImage(imageUrl)}
                        style={{ cursor: "pointer" }}
                      >
                        {imageUrl && (
                          <img
                            src={imageUrl}
                            alt={img.alt || "Product image"}
                            loading="lazy"
                            style={{
                              width: "100%",
                              height: "120px",
                              objectFit: "cover",
                              borderRadius: "8px",
                              border: "1px solid #ddd",
                            }}
                          />
                        )}
                      </Col>
                    );
                  })}
                </Row>
              ) : (
                <p className="text-muted">No images uploaded.</p>
              )}
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* --- Fullscreen Image Modal --- */}
      <Modal
        show={!!expandedImage}
        onHide={() => setExpandedImage(null)}
        centered
        size="xl"
        contentClassName="bg-transparent border-0 shadow-none"
      >
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            minHeight: "90vh",
            background: "rgba(0,0,0,0.9)",
            borderRadius: "12px",
          }}
          onClick={() => setExpandedImage(null)}
        >
          <Button
            variant="light"
            size="sm"
            className="position-absolute top-0 end-0 m-3"
            onClick={() => setExpandedImage(null)}
          >
            ×
          </Button>
          {expandedImage && (
            <img
              src={expandedImage}
              alt="Expanded"
              style={{
                maxWidth: "95%",
                maxHeight: "90vh",
                borderRadius: "12px",
                boxShadow: "0 0 20px rgba(255,255,255,0.2)",
              }}
            />
          )}
        </div>
      </Modal>

      {/* --- Add/Edit Modal --- */}
      <Modal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {formData.id ? "Edit Product" : "Add New Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </Form.Group>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Main Category</Form.Label>
                  <Form.Select
                    value={formData.mainCategory}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        mainCategory: e.target.value,
                        category: "",
                      })
                    }
                  >
                    <option value="">Select Main Category</option>
                    {mainCategories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Subcategory</Form.Label>
                  <Form.Select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  >
                    <option value="">Select Subcategory</option>
                    {subCategories
                      .filter(
                        (s) =>
                          !formData.mainCategory ||
                          s.parent === parseInt(formData.mainCategory)
                      )
                      .map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.name}
                        </option>
                      ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6} className="d-flex align-items-center mt-4">
                <Form.Check
                  type="switch"
                  label="Active"
                  checked={formData.is_active}
                  onChange={(e) =>
                    setFormData({ ...formData, is_active: e.target.checked })
                  }
                />
              </Col>
            </Row>

            {/* ✅ Improved Image Upload + Existing Image Management */}
            <Form.Group className="mb-3">
              <Form.Label>Product Images</Form.Label>

              {/* Existing Images */}
              {selectedProduct?.images?.length > 0 && (
                <div className="mb-3 d-flex flex-wrap">
                  {selectedProduct.images.map((img, idx) => (
                    <div
                      key={img.id}
                      className="position-relative me-2 mb-2"
                      style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                        overflow: "hidden",
                        background: "#f8f9fa",
                      }}
                    >
                      <img
                        src={img.image}
                        alt={img.alt || "Existing image"}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />

                      {/* Delete existing image button */}
                      <Button
                        size="sm"
                        variant="danger"
                        className="position-absolute top-0 end-0 m-1 p-1 rounded-circle"
                        style={{
                          width: "22px",
                          height: "22px",
                          lineHeight: "10px",
                          fontSize: "12px",
                        }}
                        onClick={async () => {
                          if (
                            window.confirm("Delete this image permanently?")
                          ) {
                            try {
                              await deleteProductImage(img.id);

                              // ⚡ Instantly update the UI without reload
                              setSelectedProduct((prev) => ({
                                ...prev,
                                images: prev.images.filter(
                                  (i) => i.id !== img.id
                                ),
                              }));
                            } catch (err) {
                              console.error("❌ Failed to delete image:", err);
                              alert(
                                "Failed to delete image. Please try again."
                              );
                            }
                          }
                        }}
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Upload New Images */}
              <Form.Control
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  const files = Array.from(e.target.files || []);
                  if (!files.length) return;

                  setSelectedImages((prev) => {
                    const existing = new Set(prev.map((f) => f.name + f.size));
                    const unique = files.filter(
                      (f) => !existing.has(f.name + f.size)
                    );
                    return [...prev, ...unique];
                  });

                  e.target.value = "";
                }}
              />

              {/* Preview New Uploads */}
              {selectedImages.length > 0 && (
                <div className="mt-3 d-flex flex-wrap">
                  {selectedImages.map((file, idx) => {
                    const previewUrl = URL.createObjectURL(file);
                    return (
                      <div
                        key={idx + file.name}
                        className="position-relative me-2 mb-2"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "8px",
                          border: "1px solid #ccc",
                          overflow: "hidden",
                          background: "#f8f9fa",
                        }}
                      >
                        <img
                          src={previewUrl}
                          alt={file.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                        <Button
                          size="sm"
                          variant="danger"
                          className="position-absolute top-0 end-0 m-1 p-1 rounded-circle"
                          style={{
                            width: "22px",
                            height: "22px",
                            lineHeight: "10px",
                            fontSize: "12px",
                          }}
                          onClick={async () => {
                            if (
                              window.confirm("Delete this image permanently?")
                            ) {
                              try {
                                await deleteProductImage(img.id);

                                // ⚡ Instantly remove from the UI
                                setSelectedProduct((prev) => ({
                                  ...prev,
                                  images: prev.images.filter(
                                    (i) => i.id !== img.id
                                  ),
                                }));
                              } catch (err) {
                                console.error(
                                  "❌ Failed to delete image:",
                                  err
                                );
                                alert(
                                  "Failed to delete image. Please try again."
                                );
                              }
                            }
                          }}
                        >
                          ×
                        </Button>
                      </div>
                    );
                  })}
                </div>
              )}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowEditModal(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {formData.id ? "Save Changes" : "Add Product"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ProductsAdminPage;
