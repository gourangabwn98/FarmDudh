import React, { useState } from "react";
import {
  CheckCircle,
  Leaf,
  Clock,
  Shield,
  Heart,
  Award,
  Truck,
  Users,
  Droplet,
  Recycle,
  FlaskConical,
  Star,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from "lucide-react";

// Main component that renders either Why Us or FAQ based on prop
function WhyUs({ page = "whyus" }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (page === "whyus") {
    return <WhyUsPage />;
  }
  return <FAQPage openIndex={openIndex} toggleFAQ={toggleFAQ} />;
}

// WHY US PAGE
function WhyUsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
      {/* Hero Section */}
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

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm font-bold mb-6">
            🌟 WHY CHOOSE US
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Why FarmDudh?
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Discover what makes us Purba Burdwan's most trusted dairy brand
          </p>
        </div>
      </section>

      {/* Main Reasons Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                Icon: Droplet,
                title: "100% Pure A2 Milk",
                desc: "Only from indigenous desi cows with A2 beta-casein protein. No mixed breeds, no compromises. Every drop is pure, natural, and nutritious.",
                color: "from-blue-500 to-cyan-500",
                benefits: [
                  "Easier digestion",
                  "Rich in nutrients",
                  "No A1 protein",
                  "Pure desi cow milk",
                ],
              },
              {
                Icon: Leaf,
                title: "Zero Plastic Packaging",
                desc: "We deliver in reusable stainless steel containers. After use, we collect and sanitize them for reuse. Join our mission for a plastic-free Purba Burdwan.",
                color: "from-green-500 to-emerald-500",
                benefits: [
                  "Eco-friendly",
                  "100% reusable",
                  "No plastic waste",
                  "Sustainable choice",
                ],
              },
              {
                Icon: Users,
                title: "Free Grazing Desi Cows",
                desc: "Our partner farmers let their cows roam freely, eat natural grass, and live stress-free lives. Happy cows produce healthier, tastier milk.",
                color: "from-purple-500 to-pink-500",
                benefits: [
                  "Natural grazing",
                  "Stress-free cows",
                  "Better milk quality",
                  "Ethical treatment",
                ],
              },
              {
                Icon: FlaskConical,
                title: "Daily Micro Testing",
                desc: "Every batch undergoes rigorous testing with lactometers and milk analyzers. FSSAI certified quality you can trust.",
                color: "from-orange-500 to-red-500",
                benefits: [
                  "Daily quality checks",
                  "FSSAI certified",
                  "Lab tested",
                  "Guaranteed purity",
                ],
              },
              {
                Icon: Heart,
                title: "Rich Flavor & Health",
                desc: "Our A2 milk and ghee are packed with natural flavor and essential nutrients. Taste the difference that comes from traditional dairy farming.",
                color: "from-pink-500 to-rose-500",
                benefits: [
                  "Natural flavor",
                  "High nutrients",
                  "Traditional methods",
                  "Authentic taste",
                ],
              },
              {
                Icon: Clock,
                title: "10-Minute Delivery",
                desc: "Fresh dairy delivered to your doorstep within 10 minutes across Purba Burdwan. Morning and evening deliveries available every day.",
                color: "from-yellow-500 to-amber-500",
                benefits: [
                  "Ultra-fast delivery",
                  "Farm to door",
                  "Morning & evening",
                  "Always fresh",
                ],
              },
            ].map((reason, i) => (
              <div
                key={i}
                className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                <div
                  className={`w-20 h-20 bg-gradient-to-br ${reason.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <reason.Icon className="text-white" size={40} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {reason.desc}
                </p>
                <div className="space-y-2">
                  {reason.benefits.map((benefit, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle
                        className="text-green-600 flex-shrink-0"
                        size={16}
                      />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-gradient-to-br from-green-100 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              FarmDudh vs Others
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              See how we stack up against regular dairy brands
            </p>
          </div>

          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="grid grid-cols-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-center">
              <div className="p-4 border-r border-white/20">Feature</div>
              <div className="p-4 border-r border-white/20">FarmDudh ✓</div>
              <div className="p-4">Others ✗</div>
            </div>
            {[
              ["Pure A2 Milk", "100% A2", "Mixed A1/A2"],
              ["Source", "Local Farmers", "Unknown"],
              ["Packaging", "Steel (Reusable)", "Plastic"],
              ["Testing", "Daily", "Periodic"],
              ["Delivery Time", "10 Minutes", "Next Day"],
              ["Additives", "Zero", "May Contain"],
              ["Cow Treatment", "Free Grazing", "Confined"],
              ["Certification", "FSSAI", "Varies"],
            ].map((row, i) => (
              <div
                key={i}
                className={`grid grid-cols-3 text-center ${
                  i % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <div className="p-4 border-r border-gray-200 font-semibold text-gray-900">
                  {row[0]}
                </div>
                <div className="p-4 border-r border-gray-200 text-green-600 font-bold flex items-center justify-center gap-2">
                  <CheckCircle size={18} />
                  {row[1]}
                </div>
                <div className="p-4 text-red-500 font-semibold">{row[2]}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
              🏆 CERTIFICATIONS
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
              Trusted & Certified
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Our quality is backed by official certifications
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                Icon: Shield,
                title: "FSSAI Certified",
                desc: "Licensed by Food Safety and Standards Authority of India",
              },
              {
                Icon: Award,
                title: "ISO Compliant",
                desc: "Following international quality management standards",
              },
              {
                Icon: Star,
                title: "Quality Assured",
                desc: "Daily testing and quality control processes",
              },
            ].map((cert, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 text-center border-2 border-green-200 hover:shadow-xl transition-all duration-300"
              >
                <cert.Icon className="text-green-600 mx-auto mb-4" size={48} />
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {cert.title}
                </h3>
                <p className="text-gray-600">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Ready to Switch to Pure Dairy?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of families who trust FarmDudh for their daily
            nutrition
          </p>
          <button
            onClick={() => alert("Order now")}
            className="bg-white text-green-700 py-4 px-12 rounded-full hover:bg-green-50 shadow-2xl text-xl font-bold transition-all duration-300 hover:scale-110"
          >
            Start Your Subscription
          </button>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}

// FAQ PAGE
function FAQPage({ openIndex, toggleFAQ }) {
  const faqCategories = [
    {
      category: "General Questions",
      Icon: HelpCircle,
      questions: [
        {
          q: "What is A2 milk and why is it better?",
          a: "A2 milk comes from indigenous desi cows that produce only A2 beta-casein protein. Unlike regular milk which contains A1 protein, A2 milk is easier to digest, doesn't cause bloating, and is closer to the milk our ancestors drank. It's also rich in nutrients like omega-3 fatty acids, vitamins, and minerals.",
        },
        {
          q: "How is FarmDudh different from other milk brands?",
          a: "FarmDudh sources 100% pure A2 milk directly from local Purba Burdwan farmers who raise free-grazing desi cows. We deliver in eco-friendly reusable steel containers within 10 minutes, test every batch daily, and never add preservatives or additives. We're FSSAI certified and committed to sustainability.",
        },
        {
          q: "Where does your milk come from?",
          a: "Our milk comes exclusively from partner farmers in Purba Burdwan who raise indigenous desi cows. These cows graze freely on natural grass and are raised without hormones or antibiotics. We maintain direct relationships with farmers to ensure quality and fair pricing.",
        },
      ],
    },
    {
      category: "Delivery & Orders",
      Icon: Truck,
      questions: [
        {
          q: "How fast is your delivery in Purba Burdwan?",
          a: "We deliver fresh dairy within 10 minutes across Purba Burdwan! Our hyperlocal model with 20+ delivery carts ensures your milk is farm-fresh when it reaches your doorstep. We have morning (6-10 AM) and evening (5-10 PM) delivery slots available every day.",
        },
        {
          q: "What areas do you deliver to?",
          a: "We currently serve all major areas in Purba Burdwan including the main city and surrounding localities. Enter your pincode on our website or app to check if we deliver to your area. We're constantly expanding our coverage!",
        },
        {
          q: "Can I schedule regular daily deliveries?",
          a: "Yes! We offer subscription plans for daily, weekly, or monthly deliveries. You can choose your preferred time slot (morning or evening) and quantity. Subscriptions come with additional discounts and you can pause or modify anytime.",
        },
        {
          q: "What if I'm not home during delivery?",
          a: "Our delivery partners will call you before arriving. If you're not available, we can leave the milk at your doorstep in the steel container (safe and secure), or deliver to a neighbor with your permission. You can also reschedule through our app.",
        },
      ],
    },
    {
      category: "Products & Quality",
      Icon: Droplet,
      questions: [
        {
          q: "Is your packaging really eco-friendly?",
          a: "Absolutely! We use 100% plastic-free, reusable stainless steel containers for all deliveries. After you finish your milk, we collect the empty containers, sanitize them thoroughly, and reuse them. This creates zero plastic waste and supports Purba Burdwan's sustainability goals.",
        },
        {
          q: "How do you ensure quality and purity?",
          a: "Every batch undergoes daily testing with lactometers and milk analyzers before delivery. We're FSSAI certified and maintain strict quality control from farm to doorstep. Our milk is unprocessed, unboiled, and free from any additives, preservatives, or water content.",
        },
        {
          q: "Do you sell other dairy products besides milk?",
          a: "Yes! We offer A2 Desi Cow Milk, Buffalo Milk, A2 Cow Ghee (bilona method), Fresh Paneer, Creamy Dahi, and Buttermilk. All products are made from pure A2 milk using traditional methods and delivered fresh daily.",
        },
        {
          q: "How should I store FarmDudh products?",
          a: "Store milk and dairy products in the refrigerator immediately after delivery. Our milk is unprocessed, so it's best consumed within 2 days. Ghee can be stored at room temperature. Always use clean utensils to avoid contamination.",
        },
      ],
    },
    {
      category: "Pricing & Payment",
      Icon: Award,
      questions: [
        {
          q: "What are your prices?",
          a: "A2 Desi Cow Milk: ₹80/liter, Buffalo Milk: ₹70/liter, A2 Cow Ghee: ₹650/500g, Fresh Paneer: ₹90/250g, Creamy Dahi: ₹50/500g. Prices include delivery. Subscription customers get 10-15% additional discount.",
        },
        {
          q: "What payment methods do you accept?",
          a: "We accept all major payment methods: UPI, Credit/Debit Cards, Net Banking, and Cash on Delivery. For subscriptions, we recommend setting up auto-pay for convenience. First-time customers get 10% off!",
        },
        {
          q: "Do you offer bulk discounts?",
          a: "Yes! For bulk orders (10+ liters daily or events/functions), we offer special pricing. Contact our bulk order team at +91 77972 33633 or email bulk@farmdudh.com for custom quotes.",
        },
      ],
    },
    {
      category: "Health & Safety",
      Icon: Shield,
      questions: [
        {
          q: "Is A2 milk safe for lactose-intolerant people?",
          a: "While A2 milk is easier to digest than regular milk, it still contains lactose. Some people with mild lactose sensitivity find A2 milk more tolerable, but those with severe lactose intolerance should consult their doctor first.",
        },
        {
          q: "Can children and elderly consume A2 milk?",
          a: "Yes! A2 milk is excellent for all age groups. It's especially beneficial for children (provides essential nutrients for growth) and elderly (easy to digest, rich in calcium). Always consult your pediatrician for infants under 1 year.",
        },
        {
          q: "Do your cows receive antibiotics or hormones?",
          a: "No! Our partner farmers never use growth hormones or routine antibiotics. The cows are raised naturally with proper nutrition and care. If a cow requires medical treatment, its milk is not collected until the treatment is complete and cleared.",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
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

        <div className="container mx-auto px-4 relative z-10 text-center">
          <span className="inline-block bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-full text-sm font-bold mb-6">
            ❓ HELP CENTER
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about FarmDudh's A2 dairy products
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {faqCategories.map((category, catIndex) => (
            <div key={catIndex} className="mb-16 max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
                  <category.Icon className="text-white" size={24} />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900">
                  {category.category}
                </h2>
              </div>

              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => {
                  const globalIndex = `${catIndex}-${faqIndex}`;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div
                      key={faqIndex}
                      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                    >
                      <button
                        onClick={() => toggleFAQ(globalIndex)}
                        className="w-full p-6 flex items-center justify-between text-left hover:bg-green-50 transition-colors duration-300"
                      >
                        <span className="text-lg font-bold text-gray-900 pr-4">
                          {faq.q}
                        </span>
                        {isOpen ? (
                          <ChevronUp
                            className="text-green-600 flex-shrink-0"
                            size={24}
                          />
                        ) : (
                          <ChevronDown
                            className="text-gray-400 flex-shrink-0"
                            size={24}
                          />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-6 pb-6 pt-2">
                          <div className="border-t border-gray-200 pt-4">
                            <p className="text-gray-700 leading-relaxed">
                              {faq.a}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Still Have Questions?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Our customer support team is here to help you
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => alert("Call us")}
              className="bg-white text-green-700 py-4 px-10 rounded-full hover:bg-green-50 shadow-2xl text-lg font-bold transition-all duration-300 hover:scale-105"
            >
              📞 Call Us: +91 77972 33633
            </button>
            <button
              onClick={() => alert("Email us")}
              className="bg-transparent border-2 border-white text-white py-4 px-10 rounded-full hover:bg-white/10 shadow-xl text-lg font-bold transition-all duration-300"
            >
              ✉️ Email: support@farmdudh.com
            </button>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
}

export default WhyUs;
