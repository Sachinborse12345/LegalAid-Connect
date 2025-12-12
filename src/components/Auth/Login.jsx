import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { login } from "../../api/auth.js";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const successMsg = location.state?.success || null;

  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "CITIZEN",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (pass) => {
    const lengthOK = pass.length >= 8;
    const specialCharOK = /[!@#$%^&*(),.?":{}|<>]/.test(pass);
    return lengthOK && specialCharOK;
  };

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!validateEmail(form.username)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(form.password)) {
      setError(
        "Password must be at least 8 characters long and include one special character."
      );
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const userRole = form.role;

      if (userRole === "CITIZEN") {
        navigate("/citizen/dashboard", {
          state: { success: "Login successful! Welcome Citizen." },
        });
      } else if (userRole === "LAWYER") {
        navigate("/lawyer/dashboard", {
          state: { success: "Login successful! Welcome Lawyer." },
        });
      } else if (userRole === "NGO") {
        navigate("/ngo/dashboard", {
          state: { success: "Login successful! Welcome NGO Member." },
        });
      } else if (userRole === "ADMIN") {
        navigate("/admin/dashboard", {
          state: { success: "Login successful! Welcome Admin." },
        });
      }

      setLoading(false);
    }, 500);
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 px-4">
      {successMsg && (
        <div className="mb-4 text-green-700 bg-green-100 border border-green-300 p-3 rounded-lg text-center">
          {successMsg}
        </div>
      )}

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* IMAGE LEFT */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl h-96 md:h-[520px]">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1400&q=60"
            alt="justice"
            className="absolute inset-0 w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/25 to-transparent" />
          <div className="relative z-10 p-8 h-full flex flex-col justify-end text-white">
            <h3 className="text-3xl font-bold">Justice for Everyone</h3>
            <p className="mt-3 text-white/90">
              Connect with lawyers, NGOs, and access free legal help.
            </p>
          </div>
        </div>

        {/* LOGIN FORM */}
        <div className="mx-auto w-full max-w-md">
          <div className="bg-white/95 backdrop-blur-sm border border-gray-100 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-extrabold text-gray-900">
              Welcome Back
            </h2>

            {error && (
              <div className="mb-4 text-sm text-red-600 rounded px-3 py-2 bg-red-50 border border-red-100">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Registered Email
                </label>
                <input
                  name="username"
                  value={form.username}
                  type="email"
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg p-3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg p-3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Login as
                </label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg p-3"
                >
                  <option value="CITIZEN">Citizen</option>
                  <option value="LAWYER">Lawyer</option>
                  <option value="NGO">NGO</option>
                  <option value="ADMIN">Admin</option>
                </select>
              </div>
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-blue-600 text-sm hover:underline font-medium"
                >
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <span>Don’t have an account?</span>
              <Link
                to="/register"
                className="text-blue-600 font-semibold ml-2 hover:underline"
              >
                Register
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-gray-500">
            Need urgent help? Call our helpline:{" "}
            <span className="font-medium">1800-000-000</span>
          </p>
        </div>
      </div>
    </section>
  );
}
