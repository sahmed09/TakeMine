// src/components/AdminPanel.js
import React, { useEffect, useState } from 'react';
import { getUsers, suspendUser } from '../utils/api';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  const handleSuspend = (userId) => {
    suspendUser(userId).then((updatedUser) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      );
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Admin Panel</h2>
      <div>
        <h3 className="text-2xl font-bold mb-4">User Management</h3>
        <ul>
          {users.map((user) => (
            <li key={user.id} className="flex justify-between items-center">
              <span>{user.name} ({user.status})</span>
              <button
                onClick={() => handleSuspend(user.id)}
                className="bg-red-500 text-white p-2 rounded-lg"
              >
                Suspend User
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
