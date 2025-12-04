import React from "react";

export default function CitizenDashboard() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Citizen Dashboard</h2>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium text-sm">Open Cases</h3>
          <p className="text-3xl mt-2">4</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium text-sm">Matched Lawyers</h3>
          <p className="text-3xl mt-2">2</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="font-medium text-sm">Upcoming Appointments</h3>
          <p className="text-3xl mt-2">1</p>
        </div>
      </div>
    </div>
  );
}
