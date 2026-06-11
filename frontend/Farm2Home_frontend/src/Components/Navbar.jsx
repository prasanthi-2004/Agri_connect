import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const role = user?.role;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    navigate("/login");
  };

  return (
    <nav className="bg-gradient-to-r from-green-950 via-green-800 to-green-700 shadow-2xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center">

        {/* Logo */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="AgriConnect Logo"
            className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-xl"
          />

          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-wide">
              AgriConnect
            </h1>

            <p className="text-sm text-green-100 font-medium">
              Fresh From Farms To Your Home
            </p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-10 text-xl font-semibold text-white">
          <Link
            to="/"
            className="hover:text-yellow-300 transition-all duration-300 hover:scale-105"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="hover:text-yellow-300 transition-all duration-300 hover:scale-105"
          >
            Shop
          </Link>

          <Link
            to="/about"
            className="hover:text-yellow-300 transition-all duration-300 hover:scale-105"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="hover:text-yellow-300 transition-all duration-300 hover:scale-105"
          >
            Contact
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">

          {/* Customer Cart */}
          {role === "customer" && (
            <Link
              to="/cart"
              className="relative text-white text-3xl hover:text-yellow-300 transition-all duration-300"
            >
              <FaShoppingCart />

              {cart.length > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
          )}

          {/* Farmer Options */}
          {role === "farmer" && (
            <>
              <Link
                to="/add-product"
                className="bg-yellow-400 text-green-900 px-5 py-3 rounded-full font-bold hover:bg-yellow-300 shadow-lg transition-all duration-300"
              >
                Add Product
              </Link>

              <Link
                to="/farmer-dashboard"
                className="bg-white text-green-900 px-5 py-3 rounded-full font-bold hover:bg-green-100 shadow-lg transition-all duration-300"
              >
                Dashboard
              </Link>
            </>
          )}

          {/* Login/Register */}
          {!role ? (
            <>
              <Link
                to="/login"
                className="flex items-center gap-2 text-white text-lg font-semibold hover:text-yellow-300 transition-all duration-300"
              >
                <FaUser />
                Login
              </Link>

              <Link
                to="/register"
                className="bg-yellow-400 text-green-900 px-5 py-3 rounded-full font-bold hover:bg-yellow-300 shadow-lg transition-all duration-300"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-5 py-3 rounded-full font-bold hover:bg-red-600 shadow-lg transition-all duration-300"
            >
              Logout
            </button>
          )}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;