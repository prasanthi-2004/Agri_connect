function About() {
  return (
    <div className="min-h-screen bg-green-50 p-10">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-green-700 mb-6">
          About AgriConnect
        </h1>

        <p className="text-gray-700 mb-4">
          AgriConnect is an online agriculture marketplace that connects
          farmers directly with customers. Our platform helps farmers sell
          their products without intermediaries and allows customers to
          purchase fresh farm products at affordable prices.
        </p>

        <p className="text-gray-700 mb-4">
          The goal of AgriConnect is to improve farmer income, provide
          quality agricultural products, and create a transparent
          farm-to-home ecosystem.
        </p>

        <h2 className="text-2xl font-semibold text-green-600 mt-6">
          Our Mission
        </h2>

        <p className="text-gray-700 mt-2">
          To empower farmers through technology and deliver fresh,
          high-quality agricultural products directly to consumers.
        </p>
      </div>
    </div>
  );
}

export default About;