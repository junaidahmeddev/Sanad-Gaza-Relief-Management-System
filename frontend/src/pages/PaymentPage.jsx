import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentPage = () => {
  const [amount, setAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const [transactionId, setTransactionId] = useState('');
  const [senderAccount, setSenderAccount] = useState('');
  const [notes, setNotes] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    const storedAmount = sessionStorage.getItem('amount');
    const storedName = sessionStorage.getItem('donorName');
    setAmount(storedAmount || '0');
    setDonorName(storedName || 'Guest');
  }, []);

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!transactionId.trim()) {
      alert("Please enter a valid Transaction ID / Reference Number.");
      return;
    }

    setIsProcessing(true);

    try {
      // Post details of the manual transfer to backend
      const response = await fetch('http://localhost:5000/api/donate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          donor_name: donorName, 
          amount: parseFloat(amount), 
          type: paymentMethod,
          item_description: `TxID: ${transactionId} | Sender: ${senderAccount} | Notes: ${notes}`
        })
      });

      if (response.ok) {
        setIsProcessing(false);
        navigate('/donate/success');
      } else {
        setIsProcessing(false);
        alert("Failed to submit manual transfer details. Please try again.");
      }
    } catch (error) {
      console.error("Connection Error:", error);
      setIsProcessing(false);
      alert("Connection issue. Please verify the backend is running.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-6 font-sans">
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full border border-gray-100">
        <div className="flex justify-center mb-6">
           <div className="bg-green-100 p-4 rounded-full">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
             </svg>
           </div>
        </div>

        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Manual Transfer Verification</h2>
        <p className="text-gray-500 mb-6">Please transfer the amount and submit details for verification.</p>
        
        <div className="bg-gray-50 p-6 rounded-2xl mb-6 flex justify-between items-center">
          <span className="text-gray-600 font-medium text-lg">Amount to Transfer:</span>
          <span className="text-3xl font-black text-green-600">${amount}</span>
        </div>

        <form onSubmit={handlePaymentSubmit} className="space-y-4 text-left">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            >
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="EasyPaisa">EasyPaisa</option>
              <option value="JazzCash">JazzCash</option>
              <option value="Cash/Other">Other Cash Delivery / Agency</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Transaction ID / Reference Number *</label>
            <input
              type="text"
              required
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
              placeholder="e.g., TXN123456789"
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Sender's Account No / Phone Number</label>
            <input
              type="text"
              value={senderAccount}
              onChange={(e) => setSenderAccount(e.target.value)}
              placeholder="e.g., 03001234567 or Acc No."
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Notes / Additional Info</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add bank name or other details..."
              rows={2}
              className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
            />
          </div>

          <button
            type="submit"
            disabled={isProcessing}
            className={`w-full py-4 rounded-xl text-lg font-bold transition-all duration-300 shadow-lg mt-6 ${
              isProcessing 
              ? 'bg-gray-400 cursor-not-allowed text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white transform hover:-translate-y-1'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                Verifying Transfer...
              </div>
            ) : (
              'Submit Transfer Details'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;