const express = require('express')
const router = express.Router();
const { Product } = require('../models/product.model')

router.route('/')
  .get(async (req, res) => {
    try {
      const products = await Product.find({});
      res.json({ success: true, products })
    }
    catch (err) {
      res.status(500).json({ success: false, message: "Unable to get products", errorMessage: err.message })
    }
  })

router.param('productId', async (req, res, next, id) => {
  try {
    const product = await Product.findById(id);
    if (!product)
      return res.status(400).json({ success: false, message: "product not found" })

    req.product = product;
    next()
  }
  catch (err) {
    res.status(400).json({ success: false, message: "could not retrieve product " })
  }
})

router.route("/:productId")
  .get((req, res) => {
    const { product } = req
    console.log(req)
    product.__v = undefined;
    res.json({ success: true, product: product })
  })


module.exports = router 