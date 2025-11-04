// src/pages/Products.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Star,
  Heart,
  ShoppingCart,
  Check,
  Zap,
  Leaf,
  Award,
  TrendingUp,
  Package,
  Clock,
  Shield,
  Search,
  Loader2,
  CheckCircle,
} from "lucide-react";
import { useCart } from "../components/CartContext"; // <-- Make sure path is correct
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Products() {
  const backend_api_base = process.env.REACT_APP_API_BASE;
  const navigate = useNavigate();
  const { addToCart } = useCart(); // <-- ONLY THIS! No duplicate API call

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  // FETCH PRODUCTS FROM API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const res = await fetch(`${backend_api_base}/products`);
        const res = await fetch(
          "https://dairydudh-backend.onrender.com/api/products"
        );
        if (!res.ok) throw new Error("Failed to load products");
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // ADD TO CART — ONLY VIA CONTEXT
  const handleAddToCart = (product) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to add to cart");
      navigate("/login?redirect=products");
      return;
    }
    addToCart(product); // ← This calls API once via CartContext
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const finalPrice = (price, discount) =>
    (price - (price * discount) / 100).toFixed(0);

  const categories = [
    { id: "all", name: "All Products", Icon: Package },
    { id: "milk", name: "Milk", Icon: Leaf },
    { id: "ghee", name: "Ghee", Icon: Award },
    { id: "dairy", name: "Dairy Products", Icon: Star },
  ];

  // LOADING STATE
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading fresh products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <p className="text-red-600 text-xl">⚠️ {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-full"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: Math.random() * 100 + 50 + "px",
                height: Math.random() * 100 + 50 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                animation: `float ${
                  Math.random() * 20 + 10
                }s ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm font-bold mb-6">
              🌟 PREMIUM DAIRY COLLECTION
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6 leading-tight">
              Our A2 Dairy Products
              <br />
              <span className="text-green-200">for Purba Burdwan</span>
            </h1>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Sourced exclusively from Purba Burdwan's local desi cow farmers,
              our A2 milk and dairy products are crafted with tradition and
              delivered with care.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { Icon: Shield, text: "FSSAI Certified" },
                { Icon: Leaf, text: "100% Natural" },
                { Icon: Clock, text: "10 Min Delivery" },
                { Icon: Award, text: "Premium Quality" },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full text-white text-sm font-semibold"
                >
                  <item.Icon size={16} />
                  {item.text}
                </div>
              ))}
            </div>

            <div className="inline-flex items-center gap-3 bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-2xl animate-pulse">
              <Zap className="fill-yellow-600" size={24} />
              <span>Limited Time: 10% OFF on First Order!</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-16 z-40 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-all duration-300"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === cat.id
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <cat.Icon size={18} />
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex justify-between items-center">
            <p className="text-gray-600 font-semibold">
              Showing {filteredProducts.length} products
            </p>
            <div className="flex items-center gap-2 text-gray-600">
              <TrendingUp size={20} className="text-green-600" />
              <span className="text-sm font-semibold">Most Popular First</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 border border-gray-100"
              >
                <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 h-64">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />

                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                    {product.badge || "Premium"}
                  </div>

                  {product.discount > 0 && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {product.discount}% OFF
                    </div>
                  )}

                  <button
                    onClick={() => toggleFavorite(product._id)}
                    className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
                  >
                    <Heart
                      size={20}
                      className={`${
                        favorites.includes(product._id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < Math.floor(product.rating || 5)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-gray-700">
                      {product.rating || 5.0}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({product.reviews || 0} reviews)
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                    {product.name}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {product.desc}
                  </p>

                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {(product.features || []).slice(0, 4).map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-1 text-xs text-gray-600"
                      >
                        <Check
                          size={14}
                          className="text-green-600 flex-shrink-0"
                        />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-extrabold text-green-600">
                      ₹{finalPrice(product.price, product.discount || 0)}
                    </span>
                    {product.discount > 0 && (
                      <span className="text-lg text-gray-400 line-through">
                        ₹{product.price}
                      </span>
                    )}
                    <span className="text-sm text-gray-500">
                      per {product.unit}
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-full hover:from-green-700 hover:to-emerald-700 shadow-lg font-bold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                    >
                      <ShoppingCart size={18} />
                      Add to Cart
                    </button>
                    <button className="bg-green-100 text-green-700 px-4 py-3 rounded-full hover:bg-green-200 transition-all duration-300">
                      <Zap size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
        </div>
      </section>

      {/* View Cart Button */}
      <button
        onClick={() => navigate("/cart")}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-4 rounded-full shadow-2xl hover:scale-110 transition-all duration-300 flex items-center gap-2 font-bold z-40"
      >
        <ShoppingCart size={20} />
        View Cart
      </button>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
      `}</style>
    </div>
  );
}

export default Products;
