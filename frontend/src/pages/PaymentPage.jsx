import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const [amount, setAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedAmount = sessionStorage.getItem('amount');
    const storedName = sessionStorage.getItem('donorName');
    setAmount(storedAmount || '0');
    setDonorName(storedName || 'Guest');
  }, []);

  const handlePayment = async () => {
    setIsProcessing(true); // "Processing" state shuru karein

    try {
      // ✅ Step 1: Data ko Render live database mein save karein
      const response = await fetch('https://sanad-gaza-relief-management-system.onrender.com/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ donorName, amount, status: 'Completed (Mock)' })
      });

      // ✅ Step 2: 3 seconds ka wait karein taake payment real lage
      setTimeout(() => {
        setIsProcessing(false);
        if (response.ok) {
          navigate('/donate/success');
        } else {
          alert("Database connection issue. Check Render logs.");
        }
      }, 3000);

    } catch (error) {
      console.error("Connection Error:", error);
      setIsProcessing(false);
      alert("Render backend se rabta nahi ho pa raha. Console (F12) check karein.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 font-sans">
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-md w-full border border-gray-100">
        <div className="flex justify-center mb-6">
           <div className="bg-green-100 p-4 rounded-full">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
             </svg>
           </div>
        </div>

        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Secure Checkout</h2>
        <p className="text-gray-500 mb-8">Confirming donation for <span className="font-bold text-gray-800">{donorName}</span></p>
        
        <div className="bg-gray-50 p-6 rounded-2xl mb-8 flex justify-between items-center">
          <span className="text-gray-600 font-medium text-lg">Amount to Pay:</span>
          <span className="text-3xl font-black text-green-600">${amount}</span>
        </div>

        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className={`w-full py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg ${
            isProcessing 
            ? 'bg-gray-400 cursor-not-allowed text-white' 
            : 'bg-green-600 hover:bg-green-700 text-white transform hover:-translate-y-1'
          }`}
        >
          {isProcessing ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Processing Securely...
            </div>
          ) : (
            'Confirm & Pay'
          )}
        </button>
        
        <div className="mt-8 flex justify-center space-x-4 opacity-40">
           <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-5" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-5" />
           <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;