import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Products() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  // ================= USER =================
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const role = user?.role;
  const farmerId = user?.id; // profile id

  useEffect(() => {
    fetchProducts();
  }, []);

  // ================= FETCH =================
  const fetchProducts = async () => {
    try {
      let url = "http://127.0.0.1:8000/api/products/";

      if (role === "farmer") {
        if (!farmerId) {
          toast.error("Farmer ID missing. Please login again");
          return;
        }
        url = `http://127.0.0.1:8000/api/farmer/${farmerId}/products/`;
      }

      const res = await axios.get(url);
      setProducts(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load products");
    }
  };

  // ================= FILTER =================
  const filteredProducts = products.filter((p) => {
    return (
      (search === "" ||
        (p.name || "").toLowerCase().includes(search.toLowerCase())) &&
      (category === "all" ||
        (p.category || "").toLowerCase() === category.toLowerCase())
    );
  });

  // ================= DELETE =================
  const deleteProduct = async (id) => {
    try {
      if (!window.confirm("Delete this product?")) return;

      await axios.delete(
        `http://127.0.0.1:8000/api/delete-product/${id}/`
      );

      toast.success("Deleted successfully");
      fetchProducts();
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error("Delete failed");
    }
  };

  // ================= EDIT CHANGE =================
  const handleEditChange = (e) => {
    setEditProduct((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ================= UPDATE =================
  const updateProduct = async () => {
    try {
      if (!editProduct?.id) {
        toast.error("Invalid product selected");
        return;
      }

      const res = await axios.put(
        `http://127.0.0.1:8000/api/update-product/${editProduct.id}/`,
        {
          name: editProduct.name,
          price: editProduct.price,
          quantity: editProduct.quantity,
          description: editProduct.description,
          category: editProduct.category,
          image: editProduct.image,
        }
      );

      console.log("UPDATED:", res.data);

      toast.success("Product updated");
      setEditProduct(null);
      fetchProducts();
    } catch (err) {
      console.log(err.response?.data || err.message);
      toast.error("Update failed");
    }
  };

  // ================= OWNER CHECK (IMPORTANT FIX) =================
  const isOwner = (product) => {
    // backend returns farmer id inside product.farmer OR product.farmer_id
    return (
      role === "farmer" &&
      (product.farmer === farmerId || product.farmer_id === farmerId)
    );
  };

  return (
    <div className="min-h-screen bg-black/90 p-6">

      <h1 className="text-4xl text-center text-green-400 font-bold mb-6">
        Fresh Farm Products
      </h1>

      {/* SEARCH */}
      <div className="flex gap-3 justify-center mb-6">
        <input
          className="p-3 w-72 rounded"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="p-3 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All</option>
          <option value="vegetable">Vegetable</option>
          <option value="fruit">Fruit</option>
          <option value="grain">Grain</option>
        </select>
      </div>

      {/* PRODUCTS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        {filteredProducts.map((p) => (
          <div key={p.id} className="bg-white rounded-lg overflow-hidden">

            <img
              src={p.image || "https://via.placeholder.com/300"}
              className="h-40 w-full object-cover"
              alt={p.name}
            />

            <div className="p-4">

              <h2 className="font-bold text-lg">{p.name}</h2>

              <p className="text-green-600 font-bold">₹ {p.price}</p>

              <p className="text-sm text-gray-500">{p.category}</p>

              <p className="text-sm">Qty: {p.quantity}</p>

              {/* EDIT / DELETE */}
              {isOwner(p) && (
                <div className="flex gap-2 mt-3">

                  <button
                    onClick={() => setEditProduct(p)}
                    className="bg-yellow-500 w-full py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(p.id)}
                    className="bg-red-600 text-white w-full py-1 rounded"
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
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

          <div className="bg-white p-6 rounded w-[400px]">

            <h2 className="text-xl font-bold mb-3">Edit Product</h2>

            <input
              name="name"
              value={editProduct.name || ""}
              onChange={handleEditChange}
              className="border p-2 w-full mb-2"
            />

            <input
              name="price"
              value={editProduct.price || ""}
              onChange={handleEditChange}
              className="border p-2 w-full mb-2"
            />

            <input
              name="quantity"
              value={editProduct.quantity || ""}
              onChange={handleEditChange}
              className="border p-2 w-full mb-2"
            />

            <input
              name="category"
              value={editProduct.category || ""}
              onChange={handleEditChange}
              className="border p-2 w-full mb-2"
            />

            <input
              name="image"
              value={editProduct.image || ""}
              onChange={handleEditChange}
              className="border p-2 w-full mb-2"
            />

            <textarea
              name="description"
              value={editProduct.description || ""}
              onChange={handleEditChange}
              className="border p-2 w-full mb-3"
            />

            <div className="flex gap-2">

              <button
                onClick={updateProduct}
                className="bg-green-600 text-white w-full py-2"
              >
                Update
              </button>

              <button
                onClick={() => setEditProduct(null)}
                className="bg-gray-500 text-white w-full py-2"
              >
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default Products;