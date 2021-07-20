const express = require("express");
const router = express.Router();

const RazorPay = require("razorpay");
const request = require("request");

const keys = require("../keys");
const razorInstance = new RazorPay({
  key_id: keys.razorIdKey,
  key_secret: keys.razorIdSecret,
});

router.get("/order/:PaymentAmount", (req, res) => {
  try {
    const price = req.params.PaymentAmount;
    const options = {
      amount: price * 100,
      currency: "INR",
      receipt: "receipt#1",
      payment_capture: 0,
    };
    razorInstance.orders.create(options, async function (err, order) {
      if (err) {
        return res.status(500).json({ message: "Something wrong" });
      }
      return res.status(200).json(order);
    });
  } catch (err) {
    return res.status(500).json({ message: "Something wrong" });
  }
});

router.post("/capture/:paymentId/:PaymentAmount", (req, res) => {
  try {
    const price = req.params.PaymentAmount;
    return request(
      {
        method: "POST",
        url: `https://${keys.razorIdKey}:${keys.razorIdSecret}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
        form: {
          amount: price * 100,
          currency: "INR",
        },
      },
      async function (err, response, body) {
        if (err) {
          return res.status(500).json({ message: "Something wrong" });
        }
        return res.status(200).json(body);
      }
    );
  } catch (err) {
    return res.status(500).json({ message: "Something wrong" });
  }
});
module.exports = router;
