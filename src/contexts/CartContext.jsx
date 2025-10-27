// src/contexts/CartContext.jsx
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import {
  apiGetCart,
  apiAddCartItem,
  apiRemoveCartItem,
  apiIncreaseCartItem,
  apiDecreaseCartItem,
} from "../api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  // Drawer state for global cart UI
  const [drawerOpen, setDrawerOpen] = useState(false);

  // ✅ Memoized loader to avoid re-creation
  const load = useCallback(async () => {
    try {
      setLoading(true);
      const data = await apiGetCart();
      setCart(data);
    } catch (err) {
      console.error("Cart load failed", err);
      setCart(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // Load cart on mount
  useEffect(() => {
    load();
  }, [load]);

  // ---------- Cart actions (keep existing signatures) ----------
  const addItem = async ({ product_id, quantity = 1 }) => {
    try {
      const updated = await apiAddCartItem(product_id, quantity);
      setCart(updated); // API expected to return full cart
      return updated;
    } catch (err) {
      console.error("Add item failed", err);
      throw err;
    }
  };

  const removeItem = async (item_id) => {
    try {
      const updated = await apiRemoveCartItem(item_id);
      setCart(updated);
      return updated;
    } catch (err) {
      console.error("Remove item failed", err);
      throw err;
    }
  };

  const increase = async ({ product_id }) => {
    try {
      const updated = await apiIncreaseCartItem(product_id);
      setCart(updated);
      return updated;
    } catch (err) {
      console.error("Increase item failed", err);
      throw err;
    }
  };

  const decrease = async ({ product_id }) => {
    try {
      const updated = await apiDecreaseCartItem(product_id);
      setCart(updated);
      return updated;
    } catch (err) {
      console.error("Decrease item failed", err);
      throw err;
    }
  };

  // ---------- Drawer controls (new) ----------
  const openCart = () => setDrawerOpen(true);
  const closeCart = () => setDrawerOpen(false);
  const toggleCart = () => setDrawerOpen((s) => !s);

  // expose public API
  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        reload: load,
        addItem,
        removeItem,
        increase,
        decrease,
        // drawer controls
        drawerOpen,
        openCart,
        closeCart,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
