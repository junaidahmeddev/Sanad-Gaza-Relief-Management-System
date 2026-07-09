import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();
  const [donorName, setDonorName] = useState('Valued Supporter');
  const [amount, setAmount] = useState('0');

  useEffect(() => {
    const storedName = sessionStorage.getItem('donorName') || window.donationData?.donorName;
    const storedAmount = sessionStorage.getItem('amount') || window.donationData?.amount;
    if (storedName) setDonorName(storedName);
    if (storedAmount) setAmount(storedAmount);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 font-sans">
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full border border-amber-100">
        <div className="flex justify-center mb-6">
          <div className="bg-amber-100 p-5 rounded-full animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Online Transactions Inactive</h2>
        <p className="text-base text-gray-600 mb-8 leading-relaxed">
          Hello {donorName}, thank you for your interest in supporting this initiative. Please note that this platform is a demonstration portal and does not process, store, or accept any online financial transfers or real-time funds.
        </p>
        
        <div className="bg-amber-50 border border-amber-200 p-6 rounded-2xl mb-8 text-left">
          <p className="text-amber-800 font-bold text-base mb-2">⚠️ Important System Notice</p>
          <p className="text-amber-700 text-sm leading-relaxed">
            Please note that direct online payment processing and automated transaction gateways are currently inactive on this platform. 
          </p>
          <p className="text-amber-700 text-sm leading-relaxed mt-2">
            The details you submitted have been recorded for manual review and record-keeping purposes only. No funds have been automatically debited or processed by this application.
          </p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-gray-900 text-white py-4 rounded-xl text-lg font-bold hover:bg-black transition-all shadow-lg transform hover:-translate-y-1"
        >
          Return to Homepage
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;