import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { User, Home, Calendar, ArrowRight, Loader2 } from "lucide-react";

function Register() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    address: "",
    flat: "",
    gender: "",
    dob: "",
    otp: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOtp = () => {
    if (
      !formData.name.trim() ||
      !formData.mobile.match(/^\+?\d{10,12}$/) ||
      !formData.address.trim() ||
      !formData.flat.trim() ||
      !formData.gender ||
      !formData.dob
    ) {
      alert("Please fill all required fields");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      // Simulated OTP send
      alert("OTP sent: 123456"); // For demo
      setStep(2);
      setIsLoading(false);
    }, 1000);
  };

  const handleVerifyOtp = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (register(formData, formData.otp)) {
        navigate("/products");
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
            <h1 className="text-2xl font-bold text-gray-900">
              {step === 1 ? "Register" : "Verify OTP"}
            </h1>
          </div>
          {step === 1 ? (
            <>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <div className="relative">
                    <User
                      size={18}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
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
                    Address *
                  </label>
                  <div className="relative">
                    <Home
                      size={18}
                      className="absolute left-3 top-3 text-gray-400"
                    />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="House/Street/Area"
                      rows={3}
                      className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Flat/Apartment *
                  </label>
                  <input
                    type="text"
                    name="flat"
                    value={formData.flat}
                    onChange={handleInputChange}
                    placeholder="Flat No./Building"
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <div className="relative">
                    <Calendar
                      size={18}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none"
                      required
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
            </>
          ) : (
            <>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter OTP *
                </label>
                <input
                  type="text"
                  name="otp"
                  value={formData.otp}
                  onChange={handleInputChange}
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
            </>
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
