import React, { useState } from "react";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Package,
  CreditCard,
  MapPin,
  CheckCircle,
  AlertCircle,
  Clock,
  Shield,
  Tag,
  Truck,
  User,
  Phone,
  Mail,
  Home,
  X,
} from "lucide-react";

// Main component that handles both Cart and Checkout
function CartCheckout({ page = "cart" }) {
  const [currentPage, setCurrentPage] = useState(page);

  if (currentPage === "cart") {
    return <CartPage onCheckout={() => setCurrentPage("checkout")} />;
  }
  return <CheckoutPage onBack={() => setCurrentPage("cart")} />;
}

// CART PAGE
function CartPage({ onCheckout }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "A2 Desi Cow Milk",
      price: 72,
      originalPrice: 80,
      quantity: 2,
      unit: "liter",
      img: "/assets/images/a2milk.webp",
      discount: 10,
    },
    {
      id: 3,
      name: "A2 Cow Ghee",
      price: 405,
      originalPrice: 450,
      quantity: 1,
      unit: "500g",
      img: "/assets/images/ghee.webp",
      discount: 10,
    },
    {
      id: 5,
      name: "Creamy Dahi",
      price: 45,
      originalPrice: 50,
      quantity: 3,
      unit: "500g",
      img: "/assets/images/dahi.jpeg",
      discount: 10,
    },
  ]);

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const updateQuantity = (id, change) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const applyCoupon = () => {
    const validCoupons = {
      FIRST10: { discount: 10, type: "percentage", label: "10% OFF" },
      SAVE50: { discount: 50, type: "flat", label: "₹50 OFF" },
      WELCOME: { discount: 15, type: "percentage", label: "15% OFF" },
    };

    if (validCoupons[couponCode.toUpperCase()]) {
      setAppliedCoupon(validCoupons[couponCode.toUpperCase()]);
    } else {
      alert("Invalid coupon code");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const savings = cartItems.reduce(
    (sum, item) => sum + (item.originalPrice - item.price) * item.quantity,
    0
  );

  let couponDiscount = 0;
  if (appliedCoupon) {
    couponDiscount =
      appliedCoupon.type === "percentage"
        ? (subtotal * appliedCoupon.discount) / 100
        : appliedCoupon.discount;
  }

  const deliveryFee = subtotal > 500 ? 0 : 20;
  const total = subtotal - couponDiscount + deliveryFee;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 text-white mb-4">
            <ShoppingCart size={32} />
            <h1 className="text-4xl font-extrabold">Shopping Cart</h1>
          </div>
          <p className="text-green-100">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              {cartItems.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center shadow-lg">
                  <ShoppingCart
                    size={64}
                    className="text-gray-300 mx-auto mb-4"
                  />
                  <h3 className="text-2xl font-bold text-gray-700 mb-2">
                    Your cart is empty
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Add some delicious dairy products!
                  </p>
                  <button
                    onClick={() => alert("Navigate to products")}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-8 rounded-full font-bold hover:scale-105 transition-all duration-300"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex flex-col md:flex-row gap-6">
                        {/* Product Image */}
                        <div className="relative w-full md:w-32 h-32 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-full h-full object-contain p-4"
                          />
                          {item.discount > 0 && (
                            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              {item.discount}% OFF
                            </div>
                          )}
                        </div>

                        {/* Product Details */}
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-xl font-bold text-gray-900 mb-1">
                                {item.name}
                              </h3>
                              <p className="text-sm text-gray-500">
                                Per {item.unit}
                              </p>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-all duration-300"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-2xl font-extrabold text-green-600">
                              ₹{item.price}
                            </span>
                            <span className="text-sm text-gray-400 line-through">
                              ₹{item.originalPrice}
                            </span>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 bg-gray-100 rounded-full p-1">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="font-bold text-gray-900 w-8 text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white transition-all duration-300"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-gray-500">Subtotal</p>
                              <p className="text-xl font-bold text-gray-900">
                                ₹{item.price * item.quantity}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Coupon Section */}
              {cartItems.length > 0 && (
                <div className="bg-white rounded-2xl p-6 shadow-lg mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag className="text-green-600" size={24} />
                    <h3 className="text-xl font-bold text-gray-900">
                      Apply Coupon
                    </h3>
                  </div>

                  <div className="flex gap-3 mb-4">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) =>
                        setCouponCode(e.target.value.toUpperCase())
                      }
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-all duration-300"
                    >
                      Apply
                    </button>
                  </div>

                  {appliedCoupon && (
                    <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="text-green-600" size={20} />
                        <span className="text-green-800 font-semibold">
                          Coupon Applied: {appliedCoupon.label}
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setAppliedCoupon(null);
                          setCouponCode("");
                        }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  )}

                  <div className="mt-4 space-y-2">
                    <p className="text-sm text-gray-600">Available Coupons:</p>
                    <div className="flex flex-wrap gap-2">
                      {["FIRST10", "SAVE50", "WELCOME"].map((code) => (
                        <button
                          key={code}
                          onClick={() => setCouponCode(code)}
                          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-100 hover:text-green-700 transition-all duration-300"
                        >
                          {code}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            {cartItems.length > 0 && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-3xl p-6 shadow-lg sticky top-24">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Order Summary
                  </h3>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span className="font-semibold">₹{subtotal}</span>
                    </div>

                    {savings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Product Savings</span>
                        <span className="font-semibold">-₹{savings}</span>
                      </div>
                    )}

                    {appliedCoupon && (
                      <div className="flex justify-between text-green-600">
                        <span>Coupon Discount</span>
                        <span className="font-semibold">
                          -₹{couponDiscount.toFixed(0)}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-gray-700">
                      <span>Delivery Fee</span>
                      <span
                        className={`font-semibold ${
                          deliveryFee === 0 ? "text-green-600" : ""
                        }`}
                      >
                        {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                      </span>
                    </div>

                    {subtotal < 500 && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm text-blue-800">
                        <AlertCircle size={16} className="inline mr-2" />
                        Add ₹{500 - subtotal} more for FREE delivery!
                      </div>
                    )}

                    <div className="border-t-2 border-gray-200 pt-4">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span className="text-2xl text-green-600">
                          ₹{total.toFixed(0)}
                        </span>
                      </div>
                      {savings + couponDiscount > 0 && (
                        <p className="text-sm text-green-600 text-right mt-1">
                          You save ₹{(savings + couponDiscount).toFixed(0)}!
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={onCheckout}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                  >
                    Proceed to Checkout
                    <ArrowRight size={20} />
                  </button>

                  {/* Trust Badges */}
                  <div className="mt-6 space-y-3">
                    {[
                      { Icon: Shield, text: "Secure Payment" },
                      { Icon: Truck, text: "10-Min Delivery" },
                      { Icon: Package, text: "Quality Guaranteed" },
                    ].map((badge, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-gray-600 text-sm"
                      >
                        <badge.Icon size={18} className="text-green-600" />
                        <span>{badge.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// CHECKOUT PAGE
function CheckoutPage({ onBack }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Delivery Details
    fullName: "",
    phone: "",
    email: "",
    address: "",
    landmark: "",
    pincode: "",
    city: "Purba Burdwan",
    // Payment Details
    paymentMethod: "cod",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const placeOrder = () => {
    setOrderPlaced(true);
  };

  const orderDetails = {
    items: 3,
    subtotal: 279,
    delivery: 0,
    total: 279,
    orderNumber: `FD${Date.now().toString().slice(-8)}`,
    estimatedTime: "10 minutes",
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 flex items-center justify-center py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8 md:p-12 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
              <CheckCircle className="text-green-600" size={48} />
            </div>

            <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
              Order Placed Successfully!
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for choosing FarmDudh!
            </p>

            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-8">
              <p className="text-sm text-gray-600 mb-2">Order Number</p>
              <p className="text-3xl font-bold text-green-600 mb-4">
                #{orderDetails.orderNumber}
              </p>
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <Clock size={20} className="text-green-600" />
                <span>Estimated delivery: {orderDetails.estimatedTime}</span>
              </div>
            </div>

            <div className="space-y-4 mb-8 text-left">
              <h3 className="font-bold text-gray-900 text-lg">Order Summary</h3>
              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Items ({orderDetails.items})
                  </span>
                  <span className="font-semibold">
                    ₹{orderDetails.subtotal}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="font-semibold text-green-600">
                    {orderDetails.delivery === 0
                      ? "FREE"
                      : `₹${orderDetails.delivery}`}
                  </span>
                </div>
                <div className="border-t pt-2 flex justify-between text-lg font-bold">
                  <span>Total Paid</span>
                  <span className="text-green-600">₹{orderDetails.total}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => alert("Track order")}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl font-bold hover:scale-105 transition-all duration-300"
              >
                Track Order
              </button>
              <button
                onClick={() => alert("Continue shopping")}
                className="bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-bold hover:bg-gray-200 transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 py-12">
        <div className="container mx-auto px-4">
          <button
            onClick={onBack}
            className="text-white flex items-center gap-2 mb-4 hover:underline"
          >
            ← Back to Cart
          </button>
          <h1 className="text-4xl font-extrabold text-white mb-4">Checkout</h1>

          {/* Progress Steps */}
          <div className="flex items-center gap-4 max-w-md">
            {[
              { num: 1, label: "Delivery" },
              { num: 2, label: "Payment" },
              { num: 3, label: "Confirm" },
            ].map((item) => (
              <div key={item.num} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= item.num
                      ? "bg-white text-green-600"
                      : "bg-white/20 text-white"
                  }`}
                >
                  {item.num}
                </div>
                <span className="ml-2 text-white text-sm font-semibold">
                  {item.label}
                </span>
                {item.num < 3 && <div className="w-12 h-1 bg-white/30 mx-2" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              {/* Step 1: Delivery Details */}
              {step === 1 && (
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="text-green-600" size={28} />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Delivery Details
                    </h2>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Phone Number *
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
                            onChange={handleInputChange}
                            placeholder="+91 98765 43210"
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Email
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
                            onChange={handleInputChange}
                            placeholder="your@email.com"
                            className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-700 font-semibold mb-2">
                        Delivery Address *
                      </label>
                      <div className="relative">
                        <Home
                          className="absolute left-4 top-4 text-gray-400"
                          size={20}
                        />
                        <textarea
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          rows={3}
                          placeholder="House/Flat No., Street Name, Area"
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none resize-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Landmark
                        </label>
                        <input
                          type="text"
                          name="landmark"
                          value={formData.landmark}
                          onChange={handleInputChange}
                          placeholder="Near..."
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Pincode *
                        </label>
                        <input
                          type="text"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          placeholder="713101"
                          maxLength={6}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.city}
                          readOnly
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50"
                        />
                      </div>
                    </div>

                    <button
                      onClick={() => setStep(2)}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Continue to Payment
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Method */}
              {step === 2 && (
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="text-green-600" size={28} />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Payment Method
                    </h2>
                  </div>

                  <div className="space-y-4 mb-8">
                    {[
                      {
                        id: "cod",
                        label: "Cash on Delivery",
                        desc: "Pay when you receive",
                        icon: "💵",
                      },
                      {
                        id: "upi",
                        label: "UPI Payment",
                        desc: "Google Pay, PhonePe, Paytm",
                        icon: "📱",
                      },
                      {
                        id: "card",
                        label: "Credit/Debit Card",
                        desc: "Visa, Mastercard, RuPay",
                        icon: "💳",
                      },
                      {
                        id: "netbanking",
                        label: "Net Banking",
                        desc: "All major banks",
                        icon: "🏦",
                      },
                    ].map((method) => (
                      <div
                        key={method.id}
                        onClick={() =>
                          setFormData({ ...formData, paymentMethod: method.id })
                        }
                        className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                          formData.paymentMethod === method.id
                            ? "border-green-600 bg-green-50"
                            : "border-gray-200 hover:border-green-300"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-3xl">{method.icon}</div>
                          <div className="flex-1">
                            <p className="font-bold text-gray-900">
                              {method.label}
                            </p>
                            <p className="text-sm text-gray-500">
                              {method.desc}
                            </p>
                          </div>
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              formData.paymentMethod === method.id
                                ? "border-green-600 bg-green-600"
                                : "border-gray-300"
                            }`}
                          >
                            {formData.paymentMethod === method.id && (
                              <CheckCircle size={16} className="text-white" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Card Details (if card selected) */}
                  {formData.paymentMethod === "card" && (
                    <div className="space-y-6 mb-8 p-6 bg-gray-50 rounded-xl">
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          placeholder="Name on card"
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-700 font-semibold mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            maxLength={3}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all duration-300"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      Review Order
                      <ArrowRight size={20} />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Order Review */}
              {step === 3 && (
                <div className="bg-white rounded-3xl p-8 shadow-lg">
                  <div className="flex items-center gap-3 mb-6">
                    <Package className="text-green-600" size={28} />
                    <h2 className="text-2xl font-bold text-gray-900">
                      Review Your Order
                    </h2>
                  </div>

                  {/* Delivery Details Summary */}
                  <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <MapPin size={20} className="text-green-600" />
                      Delivery Address
                    </h3>
                    <div className="space-y-2 text-gray-700">
                      <p className="font-semibold">
                        {formData.fullName || "Name not provided"}
                      </p>
                      <p>{formData.phone || "Phone not provided"}</p>
                      <p>{formData.address || "Address not provided"}</p>
                      <p>
                        {formData.landmark && `Near ${formData.landmark}, `}
                        {formData.city}, {formData.pincode || "Pincode"}
                      </p>
                    </div>
                    <button
                      onClick={() => setStep(1)}
                      className="text-green-600 font-semibold mt-3 hover:underline"
                    >
                      Edit Address
                    </button>
                  </div>

                  {/* Payment Method Summary */}
                  <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <CreditCard size={20} className="text-green-600" />
                      Payment Method
                    </h3>
                    <p className="text-gray-700 font-semibold">
                      {formData.paymentMethod === "cod" && "Cash on Delivery"}
                      {formData.paymentMethod === "upi" && "UPI Payment"}
                      {formData.paymentMethod === "card" && "Credit/Debit Card"}
                      {formData.paymentMethod === "netbanking" && "Net Banking"}
                    </p>
                    <button
                      onClick={() => setStep(2)}
                      className="text-green-600 font-semibold mt-3 hover:underline"
                    >
                      Change Payment Method
                    </button>
                  </div>

                  {/* Order Items */}
                  <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-4">
                      Order Items (3)
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: "A2 Desi Cow Milk", qty: 2, price: 144 },
                        { name: "A2 Cow Ghee", qty: 1, price: 405 },
                        { name: "Creamy Dahi", qty: 3, price: 135 },
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex justify-between text-gray-700"
                        >
                          <span>
                            {item.name} × {item.qty}
                          </span>
                          <span className="font-semibold">₹{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Terms & Conditions */}
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" className="mt-1" defaultChecked />
                      <span className="text-sm text-gray-700">
                        I agree to FarmDudh's{" "}
                        <span className="text-green-600 font-semibold">
                          Terms & Conditions
                        </span>{" "}
                        and{" "}
                        <span className="text-green-600 font-semibold">
                          Privacy Policy
                        </span>
                      </span>
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all duration-300"
                    >
                      Back
                    </button>
                    <button
                      onClick={placeOrder}
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                    >
                      <CheckCircle size={20} />
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-3xl p-6 shadow-lg sticky top-24">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Order Summary
                </h3>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Items (3)</span>
                    <span className="font-semibold">₹684</span>
                  </div>

                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span className="font-semibold">-₹76</span>
                  </div>

                  <div className="flex justify-between text-gray-700">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-green-600">FREE</span>
                  </div>

                  <div className="border-t-2 border-gray-200 pt-4">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span className="text-2xl text-green-600">₹608</span>
                    </div>
                    <p className="text-sm text-green-600 text-right mt-1">
                      You save ₹76!
                    </p>
                  </div>
                </div>

                {/* Delivery Time */}
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Clock className="text-green-600" size={24} />
                    <div>
                      <p className="font-bold text-gray-900">Quick Delivery</p>
                      <p className="text-sm text-gray-600">Within 10 minutes</p>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="space-y-3">
                  {[
                    { Icon: Shield, text: "100% Secure Payments" },
                    { Icon: Package, text: "Quality Guaranteed" },
                    { Icon: Truck, text: "Free Delivery" },
                  ].map((badge, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-3 text-gray-600 text-sm"
                    >
                      <badge.Icon size={18} className="text-green-600" />
                      <span>{badge.text}</span>
                    </div>
                  ))}
                </div>

                {/* Help Section */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-600 mb-2">Need help?</p>
                  <button
                    onClick={() => alert("Contact support")}
                    className="text-green-600 font-semibold text-sm hover:underline"
                  >
                    Contact Customer Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CartCheckout;
