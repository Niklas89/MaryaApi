import Express from "express";

// Stripe API Secret key
const stripe = require('stripe')('sk_test_0juybcJ0rYydgGZGO9foGyQi');

const YOUR_DOMAIN = 'http://localhost:3000/checkout/';

//checkout
const checkout = async (req: Express.Request | any, res: Express.Response) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            price: "price_1Lkqi7DJbYHjS1fymGwPV3Da",
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}?success=true`,
        cancel_url: `${YOUR_DOMAIN}?canceled=true`,
      });
    
      res.redirect(303, session.url);
  };


export { checkout };