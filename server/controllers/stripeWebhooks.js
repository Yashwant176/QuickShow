// controllers/stripeWebhooks.js

import Stripe from "stripe";
import Booking from "../models/Booking.js";

export const stripeWebhooks = async (req, res) => {
  // It's a good practice to instantiate Stripe only once if possible, 
  // but keeping it here since the context is just this file.
  const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];

  let event;

  // 1. Webhook Signature Verification
  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    // Return 400 immediately if verification fails
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // 2. Handle Event Type
  try {
    switch (event.type) {
      // ✅ NEW: Listen for checkout.session.completed
      case "checkout.session.completed": {
        const session = event.data.object; // This is the Stripe Checkout Session object

        // Check for payment status to be safe, though this event implies success
        if (session.payment_status === "paid") {
          
          // Retrieve the bookingId directly from the session's metadata
          const { bookingId } = session.metadata;

          if (bookingId) {
            // Update the MongoDB Booking document
            await Booking.findByIdAndUpdate(bookingId, {
              isPaid: true,
              paymentLink: "" // Clear the payment link now that payment is done
            });
            console.log(`Booking ${bookingId} successfully marked as paid.`);
          } else {
            console.error("Missing bookingId in checkout session metadata:", session.id);
          }
        }
        break;
      }

      // 🛑 REMOVED/IGNORED: The previous 'payment_intent.succeeded' case logic is removed 
      // because it was unreliable for Checkout Sessions and is replaced by the above.
      
      default:
        // Log any other events you might be receiving but aren't handling
        console.log('Unhandled event type:', event.type);
    }

    // 3. Send Success Response to Stripe
    res.json({ received: true });
  } catch (err) {
    console.error("Webhook processing error:", err);
    // Return 500 status on internal application error
    res.status(500).send("Internal Server Error");
  }
};