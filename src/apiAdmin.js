import axios from "axios";

export const API_BASE = import.meta.env.VITE_API_URL;
// export const API_BASE = "http://127.0.0.1:8000/api";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

export async function ensureCsrf() {
  const csrfToken = getCookie("csrftoken");
  if (!csrfToken) {
    await fetch(API_BASE + "/users/set-csrf/", {
      credentials: "include",
    });
  }
}

export const api = axios.create({
  baseURL: API_BASE,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(async (config) => {
  const csrfToken = getCookie("csrftoken");
  if (csrfToken) {
    config.headers["X-CSRFToken"] = csrfToken;
  } else {
    // fallback: ensure one is set
    await fetch(API_BASE + "/users/set-csrf/", {
      credentials: "include",
    });
    const newToken = getCookie("csrftoken");
    if (newToken) config.headers["X-CSRFToken"] = newToken;
  }
  return config;
});

// --- DASHBOARD ---
export const getDashboardStats = async () => {
  const res = await api.get("/admin/analytics/stats/");
  return res.data;
};
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
  const csrfToken = getCookie("csrftoken");

  const res = await fetch(API_BASE + `/products/${id}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken, // 👈 include this
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}

export async function apiAddProduct(data) {
  const csrfToken = getCookie("csrftoken");

  const res = await fetch(API_BASE + `/products/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrfToken, // 👈 include this too
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to add product");
  return res.json();
}

// --- BULK UPLOAD PRODUCTS (Excel + optional ZIP) ---
export async function bulkUploadProducts(excelFile, zipFile = null) {
  // ✅ Fetch CSRF token from cookie
  const csrfToken = document.cookie
    .split("; ")
    .find((r) => r.startsWith("csrftoken="))
    ?.split("=")[1];

  const formData = new FormData();
  formData.append("excel_file", excelFile);
  if (zipFile) {
    formData.append("images_zip", zipFile);
  }

  // ✅ Include CSRF token header
  const res = await fetch(API_BASE + "/products/bulk-upload/", {
    method: "POST",
    credentials: "include",
    headers: {
      "X-CSRFToken": csrfToken,
    },
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Bulk upload failed.");
  return data;
}

export const toggleProductTrending = async (id) => {
  const csrfToken = document.cookie
    .split("; ")
    .find((r) => r.startsWith("csrftoken="))
    ?.split("=")[1];

  const res = await fetch(API_BASE + `/products/${id}/toggle_trending/`, {
    method: "POST",
    headers: { "X-CSRFToken": csrfToken },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to toggle trending");
  return res.json();
};

export async function uploadProductImage(productId, file) {
  const csrfToken = document.cookie
    .split("; ")
    .find((r) => r.startsWith("csrftoken="))
    ?.split("=")[1];

  const formData = new FormData();
  formData.append("product", productId);
  formData.append("image", file);

  const res = await fetch(API_BASE + "/product-images/", {
    method: "POST",
    headers: { "X-CSRFToken": csrfToken },
    credentials: "include",
    body: formData,
  });

  if (!res.ok) throw new Error("Image upload failed");
  return res.json();
}

export async function deleteProductImage(imageId) {
  const csrfToken = document.cookie
    .split("; ")
    .find((r) => r.startsWith("csrftoken="))
    ?.split("=")[1];

  const res = await fetch(API_BASE + `/product-images/${imageId}/`, {
    method: "DELETE",
    headers: {
      "X-CSRFToken": csrfToken,
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Failed to delete product image");
  return res.json().catch(() => ({})); // handle empty 204 response
}

// --- CATEGORIES ---
// --- CATEGORIES ---
export const getCategories = async () => (await api.get("/categories/")).data;

export const createCategory = async (data) => {
  const csrfToken = getCookie("csrftoken");
  const res = await api.post("/categories/", data, {
    headers: { "X-CSRFToken": csrfToken },
  });
  return res.data;
};

export const updateCategory = async (id, data) => {
  const csrfToken = getCookie("csrftoken");
  const res = await api.put(`/categories/${id}/`, data, {
    headers: { "X-CSRFToken": csrfToken },
  });
  return res.data;
};

export const deleteCategory = async (id) => {
  const csrfToken = getCookie("csrftoken");
  const res = await api.delete(`/categories/${id}/`, {
    headers: { "X-CSRFToken": csrfToken },
  });
  return res.data;
};

export async function uploadCategoryImage(categoryId, file) {
  const csrfToken = document.cookie
    .split("; ")
    .find((r) => r.startsWith("csrftoken="))
    ?.split("=")[1];

  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(API_BASE + `/categories/${categoryId}/`, {
    method: "PATCH",
    headers: { "X-CSRFToken": csrfToken },
    credentials: "include",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload category image");
  return res.json();
}

// --- CATEGORY IMAGES ---
export async function deleteCategoryImage(categoryId) {
  const csrfToken = document.cookie
    .split("; ")
    .find((r) => r.startsWith("csrftoken="))
    ?.split("=")[1];

  const res = await fetch(
    API_BASE + `/categories/${categoryId}/delete-image/`,
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

// --- USERS ---
// --- USERS ---
export const getUsers = async () => (await api.get("/admin/users/")).data;

export const toggleStaff = async (id) => {
  await ensureCsrf();
  const csrfToken = getCookie("csrftoken");
  const res = await api.post(
    `/admin/users/${id}/toggle_staff/`,
    {},
    { headers: { "X-CSRFToken": csrfToken } }
  );
  return res.data;
};

export const promoteToOwner = async (id) => {
  const csrfToken = getCookie("csrftoken");
  console.log("🔐 Sending promote_to_owner request with CSRF:", csrfToken);

  const res = await api.post(
    `/admin/users/${id}/promote_to_owner/`,
    {},
    {
      headers: {
        "X-CSRFToken": csrfToken,
      },
      withCredentials: true,
    }
  );

  return res.data;
};
