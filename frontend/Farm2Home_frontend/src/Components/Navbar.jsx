import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaChevronDown } from "react-icons/fa";
import { useState } from "react";
import logo from "../assets/logo.png";

function Navbar() {
  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState(false);

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const role = user?.role;

  const cart =
    JSON.parse(localStorage.getItem("cart")) || [];

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("cart");

    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className="bg-gradient-to-r from-sky-900 via-blue-800 to-indigo-700 shadow-xl sticky top-0 z-50">
      <div className="w-full px-8 py-3 flex justify-between items-center">

        {/* LOGO */}
        <div
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="AgriConnect"
            className="w-20 h-20 object-contain"
          />

          <div>
            <h1 className="text-3xl font-bold text-white">
               Farm2Home
            </h1>

            
          </div>
        </div>

        {/* MENU */}
        <div className="hidden md:flex items-center gap-8 text-white font-medium">

          <Link
            to="/"
            className="hover:text-yellow-300 transition"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="hover:text-yellow-300 transition"
          >
            Shop
          </Link>

          {role === "customer" && (
            <Link
              to="/farmers"
              className="hover:text-yellow-300 transition"
            >
              Farmers
            </Link>
          )}

          <Link
            to="/about"
            className="hover:text-yellow-300 transition"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="hover:text-yellow-300 transition"
          >
            Contact
          </Link>

          {role === "customer" && (
            <Link
              to="/orders"
              className="hover:text-yellow-300 transition"
            >
              My Orders
            </Link>
          )}
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-5">

          {role === "customer" && (
            <Link
              to="/cart"
              className="relative text-white text-2xl"
            >
              <FaShoppingCart />

              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {cart.length}
                </span>
              )}
            </Link>
          )}

          {!role ? (
            <>
              <Link
                to="/login"
                className="text-white hover:text-yellow-300"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-yellow-400 text-black px-5 py-2 rounded-full font-semibold hover:bg-yellow-300"
              >
                Register
              </Link>
            </>
          ) : (
            <div className="relative">

              {/* PROFILE BUTTON */}
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center gap-3 bg-white px-3 py-2 rounded-full shadow-md"
              >
                <img
                  src={
                    user?.profileImage ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover"
                />

                <span className="font-semibold text-gray-800">
                  {user?.username}
                </span>

                <FaChevronDown
                  size={12}
                  className="text-gray-600"
                />
              </button>

              {/* DROPDOWN */}
              {showMenu && (
                <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl overflow-hidden">

                  <div className="bg-green-50 px-4 py-4 border-b">

                    <div className="flex items-center gap-3">

                      <img
                        src={
                          user?.profileImage ||
                          "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }
                        alt="Profile"
                        className="w-12 h-12 rounded-full object-cover"
                      />

                      <div>
                        <h3 className="font-bold text-gray-800">
                          {user?.username}
                        </h3>

                        <p className="text-sm text-gray-500 capitalize">
                          {user?.role}
                        </p>
                      </div>

                    </div>

                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setShowMenu(false)}
                    className="block px-4 py-3 hover:bg-gray-100"
                  >
                    My Profile
                  </Link>

                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 font-medium"
                  >
                    Logout
                  </button>

                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </nav>
  );
}

export default Navbar;