import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { Phone, ArrowRight, Loader2, User, Mail, Home } from "lucide-react";

function Register() {
  const [formData, setFormData] = useState({
    mobile: "",
    fullName: "",
    email: "",
    address: "",
    landmark: "",
    pincode: "",
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = () => {
    if (!formData.mobile.match(/^\+?\d{10,12}$/)) {
      alert("Please enter a valid mobile number");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      alert("OTP sent: 123456");
      setOtpSent(true);
      setIsLoading(false);
    }, 1000);
  };

  const handleVerifyOtp = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (register(formData, otp)) {
        const redirectTo =
          new URLSearchParams(location.search).get("redirect") || "/products";
        navigate(redirectTo);
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-poppins py-12">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <User size={24} className="text-milkvilla-green" />
            <h1 className="text-2xl font-bold text-gray-900">Register</h1>
          </div>
          {!otpSent ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number *
                </label>
                <div className="relative">
                  <Phone
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                    className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address
                </label>
                <div className="relative">
                  <Home
                    className="absolute left-3 top-3 text-gray-400"
                    size={18}
                  />
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House/Flat No., Street Name, Area"
                    className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none resize-none"
                    rows={3}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Landmark
                  </label>
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleInputChange}
                    placeholder="Near..."
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Pincode
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    placeholder="713101"
                    maxLength={6}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none"
                  />
                </div>
              </div>
              <button
                onClick={handleSendOtp}
                disabled={isLoading}
                className="w-full bg-milkvilla-green text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>
                    Send OTP
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter OTP *
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none"
                  required
                />
                <button
                  onClick={handleSendOtp}
                  className="text-milkvilla-green text-sm mt-2 hover:underline"
                >
                  Resend OTP
                </button>
              </div>
              <button
                onClick={handleVerifyOtp}
                disabled={isLoading}
                className="w-full bg-milkvilla-green text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 size={20} className="animate-spin" />
                ) : (
                  <>
                    Verify OTP
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          )}
          <p className="text-sm text-gray-600 mt-4 text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-milkvilla-green hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
