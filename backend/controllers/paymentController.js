import Stripe from 'stripe';

const stripe = new Stripe("sk_test_51PE9CHP3pfdxJbgFpP1mpFToOgVBkHDh72zdVxgPTESlZZJYA3yaYkrPKyy5BuH76QJJmrK9txReQRbivMpHHG6j00KMDwyx1i");

// Stripe Payment Handler
const stripePayment = async (req, res) => {
  const { productItems } = req.body;

  try {
    const lineItems = productItems.map((product) => {
      const { unit_amount, currency, product_data } = product.price_data;
      
      // Set a minimum price of ₩660 for any product priced lower
      const finalAmount = unit_amount < 660 ? 660 : unit_amount;

      if (!Number.isInteger(product.quantity) || product.quantity <= 0) {
        throw new Error(`Invalid quantity for product ${product_data.name}.`);
      }

      return {
        price_data: {
          currency: currency,
          product_data: product_data,
          unit_amount: finalAmount,
        },
        quantity: product.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'samsung_pay'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/my-cart',
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error('Error creating Stripe session:', error.message);
    res.status(400).json({ error: error.message });
  }
};





export { stripePayment };
