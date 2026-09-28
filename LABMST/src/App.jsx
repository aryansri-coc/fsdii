import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { generateToken, decodeToken } from './utils/jwt';

const DEMO_USERS = [
  { username: 'admin', password: 'admin123', userId: 'USR-101', role: 'Admin' },
  { username: 'john_doe', password: 'user123', userId: 'USR-102', role: 'User' }
];

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem('jwt_token');
    if (savedToken) {
      const decoded = decodeToken(savedToken);
      if (decoded && decoded.exp && decoded.exp * 1000 > Date.now()) {
        setToken(savedToken);
        setCurrentUser(decoded);
      } else {
        localStorage.removeItem('jwt_token');
      }
    }
  }, []);

  const handleLogin = (username, password) => {
    const foundUser = DEMO_USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (!foundUser) {
      return false;
    }

    const generatedJwt = generateToken({
      userId: foundUser.userId,
      username: foundUser.username,
      role: foundUser.role
    });

    localStorage.setItem('jwt_token', generatedJwt);

    const decoded = decodeToken(generatedJwt);
    setToken(generatedJwt);
    setCurrentUser(decoded);

    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt_token');
    setToken(null);
    setCurrentUser(null);
  };

  return (
    <div className="app-container">
      <main className="app-main">
        {currentUser && token ? (
          <Dashboard onLogout={handleLogout} />
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </main>
    </div>
  );
}
