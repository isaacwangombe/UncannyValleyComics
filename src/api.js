// src/api.js
export const BACKEND_BASE =
  import.meta.env.MODE === "production"
    ? "https://uncanny-valley-comics-backend.onrender.com"
    : "http://127.0.0.1:8000";

export const API_BASE = `${BACKEND_BASE}/api`;

/* ------------------------------------------
   🧩 Helpers for CSRF + authenticated requests
------------------------------------------ */

// Fetch CSRF cookie if not already present
// ✅ Unified CSRF helper

export async function ensureCsrf() {
  const token = document.cookie.match(/csrftoken=([^;]+)/)?.[1];
  if (!token) {
    console.log("🔐 No CSRF cookie found — fetching one...");
    const res = await fetch(`${API_BASE}/users/set-csrf/`, {
      credentials: "include",
    });
    document.cookie;
    if (res.ok) console.log("✅ CSRF cookie set successfully");
    else console.error("❌ Failed to fetch CSRF token:", res.status);
  }
}

// Extract CSRF token from cookies
function getCsrfToken() {
  const match = document.cookie.match(/csrftoken=([^;]+)/);
  return match ? match[1] : null;
}

// Wrapper for any request that needs CSRF
async function csrfFetch(url, options = {}) {
  await ensureCsrf();
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
   👤 Auth APIs
------------------------------------------ */

// Fetch the currently logged-in user (session-based)
export async function fetchCurrentUser() {
  await ensureCsrf();

  const csrftoken = getCsrfToken();
  const res = await fetch(`${API_BASE}/auth/user/`, {
    method: "GET",
    credentials: "include",
    headers: {
      "X-CSRFToken": csrftoken,
    },
  });

  if (res.ok) {
    return await res.json();
  } else {
    console.warn("⚠️ Not authenticated:", res.status);
    return null;
  }
}

// Logout the user (session-based)
export async function logoutUser() {
  console.log("🔄 Ensuring CSRF token is up-to-date...");

  // 1️⃣ Ask backend to refresh/set cookie — crucial for cross-site
  const csrfRes = await fetch(
    "https://uncanny-valley-comics-backend.onrender.com/api/users/set-csrf/",
    {
      credentials: "include",
    }
  );
  if (!csrfRes.ok) {
    throw new Error("Failed to refresh CSRF cookie before logout");
  }

  // 2️⃣ Extract the actual cookie value that was just set
  const csrfToken = document.cookie
    .split("; ")
    .find((r) => r.startsWith("csrftoken="))
    ?.split("=")[1];

  console.log("🔐 Using CSRF for logout:", csrfToken);

  // 3️⃣ Now send logout request to the backend with matching header
  const res = await fetch(
    "https://uncanny-valley-comics-backend.onrender.com/api/auth/logout/",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
    }
  );

  // 4️⃣ Handle response
  if (!res.ok) {
    const txt = await res.text();
    console.error("❌ Logout failed:", txt);
    throw new Error(`Logout failed: ${res.status} - ${txt}`);
  }

  console.log("✅ Successfully logged out");
  return res.json();
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
    if (subcategory) url += `&category=${subcategory}`;
    else if (category) url += `&category__parent=${category}`;
    if (q) url += `&search=${encodeURIComponent(q)}`;

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
  if (parentSlug) url += `&category__parent__slug=${parentSlug}`;

  console.log("🔗 Fetching:", url);
  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) throw new Error("Failed to fetch trending products");
  return data;
}

/* ------------------------------------------
   🔐 Authentication APIs (Login, Logout, Google)
------------------------------------------ */

// Get CSRF token (reusable)
function getCookie(name) {
  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(name + "="));
  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
}

// Email/password login
export async function apiLogin(email, password) {
  await ensureCsrf();

  const csrfToken = getCookie("csrftoken");

  const res = await fetch(`${API_BASE.replace("/api", "")}/api/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => null);
    throw new Error(data?.non_field_errors?.[0] || "Login failed");
  }

  return await res.json();
}

// Google login redirect
export async function apiGoogleLoginRedirect() {
  await ensureCsrf();

  const url = `${BACKEND_BASE}/accounts/google/login/?process=login`;
  console.log("🔗 Redirecting to Google login:", url);
  window.location.href = url;
  s;
}

// Fetch current user (used by AuthCallback)
export async function apiGetUser() {
  const backendUrl = API_BASE.replace("/api", "");

  const res = await fetch(`${backendUrl}/dj-rest-auth/user/`, {
    credentials: "include",
  });

  if (!res.ok) {
    console.warn("❌ Failed to fetch user:", res.status);
    return null;
  }

  return await res.json();
}
