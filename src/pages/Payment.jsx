import React from "react";
import { Link } from "react-router-dom";
import { CreditCard, ArrowLeft } from "lucide-react";
import { useCart } from "../components/CartContext";

function Payment() {
  const { cartItems } = useCart();

  const handlePayment = () => {
    // Placeholder for payment processing (e.g., Razorpay, Stripe)
    alert(
      "Payment processing not implemented. Total: ₹" +
        cartItems
          .reduce((total, item) => total + item.price * item.quantity, 0)
          .toFixed(2)
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white font-poppins py-12">
      <div className="container mx-auto px-4 max-w-md">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-center gap-2 mb-6">
            <CreditCard size={24} className="text-milkvilla-green" />
            <h1 className="text-2xl font-bold text-gray-900">Payment</h1>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Order Summary
            </h2>
            {cartItems.map((item, index) => (
              <div key={index} className="flex justify-between mb-2">
                <span>
                  {item.name} (x{item.quantity})
                </span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-semibold text-milkvilla-green mt-4">
              <span>Total:</span>
              <span>
                ₹
                {cartItems
                  .reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <button
              onClick={handlePayment}
              className="w-full bg-milkvilla-green text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Pay Now
              <CreditCard size={20} />
            </button>
            <Link
              to="/cart"
              className="flex items-center gap-2 text-milkvilla-green hover:underline text-center"
            >
              <ArrowLeft size={16} />
              Back to Cart
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
