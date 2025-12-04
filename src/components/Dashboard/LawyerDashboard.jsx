import React from "react";

export default function LawyerDashboard() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Lawyer Dashboard</h2>
      <div className="bg-white p-4 rounded shadow space-y-2">
        <p>Assigned cases overview.</p>
        <p>Upcoming appointments and schedule.</p>
        <p>Verification and profile completeness status.</p>
      </div>
    </div>
  );
}
