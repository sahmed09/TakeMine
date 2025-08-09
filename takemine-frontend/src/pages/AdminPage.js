import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(true);

   console.log(isAdmin)
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userRole = localStorage.getItem('userRole');
    if (isLoggedIn && userRole === 'admin') {
      setIsAdmin(true);
    }
  }, []);

  // If not an admin, redirect to the login page
/*   if (!isAdmin) {
    return <Navigate to="/admin-login" />;
  } */

  return (
    <div className="admin-dashboard">
      <h1>Welcome to the Admin Dashboard</h1>
      {/* Admin-specific content here */}
    </div>
  );
};

export default AdminDashboard;
