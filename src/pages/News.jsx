// src/pages/Contact.jsx  (Rename from News.jsx to Contact.jsx or keep as is)
import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  User,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("{}/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to send message");
      }

      const data = await res.json();
      toast.success(data.message || "Message sent successfully!");
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
      <ToastContainer position="top-right" autoClose={3000} />

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
            GET IN TOUCH
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
            Contact FarmDudh
          </h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
            Have questions about our A2 dairy products? We're here to help!
            Reach out to us for orders, inquiries, or feedback.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20 relative z-20">
            {[
              {
                Icon: MapPin,
                title: "Visit Us",
                info: "Purba Burdwan, West Bengal",
                subInfo: "India - 713101",
                color: "from-blue-500 to-cyan-500",
              },
              {
                Icon: Phone,
                title: "Call Us",
                info: "+91 77972 33633",
                subInfo: "Mon-Sun: 6 AM - 10 PM",
                color: "from-green-500 to-emerald-500",
              },
              {
                Icon: Mail,
                title: "Email Us",
                info: "support@farmdudh.com",
                subInfo: "We'll respond within 24 hrs",
                color: "from-purple-500 to-pink-500",
              },
              {
                Icon: Clock,
                title: "Delivery Hours",
                info: "6:00 AM - 10:00 PM",
                subInfo: "Every day of the week",
                color: "from-orange-500 to-red-500",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}
                >
                  <item.Icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-700 font-semibold mb-1">{item.info}</p>
                <p className="text-gray-500 text-sm">{item.subInfo}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <span className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                  SEND MESSAGE
                </span>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                  Get In Touch
                </h2>
                <p className="text-gray-600 text-lg">
                  Fill out the information below and we'll get back to you as
                  soon as possible.
                </p>
              </div>

              {submitted ? (
                <div className="bg-green-50 border-2 border-green-500 rounded-2xl p-8 text-center">
                  <CheckCircle
                    className="text-green-600 mx-auto mb-4"
                    size={64}
                  />
                  <h3 className="text-2xl font-bold text-green-800 mb-2">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-green-700">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Your Name *
                    </label>
                    <div className="relative">
                      <User
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Email *
                      </label>
                      <div className="relative">
                        <Mail
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="your@email.com"
                          required
                          className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Phone *
                      </label>
                      <div className="relative">
                        <Phone
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 91256 33633"
                          required
                          className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Subject *
                    </label>
                    <div className="relative">
                      <MessageCircle
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                      />
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What is this about?"
                        required
                        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                      Message *
                    </label>
                    <div className="relative">
                      <MessageSquare
                        className="absolute left-4 top-4 text-gray-400"
                        size={20}
                      />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us more about your inquiry..."
                        required
                        className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-all duration-300 resize-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-8 rounded-xl hover:from-green-700 hover:to-emerald-700 shadow-lg font-bold text-lg transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 ${
                      loading ? "opacity-80 cursor-not-allowed" : ""
                    }`}
                  >
                    {loading ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send size={20} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-6">
              <div>
                <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold mb-4">
                  FIND US
                </span>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
                  Our Location
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  Visit us in Purba Burdwan to experience our fresh dairy
                  products firsthand.
                </p>
              </div>

              {/* Google Map Embed */}
              <div className="rounded-2xl overflow-hidden shadow-2xl h-96 border-4 border-green-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117925.21689027555!2d87.77646!3d23.2324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f7a2d7d3c7f7b9%3A0x6f4d4e1a1e4f4e1a!2sPurba%20Bardhaman%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1234567890"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="FarmDudh Location"
                />
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-100">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Clock className="text-green-600" size={20} />
                    Delivery Schedule
                  </h4>
                  <p className="text-gray-700 text-sm">
                    Morning: 6:00 AM - 10:00 AM
                    <br />
                    Evening: 5:00 PM - 10:00 PM
                  </p>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-100">
                  <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                    <Phone className="text-blue-600" size={20} />
                    Bulk Orders
                  </h4>
                  <p className="text-gray-700 text-sm">
                    For bulk orders and special
                    <br />
                    requests, call us directly
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Quick Links */}
      <section className="py-16 bg-gradient-to-r from-green-600 via-emerald-600 to-green-700">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-green-100 text-lg mb-8">
            Check out our FAQ section for quick answers to common questions
          </p>
          <button
            onClick={() => alert("Navigate to FAQ page")}
            className="bg-white text-green-700 py-4 px-10 rounded-full hover:bg-green-50 shadow-2xl text-lg font-bold transition-all duration-300 hover:scale-105"
          >
            Visit FAQ Section
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

export default Contact;
