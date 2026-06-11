import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function FarmerDashboard() {

  const [products, setProducts] = useState([]);

  const username =
    localStorage.getItem("username");

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    try {

      const response = await axios.get(

        "http://127.0.0.1:8000/api/products/"
      );

      const farmerProducts =
        response.data.filter(

          (product) =>

            product.farmer_name === username
        );

      setProducts(farmerProducts);

    } catch (error) {

      console.log(error);
    }
  };

  const totalProducts = products.length;

  const totalValue = products.reduce(

    (total, item) =>

      total + item.price,

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

      

      <div className="bg-black/60 min-h-screen p-10">

        <h1 className="text-5xl font-bold text-white text-center mb-12">

          Farmer Dashboard 🌾

        </h1>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">

            <h1 className="text-3xl font-bold text-green-700">

              Total Products

            </h1>

            <p className="text-5xl mt-5 font-bold">

              {totalProducts}

            </p>

          </div>

          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">

            <h1 className="text-3xl font-bold text-yellow-600">

              Products Value

            </h1>

            <p className="text-5xl mt-5 font-bold">

              ₹ {totalValue}

            </p>

          </div>

        </div>

        {/* PRODUCTS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {products.map((product) => (

            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden shadow-2xl"
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

                <p className="text-2xl mt-2 font-semibold">

                  ₹ {product.price}

                </p>

                <p className="mt-3 text-gray-600">

                  {product.description}

                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default FarmerDashboard;