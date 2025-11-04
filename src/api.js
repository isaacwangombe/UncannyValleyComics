// src/api.js

// 🌍 Backend base URL (auto-switch local vs production)
export const BACKEND_BASE =
  import.meta.env.MODE === "production"
    ? "https://uncanny-valley-comics-backend.onrender.com"
    : "http://127.0.0.1:8000";

export const API_BASE = `${BACKEND_BASE}/api`;

/* ------------------------------------------
   🔐 JWT AUTH HELPERS
------------------------------------------ */

// ✅ Login with username/password → get JWT tokens
export async function loginUser(username, password) {
  const res = await fetch(`${API_BASE}/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Login failed: ${err}`);
  }

  const data = await res.json();
  localStorage.setItem("access", data.access);
  localStorage.setItem("refresh", data.refresh);
  return data;
}

// ✅ Logout — remove tokens
export function logoutUser() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
}

// ✅ Read stored access token
export function getAccessToken() {
  return localStorage.getItem("access");
}

// ✅ Refresh access token if expired
export async function refreshAccessToken() {
  const refresh = localStorage.getItem("refresh");
  if (!refresh) throw new Error("No refresh token found");

  const res = await fetch(`${API_BASE}/token/refresh/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh }),
  });

  if (!res.ok) {
    logoutUser();
    throw new Error("Token refresh failed — please log in again.");
  }

  const data = await res.json();
  localStorage.setItem("access", data.access);
  return data.access;
}

/* ------------------------------------------
   🧩 Generic JWT Fetch Wrapper
------------------------------------------ */
async function jwtFetch(url, options = {}) {
  let token = getAccessToken();

  if (!token) throw new Error("No token found");

  let res = await fetch(url, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  // 🔁 Try refreshing token if expired
  if (res.status === 401) {
    try {
      const newToken = await refreshAccessToken();
      res = await fetch(url, {
        ...options,
        headers: {
          ...(options.headers || {}),
          Authorization: `Bearer ${newToken}`,
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      throw new Error("Re-authentication required");
    }
  }

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed (${res.status}): ${text}`);
  }

  try {
    return await res.json();
  } catch {
    return {};
  }
}

/* ------------------------------------------
   👤 USER + AUTH ENDPOINTS
------------------------------------------ */

// ✅ Get current logged-in user
// (dj-rest-auth auto-issues JWT on login & Google)
export async function fetchCurrentUser() {
  const token = getAccessToken();
  if (!token) return null;

  const res = await fetch(`${BACKEND_BASE}/dj-rest-auth/user/`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.status === 401) return null;
  if (!res.ok) throw new Error("Failed to fetch user");

  return await res.json();
}

// ✅ Google login redirect
export async function apiGoogleLoginRedirect() {
  const googleLoginUrl = `${BACKEND_BASE}/accounts/google/login/?process=login`;
  window.location.href = googleLoginUrl;
}

/* ------------------------------------------
   🛍️ PRODUCT + CATEGORY ENDPOINTS
------------------------------------------ */

// ✅ Fetch all categories
export async function fetchCategories() {
  const res = await fetch(`${API_BASE}/categories/`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return await res.json();
}

// ✅ Fetch products (with optional search)
export async function fetchProducts({ page = 1, q = "" } = {}) {
  let url = `${API_BASE}/products/?page=${page}`;
  if (q) url += `&search=${encodeURIComponent(q)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products");
  return await res.json();
}

// ✅ Create a new product (JWT required)
export async function createProduct(data) {
  return jwtFetch(`${API_BASE}/products/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ✅ Update product
export async function updateProduct(id, data) {
  return jwtFetch(`${API_BASE}/products/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

// ✅ Delete product
export async function deleteProduct(id) {
  return jwtFetch(`${API_BASE}/products/${id}/`, {
    method: "DELETE",
  });
}

/* ------------------------------------------
   🧾 CART (JWT optional)
------------------------------------------ */
export async function apiGetCart() {
  const res = await fetch(`${API_BASE}/cart/`, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch cart");
  return await res.json();
}

/* ------------------------------------------
   🧩 UTILITIES
------------------------------------------ */
export function isLoggedIn() {
  return !!getAccessToken();
}
