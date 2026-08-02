import React from 'react';
import { useSelector } from 'react-redux';

function Platforms() {
  // Select platform list from the Redux store
  const platforms = useSelector((state) => state.platforms.list);

  return (
    <div className="card platforms-card">
      <h3>🌐 Active Social Channels</h3>
      <p className="platforms-sub">Platforms retrieved from centralized Redux state.</p>
      <div className="platforms-list">
        {platforms.map((platform) => (
          <div key={platform.id} className="platform-item" style={{ '--platform-color': platform.color }}>
            <span className="platform-icon">{platform.icon}</span>
            <div className="platform-info">
              <span className="platform-name">{platform.name}</span>
              <span className="platform-status">Ready</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Platforms;
