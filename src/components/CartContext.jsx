// src/context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
};

const API_BASE = "http://localhost:5000/api";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchCart = async () => {
    if (!token) {
      setCartItems([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        const items = data.items.map((i) => ({
          _id: i.product._id,
          id: i.product._id,
          name: i.product.name,
          price: i.product.price,
          unit: i.product.unit,
          img: i.product.img,
          discount: i.product.discount || 0,
          quantity: i.quantity,
          badge: i.product.badge,
        }));
        setCartItems(items);
      } else if (res.status === 401) {
        toast.error("Session expired. Please login again.");
        localStorage.removeItem("token");
        // Do NOT navigate here! Let component handle it
      }
    } catch (err) {
      console.error("Fetch cart error:", err);
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [token]);

  // === ADD TO CART ===
  const addToCart = async (product) => {
    if (!token) return toast.error("Please login to add to cart");
    try {
      const res = await fetch(`${API_BASE}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product._id, quantity: 1 }),
      });
      if (!res.ok) throw new Error("Failed to add");
      await fetchCart();
      toast.success(`${product.name} added!`);
    } catch (err) {
      toast.error(err.message);
    }
  };

  // === REMOVE / UPDATE / CLEAR ===
  const removeFromCart = async (productId) => {
    if (!token) return;
    try {
      await fetch(`${API_BASE}/cart/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCart();
      toast.success("Item removed");
    } catch (err) {
      toast.error("Failed to remove");
    }
  };

  const updateQuantity = async (productId, change) => {
    const item = cartItems.find((i) => i._id === productId);
    if (!item) return;
    const newQty = Math.max(1, item.quantity + change);
    if (newQty === item.quantity) return;

    setCartItems((prev) =>
      prev.map((i) => (i._id === productId ? { ...i, quantity: newQty } : i))
    );

    try {
      await fetch(`${API_BASE}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: change > 0 ? 1 : -1 }),
      });
      await fetchCart();
    } catch (err) {
      toast.error("Update failed");
      await fetchCart();
    }
  };

  const clearCart = async () => {
    setCartItems([]);
    if (token) {
      try {
        await fetch(`${API_BASE}/cart`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error("Clear cart error:", err);
      }
    }
  };

  // === PLACE ORDER ===
  const placeOrder = async (address, pincode) => {
    if (!token) {
      toast.error("Login required");
      return { success: false, redirect: "/login?redirect=cart" };
    }

    try {
      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ address, pincode }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Order failed");
      }

      const order = await res.json();
      await clearCart();
      toast.success(`Order #${order._id.slice(-6)} placed!`);
      return { success: true, orderId: order._id };
    } catch (err) {
      toast.error(err.message);
      return { success: false };
    }
  };

  // === CALCULATIONS ===
  const getCartTotal = () =>
    cartItems.reduce(
      (t, i) => t + (i.price - (i.price * i.discount) / 100) * i.quantity,
      0
    );
  const getCartCount = () => cartItems.reduce((c, i) => c + i.quantity, 0);
  const getCartSubtotal = () =>
    cartItems.reduce((t, i) => t + i.price * i.quantity, 0);
  const getTotalSavings = () =>
    cartItems.reduce(
      (s, i) => s + ((i.price * i.discount) / 100) * i.quantity,
      0
    );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    placeOrder,
    getCartTotal,
    getCartCount,
    getCartSubtotal,
    getTotalSavings,
    loading,
    refreshCart: fetchCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
