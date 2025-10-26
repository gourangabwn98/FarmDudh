import React, { useState, useEffect } from "react";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Tractor,
  FlaskConical,
  Recycle,
  Truck,
  CheckCircle,
  Heart,
  Leaf,
  Clock,
  Shield,
  Award,
  Users,
  Zap,
  Gift,
} from "lucide-react";

function Home() {
  // State for product carousel
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  const products = [
    {
      name: "A2 Desi Cow Milk",
      desc: "Pure, unprocessed milk from Purba Burdwan's free-grazing desi cows, rich in A2 protein.",
      img: "/assets/images/a2milk.webp",
      isBestSeller: true,
      price: "₹80/L",
      tag: "Most Popular",
    },
    {
      name: "Buffalo Milk",
      desc: "Creamy, high-fat milk from healthy buffaloes, sourced from local Purba Burdwan farmers.",
      img: "/assets/images/BUFFALO MILK.png",
      price: "₹70/L",
      tag: "Rich & Creamy",
    },
    {
      name: "A2 Cow Ghee",
      desc: "Hand-churned using the bilona method, packed with flavor and health benefits.",
      img: "/assets/images/ghee.webp",
      isBestSeller: true,
      price: "₹650/500g",
      tag: "Premium Quality",
    },
    {
      name: "Fresh Paneer",
      desc: "Soft, homemade paneer crafted daily from Purba Burdwan's pure milk.",
      img: "/assets/images/paneer.jpg",
      price: "₹90/250g",
      tag: "Daily Fresh",
    },
    {
      name: "Creamy Dahi",
      desc: "Rich, probiotic-packed curd made traditionally by local farmers.",
      img: "/assets/images/dahi.jpeg",
      price: "₹50/500g",
      tag: "Probiotic Rich",
    },
    {
      name: "Buffalo Milk",
      desc: "Creamy, high-fat milk from healthy buffaloes, sourced from local Purba Burdwan farmers.",
      img: "/assets/images/BUFFALO MILK.png",
      price: "₹70/L",
      tag: "Rich & Creamy",
    },
  ];

  const slidesPerView = 3;
  const totalProductSlides = Math.ceil(products.length / slidesPerView);

  // Auto-slide for products
  useEffect(() => {
    setIsVisible(true);
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

  // State for testimonial carousel
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const testimonials = [
    {
      name: "Arjun Das",
      text: "FarmDudh's A2 milk is pure bliss! Fresh from local farmers, delivered in minutes.",
      time: "Just now",
      avatar: "/assets/images/dp.jpeg",
      rating: 5,
    },
    {
      name: "Rina Mondal",
      text: "The best milk in Purba Burdwan. Sustainable packaging and unbeatable quality!",
      time: "3 hours ago",
      avatar: "/assets/images/dp.jpeg",
      rating: 5,
    },
    {
      name: "Suman Banerjee",
      text: "FarmDudh brings the taste of tradition to my home. Pure A2 milk every day!",
      time: "2 days ago",
      avatar: "/assets/images/dp.jpeg",
      rating: 5,
    },
  ];

  const reasons = [
    {
      title: "Unprocessed A2 Milk",
      desc: "Pure, natural milk from Purba Burdwan's desi cows, free from additives.",
      img: "/assets/images/a2milk.webp",
      Icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Zero Plastic Packaging",
      desc: "Eco-friendly stainless steel cans ensure sustainability and freshness.",
      img: "/assets/images/plastic-free.jpeg",
      Icon: Recycle,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Free Grazing Cows",
      desc: "Our desi cows roam freely in Purba Burdwan, producing high-quality A2 milk.",
      img: "/assets/images/cow-grazing.webp",
      Icon: Leaf,
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Daily Micro Testing",
      desc: "Tested daily with lactometers and analyzers for guaranteed purity.",
      img: "/assets/images/testing.jpg",
      Icon: FlaskConical,
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Flavor & Health Benefits",
      desc: "Rich, creamy A2 milk and ghee packed with nutrition and taste.",
      img: "/assets/images/milk-benifit.jpg",
      Icon: Heart,
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "10-Minute Delivery",
      desc: "Fresh dairy delivered to your doorstep in Purba Burdwan within 10 minutes.",
      img: "/assets/images/delivery.png",
      Icon: Zap,
      color: "from-yellow-500 to-amber-500",
    },
  ];

  const testimonialSlidesPerView = 2;
  const totalTestimonialSlides = Math.ceil(
    testimonials.length / testimonialSlidesPerView
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonialIndex((prev) => (prev + 1) % totalTestimonialSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [totalTestimonialSlides]);

  const handleTestimonialPrev = () => {
    setCurrentTestimonialIndex(
      (prev) => (prev - 1 + totalTestimonialSlides) % totalTestimonialSlides
    );
  };

  const handleTestimonialNext = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % totalTestimonialSlides);
  };

  // Countdown Timer for Limited Offer
  //   const [timeLeft, setTimeLeft] = useState({
  //     hours: 23,
  //     minutes: 59,
  //     seconds: 59,
  //   });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  //   const scrollToProducts = () => {
  //     document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  //   };
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="font-sans overflow-hidden">
      {/* Floating CTA Button */}
      <div className="fixed bottom-6 right-6 z-50 animate-bounce">
        <button
          onClick={scrollToProducts}
          className="bg-gradient-to-r from-green-600 to-green-500 text-white px-6 py-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 flex items-center gap-2 font-bold"
        >
          <Zap className="text-yellow-300" size={20} />
          Quick Order
        </button>
      </div>

      {/* Hero Section with Enhanced Design */}
      <section
        id="home"
        className="relative min-h-screen text-center overflow-hidden"
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/videos/farm-bg.webm" type="video/webm" />
          <source
            src="https://player.vimeo.com/external/357123123.sd.mp4?s=7b604861e7e92ad0f6e7c3e3b4e6b6f8"
            type="video/mp4"
          />
        </video>

        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-green-900/60 to-green-800/70"></div>

        {/* Animated Particles Effect */}
        {/* <div className="absolute inset-0 opacity-20">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-float"
              style={{
                width: Math.random() * 6 + 2 + "px",
                height: Math.random() * 6 + 2 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                animationDuration: Math.random() * 15 + 10 + "s",
                animationDelay: Math.random() * 5 + "s",
              }}
            />
          ))}
        </div> */}

        {/* Glowing Orbs for Depth */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-green-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-400/30 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 flex flex-col items-center justify-center min-h-screen py-20 z-10">
          {/* Limited Time Offer Badge - Enhanced */}
          <div className="group bg-gradient-to-r from-red-500 via-pink-600 to-red-500 text-white py-3 px-8 rounded-full mb-6 text-sm font-bold shadow-2xl hover:shadow-red-500/50 transition-all duration-300 flex items-center gap-2 animate-pulse cursor-pointer">
            <Gift size={20} className="animate-bounce" />
            <span className="relative">
              SPECIAL OFFER: 10% OFF + FREE DELIVERY!
              <span className="absolute -top-1 -right-8 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
              </span>
            </span>
          </div>

          {/* Countdown Timer - Enhanced Design */}
          <div className="flex gap-4 mb-8 bg-black/60 backdrop-blur-xl px-8 py-4 rounded-2xl border border-white/10 shadow-2xl">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-white bg-gradient-to-b from-white to-green-200 bg-clip-text text-transparent drop-shadow-lg">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <div className="text-xs text-green-300 font-semibold mt-1">
                Hours
              </div>
            </div>
            <div className="text-4xl md:text-5xl text-green-400 font-bold self-center animate-pulse">
              :
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-white bg-gradient-to-b from-white to-green-200 bg-clip-text text-transparent drop-shadow-lg">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <div className="text-xs text-green-300 font-semibold mt-1">
                Minutes
              </div>
            </div>
            <div className="text-4xl md:text-5xl text-green-400 font-bold self-center animate-pulse">
              :
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-white bg-gradient-to-b from-white to-green-200 bg-clip-text text-transparent drop-shadow-lg">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
              <div className="text-xs text-green-300 font-semibold mt-1">
                Seconds
              </div>
            </div>
          </div>

          {/* Main Heading - Enhanced with Animation */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-200 to-green-400 drop-shadow-2xl animate-gradient">
              Pure A2 Dairy
            </span>
            <span className="block text-white drop-shadow-2xl mt-2">
              for Purba Burdwan
            </span>
          </h1>

          {/* Trust Badges - Enhanced */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              {
                Icon: Shield,
                text: "FSSAI Certified",
                color: "from-blue-500 to-cyan-500",
              },
              {
                Icon: Leaf,
                text: "100% Natural",
                color: "from-green-500 to-emerald-500",
              },
              {
                Icon: Clock,
                text: "10 Min Delivery",
                color: "from-orange-500 to-amber-500",
              },
              {
                Icon: Heart,
                text: "2L+ Happy Customers",
                color: "from-pink-500 to-rose-500",
              },
            ].map((badge, i) => (
              <div
                key={i}
                className="group flex items-center gap-2 bg-white/10 backdrop-blur-xl px-5 py-3 rounded-full text-white text-sm font-bold border border-white/20 hover:bg-white/20 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
              >
                <div
                  className={`p-1 rounded-full bg-gradient-to-br ${badge.color}`}
                >
                  <badge.Icon size={14} className="text-white" />
                </div>
                {badge.text}
              </div>
            ))}
          </div>

          {/* Description - Enhanced */}
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-100 mb-10 max-w-5xl leading-relaxed font-light px-4">
            Experience the{" "}
            <span className="font-bold text-green-300 relative">
              purest dairy
              <span className="absolute bottom-0 left-0 w-full h-1 bg-green-400 opacity-50"></span>
            </span>{" "}
            sourced from local Purba Burdwan farmers.
            <br className="hidden md:block" />
            Fresh A2 milk, ghee, paneer & dahi delivered in{" "}
            <span className="font-bold text-yellow-300 relative">
              eco-friendly Packaging
              <span className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400 opacity-50"></span>
            </span>{" "}
            within 10 minutes.
          </p>

          {/* CTA Buttons - Enhanced */}
          <div className="flex flex-col sm:flex-row gap-6 mb-10">
            <button
              onClick={scrollToProducts}
              className="group relative bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 text-white py-5 px-14 rounded-full shadow-2xl hover:shadow-green-500/50 text-xl font-bold transition-all duration-300 hover:scale-110 overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center gap-3">
                Order Now
                <Zap
                  size={22}
                  className="group-hover:animate-bounce fill-yellow-300 text-yellow-300"
                />
              </span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"></div>
            </button>

            <button
              onClick={() =>
                document
                  .getElementById("why-us")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="group bg-white/10 backdrop-blur-xl border-2 border-white/40 text-white py-5 px-14 rounded-full hover:bg-white hover:text-green-700 shadow-xl text-xl font-bold transition-all duration-300 hover:scale-110"
            >
              <span className="flex items-center gap-2">
                Learn More
                <span className="transform group-hover:translate-x-1 transition-transform duration-300">
                  →
                </span>
              </span>
            </button>
          </div>

          {/* Social Proof - Enhanced */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-xl px-8 py-4 rounded-2xl border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="relative group">
                  <img
                    src="/assets/images/dp.jpeg"
                    alt="Customer"
                    className="w-12 h-12 rounded-full border-3 border-white object-cover hover:scale-110 transition-transform duration-300 cursor-pointer shadow-lg"
                  />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
              ))}
            </div>
            <div className="text-left border-l-2 border-white/30 pl-4">
              <div className="flex items-center gap-2 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
                <span className="text-white font-bold text-xl ml-1">4.9</span>
              </div>
              <p className="text-green-200 text-sm font-semibold">
                Trusted by 200+ Happy Customers
              </p>
            </div>
          </div>

          {/* Additional Trust Indicator */}
          <div className="mt-8 flex items-center gap-2 text-green-200 text-sm">
            <div className="flex -space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            </div>
            <span className="font-semibold">
              15 people ordered in the last hour
            </span>
          </div>
        </div>

        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer">
          <div className="w-7 h-12 border-2 border-white/60 rounded-full flex justify-center hover:border-white transition-colors duration-300 backdrop-blur-sm bg-white/5">
            <div className="w-1.5 h-3 bg-gradient-to-b from-white to-green-400 rounded-full mt-2 animate-scroll"></div>
          </div>
          <p className="text-white text-xs mt-2 font-semibold">Scroll</p>
        </div>

        {/* Custom Styles */}
        <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0) translateX(0) rotate(0deg);
            opacity: 0.3;
          }
          50% { 
            transform: translateY(-30px) translateX(20px) rotate(180deg);
            opacity: 0.8;
          }
        }

        @keyframes scroll {
          0% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(20px);
            opacity: 0;
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-float {
          animation: float ease-in-out infinite;
        }

        .animate-scroll {
          animation: scroll 1.5s ease-in-out infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
      </section>

      {/* Featured Product Spotlight - A2 Ghee */}
      <section className="py-20 bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 relative overflow-hidden">
        {/* Background Pattern */}
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
                  🔥 Best Seller
                </div>
                <div className="absolute bottom-4 left-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-full font-bold shadow-lg">
                  ₹650/500g
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
                  {[
                    "Hand-churned using authentic bilona method",
                    "Made from pure A2 milk of desi cows",
                    "Rich in vitamins A, D, E & K",
                    "No additives or preservatives",
                    "Traditional recipe from Purba Burdwan farmers",
                  ].map((point, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <CheckCircle
                        className="text-green-600 mt-1 flex-shrink-0"
                        size={20}
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={scrollToProducts}
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
                      .map((product, index) => (
                        <div
                          key={index}
                          className="w-full md:w-1/2 lg:w-1/3 p-4"
                        >
                          <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden hover:-translate-y-2">
                            <div className="relative overflow-hidden bg-gradient-to-br from-green-50 to-emerald-50 p-8">
                              <img
                                src={product.img}
                                alt={product.name}
                                className="w-full h-64 object-contain rounded-xl group-hover:scale-110 transition-transform duration-500"
                              />
                              {product.isBestSeller && (
                                <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-600 text-white py-2 px-4 rounded-full text-sm font-bold shadow-lg flex items-center gap-1 animate-pulse">
                                  <Star size={16} className="fill-white" />
                                  Best Seller
                                </div>
                              )}
                              {product.tag && (
                                <div className="absolute top-4 right-4 bg-green-600 text-white py-1 px-3 rounded-full text-xs font-bold">
                                  {product.tag}
                                </div>
                              )}
                            </div>

                            <div className="p-6">
                              <div className="flex justify-between items-start mb-3">
                                <h3 className="text-2xl font-bold text-gray-800 group-hover:text-green-600 transition-colors duration-300">
                                  {product.name}
                                </h3>
                                <div className="text-2xl font-bold text-green-600">
                                  {product.price}
                                </div>
                              </div>

                              <p className="text-gray-600 mb-6 leading-relaxed">
                                {product.desc}
                              </p>

                              <div className="flex gap-3">
                                <button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-full hover:from-green-700 hover:to-emerald-700 shadow-lg text-center font-bold transition-all duration-300 hover:scale-105">
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

            {/* Navigation Buttons */}
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

            {/* Dots Indicator */}
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

      {/* Journey Section with Modern Timeline */}
      <section className="py-20 bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl opacity-20 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm font-bold mb-4">
              🚀 OUR PROCESS
            </span>
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
              From Farm to Your Family
            </h2>
            <p className="text-green-100 text-lg max-w-2xl mx-auto">
              Every drop tells a story of purity, quality, and care
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>

            {[
              {
                Icon: Tractor,
                title: "Sourcing from Farmers",
                desc: "We partner with Purba Burdwan's local farmers to collect pure A2 milk from free-grazing desi cows.",
                color: "from-green-400 to-emerald-500",
                delay: "0s",
              },
              {
                Icon: FlaskConical,
                title: "Quality Testing",
                desc: "Every batch is tested daily with lactometers and analyzers to ensure FSSAI-certified purity.",
                color: "from-blue-400 to-cyan-500",
                delay: "0.2s",
              },
              {
                Icon: Recycle,
                title: "Eco-Friendly Packaging",
                desc: "Milk is packed in reusable Glass Bottles, supporting a zero-plastic, sustainable Purba Burdwan.",
                color: "from-purple-400 to-pink-500",
                delay: "0.4s",
              },
              {
                Icon: Truck,
                title: "Fast Delivery",
                desc: "Delivered fresh to your doorstep in Purba Burdwan within 10 minutes, ensuring maximum freshness.",
                color: "from-orange-400 to-red-500",
                delay: "0.6s",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative"
                style={{ animationDelay: step.delay }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-green-700 text-xl shadow-lg z-10">
                  {index + 1}
                </div>

                <div className="group bg-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 border border-white/20 hover:scale-105 hover:-translate-y-2 shadow-xl mt-8">
                  <div
                    className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-500 shadow-lg`}
                  >
                    <step.Icon className="text-white" size={40} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4 text-center">
                    {step.title}
                  </h3>
                  <p className="text-green-100 leading-relaxed text-center text-sm">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button
              onClick={scrollToProducts}
              className="inline-block bg-white text-green-700 py-4 px-10 rounded-full hover:bg-green-50 shadow-2xl text-lg font-bold transition-all duration-300 hover:scale-105"
            >
              Experience Our Quality Today
            </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Interactive Cards */}
      <section
        id="why-us"
        className="py-20 bg-gradient-to-b from-green-50 to-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-green-100 text-green-700 px-6 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
              💚 WHY FARMDUDH
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-4">
              6 Reasons to Choose FarmDudh
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              We're not just delivering dairy, we're delivering trust, health,
              and sustainability
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
              >
                {/* Gradient Overlay on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                <div className="relative p-6">
                  {/* Icon Badge */}
                  <div
                    className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${reason.color} rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}
                  >
                    <reason.Icon className="text-white" size={28} />
                  </div>

                  {/* Image */}
                  <div className="relative overflow-hidden rounded-2xl mb-6 h-48">
                    <img
                      src={reason.img}
                      alt={reason.title}
                      className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {reason.desc}
                  </p>

                  {/* Hover Arrow */}
                  <div className="mt-4 flex items-center text-green-600 font-semibold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                    Learn more →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section with Animation */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(50)].map((_, i) => (
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
                animationDelay: Math.random() * 5 + "s",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-4">
              Delivering Trust, Quality & Freshness
            </h2>
            <p className="text-green-100 text-lg max-w-2xl mx-auto">
              Join thousands of happy families who trust FarmDudh for their
              daily dairy needs
            </p>
          </div>

          <div className="flex justify-center mb-12">
            <img
              src="/assets/images/fssai.jpg"
              alt="FSSAI Certified"
              className="h-20 object-contain bg-white rounded-2xl px-6 py-3 shadow-2xl"
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "2L+", label: "Liters Delivered", Icon: CheckCircle },
              { value: "1", label: "City Covered", Icon: Users },
              { value: "4+", label: "Carts On Road", Icon: Truck },
              { value: "50+", label: "Local Farmers", Icon: Tractor },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 hover:bg-white/20 transition-all duration-500 border border-white/20 hover:scale-110">
                  <stat.Icon
                    className="text-white mx-auto mb-4 group-hover:scale-125 transition-transform duration-500"
                    size={48}
                  />
                  <h3 className="text-5xl font-extrabold text-white mb-2">
                    {stat.value}
                  </h3>
                  <p className="text-green-100 font-semibold">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with Modern Design */}
      <section className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-yellow-100 text-yellow-700 px-6 py-2 rounded-full text-sm font-bold mb-4">
              ⭐ CUSTOMER REVIEWS
            </span>
            <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-4">
              What Our Customers Say
            </h2>

            {/* Rating Summary */}
            <div className="inline-flex items-center gap-4 bg-white rounded-full px-8 py-4 shadow-xl mt-6">
              <div className="flex items-center gap-2">
                <span className="text-5xl font-extrabold text-green-600">
                  4.9
                </span>
                <div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="text-yellow-400 fill-yellow-400"
                        size={20}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm font-semibold">
                    200+ Reviews
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentTestimonialIndex * 100}%)`,
              }}
            >
              {Array.from({ length: totalTestimonialSlides }).map(
                (_, slideIndex) => (
                  <div
                    key={slideIndex}
                    className="flex-shrink-0 w-full flex gap-6"
                  >
                    {testimonials
                      .slice(
                        slideIndex * testimonialSlidesPerView,
                        (slideIndex + 1) * testimonialSlidesPerView
                      )
                      .map((testimonial, index) => (
                        <div key={index} className="w-full md:w-1/2 p-4">
                          <div className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 hover:-translate-y-2 border border-green-100">
                            {/* Quote Icon */}
                            <div className="text-6xl text-green-200 mb-4">
                              "
                            </div>

                            {/* Stars */}
                            <div className="flex mb-4">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="text-yellow-400 fill-yellow-400"
                                  size={20}
                                />
                              ))}
                            </div>

                            {/* Review Text */}
                            <p className="text-gray-700 text-lg italic leading-relaxed mb-6">
                              {testimonial.text}
                            </p>

                            {/* Customer Info */}
                            <div className="flex items-center gap-4">
                              <div className="relative">
                                <img
                                  src={testimonial.avatar}
                                  alt={testimonial.name}
                                  className="w-16 h-16 rounded-full object-cover border-4 border-green-100"
                                />
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                                  <CheckCircle
                                    className="text-white"
                                    size={12}
                                  />
                                </div>
                              </div>
                              <div>
                                <p className="text-gray-900 font-bold text-lg">
                                  {testimonial.name}
                                </p>
                                <p className="text-gray-500 text-sm">
                                  {testimonial.time}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )
              )}
            </div>

            {/* Navigation */}
            <button
              onClick={handleTestimonialPrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white text-green-700 p-4 rounded-full hover:bg-green-600 hover:text-white shadow-xl transition-all duration-300 z-10"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={handleTestimonialNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white text-green-700 p-4 rounded-full hover:bg-green-600 hover:text-white shadow-xl transition-all duration-300 z-10"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => alert("View all testimonials")}
              className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-10 rounded-full hover:from-green-700 hover:to-emerald-700 shadow-xl text-lg font-bold transition-all duration-300 hover:scale-105"
            >
              Read All Reviews
            </button>
          </div>
        </div>
      </section>

      {/* Sustainability Commitment */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <span className="inline-block bg-green-100 text-green-700 px-6 py-2 rounded-full text-sm font-bold mb-6">
                🌍 SUSTAINABILITY
              </span>
              <h2 className="text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
                Building a <span className="text-green-600">Greener</span> Purba
                Burdwan
              </h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                At FarmDudh, we're more than a dairy company – we're
                environmental stewards. Our zero-plastic initiative and support
                for local farmers create a sustainable ecosystem that benefits
                everyone.
              </p>

              <div className="space-y-4 mb-8">
                {[
                  "100% plastic-free stainless steel packaging",
                  "Supporting 50+ local farming families",
                  "Reduced carbon footprint with local sourcing",
                  "Ethical treatment of free-grazing cows",
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="text-white" size={16} />
                    </div>
                    <span className="text-gray-700 font-medium">{point}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => alert("Learn more about our mission")}
                className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-10 rounded-full hover:from-green-700 hover:to-emerald-700 shadow-xl text-lg font-bold transition-all duration-300 hover:scale-105"
              >
                Learn About Our Mission
              </button>
            </div>

            <div className="w-full md:w-1/2 order-1 md:order-2 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-500 rounded-3xl blur-2xl opacity-20"></div>
              <img
                src="/assets/images/22659.jpeg"
                alt="Sustainability"
                className="relative w-full h-96 object-cover rounded-3xl shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-blue-100 text-blue-700 px-6 py-2 rounded-full text-sm font-bold mb-4">
              ❓ HELP CENTER
            </span>
            <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Everything you need to know about our products and services
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            {[
              {
                q: "What is A2 milk and why is it better?",
                a: "A2 milk is sourced from Purba Burdwan's desi cows with A2 beta-casein protein, known for better digestibility and health benefits. Unlike regular milk, A2 milk is easier on the stomach and packed with natural nutrients.",
              },
              {
                q: "How fast is delivery in Purba Burdwan?",
                a: "We deliver fresh dairy within 10 minutes in Purba Burdwan using our fleet of eco-friendly delivery carts. Our hyperlocal model ensures your milk is farm-fresh when it reaches your doorstep.",
              },
              {
                q: "Is your packaging really eco-friendly?",
                a: "Absolutely! We use 100% plastic-free, reusable stainless steel containers. After you finish your order, we collect and sanitize the containers for reuse, supporting Purba Burdwan's zero-waste initiative.",
              },
              {
                q: "How do you ensure quality and purity?",
                a: "Every batch undergoes daily testing with lactometers and analyzers. We're FSSAI certified and maintain strict quality control from farm to doorstep. Our milk is unprocessed, unboiled, and free from any additives.",
              },
            ].map((faq, index) => (
              <div
                key={index}
                className="group bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-green-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-start gap-3">
                  <span className="text-green-600 text-2xl flex-shrink-0">
                    Q.
                  </span>
                  {faq.q}
                </h3>
                <p className="text-gray-700 leading-relaxed pl-8">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => alert("View all FAQs")}
              className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-10 rounded-full hover:from-green-700 hover:to-emerald-700 shadow-xl text-lg font-bold transition-all duration-300 hover:scale-105"
            >
              View All FAQs
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full opacity-10"
              style={{
                width: Math.random() * 150 + 50 + "px",
                height: Math.random() * 150 + 50 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                animation: `float ${
                  Math.random() * 15 + 10
                }s ease-in-out infinite`,
                animationDelay: Math.random() * 5 + "s",
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Ready to Experience Pure Dairy?
          </h2>
          <p className="text-2xl text-green-100 mb-10 max-w-3xl mx-auto">
            Join 2 lakh+ happy customers who trust FarmDudh for their daily
            dairy needs
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={scrollToProducts}
              className="group bg-white text-green-700 py-5 px-12 rounded-full hover:bg-green-50 shadow-2xl text-xl font-bold transition-all duration-300 hover:scale-110 flex items-center gap-3"
            >
              <span>Order Now</span>
              <Zap
                className="text-yellow-500 group-hover:animate-pulse"
                size={24}
              />
            </button>

            <button
              onClick={() => alert("Contact us")}
              className="bg-transparent border-2 border-white text-white py-5 px-12 rounded-full hover:bg-white/10 shadow-xl text-xl font-bold transition-all duration-300"
            >
              Contact Us
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

      {/* Add Custom Styles */}
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

export default Home;
