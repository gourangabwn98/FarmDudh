// src/pages/Login.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import { Phone, ArrowRight, Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../components/AuthContext";

function Login() {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth(); // <-- new
  const navigate = useNavigate();
  const location = useLocation();

  // Pre-fill mobile if coming from register
  useEffect(() => {
    if (location.state?.mobile) setMobile(location.state.mobile);
  }, [location.state]);

  /* ---------- NORMALIZE MOBILE ---------- */
  const normalizeMobile = (value) => {
    let digits = value.replace(/\D/g, "");
    if (digits.startsWith("91")) digits = digits.substring(2);
    if (digits.length > 10) digits = digits.slice(0, 10);
    return digits ? `+91${digits}` : "";
  };

  const handleMobileChange = (e) => setMobile(normalizeMobile(e.target.value));

  /* ---------- SEND OTP ---------- */
  const handleSendOtp = async () => {
    if (!mobile.match(/^\+91\d{10}$/)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }
    setIsLoading(true);
    try {
      // 1. Check if mobile exists
      const checkRes = await fetch(
        "http://localhost:5000/api/auth/check-mobile",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile }),
        }
      );
      const checkData = await checkRes.json();
      if (!checkRes.ok) throw new Error(checkData.error || "Check failed");

      if (!checkData.exists) {
        toast.info("Not registered – redirecting to register", {
          autoClose: 2000,
          onClose: () => navigate("/register", { state: { mobile } }),
        });
        return;
      }

      // 2. Send OTP
      const otpRes = await fetch("http://localhost:5000/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile }),
      });
      const otpData = await otpRes.json();
      if (!otpRes.ok) throw new Error(otpData.error || "OTP failed");

      toast.success("OTP sent!");
      setOtpSent(true);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------- VERIFY OTP ---------- */
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Enter a valid 6-digit OTP");
      return;
    }
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, otp: otp.trim(), isRegister: false }),
      });
      const data = await res.json();

      if (res.ok) {
        // ---------- AUTH CONTEXT UPDATE ----------
        login(data.token, data.user); // <-- NEW CALL
        toast.success("Login successful!");

        const redirect =
          new URLSearchParams(location.search).get("redirect") === "cart"
            ? "/cart"
            : "/products";

        setTimeout(() => navigate(redirect), 500);
      } else {
        toast.error(data.error || "Invalid OTP");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      otpSent ? handleVerifyOtp() : handleSendOtp();
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-poppins py-12">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-6">
              <Phone size={24} className="text-milkvilla-green" />
              <h1 className="text-2xl font-bold text-gray-900">Login</h1>
            </div>

            {/* ---------- MOBILE INPUT ---------- */}
            {!otpSent ? (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mobile Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="tel"
                      value={mobile}
                      onChange={handleMobileChange}
                      onKeyPress={handleKeyPress}
                      placeholder="+91 9876543210"
                      className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none"
                      autoFocus
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter 10-digit mobile number
                  </p>
                </div>

                <button
                  onClick={handleSendOtp}
                  disabled={isLoading}
                  className="w-full bg-milkvilla-green text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      Send OTP <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                {/* ---------- OTP INPUT ---------- */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Enter OTP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    onKeyPress={handleKeyPress}
                    placeholder="000000"
                    maxLength={6}
                    className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none text-center text-2xl tracking-widest font-semibold"
                    autoFocus
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    OTP sent to {mobile}
                  </p>

                  <button
                    onClick={handleSendOtp}
                    disabled={isLoading}
                    className="text-milkvilla-green text-sm mt-3 hover:underline block mx-auto"
                  >
                    Resend OTP
                  </button>
                </div>

                <button
                  onClick={handleVerifyOtp}
                  disabled={isLoading || otp.length !== 6}
                  className="w-full bg-milkvilla-green text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      Verify OTP <ArrowRight size={20} />
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                  }}
                  className="w-full text-gray-600 text-sm mt-3 hover:text-gray-800"
                >
                  Back to mobile input
                </button>
              </>
            )}

            <p className="text-sm text-gray-600 mt-6 text-center">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-milkvilla-green hover:underline font-semibold"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
