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
  Leaf,
  Users,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function WhyUsAndMore() {
  const navigate = useNavigate();
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const testimonials = [
    {
      name: "Arjun Das",
      text: "Malati Dairy's A2 milk is pure bliss! Fresh from local farmers, delivered in minutes.",
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
      text: "Malati Dairy brings the taste of tradition to my home. Pure A2 milk every day!",
      time: "2 days ago",
      avatar: "/assets/images/dp.jpeg",
      rating: 5,
    },
  ];

  const reasons = [
    {
      title: "Unprocessed A2 Milk",
      desc: "Pure, natural milk from Purba Burdwan's desi cows, free from additives.",
      img: "/assets/images/A2milk.webp",
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
      Icon: CheckCircle,
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "10-Minute Delivery",
      desc: "Fresh dairy delivered to your doorstep in Purba Burdwan within 30 minutes.",
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

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Journey Section */}
      <section className="py-20 bg-gradient-to-br from-green-900 via-emerald-800 to-green-900 relative overflow-hidden">
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
                desc: "Delivered fresh to your doorstep in Purba Burdwan within 30 minutes, ensuring maximum freshness.",
                color: "from-orange-400 to-red-500",
                delay: "0.6s",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="relative"
                style={{ animationDelay: step.delay }}
              >
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

      {/* Why Choose Us */}
      <section
        id="why-us"
        className="py-20 bg-gradient-to-b from-green-50 to-white"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-green-100 text-green-700 px-6 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
              💚 WHY Malati Dairy
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-4">
              6 Reasons to Choose Malati Dairy
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
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${reason.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>
                <div className="relative p-6">
                  <div
                    className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${reason.color} rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300`}
                  >
                    <reason.Icon className="text-white" size={28} />
                  </div>
                  <div className="relative overflow-hidden rounded-2xl mb-6 h-48">
                    <img
                      src={reason.img}
                      alt={reason.title}
                      className="w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors duration-300">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {reason.desc}
                  </p>
                  <div className="mt-4 flex items-center text-green-600 font-semibold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                    Learn more →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 relative overflow-hidden">
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
              Join thousands of happy families who trust Malati Dairy for their
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

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-yellow-100 text-yellow-700 px-6 py-2 rounded-full text-sm font-bold mb-4">
              ⭐ CUSTOMER REVIEWS
            </span>
            <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent mb-4">
              What Our Customers Say
            </h2>
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
                            <div className="text-6xl text-green-200 mb-4">
                              "
                            </div>
                            <div className="flex mb-4">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="text-yellow-400 fill-yellow-400"
                                  size={20}
                                />
                              ))}
                            </div>
                            <p className="text-gray-700 text-lg italic leading-relaxed mb-6">
                              {testimonial.text}
                            </p>
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
                At Malati Dairy, we're more than a dairy company – we're
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
                a: "We deliver fresh dairy within 30 minutes in Purba Burdwan using our fleet of eco-friendly delivery carts. Our hyperlocal model ensures your milk is farm-fresh when it reaches your doorstep.",
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
            Join 2 lakh+ happy customers who trust Malati Dairy for their daily
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
              onClick={() => navigate("/contact")}
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

      {/* Custom Styles */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </>
  );
}

export default WhyUsAndMore;
