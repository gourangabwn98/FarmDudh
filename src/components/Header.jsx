import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ShoppingCart, User, LogOut } from "lucide-react";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { getCartCount } = useCart();
  const { isLoggedIn, user, logout } = useAuth();
  const cartCount = getCartCount();
  console.log("user", user);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsProfileOpen(false); // Close profile dropdown when menu toggles
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsMenuOpen(false); // Close main menu when profile toggles
  };

  return (
    <header className="bg-milkvilla-green text-white py-4 sticky top-0 z-50 shadow-md animate-slideUp font-poppins">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo and Brand Name (Left) */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative h-12 w-12">
              <video
                src="/assets/videos/milk.mp4"
                alt="Malati Dairy Logo"
                className="h-full w-full object-cover rounded-full hover:animate-scaleHover transition-all duration-300"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            {/* <span className="text-2xl md:text-3xl font-extrabold text-white bg-gradient-to-r from-green-200 to-green-400 bg-clip-text text-transparent z-10">
              Malati
            </span> */}
            <img
              src="/assets/images/malati_logo.png" // change path as needed
              alt="Malati Logo"
              className="h-14 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Desktop Navigation (Center) */}
        <nav className="hidden md:flex flex-1 justify-center items-center space-x-6 text-base font-medium">
          <Link
            to="/"
            className="hover:text-green-200 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="hover:text-green-200 transition-colors duration-300"
          >
            Products
          </Link>
          <Link
            to="/why-us"
            className="hover:text-green-200 transition-colors duration-300"
          >
            Why Us
          </Link>
          <Link
            to="/about"
            className="hover:text-green-200 transition-colors duration-300"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="hover:text-green-200 transition-colors duration-300"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop Auth Links (Right) */}
        <div className="hidden md:flex items-center space-x-6">
          {(isLoggedIn || cartCount > 0) && (
            <Link
              to="/cart"
              className="relative hover:text-green-200 transition-colors duration-300"
              aria-label="Cart"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          )}
          {isLoggedIn ? (
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center gap-2 hover:text-green-200 transition-colors duration-300"
                aria-label="Profile"
              >
                <User size={24} />
                <span>{user?.fullName || "Profile"}</span>
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-800 hover:bg-green-50 hover:text-milkvilla-green"
                    onClick={() => setIsProfileOpen(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 text-gray-800 hover:bg-green-50 hover:text-milkvilla-green"
                    onClick={() => setIsProfileOpen(false)} // Fixed empty onClick
                  >
                    All Orders
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsProfileOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-gray-800 hover:bg-green-50 hover:text-milkvilla-green flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="hover:text-green-200 transition-colors duration-300"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Toggle and Icons */}
        <div className="md:hidden flex items-center space-x-4">
          {(isLoggedIn || cartCount > 0) && (
            <Link to="/cart" className="relative text-white" aria-label="Cart">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </Link>
          )}
          {isLoggedIn && (
            <button
              onClick={toggleProfile}
              className="text-white"
              aria-label="Profile"
            >
              <User size={24} />
            </button>
          )}
          <button
            className="text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden absolute top-full left-0 w-full bg-milkvilla-green shadow-lg">
            <div className="flex flex-col items-center space-y-4 py-4">
              <Link
                to="/"
                className="text-base font-medium hover:text-green-200 transition-colors duration-300"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-base font-medium hover:text-green-200 transition-colors duration-300"
                onClick={toggleMenu}
              >
                Products
              </Link>
              <Link
                to="/why-us"
                className="text-base font-medium hover:text-green-200 transition-colors duration-300"
                onClick={toggleMenu}
              >
                Why Us
              </Link>
              <Link
                to="/about"
                className="text-base font-medium hover:text-green-200 transition-colors duration-300"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-base font-medium hover:text-green-200 transition-colors duration-300"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="text-base font-medium hover:text-green-200 transition-colors duration-300"
                    onClick={toggleMenu}
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/orders"
                    className="text-base font-medium hover:text-green-200 transition-colors duration-300"
                    onClick={toggleMenu}
                  >
                    All Orders
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      toggleMenu();
                    }}
                    className="text-base font-medium hover:text-green-200 transition-colors duration-300 flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="text-base font-medium hover:text-green-200 transition-colors duration-300"
                  onClick={toggleMenu}
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        )}

        {/* Mobile Profile Dropdown */}
        {isLoggedIn && isProfileOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-milkvilla-green shadow-lg">
            <div className="flex flex-col items-center space-y-4 py-4">
              <Link
                to="/profile"
                className="text-base font-medium hover:text-green-200 transition-colors duration-300"
                onClick={() => setIsProfileOpen(false)}
              >
                My Profile
              </Link>
              <Link
                to="/orders"
                className="text-base font-medium hover:text-green-200 transition-colors duration-300"
                onClick={() => setIsProfileOpen(false)}
              >
                All Orders
              </Link>
              <button
                onClick={() => {
                  logout();
                  setIsProfileOpen(false);
                }}
                className="text-base font-medium hover:text-green-200 transition-colors duration-300 flex items-center gap-2"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(-100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        @keyframes scaleHover {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.1);
          }
        }
        .hover\:animate-scaleHover:hover {
          animation: scaleHover 0.3s ease-out forwards;
        }
      `}</style>
    </header>
  );
}

export default Header;
