// 🌍 Backend base URL (auto-switch local vs production)
export const BACKEND_BASE =
  import.meta.env.MODE === "production"
    ? "https://uncanny-valley-comics-backend.onrender.com"
    : "http://127.0.0.1:8000";

export const API_BASE = `${BACKEND_BASE}/api`;

/* ==========================================================
   🔐 JWT AUTH HELPERS
========================================================== */

export function getAccessToken() {
  return localStorage.getItem("access");
}

export function getRefreshToken() {
  return localStorage.getItem("refresh");
}

export function saveTokens({ access, refresh }) {
  if (access) localStorage.setItem("access", access);
  if (refresh) localStorage.setItem("refresh", refresh);
}

export function clearTokens() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

async function refreshAccessToken() {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  try {
    const res = await fetch(`${API_BASE}/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!res.ok) throw new Error("Token refresh failed");
    const data = await res.json();
    saveTokens(data);
    return data.access;
  } catch (err) {
    console.error("❌ Token refresh failed:", err);
    clearTokens();
    return null;
  }
}

// ✅ General-purpose API fetch wrapper
export async function apiFetch(endpoint, options = {}) {
  let token = getAccessToken();

  const headers = {
    ...(options.headers || {}),
    Authorization: token ? `Bearer ${token}` : undefined,
    "Content-Type": "application/json",
  };

  let res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  // Try refreshing if unauthorized
  if (res.status === 401 && getRefreshToken()) {
    const newToken = await refreshAccessToken();
    if (newToken) {
      res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: { ...headers, Authorization: `Bearer ${newToken}` },
      });
    } else {
      throw new Error("Unauthorized — please log in again.");
    }
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed (${res.status}): ${text}`);
  }

  return res.json();
}

/* ==========================================================
   👤 AUTHENTICATION (Login / Logout / Profile)
========================================================== */

// Login (email/password)
export async function apiLogin(email, password) {
  const res = await fetch(`${API_BASE}/auth/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.detail || "Login failed");
  }

  const data = await res.json();
  saveTokens(data);
  return data;
}

// Logout
export function apiLogout() {
  clearTokens();
}

// Get current user profile
export async function apiGetUser() {
  return apiFetch("/auth/user/");
}

/* ==========================================================
   🛒 CART ENDPOINTS
========================================================== */
export async function apiGetCart() {
  return apiFetch("/cart/");
}

export async function apiAddCartItem(productId, quantity = 1) {
  return apiFetch("/cart/add_item/", {
    method: "POST",
    body: JSON.stringify({ product_id: productId, quantity }),
  });
}

export async function apiRemoveCartItem(itemId) {
  return apiFetch("/cart/remove_item/", {
    method: "POST",
    body: JSON.stringify({ item_id: itemId }),
  });
}

export async function apiIncreaseCartItem(productId) {
  return apiFetch("/cart/increase_item/", {
    method: "POST",
    body: JSON.stringify({ product_id: productId }),
  });
}

export async function apiDecreaseCartItem(productId) {
  return apiFetch("/cart/decrease_item/", {
    method: "POST",
    body: JSON.stringify({ product_id: productId }),
  });
}

export async function apiCartCheckout(data) {
  return apiFetch("/cart/checkout/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/* ==========================================================
   🛍️ PRODUCTS & CATEGORIES
========================================================== */

export async function fetchCategories() {
  return apiFetch("/categories/");
}

export async function fetchProducts({
  page = 1,
  category = null,
  subcategory = null,
  q = "",
} = {}) {
  let url = `/products/?page=${page}`;
  if (subcategory) url += `&category=${subcategory}`;
  else if (category) url += `&category__parent=${category}`;
  if (q) url += `&search=${encodeURIComponent(q)}`;
  return apiFetch(url);
}

export async function fetchTrendingProducts(parentSlug = null) {
  let url = `/products/?trending=true`;
  if (parentSlug) url += `&category__parent__slug=${parentSlug}`;
  return apiFetch(url);
}

/* ==========================================================
   💳 ORDERS
========================================================== */
export async function apiGetOrders() {
  return apiFetch("/orders/");
}

export async function apiGetOrderDetail(id) {
  return apiFetch(`/orders/${id}/`);
}

/* ==========================================================
   🌐 GOOGLE LOGIN (Optional)
========================================================== */
export async function apiGoogleLoginRedirect() {
  const url = `${BACKEND_BASE}/accounts/google/login/?process=login`;
  window.location.href = url;
}
