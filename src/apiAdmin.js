import axios from "axios";
import { ensureCsrf } from "./api";

// export const API_BASE = import.meta.env.VITE_API_URL;
export const BACKEND_BASE =
  import.meta.env.MODE === "production"
    ? "https://uncanny-valley-comics-backend.onrender.com"
    : "http://127.0.0.1:8000";

export const API_BASE = `${BACKEND_BASE}/api`;

export async function ensureCsrf() {
  // Try reading cookie first
  let token = getCookie("csrftoken");

  if (!token) {
    console.log("🔄 No CSRF cookie found — requesting from backend...");

    // Ask backend to set CSRF cookie
    const res = await fetch(`${API_BASE}/users/set-csrf/`, {
      credentials: "include",
    });

    if (!res.ok) {
      console.error("❌ Failed to fetch CSRF token:", res.status);
      return null;
    }

    // Wait briefly to ensure browser stores cookie before reading it again
    await new Promise((resolve) => setTimeout(resolve, 150));

    // Read cookie again after backend sets it
    token = getCookie("csrftoken");
  }

  console.log("✅ Using CSRF token:", token);
  return token;
}

// ✅ Create axios instance with cookies enabled
export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// --- DASHBOARD ---
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

// --- PRODUCTS ---
export const getProducts = async () => (await api.get("/products/")).data;
export const createProduct = async (data) =>
  (await api.post("/products/", data)).data;
export const updateProduct = async (id, data) =>
  (await api.put(`/products/${id}/`, data)).data;
export const deleteProduct = async (id) =>
  (await api.delete(`/products/${id}/`)).data;

// Add or edit product
export async function apiEditProduct(id, data) {
  const csrfToken = await ensureCsrf();
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

export async function apiAddProduct(data) {
  const res = await fetch(`${API_BASE}/products/`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add product");
  return res.json();
}

// --- BULK UPLOAD PRODUCTS ---
export async function bulkUploadProducts(excelFile, zipFile = null) {
  const formData = new FormData();
  formData.append("excel_file", excelFile);
  if (zipFile) formData.append("images_zip", zipFile);

  const res = await fetch(`${API_BASE}/products/bulk-upload/`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Bulk upload failed.");
  return data;
}

export const toggleProductTrending = async (id) => {
  const res = await fetch(`${API_BASE}/products/${id}/toggle_trending/`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to toggle trending");
  return res.json();
};

export async function uploadProductImage(productId, file) {
  const formData = new FormData();
  formData.append("product", productId);
  formData.append("image", file);

  const res = await fetch(`${API_BASE}/product-images/`, {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) throw new Error("Image upload failed");
  return res.json();
}

export async function deleteProductImage(imageId) {
  const res = await fetch(`${API_BASE}/product-images/${imageId}/`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to delete product image");
  return res.json().catch(() => ({}));
}

// --- CATEGORIES ---
export const getCategories = async () => (await api.get("/categories/")).data;
export const createCategory = async (data) =>
  (await api.post("/categories/", data)).data;
export const updateCategory = async (id, data) =>
  (await api.put(`/categories/${id}/`, data)).data;
export const deleteCategory = async (id) =>
  (await api.delete(`/categories/${id}/`)).data;

export async function uploadCategoryImage(categoryId, file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_BASE}/categories/${categoryId}/`, {
    method: "PATCH",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload category image");
  return res.json();
}

export async function deleteCategoryImage(categoryId) {
  const res = await fetch(
    `${API_BASE}/categories/${categoryId}/delete-image/`,
    {
      method: "DELETE",
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

// --- USERS ---
export const getUsers = async () => (await api.get("/admin/users/")).data;
export const toggleStaff = async (id) =>
  (await api.post(`/admin/users/${id}/toggle_staff/`, {})).data;
export const promoteToOwner = async (id) =>
  (await api.post(`/admin/users/${id}/promote_to_owner/`, {})).data;
