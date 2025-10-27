// src/pages/StorePage.jsx
import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Row,
  Col,
  Pagination,
  Form,
  Button,
  Badge,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ProductCard from "../../Components/productCard/ProductCard";
import Filter from "../../Components/filter/Filter";
import { fetchProducts, fetchCategories } from "../../api";
import { useCart } from "../../contexts/CartContext";

const StorePage = () => {
  const [productsData, setProductsData] = useState({ results: [], count: 0 });
  const [page, setPage] = useState(1);
  const [categoryFilter, setCategoryFilter] = useState(null);
  const [categories, setCategories] = useState([]); // for label lookup
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  const { reload } = useCart();

  const location = useLocation();
  const navigate = useNavigate();

  // Guard to skip the automatic initial loadProducts fetch
  // We'll drive the first fetch from the URL-sync effect instead.
  const skipInitialAutoLoadRef = useRef(true);

  // load categories once
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await fetchCategories();
        if (!alive) return;
        setCategories(data || []);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        setCategories([]);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Resolve category param (slug or id) into { id, isParent } or null
  const resolveCategoryParam = async (param) => {
    if (!param) return null;

    // ensure we have categories
    let cats = categories;
    if (!cats || cats.length === 0) {
      try {
        cats = await fetchCategories();
        setCategories(cats || []);
      } catch (err) {
        console.error("Failed to fetch categories for resolution:", err);
        return null;
      }
    }

    const bySlug = cats.find((c) => String(c.slug) === String(param));
    if (bySlug) return { id: bySlug.id, isParent: !bySlug.parent };

    const asId = Number(param);
    if (!Number.isNaN(asId)) {
      const byId = cats.find((c) => c.id === asId);
      if (byId) return { id: byId.id, isParent: !byId.parent };
    }

    return null;
  };

  // Main loader
  const loadProducts = async (opts = {}) => {
    setLoading(true);
    try {
      // opts can override page/categoryFilter/q when explicitly passed
      const pageToUse = opts.page ?? page;
      const catFilter = opts.categoryFilter ?? categoryFilter;
      const qToUse = opts.q ?? q;

      const data = await fetchProducts({
        page: pageToUse,
        ...(catFilter
          ? catFilter.isParent
            ? { category: catFilter.id }
            : { subcategory: catFilter.id }
          : {}),
        q: qToUse,
      });

      setProductsData({
        results: data.results || data,
        count: data.count || (data.results ? data.results.length : 0),
        next: data.next,
        previous: data.previous,
      });
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  // Reactive load when page / filter / q changes — but skip the very first automatic run.
  useEffect(() => {
    if (skipInitialAutoLoadRef.current) {
      // Skip the initial automatic load; the URL-sync effect will load.
      skipInitialAutoLoadRef.current = false;
      return;
    }
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, categoryFilter, q]);

  // Reload cart once on mount (keeps your previous behaviour)
  useEffect(() => {
    reload();
  }, [reload]);

  // URL -> state sync. This is the authoritative initializer when arriving via navigate('/store?...')
  useEffect(() => {
    let alive = true;
    (async () => {
      const params = new URLSearchParams(location.search);
      const qParam = params.get("q") || "";
      const categoryParam = params.get("category") || null;

      // Set local state from URL
      if (!alive) return;
      setQ(qParam);
      setPage(1); // reset pagination when URL changes

      // Resolve category param then trigger a load with those resolved values
      const resolved = categoryParam
        ? await resolveCategoryParam(categoryParam)
        : null;
      if (!alive) return;
      setCategoryFilter(resolved);

      // Explicitly load products according to the URL-derived state (ensures correct first fetch)
      await loadProducts({ page: 1, categoryFilter: resolved, q: qParam });

      // After the URL-driven initial fetch, future changes will be handled by the reactive effect above
    })();

    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  // Store search handler — update URL so navbar & direct search behave the same
  const onSearch = (e) => {
    e.preventDefault();
    setPage(1);
    const query = (q || "").trim();
    // retain category param if present
    const params = new URLSearchParams(location.search);
    if (query) {
      params.set("q", query);
    } else {
      params.delete("q");
    }
    // replace URL (pushState) to keep navigation history UX friendly
    navigate(`/store?${params.toString()}`, { replace: false });
    // loadProducts will be triggered by the location.search effect after navigation changes
  };

  // When the user selects a category in the Filter, update state and the URL
  const onSelectCategory = (value) => {
    setCategoryFilter(value);
    setPage(1);

    // sync the URL (use slug if available)
    const cat = categories.find((c) => c.id === value?.id);
    const params = new URLSearchParams();
    if (cat) {
      params.set("category", cat.slug);
    }
    // preserve q if present
    if (q) params.set("q", q);
    navigate(`/store?${params.toString()}`);
    // load will be triggered by the location.search effect
  };

  // Get the label for the active filter
  const getFilterLabel = () => {
    if (!categoryFilter) return "All Products";
    const selected = categories.find((cat) => cat.id === categoryFilter.id);
    if (!selected) return "All Products";
    return categoryFilter.isParent ? `All ${selected.name}` : selected.name;
  };

  const pages = Math.max(1, Math.ceil((productsData.count || 0) / 12));

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={3} className="mb-3">
          <Filter
            onSelectCategory={(value) => onSelectCategory(value)}
            selectedCategory={categoryFilter}
          />
        </Col>

        <Col md={9}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="m-0">Store</h4>
          </div>

          {/* 🏷️ Active filter display */}
          <div className="mb-3">
            <h6 className="text-muted mb-0">
              Showing:{" "}
              <Badge bg="dark" className="me-2">
                {getFilterLabel()}
              </Badge>
              {q && <Badge bg="secondary">Search: “{q}”</Badge>}
            </h6>
          </div>

          <Row xs={1} sm={2} md={3} lg={4} className="g-3">
            {loading ? (
              <div className="text-center py-5">Loading…</div>
            ) : productsData.results.length > 0 ? (
              productsData.results.map((product) => (
                <Col key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))
            ) : (
              <div className="text-center py-5 text-muted">
                No products found.
              </div>
            )}
          </Row>

          <div className="d-flex justify-content-between align-items-center mt-4">
            <div className="text-muted small">
              Showing page {page} / {pages}
            </div>
            <Pagination>
              <Pagination.Prev
                disabled={!productsData.previous}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              />
              {[...Array(pages)].map((_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === page}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next
                disabled={!productsData.next}
                onClick={() => setPage((p) => p + 1)}
              />
            </Pagination>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default StorePage;
