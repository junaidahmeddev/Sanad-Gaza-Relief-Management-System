import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';


const DonationForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setStatus("Processing...");

    const card = elements.getElement(CardElement);

    // Dummy payment intent — real one comes from backend
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    });

    if (error) {
      setStatus(error.message);
    } else {
      setStatus("Payment method created. Now send to backend...");
      console.log(paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold">Donate Online</h2>

      <div>
        <label className="block text-sm font-medium">Card Details</label>
        <div className="border p-2 rounded">
          <CardElement />
        </div>
      </div>

      <button
        type="submit"
        disabled={!stripe}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
      >
        Donate Now
      </button>

      {status && <p className="text-sm text-gray-600 mt-2">{status}</p>}
    </form>
  );
};

export default DonationForm;
