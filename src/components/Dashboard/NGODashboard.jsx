import React from "react";

export default function NGODashboard() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">NGO Dashboard</h2>
      <div className="bg-white p-4 rounded shadow space-y-2">
        <p>Active cases supported by your NGO.</p>
        <p>Volunteer involvement and outreach details.</p>
        <p>Collaboration with lawyers and institutions.</p>
      </div>
    </div>
  );
}
