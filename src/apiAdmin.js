import axios from "axios";
import {
  API_BASE,
  getAccessToken,
  getRefreshToken,
  saveTokens,
  clearTokens,
  refreshAccessToken,
  apiFetch,
} from "./api"; //

// 🌍 Backend base URL (auto-switch local vs production)
export const BACKEND_BASE =
  import.meta.env.MODE === "production"
    ? "https://uncanny-valley-comics-backend.onrender.com"
    : "http://127.0.0.1:8000";

export const API_BASE = `${BACKEND_BASE}/api`;

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export async function loginUser(email, password) {
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

export function logoutUser() {
  clearTokens();
}

/* ==========================================================
   📊 DASHBOARD ENDPOINTS
========================================================== */
export const getDashboardStats = async () =>
  apiFetch("/admin/analytics/stats/");
export const getDailySales = async () =>
  apiFetch("/admin/analytics/daily_sales/");
export const getMonthlySales = async () =>
  apiFetch("/admin/analytics/monthly_sales/");
export const getSalesOverTime = async () =>
  apiFetch("/admin/analytics/sales_over_time/");
export const getNewUsers = async () => apiFetch("/admin/analytics/new_users/");
export const getTopProducts = async () =>
  apiFetch("/admin/analytics/top_products/");

/* ==========================================================
   🛍️ PRODUCTS
========================================================== */
export const getProducts = async () => apiFetch("/products/");

export async function apiAddProduct(data) {
  return apiFetch("/products/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function apiEditProduct(id, data) {
  return apiFetch(`/products/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteProduct(id) {
  return apiFetch(`/products/${id}/`, { method: "DELETE" });
}

export async function bulkUploadProducts(excelFile, zipFile = null) {
  const formData = new FormData();
  formData.append("excel_file", excelFile);
  if (zipFile) formData.append("images_zip", zipFile);

  const res = await fetch(`${API_BASE}/products/bulk-upload/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${getAccessToken()}` },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Bulk upload failed.");
  return data;
}

export const toggleProductTrending = async (id) =>
  apiFetch(`/products/${id}/toggle_trending/`, { method: "POST" });

export async function uploadProductImage(productId, file) {
  const formData = new FormData();
  formData.append("product", productId);
  formData.append("image", file);

  const res = await fetch(`${API_BASE}/product-images/`, {
    method: "POST",
    headers: { Authorization: `Bearer ${getAccessToken()}` },
    body: formData,
  });

  if (!res.ok) throw new Error("Image upload failed");
  return res.json();
}

export async function deleteProductImage(imageId) {
  return apiFetch(`/product-images/${imageId}/`, { method: "DELETE" });
}

/* ==========================================================
   🗂️ CATEGORIES
========================================================== */
export const getCategories = async () => apiFetch("/categories/");

export async function createCategory(data) {
  return apiFetch("/categories/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateCategory(id, data) {
  return apiFetch(`/categories/${id}/`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function deleteCategory(id) {
  return apiFetch(`/categories/${id}/`, { method: "DELETE" });
}

export async function uploadCategoryImage(categoryId, file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${API_BASE}/categories/${categoryId}/`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${getAccessToken()}` },
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload category image");
  return res.json();
}

export async function deleteCategoryImage(categoryId) {
  return apiFetch(`/categories/${categoryId}/delete-image/`, {
    method: "DELETE",
  });
}

/* ==========================================================
   👥 USER ADMIN
========================================================== */
export const getUsers = async () => apiFetch("/admin/users/");
export const toggleStaff = async (id) =>
  apiFetch(`/admin/users/${id}/toggle_staff/`, { method: "POST" });
export const promoteToOwner = async (id) =>
  apiFetch(`/admin/users/${id}/promote_to_owner/`, { method: "POST" });
