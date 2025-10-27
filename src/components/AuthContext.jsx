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

  // Load user from localStorage on mount (for persistence)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const login = (mobile, otp) => {
    // Simulated OTP verification (replace with real SMS API)
    if (otp === "123456") {
      // Example OTP
      const userData = JSON.parse(localStorage.getItem("user") || "{}");
      if (userData.mobile === mobile) {
        setIsLoggedIn(true);
        setUser(userData);
        return true;
      }
      alert("User not found. Please register.");
      return false;
    }
    alert("Invalid OTP");
    return false;
  };

  const register = (userData, otp) => {
    // Simulated OTP verification (replace with real SMS API)
    if (otp === "123456") {
      // Example OTP
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
      setIsLoggedIn(true);
      return true;
    }
    alert("Invalid OTP");
    return false;
  };

  const updateProfile = (updatedData) => {
    const newUserData = { ...user, ...updatedData };
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, login, register, updateProfile, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
