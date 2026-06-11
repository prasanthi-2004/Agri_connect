import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  // ✅ GET USER (NEW SYSTEM)
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // 🔐 OPTIONAL SAFETY CHECK
    if (!user) {
      toast.error("Please login first");
      navigate("/login");
      return;
    }

    const savedCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const updatedCart = savedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));

    setCartItems(updatedCart);
  }, []);

  const syncCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity += 1;
    syncCart(updatedCart);
  };

  const decreaseQuantity = (index) => {
    const updatedCart = [...cartItems];

    if (updatedCart[index].quantity > 1) {
      updatedCart[index].quantity -= 1;
    }

    syncCart(updatedCart);
  };

  const removeProduct = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    syncCart(updatedCart);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1600&auto=format&fit=crop')",
      }}
    >
      {/* ❌ Navbar removed (handled in App.jsx) */}

      <div className="bg-black/60 min-h-screen p-10">

        <h1 className="text-4xl text-white font-bold text-center mb-10">
          🛒 Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="flex justify-center items-center h-[50vh]">
            <h1 className="text-white text-3xl font-bold">
              Cart is Empty
            </h1>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition duration-300"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5">

                  <h1 className="text-2xl font-bold text-green-700">
                    {item.name}
                  </h1>

                  <p className="text-xl font-semibold mt-2">
                    ₹ {item.price}
                  </p>

                  <p className="mt-3 text-gray-600">
                    {item.description}
                  </p>

                  <p className="mt-3 font-semibold text-sm">
                    Farmer : {item.farmer_name}
                  </p>

                  {/* QUANTITY */}
                  <div className="flex items-center gap-4 mt-5">

                    <button
                      onClick={() => decreaseQuantity(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      -
                    </button>

                    <span className="text-xl font-bold">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => increaseQuantity(index)}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                    >
                      +
                    </button>

                  </div>

                  <h2 className="text-lg font-bold mt-4 text-yellow-600">
                    Total : ₹ {item.price * item.quantity}
                  </h2>

                  <button
                    onClick={() => removeProduct(index)}
                    className="bg-red-600 hover:bg-red-700 text-white w-full mt-5 py-3 rounded-xl"
                  >
                    Remove Product
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}

        {cartItems.length > 0 && (
          <div className="text-center mt-12">

            <h1 className="text-4xl text-yellow-300 font-bold">
              Grand Total : ₹ {totalPrice}
            </h1>

            <button
              onClick={() => navigate("/checkout")}
              className="bg-green-700 hover:bg-green-800 text-white px-10 py-4 rounded-xl text-xl mt-6"
            >
              Proceed To Checkout
            </button>

          </div>
        )}

      </div>
    </div>
  );
}

export default Cart;