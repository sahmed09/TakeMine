// src/components/UserDashboard.js
import React, { useEffect, useState } from 'react';
import { getUserProfile } from '../utils/api';

const UserDashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserProfile().then(setUser);
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">User Dashboard</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Status:</strong> {user.status}</p>
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4">Borrowed Resources</h3>
        <ul>
          {user.resources.map((resourceId) => (
            <li key={resourceId}>Resource ID: {resourceId}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserDashboard;
