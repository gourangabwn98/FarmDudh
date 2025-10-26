import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-milkvilla-green text-white py-4 sticky top-0 z-50 shadow-md animate-slideUp font-poppins">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-3">
            <div className="relative h-12 w-12">
              <video
                src="/assets/videos/milk.mp4" // Replace with your MP4 file path
                alt="FarmDudh Logo"
                className="h-full w-full object-cover rounded-full hover:animate-scaleHover transition-all duration-300"
                autoPlay
                loop
                muted
                playsInline
              />
            </div>
            <span className="text-2xl md:text-3xl font-extrabold text-white bg-gradient-to-r from-green-200 to-green-400 bg-clip-text text-transparent z-10">
              FarmDudh
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6 text-base font-medium">
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

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

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
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

export default Header;
