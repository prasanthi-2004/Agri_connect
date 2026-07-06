import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Farmers() {
  const [farmers, setFarmers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchFarmers();
  }, []);

  const fetchFarmers = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/profiles/"
      );

      const farmerList = response.data.filter(
        (user) => user.role === "farmer"
      );

      setFarmers(farmerList);
    } catch (error) {
      console.log("Error fetching farmers:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-6">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-green-700">
          👨‍🌾 Our Farmers
        </h1>
        <p className="text-gray-600 mt-3 text-lg">
          Meet the farmers who bring fresh products directly to your home
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {farmers.map((farmer) => (
          <div
            key={farmer.id}
            className="bg-white rounded-3xl shadow-lg p-6 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
          >
            <img
              src={
                farmer.photo ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt={farmer.username}
              className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-green-600"
            />

            <h2 className="text-2xl font-bold text-green-700 mt-4 capitalize">
              {farmer.username}
            </h2>

            <div className="mt-4 space-y-2 text-gray-700 text-left">
              <p>
                📍 <strong>{farmer.village || "Not Updated"}</strong>
              </p>

              <p>
                📞 <strong>{farmer.phone || "Not Updated"}</strong>
              </p>

              <p>
                🏛️ <strong>{farmer.state?.trim() || "Not Updated"}</strong>
              </p>

              <p>
                🌱 <strong>{farmer.experience || 0} Years Experience</strong>
              </p>
            </div>

            <p className="mt-4 text-sm text-gray-600 italic min-h-[50px]">
              {farmer.bio || "Dedicated farmer on AgriConnect"}
            </p>

            <button
              onClick={() =>
              navigate(`/farmer/${farmer.id}/products`)
              }
              className="mt-5 w-full bg-green-700 hover:bg-green-800 text-white py-3 rounded-xl font-semibold transition"
            >
              View Products
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Farmers;