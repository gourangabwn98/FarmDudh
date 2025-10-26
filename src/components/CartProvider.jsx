import React, { createContext, useContext, useState } from "react";
import { ShoppingCart, Menu, X, Trash2, Plus, Minus } from "lucide-react";

// ========== CART CONTEXT ==========
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ========== ENHANCED HEADER WITH CART ==========
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getCartCount,
    getCartTotal,
  } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const cartCount = getCartCount();
  const cartTotal = getCartTotal();

  return (
    <>
      <header className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 sticky top-0 z-50 shadow-lg font-sans">
        <div className="container mx-auto flex justify-between items-center px-4">
          {/* Logo and Brand Name */}
          <div className="flex items-center space-x-3">
            <a href="/" className="flex items-center space-x-3">
              <div className="relative h-12 w-12">
                <video
                  src="/assets/videos/milk.mp4"
                  alt="FarmDudh Logo"
                  className="h-full w-full object-cover rounded-full hover:scale-110 transition-all duration-300"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
              <span className="text-2xl md:text-3xl font-extrabold text-white">
                FarmDudh
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-base font-medium">
            <a
              href="/"
              className="hover:text-green-200 transition-colors duration-300"
            >
              Home
            </a>
            <a
              href="/products"
              className="hover:text-green-200 transition-colors duration-300"
            >
              Products
            </a>
            <a
              href="/why-us"
              className="hover:text-green-200 transition-colors duration-300"
            >
              Why Us
            </a>
            <a
              href="/about"
              className="hover:text-green-200 transition-colors duration-300"
            >
              About
            </a>
            <a
              href="/contact"
              className="hover:text-green-200 transition-colors duration-300"
            >
              Contact
            </a>

            {/* Cart Icon */}
            <button
              onClick={toggleCart}
              className="relative hover:text-green-200 transition-colors duration-300 p-2"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>

          {/* Mobile Menu & Cart Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleCart}
              className="relative text-white focus:outline-none"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            <button
              className="text-white focus:outline-none"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden absolute top-full left-0 w-full bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg">
            <div className="flex flex-col items-center space-y-4 py-4">
              <a
                href="/"
                className="text-base font-medium hover:text-green-200 transition-colors duration-300"
                onClick={toggleMenu}
              >
                Home
              </a>
              <a
                href="/products"
                className="text-base font-medium hover:text-green-200 transition-colors duration-300"
                onClick={toggleMenu}
              >
                Products
              </a>
              <a
                href="/why-us"
                className="text-base font-medium hover:text-green-200 transition-colors duration-300"
                onClick={toggleMenu}
              >
                Why Us
              </a>
              <a
                href="/about"
                className="text-base font-medium hover:text-green-200 transition-colors duration-300"
                onClick={toggleMenu}
              >
                About
              </a>
              <a
                href="/contact"
                className="text-base font-medium hover:text-green-200 transition-colors duration-300"
                onClick={toggleMenu}
              >
                Contact
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
            onClick={toggleCart}
          />

          {/* Cart Sidebar */}
          <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 overflow-y-auto transform transition-transform duration-300">
            <div className="p-6">
              {/* Cart Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <ShoppingCart size={24} className="text-green-600" />
                  Your Cart ({cartCount})
                </h2>
                <button
                  onClick={toggleCart}
                  className="text-gray-500 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition-all duration-300"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Cart Items */}
              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart
                    size={64}
                    className="text-gray-300 mx-auto mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-700 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Add some delicious dairy products!
                  </p>
                  <button
                    onClick={toggleCart}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-full font-bold hover:scale-105 transition-all duration-300"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="bg-gray-50 rounded-xl p-4 hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <div className="w-20 h-20 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                            <img
                              src={item.img}
                              alt={item.name}
                              className="w-full h-full object-contain p-2"
                            />
                          </div>

                          {/* Product Details */}
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-gray-900 text-sm">
                                {item.name}
                              </h3>
                              <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-all duration-300"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>

                            <p className="text-sm text-gray-500 mb-2">
                              ₹{item.price} / {item.unit}
                            </p>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 bg-white rounded-full p-1">
                                <button
                                  onClick={() => updateQuantity(item.id, -1)}
                                  className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300"
                                >
                                  <Minus size={12} />
                                </button>
                                <span className="font-bold text-gray-900 w-6 text-center text-sm">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item.id, 1)}
                                  className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300"
                                >
                                  <Plus size={12} />
                                </button>
                              </div>
                              <span className="font-bold text-gray-900">
                                ₹{item.price * item.quantity}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Cart Summary */}
                  <div className="border-t-2 border-gray-200 pt-6">
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between text-gray-700">
                        <span>Subtotal</span>
                        <span className="font-semibold">₹{cartTotal}</span>
                      </div>
                      <div className="flex justify-between text-gray-700">
                        <span>Delivery Fee</span>
                        <span className="font-semibold text-green-600">
                          {cartTotal > 500 ? "FREE" : "₹20"}
                        </span>
                      </div>
                      {cartTotal < 500 && (
                        <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                          Add ₹{500 - cartTotal} more for FREE delivery!
                        </p>
                      )}
                      <div className="border-t-2 border-gray-200 pt-3 flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-green-600">
                          ₹{cartTotal + (cartTotal > 500 ? 0 : 20)}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        toggleCart();
                        window.location.href = "/checkout";
                      }}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 shadow-lg"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

// ========== PRODUCT CARD COMPONENT WITH ADD TO CART ==========
export function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    // Optional: Show toast notification
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 border border-gray-100">
      <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 h-64">
        <img
          src={product.img}
          alt={product.name}
          className="w-full h-full object-contain p-6"
        />
        {product.badge && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
            {product.badge}
          </div>
        )}
        {product.discount > 0 && (
          <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            {product.discount}% OFF
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4">{product.desc}</p>

        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl font-extrabold text-green-600">
            ₹{product.price}
          </span>
          {product.discount > 0 && product.originalPrice && (
            <span className="text-lg text-gray-400 line-through">
              ₹{product.originalPrice}
            </span>
          )}
          <span className="text-sm text-gray-500">{product.unit}</span>
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-full hover:from-green-700 hover:to-emerald-700 shadow-lg font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// ========== DEMO APP ==========
export default function App() {
  const sampleProducts = [
    {
      id: 1,
      name: "A2 Desi Cow Milk",
      desc: "Fresh from Purba Burdwan's free-grazing desi cows",
      img: "/assets/images/a2milk.webp",
      price: 72,
      originalPrice: 80,
      unit: "liter",
      badge: "Best Seller",
      discount: 10,
    },
    {
      id: 2,
      name: "A2 Cow Ghee",
      desc: "Hand-churned using traditional bilona method",
      img: "/assets/images/ghee.webp",
      price: 405,
      originalPrice: 450,
      unit: "500g",
      badge: "Premium",
      discount: 10,
    },
    {
      id: 3,
      name: "Creamy Dahi",
      desc: "Rich, probiotic-packed curd",
      img: "/assets/images/dahi.jpeg",
      price: 45,
      originalPrice: 50,
      unit: "500g",
      discount: 10,
    },
  ];

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="container mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-12 text-gray-900">
            Our Products
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sampleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </CartProvider>
  );
}
