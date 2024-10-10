import Stripe from 'stripe';
import { DGate, Chain } from '@dgate/bsc';


// Define lastInvoiceId at the top
let lastInvoiceId = 0;  // Initialize this to 0 or a starting number

// Your wallet address
 const wallet = '0x269fE55FD82271dB23C50A4d149e2748a163363c';

// Initialize the DGate instance
const dg = new DGate(wallet, Chain.Testnet);

// Array to store invoices (this would ideally be stored in a database in a real-world application)
const invoices = [];


const stripe = new Stripe("sk_test_51PE9CHP3pfdxJbgFpP1mpFToOgVBkHDh72zdVxgPTESlZZJYA3yaYkrPKyy5BuH76QJJmrK9txReQRbivMpHHG6j00KMDwyx1i");

// Add payment
const stripePayment = async (req, res) => {
    const { productItems } = req.body;

    console.log(productItems);

    try {
        // Map through products to create lineItems for Stripe
        const lineItems = productItems.map(product => {
            // Validate product price and quantity
            if (isNaN(product.price_data.unit_amount) || product.price_data.unit_amount <= 0) {
                throw new Error(`Invalid price for product ${product.price_data.product_data.name}`);
            }
            if (!Number.isInteger(product.quantity) || product.quantity <= 0) {
                throw new Error(`Invalid quantity for product ${product.price_data.product_data.name}`);
            }
            
            return {
                price_data: {
                    currency: product.price_data.currency, 
                    product_data: product.price_data.product_data,
                    unit_amount: product.price_data.unit_amount, // Price is already in cents
                },
                quantity: product.quantity,
            };
        });

        // Create checkout session with line items
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cart",
        });


        console.log("Session created:", session); // Log the session for debugging
        res.json({ id: session.id }); // Respond with the session ID

    } catch (error) {
        console.error("Error creating Stripe session:", error.message);
        res.status(400).json({ error: error.message });
    }
}


const binancePayment = async (req, res) => {
    const { productItems } = req.body; // Expect simple productItems without price_data

    console.log(productItems);

    try {
        // Validate product price and quantity, and calculate total amount in wei
        const totalAmountInWei = productItems.reduce((acc, product) => {
            if (isNaN(product.price) || product.price <= 0) {
                throw new Error(`Invalid price for product ${product.name}`);
            }
            if (!Number.isInteger(product.quantity) || product.quantity <= 0) {
                throw new Error(`Invalid quantity for product ${product.name}`);
            }

            // Convert the price from BNB to wei (1 BNB = 10^18 wei)
            const priceInWei = product.price * 10 ** 18; // Convert BNB to wei
            return acc + (priceInWei * product.quantity);
        }, 0);

        // Increment lastInvoiceId for unique invoice ID
        lastInvoiceId++;
        const id = lastInvoiceId;

        // Create invoice object and add it to the invoices array
        const invoice = {
            id,
            to: wallet,
            amount: totalAmountInWei / 10 ** 18, // Store amount in BNB for invoice
            paid: false,
            time: Math.floor(Date.now() / 1000) // Current timestamp in seconds
        };
        invoices.push(invoice);

        // Generate a payment URL for Binance Smart Chain (BSC) using D-Gate
        const paymentUrl = dg.createPaymentUrl(invoice.id, totalAmountInWei, 'http://localhost:5173/success');

        console.log("Invoice created:", invoice); // Log invoice for debugging
        res.json({ paymentUrl }); // Respond with the payment URL

    } catch (error) {
        console.error("Error creating Binance payment:", error.message);
        res.status(400).json({ error: error.message });
    }
};

// Samsung Payment Function
const samsungPayment = async (req, res) => {
    const paymentCredential = req.body;

  try {
    // TODO: Implement Samsung Pay payment processing logic
    // This typically involves verifying the paymentCredential and charging the amount

    // Example pseudo-code:
    const isValid = await verifyPaymentCredential(paymentCredential);
    if (isValid) {
      // Charge the amount to the user's Samsung Pay account
      const chargeResult = await chargeSamsungPay(paymentCredential);

      if (chargeResult.success) {
        res.json({ success: true, message: 'Payment processed successfully.' });
      } else {
        res.status(400).json({ success: false, message: 'Payment failed to charge.' });
      }
    } else {
      res.status(400).json({ success: false, message: 'Invalid payment credentials.' });
    }
  } catch (error) {
    console.error('Error processing Samsung Pay payment:', error);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

// Placeholder functions for payment processing
const verifyPaymentCredential = async (credential) => {
    // Implement verification logic based on Samsung Pay's API
    return true; // Assume it's valid for this example
  };
  
  const chargeSamsungPay = async (credential) => {
    // Implement charging logic based on Samsung Pay's API
    return { success: true }; // Assume charge was successful
  };



export { stripePayment, binancePayment, samsungPayment };
