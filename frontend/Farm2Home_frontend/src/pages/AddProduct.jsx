import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const navigate = useNavigate();

  // ✅ Get user from storage
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;
  const username = user?.username;

  const [productData, setProductData] = useState({
    name: "",
    category: "",
    price: "",
    description: "",
    image: "",
    farmer_name: "",
  });

  // ✅ AUTO SET FARMER NAME
  useEffect(() => {
    if (username) {
      setProductData((prev) => ({
        ...prev,
        farmer_name: username,
      }));
    }
  }, [username]);

  // ❌ BLOCK NON-FARMERS
  useEffect(() => {
    if (role && role !== "farmer") {
      toast.error("Only farmers can add products");
      navigate("/products");
    }

    if (!role) {
      toast.error("Please login first");
      navigate("/login");
    }
  }, [role, navigate]);

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
        "http://127.0.0.1:8000/api/add-product/",
        productData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(
        response.data.message || "Product Added Successfully"
      );

      // reset form (keep farmer name)
      setProductData({
        name: "",
        category: "",
        price: "",
        description: "",
        image: "",
        farmer_name: username,
      });

    } catch (error) {
      console.log(error);

      if (error.response?.data) {
        toast.error(JSON.stringify(error.response.data));
      } else {
        toast.error("Failed To Add Product");
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
     

      <div className="flex justify-center items-center min-h-screen bg-black/50">

        <form
          onSubmit={handleSubmit}
          className="bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-[500px] border border-white/30"
        >
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            Add Farm Product
          </h1>

          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={productData.name}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded outline-none"
            required
          />

          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded outline-none"
            required
          >
            <option value="">Select Category</option>
            <option value="fruit">Fruit</option>
            <option value="vegetable">Vegetable</option>
            <option value="grain">Grain</option>
            <option value="dairy">Dairy</option>
          </select>

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded outline-none"
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={productData.description}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded outline-none"
            required
          />

          <input
            type="url"
            name="image"
            placeholder="Image URL"
            value={productData.image}
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded outline-none"
            required
          />

          {/* ❌ removed manual farmer input */}

          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white w-full p-3 rounded text-lg transition duration-300"
          >
            Add Product
          </button>
        </form>

      </div>
    </div>
  );
}

export default AddProduct;