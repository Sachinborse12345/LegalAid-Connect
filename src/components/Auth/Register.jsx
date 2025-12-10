import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../api/auth.js";

import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiHash,
  FiMapPin,
} from "react-icons/fi";
import { MdDateRange, MdPlace, MdUploadFile } from "react-icons/md";

// ---------------------------------------------------------
// REGISTER COMPONENT
// ---------------------------------------------------------
export default function Register() {
  const navigate = useNavigate();

  const [role, setRole] = useState("CITIZEN");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});
  const [error, setError] = useState(null);

  // ---------------------------------------------------------
  // CONSTANT DROPDOWNS
  // ---------------------------------------------------------
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const specializations = [
    "Criminal Law",
    "Civil Law",
    "Family Law",
    "Property & Real Estate Law",
    "Consumer Protection Law",
    "Labour & Employment Law",
    "Corporate & Business Law",
    "Cyber Law",
    "Intellectual Property (IPR) Law",
    "Banking & Finance Law",
    "Taxation Law",
    "Constitutional Law",
    "Human Rights Law",
    "Environmental Law",
    "Medical Negligence Law",
    "Child Rights / Juvenile Justice Law",
    "Immigration Law",
    "Wills, Trusts & Inheritance Law",
    "Insurance Law",
  ];

  const ngoTypes = [
    "Human Rights NGO",
    "Women Protection & Welfare NGO",
    "Child Welfare NGO",
    "Consumer Rights NGO",
    "Cyber Safety & Digital Rights NGO",
    "Labour Rights NGO",
    "Community Development NGO",
    "Environmental Protection NGO",
    "Medical & Health Support NGO",
    "Anti-Trafficking NGO",
    "Migrant & Refugee Support NGO",
    "Financial Counseling NGO",
    "Disability Rights NGO",
    "Elderly Care NGO",
  ];

  // ---------------------------------------------------------
  // CHANGE HANDLER
  // ---------------------------------------------------------
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  // ---------------------------------------------------------
  // SUBMIT HANDLER
  // ---------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // await register({ ...form, role });

      navigate("/login", {
        state: { success: "Your account has been created successfully!" },
      });
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------
  // INPUT COMPONENT
  // ---------------------------------------------------------
  const Input = React.memo(function Input({
    icon,
    label,
    name,
    type = "text",
    ...rest
  }) {
    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>

        <div className="flex items-center border border-gray-300 rounded-xl p-3 bg-white shadow-sm">
          {icon && <span className="text-gray-500 mr-3 text-lg">{icon}</span>}

          <input
            name={name}
            type={type}
            className="w-full focus:outline-none"
            onChange={handleChange}
            autoComplete="off"
            {...(type !== "file" ? { value: form[name] || "" } : {})}
            {...rest}
          />
        </div>
      </div>
    );
  });

  // ---------------------------------------------------------
  // UI
  // ---------------------------------------------------------
  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 px-6">
      {/* 🔹 Single centered card (image removed) */}
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl p-8">
        {/* TITLE CENTERED */}
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Register Account
          </h2>
          <p className="text-sm text-gray-500 mt-1 text-center">
            Join our trusted network and access legal resources.
          </p>
        </div>

        {/* ROLE SELECTOR */}
        <div className="mt-6 max-w-md mx-auto">
          <label className="block text-sm text-gray-700 mb-1">
            Select Role
          </label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border border-gray-300 bg-white rounded-xl p-3 shadow-sm"
          >
            <option value="CITIZEN">Citizen</option>
            <option value="LAWYER">Lawyer</option>
            <option value="NGO">NGO</option>
          </select>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg max-w-md mx-auto">
            {error}
          </div>
        )}

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6 mt-8">
          {/* --------------------------- CITIZEN --------------------------- */}
          {role === "CITIZEN" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input icon={<FiUser />} label="Full Name" name="name" required />
              <Input
                icon={<FiHash />}
                label="Aadhar Number"
                name="aadhar"
                // required
              />
              <Input
                icon={<FiMail />}
                label="Email"
                name="email"
                type="email"
                required
              />
              <Input
                icon={<FiPhone />}
                label="Mobile Number"
                name="phone"
                required
              />
              <Input
                icon={<MdDateRange />}
                label="Date of Birth"
                name="dob"
                type="date"
                required
              />
              <Input
                icon={<FiLock />}
                label="Password"
                name="password"
                type="password"
                required
              />
              <Input
                icon={<FiLock />}
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                required
              />
            </div>
          )}

          {/* --------------------------- LAWYER --------------------------- */}
          {role === "LAWYER" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mt-2">
                  General Details
                </h3>
              </div>

              <Input icon={<FiUser />} label="Full Name" name="name" required />
              <Input icon={<FiMail />} label="Email" name="email" required />
              <Input
                icon={<FiPhone />}
                label="Mobile Number"
                name="phone"
                required
              />
              <Input
                icon={<FiHash />}
                label="Aadhar Number"
                name="aadhar"
                required
              />

              <Input
                icon={<MdUploadFile />}
                label="Upload Aadhar ID Proof"
                name="aadharProof"
                type="file"
                required
              />

              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mt-4">
                  Lawyer Identification
                </h3>
              </div>

              <Input
                icon={<FiHash />}
                label="Bar Council ID"
                name="barId"
                required
              />

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Bar Council State
                </label>
                <select
                  name="barState"
                  value={form.barState || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 shadow-sm"
                >
                  <option>Select State</option>
                  {states.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Specialization
                </label>
                <select
                  name="specialization"
                  value={form.specialization || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 shadow-sm"
                >
                  <option>Select Specialization</option>
                  {specializations.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <Input
                icon={<MdUploadFile />}
                label="Upload Bar Council Certificate"
                name="barCert"
                type="file"
                required
              />

              <Input
                icon={<FiHash />}
                label="Years of Experience"
                name="experience"
                type="number"
                required
              />

              <div className="md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-800 mt-4">
                  Location Details
                </h3>
              </div>

              <Input
                icon={<FiMapPin />}
                label="Office Address"
                name="address"
                required
              />
              <Input
                icon={<MdPlace />}
                label="District"
                name="district"
                required
              />
              <Input icon={<MdPlace />} label="City" name="city" required />

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  State
                </label>
                <select
                  name="state"
                  value={form.state || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 shadow-sm"
                >
                  <option>Select State</option>
                  {states.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <Input
                icon={<FiLock />}
                label="Password"
                name="password"
                type="password"
                required
              />
              <Input
                icon={<FiLock />}
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                required
              />
            </div>
          )}

          {/* --------------------------- NGO --------------------------- */}
          {role === "NGO" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                icon={<FiUser />}
                label="Name of NGO"
                name="ngoName"
                required
              />

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Type of NGO
                </label>
                <select
                  name="ngoType"
                  value={form.ngoType || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 shadow-sm"
                >
                  <option>Select NGO Type</option>
                  {ngoTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </div>

              <Input
                icon={<FiHash />}
                label="Registration Number"
                name="regNo"
                required
              />
              <Input
                icon={<MdUploadFile />}
                label="Registration Certificate"
                name="regCert"
                type="file"
                required
              />

              <Input
                icon={<FiPhone />}
                label="Contact Number"
                name="contact"
                required
              />
              <Input
                icon={<FiMail />}
                label="Official Email ID"
                name="officialEmail"
                required
              />

              <Input
                icon={<FiMapPin />}
                label="Office Address"
                name="address"
                required
              />
              <Input
                icon={<MdPlace />}
                label="District"
                name="district"
                required
              />
              <Input icon={<MdPlace />} label="City" name="city" required />

              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  State
                </label>
                <select
                  name="state"
                  value={form.state || ""}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl p-3 shadow-sm"
                >
                  <option>Select State</option>
                  {states.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>

              <Input
                icon={<FiHash />}
                label="Pincode"
                name="pincode"
                required
              />

              <Input
                icon={<FiLock />}
                label="Password"
                name="password"
                type="password"
                required
              />
              <Input
                icon={<FiLock />}
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                required
              />
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-4 text-center text-gray-600 text-sm">
          Already have an account?
          <Link to="/login" className="ml-1 text-blue-700 font-semibold">
            Log In
          </Link>
        </p>

        <div className="mt-4 text-center text-xs text-gray-500">
          Need urgent help? Call our helpline:{" "}
          <span className="font-semibold">1800-000-000</span>
        </div>
      </div>
    </section>
  );
}
