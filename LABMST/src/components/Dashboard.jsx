import React from 'react';

export default function Dashboard({ onLogout }) {
  return (
    <div className="card dashboard-card">
      <div className="dashboard-header">
        <h2>Welcome to Dashboard</h2>
        <button onClick={onLogout} className="btn btn-danger">
          Logout
        </button>
      </div>
    </div>
  );
}
