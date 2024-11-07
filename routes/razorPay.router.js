const express = require("express");
const router = express.Router();

const RazorPay = require("razorpay");
const keys = require("../keys");

const razorInstance = new RazorPay({
  key_id: keys.razorIdKey,
  key_secret: keys.razorIdSecret,
});

const credentials = Buffer.from(
  `${keys.razorIdKey}:${keys.razorIdSecret}`
).toString("base64");

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

router.post("/capture/:paymentId/:PaymentAmount", async (req, res) => {
  try {
    const price = req.params.PaymentAmount;
    const response = await fetch(
      `https://api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials}`,
        },
        body: JSON.stringify({
          amount: price * 100,
          currency: "INR",
        }),
      }
    );

    // Check if the request was successful
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ message: "Something went wrong" });
    }

    const responseBody = await response.json();
    return res.status(200).json(responseBody);
  } catch (err) {
    console.error("Error capturing payment:", err);
    return res.status(500).json({ message: "Something went wrong" });
  }
});
module.exports = router;
