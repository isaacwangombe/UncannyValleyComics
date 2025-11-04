// 🌍 Backend base URL (auto-switch local vs production)
export const BACKEND_BASE =
  import.meta.env.MODE === "production"
    ? "https://uncanny-valley-comics-backend.onrender.com"
    : "http://127.0.0.1:8000";

export const API_BASE = `${BACKEND_BASE}/api`;

/* ==========================================================
   🔐 TOKEN & AUTH HELPERS
========================================================== */

function getAccessToken() {
  return localStorage.getItem("access_token");
}

function getRefreshToken() {
  return localStorage.getItem("refresh_token");
}

function saveTokens({ access, refresh }) {
  if (access) localStorage.setItem("access_token", access);
  if (refresh) localStorage.setItem("refresh_token", refresh);
}

function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
}

// ✅ Refresh JWT if access token is expired
export async function refreshAccessToken() {
  const refresh = getRefreshToken();
  if (!refresh) return null;

  const res = await fetch(`${API_BASE}/auth/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    console.warn("⚠️ Failed to refresh token");
    clearTokens();
    return null;
  }

  const data = await res.json();
  saveTokens({ access: data.access });
  console.log("🔄 Access token refreshed");
  return data.access;
}

/* ==========================================================
   🔁 UNIVERSAL FETCH WRAPPER (JWT-based)
========================================================== */

export async function apiFetch(endpoint, options = {}) {
  let token = getAccessToken();

  const headers = {
    ...(options.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    "Content-Type": "application/json",
  };

  let res = await fetch(`${API_BASE}${endpoint}`, { ...options, headers });

  // Try refresh if unauthorized
  if (res.status === 401 && getRefreshToken()) {
    console.log("🔁 Access expired, refreshing...");
    const newToken = await refreshAccessToken();
    if (newToken) {
      res = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
          ...headers,
          Authorization: `Bearer ${newToken}`,
        },
      });
    } else {
      throw new Error("Unauthorized — please log in again.");
    }
  }

  if (!res.ok) {
    const text = await res.text();
    console.error(`❌ Request failed (${res.status}):`, text);
    throw new Error(`Request failed (${res.status}): ${text}`);
  }

  // handle empty 204 response
  if (res.status === 204) return {};
  return res.json();
}

/* ==========================================================
   👤 AUTHENTICATION ENDPOINTS
========================================================== */

// ✅ Login — now points to SimpleJWT endpoint
export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: email, password }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("❌ Login failed:", text);
    throw new Error("Invalid credentials");
  }

  const data = await res.json();
  saveTokens(data);

  console.log("✅ Logged in and tokens saved");
  return data;
}

export function logoutUser() {
  clearTokens();
  console.log("👋 Logged out successfully");
  window.location.href = "/login";
}

// ✅ Get current user (protected endpoint)
export async function fetchCurrentUser() {
  const token = getAccessToken();
  if (!token) throw new Error("No token found");

  const res = await fetch(`${API_BASE}/auth/user/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401) {
    console.warn("🔄 Token expired — trying refresh...");
    const refreshed = await refreshAccessToken();
    if (!refreshed) throw new Error("Re-login required");
    return await fetchCurrentUser();
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Unauthorized: ${text}`);
  }

  return await res.json();
}

/* ==========================================================
   🛒 CART API (unchanged names)
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
   🛍️ PRODUCT & CATEGORY API
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
   🌐 GOOGLE LOGIN (dj-rest-auth)
========================================================== */
export async function apiGoogleLoginRedirect() {
  const url = `${BACKEND_BASE}/accounts/google/login/?process=login`;
  window.location.href = url;
}
