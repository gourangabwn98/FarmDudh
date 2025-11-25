// src/pages/CartCheckout.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
// import { useCart } from "../context/CartContext"; // Adjust path if needed
import { useAuth } from "../components/AuthContext";
import { toast } from "react-toastify";
import { useCart } from "../components/CartContext";
import VoiceShopping from "../components/VoiceShopping";
// import VoiceShopping from "../components/VoiceShopping"; // Adjust path

function CartCheckout() {
  const navigate = useNavigate();
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartSubtotal,
    getTotalSavings,
    placeOrder,
  } = useCart();
  const { isLoggedIn, user } = useAuth();

  const [showCheckout, setShowCheckout] = useState(false);
  const [step, setStep] = useState(isLoggedIn ? 2 : 1);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    phone: user?.mobile || "",
    email: user?.email || "",
    address: user?.address || "",
    landmark: user?.landmark || "",
    pincode: user?.pincode || "",
    city: "Purba Burdwan",
    paymentMethod: "cod",
  });

  useEffect(() => {
    if (isLoggedIn && user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user.name || "",
        phone: user.mobile || "",
        email: user.email || "",
        address: user.address || "",
        landmark: user.landmark || "",
        pincode: user.pincode || "",
      }));
      if (window.location.search.includes("redirect=cart")) {
        setShowCheckout(true);
        setStep(2);
      }
    }
  }, [isLoggedIn, user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const applyCouponFunc = () => {
    const validCoupons = {
      FIRST10: { discount: 10, type: "percentage", label: "10% OFF" },
      SAVE50: { discount: 50, type: "flat", label: "₹50 OFF" },
      WELCOME: { discount: 15, type: "percentage", label: "15% OFF" },
    };
    const coupon = validCoupons[couponCode.toUpperCase()];
    if (coupon) {
      setAppliedCoupon(coupon);
      toast.success("Coupon applied!");
    } else {
      toast.error("Invalid coupon code");
    }
  };

  const placeOrderHandler = async () => {
    const fullAddress = `${formData.address}${
      formData.landmark ? ", " + formData.landmark : ""
    }, ${formData.city}`;

    const result = await placeOrder(fullAddress, formData.pincode);

    if (result.redirect) {
      navigate(result.redirect);
    } else if (result.success) {
      setOrderPlaced(true);
      // Optional: refresh cart one last time
      // await refreshCart();
    }
  };

  const handleProceedToCheckout = () => {
    if (isLoggedIn) {
      setShowCheckout(true);
      setStep(2);
    } else {
      navigate("/login?redirect=cart");
    }
  };

  const subtotal = getCartSubtotal();
  const savings = getTotalSavings();
  let couponDiscount = 0;
  if (appliedCoupon) {
    couponDiscount =
      appliedCoupon.type === "percentage"
        ? (subtotal * appliedCoupon.discount) / 100
        : appliedCoupon.discount;
  }
  const deliveryFee = subtotal > 500 ? 0 : 20;
  const total = subtotal - savings - couponDiscount + deliveryFee;
  const orderNumber = `FD${Date.now().toString().slice(-8)}`;

  // Order Success Screen
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
              Thank you for choosing Malati Dairy!
            </p>
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6 mb-8">
              <p className="text-sm text-gray-600 mb-2">Order Number</p>
              <p className="text-3xl font-bold text-green-600 mb-4">
                #{orderNumber}
              </p>
              <div className="flex items-center justify-center gap-2 text-gray-700">
                <Clock size={20} className="text-green-600" />
                <span>Estimated delivery: 30 minutes</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => navigate("/orders")}
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-xl font-bold hover:scale-105 transition-all duration-300"
              >
                View Orders
              </button>
              <button
                onClick={() => navigate("/products")}
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

  // Checkout Flow
  if (showCheckout) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
        <section className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 py-12">
          <div className="container mx-auto px-4">
            <button
              onClick={() => setShowCheckout(false)}
              className="text-white flex items-center gap-2 mb-4 hover:underline"
            >
              ← Back to Cart
            </button>
            <h1 className="text-4xl font-extrabold text-white mb-4">
              Checkout
            </h1>
            <div className="flex items-center gap-4 max-w-md">
              {[
                { num: 1, label: "Delivery" },
                { num: 2, label: "Payment" },
                { num: 3, label: "Confirm" },
              ].map((item) => (
                <React.Fragment key={item.num}>
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      step >= item.num
                        ? "bg-white text-green-600"
                        : "bg-white/20 text-white"
                    }`}
                  >
                    {item.num}
                  </div>
                  <span className="text-white text-sm font-semibold">
                    {item.label}
                  </span>
                  {item.num < 3 && <div className="w-12 h-1 bg-white/30" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {/* Step 1: Delivery */}
                {step === 1 && (
                  <div className="bg-white rounded-3xl p-8 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <MapPin className="text-green-600" size={28} />
                      <h2 className="text-2xl font-bold text-gray-900">
                        Delivery Details
                      </h2>
                    </div>
                    <div className="space-y-6">
                      {/* All your input fields here - unchanged */}
                      <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                          Full Name *
                        </label>
                        <div className="relative">
                          <User
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
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
                      {/* ... repeat for phone, email, address, landmark, pincode, city ... */}
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

                {/* Step 2: Payment */}
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
                            setFormData({
                              ...formData,
                              paymentMethod: method.id,
                            })
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
                            {formData.paymentMethod === method.id && (
                              <CheckCircle
                                className="text-green-600"
                                size={24}
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-4">
                      <button
                        onClick={() => setStep(isLoggedIn ? 3 : 1)}
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

                {/* Step 3: Review & Place Order */}
                {step === 3 && (
                  <div className="bg-white rounded-3xl p-8 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <Package className="text-green-600" size={28} />
                      <h2 className="text-2xl font-bold text-gray-900">
                        Review Your Order
                      </h2>
                    </div>
                    {/* Summary sections - unchanged */}
                    <div className="mb-8 p-6 bg-gray-50 rounded-xl">
                      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <MapPin size={20} className="text-green-600" />
                        Delivery Address
                      </h3>
                      <div className="space-y-2 text-gray-700">
                        <p className="font-semibold">{formData.fullName}</p>
                        <p>{formData.phone}</p>
                        <p>{formData.address}</p>
                        <p>
                          {formData.landmark && `Near ${formData.landmark}, `}
                          {formData.city}, {formData.pincode}
                        </p>
                      </div>
                    </div>
                    {/* Payment & Items summary - unchanged */}
                    <div className="flex gap-4 mt-8">
                      <button
                        onClick={() => setStep(2)}
                        className="flex-1 bg-gray-100 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-200 transition-all duration-300"
                      >
                        Back
                      </button>
                      <button
                        onClick={placeOrderHandler}
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
                      <span>Subtotal ({cartItems.length} items)</span>
                      <span className="font-semibold">
                        ₹{subtotal.toFixed(0)}
                      </span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Product Savings</span>
                        <span className="font-semibold">
                          -₹{savings.toFixed(0)}
                        </span>
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
                        className={deliveryFee === 0 ? "text-green-600" : ""}
                      >
                        {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                      </span>
                    </div>
                    <div className="border-t-2 border-gray-200 pt-4">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span className="text-2xl text-green-600">
                          ₹{total.toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Cart View
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50">
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
                  <button
                    onClick={() => navigate("/products")}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-8 rounded-full font-bold hover:scale-105 transition-all duration-300"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="bg-white rounded-2xl p-6 shadow-lg"
                      >
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="relative w-32 h-32 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl flex items-center justify-center">
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
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900">
                                  {item.name}
                                </h3>
                                <p className="text-sm text-gray-500">
                                  Per {item.unit}
                                </p>
                              </div>
                              <button
                                onClick={() => removeFromCart(item._id)}
                                className="text-red-500 hover:text-red-700 p-2"
                              >
                                <Trash2 size={20} />
                              </button>
                            </div>
                            <div className="flex items-baseline gap-2 mb-4">
                              <span className="text-2xl font-extrabold text-green-600">
                                ₹
                                {(
                                  item.price *
                                  (1 - item.discount / 100)
                                ).toFixed(0)}
                              </span>
                              {item.discount > 0 && (
                                <span className="text-sm text-gray-400 line-through">
                                  ₹{item.price}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3 bg-gray-100 rounded-full p-1">
                                <button
                                  onClick={() => updateQuantity(item._id, -1)}
                                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white"
                                >
                                  <Minus size={16} />
                                </button>
                                <span className="font-bold w-8 text-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item._id, 1)}
                                  className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-green-600 hover:text-white"
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-500">
                                  Subtotal
                                </p>
                                <p className="text-xl font-bold text-gray-900">
                                  ₹
                                  {(
                                    item.price *
                                    (1 - item.discount / 100) *
                                    item.quantity
                                  ).toFixed(0)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Voice-Activated Shopping */}
                  {cartItems.length > 0 && (
                    <VoiceShopping
                      addToCart={async (item) => {
                        // Match your CartContext add logic
                        const product = {
                          _id: Date.now().toString(),
                          ...item,
                        };
                        // Call your CartContext add function
                        // Example: addToCart(product);
                        // Replace with your actual add function
                        toast.success(
                          `${item.quantity}${item.unit} ${item.name} added!`
                        );
                        // Force re-render
                        window.location.reload();
                      }}
                      removeFromCart={async (name) => {
                        const item = cartItems.find((i) => i.name === name);
                        if (item) {
                          removeFromCart(item._id);
                          toast.success(`${name} removed`);
                        }
                      }}
                    />
                  )}

                  {/* Coupon Section */}
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
                        onClick={applyCouponFunc}
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
                        >
                          <X size={20} className="text-red-500" />
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="lg:col-span-1">
                <div className="bg-white rounded-3xl p-6 shadow-lg sticky top-24">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Order Summary
                  </h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal</span>
                      <span className="font-semibold">
                        ₹{subtotal.toFixed(0)}
                      </span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Product Savings</span>
                        <span className="font-semibold">
                          -₹{savings.toFixed(0)}
                        </span>
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
                        className={deliveryFee === 0 ? "text-green-600" : ""}
                      >
                        {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                      </span>
                    </div>
                    <div className="border-t-2 border-gray-200 pt-4">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span className="text-2xl text-green-600">
                          ₹{total.toFixed(0)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                  >
                    Proceed to Checkout
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default CartCheckout;
