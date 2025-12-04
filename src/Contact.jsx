import React from "react";

export default function Contact() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-blue-50 pt-28 px-6">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <h1 className="text-4xl font-extrabold text-center text-gray-900">
          Contact Us
        </h1>
        <p className="text-center text-gray-600 mt-3 max-w-2xl mx-auto">
          We're here to support citizens, lawyers, and NGOs. Reach out anytime —
          justice begins with a conversation.
        </p>

        {/* CONTACT FORM + INFO */}
        <div className="grid md:grid-cols-2 gap-10 mt-12">
          {/* LEFT: Contact Form */}
          <div className="bg-white shadow-xl p-8 rounded-xl hover:shadow-2xl transition">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Send Us a Message
            </h2>

            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border rounded-lg"
              />

              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border rounded-lg"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full p-3 border rounded-lg"
              ></textarea>

              <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                Send Message
              </button>
            </form>
          </div>

          {/* RIGHT: Info */}
          <div className="p-8 bg-white shadow-xl rounded-xl">
            <h2 className="text-2xl font-semibold text-gray-800">
              Contact Information
            </h2>

            <p className="text-gray-600 mt-4 leading-relaxed">
              Have queries about legal support, partnerships, or pro bono work?
              Our team is ready to help.
            </p>

            <div className="mt-6 space-y-4">
              <p className="text-gray-700">
                <strong>Email:</strong> support@legalaidconnect.org
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> +91 800-000-0000
              </p>
              <p className="text-gray-700">
                <strong>Office:</strong> Pune, Maharashtra, India
              </p>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">Follow Us</h3>
              <div className="flex gap-4 text-2xl mt-3">
                <span>📘</span>
                <span>🐦</span>
                <span>📸</span>
                <span>🎥</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
