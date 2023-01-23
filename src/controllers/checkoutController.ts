import Express from "express";
import Session from "../types/sessionType";

// Stripe API Secret key
const stripe = require("stripe")("sk_test_0juybcJ0rYydgGZGO9foGyQi");

const CHECKOUT_PAGE = "http://localhost:3000/booking/confirmation";

//checkout
const checkout = (req: Express.Request | any, res: Express.Response) => {
  const bookingId = req.body.bookingId;
  stripe.checkout.sessions
    .create({
      line_items: [
        {
          price: req.body.priceId,
          quantity: req.body.nbHours,
        },
      ],
      mode: "payment",
      success_url: `${CHECKOUT_PAGE}/${bookingId}/?success=true`,
      cancel_url: `${CHECKOUT_PAGE}/${bookingId}`,
    })
    .then((session: Session) => {
      res.status(201).json(session.url);
    })
    .catch((err: Error) => {
      res.status(409).send(err);
    });
};

export { checkout };
