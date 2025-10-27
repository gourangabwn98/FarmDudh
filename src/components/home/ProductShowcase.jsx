import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Award,
  Heart,
  CheckCircle,
  Leaf,
} from "lucide-react";
import { useCart } from "../CartContext"; // Ensure path matches your project
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductShowcase() {
  const { addToCart } = useCart();
  const [currentProductIndex, setCurrentProductIndex] = useState(0);

  const products = [
    {
      id: 1,
      name: "A2 Desi Cow Milk",
      category: "milk",
      desc: "Fresh from Purba Burdwan's free-grazing desi cows, rich in A2 protein and nutrients.",
      img: "/assets/images/a2milk.webp",
      price: 80,
      unit: "liter",
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
      price: 70,
      unit: "liter",
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
      price: 650,
      unit: "500g",
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
      price: 90,
      unit: "250g",
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
      unit: "500g",
      rating: 4.8,
      reviews: 143,
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
      unit: "500ml",
      rating: 4.6,
      reviews: 76,
      badge: "Healthy",
      features: ["Digestive", "Low Calorie", "Refreshing", "Natural"],
      discount: 10,
    },
  ];

  const slidesPerView = 3;
  const totalProductSlides = Math.ceil(products.length / slidesPerView);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductIndex((prev) => (prev + 1) % totalProductSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalProductSlides]);

  const handleProductPrev = () => {
    setCurrentProductIndex(
      (prev) => (prev - 1 + totalProductSlides) % totalProductSlides
    );
  };

  const handleProductNext = () => {
    setCurrentProductIndex((prev) => (prev + 1) % totalProductSlides);
  };

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOrderGhee = () => {
    const gheeProduct = products.find((p) => p.id === 3);
    addToCart({
      ...gheeProduct,
      priceDisplay: `₹${gheeProduct.price}/${gheeProduct.unit}`,
    });
    toast.success(`${gheeProduct.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      priceDisplay: `₹${product.price}/${product.unit}`,
    });
    toast.success(`${product.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    });
  };

  return (
    <>
      <ToastContainer />
      {/* Featured Product Spotlight - A2 Ghee */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-4">
              ⭐ CUSTOMER FAVORITE
            </span>
            <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent mb-4">
              Experience the Purest A2 Cow Ghee
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Crafted with love using traditional bilona method by our local
              artisans
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
            <div className="relative w-full md:w-1/2 group">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
              <div className="relative bg-white rounded-3xl shadow-2xl p-8 group-hover:scale-105 transition-transform duration-500">
                <img
                  src="/assets/images/ghee.webp"
                  alt="A2 Cow Ghee"
                  className="w-full h-96 object-contain rounded-2xl"
                />
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse">
                  🔥 {products.find((p) => p.id === 3).badge}
                </div>
                <div className="absolute bottom-4 left-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full font-bold shadow-lg">
                  ₹{products.find((p) => p.id === 3).price}/
                  {products.find((p) => p.id === 3).unit}
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                <h3 className="text-2xl font-bold text-amber-700 mb-4 flex items-center gap-3">
                  <Award className="text-yellow-500" size={32} />
                  Why Our Ghee is Special
                </h3>
                <ul className="space-y-4">
                  {products
                    .find((p) => p.id === 3)
                    .features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-gray-700"
                      >
                        <CheckCircle
                          className="text-green-600 mt-1 flex-shrink-0"
                          size={20}
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                </ul>
                <div className="mt-4 flex items-center gap-2">
                  <Star className="text-yellow-500 fill-yellow-500" size={20} />
                  <span className="text-gray-700 font-semibold">
                    {products.find((p) => p.id === 3).rating} (
                    {products.find((p) => p.id === 3).reviews} reviews)
                  </span>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleOrderGhee}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-yellow-600 text-white py-4 px-8 rounded-full hover:from-amber-700 hover:to-yellow-700 shadow-xl text-center font-bold text-lg transition-all duration-300 hover:scale-105"
                >
                  Order Ghee Now
                </button>
                <button className="bg-white border-2 border-amber-600 text-amber-700 px-6 py-4 rounded-full hover:bg-amber-50 transition-all duration-300">
                  <Heart size={24} />
                </button>
              </div>
              <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-6 border-2 border-green-300">
                <p className="text-green-800 font-semibold flex items-center gap-2">
                  <Leaf className="text-green-600" size={20} />
                  Perfect for cooking, wellness rituals & Ayurvedic remedies
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Product Showcase */}
      <section
        id="products"
        className="py-20 bg-gradient-to-b from-white to-green-50 relative"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-green-100 text-green-700 px-6 py-2 rounded-full text-sm font-bold mb-4">
              🌟 PREMIUM COLLECTION
            </span>
            <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-4">
              Our Dairy Delights
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Farm-fresh products delivered with love from Purba Burdwan's
              finest dairy farms
            </p>
          </div>
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentProductIndex * 100}%)`,
              }}
            >
              {Array.from({ length: totalProductSlides }).map(
                (_, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="flex-shrink-0 w-full flex gap-6"
                  >
                    {products
                      .slice(
                        slideIndex * slidesPerView,
                        (slideIndex + 1) * slidesPerView
                      )
                      .map((product) => (
                        <div
                          key={product.id}
                          className="w-full md:w-1/2 lg:w-1/3 p-4"
                        >
                          <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
                            <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 p-8">
                              <img
                                src={product.img}
                                alt={product.name}
                                className="w-full h-64 object-contain rounded-xl group-hover:scale-110 transition-transform duration-500"
                                loading="lazy"
                              />
                              {product.badge === "Best Seller" && (
                                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-600 text-white py-2 px-4 rounded-full text-sm font-bold shadow-lg flex items-center gap-1 animate-pulse">
                                  <Star size={16} className="fill-white" />
                                  {product.badge}
                                </div>
                              )}
                              {product.badge &&
                                product.badge !== "Best Seller" && (
                                  <div className="absolute top-4 right-4 bg-green-600 text-white py-1 px-3 rounded-full text-xs font-bold">
                                    {product.badge}
                                  </div>
                                )}
                            </div>
                            <div className="p-6">
                              <div className="flex justify-between items-start mb-3">
                                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                                  {product.name}
                                </h3>
                                <div className="text-2xl font-bold text-green-600">
                                  ₹{product.price}/{product.unit}
                                </div>
                              </div>
                              <p className="text-gray-600 mb-4 leading-relaxed">
                                {product.desc}
                              </p>
                              <div className="flex items-center gap-2 mb-4">
                                <Star
                                  className="text-yellow-500 fill-yellow-500"
                                  size={20}
                                />
                                <span className="text-gray-700 font-semibold">
                                  {product.rating} ({product.reviews} reviews)
                                </span>
                              </div>
                              <div className="flex gap-3">
                                <button
                                  onClick={() => handleAddToCart(product)}
                                  className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-full hover:from-green-700 hover:to-emerald-700 shadow-lg text-center font-bold transition-all duration-300 hover:scale-105"
                                >
                                  Add to Cart
                                </button>
                                <button className="bg-green-100 text-green-700 px-4 py-3 rounded-full hover:bg-green-200 transition-all duration-300">
                                  <Heart size={20} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )
              )}
            </div>
            <button
              onClick={handleProductPrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-green-700 p-4 rounded-full hover:bg-green-600 hover:text-white shadow-xl transition-all duration-300 z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleProductNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-green-700 p-4 rounded-full hover:bg-green-600 hover:text-white shadow-xl transition-all duration-300 z-10"
            >
              <ChevronRight size={24} />
            </button>
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalProductSlides }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentProductIndex(i)}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    i === currentProductIndex
                      ? "w-8 bg-green-600"
                      : "w-3 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProductShowcase;
