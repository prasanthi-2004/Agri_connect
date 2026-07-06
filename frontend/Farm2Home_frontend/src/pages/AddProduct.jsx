import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  console.log("Logged in user:", user);

  const profileId = user?.id;
  const username = user?.username;
  const role = user?.role;

  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
    description: "",
    image: "",
  });

  if (!user || role !== "farmer") {
    navigate("/login");
    return null;
  }

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://127.0.0.1:8000/api/farmer/${profileId}/add-product/`,
        productData
      );

      toast.success(response.data.message || "Product Added Successfully");

      setProductData({
        name: "",
        category: "",
        price: "",
        quantity: "",
        description: "",
        image: "",
      });
    } catch (error) {
      console.log(error);

      if (error.response) {
        toast.error(error.response.data.message || "Failed to add product");
      } else {
        toast.error("Server Error");
      }
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
      <div className="min-h-screen flex justify-center items-center bg-black/60 p-6">
        <form
          onSubmit={handleSubmit}
          className="bg-white/20 backdrop-blur-lg border border-white/30 shadow-2xl rounded-3xl p-10 w-full max-w-lg"
        >
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            🌾 Add Farm Product
          </h1>

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={productData.name}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded-lg outline-none"
            required
          />

          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded-lg outline-none"
            required
          >
            <option value="">Select Category</option>
            <option value="Fruit">Fruit</option>
            <option value="Vegetable">Vegetable</option>
            <option value="Grain">Grain</option>
            <option value="Dairy">Dairy</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded-lg outline-none"
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={productData.quantity}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded-lg outline-none"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={productData.description}
            onChange={handleChange}
            rows="4"
            className="w-full p-3 mb-4 rounded-lg outline-none"
            required
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={productData.image}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded-lg outline-none"
            required
          />

          <input
            type="text"
            value={username}
            disabled
            className="w-full p-3 mb-6 rounded-lg bg-gray-200"
          />

          <button
            type="submit"
            className="w-full bg-green-700 hover:bg-green-800 text-white text-lg font-semibold py-3 rounded-xl"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;