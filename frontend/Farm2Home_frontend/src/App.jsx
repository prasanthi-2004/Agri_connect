import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import FarmerDashboard from "./pages/FarmerDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import EditProduct from "./pages/EditProduct";
import Orders from "./pages/Orders";
import Farmers from "./pages/Farmers";
import FarmerProfile from "./pages/FarmerProfile";
import FarmerProducts from "./pages/FarmerProducts";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/products" element={<Products />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/payment" element={<Payment />} />

        <Route path="/profile" element={<Profile />} />

        <Route path="/farmer-dashboard" element={<FarmerDashboard />} />

        {/* Customer */}
        <Route path="/farmers" element={<Farmers />} />

        {/* Farmer Details */}
        <Route path="/farmer/:id" element={<FarmerProfile />} />

        {/* Farmer Products */}
        <Route
          path="/farmer/:id/products"
          element={<FarmerProducts />}
        />

        <Route path="*" element={<Home />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;