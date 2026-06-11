import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function Products() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // ✅ FIXED: unified user structure
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/products/"
      );
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "all" || product.category === category;

    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    const existingCart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = existingCart.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      existingCart.push({
        ...product,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    toast.success("Product Added To Cart");
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/delete-product/${id}/`
      );

      toast.success("Product Deleted");
      fetchProducts();
    } catch (error) {
      console.log(error);
      toast.error("Failed To Delete");
    }
  };

  const handleEditChange = (e) => {
    setEditProduct({
      ...editProduct,
      [e.target.name]: e.target.value,
    });
  };

  const updateProduct = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/update-product/${editProduct.id}/`,
        editProduct
      );

      toast.success("Product Updated");
      setEditProduct(null);
      fetchProducts();
    } catch (error) {
      console.log(error);
      toast.error("Failed To Update");
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
     

      <div className="bg-black/60 min-h-screen p-10">

        <h1 className="text-5xl text-white font-bold text-center mb-10">
          Fresh Farm Products 
        </h1>

        {/* SEARCH */}
        <div className="flex justify-center gap-4 mb-10">

          <input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-[500px] p-4 rounded-xl outline-none text-lg"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="p-4 rounded-xl outline-none"
          >
            <option value="all">All Categories</option>
            <option value="fruit">Fruits</option>
            <option value="vegetable">Vegetables</option>
            <option value="grain">Grains</option>
            <option value="dairy">Dairy</option>
          </select>

        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-56 w-full object-cover"
              />

              <div className="p-5">

                <h1 className="text-3xl font-bold text-green-700">
                  {product.name}
                </h1>

                <p className="text-2xl font-semibold mt-2">
                  ₹ {product.price}
                </p>

                <p className="mt-3 text-gray-600">
                  {product.description}
                </p>

                <p className="mt-2 text-green-700 font-semibold">
                  Category : {product.category}
                </p>

                <p className="mt-2 font-semibold">
                  Farmer : {product.farmer_name}
                </p>

                {/* CUSTOMER */}
                {role === "customer" && (
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-green-700 hover:bg-green-800 text-white w-full py-3 rounded-xl mt-5"
                  >
                    Add To Cart
                  </button>
                )}

                {/* FARMER */}
                {role === "farmer" && (
                  <div className="flex gap-4 mt-5">

                    <button
                      onClick={() => setEditProduct(product)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white w-full py-3 rounded-xl"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteProduct(product.id)}
                      className="bg-red-600 hover:bg-red-700 text-white w-full py-3 rounded-xl"
                    >
                      Delete
                    </button>

                  </div>
                )}

              </div>
            </div>
          ))}

        </div>

        {/* EDIT MODAL */}
        {editProduct && (
          <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">

            <div className="bg-white p-10 rounded-2xl w-[500px]">

              <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
                Update Product
              </h1>

              <input
                type="text"
                name="name"
                value={editProduct.name}
                onChange={handleEditChange}
                className="w-full border p-3 mb-4 rounded"
              />

              <select
                name="category"
                value={editProduct.category}
                onChange={handleEditChange}
                className="w-full border p-3 mb-4 rounded"
              >
                <option value="fruit">Fruit</option>
                <option value="vegetable">Vegetable</option>
                <option value="grain">Grain</option>
                <option value="dairy">Dairy</option>
              </select>

              <input
                type="number"
                name="price"
                value={editProduct.price}
                onChange={handleEditChange}
                className="w-full border p-3 mb-4 rounded"
              />

              <textarea
                name="description"
                value={editProduct.description}
                onChange={handleEditChange}
                className="w-full border p-3 mb-4 rounded"
              />

              <input
                type="text"
                name="image"
                value={editProduct.image}
                onChange={handleEditChange}
                className="w-full border p-3 mb-4 rounded"
              />

              <input
                type="text"
                name="farmer_name"
                value={editProduct.farmer_name}
                onChange={handleEditChange}
                className="w-full border p-3 mb-6 rounded"
              />

              <div className="flex gap-4">

                <button
                  onClick={updateProduct}
                  className="bg-green-700 text-white w-full py-3 rounded-xl"
                >
                  Update
                </button>

                <button
                  onClick={() => setEditProduct(null)}
                  className="bg-gray-500 text-white w-full py-3 rounded-xl"
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default Products;