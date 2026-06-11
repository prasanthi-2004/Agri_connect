function Contact() {
  return (
    <div className="min-h-screen bg-green-50 p-10">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">

        <h1 className="text-4xl font-bold text-green-700 mb-6">
          Contact Us
        </h1>

        <div className="space-y-4 text-lg">
          <p>
            📧 Email: support@agriconnect.com
          </p>

          <p>
            📞 Phone: +91 9876543210
          </p>

          <p>
            📍 Address: Vijayawada, Andhra Pradesh, India
          </p>
        </div>

        <form className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border p-3 rounded"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="w-full border p-3 rounded"
          />

          <textarea
            rows="4"
            placeholder="Your Message"
            className="w-full border p-3 rounded"
          ></textarea>

          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded"
          >
            Send Message
          </button>
        </form>

      </div>
    </div>
  );
}

export default Contact;