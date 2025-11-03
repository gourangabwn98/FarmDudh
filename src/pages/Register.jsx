import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Phone,
  ArrowRight,
  Loader2,
  User,
  Mail,
  Home,
  Calendar,
  Store,
  Camera,
  X,
  MapPin,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const backend_api_base = process.env.REACT_APP_API_BASE;
  const [formData, setFormData] = useState({
    mobile: "",
    fullName: "",
    email: "",
    address: "",
    landmark: "",
    pincode: "",
    dateOfBirth: "",
    customerType: "",
    shopName: "",
    shopImage: null,
  });
  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isFetchingLocation, setIsFetchingLocation] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  // PRE-FILL MOBILE FROM LOGIN
  useEffect(() => {
    if (location.state?.mobile) {
      setFormData((prev) => ({ ...prev, mobile: location.state.mobile }));
    }
  }, [location.state]);

  // NORMALIZE MOBILE NUMBER
  const normalizeMobile = (value) => {
    // Remove all non-digit characters
    let digits = value.replace(/\D/g, "");

    // Remove leading 91 if present (we'll add + later)
    if (digits.startsWith("91")) {
      digits = digits.substring(2);
    }

    // Limit to 10 digits
    if (digits.length > 10) {
      digits = digits.slice(0, 10);
    }

    // Add +91 prefix if we have digits
    if (digits.length > 0) {
      return `+91${digits}`;
    }

    return "";
  };

  // HANDLE INPUT
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      const normalized = normalizeMobile(value);
      setFormData((prev) => ({ ...prev, mobile: normalized }));
    } else if (name === "pincode") {
      // Only allow digits, max 6
      const digits = value.replace(/\D/g, "").slice(0, 6);
      setFormData((prev) => ({ ...prev, pincode: digits }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // LOCATION
  const fetchCurrentLocation = async () => {
    if (!navigator.geolocation) {
      return toast.error("Geolocation not supported by your browser");
    }

    setIsFetchingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const API_KEY = "YOUR_GOOGLE_API_KEY"; // ← Replace with your actual key

        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
          );
          const data = await response.json();

          if (data.results?.[0]) {
            setFormData((prev) => ({
              ...prev,
              address: data.results[0].formatted_address,
            }));
            toast.success("Location fetched successfully");
          } else {
            toast.error("Unable to fetch address");
          }
        } catch (error) {
          toast.error("Failed to fetch location");
          console.error("Location error:", error);
        }

        setIsFetchingLocation(false);
      },
      (error) => {
        toast.error("Location permission denied");
        console.error("Geolocation error:", error);
        setIsFetchingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  // CAMERA
  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      videoRef.current.srcObject = stream;
      streamRef.current = stream;
      setCameraOpen(true);
    } catch (error) {
      toast.error("Camera access denied");
      console.error("Camera error:", error);
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    const imageUrl = canvas.toDataURL("image/jpeg", 0.8);
    setCapturedImage(imageUrl);
    setFormData((prev) => ({ ...prev, shopImage: imageUrl }));
    closeCamera();
    toast.success("Photo captured");
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    setCameraOpen(false);
  };

  const resetImage = () => {
    setCapturedImage(null);
    setFormData((prev) => ({ ...prev, shopImage: null }));
  };

  // VALIDATE FORM
  const validateForm = () => {
    const { mobile, fullName, customerType, shopName } = formData;

    // Validate mobile (should be +91 followed by 10 digits)
    if (!mobile.match(/^\+91\d{10}$/)) {
      toast.error("Please enter a valid 10-digit mobile number");
      return false;
    }

    if (!fullName.trim()) {
      toast.error("Full name is required");
      return false;
    }

    if (!customerType) {
      toast.error("Please select customer type");
      return false;
    }

    if (customerType !== "home" && !shopName.trim()) {
      toast.error("Shop name is required for business customers");
      return false;
    }

    if (customerType !== "home" && !formData.shopImage) {
      toast.error("Shop image is required for business customers");
      return false;
    }

    return true;
  };

  // SEND OTP
  const handleSendOtp = async () => {
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // 1. Check if mobile already exists
      const checkRes = await fetch(`${backend_api_base}/auth/check-mobile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: formData.mobile }),
      });

      const checkData = await checkRes.json();

      if (!checkRes.ok) {
        throw new Error(checkData.error || "Failed to check mobile");
      }

      if (checkData.exists) {
        toast.info(
          "This number is already registered. Redirecting to login...",
          {
            autoClose: 2000,
            onClose: () =>
              navigate("/login", { state: { mobile: formData.mobile } }),
          }
        );
        setIsLoading(false);
        return;
      }

      // 2. Send OTP
      const otpRes = await fetch(`${backend_api_base}/auth/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: formData.mobile }),
      });

      const otpData = await otpRes.json();

      if (!otpRes.ok) {
        throw new Error(otpData.error || "Failed to send OTP");
      }

      toast.success("OTP sent to your mobile number!");
      setOtpSent(true);
    } catch (error) {
      toast.error(error.message || "Failed to send OTP");
      console.error("Send OTP error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // VERIFY OTP
  const handleVerifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    navigate("/");

    try {
      const response = await fetch(`${backend_api_base}/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobile: formData.mobile,
          otp: otp.trim(),
          isRegister: true,
          formData: {
            fullName: formData.fullName,
            email: formData.email,
            address: formData.address,
            landmark: formData.landmark,
            pincode: formData.pincode,
            dateOfBirth: formData.dateOfBirth,
            customerType: formData.customerType,
            shopName: formData.shopName,
            shopImage: formData.shopImage,
          },
        }),
      });

      const data = await response.json();
      console.log("data is ", data);

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success("Registration successful!");
        setTimeout(() => navigate("/products"), 1000);
      } else {
        toast.error(data.error || "Invalid OTP. Please try again.");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
      console.error("Verify OTP error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const customerTypes = [
    { value: "", label: "Select customer type" },
    { value: "home", label: "Home" },
    { value: "restaurant", label: "Restaurant" },
    { value: "sweet shop", label: "Sweet Shop" },
    { value: "tea shop", label: "Tea Shop" },
    { value: "other", label: "Other" },
  ];

  const showShopFields =
    formData.customerType && formData.customerType !== "home";

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-poppins py-12">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-xl shadow-lg p-6 relative">
            {/* CAMERA MODAL */}
            {cameraOpen && (
              <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl p-4 max-w-sm w-full">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-semibold">Capture Shop Image</h3>
                    <button onClick={closeCamera} className="text-gray-500">
                      <X size={20} />
                    </button>
                  </div>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full rounded-lg"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  <button
                    onClick={capturePhoto}
                    className="mt-3 w-full bg-milkvilla-green text-white py-2 rounded-lg font-semibold flex items-center justify-center gap-2"
                  >
                    <Camera size={20} /> Capture Photo
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 mb-6">
              <User size={24} className="text-milkvilla-green" />
              <h1 className="text-2xl font-bold text-gray-900">Register</h1>
            </div>

            {/* FORM */}
            {!otpSent ? (
              <div className="space-y-4">
                {/* Mobile */}
                <div>
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
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      placeholder="+91 9876543210"
                      className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none"
                      required
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter 10-digit mobile number
                  </p>
                </div>

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
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

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
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

                {/* DOB */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <div className="relative">
                    <Calendar
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none"
                    />
                  </div>
                </div>

                {/* Customer Type */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Customer Type <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Store
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      size={18}
                    />
                    <select
                      name="customerType"
                      value={formData.customerType}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-10 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none appearance-none bg-white"
                      required
                    >
                      {customerTypes.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Shop Fields */}
                {showShopFields && (
                  <>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Shop Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Store
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                          size={18}
                        />
                        <input
                          type="text"
                          name="shopName"
                          value={formData.shopName}
                          onChange={handleInputChange}
                          placeholder="Enter shop name"
                          className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Shop Image <span className="text-red-500">*</span>
                      </label>
                      {capturedImage ? (
                        <div className="space-y-2">
                          <img
                            src={capturedImage}
                            alt="Shop"
                            className="w-full h-48 object-cover rounded-lg border"
                          />
                          <button
                            onClick={resetImage}
                            type="button"
                            className="w-full bg-red-500 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-red-600"
                          >
                            <X size={18} /> Remove Image
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={openCamera}
                          type="button"
                          className="w-full border-2 border-dashed border-gray-300 rounded-lg py-8 text-gray-500 hover:border-milkvilla-green transition-colors flex flex-col items-center justify-center gap-2"
                        >
                          <Camera size={32} />
                          <span className="text-sm">
                            Tap to capture shop image
                          </span>
                        </button>
                      )}
                    </div>
                  </>
                )}

                {/* Address */}
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
                      placeholder="House/Flat No., Street, Area"
                      className="w-full pl-10 pr-12 pt-2 pb-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none resize-none"
                      rows={3}
                    />
                    <button
                      type="button"
                      onClick={fetchCurrentLocation}
                      disabled={isFetchingLocation}
                      className="absolute right-3 top-3 text-gray-500 hover:text-milkvilla-green"
                      title="Use current location"
                    >
                      {isFetchingLocation ? (
                        <Loader2 size={18} className="animate-spin" />
                      ) : (
                        <MapPin size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Landmark & Pincode */}
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

                {/* SEND OTP */}
                <button
                  onClick={handleSendOtp}
                  disabled={isLoading}
                  type="button"
                  className="w-full bg-milkvilla-green text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      Send OTP <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </div>
            ) : (
              /* OTP SECTION */
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Enter OTP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                    }
                    placeholder="Enter 6-digit OTP"
                    maxLength={6}
                    className="w-full px-3 py-3 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none text-center text-2xl tracking-widest font-semibold"
                    required
                    autoFocus
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center">
                    OTP sent to {formData.mobile}
                  </p>
                  <button
                    onClick={handleSendOtp}
                    disabled={isLoading}
                    type="button"
                    className="text-milkvilla-green text-sm mt-3 hover:underline block mx-auto disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                </div>

                <button
                  onClick={handleVerifyOtp}
                  disabled={isLoading || otp.length !== 6}
                  type="button"
                  className="w-full bg-milkvilla-green text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      Verify & Register <ArrowRight size={20} />
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    setOtpSent(false);
                    setOtp("");
                  }}
                  type="button"
                  className="w-full text-gray-600 text-sm hover:text-gray-800"
                >
                  ← Back to form
                </button>
              </div>
            )}

            <p className="text-sm text-gray-600 mt-6 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-milkvilla-green hover:underline font-semibold"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
