import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  Clock,
  MapPin,
  CreditCard,
  ShoppingCart,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../components/AuthContext";

function Orders() {
  const { isLoggedIn, orders } = useAuth();
  const navigate = useNavigate();

  // Sort orders by date (recent first)
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  // If not logged in, redirect to login
  if (!isLoggedIn) {
    navigate("/login?redirect=orders");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-50 font-poppins py-12">
      <section className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-700 py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-3 text-white mb-4">
            <Package size={32} />
            <h1 className="text-4xl font-extrabold">Your Orders</h1>
          </div>
          <p className="text-green-100">
            {sortedOrders.length}{" "}
            {sortedOrders.length === 1 ? "order" : "orders"} in your history
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate("/products")}
            className="text-milkvilla-green flex items-center gap-2 mb-6 hover:underline"
          >
            <ArrowLeft size={20} />
            Back to Products
          </button>

          {sortedOrders.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center shadow-lg">
              <ShoppingCart size={64} className="text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No Orders Yet
              </h3>
              <p className="text-gray-500 mb-6">
                Start shopping to see your order history!
              </p>
              <Link
                to="/products"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-8 rounded-full font-bold hover:scale-105 transition-all duration-300"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedOrders.map((order) => (
                <div
                  key={order.orderNumber}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Order #{order.orderNumber}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Placed on{" "}
                        {new Date(order.date).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded-full ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Order Items */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Package size={20} className="text-milkvilla-green" />
                      Items ({order.items.length})
                    </h4>
                    <div className="space-y-2">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-gray-700"
                        >
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span className="font-semibold">
                            ₹
                            {(
                              (item.price -
                                (item.price * item.discount) / 100) *
                              item.quantity
                            ).toFixed(0)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <MapPin size={20} className="text-milkvilla-green" />
                      Delivery Address
                    </h4>
                    <div className="text-gray-700 text-sm">
                      <p className="font-semibold">
                        {order.deliveryAddress.fullName}
                      </p>
                      <p>{order.deliveryAddress.address}</p>
                      <p>
                        {order.deliveryAddress.landmark &&
                          `Near ${order.deliveryAddress.landmark}, `}
                        {order.deliveryAddress.city},{" "}
                        {order.deliveryAddress.pincode}
                      </p>
                      <p>{order.deliveryAddress.phone}</p>
                      {order.deliveryAddress.email && (
                        <p>{order.deliveryAddress.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <CreditCard size={20} className="text-milkvilla-green" />
                      Payment Method
                    </h4>
                    <p className="text-gray-700">
                      {order.paymentMethod === "cod" && "Cash on Delivery"}
                      {order.paymentMethod === "upi" && "UPI Payment"}
                      {order.paymentMethod === "card" && "Credit/Debit Card"}
                      {order.paymentMethod === "netbanking" && "Net Banking"}
                    </p>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center border-t-2 border-gray-200 pt-4">
                    <span className="text-lg font-bold text-gray-900">
                      Total
                    </span>
                    <span className="text-xl font-bold text-milkvilla-green">
                      ₹{order.total.toFixed(0)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Orders;
