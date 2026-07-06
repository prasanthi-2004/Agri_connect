import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Payment() {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleOrder = () => {
    if (
      !address.fullName ||
      !address.phone ||
      !address.address ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      alert("Please fill all delivery details");
      return;
    }

    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    if (paymentMethod === "online" && !transactionId) {
      alert("Please enter Transaction ID");
      return;
    }

    alert("Order Placed Successfully!");

    localStorage.removeItem("cart");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-green-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">

        <h1 className="text-3xl font-bold text-center text-green-700 mb-8">
          Checkout
        </h1>

        {/* Address Section */}
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Delivery Address
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={address.fullName}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="phone"
            placeholder="Mobile Number"
            value={address.phone}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
            value={address.pincode}
            onChange={handleChange}
            className="border p-3 rounded-lg"
          />

          <textarea
            name="address"
            placeholder="House No, Street, Area"
            value={address.address}
            onChange={handleChange}
            className="border p-3 rounded-lg md:col-span-2"
            rows="3"
          />
        </div>

        {/* Payment Section */}
        <h2 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">
          Payment Method
        </h2>

        <div className="space-y-3">

          <label className="flex items-center gap-3 text-lg">
            <input
              type="radio"
              name="payment"
              value="cod"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash On Delivery
          </label>

          <label className="flex items-center gap-3 text-lg">
            <input
              type="radio"
              name="payment"
              value="online"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Pay Online
          </label>

        </div>

        {paymentMethod === "online" && (
          <div className="mt-6 text-center">

            <div className="w-64 h-64 mx-auto bg-gray-200 rounded-lg flex items-center justify-center font-bold">
              QR Code Here
            </div>

            <input
              type="text"
              placeholder="Enter Transaction ID"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              className="w-full border p-3 rounded-lg mt-4"
            />
          </div>
        )}

        <button
          onClick={handleOrder}
          className="w-full mt-8 bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl text-lg font-bold"
        >
          Place Order
        </button>

      </div>
    </div>
  );
}

export default Payment;