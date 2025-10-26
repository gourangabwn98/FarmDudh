import React, { useState } from "react";
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
} from "lucide-react";

function Products() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  const products = [
    {
      id: 1,
      name: "A2 Desi Cow Milk",
      category: "milk",
      desc: "Fresh from Purba Burdwan's free-grazing desi cows, rich in A2 protein and nutrients.",
      img: "/assets/images/a2milk.webp",
      price: 67.0,
      unit: "per liter",
      rating: 4.9,
      reviews: 156,
      badge: "Best Seller",
      features: [
        "100% Pure A2",
        "Unprocessed",
        "10-Min Delivery",
        "Zero Additives",
      ],
      discount: 10,
    },
    {
      id: 2,
      name: "Buffalo Milk",
      category: "milk",
      desc: "Creamy, high-fat milk from healthy buffaloes, perfect for making rich dairy products.",
      img: "/assets/images/BUFFALO MILK.png",
      price: 78,
      unit: "per liter",
      rating: 4.8,
      reviews: 98,
      badge: "Rich & Creamy",
      features: [
        "High Fat Content",
        "Locally Sourced",
        "Fresh Daily",
        "Premium Quality",
      ],
      discount: 10,
    },
    {
      id: 3,
      name: "A2 Cow Ghee",
      category: "ghee",
      desc: "Hand-churned using traditional bilona method, packed with flavor and health benefits.",
      img: "/assets/images/ghee.webp",
      price: 450,
      unit: "per 500g",
      rating: 5.0,
      reviews: 234,
      badge: "Premium",
      features: [
        "Bilona Method",
        "Traditional Recipe",
        "Rich Aroma",
        "Pure A2",
      ],
      discount: 10,
    },
    {
      id: 4,
      name: "Fresh Paneer",
      category: "dairy",
      desc: "Soft, homemade paneer crafted daily from pure milk, perfect for cooking.",
      img: "/assets/images/paneer.jpg",
      price: 80,
      unit: "per 250g",
      rating: 4.7,
      reviews: 87,
      badge: "Daily Fresh",
      features: [
        "Made Fresh",
        "Soft Texture",
        "High Protein",
        "No Preservatives",
      ],
      discount: 10,
    },
    {
      id: 5,
      name: "Creamy Dahi",
      category: "dairy",
      desc: "Rich, probiotic-packed curd made traditionally, perfect for digestion.",
      img: "/assets/images/dahi.jpeg",
      price: 50,
      unit: "per 500g",
      rating: 4.8,
      reviews: 90,
      badge: "Probiotic Rich",
      features: [
        "Probiotic",
        "Traditional Method",
        "Fresh Culture",
        "Creamy Texture",
      ],
      discount: 10,
    },
    {
      id: 6,
      name: "Organic Buttermilk",
      category: "dairy",
      desc: "Refreshing and healthy buttermilk made from pure dahi, aids digestion.",
      img: "/assets/images/dahi.jpeg",
      price: 30,
      unit: "per 500ml",
      rating: 4.6,
      reviews: 76,
      badge: "Healthy",
      features: ["Digestive", "Low Calorie", "Refreshing", "Natural"],
      discount: 10,
    },
  ];

  const categories = [
    { id: "all", name: "All Products", Icon: Package },
    { id: "milk", name: "Milk", Icon: Leaf },
    { id: "ghee", name: "Ghee", Icon: Award },
    { id: "dairy", name: "Dairy Products", Icon: Star },
  ];

  const toggleFavorite = (productId) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (product) => {
    alert(`${product.name} added to cart!`);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
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

            {/* Trust Indicators */}
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

            {/* Special Offer Banner */}
            <div className="inline-flex items-center gap-3 bg-yellow-400 text-gray-900 px-8 py-4 rounded-full font-bold text-lg shadow-2xl animate-pulse">
              <Zap className="fill-yellow-600" size={24} />
              <span>Limited Time: 10% OFF on First Order!</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-40 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Bar */}
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

            {/* Category Filters */}
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
          {/* Results Count */}
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
                key={product.id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2 border border-gray-100"
              >
                {/* Product Image */}
                <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 h-64">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-contain p-6 group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg">
                    {product.badge}
                  </div>

                  {/* Discount Badge */}
                  {product.discount > 0 && (
                    <div className="absolute top-4 right-4 bg-yellow-400 text-gray-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                      {product.discount}% OFF
                    </div>
                  )}

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute bottom-4 right-4 bg-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
                  >
                    <Heart
                      size={20}
                      className={`${
                        favorites.includes(product.id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>
                </div>

                {/* Product Details */}
                <div className="p-6">
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < Math.floor(product.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-gray-700">
                      {product.rating}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Product Name */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors duration-300">
                    {product.name}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {product.desc}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {product.features.slice(0, 4).map((feature, i) => (
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

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-extrabold text-green-600">
                      ₹
                      {product.price - (product.price * product.discount) / 100}
                    </span>
                    {product.discount > 0 && (
                      <span className="text-lg text-gray-400 line-through">
                        ₹{product.price}
                      </span>
                    )}
                    <span className="text-sm text-gray-500">
                      {product.unit}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => addToCart(product)}
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

          {/* No Results Message */}
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

      {/* Why Choose Our Products */}
      <section className="py-20 bg-gradient-to-br from-green-100 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Why Choose <span className="text-green-600">FarmDudh</span>?
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Experience the taste of tradition with quality you can trust
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                Icon: Leaf,
                title: "100% Pure & Natural",
                desc: "No additives, preservatives, or processing—just pure dairy goodness.",
                color: "from-green-500 to-emerald-500",
              },
              {
                Icon: Clock,
                title: "10-Minute Delivery",
                desc: "Fresh from farm to your doorstep in just 10 minutes across Purba Burdwan.",
                color: "from-blue-500 to-cyan-500",
              },
              {
                Icon: Shield,
                title: "FSSAI Certified",
                desc: "Tested daily for quality and purity. Your health is our priority.",
                color: "from-purple-500 to-pink-500",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 mx-auto shadow-lg`}
                >
                  <item.Icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Highlight */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              {/* Left Side - Image */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl blur-2xl opacity-20"></div>
                <img
                  src="/assets/images/a2milk.webp"
                  alt="Premium A2 Milk"
                  className="relative w-full h-96 object-contain rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -right-6 bg-yellow-400 text-gray-900 px-6 py-3 rounded-full font-bold shadow-xl">
                  🏆 Best Seller
                </div>
              </div>

              {/* Right Side - Content */}
              <div>
                <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                  ⭐ FEATURED PRODUCT
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
                  Pure A2 Desi Cow Milk
                </h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Experience the authentic taste of traditional dairy with our
                  premium A2 milk, sourced directly from free-grazing desi cows
                  in Purba Burdwan. Rich in protein, vitamins, and
                  minerals—naturally.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    "100% Pure A2 Beta-Casein Protein",
                    "From Free-Grazing Desi Cows",
                    "No Hormones or Antibiotics",
                    "Delivered Fresh Within 10 Minutes",
                    "FSSAI Certified Quality",
                  ].map((benefit, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="text-white" size={14} />
                      </div>
                      <span className="text-gray-700 font-medium">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="text-4xl font-extrabold text-green-600">
                    ₹72
                  </span>
                  <span className="text-2xl text-gray-400 line-through">
                    ₹80
                  </span>
                  <span className="text-lg text-gray-600">per liter</span>
                </div>

                <button
                  onClick={() => addToCart(products[0])}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-10 rounded-full hover:from-green-700 hover:to-emerald-700 shadow-xl font-bold text-lg transition-all duration-300 hover:scale-105 inline-flex items-center gap-3"
                >
                  <ShoppingCart size={22} />
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <div className="flex justify-center items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-400 fill-yellow-400"
                    size={24}
                  />
                ))}
              </div>
              <span className="text-2xl font-bold text-gray-900">4.9</span>
              <span className="text-gray-600">(500+ reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Priya Sharma",
                text: "Best A2 milk in Purba Burdwan! My family loves the taste and quality. Delivery is always on time.",
                rating: 5,
              },
              {
                name: "Amit Kumar",
                text: "The ghee is absolutely amazing! Pure and aromatic. Worth every rupee. Highly recommended!",
                rating: 5,
              },
              {
                name: "Sneha Roy",
                text: "Fresh paneer delivered daily. Perfect for our recipes. Great service and excellent products!",
                rating: 5,
              },
            ].map((review, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star
                      key={j}
                      className="text-yellow-400 fill-yellow-400"
                      size={16}
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4 leading-relaxed">
                  "{review.text}"
                </p>
                <p className="font-bold text-gray-900">{review.name}</p>
                <p className="text-sm text-gray-500">Verified Customer</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 relative overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-10"
              style={{
                width: Math.random() * 100 + 50 + "px",
                height: Math.random() * 100 + 50 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                animation: `float ${
                  Math.random() * 15 + 10
                }s ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Experience Pure Dairy?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Order now and get 10% off on your first purchase plus free delivery
            within 10 minutes!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="bg-white text-green-700 py-4 px-12 rounded-full hover:bg-green-50 shadow-2xl text-xl font-bold transition-all duration-300 hover:scale-110 inline-flex items-center justify-center gap-3"
            >
              <ShoppingCart size={24} />
              Start Shopping
            </button>
            <button
              onClick={() => alert("Contact us for bulk orders")}
              className="bg-transparent border-2 border-white text-white py-4 px-12 rounded-full hover:bg-white/10 shadow-xl text-xl font-bold transition-all duration-300"
            >
              Bulk Orders
            </button>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-white">
            <div className="flex items-center gap-2">
              <Shield className="text-green-300" size={24} />
              <span className="font-semibold">FSSAI Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-green-300" size={24} />
              <span className="font-semibold">10-Min Delivery</span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="text-green-300" size={24} />
              <span className="font-semibold">100% Natural</span>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { 
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
