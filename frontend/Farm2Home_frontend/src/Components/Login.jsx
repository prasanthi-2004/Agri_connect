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

      if (response.data.message === "Login Successful") {
        // ✅ STORE FULL USER DATA INCLUDING ID
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: response.data.user_id,   // 🔥 THIS IS REQUIRED
            username: response.data.username,
            role: response.data.role,
          })
        );

        toast.success("Login Successful");

        if (response.data.role === "farmer") {
          navigate("/products");
        } else {
          navigate("/products");
        }
      } else {
        toast.error(response.data.message || "Login Failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Login Failed");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;