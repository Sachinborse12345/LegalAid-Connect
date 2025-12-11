import React from "react";
import { useNavigate } from "react-router-dom";
const NGOForm = () => {
  const navigate = useNavigate();
  // 3. Create the submission handler
  const handleSubmit = (e) => {
    e.preventDefault(); // Stop the default form submission (page reload)
    console.log("Form submitted");
    // ** Simulate registration logic (e.g., API call) here **
    console.log("Citizen registration attempt...");

    // 4. On successful registration, navigate to the login page
    navigate("/login");
  };
  // Reusable input component for text/number fields
  const InputField = ({ label, id, type = "text", placeholder }) => (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        className="block w-full rounded-md border border-gray-300 px-3 py-2.5 sm:text-sm focus:ring-blue-500 focus:border-blue-500 shadow-sm"
      />
    </div>
  );

  // Reusable component for file upload fields
  const FileUploadField = ({ label, id }) => (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="file"
        id={id}
        className="block w-full text-sm text-gray-500 
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100 border border-gray-300 rounded-md shadow-sm cursor-pointer"
      />
    </div>
  );

  // Reusable component for select dropdowns
  const SelectField = ({ label, id, options }) => (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          className="block w-full pl-3 pr-10 py-2.5 text-sm border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm border appearance-none cursor-pointer"
        >
          <option value="">{`Select ${label.split(" ")[0]}`}</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );

  const ngoTypeOptions = [
    { label: "Charitable", value: "CH" },
    { label: "Educational", value: "ED" },
  ];
  const stateOptions = [
    { label: "Maharashtra", value: "MH" },
    { label: "Delhi", value: "DL" },
  ];

  return (
    <form className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField label="NGO Name" id="ngo-name" placeholder="NGO Name" />
        <SelectField
          label="Type of NGO"
          id="ngo-type"
          options={ngoTypeOptions}
        />

        <InputField
          label="Registration Number"
          id="reg-number"
          placeholder="Registration Number"
        />
        <FileUploadField
          label="Registration Certificate (PDF/Image)"
          id="reg-certificate"
        />

        <InputField
          label="Contact (10 Digits)"
          id="ngo-contact"
          type="tel"
          placeholder="Contact (10 Digits)"
        />
        <InputField
          label="Official Email"
          id="ngo-email"
          type="email"
          placeholder="Official Email"
        />

        <InputField label="Address" id="ngo-address" placeholder="Address" />
        <InputField label="District" id="ngo-district" placeholder="District" />

        <InputField label="City" id="ngo-city" placeholder="City" />
        <SelectField label="State" id="ngo-state" options={stateOptions} />

        <InputField
          label="Pincode (6 Digits)"
          id="ngo-pincode"
          placeholder="Pincode (6 Digits)"
        />
        <InputField
          label="Password (Min 6 Chars)"
          id="ngo-password"
          type="password"
          placeholder="Password"
        />

        <InputField
          label="Confirm Password"
          id="ngo-confirm-password"
          type="password"
          placeholder="Confirm Password"
        />
        {/* Placeholder to align the grid */}
        <div className="hidden md:block"></div>
      </div>

      <div className="pt-4">
        <button
          onClick={(e) => {
            handleSubmit(e);
          }}
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        >
          Create Account
        </button>
      </div>
    </form>
  );
};

export default NGOForm;
