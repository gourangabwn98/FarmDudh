import React, { useState, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  Award,
  Heart,
  CheckCircle,
  Leaf,
  Loader2,
} from "lucide-react";
import { useCart } from "../CartContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ProductShowcase() {
  const backend_api_base = process.env.REACT_APP_API_BASE;
  const { addToCart: contextAddToCart } = useCart(); // optional fallback
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const { addToCart } = useCart();

  // === FETCH PRODUCTS FROM API ===
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${backend_api_base}/products`);
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

  // === DETECT MOBILE ===
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // === SLIDER LOGIC ===
  const getSlidesPerView = () => {
    if (typeof window === "undefined") return 1;
    const w = window.innerWidth;
    if (w >= 640) return 2;
    return 1;
  };

  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());
  const totalProductSlides = Math.ceil(products.length / slidesPerView);

  useEffect(() => {
    const handleResize = () => setSlidesPerView(getSlidesPerView());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => setCurrentProductIndex(0), [slidesPerView]);

  useEffect(() => {
    if (!isMobile || products.length === 0) return;
    const interval = setInterval(() => {
      setCurrentProductIndex((prev) => (prev + 1) % totalProductSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalProductSlides, isMobile, products.length]);

  const handleProductPrev = () => {
    setCurrentProductIndex(
      (prev) => (prev - 1 + totalProductSlides) % totalProductSlides
    );
  };

  const handleProductNext = () => {
    setCurrentProductIndex((prev) => (prev + 1) % totalProductSlides);
  };

  const handleAddToCart = (product) => {
    addToCart(product); // ← This will call API via context
  };

  const handleOrderGhee = () => {
    const ghee = products.find((p) => p.name.includes("Ghee"));
    if (ghee) addToCart(ghee);
  };

  // const handleOrderGhee = () => {
  //   const ghee = products.find((p) => p.name.includes("Ghee"));
  //   if (ghee) addToCartAPI(ghee);
  // };

  // const handleAddToCart = (product) => {
  //   addToCartAPI(product);
  // };

  // === LOADING STATE ===
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

  if (error || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="text-center">
          <p className="text-red-600 text-xl">
            ⚠️ {error || "No products found"}
          </p>
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
    <>
      <ToastContainer />

      {/* Featured Ghee */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-500 rounded-full filter blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <span className="inline-block bg-gradient-to-r from-amber-600 to-yellow-600 text-white px-6 py-2 rounded-full text-sm font-bold mb-4">
              CUSTOMER FAVORITE
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-amber-700 to-yellow-600 bg-clip-text text-transparent mb-4">
              Experience the Purest A2 Cow Ghee
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Crafted with love using traditional bilona method
            </p>
          </div>

          {products.length > 0 && (
            <div className="flex flex-col md:flex-row items-center gap-8 lg:gap-12 max-w-6xl mx-auto">
              <div className="relative w-full md:w-1/2 group">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-6 sm:p-8 group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={
                      products.find((p) => p.name.includes("Ghee"))?.img ||
                      "/assets/images/ghee.webp"
                    }
                    alt="A2 Cow Ghee"
                    className="w-full h-64 sm:h-80 md:h-96 object-contain rounded-2xl"
                  />
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse">
                    {products.find((p) => p.name.includes("Ghee"))?.badge ||
                      "Premium"}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full font-bold shadow-lg">
                    ₹{products.find((p) => p.name.includes("Ghee"))?.price}/
                    {products.find((p) => p.name.includes("Ghee"))?.unit}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-1/2 space-y-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  <h3 className="text-xl sm:text-2xl font-bold text-amber-700 mb-4 flex items-center gap-3">
                    <Award className="text-yellow-500" size={28} />
                    Why Our Ghee is Special
                  </h3>
                  <ul className="space-y-3 sm:space-y-4">
                    {products
                      .find((p) => p.name.includes("Ghee"))
                      ?.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-gray-700 text-sm sm:text-base"
                        >
                          <CheckCircle
                            className="text-green-600 mt-0.5 flex-shrink-0"
                            size={18}
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                  </ul>
                  <div className="mt-4 flex items-center gap-2">
                    <Star
                      className="text-yellow-500 fill-yellow-500"
                      size={20}
                    />
                    <span className="text-gray-700 font-semibold text-sm sm:text-base">
                      {products.find((p) => p.name.includes("Ghee"))?.rating ||
                        5.0}{" "}
                      (
                      {products.find((p) => p.name.includes("Ghee"))?.reviews ||
                        234}{" "}
                      reviews)
                    </span>
                  </div>
                </div>

                <div className="flex gap-3 sm:gap-4">
                  <button
                    onClick={handleOrderGhee}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-yellow-600 text-white py-3 sm:py-4 px-6 sm:px-8 rounded-full hover:from-amber-700 hover:to-yellow-700 shadow-xl text-center font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105"
                  >
                    Order Ghee Now
                  </button>
                  <button className="bg-white border-2 border-amber-600 text-amber-700 p-3 sm:p-4 rounded-full hover:bg-amber-50 transition-all duration-300">
                    <Heart size={22} />
                  </button>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-emerald-100 rounded-2xl p-5 sm:p-6 border-2 border-green-300">
                  <p className="text-green-800 font-semibold flex items-center gap-2 text-sm sm:text-base">
                    <Leaf className="text-green-600" size={18} />
                    Perfect for cooking, wellness & Ayurvedic remedies
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* All Products */}
      <section
        id="products"
        className="py-20 bg-gradient-to-b from-white to-green-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block bg-green-100 text-green-700 px-6 py-2 rounded-full text-sm font-bold mb-4">
              PREMIUM COLLECTION
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-4">
              Our Dairy Delights
            </h2>
            <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto">
              Farm-fresh products delivered daily
            </p>
          </div>

          {/* Desktop Grid */}
          {!isMobile && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}

          {/* Mobile Slider */}
          {isMobile && (
            <MobileSlider
              products={products}
              slidesPerView={slidesPerView}
              currentProductIndex={currentProductIndex}
              totalProductSlides={totalProductSlides}
              onPrev={handleProductPrev}
              onNext={handleProductNext}
              onAddToCart={handleAddToCart}
              onDotClick={setCurrentProductIndex}
            />
          )}
        </div>
      </section>
    </>
  );
}

// === REUSABLE COMPONENTS ===
const ProductCard = ({ product, onAddToCart }) => (
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
      {product.badge && product.badge !== "Best Seller" && (
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
      <p className="text-gray-600 mb-4 leading-relaxed">{product.desc}</p>
      <div className="flex items-center gap-2 mb-4">
        <Star className="text-yellow-500 fill-yellow-500" size={20} />
        <span className="text-gray-700 font-semibold">
          {product.rating} ({product.reviews} reviews)
        </span>
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => onAddToCart(product)}
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
);

const MobileSlider = ({
  products,
  slidesPerView,
  currentProductIndex,
  totalProductSlides,
  onPrev,
  onNext,
  onAddToCart,
  onDotClick,
}) => (
  <div className="relative overflow-hidden">
    <div
      className="flex transition-transform duration-700 ease-out"
      style={{
        transform: `translateX(-${
          currentProductIndex * (100 / slidesPerView)
        }%)`,
      }}
    >
      {Array.from({ length: totalProductSlides }).map((_, slideIndex) => (
        <div
          key={slideIndex}
          className="flex-shrink-0"
          style={{ width: `${100 / slidesPerView}%` }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
            {products
              .slice(
                slideIndex * slidesPerView,
                (slideIndex + 1) * slidesPerView
              )
              .map((product) => (
                <div key={product._id} className="p-2">
                  <ProductCard product={product} onAddToCart={onAddToCart} />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>

    <button
      onClick={onPrev}
      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white text-green-700 p-2 rounded-full shadow-lg hover:bg-green-600 hover:text-white transition z-10"
    >
      <ChevronLeft size={20} />
    </button>
    <button
      onClick={onNext}
      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-green-700 p-2 rounded-full shadow-lg hover:bg-green-600 hover:text-white transition z-10"
    >
      <ChevronRight size={20} />
    </button>

    <div className="flex justify-center gap-2 mt-6">
      {Array.from({ length: totalProductSlides }).map((_, i) => (
        <button
          key={i}
          onClick={() => onDotClick(i)}
          className={`h-2 rounded-full transition-all ${
            i === currentProductIndex ? "w-8 bg-green-600" : "w-2 bg-gray-300"
          }`}
        />
      ))}
    </div>
  </div>
);

export default ProductShowcase;
