import axios from "axios";

// 🌍 Backend base URL (auto-switch local vs production)
export const BACKEND_BASE =
  import.meta.env.MODE === "production" ? "" : "http://127.0.0.1:8000";

export const API_BASE = `${BACKEND_BASE}/api`;

// 🍪 Helper: Read cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

// 🔐 Ensure a valid CSRF token exists (race-safe)
export async function ensureCsrf() {
  let token = getCookie("csrftoken");

  if (!token) {
    console.log("🔄 No CSRF cookie found — requesting from backend...");
    const res = await fetch(`${API_BASE}/users/set-csrf/`, {
      credentials: "include",
    });

    if (!res.ok) {
      console.error("❌ Failed to fetch CSRF token:", res.status);
      return null;
    }

    // Wait briefly to let browser store the cookie
    await new Promise((resolve) => setTimeout(resolve, 150));

    token = getCookie("csrftoken");
  }

  console.log("✅ Using CSRF token:", token);
  return token;
}

// ✅ Axios instance (for GET-only endpoints)
export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

//
// =========================
// 📊 DASHBOARD ENDPOINTS
// =========================
export const getDashboardStats = async () =>
  (await api.get("/admin/analytics/stats/")).data;
export const getDailySales = async () =>
  (await api.get("/admin/analytics/daily_sales/")).data;
export const getMonthlySales = async () =>
  (await api.get("/admin/analytics/monthly_sales/")).data;
export const getSalesOverTime = async () =>
  (await api.get("/admin/analytics/sales_over_time/")).data;
export const getNewUsers = async () =>
  (await api.get("/admin/analytics/new_users/")).data;
export const getTopProducts = async () =>
  (await api.get("/admin/analytics/top_products/")).data;

//
// =========================
// 🛍️ PRODUCT ENDPOINTS
// =========================
export const getProducts = async () => (await api.get("/products/")).data;

// ✅ Add Product
export async function apiAddProduct(data) {
  const csrfToken = await ensureCsrf();

  if (!csrfToken) throw new Error("CSRF token missing");

  const res = await fetch(`${API_BASE}/products/`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("❌ Add failed:", errText);
    throw new Error("Failed to add product");
  }

  return res.json();
}

// ✅ Edit Product
export async function apiEditProduct(id, data) {
  const csrfToken = await ensureCsrf();

  if (!csrfToken) throw new Error("CSRF token missing");

  console.log("🧩 Editing product with CSRF:", csrfToken);

  const res = await fetch(`${API_BASE}/products/${id}/`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("❌ Edit failed:", errText);
    throw new Error("Failed to update product");
  }

  return res.json();
}

// ✅ Delete Product
export async function deleteProduct(id) {
  const csrfToken = await ensureCsrf();

  if (!csrfToken) throw new Error("CSRF token missing");

  const res = await fetch(`${API_BASE}/products/${id}/`, {
    method: "DELETE",
    credentials: "include",
    headers: { "X-CSRFToken": csrfToken },
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("❌ Delete failed:", errText);
    throw new Error("Failed to delete product");
  }

  return res.json().catch(() => ({})); // handle 204 safely
}

// ✅ Bulk Upload Products
export async function bulkUploadProducts(excelFile, zipFile = null) {
  const csrfToken = await ensureCsrf();
  const formData = new FormData();
  formData.append("excel_file", excelFile);
  if (zipFile) formData.append("images_zip", zipFile);

  const res = await fetch(`${API_BASE}/products/bulk-upload/`, {
    method: "POST",
    headers: { "X-CSRFToken": csrfToken },
    credentials: "include",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Bulk upload failed.");
  return data;
}

// ✅ Toggle Trending Product
export const toggleProductTrending = async (id) => {
  const csrfToken = await ensureCsrf();

  if (!csrfToken) throw new Error("CSRF token missing");

  const res = await fetch(`${API_BASE}/products/${id}/toggle_trending/`, {
    method: "POST",
    headers: { "X-CSRFToken": csrfToken },
    credentials: "include",
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("❌ Failed to toggle trending:", errText);
    throw new Error("Failed to toggle trending");
  }

  return res.json();
};

// ✅ Upload Product Image
export async function uploadProductImage(productId, file) {
  const csrfToken = await ensureCsrf();

  if (!csrfToken) throw new Error("CSRF token missing");

  const formData = new FormData();
  formData.append("product", productId);
  formData.append("image", file);

  const res = await fetch(`${API_BASE}/product-images/`, {
    method: "POST",
    headers: { "X-CSRFToken": csrfToken },
    credentials: "include",
    body: formData,
  });

  if (!res.ok) throw new Error("Image upload failed");
  return res.json();
}

// ✅ Delete Product Image
export async function deleteProductImage(imageId) {
  const csrfToken = await ensureCsrf();

  if (!csrfToken) throw new Error("CSRF token missing");

  const res = await fetch(`${API_BASE}/product-images/${imageId}/`, {
    method: "DELETE",
    credentials: "include",
    headers: { "X-CSRFToken": csrfToken },
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("❌ Failed to delete product image:", errText);
    throw new Error("Failed to delete product image");
  }

  return res.json().catch(() => ({}));
}

//
// =========================
// 🗂️ CATEGORY ENDPOINTS
// =========================
export const getCategories = async () => (await api.get("/categories/")).data;

export async function createCategory(data) {
  const csrfToken = await ensureCsrf();

  const res = await fetch(`${API_BASE}/categories/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create category");
  return res.json();
}

export async function updateCategory(id, data) {
  const csrfToken = await ensureCsrf();

  const res = await fetch(`${API_BASE}/categories/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken,
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update category");
  return res.json();
}

export async function deleteCategory(id) {
  const csrfToken = await ensureCsrf();

  const res = await fetch(`${API_BASE}/categories/${id}/`, {
    method: "DELETE",
    headers: { "X-CSRFToken": csrfToken },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to delete category");
  return res.json().catch(() => ({}));
}

// ✅ Upload Category Image
export async function uploadCategoryImage(categoryId, file) {
  const csrfToken = await ensureCsrf();
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_BASE}/categories/${categoryId}/`, {
    method: "PATCH",
    headers: { "X-CSRFToken": csrfToken },
    credentials: "include",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload category image");
  return res.json();
}

// ✅ Delete Category Image
export async function deleteCategoryImage(categoryId) {
  const csrfToken = await ensureCsrf();

  const res = await fetch(
    `${API_BASE}/categories/${categoryId}/delete-image/`,
    {
      method: "DELETE",
      headers: { "X-CSRFToken": csrfToken },
      credentials: "include",
    }
  );

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(
      `Failed to delete category image: ${errText || res.status}`
    );
  }

  const text = await res.text();
  if (!text) return { detail: "Image deleted successfully" };

  try {
    return JSON.parse(text);
  } catch {
    return { detail: text };
  }
}

//
// =========================
// 👤 USER ADMIN ENDPOINTS
// =========================
export const getUsers = async () => (await api.get("/admin/users/")).data;

export async function toggleStaff(id) {
  const csrfToken = await ensureCsrf();

  const res = await fetch(`${API_BASE}/admin/users/${id}/toggle_staff/`, {
    method: "POST",
    headers: { "X-CSRFToken": csrfToken },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to toggle staff status");
  return res.json();
}

export async function promoteToOwner(id) {
  const csrfToken = await ensureCsrf();

  const res = await fetch(`${API_BASE}/admin/users/${id}/promote_to_owner/`, {
    method: "POST",
    headers: { "X-CSRFToken": csrfToken },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to promote to owner");
  return res.json();
}
