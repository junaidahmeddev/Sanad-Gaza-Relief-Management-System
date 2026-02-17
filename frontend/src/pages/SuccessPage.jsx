import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-2xl text-center max-w-lg w-full border border-green-100">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-5 rounded-full animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h2 className="text-4xl font-black text-gray-800 mb-4">Shukran, Junaid!</h2>
        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Aapki donation kamyabi se receive ho chuki hai. Aapki madad Gaza ke logon ke liye umeed ki kiran hai. 🇵🇸
        </p>
        
        <div className="bg-green-50 border border-green-200 p-6 rounded-2xl mb-8">
          <p className="text-green-800 font-bold text-lg">Transaction Status: Successful</p>
          <p className="text-green-700 text-sm mt-1">Ek confirmation email aapko jald bhej di jayegi.</p>
        </div>

        <button
          onClick={() => navigate('/')}
          className="w-full bg-gray-900 text-white py-4 rounded-xl text-lg font-bold hover:bg-black transition-all shadow-lg transform hover:-translate-y-1"
        >
          Wapas Home Par Jayein
        </button>
      </div>
    </div>
  );
};

export default SuccessPage;