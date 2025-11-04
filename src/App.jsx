// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// 🏪 Public pages
import StorePage from "./pages/storePage/StorePage";
import CheckoutPage from "./pages/checkoutPage/CheckoutPage";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";

// 🧩 Admin pages
import AdminLayout from "./Components/admin/AdminLayout";
import DashboardPage from "./pages/admin/DashboardPage";
import ProductsPage from "./pages/admin/ProductsPage";
import CategoriesAdminPage from "./pages/admin/CategoriesPage";
import UsersAdminPage from "./pages/admin/UsersPage";

// 🧭 Layout components
import Navbars from "./Components/navbar/Navbar";
import Footer from "./Components/footer/Footer";
import CartDrawer from "./Components/cartDrawer/CartDrawer";

// 🛒 Cart context
import { CartProvider, useCart } from "./contexts/CartContext";

function App() {
  return (
    <Router>
      {/* ✅ CartProvider wraps the entire app */}
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

// ✅ AppContent handles routes and global UI
function AppContent() {
  const { drawerOpen, closeCart } = useCart();

  return (
    <>
      <Navbars />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/store" element={<StorePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin routes */}
        <Route path="/admin/*" element={<AdminLayoutWrapper />} />
      </Routes>

      <Footer />

      {/* ✅ Global Cart Drawer always available */}
      <CartDrawer show={drawerOpen} onClose={closeCart} />
    </>
  );
}

// ✅ Nested admin pages inside AdminLayout
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
