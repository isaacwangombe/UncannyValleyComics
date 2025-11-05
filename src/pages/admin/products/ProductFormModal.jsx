import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";

const ProductFormModal = ({
  show,
  onHide,
  selectedProduct,
  categories,
  mainCategories,
  subCategories,
  apiAddProduct,
  apiEditProduct,
  uploadProductImage,
  deleteProductImage,
  onSaved,
  backendUrl,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mainCategory: "",
    category: "",
    price: "",
    cost: "",
    discounted_price: "",
    stock: "",
    is_active: true,
  });

  // local copy of selectedProduct so we can mutate images without touching parent until saved
  const [localProduct, setLocalProduct] = useState(null);

  const [selectedImages, setSelectedImages] = useState([]); // new uploads
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      const subCat = categories.find((c) => c.id === selectedProduct.category);
      const mainCat = subCat?.parent || "";
      setFormData({
        id: selectedProduct.id,
        title: selectedProduct.title || "",
        description: selectedProduct.description || "",
        mainCategory: mainCat,
        category: selectedProduct.category || "",
        price: selectedProduct.price ?? "",
        cost: selectedProduct.cost ?? "",
        discounted_price: selectedProduct.discounted_price ?? "",
        stock: selectedProduct.stock ?? 0,
        is_active: selectedProduct.is_active ?? true,
      });
      setLocalProduct(JSON.parse(JSON.stringify(selectedProduct)));
      setSelectedImages([]);
    } else {
      setFormData({
        title: "",
        description: "",
        mainCategory: "",
        category: "",
        price: "",
        cost: "",
        discounted_price: "",
        stock: "",
        is_active: true,
      });
      setLocalProduct(null);
      setSelectedImages([]);
    }
  }, [selectedProduct, categories]);

  const handleDeleteExistingImage = async (imgId) => {
    if (!window.confirm("Delete this image permanently?")) return;
    try {
      await deleteProductImage(imgId);
      // remove locally so user sees instant change
      setLocalProduct((prev) => ({
        ...prev,
        images: (prev.images || []).filter((i) => i.id !== imgId),
      }));
    } catch (err) {
      console.error("Failed to delete image:", err);
      alert("Failed to delete image.");
    }
  };

  const handleRemoveNewImage = (idx) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // build payload - ensure numeric fields are proper types or blank -> backend handles coercion
      const payload = {
        title: formData.title,
        description: formData.description,
        category: formData.category || null,
        price: formData.price !== "" ? Number(formData.price) : null,
        cost: formData.cost !== "" ? Number(formData.cost) : null,
        discounted_price:
          formData.discounted_price !== ""
            ? Number(formData.discounted_price)
            : null,
        stock: formData.stock !== "" ? Number(formData.stock) : 0,
        is_active: !!formData.is_active,
      };

      let product;
      if (formData.id) {
        product = await apiEditProduct(formData.id, payload);
      } else {
        product = await apiAddProduct(payload);
      }

      // upload new images (if any)
      for (const file of selectedImages) {
        try {
          await uploadProductImage(product.id, file);
        } catch (err) {
          console.error("Upload image failed for", file.name, err);
        }
      }

      // finished
      onSaved && onSaved();
      onHide && onHide();
    } catch (err) {
      console.error("Save failed:", err);
      alert("Save failed: " + (err?.message || err));
    } finally {
      setSaving(false);
    }
  };

  const imageUrlFor = (img) => {
    if (!img) return null;
    if (typeof img.image === "string") {
      if (img.image.startsWith("http")) return img.image;
      return backendUrl + img.image;
    } else if (img.image?.url) {
      return img.image.url;
    }
    return null;
  };

  return (
    <Modal show={show} onHide={onHide} centered size="lg">
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
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>Cost</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  value={formData.cost === null ? "" : formData.cost}
                  onChange={(e) =>
                    setFormData({ ...formData, cost: e.target.value })
                  }
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  value={formData.price === null ? "" : formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Discounted Price</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  value={
                    formData.discounted_price === null
                      ? ""
                      : formData.discounted_price
                  }
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      discounted_price: e.target.value,
                    })
                  }
                />
                <Form.Text className="text-muted">
                  Leave blank or 0 to disable discount (backend logic may treat
                  0 as no-discount depending on settings).
                </Form.Text>
              </Form.Group>
            </Col>

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

          <Row className="mb-3 align-items-center">
            <Col md={6}>
              <Form.Check
                type="switch"
                label="Active"
                checked={!!formData.is_active}
                onChange={(e) =>
                  setFormData({ ...formData, is_active: e.target.checked })
                }
              />
            </Col>
          </Row>

          {/* Existing images */}
          {localProduct?.images?.length > 0 && (
            <>
              <hr />
              <div className="mb-2">
                <strong>Existing Images</strong>
              </div>
              <div className="d-flex flex-wrap mb-3">
                {localProduct.images.map((img) => {
                  const url = imageUrlFor(img);
                  return (
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
                        cursor: "pointer",
                      }}
                    >
                      {url && (
                        <img
                          src={url}
                          alt={img.alt || "Product image"}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                          onClick={() => window.open(url, "_blank")}
                        />
                      )}
                      <Button
                        size="sm"
                        variant="danger"
                        className="position-absolute top-0 end-0 m-1 p-1 rounded-circle"
                        style={{
                          width: "22px",
                          height: "22px",
                          fontSize: "12px",
                        }}
                        onClick={() => handleDeleteExistingImage(img.id)}
                      >
                        ×
                      </Button>
                    </div>
                  );
                })}
              </div>
            </>
          )}

          {/* Upload new images */}
          <Form.Group>
            <Form.Label>Upload Images (new)</Form.Label>
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
          </Form.Group>

          {/* Preview new uploads */}
          {selectedImages.length > 0 && (
            <>
              <div className="mt-3 mb-2">
                <strong>New Images (will be uploaded on Save)</strong>
              </div>
              <div className="d-flex flex-wrap mb-3">
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
                          fontSize: "12px",
                        }}
                        onClick={() => handleRemoveNewImage(idx)}
                      >
                        ×
                      </Button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={saving}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={saving}>
          {saving ? "Saving…" : formData.id ? "Save Changes" : "Add Product"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductFormModal;
