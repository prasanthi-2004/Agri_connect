import { useState, useEffect } from "react";

function Home() {
  const images = [
    "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1600",
    "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=1600",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1600",
    "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1600",
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(slider);
  }, [images.length]);

  return (
    <div>
      {/* Hero Slider */}
      <section
        className="h-screen bg-cover bg-center flex items-center justify-center transition-all duration-700"
        style={{
          backgroundImage: `url(${images[current]})`,
        }}
      >
        <div className="bg-black/50 p-8 rounded-xl text-center text-white max-w-3xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            AgriConnect
          </h1>

          <p className="text-lg md:text-xl mb-6">
            Connecting Farmers Directly with Consumers.
            Fresh Products, Fair Prices, Better Profits.
          </p>

          <div className="flex justify-center gap-4">
            <a
              href="/products"
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg font-semibold"
            >
              Shop Now
            </a>

            <a
              href="/register"
              className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-lg font-semibold"
            >
              Join Us
            </a>
          </div>

          {/* Slider Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-3 h-3 rounded-full ${
                  current === index ? "bg-green-500" : "bg-white"
                }`}
              ></button>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-4xl font-bold text-center mb-12 text-green-700">
          Why Choose AgriConnect?
        </h2>

        <div className="grid md:grid-cols-4 gap-6">
          <div className="shadow-lg rounded-xl p-6 text-center">
            <div className="text-5xl mb-3">🌾</div>
            <h3 className="font-bold text-xl mb-2">Fresh Products</h3>
            <p>Directly sourced from trusted farmers.</p>
          </div>

          <div className="shadow-lg rounded-xl p-6 text-center">
            <div className="text-5xl mb-3">🚚</div>
            <h3 className="font-bold text-xl mb-2">Fast Delivery</h3>
            <p>Delivered fresh to your doorstep.</p>
          </div>

          <div className="shadow-lg rounded-xl p-6 text-center">
            <div className="text-5xl mb-3">💰</div>
            <h3 className="font-bold text-xl mb-2">Fair Pricing</h3>
            <p>No middlemen, better prices for everyone.</p>
          </div>

          <div className="shadow-lg rounded-xl p-6 text-center">
            <div className="text-5xl mb-3">🌱</div>
            <h3 className="font-bold text-xl mb-2">Organic Quality</h3>
            <p>Healthy and naturally grown produce.</p>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="bg-green-50 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-green-700 mb-6">
            About AgriConnect
          </h2>

          <p className="text-lg leading-8 text-gray-700">
            AgriConnect bridges the gap between farmers and consumers.
            Farmers can sell their products directly, while customers can
            buy fresh vegetables, fruits, grains, and organic products
            without intermediaries.
          </p>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-green-700 text-white">
        <div className="grid md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
          <div>
            <h3 className="text-4xl font-bold">500+</h3>
            <p>Farmers</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">10K+</h3>
            <p>Customers</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">50+</h3>
            <p>Cities</p>
          </div>

          <div>
            <h3 className="text-4xl font-bold">100%</h3>
            <p>Fresh Products</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;