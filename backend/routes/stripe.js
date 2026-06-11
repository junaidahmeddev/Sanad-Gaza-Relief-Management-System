const express = require('express');
const Stripe = require('stripe');
const router = express.Router();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_YOUR_SECRET_KEY');

router.post('/create-checkout-session', async (req, res) => {
  const { amount, donorName } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Donation by ${donorName}`,
          },
          unit_amount: amount * 100, // Stripe expects amount in cents
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: 'http://localhost:5173/donate/success',
      cancel_url: 'http://localhost:5173/donate/payment',
    });

    res.json({ id: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;