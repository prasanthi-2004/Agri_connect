import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Orders() {
  const [orders, setOrders] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/orders/");

      const userOrders = res.data.filter(
        (o) => o.customer_name === username
      );

      setOrders(userOrders);
    } catch (err) {
      toast.error("Failed to load orders");
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);

    return date.toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        My Orders
      </h1>

      <div className="grid gap-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="bg-white p-6 rounded-xl shadow"
          >
            <h2 className="text-xl font-bold text-green-700">
              {order.product_name}
            </h2>

            <p>Quantity: {order.quantity}</p>
            <p>Total Price: ₹{order.total_price}</p>
            <p>Address: {order.address}</p>

            {/* ✅ FIXED DATE TIME */}
            <p className="text-sm text-gray-500 mt-2">
              Ordered At: {formatDate(order.ordered_at)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;