// src/pages/Orders.jsx
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Package,
  Clock,
  MapPin,
  CreditCard,
  ShoppingCart,
  ArrowLeft,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";

function Orders() {
  const backend_api_base = process.env.REACT_APP_API_BASE;
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // FETCH ORDERS FROM API
  useEffect(() => {
    if (!token) {
      navigate("/login?redirect=orders");
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch(`${backend_api_base}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to load orders");
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token, navigate]);

  // Sort recent first
  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.orderedAt) - new Date(a.orderedAt)
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your orders...</p>
        </div>
      </div>
    );
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
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 px-8 rounded-full font-bold hover:scale-105 transition-all duration-300 inline-block"
              >
                Browse Products
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {sortedOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Order #{order._id.toString().slice(-6)}
                      </h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock size={16} />
                        {new Date(order.orderedAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded-full capitalize ${
                        order.status === "delivered"
                          ? "bg-green-100 text-green-600"
                          : order.status === "pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Items */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <Package size={20} className="text-milkvilla-green" />
                      Items ({order.items.length})
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {order.items.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg"
                        >
                          <img
                            src={item.img}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-sm">{item.name}</p>
                            <p className="text-xs text-gray-500">
                              {item.quantity} × ₹{item.price}/{item.unit}
                            </p>
                          </div>
                          <p className="font-bold text-green-600">
                            ₹{(item.price * item.quantity).toFixed(0)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <MapPin size={20} className="text-milkvilla-green" />
                      Delivery Address
                    </h4>
                    <p className="text-gray-700 text-sm">
                      {order.deliveryAddress || "Default address"}
                      {order.pincode && `, ${order.pincode}`}
                    </p>
                  </div>

                  {/* Total */}
                  <div className="flex justify-between items-center border-t-2 border-dashed border-gray-200 pt-4">
                    <span className="text-lg font-bold text-gray-900">
                      Total Paid
                    </span>
                    <span className="text-2xl font-bold text-milkvilla-green">
                      ₹{order.totalAmount.toFixed(0)}
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
