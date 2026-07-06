import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function FarmerProducts() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  useEffect(() => {
    fetchProducts();
  }, [id]);

  const fetchProducts = async () => {
    try {
      console.log("Farmer ID:", id);

      const response = await axios.get(
        `http://127.0.0.1:8000/api/farmer/${id}/products/`
      );

      console.log("Products:", response.data);

      setProducts(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Unable to load farmer products");
    }
  };

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success("Added To Cart");
  };

  const deleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/delete-product/${productId}/`
      );

      toast.success("Product Deleted Successfully");

      fetchProducts();
    } catch (error) {
      console.log(error);
      toast.error("Failed To Delete Product");
    }
  };

  return (
    <div className="min-h-screen bg-green-50 p-10">
      <h1 className="text-5xl font-bold text-center text-green-700 mb-10">
        Farmer Products 🌾
      </h1>

      <div className="grid md:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              <img
                src={
                  product.image ||
                  "https://via.placeholder.com/400x250?text=No+Image"
                }
                alt={product.name}
                className="h-56 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="text-2xl font-bold text-green-700">
                  {product.name}
                </h2>

                <p className="mt-2 text-xl font-semibold text-green-800">
                  ₹ {product.price}
                </p>

                <p className="mt-2 text-gray-600">
                  {product.description}
                </p>

                <p className="mt-2">
                  <strong>Category:</strong> {product.category}
                </p>

                <p className="mt-2">
                  <strong>Available:</strong> {product.quantity}
                </p>

                {role === "customer" ? (
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full mt-5 bg-green-700 hover:bg-green-800 text-white py-3 rounded-lg font-semibold"
                  >
                    Add To Cart
                  </button>
                ) : (
                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() =>
                        navigate(`/edit-product/${product.id}`)
                      }
                      className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="w-1/2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-4 text-center text-2xl text-gray-500">
            No Products Available
          </div>
        )}
      </div>
    </div>
  );
}

export default FarmerProducts;