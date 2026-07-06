import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        formData
      );

      if (response.data.message === "Registration Successful") {
        toast.success("Registration Successful");
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center py-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1600&auto=format&fit=crop')",
      }}
    >
      <div className="flex justify-center items-center">

        <form
          onSubmit={handleSubmit}
          className="bg-white/20 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-xl border border-white/30"
        >
          <h1 className="text-4xl text-white font-bold text-center mb-6">
            Register
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
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded outline-none"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Enter Mobile Number"
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded outline-none"
            required
          />

          <textarea
            name="address"
            placeholder="Enter Address"
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded outline-none"
            rows="3"
            required
          />

          <div className="grid grid-cols-2 gap-4 mb-4">

            <input
              type="text"
              name="city"
              placeholder="City"
              onChange={handleChange}
              className="p-3 rounded outline-none"
              required
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              onChange={handleChange}
              className="p-3 rounded outline-none"
              required
            />

          </div>

          <input
            type="text"
            name="pincode"
            placeholder="Pincode"
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

          <select
            name="role"
            onChange={handleChange}
            className="w-full p-3 mb-4 rounded outline-none"
            required
          >
            <option value="">Select Role</option>
            <option value="farmer">Farmer</option>
            <option value="customer">Customer</option>
          </select>

          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white w-full p-3 rounded text-lg font-semibold"
          >
            Register
          </button>

          <p className="text-white text-center mt-5">
            Already Registered?
            <span
              onClick={() => navigate("/login")}
              className="text-yellow-300 cursor-pointer ml-2 font-semibold"
            >
              Login
            </span>
          </p>
        </form>

      </div>
    </div>
  );
}

export default Register;
