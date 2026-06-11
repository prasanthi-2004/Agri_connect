import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Checkout() {
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [cartItems, setCartItems] = useState([]);

  // ✅ unified user system
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.username;

  useEffect(() => {
    // 🔐 LOGIN CHECK
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    setCartItems(savedCart);
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  const placeOrder = async () => {
    if (!address) {
      toast.error("Please enter delivery address");
      return;
    }

    try {
      for (let item of cartItems) {
        await axios.post(
          "http://127.0.0.1:8000/api/place-order/",
          {
            customer_name: username,
            product_name: item.name,
            quantity: item.quantity,
            total_price: item.price * item.quantity,
            address: address,
          }
        );
      }

      toast.success("Order Placed Successfully");

      localStorage.removeItem("cart");
      navigate("/products");

    } catch (error) {
      console.log(error);
      toast.error("Failed To Place Order");
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1600&auto=format&fit=crop')",
      }}
    >
      {/* ❌ Navbar removed (handled in App.jsx) */}

      <div className="bg-black/60 min-h-screen flex justify-center items-center p-10">

        <div className="bg-white p-10 rounded-2xl shadow-2xl w-[550px]">

          <h1 className="text-4xl font-bold text-center text-green-700 mb-8">
            Checkout
          </h1>

          {/* PRODUCTS */}
          <div className="space-y-5 max-h-64 overflow-y-auto">

            {cartItems.map((item, index) => (
              <div key={index} className="border-b pb-4">

                <h2 className="text-2xl font-bold">
                  {item.name}
                </h2>

                <p className="mt-2">
                  Quantity : {item.quantity}
                </p>

                <p>
                  Price : ₹ {item.price}
                </p>

                <p className="font-semibold text-green-700">
                  Total : ₹ {item.price * item.quantity}
                </p>

              </div>
            ))}

          </div>

          {/* ADDRESS */}
          <textarea
            placeholder="Enter Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border p-4 rounded-xl mt-8 outline-none"
            rows="4"
          />

          {/* GRAND TOTAL */}
          <h1 className="text-3xl font-bold text-center mt-8 text-yellow-600">
            Grand Total : ₹ {totalPrice}
          </h1>

          {/* BUTTON */}
          <button
            onClick={placeOrder}
            className="bg-green-700 hover:bg-green-800 text-white w-full py-4 rounded-xl text-xl mt-8"
          >
            Place Order
          </button>

        </div>

      </div>
    </div>
  );
}

export default Checkout;