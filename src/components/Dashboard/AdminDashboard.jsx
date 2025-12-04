import React from "react";

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">Admin Dashboard</h2>
      <div className="bg-white p-4 rounded shadow space-y-2">
        <p>Verification queue (lawyers, NGOs).</p>
        <p>System metrics: total users, active cases, resolved cases.</p>
        <p>Audit logs and policy monitoring.</p>
      </div>
    </div>
  );
}
