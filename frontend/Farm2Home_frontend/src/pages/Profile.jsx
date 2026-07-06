import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSave, FaCamera } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

function Profile() {
  const navigate = useNavigate();

  const storedUser =
    JSON.parse(localStorage.getItem("user")) || {};

  const [isEditing, setIsEditing] = useState(false);

  const [user, setUser] = useState({
    id: storedUser.profile_id || null,
    username: storedUser.username || "",
    email: storedUser.email || "",
    phone: storedUser.phone || "",
    village: storedUser.village || "",
    city: storedUser.city || "",
    state: storedUser.state || "",
    pincode: storedUser.pincode || "",
    address: storedUser.address || "",
    bio: storedUser.bio || "",
    role: storedUser.role || "",

    profileImage:
      storedUser.photo ||
      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setUser((prev) => ({
        ...prev,
        profileImage: reader.result,
      }));
    };

    reader.readAsDataURL(file);
  };

  const saveProfile = async () => {
    try {
      if (!user.id) {
        toast.error(
          "Profile ID missing. Please login again."
        );
        return;
      }

      const payload = {
        username: user.username,
        email: user.email,
        phone: user.phone,
        village: user.village,
        city: user.city,
        state: user.state,
        pincode: user.pincode,
        address: user.address,
        bio: user.bio,
        photo: user.profileImage,
      };

      const response = await axios.put(
        `http://127.0.0.1:8000/api/profile/${user.id}/`,
        payload
      );

      setUser((prev) => ({
        ...prev,
        profileImage: response.data.photo,
      }));

      localStorage.setItem(
        "user",
        JSON.stringify({
          profile_id: response.data.id,
          user_id: response.data.user_id,
          username: response.data.username,
          email: response.data.email,
          role: response.data.role,
          phone: response.data.phone,
          village: response.data.village,
          city: response.data.city,
          state: response.data.state,
          pincode: response.data.pincode,
          address: response.data.address,
          experience: response.data.experience,
          bio: response.data.bio,
          photo: response.data.photo,
        })
      );

      toast.success(
        "Profile Updated Successfully"
      );

      setIsEditing(false);

    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed To Update Profile");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">

      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">

        <div className="h-56 bg-gradient-to-r from-green-950 via-green-800 to-green-600"></div>

        <div className="relative px-8 pb-10">

          <div className="flex flex-col md:flex-row md:justify-between md:items-end">

            <div className="-mt-20">

              <div className="relative w-40 h-40">

                <img
                  src={
                    user.profileImage ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="Profile"
                  className="w-40 h-40 rounded-full border-4 border-white object-cover shadow-2xl"
                />

                {isEditing && (
                  <label className="absolute bottom-2 right-2 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full cursor-pointer shadow-lg">

                    <FaCamera />

                    <input
                      type="file"
                      hidden
                      accept="image/*"
                      onChange={handleImageChange}
                    />

                  </label>
                )}

              </div>

              <h1 className="text-4xl font-bold mt-4">
                {user.username}
              </h1>

              <p className="text-gray-500 capitalize text-lg">
                {user.role}
              </p>

            </div>
                        <div className="mt-6 md:mt-0 flex gap-3">

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                >
                  <FaEdit />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={saveProfile}
                    className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
                  >
                    <FaSave />
                    Save Changes
                  </button>

                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl"
                  >
                    Cancel
                  </button>
                </>
              )}

            </div>

          </div>

          {/* ACCOUNT STATS */}

          <div className="grid md:grid-cols-3 gap-4 mt-8">

            <div className="bg-green-50 p-5 rounded-xl text-center">
              <h3 className="text-2xl font-bold text-green-700">
                {user.role === "farmer" ? "Farmer" : "Customer"}
              </h3>

              <p className="text-gray-500">
                Account Type
              </p>
            </div>

            <div className="bg-blue-50 p-5 rounded-xl text-center">
              <h3 className="text-2xl font-bold text-blue-700">
                Active
              </h3>

              <p className="text-gray-500">
                Account Status
              </p>
            </div>

            <div className="bg-yellow-50 p-5 rounded-xl text-center">
              <h3 className="text-2xl font-bold text-yellow-700">
                Verified
              </h3>

              <p className="text-gray-500">
                Profile
              </p>
            </div>

          </div>

          {/* FARMER TOOLS */}

          {user.role === "farmer" && (
            <div className="bg-green-50 p-6 rounded-2xl mt-8">

              <h2 className="text-xl font-bold mb-4">
                Farmer Tools
              </h2>

              <div className="flex flex-wrap gap-4">

                <button
                  onClick={() => navigate("/add-product")}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Add Product
                </button>

                <button
                  onClick={() => navigate("/farmer-dashboard")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Dashboard
                </button>

              </div>

            </div>
          )}

          {/* DETAILS */}

          <div className="grid md:grid-cols-2 gap-6 mt-10">

            <div>
              <label className="font-semibold text-gray-700">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={user.username}
                disabled={!isEditing}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={user.email}
                disabled={!isEditing}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">
                Phone Number
              </label>

              <input
                type="text"
                name="phone"
                value={user.phone}
                disabled={!isEditing}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">
                Role
              </label>

              <input
                type="text"
                value={user.role}
                disabled
                className="w-full mt-2 p-3 rounded-xl bg-gray-100 border"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">
                Village
              </label>

              <input
                type="text"
                name="village"
                value={user.village}
                disabled={!isEditing}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">
                City
              </label>

              <input
                type="text"
                name="city"
                value={user.city}
                disabled={!isEditing}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="font-semibold text-gray-700">
                State
              </label>

              <input
                type="text"
                name="state"
                value={user.state}
                disabled={!isEditing}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
                        <div>
              <label className="font-semibold text-gray-700">
                Pincode
              </label>

              <input
                type="text"
                name="pincode"
                value={user.pincode}
                disabled={!isEditing}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold text-gray-700">
                Address
              </label>

              <textarea
                rows="4"
                name="address"
                value={user.address}
                disabled={!isEditing}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-semibold text-gray-700">
                Bio
              </label>

              <textarea
                rows="4"
                name="bio"
                value={user.bio}
                disabled={!isEditing}
                onChange={handleChange}
                placeholder="Tell us about yourself..."
                className="w-full mt-2 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Profile;