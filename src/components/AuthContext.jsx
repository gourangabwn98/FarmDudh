import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  const login = (mobile, otp) => {
    if (mobile === "+919876543210" && otp === "123456") {
      setIsLoggedIn(true);
      setUser({
        mobile,
        name: "John Doe",
        email: "john@example.com",
        address: "123 Dairy Lane",
        landmark: "Near Milk Farm",
        pincode: "713101",
      });
      return true;
    }
    alert("Invalid mobile or OTP");
    return false;
  };

  const register = (userData, otp) => {
    if (otp === "123456") {
      // Simulate OTP verification
      setIsLoggedIn(true);
      setUser({
        mobile: userData.mobile,
        name: userData.fullName || "New User",
        email: userData.email || "",
        address: userData.address || "",
        landmark: userData.landmark || "",
        pincode: userData.pincode || "",
      });
      return true;
    }
    alert("Invalid OTP");
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const updateProfile = (updatedData) => {
    setUser({ ...user, ...updatedData });
  };

  const addOrder = (order) => {
    setOrders([...orders, order]);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        register,
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
