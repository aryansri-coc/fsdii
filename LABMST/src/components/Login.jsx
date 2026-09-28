import React, { useState } from 'react';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please fill in both username and password.');
      return;
    }

    const success = onLogin(username.trim(), password.trim());
    if (!success) {
      setError('Invalid username or password. Check demo credentials below.');
    }
  };

  const fillCredentials = (user, pass) => {
    setUsername(user);
    setPassword(pass);
    setError('');
  };

  return (
    <div className="card">
      <h2>Account Login</h2>
      <p className="subtitle">Sign in to access your protected dashboard</p>

      {error && <div className="alert-error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>

      <div className="demo-credentials">
        <p className="demo-title">Demo Accounts (Click to autofill):</p>
        <div className="demo-buttons">
          <button
            type="button"
            className="demo-badge"
            onClick={() => fillCredentials('admin', 'admin123')}
          >
            Admin (admin / admin123)
          </button>
          <button
            type="button"
            className="demo-badge"
            onClick={() => fillCredentials('john_doe', 'user123')}
          >
            User (john_doe / user123)
          </button>
        </div>
      </div>
    </div>
  );
}
