import React, { useState } from "react";

export default function CitizenDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowForm(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-200">
      {/* NAVBAR */}
      <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-10">
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <img
            src="data:image/png;base64,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"
            alt="logo"
            className="w-12 h-12 rounded-md object-cover"
          />

          <div>
            <h1 className="text-sm text-gray-500 font-medium">
              Legal Aid Platform
            </h1>
            <h2 className="text-xl font-bold text-gray-800 -mt-1">
              Citizen Dashboard
            </h2>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          {/* <div
            className="w-10 h-10 bg-gray-300 rounded-full flex items-center 
                          justify-center text-gray-700 font-semibold"
          >
            S
          </div> */}
          {/* <span className="text-gray-700 font-medium">Sachin</span> */}

          <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="container mx-auto p-8">
        {/* HERO BOX */}
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white p-10 rounded-2xl shadow-xl mb-10">
          <h2 className="text-3xl font-bold mb-4">
            We Understand Your Concern
          </h2>
          <p className="text-lg opacity-90 max-w-3xl">
            Share your legal issue clearly. Our system will match you with the
            best, verified lawyer based on expertise, case domain, location, and
            urgency.
          </p>

          {!submitted && (
            <button
              onClick={() => setShowForm(true)}
              className="mt-6 bg-white text-blue-700 font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-gray-100 transition"
            >
              Submit Your Case
            </button>
          )}
        </div>

        {/* STATS (Visible ONLY After Form Submit) */}
        {submitted && (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition">
              <h3 className="font-medium text-gray-600">Open Cases</h3>
              <p className="text-4xl font-bold mt-2 text-blue-600">1</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition">
              <h3 className="font-medium text-gray-600">Matched Lawyers</h3>
              <p className="text-4xl font-bold mt-2 text-green-600">1</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition">
              <h3 className="font-medium text-gray-600">
                Upcoming Appointments
              </h3>
              <p className="text-4xl font-bold mt-2 text-purple-600">1</p>
            </div>
          </div>
        )}

        {/* CASE FORM */}
        {showForm && (
          <div className="mt-12 bg-white p-10 rounded-2xl shadow-2xl border">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">
              Detailed Case Submission Form
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Case Title */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Case Title
                </label>
                <input
                  required
                  type="text"
                  className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
                  placeholder="Short case title"
                />
              </div>

              {/* Case Category */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Case Category
                </label>
                <select
                  required
                  className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Case Type</option>
                  <option value="crime">Criminal Case</option>
                  <option value="civil">Civil Dispute</option>
                  <option value="family">Family / Divorce / Marriage</option>
                  <option value="property">Property / Land Issue</option>
                  <option value="financial">Financial Fraud</option>
                  <option value="cyber">Cyber Crime</option>
                  <option value="corporate">Corporate Legal Issue</option>
                  <option value="consumer">
                    Consumer Protection Complaint
                  </option>
                </select>
              </div>

              {/* Urgency Level */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Urgency Level
                </label>
                <select
                  required
                  className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Choose urgency</option>
                  <option value="low">Low – Need guidance</option>
                  <option value="medium">Medium – Need legal help</option>
                  <option value="high">High – Immediate lawyer needed</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Your Location
                </label>
                <input
                  required
                  type="text"
                  className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your city or district"
                />
              </div>

              {/* Age & Gender */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium">
                    Your Age
                  </label>
                  <input
                    required
                    type="number"
                    className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
                    placeholder="Age"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">
                    Gender
                  </label>
                  <select
                    required
                    className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>

              {/* Opponent Relationship */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Who is involved in the issue?
                </label>
                <select
                  required
                  className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select option</option>
                  <option>Family Member</option>
                  <option>Neighbor</option>
                  <option>Government Authority</option>
                  <option>Police</option>
                  <option>Company / Employer</option>
                  <option>Unknown Person</option>
                </select>
              </div>

              {/* Detailed Description */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Explain Your Issue
                </label>
                <textarea
                  required
                  rows="6"
                  className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the full situation with events, dates, people involved..."
                ></textarea>
              </div>

              {/* Evidence */}
              <div>
                <label className="block text-gray-700 font-medium">
                  Do you have any evidence?
                </label>
                <select
                  required
                  className="w-full p-3 border rounded-lg mt-1 focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select option</option>
                  <option>Yes (Documents)</option>
                  <option>Yes (Photos / Videos)</option>
                  <option>No</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  className="bg-blue-700 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-800 transition"
                >
                  Submit Case
                </button>

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-red-600 font-semibold hover:underline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
