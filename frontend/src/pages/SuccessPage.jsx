import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const savedAmount = sessionStorage.getItem('amount');
    if (savedAmount) setAmount(savedAmount);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 text-center max-w-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4">🎉 Donation Successful!</h1>
        <p className="text-lg mb-2 text-gray-700">Thank you for your generous donation of</p>
        <p className="text-4xl font-bold text-green-700 mb-4">${amount}</p>
        <p className="text-sm text-gray-500 mb-6">Your support helps us make a difference.</p>
        <Link to="/" className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
