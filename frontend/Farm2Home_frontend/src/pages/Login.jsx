import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        {
          username: loginData.username.trim(),
          password: loginData.password.trim(),
        }
      );

      console.log("Login response:", response.data);

      const data = response.data;

      // ✅ LOGIN SUCCESS CHECK
      if (data.message === "Login Successful") {

        // 🔥 IMPORTANT FIX: ensure correct ID mapping
        const userObj = {
          user_id: data.user_id,        // Django auth user id
          id: data.profile_id,          // ⭐ FARMER PROFILE ID (IMPORTANT FIX)

          username: data.username,
          email: data.email,
          role: data.role,

          phone: data.phone || "",
          village: data.village || "",
          city: data.city || "",
          state: data.state || "",
          pincode: data.pincode || "",
          address: data.address || "",
          experience: data.experience || "",
          photo: data.photo || "",
          bio: data.bio || "",
        };

        // ✅ STORE USER
        localStorage.setItem("user", JSON.stringify(userObj));

        toast.success("Login Successful");

        // ✅ ROUTING FIX
        if (data.role === "farmer") {
          navigate("/farmer-dashboard");
        } else {
          navigate("/products");
        }

      } else {
        toast.error(data.message || "Login Failed");
      }

    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
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
      <div className="flex justify-center items-center h-[90vh]">

        <form
          onSubmit={handleSubmit}
          className="bg-white/20 backdrop-blur-lg p-10 rounded-2xl shadow-2xl w-96 border border-white/30"
        >

          <h1 className="text-4xl text-white font-bold text-center mb-6">
            Login
          </h1>

          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded outline-none"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded outline-none"
            required
          />

          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white w-full p-3 rounded text-lg"
          >
            Login
          </button>

          <p className="text-white text-center mt-5">
            If you are not registered please
            <span
              onClick={() => navigate("/register")}
              className="text-yellow-300 cursor-pointer ml-2 font-semibold"
            >
              Register
            </span>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Login;