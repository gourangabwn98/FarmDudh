import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { Phone, ArrowRight, Loader2 } from "lucide-react";

function Login() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSendOtp = () => {
    if (!mobile.match(/^\+?\d{10,12}$/)) {
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
      if (login(mobile, otp)) {
        const redirectTo =
          new URLSearchParams(location.search).get("redirect") === "cart"
            ? "/cart"
            : "/products";
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
            <Phone size={24} className="text-milkvilla-green" />
            <h1 className="text-2xl font-bold text-gray-900">Login</h1>
          </div>
          {!otpSent ? (
            <>
              <div className="mb-4">
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
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="+91 9876543210"
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
            </>
          ) : (
            <>
              <div className="mb-4">
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
            </>
          )}
          <p className="text-sm text-gray-600 mt-4 text-center">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-milkvilla-green hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
