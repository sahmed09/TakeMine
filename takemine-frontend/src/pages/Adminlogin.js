import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const navigate = useNavigate();

  const handleAdminLogin = (e) => {
    e.preventDefault();
    console.log("Admin login")
    // Perform the admin login logic here
    // If login is successful, set admin role and logged-in status
    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userRole', 'admin');
    navigate('/admin-dashboard');
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={handleAdminLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={adminUsername}
            onChange={(e) => setAdminUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
