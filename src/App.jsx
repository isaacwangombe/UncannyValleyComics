// src/App.jsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StorePage from "./pages/storePage/StorePage";
import CheckoutPage from "./pages/checkoutPage/CheckoutPage";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import AdminLayout from "./Components/admin/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import ProductsPage from "./pages/admin/ProductsPage";
import CategoriesAdminPage from "./pages/admin/CategoriesPage";
import UsersAdminPage from "./pages/admin/UsersPage";

import Navbars from "./Components/navbar/Navbar";
import Footer from "./Components/footer/Footer";
import CartDrawer from "./Components/cartDrawer/CartDrawer";

import { CartProvider, useCart } from "./contexts/CartContext";
import { ensureCsrfToken } from "./api";

function App() {
  useEffect(() => {
    ensureCsrfToken();
  }, []);

  return (
    <Router>
      {/* ✅ Provider wraps everything */}
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

// ✅ AppContent uses useCart() safely (inside provider)
function AppContent() {
  const { drawerOpen, closeCart } = useCart();

  return (
    <>
      <Navbars />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/*" element={<AdminLayoutWrapper />} />
      </Routes>

      <Footer />

      {/* ✅ Global cart drawer always available */}
      <CartDrawer show={drawerOpen} onClose={closeCart} />
    </>
  );
}

// ✅ Admin routes nested under AdminLayout
const AdminLayoutWrapper = () => (
  <AdminLayout>
    <Routes>
      <Route path="dashboard" element={<DashboardPage />} />
      <Route path="products" element={<ProductsPage />} />
      <Route path="categories" element={<CategoriesAdminPage />} />
      <Route path="users" element={<UsersAdminPage />} />
    </Routes>
  </AdminLayout>
);

export default App;
