// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const stored = localStorage.getItem("user");
    if (token && stored) {
      setIsLoggedIn(true);
      setUser(JSON.parse(stored));
    }
  }, []);

  // ---------- LOGIN ----------
  const login = (token, userFromBackend) => {
    // userFromBackend = the full MongoDB document (including address, pincode, dateOfBirth, etc.)
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userFromBackend)); // <-- ALL fields saved
    setIsLoggedIn(true);
    setUser(userFromBackend);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUser(null);
  };

  const updateProfile = (updates) => {
    const newUser = { ...user, ...updates };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const addOrder = (order) => setOrders((prev) => [...prev, order]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
        updateProfile,
        orders,
        addOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
