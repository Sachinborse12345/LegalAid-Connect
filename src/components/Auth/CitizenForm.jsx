import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCitizen, submitRegistration } from "../../Redux/registerSlice";
import { useNavigate } from "react-router-dom";

const CitizenForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // read citizen data from redux store
  const citizen = useSelector((state) => state.register.citizen);

  // update a field in redux store
  const handleChange = (field, value) => {
    dispatch(updateCitizen({ field, value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Do password validation
    if (citizen.password !== citizen.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Send to backend through thunk
    const result = await dispatch(
      submitRegistration({ role: "Citizen", data: citizen })
    );

    if (submitRegistration.fulfilled.match(result)) {
      navigate("/login");
    } else {
      alert("Registration failed");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Full Name"
          value={citizen.fullName}
          onChange={(e) => handleChange("fullName", e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Aadhar (12 digits)"
          value={citizen.aadhar}
          onChange={(e) => handleChange("aadhar", e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={citizen.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="tel"
          placeholder="Phone"
          value={citizen.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="date"
          value={citizen.dob}
          onChange={(e) => handleChange("dob", e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={citizen.password}
          onChange={(e) => handleChange("password", e.target.value)}
          className="border p-2 rounded"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={citizen.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white rounded-md text-lg"
      >
        Create Account
      </button>
    </form>
  );
};

export default CitizenForm;
