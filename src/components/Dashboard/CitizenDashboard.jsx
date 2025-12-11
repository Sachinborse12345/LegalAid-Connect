// CitizenDashboardFull.jsx
import React, { useState, useRef } from "react";

export default function CitizenDashboardFull() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setShowForm(false);
  };

  const [activePage, setActivePage] = useState("overview"); // overview | cases | find | messages | profile | settings

  // Sample data
  const [cases] = useState([
    {
      id: 1,
      title: "Land dispute with neighbor",
      status: "Open",
      summary: "Dispute over boundary after construction.",
      date: "2025-10-01",
    },
  ]);

  const [lawyers] = useState([
    {
      id: 1,
      name: "Adv. Ramesh Sharma",
      expertise: "Property, Civil",
      location: "Pune",
      contact: "ramesh@example.com",
    },
  ]);

  // Messages state
  const [selectedRecipient, setSelectedRecipient] = useState({
    type: "lawyer",
    id: 1,
    name: lawyers[0].name,
  });
  const [messages, setMessages] = useState([
    {
      id: 1,
      to: lawyers[0].name,
      from: "Sachin",
      text: "Hello, I want to discuss my case.",
      time: "2025-11-01 10:00",
    },
  ]);
  const [messageText, setMessageText] = useState("");

  // Profile state (editable)
  const [profile, setProfile] = useState({
    shortName: "Sachin Borse",
    fullName: "Sachin Sahebrao Borse",
    role: "CITIZEN",
    aadhaar: "437656495462",
    email: "sachinborse7744@gmail.com",
    mobile: "9975474400",
    dob: "2003-07-18",
    address: "123, Sample Street, Pune, Maharashtra",
    photo: null, // file object
    photoUrl: null, // preview URL
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const fileInputRef = useRef(null);

  // Settings
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    shareProfile: false,
  });

  // Handlers
  const handleSendMessage = () => {
    if (!messageText.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      to: selectedRecipient.name,
      from: profile.shortName,
      text: messageText.trim(),
      time: new Date().toISOString().slice(0, 16).replace("T", " "),
    };
    setMessages((m) => [...m, newMsg]);
    setMessageText("");
  };

  const handleProfileChange = (field, value) => {
    setProfile((p) => ({ ...p, [field]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setProfile((p) => ({ ...p, photo: file, photoUrl: url }));
  };

  const handleUpdateProfile = () => {
    // In real app: call backend API to update profile
    setIsEditingProfile(false);
    alert("Profile updated successfully (local).");
  };

  const renderSidebar = () => (
    <aside className="w-72 bg-teal-900 text-white flex flex-col p-6">
      <div className="flex items-center gap-3 pb-4 border-b border-teal-700">
        <div className="w-12 h-12 bg-white/10 rounded-md flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 7h18M3 12h18M3 17h18"
              stroke="#fff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div>
          <div className="text-sm opacity-90">AdvoCare</div>
          <div className="text-xs opacity-80">Legal Aid Platform</div>
        </div>
      </div>

      <div className="mt-6 mb-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-teal-700 rounded-full flex items-center justify-center font-semibold">
          {profile.shortName?.charAt(0) || "S"}
        </div>
        <div>
          <div className="font-semibold">{profile.shortName}</div>
          <div className="text-xs opacity-80">Citizen</div>
        </div>
      </div>

      <nav className="flex-1">
        {[
          { key: "overview", label: "Overview" },
          { key: "addcase", label: "Add Your Case" },

          { key: "cases", label: "My Cases" },
          { key: "find", label: "Find Lawyer" },
          { key: "messages", label: "Messages" },
          { key: "profile", label: "Profile" },
          { key: "settings", label: "Settings" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setActivePage(item.key)}
            className={`w-full text-left px-3 py-3 rounded-md mb-2 transition-colors ${
              activePage === item.key ? "bg-teal-800" : "hover:bg-teal-800/60"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="pt-4 border-t border-teal-700">
        <button
          onClick={() => alert("Logged out (placeholder)")}
          className="w-full bg-red-500 hover:bg-red-600 px-3 py-2 rounded-md text-white"
        >
          Logout
        </button>
      </div>
    </aside>
  );

  const Overview = () => (
    <div>
      <h2 className="text-2xl font-bold mb-2">Overview</h2>
      <p className="text-gray-700 mb-4">
        This platform helps citizens submit legal issues and connect with
        verified lawyers and NGOs. It provides case tracking, lawyer matching,
        messaging and appointment scheduling. Your rights as a user include:
      </p>
      <ul className="list-disc pl-6 text-gray-700 space-y-1">
        <li>Right to confidential consultation with matched lawyers.</li>
        <li>Right to view status of submitted cases and appointments.</li>
        <li>Right to request escalation and updates.</li>
        <li>
          Right to update personal profile and control sharing preferences.
        </li>
      </ul>
    </div>
  );
  const AddYourCase = () => (
    <div className="container mx-auto p-8">
      {/* HERO BOX */}
      <div className="bg-gradient-to-br from-blue-700 to-blue-900 text-white p-10 rounded-2xl shadow-xl mb-10">
        <h2 className="text-3xl font-bold mb-4">We Understand Your Concern</h2>
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

      {/* STATS — After Submit */}
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
            <h3 className="font-medium text-gray-600">Upcoming Appointments</h3>
            <p className="text-4xl font-bold mt-2 text-purple-600">1</p>
          </div>
        </div>
      )}

      {/* FORM */}
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
                <option value="consumer">Consumer Protection Complaint</option>
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
                Who is involved?
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
                placeholder="Describe the full situation with events, dates..."
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
  );

  const MyCases = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">My Cases</h2>
      {cases.length === 0 ? (
        <div className="text-gray-600">No cases found.</div>
      ) : (
        cases.map((c) => (
          <div
            key={c.id}
            className="bg-white p-4 rounded-lg shadow mb-4 border"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg">{c.title}</h3>
                <p className="text-sm text-gray-600">{c.summary}</p>
                <div className="text-xs text-gray-500 mt-2">Date: {c.date}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium mb-2">{c.status}</div>
                <button className="text-sm bg-blue-600 text-white px-3 py-1 rounded">
                  View
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );

  const FindLawyer = () => (
    <div>
      <h2 className="text-2xl font-bold mb-4">Find Lawyers</h2>
      <div className="grid gap-4">
        {lawyers.map((L) => (
          <div
            key={L.id}
            className="bg-white p-4 rounded-lg shadow border flex items-center justify-between"
          >
            <div>
              <div className="font-semibold">{L.name}</div>
              <div className="text-sm text-gray-600">
                {L.expertise} • {L.location}
              </div>
              <div className="text-sm text-gray-500 mt-1">{L.contact}</div>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setActivePage("messages");
                  setSelectedRecipient({
                    type: "lawyer",
                    id: L.id,
                    name: L.name,
                  });
                }}
                className="bg-teal-700 text-white px-3 py-1 rounded"
              >
                Message
              </button>
              <button className="border px-3 py-1 rounded">View Profile</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Messages = () => (
    <div className="flex gap-6">
      <div className="w-72 bg-white rounded-lg p-4 shadow border">
        <div className="font-semibold mb-3">Contacts</div>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              setSelectedRecipient({
                type: "lawyer",
                id: lawyers[0].id,
                name: lawyers[0].name,
              });
            }}
            className={`text-left p-2 rounded ${
              selectedRecipient.id === lawyers[0].id
                ? "bg-blue-50"
                : "hover:bg-gray-50"
            }`}
          >
            {lawyers[0].name}{" "}
            <div className="text-xs text-gray-500">{lawyers[0].expertise}</div>
          </button>

          <button
            onClick={() =>
              setSelectedRecipient({
                type: "ngo",
                id: 1,
                name: "Helping Hands NGO",
              })
            }
            className={`text-left p-2 rounded ${
              selectedRecipient.type === "ngo"
                ? "bg-blue-50"
                : "hover:bg-gray-50"
            }`}
          >
            Helping Hands NGO{" "}
            <div className="text-xs text-gray-500">NGO • Pune</div>
          </button>
        </div>
      </div>

      <div className="flex-1 bg-white rounded-lg p-4 shadow border flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="font-semibold">{selectedRecipient.name}</div>
            <div className="text-xs text-gray-500">
              {selectedRecipient.type}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto mb-4 space-y-3">
          {messages
            .filter(
              (m) =>
                m.to === selectedRecipient.name ||
                m.from === selectedRecipient.name ||
                m.to === selectedRecipient.name
            )
            .map((m) => (
              <div
                key={m.id}
                className={`p-2 rounded ${
                  m.from === profile.shortName
                    ? "bg-teal-50 self-end"
                    : "bg-gray-100 self-start"
                }`}
              >
                <div className="text-sm">{m.text}</div>
                <div className="text-xs text-gray-500 mt-1">{m.time}</div>
              </div>
            ))}
        </div>

        <div className="mt-2">
          <textarea
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder={`Message to ${selectedRecipient.name}...`}
            className="w-full p-3 border rounded mb-2"
            rows={3}
          />
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              You are messaging: <b>{selectedRecipient.name}</b>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleSendMessage}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Send
              </button>
              <button
                onClick={() => setMessageText("")}
                className="px-3 py-2 border rounded"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Profile = () => (
    <div>
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold">My Profile</h2>
          <p className="text-gray-600">
            Manage your personal information and preferences.
          </p>
        </div>

        <div className="flex gap-2">
          {!isEditingProfile ? (
            <button
              onClick={() => setIsEditingProfile(true)}
              className="bg-teal-700 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={handleUpdateProfile}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
              <button
                onClick={() => setIsEditingProfile(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow border">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="w-36 h-36 bg-gray-100 rounded overflow-hidden border">
              {profile.photoUrl ? (
                <img
                  src={profile.photoUrl}
                  alt="profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  No Photo
                </div>
              )}
            </div>
            <div className="w-full">
              <input
                ref={fileInputRef}
                onChange={handlePhotoChange}
                type="file"
                accept="image/*"
                className="block"
                disabled={!isEditingProfile}
              />
              <div className="text-xs text-gray-500 mt-1">
                Upload a clear photo (optional)
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700">Role</label>
                <input
                  value={profile.role}
                  disabled
                  className="w-full p-2 border rounded mt-1 bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700">Full name</label>
                <input
                  value={profile.fullName}
                  onChange={(e) =>
                    handleProfileChange("fullName", e.target.value)
                  }
                  disabled={!isEditingProfile}
                  className="w-full p-2 border rounded mt-1 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700">
                  Aadhaar Number
                </label>
                <input
                  value={profile.aadhaar}
                  onChange={(e) =>
                    handleProfileChange("aadhaar", e.target.value)
                  }
                  disabled={!isEditingProfile}
                  className="w-full p-2 border rounded mt-1 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700">Email</label>
                <input
                  value={profile.email}
                  onChange={(e) => handleProfileChange("email", e.target.value)}
                  disabled={!isEditingProfile}
                  className="w-full p-2 border rounded mt-1 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700">Mobile</label>
                <input
                  value={profile.mobile}
                  onChange={(e) =>
                    handleProfileChange("mobile", e.target.value)
                  }
                  disabled={!isEditingProfile}
                  className="w-full p-2 border rounded mt-1 bg-white"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700">DOB</label>
                <input
                  type="date"
                  value={profile.dob}
                  onChange={(e) => handleProfileChange("dob", e.target.value)}
                  disabled={!isEditingProfile}
                  className="w-full p-2 border rounded mt-1 bg-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm text-gray-700">
                  Residential Address
                </label>
                <textarea
                  value={profile.address}
                  onChange={(e) =>
                    handleProfileChange("address", e.target.value)
                  }
                  disabled={!isEditingProfile}
                  className="w-full p-2 border rounded mt-1 bg-white"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Settings = () => (
    <div>
      <h2 className="text-2xl font-bold mb-3">Settings</h2>
      <div className="bg-white p-4 rounded shadow border space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Notifications</div>
            <div className="text-sm text-gray-600">
              Receive updates for matched lawyers and appointments.
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) =>
              setSettings((s) => ({ ...s, notifications: e.target.checked }))
            }
            className="w-5 h-5"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Dark Mode (preview)</div>
            <div className="text-sm text-gray-600">
              Toggle UI dark mode (local preview).
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.darkMode}
            onChange={(e) =>
              setSettings((s) => ({ ...s, darkMode: e.target.checked }))
            }
            className="w-5 h-5"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">
              Share profile with matched lawyers
            </div>
            <div className="text-sm text-gray-600">
              Control whether your details are shared.
            </div>
          </div>
          <input
            type="checkbox"
            checked={settings.shareProfile}
            onChange={(e) =>
              setSettings((s) => ({ ...s, shareProfile: e.target.checked }))
            }
            className="w-5 h-5"
          />
        </div>

        <div className="pt-3">
          <button
            onClick={() => alert("Settings saved (local).")}
            className="bg-teal-700 text-white px-4 py-2 rounded"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`flex min-h-screen ${
        settings.darkMode
          ? "bg-gray-900 text-white"
          : "bg-gray-100 text-gray-900"
      }`}
    >
      {renderSidebar()}

      <main className="flex-1 p-8">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">
            {activePage === "overview"
              ? "Overview"
              : activePage === "cases"
              ? "My Cases"
              : activePage === "find"
              ? "Find Lawyers"
              : activePage === "messages"
              ? "Messages"
              : activePage === "profile"
              ? "My Profile"
              : "Settings"}
          </h1>

          <div className="flex items-center gap-3">
            <div className="text-sm opacity-80">{profile.shortName}</div>
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              {profile.shortName?.charAt(0)}
            </div>
          </div>
        </div>

        <section className="space-y-6">
          {activePage === "overview" && <Overview />}
          {activePage === "addcase" && <AddYourCase />}
          {activePage === "cases" && <MyCases />}
          {activePage === "find" && <FindLawyer />}
          {activePage === "messages" && <Messages />}
          {activePage === "profile" && <Profile />}
          {activePage === "settings" && <Settings />}
        </section>
      </main>
    </div>
  );
}
