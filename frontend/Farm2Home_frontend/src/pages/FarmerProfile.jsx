import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function FarmerProfile() {
  const { id } = useParams();

  const [farmer, setFarmer] = useState(null);
  const [products, setProducts] = useState([]);

  // ---------------- FETCH FARMER ----------------
  const fetchFarmer = async () => {
    try {
      const res = await axios.get(
        `http://127.0.0.1:8000/api/farmer/${id}/`
      );
      setFarmer(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ---------------- FETCH PRODUCTS ----------------
  const fetchProducts = async () => {
  try {
    const res = await axios.get(
      `http://127.0.0.1:8000/api/farmer/${id}/products/`
    );

    setProducts(res.data);
  } catch (err) {
    console.log(err);
  }
};

  // ---------------- LOAD DATA ----------------
  useEffect(() => {
    fetchFarmer();
  }, [id]);

  useEffect(() => {
    if (farmer) {
      fetchProducts(farmer);
    }
  }, [farmer]);

  // ---------------- ADD TO CART ----------------
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    toast.success("Added To Cart");
  };

  // ---------------- LOADING ----------------
  if (!farmer) {
    return (
      <h1 className="text-center mt-20 text-3xl">
        Loading...
      </h1>
    );
  }

  return (
    <div className="min-h-screen bg-green-50">

      {/* FARMER PROFILE */}
      <div className="bg-white shadow-xl p-8">
        <div className="flex flex-col items-center">

          <img
            src={
              farmer.photo ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt={farmer.username}
            className="w-40 h-40 rounded-full object-cover border-4 border-green-700"
          />

          <h1 className="text-4xl font-bold mt-4">
            {farmer.username}
          </h1>

          <p className="text-xl mt-2">
            ⭐ {farmer.rating}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <p><b>Phone:</b> {farmer.phone}</p>
          <p><b>Village:</b> {farmer.village}</p>
          <p><b>District:</b> {farmer.district}</p>
          <p><b>State:</b> {farmer.state}</p>
          <p><b>Experience:</b> {farmer.experience}</p>
          <p><b>Specialization:</b> {farmer.specialization}</p>
        </div>

        <div className="mt-6">
          <h3 className="font-bold text-xl">About Farmer</h3>
          <p>{farmer.about}</p>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="p-10">
        <h1 className="text-4xl font-bold text-center mb-10">
          Products From This Farm
        </h1>

        <div className="grid md:grid-cols-4 gap-8">

          {products.length === 0 ? (
            <p className="text-center col-span-4 text-gray-500">
              No products found for this farmer
            </p>
          ) : (
            products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl overflow-hidden shadow-xl"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-56 w-full object-cover"
                />

                <div className="p-5">
                  <h2 className="text-2xl font-bold">
                    {product.name}
                  </h2>

                  <p className="text-xl font-semibold mt-2">
                    ₹ {product.price}
                  </p>

                  <p className="mt-2">
                    {product.description}
                  </p>

                  <button
                    onClick={() => addToCart(product)}
                    className="bg-green-700 hover:bg-green-800 text-white w-full py-3 rounded-xl mt-5"
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            ))
          )}

        </div>
      </div>

    </div>
  );
}

export default FarmerProfile;