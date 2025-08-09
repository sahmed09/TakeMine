import React from 'react';
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <header className="admin-header">
      <div className="logo">
        <Link to="/admin-dashboard">Admin Dashboard</Link>
      </div>
      <nav>
        <ul>
          <li><Link to="/admin-dashboard">Dashboard</Link></li>
          <li><Link to="/admin-settings">Settings</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default AdminHeader;
