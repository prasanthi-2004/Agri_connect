import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line, Bar, Doughnut } from "react-chartjs-2";

import {
  FaShoppingCart,
  FaRupeeSign,
  FaBox,
  FaUsers,
} from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function FarmerDashboard() {

  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const [filter, setFilter] = useState("Monthly");

  //-----------------------------------
  // Dashboard Summary
  //-----------------------------------

  const dashboard = {
    revenue: 78500,
    orders: 245,
    products: 18,
    customers: 92,
  };

  //-----------------------------------
  // Product Data
  //-----------------------------------

  const products = [
    {
      id: 1,
      name: "Tomatoes",
      sold: 120,
      revenue: 24000,
      stock: 40,
    },
    {
      id: 2,
      name: "Potatoes",
      sold: 95,
      revenue: 19000,
      stock: 35,
    },
    {
      id: 3,
      name: "Carrots",
      sold: 80,
      revenue: 16000,
      stock: 18,
    },
    {
      id: 4,
      name: "Onions",
      sold: 150,
      revenue: 30000,
      stock: 50,
    },
    {
      id: 5,
      name: "Cabbage",
      sold: 60,
      revenue: 12000,
      stock: 12,
    },
    {
      id: 6,
      name: "Brinjal",
      sold: 45,
      revenue: 9000,
      stock: 8,
    },
  ];

  //-----------------------------------
  // Chart Arrays
  //-----------------------------------

  const productNames = products.map(
    (item) => item.name
  );

  const unitsSold = products.map(
    (item) => item.sold
  );

  const revenues = products.map(
    (item) => item.revenue
  );

  //-----------------------------------
  // Revenue Analytics
  //-----------------------------------

  const revenueData = {

    Daily: {
      labels: [
        "8 AM",
        "10 AM",
        "12 PM",
        "2 PM",
        "4 PM",
        "6 PM",
      ],
      data: [
        400,
        900,
        1200,
        800,
        1500,
        2200,
      ],
    },

    Weekly: {
      labels: [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
      ],
      data: [
        2500,
        3400,
        2800,
        4100,
        5200,
        6800,
        7300,
      ],
    },

    Monthly: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
      ],
      data: [
        12000,
        17000,
        14000,
        22000,
        28000,
        32000,
      ],
    },

    Yearly: {
      labels: [
        "2022",
        "2023",
        "2024",
        "2025",
        "2026",
      ],
      data: [
        120000,
        180000,
        240000,
        310000,
        410000,
      ],
    },

  };

  return (

    <div className="min-h-screen bg-slate-100 p-8">

      <h1 className="text-4xl font-bold text-green-800 mb-2">
        Farmer Dashboard
      </h1>

      <p className="text-gray-600 mb-8">
        Welcome, {user.username}
      </p>
            {/* ================= Dashboard Cards ================= */}

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow-lg p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">
                Total Revenue
              </p>

              <h2 className="text-3xl font-bold mt-2 text-green-700">
                ₹{dashboard.revenue.toLocaleString()}
              </h2>

            </div>

            <FaRupeeSign className="text-5xl text-green-600" />

          </div>

        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">
                Orders
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {dashboard.orders}
              </h2>

            </div>

            <FaShoppingCart className="text-5xl text-blue-600" />

          </div>

        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">
                Products
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {dashboard.products}
              </h2>

            </div>

            <FaBox className="text-5xl text-yellow-500" />

          </div>

        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">
                Customers
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {dashboard.customers}
              </h2>

            </div>

            <FaUsers className="text-5xl text-purple-600" />

          </div>

        </div>

      </div>

      {/* ================= Revenue Analytics ================= */}

      <div className="bg-white rounded-xl shadow-lg mt-8 p-6">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6">

          <h2 className="text-2xl font-bold text-green-700">
            Revenue Analytics
          </h2>

          <div className="flex gap-3 mt-4 md:mt-0">

            {["Daily", "Weekly", "Monthly", "Yearly"].map((item) => (

              <button
                key={item}
                onClick={() => setFilter(item)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  filter === item
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 hover:bg-green-200"
                }`}
              >
                {item}
              </button>

            ))}

          </div>

        </div>

        <Line
          data={{
            labels: revenueData[filter].labels,

            datasets: [
              {
                label: `${filter} Revenue`,
                data: revenueData[filter].data,

                borderColor: "#16a34a",
                backgroundColor: "rgba(34,197,94,0.25)",

                fill: true,
                tension: 0.4,

                pointRadius: 5,
                pointHoverRadius: 8,
              },
            ],
          }}

          options={{
            responsive: true,

            plugins: {

              legend: {
                display: true,
              },

              title: {
                display: true,
                text: `${filter} Revenue Report`,
                font: {
                  size: 18,
                },
              },

            },

            scales: {

              y: {
                beginAtZero: true,
              },

            },

          }}
        />

      </div>

      {/* ================= Sales Summary ================= */}

      <div className="grid md:grid-cols-4 gap-6 mt-8">

        <div className="bg-green-100 rounded-xl p-6 text-center shadow">

          <h3 className="text-lg font-semibold text-green-700">
            Today's Sales
          </h3>

          <p className="text-3xl font-bold mt-2">
            ₹2,450
          </p>

        </div>

        <div className="bg-blue-100 rounded-xl p-6 text-center shadow">

          <h3 className="text-lg font-semibold text-blue-700">
            Weekly Sales
          </h3>

          <p className="text-3xl font-bold mt-2">
            ₹18,500
          </p>

        </div>

        <div className="bg-yellow-100 rounded-xl p-6 text-center shadow">

          <h3 className="text-lg font-semibold text-yellow-700">
            Monthly Sales
          </h3>

          <p className="text-3xl font-bold mt-2">
            ₹78,500
          </p>

        </div>

        <div className="bg-purple-100 rounded-xl p-6 text-center shadow">

          <h3 className="text-lg font-semibold text-purple-700">
            Yearly Sales
          </h3>

          <p className="text-3xl font-bold mt-2">
            ₹4,10,000
          </p>

        </div>

      </div>
            {/* ================= Product Sales Analytics ================= */}

      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        {/* Product Sales Bar Chart */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Product-wise Sales
          </h2>

          <Bar
            data={{
              labels: productNames,
              datasets: [
                {
                  label: "Units Sold",
                  data: unitsSold,
                  backgroundColor: [
                    "#22c55e",
                    "#3b82f6",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6",
                    "#14b8a6",
                  ],
                  borderRadius: 8,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />

        </div>

        {/* Revenue Distribution */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold text-green-700 mb-6">
            Revenue Distribution
          </h2>

          <Doughnut
            data={{
              labels: productNames,
              datasets: [
                {
                  data: revenues,
                  backgroundColor: [
                    "#16a34a",
                    "#3b82f6",
                    "#f59e0b",
                    "#ef4444",
                    "#8b5cf6",
                    "#14b8a6",
                  ],
                  hoverOffset: 15,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "bottom",
                },
              },
            }}
          />

        </div>

      </div>

      {/* ================= Product Performance Table ================= */}

      <div className="bg-white rounded-xl shadow-lg mt-10 p-6">

        <h2 className="text-2xl font-bold text-green-700 mb-6">
          Product Performance
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-green-700 text-white">

                <th className="p-3 text-left">
                  Product
                </th>

                <th className="p-3">
                  Units Sold
                </th>

                <th className="p-3">
                  Revenue
                </th>

                <th className="p-3">
                  Stock
                </th>

                <th className="p-3">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {products.map((item) => (

                <tr
                  key={item.id}
                  className="border-b hover:bg-green-50"
                >

                  <td className="p-3 font-semibold">
                    {item.name}
                  </td>

                  <td className="text-center">
                    {item.sold}
                  </td>

                  <td className="text-center font-bold text-green-700">
                    ₹{item.revenue.toLocaleString()}
                  </td>

                  <td className="text-center">
                    {item.stock}
                  </td>

                  <td className="text-center">

                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        item.stock > 20
                          ? "bg-green-500"
                          : item.stock > 5
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {item.stock > 20
                        ? "In Stock"
                        : item.stock > 5
                        ? "Low Stock"
                        : "Out of Stock"}
                    </span>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>
            {/* ================= TOP SELLING PRODUCTS ================= */}

      <div className="grid lg:grid-cols-2 gap-8 mt-10">

        {/* Top Selling Products */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold text-green-700 mb-6">
            🔥 Top Selling Products
          </h2>

          <div className="space-y-5">

            {[...products]
              .sort((a, b) => b.sold - a.sold)
              .slice(0, 5)
              .map((item, index) => (

                <div
                  key={item.id}
                  className="flex justify-between items-center bg-green-50 rounded-lg p-4 hover:shadow-md transition"
                >

                  <div>

                    <h3 className="font-bold text-lg">
                      #{index + 1} {item.name}
                    </h3>

                    <p className="text-gray-500">
                      {item.sold} Units Sold
                    </p>

                  </div>

                  <div className="text-right">

                    <h3 className="font-bold text-green-700 text-xl">
                      ₹{item.revenue.toLocaleString()}
                    </h3>

                  </div>

                </div>

              ))}

          </div>

        </div>

        {/* Monthly Growth */}

        <div className="bg-white rounded-xl shadow-lg p-6">

          <h2 className="text-2xl font-bold text-green-700 mb-6">
            📈 Monthly Growth
          </h2>

          <Line
            data={{
              labels: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],

              datasets: [
                {
                  label: "Revenue",

                  data: [
                    12000,
                    18000,
                    22000,
                    26000,
                    30000,
                    35000,
                    42000,
                    45000,
                    50000,
                    56000,
                    62000,
                    70000,
                  ],

                  borderColor: "#15803d",
                  backgroundColor: "rgba(34,197,94,0.2)",

                  fill: true,
                  tension: 0.4,

                  pointRadius: 5,
                  pointHoverRadius: 8,
                },
              ],
            }}

            options={{
              responsive: true,

              plugins: {
                legend: {
                  display: true,
                },
              },

              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />

        </div>

      </div>

      {/* ================= PERFORMANCE CARDS ================= */}

      <div className="grid md:grid-cols-4 gap-6 mt-10">

        <div className="bg-green-600 text-white rounded-xl p-6 shadow-lg">

          <h3 className="text-lg font-semibold">
            🏆 Best Product
          </h3>

          <h2 className="text-2xl font-bold mt-3">
            Onions
          </h2>

        </div>

        <div className="bg-blue-600 text-white rounded-xl p-6 shadow-lg">

          <h3 className="text-lg font-semibold">
            💰 Highest Revenue
          </h3>

          <h2 className="text-2xl font-bold mt-3">
            ₹30,000
          </h2>

        </div>

        <div className="bg-yellow-500 text-white rounded-xl p-6 shadow-lg">

          <h3 className="text-lg font-semibold">
            📦 Products Listed
          </h3>

          <h2 className="text-2xl font-bold mt-3">
            {products.length}
          </h2>

        </div>

        <div className="bg-purple-600 text-white rounded-xl p-6 shadow-lg">

          <h3 className="text-lg font-semibold">
            ⭐ Customer Rating
          </h3>

          <h2 className="text-2xl font-bold mt-3">
            4.9 / 5
          </h2>

        </div>

      </div>
            {/* ================= FOOTER ================= */}

      <div className="mt-12 text-center text-gray-500">
        <p className="text-sm">
          © {new Date().getFullYear()} Farmer Dashboard | Built with React & Chart.js
        </p>
      </div>

    </div>
  );
}

export default FarmerDashboard;