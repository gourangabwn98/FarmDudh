import React, { useState, useEffect } from "react";
import { Zap, Shield, Leaf, Clock, Heart, Star, Gift } from "lucide-react";

function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

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

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-green-900/60 to-green-800/70"></div>

      {/* Glowing Orbs */}
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
        {/* Limited Time Offer Badge */}
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

        {/* Countdown Timer */}
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

        {/* Main Heading */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-emerald-200 to-green-400 drop-shadow-2xl animate-gradient">
            Pure A2 Dairy
          </span>
          <span className="block text-white drop-shadow-2xl mt-2">
            for Purba Burdwan
          </span>
        </h1>

        {/* Trust Badges */}
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

        {/* Description */}
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

        {/* CTA Buttons */}
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

        {/* Social Proof */}
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

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer">
          <div className="w-7 h-12 border-2 border-white/60 rounded-full flex justify-center hover:border-white transition-colors duration-300 backdrop-blur-sm bg-white/5">
            <div className="w-1.5 h-3 bg-gradient-to-b from-white to-green-400 rounded-full mt-2 animate-scroll"></div>
          </div>
          <p className="text-white text-xs mt-2 font-semibold">Scroll</p>
        </div>
      </div>

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

      {/* Custom Styles */}
      <style>{`
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-scroll { animation: scroll 1.5s ease-in-out infinite; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
      `}</style>
    </section>
  );
}

export default HeroSection;
