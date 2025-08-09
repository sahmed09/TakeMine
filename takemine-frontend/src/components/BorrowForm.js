// src/components/BorrowForm.js
import React, { useState } from 'react';
import { borrowResource } from '../utils/api';

const BorrowForm = ({ resourceId }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    borrowResource(resourceId, startDate, endDate).then(() => {
      alert('Resource borrowed successfully!');
    });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Borrow Resource</h2>
      <div className="mb-4">
        <label className="block mb-2">Start Date</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-2">End Date</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg">Borrow</button>
    </form>
  );
};

export default BorrowForm;
