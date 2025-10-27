import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import { User, Home, Calendar, Save, ArrowLeft } from "lucide-react";

function Profile() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    mobile: user?.mobile || "",
    address: user?.address || "",
    flat: user?.flat || "",
    gender: user?.gender || "",
    dob: user?.dob || "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
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
    updateProfile(formData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-poppins py-12">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <User size={24} className="text-milkvilla-green" />
            <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          </div>
          {isEditing ? (
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
                <div className="flex gap-3">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg font-semibold hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="flex-1 bg-milkvilla-green text-white py-2 rounded-lg font-semibold hover:bg-green-700 flex items-center justify-center gap-2"
                  >
                    <Save size={20} />
                    Save Changes
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4 text-sm text-gray-700">
                <div>
                  <span className="font-semibold">Full Name:</span>{" "}
                  {user?.name || "-"}
                </div>
                <div>
                  <span className="font-semibold">Mobile:</span>{" "}
                  {user?.mobile || "-"}
                </div>
                <div>
                  <span className="font-semibold">Address:</span>{" "}
                  {user?.address || "-"}
                </div>
                <div>
                  <span className="font-semibold">Flat/Apartment:</span>{" "}
                  {user?.flat || "-"}
                </div>
                <div>
                  <span className="font-semibold">Gender:</span>{" "}
                  {user?.gender
                    ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
                    : "-"}
                </div>
                <div>
                  <span className="font-semibold">Date of Birth:</span>{" "}
                  {user?.dob || "-"}
                </div>
                <button
                  onClick={() => setIsEditing(true)}
                  className="w-full bg-milkvilla-green text-white py-2 rounded-lg font-semibold hover:bg-green-700 mt-4"
                >
                  Edit Profile
                </button>
              </div>
            </>
          )}
          <Link
            to="/products"
            className="flex items-center gap-2 text-milkvilla-green mt-4 hover:underline"
          >
            <ArrowLeft size={16} />
            Back to Products
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
