// src/api.js
const API_BASE = "http://127.0.0.1:8000/api";

/* ------------------------------------------
   🧩 Helpers for CSRF + authenticated requests
------------------------------------------ */

// Fetch CSRF cookie if not already present
export async function ensureCsrfToken() {
  await fetch(`${API_BASE}/users/set-csrf/`, {
    credentials: "include", // ensures cookie is stored
  });
}

// Extract CSRF token from cookies
function getCsrfToken() {
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? match[1] : null;
}

// Wrapper for any POST/PUT/DELETE that adds CSRF header
async function csrfFetch(url, options = {}) {
  await ensureCsrfToken();
  const csrftoken = getCsrfToken();

  const opts = {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      ...(csrftoken ? { "X-CSRFToken": csrftoken } : {}),
    },
    ...options,
  };

  const res = await fetch(url, opts);
  if (!res.ok) {
    const text = await res.text();
    console.error(`❌ Request failed (${res.status}):`, text);
    throw new Error(`Request failed (${res.status}): ${text}`);
  }
  return await res.json();
}

/* ------------------------------------------
   🛒 Cart API
------------------------------------------ */

export async function apiGetCart() {
  const res = await fetch(`${API_BASE}/cart/`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch cart");
  return await res.json();
}

export async function apiAddCartItem(productId, quantity = 1) {
  return csrfFetch(`${API_BASE}/cart/add_item/`, {
    method: "POST",
    body: JSON.stringify({ product_id: productId, quantity }),
  });
}

export async function apiRemoveCartItem(itemId) {
  return csrfFetch(`${API_BASE}/cart/remove_item/`, {
    method: "POST",
    body: JSON.stringify({ item_id: itemId }),
  });
}

export async function apiIncreaseCartItem(productId) {
  return csrfFetch(`${API_BASE}/cart/increase_item/`, {
    method: "POST",
    body: JSON.stringify({ product_id: productId }),
  });
}

export async function apiDecreaseCartItem(productId) {
  return csrfFetch(`${API_BASE}/cart/decrease_item/`, {
    method: "POST",
    body: JSON.stringify({ product_id: productId }),
  });
}

export async function apiCartCheckout(data) {
  return csrfFetch(`${API_BASE}/cart/checkout/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* ------------------------------------------
   📦 Product & Category APIs
------------------------------------------ */

export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories/`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return await res.json();
}

export async function fetchProducts({
  page = 1,
  category = null,
  subcategory = null,
  q = "",
} = {}) {
  try {
    let url = `${API_BASE}/products/?page=${page}`;

    // If subcategory is provided → filter directly
    if (subcategory) {
      url += `&category=${subcategory}`;
    }
    // If parent category → filter by category__parent
    else if (category) {
      url += `&category__parent=${category}`;
    }

    if (q) {
      url += `&search=${encodeURIComponent(q)}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
}

export async function fetchTrendingProducts(parentSlug = null) {
  let url = `${API_BASE}/products/?trending=true`;
  if (parentSlug) {
    url += `&category__parent__slug=${parentSlug}`;
  }

  console.log("🔗 Fetching:", url);
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) throw new Error("Failed to fetch trending products");
  return data;
}
