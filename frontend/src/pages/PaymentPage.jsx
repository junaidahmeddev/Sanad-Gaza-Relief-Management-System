import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe("pk_test_YOUR_PUBLIC_KEY"); // Replace with your public key

const PaymentPage = () => {
  const [amount, setAmount] = useState('');
  const [donorName, setDonorName] = useState('');

  useEffect(() => {
    const storedAmount = sessionStorage.getItem('amount');
    const storedName = sessionStorage.getItem('donorName');
    setAmount(storedAmount);
    setDonorName(storedName);
  }, []);

  const handlePayment = async () => {
    const stripe = await stripePromise;

    const response = await fetch('http://localhost:5000/api/stripe/create-checkout-session', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, donorName })
    });

    const session = await response.json();
    const result = await stripe.redirectToCheckout({ sessionId: session.id });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">Almost there, {donorName}!</h2>
        <p className="mb-6">You're donating <span className="font-semibold text-green-600">${amount}</span> to Gaza.</p>
        <button
          onClick={handlePayment}
          className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        >
          Pay with Card
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;