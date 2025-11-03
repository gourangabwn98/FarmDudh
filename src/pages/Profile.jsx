// src/pages/Profile.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
import {
  User,
  Phone,
  Home,
  Calendar,
  Save,
  ArrowLeft,
  Store,
  Camera,
  Mail,
  MapPin,
  Package,
} from "lucide-react";
import { useAuth } from "../components/AuthContext";

function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  // Initialize form with ALL fields from MongoDB
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        mobile: user.mobile || "",
        email: user.email || "",
        address: user.address || "",
        pincode: user.pincode || "",
        customerType: user.customerType || "",
        shopName: user.shopName || "",
        shopImage: user.shopImage || null,
        // Format date for input[type="date"]
        dob: user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split("T")[0]
          : "",
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (
      !formData.fullName?.trim() ||
      !formData.mobile ||
      !formData.address?.trim() ||
      !formData.pincode?.trim() ||
      !formData.customerType
    ) {
      alert("Please fill all required fields");
      return;
    }
    if (
      formData.customerType !== "home" &&
      (!formData.shopName?.trim() || !formData.shopImage)
    ) {
      alert("Shop name and image required");
      return;
    }
    updateProfile(formData);
    setIsEditing(false);
  };

  const customerTypes = [
    { value: "", label: "Select" },
    { value: "home", label: "Home" },
    { value: "restaurant", label: "Restaurant" },
    { value: "sweet shop", label: "Sweet Shop" },
    { value: "tea shop", label: "Tea Shop" },
    { value: "other", label: "Other" },
  ];

  const getLabel = (v) =>
    customerTypes.find((t) => t.value === v)?.label || "-";
  const showShop = formData.customerType && formData.customerType !== "home";

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-poppins py-12">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <User size={24} className="text-milkvilla-green" />
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          </div>

          {/* EDIT MODE */}
          {isEditing ? (
            <div className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile *
                </label>
                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={formData.mobile}
                    disabled
                    className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg bg-gray-50"
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
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none"
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Address *
                </label>
                <div className="relative">
                  <Home
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Pincode */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Pincode *
                </label>
                <div className="relative">
                  <MapPin
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none"
                    required
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
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none"
                  />
                </div>
              </div>

              {/* Customer Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Customer Type *
                </label>
                <div className="relative">
                  <Package
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <select
                    name="customerType"
                    value={formData.customerType}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none appearance-none"
                    required
                  >
                    {customerTypes.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
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
              {showShop && (
                <>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Shop Name *
                    </label>
                    <div className="relative">
                      <Store
                        size={18}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />
                      <input
                        type="text"
                        name="shopName"
                        value={formData.shopName}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-3 py-2 border-2 border-gray-200 rounded-lg focus:border-milkvilla-green focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Shop Image *
                    </label>
                    {formData.shopImage ? (
                      <div className="space-y-2">
                        <img
                          src={formData.shopImage}
                          alt="Shop"
                          className="w-full h-48 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setFormData((p) => ({ ...p, shopImage: null }))
                          }
                          className="w-full bg-red-500 text-white py-2 rounded-lg text-sm"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg py-8 text-center text-gray-500">
                        <Camera size={32} className="mx-auto mb-2" />
                        <p className="text-sm">Captured during registration</p>
                      </div>
                    )}
                  </div>
                </>
              )}

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="flex-1 bg-milkvilla-green text-white py-2 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2"
                >
                  <Save size={20} /> Save
                </button>
              </div>
            </div>
          ) : (
            /* VIEW MODE */
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <span className="font-semibold">Full Name:</span>{" "}
                {user?.fullName || "-"}
              </div>
              <div>
                <span className="font-semibold">Mobile:</span>{" "}
                {user?.mobile || "-"}
              </div>
              <div>
                <span className="font-semibold">Email:</span>{" "}
                {user?.email || "-"}
              </div>
              <div>
                <span className="font-semibold">Address:</span>{" "}
                {user?.address || "-"}
              </div>
              <div>
                <span className="font-semibold">Pincode:</span>{" "}
                {user?.pincode || "-"}
              </div>
              <div>
                <span className="font-semibold">Date of Birth:</span>{" "}
                {user?.dateOfBirth
                  ? new Date(user.dateOfBirth).toLocaleDateString()
                  : "-"}
              </div>
              <div>
                <span className="font-semibold">Customer Type:</span>{" "}
                {getLabel(user?.customerType)}
              </div>

              {user?.customerType && user?.customerType !== "home" && (
                <>
                  <div>
                    <span className="font-semibold">Shop Name:</span>{" "}
                    {user?.shopName || "-"}
                  </div>
                  {user?.shopImage && (
                    <div>
                      <span className="font-semibold">Shop Image:</span>
                      <img
                        src={user.shopImage}
                        alt="Shop"
                        className="mt-2 w-full h-48 object-cover rounded-lg border"
                      />
                    </div>
                  )}
                </>
              )}

              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full bg-milkvilla-green text-white py-2 rounded-lg font-semibold hover:bg-green-700 mt-4"
              >
                Edit Profile
              </button>
            </div>
          )}

          <Link
            to="/products"
            className="flex items-center gap-2 text-milkvilla-green mt-4 hover:underline"
          >
            <ArrowLeft size={16} /> Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
